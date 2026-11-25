import type { SolutionPageContent } from "./types";
import { generatedSolutions } from "./generated";
import { contactHref } from "../site";

/**
 * All solution pages, served at /solutions/<slug>. Rebuilt by scripts/import-solutions.mjs.
 *
 * Enquiry buttons ("Request a demo", "Schedule a … demo") are pointed at the
 * Contact page here rather than in the generated files, so a re-import keeps them.
 */
const toContact = (slug: string, href: string) =>
  href.startsWith("mailto:") ? contactHref("sales", slug) : href;

export const solutions: SolutionPageContent[] = generatedSolutions.map((s) => ({
  ...s,
  hero: { ...s.hero, cta: { ...s.hero.cta, href: toContact(s.slug, s.hero.cta.href) } },
  cta: {
    ...s.cta,
    primary: { ...s.cta.primary, href: toContact(s.slug, s.cta.primary.href) },
    ...(s.cta.secondary
      ? { secondary: { ...s.cta.secondary, href: toContact(s.slug, s.cta.secondary.href) } }
      : {}),
  },
}));

export function getSolution(slug: string): SolutionPageContent | undefined {
  return solutions.find((s) => s.slug === slug);
}

export type { SolutionPageContent } from "./types";
