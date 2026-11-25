#!/usr/bin/env node
/**
 * Crawl the built HTML and fail on:
 *  - internal hrefs that resolve to neither a built page, a public file nor a redirect
 *  - #anchors missing on their target page
 *  - leftover placeholder CTAs ("Explore GPR Platform", "Return to Operations")
 *  - mailto: links outside the footer and the Contact page
 *  - pages without exactly one <h1>
 *  - <img> without an alt attribute
 *
 * Usage: pnpm check:links            (after `pnpm next:build` or `pnpm build`)
 *        node scripts/check-links.mjs [dir-with-html]
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const candidates = [process.argv[2], ".next/server/app", ".vercel/output/static"].filter(Boolean);
const HTML_DIR = candidates.map((d) => path.resolve(ROOT, d)).find((d) => fs.existsSync(d));
if (!HTML_DIR) {
  console.error("No built HTML found. Run `pnpm next:build` first.");
  process.exit(2);
}

const SKIP_PAGES = new Set(["/_not-found", "/404", "/500", "/_global-error"]);

/* ----------------------------- collect pages ----------------------------- */
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const pages = new Map(); // route -> html
for (const file of walk(HTML_DIR)) {
  let route = "/" + path.relative(HTML_DIR, file).replace(/\\/g, "/").replace(/\.html$/, "");
  route = route.replace(/\/index$/, "") || "/";
  if (route === "/index") route = "/";
  if (SKIP_PAGES.has(route)) continue;
  pages.set(route, fs.readFileSync(file, "utf8"));
}

/* ---------------------------- redirect sources ---------------------------- */
const redirects = [];
const manifest = path.join(ROOT, ".next/routes-manifest.json");
if (fs.existsSync(manifest)) {
  const m = JSON.parse(fs.readFileSync(manifest, "utf8"));
  for (const r of m.redirects ?? []) {
    if (r.internal) continue;
    redirects.push(new RegExp(r.regex));
  }
}

/** Dynamic, non-HTML routes that exist at runtime. */
const RUNTIME_ROUTES = [/^\/api\//, /^\/sitemap\.xml$/, /^\/robots\.txt$/, /^\/llms(-full)?\.txt$/, /^\/_next\//];

const PUBLIC_DIR = path.join(ROOT, "public");
const isPublicFile = (p) => {
  try {
    return fs.statSync(path.join(PUBLIC_DIR, decodeURIComponent(p))).isFile();
  } catch {
    return false;
  }
};

/* ------------------------------- helpers ------------------------------- */
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
const ids = new Map();
const idsOf = (route) => {
  if (!ids.has(route)) {
    const html = pages.get(route) ?? "";
    ids.set(route, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return ids.get(route);
};
const stripFooter = (html) => html.replace(/<footer[\s\S]*?<\/footer>/g, "");
const stripScripts = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "");

/* -------------------------------- checks -------------------------------- */
const problems = [];
const add = (route, msg) => problems.push(`${route}: ${msg}`);

for (const [route, rawHtml] of pages) {
  const html = stripScripts(rawHtml);

  // Links
  for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
    const href = decode(m[1]);
    if (!href || /^(https?:|tel:|mailto:|javascript:)/i.test(href) || href.startsWith("//")) continue;
    const url = new URL(href, `https://site${route === "/" ? "/" : route}`);
    const target = url.pathname.replace(/\/$/, "") || "/";
    const hash = decodeURIComponent(url.hash.slice(1));

    let resolved = pages.has(target);
    if (!resolved && RUNTIME_ROUTES.some((r) => r.test(target))) resolved = true;
    if (!resolved && isPublicFile(target)) resolved = true;
    if (!resolved && redirects.some((r) => r.test(target))) {
      resolved = true;
      if (hash) continue; // anchors behind redirects are not checked
    }
    if (!resolved) {
      add(route, `broken link ${href}`);
      continue;
    }
    if (hash && pages.has(target) && !idsOf(target).has(hash)) {
      add(route, `missing anchor ${href}`);
    }
  }

  // Placeholder CTAs
  for (const text of ["Explore GPR Platform", "Return to Operations"]) {
    if (html.includes(text)) add(route, `placeholder CTA "${text}"`);
  }

  // mailto outside footer and /contact
  if (route !== "/contact") {
    const body = stripFooter(html);
    for (const m of body.matchAll(/href="(mailto:[^"]*)"/g)) add(route, `mailto outside footer: ${decode(m[1])}`);
  }

  // Exactly one H1
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) add(route, `${h1} <h1> elements (expected 1)`);

  // <img> without alt
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) add(route, `<img> without alt: ${m[0].slice(0, 120)}`);
  }
}

console.log(`Checked ${pages.size} pages in ${path.relative(ROOT, HTML_DIR)}, ${redirects.length} redirect rules.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n` + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log("No problems found.");
