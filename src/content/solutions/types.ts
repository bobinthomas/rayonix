/**
 * Solution page content model (Figma: "Rayonix / Solutions / Template", node 838:703).
 *
 * Plain serialisable data so it can later move to a CMS unchanged.
 * Pages are generated from the client's Google Doc by
 * `node scripts/import-solutions.mjs`.
 */

export interface SolutionLink {
  label: string;
  href: string;
}

export interface SolutionItem {
  title: string;
  body: string;
}

export interface SolutionPageContent {
  /** URL slug: /solutions/<slug> */
  slug: string;
  /** Mega menu group, shown as the third breadcrumb. */
  category: "Defence & Homeland" | "Critical Infrastructure Protection" | "Enterprise";
  /** Short name used in breadcrumbs and the hero HUD (e.g. "ICCS"). */
  name: string;

  seo: { title: string; description: string };

  hero: {
    /** Red uppercase line above the headline (e.g. "ICCS · Integrated Command & Control System"). */
    eyebrow: string;
    /** Headline split into lines; each sentence is its own line on desktop. */
    headline: string[];
    intro: string;
    cta: SolutionLink;
    /** Hero visual. Without one, the tactical grid placeholder is shown. */
    image?: { src: string; alt: string };
    /** HUD badge text on the visual. */
    badge: string;
  };

  capabilities: { heading: string; items: SolutionItem[] };
  applications: {
    heading: string;
    items: SolutionItem[];
    /** Visual beside the applications list. Falls back to the template image when omitted. */
    image?: { src: string; alt: string };
  };
  /** Optional section (not in the Figma template; used by a few pages). */
  valueProposition?: { heading: string; items: SolutionItem[] };

  cta: {
    heading: string;
    text: string;
    primary: SolutionLink;
    /** Only shown when a downloadable file exists. */
    secondary?: SolutionLink;
  };
}
