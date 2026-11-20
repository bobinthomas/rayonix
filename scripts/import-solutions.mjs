#!/usr/bin/env node
/**
 * Import Solution pages from the client's Google Doc.
 *
 *   node scripts/import-solutions.mjs           fetch doc and regenerate
 *   node scripts/import-solutions.mjs --check   fetch + parse only, print summary
 *
 * Each doc tab is one page with sections "01. Hero", "02. Key Capabilities",
 * "03. Applications", optional "Value Proposition", and "Call to Action".
 * Output: src/content/solutions/generated/*.ts. Do not edit those by hand.
 * The doc must be shared "Anyone with the link can view".
 */

import { mkdir, writeFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { sentenceCase, fetchDocTab } from "./lib/text.mjs";

const DOC = "1uNCHofmgv2nxSB4zYvcq87VDDN_2uTaMGSswqc84h5c";
const CONTACT = "info@rayonix.in";

// tab -> page. Slugs match the mega menu ids. `brochure`: PDF path once supplied
// (the secondary "Download … brochure" button only renders when set).
// Not imported: t.hu75sks9wt5a (older ICCS draft; Figma uses t.a6pu2vlkcet7), t.9ayu7ztzyncv (empty "Defence & Homeland" group tab).
const PAGES = [
  { tab: "t.a6pu2vlkcet7", slug: "iccs", category: "Defence & Homeland", name: "ICCS", eyebrow: "ICCS · Integrated Command & Control System" },
  { tab: "t.jdbmdlyreenb", slug: "gmts", category: "Defence & Homeland", name: "GMTS", eyebrow: "GMTS · Grid Monitoring & Tracking System" },
  { tab: "t.sqi68cgl1mqz", slug: "srop", category: "Defence & Homeland", name: "SROP", eyebrow: "SROP · Smartization of Road Opening Procedure" },
  { tab: "t.nf4nkb3ax27l", slug: "sdrr", category: "Defence & Homeland", name: "SDRR", eyebrow: "SDRR · Sarva Drishti Rudra Rakshak" },
  { tab: "t.38f34ii4e6sq", slug: "ied-detection", category: "Defence & Homeland", name: "IED Detection", eyebrow: "IED Detection · Improvised Explosive Device Detection" },
  { tab: "t.ad4vnxy16r3", slug: "foliage-penetration", category: "Defence & Homeland", name: "Foliage Penetration", eyebrow: "Foliage Penetration · Through-Cover Surveillance Module" },
  { tab: "t.70yvoftifqyh", slug: "warrior-drone-buddy", category: "Defence & Homeland", name: "Warrior Drone Buddy", eyebrow: "Warrior Drone Buddy · Tactical Drone System" },
  { tab: "t.hkq5mu84kuf7", slug: "critical-infrastructure-protection", category: "Critical Infrastructure Protection", name: "Critical Infrastructure Protection", eyebrow: "Critical Infrastructure Protection" },
  { tab: "t.1g5gf9n0e1kr", slug: "facial-recognition", category: "Enterprise", name: "SEEKER", eyebrow: "SEEKER · AI-Powered Facial Recognition System" },
  { tab: "t.i003hjpskym7", slug: "video-analytics", category: "Enterprise", name: "AI Video Analytics", eyebrow: "AI Video Analytics · AIBOX" },
];

const OUT_DIR = path.join(process.cwd(), "src/content/solutions/generated");

// ---------------------------------------------------------------- parse

const SECTION = /^0?\d\.\s+(Hero|Key Capabilities|Applications|Value Proposition|Call to Action)$/;

// The txt export marks doc comments inline as "[a]" and lists them in a footer
// ("[a]Comment text"). Drop both so reviewer notes never reach the site.
function stripComments(text) {
  return text
    .split(/\r?\n/)
    .filter((l) => !/^\s*\[[a-z]{1,2}\]/.test(l))
    .join("\n")
    .replace(/\s*\[[a-z]{1,2}\]/g, "");
}

function clean(raw) {
  return stripComments(raw.replace(/^﻿/, ""))
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function parse(raw, where) {
  const lines = clean(raw);
  const sections = {};
  let current = null;
  for (const line of lines.slice(1)) {
    const m = line.match(SECTION);
    if (m) {
      current = m[1];
      sections[current] = [];
    } else if (current) {
      sections[current].push(line);
    }
  }
  const need = (name) => {
    if (!sections[name]?.length) throw new Error(`${where}: missing section "${name}"`);
    return sections[name];
  };
  const pairs = (arr, name) => {
    if (arr.length % 2) throw new Error(`${where}: "${name}" has an odd number of title/body lines`);
    const out = [];
    for (let i = 0; i < arr.length; i += 2) out.push({ title: arr[i], body: arr[i + 1] });
    return out;
  };
  const label = (line, prefix) => {
    if (!line?.startsWith(prefix)) throw new Error(`${where}: expected "${prefix}" but got "${line}"`);
    return line.slice(prefix.length).trim();
  };

  const [headline, intro, heroCta] = need("Hero");
  const [capHeading, ...capRest] = need("Key Capabilities");
  const [appHeading, ...appRest] = need("Applications");
  const [ctaHeading, ctaText, primary, secondary] = need("Call to Action");

  let valueProposition;
  if (sections["Value Proposition"]) {
    const [vpHeading, ...vpRest] = sections["Value Proposition"];
    valueProposition = {
      heading: vpHeading,
      items: vpRest.map((l) => {
        const [title, ...body] = l.replace(/^\*\s*/, "").split(/\s+[–-]\s+/);
        return { title: title.trim(), body: body.join(" – ").trim() };
      }),
    };
  }

  return {
    headline,
    intro,
    heroCta: label(heroCta, "CTA:"),
    capabilities: { heading: capHeading, items: pairs(capRest, "Key Capabilities") },
    applications: { heading: appHeading, items: pairs(appRest, "Applications") },
    valueProposition,
    cta: {
      heading: ctaHeading,
      text: ctaText,
      primary: label(primary, "Primary CTA:"),
      secondary: secondary ? label(secondary, "Secondary CTA:") : undefined,
    },
  };
}

// ---------------------------------------------------------------- build

// Sentence case for button labels, but keep the solution's own name as written.
function buttonLabel(text, name) {
  const s = sentenceCase(text);
  const re = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  return s.replace(re, name);
}

// Doc headlines that run two sentences together without a full stop. Keyed by
// the doc text (case-insensitive); once the doc is fixed the entry stops matching.
const HEADLINE_FIXES = {
  "every identity recognised every threat anticipated": "Every identity recognised. Every threat anticipated.",
  "intelligent surveillance real-time insights": "Intelligent surveillance. Real-time insights.",
};
const fixHeadline = (text) => HEADLINE_FIXES[text.trim().toLowerCase()] ?? text;

// Headline as at most two lines (Figma shows two): group sentences evenly.
function twoLines(text) {
  const s = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (s.length <= 2) return s;
  const half = Math.ceil(s.length / 2);
  return [s.slice(0, half).join(" "), s.slice(half).join(" ")];
}

const mailto = (subject) => `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}`;

function toContent(page, p) {
  const fullName = page.eyebrow.split(" · ").slice(1).join(" · ") || page.name;
  const isConsult = /consult/i.test(p.heroCta);
  const enquiry = mailto(`${page.name} ${isConsult ? "consultation" : "demo"} request`);
  return {
    slug: page.slug,
    category: page.category,
    name: page.name,
    seo: {
      title: `${page.eyebrow.replace(" · ", " — ")} | Solutions | Rayonix`,
      description: p.intro,
    },
    hero: {
      eyebrow: page.eyebrow,
      headline: twoLines(sentenceCase(fixHeadline(p.headline))),
      intro: p.intro,
      cta: { label: buttonLabel(p.heroCta, page.name), href: enquiry },
      badge: `Solution: ${page.name} // ${fullName}`,
    },
    capabilities: p.capabilities,
    applications: p.applications,
    ...(p.valueProposition && { valueProposition: p.valueProposition }),
    cta: {
      heading: p.cta.heading,
      text: p.cta.text,
      primary: { label: buttonLabel(p.cta.primary, page.name), href: enquiry },
      ...(page.brochure &&
        p.cta.secondary && {
          secondary: { label: buttonLabel(p.cta.secondary, page.name), href: page.brochure },
        }),
    },
  };
}

const varName = (slug) => slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

// ---------------------------------------------------------------- main

const checkOnly = process.argv.includes("--check");
const results = [];
for (const page of PAGES) {
  const parsed = parse(await fetchDocTab(DOC, page.tab), `solutions/${page.tab}`);
  results.push({ page, content: toContent(page, parsed) });
}

for (const { content: c } of results) {
  console.log(
    `/solutions/${c.slug.padEnd(36)} caps:${c.capabilities.items.length} apps:${c.applications.items.length} vp:${c.valueProposition?.items.length ?? "-"}  "${c.hero.headline.join(" ")}" [${c.hero.cta.label} | ${c.cta.primary.label}]`
  );
}

if (!checkOnly) {
  await mkdir(OUT_DIR, { recursive: true });
  for (const f of await readdir(OUT_DIR)) await rm(path.join(OUT_DIR, f));
  for (const { page, content } of results) {
    await writeFile(
      path.join(OUT_DIR, `${content.slug}.ts`),
      `// GENERATED by scripts/import-solutions.mjs from Google Doc ${DOC} (${page.tab}).
// Do not edit by hand: edit the doc and re-run \`node scripts/import-solutions.mjs\`.
import type { SolutionPageContent } from "../types";

export const ${varName(content.slug)}: SolutionPageContent = ${JSON.stringify(content, null, 2)};
`
    );
  }
  await writeFile(
    path.join(OUT_DIR, "index.ts"),
    `// GENERATED by scripts/import-solutions.mjs. Do not edit by hand.
import type { SolutionPageContent } from "../types";
${results.map(({ content: c }) => `import { ${varName(c.slug)} } from "./${c.slug}";`).join("\n")}

export const generatedSolutions: SolutionPageContent[] = [
${results.map(({ content: c }) => `  ${varName(c.slug)},`).join("\n")}
];
`
  );
  console.log(`\nWrote ${results.length} pages to ${path.relative(process.cwd(), OUT_DIR)}`);
}
