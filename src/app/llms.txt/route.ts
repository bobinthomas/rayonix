/**
 * /llms.txt — AI Crawler Endpoint (Compact)
 *
 * Structured Markdown summary for AI search engines:
 * ChatGPT, Perplexity, Claude, Google AI Overviews.
 *
 * Follows the llms.txt specification:
 * https://llmstxt.org/
 */

import { NextResponse } from "next/server";
import { getLLMsContent } from "@/lib/cms";

export const dynamic = "force-static";

export async function GET() {
  const content = await getLLMsContent();

  const lines: string[] = [
    "# Rayonix",
    "",
    "> Rayonix is an integrated defence technology company delivering autonomous solutions across Subsurface, Surface, and Aerial operational domains. Headquartered in India with operations in Australia.",
    "",
    "## Links",
    "",
    "- [Homepage](https://rayonix.com)",
    "- [About / Company Story](https://rayonix.com/about)",
    "- [Subsurface Domain](https://rayonix.com/subsurface/detect/gpr)",
    "- [News & Insights](https://rayonix.com/news)",
    "- [Full LLM Context](https://rayonix.com/llms-full.txt)",
    "",
  ];

  // Append dynamic CMS sections (compact version — identity + urls only)
  const compactSections = content.filter(
    (s) => s.section === "identity" || s.section === "urls"
  );

  for (const section of compactSections) {
    if (section.heading) {
      lines.push(`## ${section.heading}`);
      lines.push("");
    }
    lines.push(section.body);
    lines.push("");
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
