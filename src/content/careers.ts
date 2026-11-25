/** Build With Us (/careers) copy and open roles. */

export const BUILD_WITH_US = {
  eyebrow: "Build With Us",
  heading: "Build What Matters. Shape What's Next.",
  lines: [
    "Be part of a team advancing defence technology through innovation, collaboration and indigenous capabilities.",
    "Bring your ideas, take ownership and contribute to building capabilities that matter.",
  ],
  cta: "Explore open positions",
};

export const CAREERS_SEO = {
  title: "Build With Us",
  description:
    "Be part of a team advancing defence technology through innovation, collaboration and indigenous capabilities.",
};

export type Role = {
  title: string;
  team: string;
  location: string;
  type: string;
  applyUrl: string;
};

/**
 * Open positions. TODO_CONTENT: none supplied yet, so the empty state shows.
 * Add roles here; external applyUrl values open in a new tab.
 */
export const ROLES: Role[] = [];

export const CAREERS_EMPTY = {
  heading: "Open positions",
  message: "No open roles right now.",
  cta: "Send us your CV",
};
