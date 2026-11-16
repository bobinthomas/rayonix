/**
 * /llms-full.txt — AI Crawler Endpoint (Full Context)
 *
 * Complete structured Markdown with all company information,
 * offerings, FAQs, locations, and canonical URLs.
 */

import { NextResponse } from "next/server";
import { getLLMsContent, getFAQs, getCapabilities, getContacts } from "@/lib/cms";

export const dynamic = "force-static";

export async function GET() {
  const [content, faqData, capData, contactData] = await Promise.all([
    getLLMsContent(),
    getFAQs(),
    getCapabilities(),
    getContacts(),
  ]);

  const lines: string[] = [
    "# Rayonix — Full Context for AI Systems",
    "",
    "> This document provides comprehensive, structured information about Rayonix for AI assistants, search engines, and language models.",
    "",
    "---",
    "",
  ];

  // All CMS-managed sections
  for (const section of content) {
    if (section.heading) {
      lines.push(`## ${section.heading}`);
      lines.push("");
    }
    lines.push(section.body);
    lines.push("");
  }

  // Detailed capability specs
  lines.push("## Detailed Capability Specifications");
  lines.push("");
  for (const cap of capData) {
    lines.push(`### ${cap.title} Domain`);
    lines.push("");
    lines.push(`**${cap.headline}**`);
    lines.push("");
    lines.push(cap.description);
    lines.push("");
    lines.push("| Specification | Value |");
    lines.push("| :--- | :--- |");
    for (const spec of cap.specs) {
      lines.push(`| ${spec.label} | ${spec.value} |`);
    }
    lines.push("");
  }

  // Contact details
  lines.push("## Contact Information");
  lines.push("");
  for (const office of contactData) {
    lines.push(`### ${office.country} — ${office.entityName}`);
    lines.push("");
    lines.push(`- Cities: ${office.cities}`);
    lines.push(`- Email: ${office.email}`);
    if (office.phone) lines.push(`- Phone: ${office.phone}`);
    for (const line of office.addressLines) {
      lines.push(`- ${line}`);
    }
    lines.push("");
  }

  // Complete FAQ list
  lines.push("## Complete FAQ");
  lines.push("");
  for (const faq of faqData) {
    lines.push(`**Q: ${faq.question}**`);
    lines.push(`A: ${faq.answer}`);
    lines.push("");
  }

  // Footer
  lines.push("---");
  lines.push("");
  lines.push(
    `Last updated: ${new Date().toISOString().split("T")[0]}`
  );
  lines.push("© 2026 Rayonix Tech Private Limited. All rights reserved.");
  lines.push("");

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
