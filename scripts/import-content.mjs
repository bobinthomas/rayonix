#!/usr/bin/env node
/**
 * Import product page content from the client's Google Docs.
 *
 *   node scripts/import-content.mjs            fetch docs and regenerate
 *   node scripts/import-content.mjs --check    fetch + parse only, print summary
 *
 * Each doc tab is one product page. PAGES below maps tab -> URL path.
 * Output: src/content/products/generated/*.ts (+ index.ts). Do not edit the
 * generated files by hand; edit the doc (or CORRECTIONS here) and re-run.
 * The docs must be shared "Anyone with the link can view".
 *
 * Decide-phase tabs (Command & Intelligence) use a different template and
 * are intentionally not imported.
 */

import { mkdir, writeFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { sentenceCase, fetchDocTab } from "./lib/text.mjs";

const DOCS = {
  subsurface: "1LgReci7Mj49chttts7rrnnJHaXPN7CezoTLmwJktmw4",
  surface: "1BXWoXoWXJMV9LiuDtGPIG0wTX8GbWBQhJuENwLIxbxM",
  aerial: "1IuiTgjh2jPGH91DTsMXw6hqqI89RT0f3q0KLLYowvbs",
};

const DOMAIN_LABEL = { subsurface: "Subsurface", surface: "Surface", aerial: "Aerial" };
const PHASE_LABEL = { detect: "Detect", decide: "Decide", respond: "Respond" };

// tab id -> page. `crumb` is the short name used in breadcrumbs (matches the mega menu).
// `schema: "Service"` for software/coordination layers; hardware defaults to Product.
const PAGES = [
  // Subsurface
  { domain: "subsurface", tab: "t.ck75xltrle3i", phase: "detect", slug: "das", crumb: "Fibre Optic DAS" },
  { domain: "subsurface", tab: "t.1es6ql5jofrr", phase: "detect", slug: "seismic", crumb: "Seismic Sensors" },
  { domain: "subsurface", tab: "t.aa8yaclr1q2b", phase: "detect", slug: "hydrophone", crumb: "Hydrophone Sensors" },
  { domain: "subsurface", tab: "t.futvpjxwm6ph", phase: "respond", slug: null, crumb: null, schema: "Service" },
  // Surface: detect
  { domain: "surface", tab: "t.26vpxypwztiw", phase: "detect", slug: "optical-radar", crumb: "Optical Radar" },
  { domain: "surface", tab: "t.jfyl0073j9o3", phase: "detect", slug: "polarimetric", crumb: "Polarimetric Thermal Imaging" },
  { domain: "surface", tab: "t.xjt53jj2imf4", phase: "detect", slug: "lidar", crumb: "3D LiDAR" },
  { domain: "surface", tab: "t.34fdqapxzbzr", phase: "detect", slug: "vibration", crumb: "Vibration Sensors" },
  { domain: "surface", tab: "t.ukfa846qs6m4", phase: "detect", slug: "efence", crumb: "E-Fence" },
  { domain: "surface", tab: "t.wkjxch4pgjup", phase: "detect", slug: "terrain-mapping", crumb: "3D Terrain Mapping" },
  // Surface: respond
  { domain: "surface", tab: "t.x0y1ukk8r18i", phase: "respond", slug: "weapons-tactical", crumb: "Weapons & Tactical Systems" },
  { domain: "surface", tab: "t.pun7r74341ea", phase: "respond", slug: "non-lethal", crumb: "Non-Lethal Response Systems" },
  { domain: "surface", tab: "t.x0lyz23ur0za", phase: "respond", slug: "drone-response", crumb: "Autonomous Drone Response" },
  { domain: "surface", tab: "t.4tt52oc988cv", phase: "respond", slug: "ugv", crumb: "Unmanned Ground Systems" },
  // Aerial: detect
  { domain: "aerial", tab: "t.yoyh7zn0wda6", phase: "detect", slug: "optical-radar", crumb: "Optical Radar" },
  { domain: "aerial", tab: "t.tqmn2lgkob8c", phase: "detect", slug: "rf-gnss", crumb: "RF & GNSS" },
  { domain: "aerial", tab: "t.suvsq5phvuhw", phase: "detect", slug: "polarimetric", crumb: "Polarimetric Thermal Imaging" },
  { domain: "aerial", tab: "t.5ezu2ml62s4e", phase: "detect", slug: "lidar", crumb: "LiDAR" },
  { domain: "aerial", tab: "t.fjew1uu5h8u3", phase: "detect", slug: "acoustic", crumb: "Acoustic Sensing" },
  // Aerial: respond
  { domain: "aerial", tab: "t.h83wmqbwdz9u", phase: "respond", slug: "rf-jamming", crumb: "RF Jamming" },
  { domain: "aerial", tab: "t.vt0ozaj2m4nl", phase: "respond", slug: "gnss-spoofing", crumb: "GNSS Spoofing" },
  { domain: "aerial", tab: "t.7v9z2d2ktb6x", phase: "respond", slug: "laser-interception", crumb: "Laser-Based Interception" },
  { domain: "aerial", tab: "t.colbz7jy9sbb", phase: "respond", slug: "net-interception", crumb: "Net-Based Interception" },
  { domain: "aerial", tab: "t.37lianiscoyq", phase: "respond", slug: "kinetic-interception", crumb: "Kinetic Interception" },
];

// Typos in the source docs, fixed on import: [find, replace].
const CORRECTIONS = [["Protection Ratin", "Protection Rating"]];

// Hero title + subtitle: sentence case via scripts/lib/text.mjs (acronym list lives there).

const OUT_DIR = path.join(process.cwd(), "src/content/products/generated");

// ---------------------------------------------------------------- fetch


// ---------------------------------------------------------------- parse

const isCapHeading = (l) => /Capabilities$/.test(l) || l === "Capabilities";
const tabLine = /^\d{1,2}\.\s+(.+)$/;
const useCaseLine = /^USE CASE\s*\/\s*(\d{3})(?:\s*[–-]\s*(.+))?$/;
const slugify = (s) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function clean(raw) {
  let text = raw.replace(/^﻿/, "");
  for (const [a, b] of CORRECTIONS) text = text.split(a).join(b);
  return text
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l && l !== "Explore Solution →");
}

function parse(raw, where) {
  const L = clean(raw);
  let i = 0;
  const fail = (msg) => {
    throw new Error(`${where}: ${msg} (at line ${i + 1}: "${L[i] ?? "<end>"}")`);
  };

  const title = sentenceCase(L[i++].replace(/^\d+\.\s+/, ""));
  const eyebrow = sentenceCase(L[i++]);
  if (L[i] === "Description") i++;
  const intro = L[i++];

  // Specs: value/label pairs, or a "Specification | Value" table (label first).
  const specs = [];
  if (L[i] === "Specifications") i++;
  if (L[i] === "Specification" && L[i + 1] === "Value") {
    i += 2;
    while (i < L.length && L[i] !== "Use Cases") specs.push({ label: L[i++], value: L[i++] });
  } else {
    while (i < L.length && !isCapHeading(L[i]) && L[i] !== "Use Cases" && L[i] !== "Specifications") {
      specs.push({ value: L[i++], label: L[i++] });
    }
  }
  if (L[i] === "Specifications") i++;
  if (specs.some((s) => !s.value || !s.label)) fail("odd number of spec lines");

  // Capability tabs (optional).
  let capabilities;
  if (isCapHeading(L[i])) {
    const heading = L[i++];
    if (L[i] === "Description:") i++;
    let subheading;
    if (!tabLine.test(L[i]) && L[i] !== "Specification Tabs") subheading = L[i++];
    if (L[i] === "Specification Tabs") i++;
    const tabs = [];
    while (tabLine.test(L[i] ?? "")) {
      const t = L[i++].match(tabLine)[1];
      tabs.push({ id: slugify(t), label: t, title: t, description: L[i++] });
    }
    if (!tabs.length) fail("capability heading without tabs");
    capabilities = { heading, subheading, tabs };
  }

  if (L[i++] !== "Use Cases") fail('expected "Use Cases"');
  let ucDescription;
  if (!useCaseLine.test(L[i] ?? "")) ucDescription = L[i++];
  const useCases = [];
  while (i < L.length) {
    const m = (L[i++] ?? "").match(useCaseLine);
    if (!m) fail("expected a USE CASE line");
    const titleText = m[2] ?? L[i++];
    useCases.push({ id: m[1], tag: `USECASE/${m[1]}`, title: titleText, description: L[i++] });
  }
  if (!useCases.length) fail("no use cases");

  return { title, eyebrow, intro, specs, capabilities, ucDescription, useCases };
}

// ---------------------------------------------------------------- build

function titleSize(t) {
  if (t.length <= 8) return "display";
  if (t.length <= 20) return "long";
  return "extended";
}

function toContent(page, p) {
  const D = DOMAIN_LABEL[page.domain];
  const P = PHASE_LABEL[page.phase];
  const pagePath = page.slug ? `/${page.domain}/${page.phase}/${page.slug}` : `/${page.domain}/${page.phase}`;
  const breadcrumbs = [
    { label: "Home", href: "/", linked: true },
    { label: D, href: `/${page.domain}` },
    { label: P, href: `/${page.domain}/${page.phase}` },
  ];
  if (page.slug) breadcrumbs.push({ label: page.crumb, href: pagePath });

  return {
    path: pagePath,
    domain: page.domain,
    phase: page.phase,
    seo: { title: `${p.title} — ${p.eyebrow} | ${D} | Rayonix`, description: p.intro },
    breadcrumbs,
    hero: {
      ariaLabel: `${p.title} Overview`,
      title: p.title,
      titleSize: titleSize(p.title),
      eyebrow: p.eyebrow,
      intro: p.intro,
      specs: p.specs.map((s, idx) => (idx === 0 ? { ...s, accent: true } : s)),
    },
    ...(p.capabilities && {
      capabilities: {
        ariaLabel: p.capabilities.heading,
        heading: p.capabilities.heading,
        ...(p.capabilities.subheading && { subheading: p.capabilities.subheading }),
        tabs: p.capabilities.tabs,
      },
    }),
    useCases: {
      heading: "Use Cases",
      ...(p.ucDescription && { description: p.ucDescription }),
      items: p.useCases,
    },
    schema: {
      ...(page.schema && { type: page.schema }),
      name: `Rayonix ${p.title}`,
      description: p.intro,
    },
  };
}

const varName = (c) =>
  c.path.split("/").filter(Boolean).join("-").replace(/-([a-z0-9])/g, (_, ch) => ch.toUpperCase());

function fileFor(content, page) {
  return `// GENERATED by scripts/import-content.mjs from Google Doc ${DOCS[page.domain]} (${page.tab}).
// Do not edit by hand: edit the doc and re-run \`node scripts/import-content.mjs\`.
import type { ProductPageContent } from "../types";

export const ${varName(content)}: ProductPageContent = ${JSON.stringify(content, null, 2)};
`;
}

// ---------------------------------------------------------------- main

const checkOnly = process.argv.includes("--check");
const results = [];
for (const page of PAGES) {
  const where = `${page.domain}/${page.tab}`;
  const parsed = parse(await fetchDocTab(DOCS[page.domain], page.tab), where);
  results.push({ page, content: toContent(page, parsed) });
}

for (const { content: c } of results) {
  console.log(
    `${c.path.padEnd(38)} specs:${c.hero.specs.length} tabs:${c.capabilities?.tabs.length ?? "-"} useCases:${c.useCases.items.length}  "${c.hero.title}"`
  );
}

if (!checkOnly) {
  await mkdir(OUT_DIR, { recursive: true });
  for (const f of await readdir(OUT_DIR)) await rm(path.join(OUT_DIR, f));
  const names = [];
  for (const { page, content } of results) {
    const file = content.path.split("/").filter(Boolean).join("-");
    await writeFile(path.join(OUT_DIR, `${file}.ts`), fileFor(content, page));
    names.push([varName(content), file]);
  }
  await writeFile(
    path.join(OUT_DIR, "index.ts"),
    `// GENERATED by scripts/import-content.mjs. Do not edit by hand.
import type { ProductPageContent } from "../types";
${names.map(([v, f]) => `import { ${v} } from "./${f}";`).join("\n")}

export const generatedProducts: ProductPageContent[] = [
${names.map(([v]) => `  ${v},`).join("\n")}
];
`
  );
  console.log(`\nWrote ${results.length} pages to ${path.relative(process.cwd(), OUT_DIR)}`);
}
