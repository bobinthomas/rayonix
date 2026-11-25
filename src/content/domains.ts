/**
 * Domain overview pages (/domains/<slug>) and /platforms.
 * Built from existing copy only: the mega menu featured card for each domain,
 * plus the previous placeholder sentence for Surface and Aerial.
 */
import { megaMenuData } from "./mega-menu";

export const DOMAIN_SLUGS = ["subsurface", "surface", "aerial"] as const;
export type DomainSlug = (typeof DOMAIN_SLUGS)[number];

/** Previous /domains/<slug> placeholder sentences (existing copy). */
const EXTRA_INTRO: Partial<Record<DomainSlug, string>> = {
  surface: "Autonomous ground vehicles, optical surveillance sentries, and tactical field mobility.",
  aerial: "Airborne radar, drone swarms, and hard/soft kill counter-UAS interception grids.",
};

export const STAGES = [
  { id: "detect", label: "Detect" },
  { id: "decide", label: "Decide" },
  { id: "respond", label: "Respond" },
] as const;

export function getDomain(slug: string) {
  if (!(DOMAIN_SLUGS as readonly string[]).includes(slug)) return undefined;
  const s = slug as DomainSlug;
  const menu = megaMenuData[s];
  return {
    slug: s,
    name: menu.title,
    tag: menu.spotlight.tag,
    title: menu.spotlight.title,
    intro: menu.spotlight.description,
    extraIntro: EXTRA_INTRO[s],
    image: menu.spotlight.image,
    stages: STAGES.map((stage) => ({
      ...stage,
      items: menu.modes.find((m) => m.id === stage.id)?.items ?? [],
    })),
  };
}

export const PLATFORMS_SEO = {
  title: "Platforms",
  description:
    "Next-generation integrated autonomous defence solutions across Subsurface, Surface, and Aerial operational domains.",
};
