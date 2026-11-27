/** Build With Us (/careers) copy and open roles. */

export const BUILD_WITH_US = {
  eyebrow: "Careers",
  heading: "Build What Matters. Shape What's Next.",
  lines: [
    "Be part of a team advancing defence technology through innovation, collaboration and indigenous capabilities.",
    "Bring your ideas, take ownership and contribute to building capabilities that matter.",
  ],
  cta: "Explore open positions",
};

export const CAREERS_SEO = {
  title: "Careers",
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
export const ROLES: Role[] = [
  {
    title: "Senior Embedded & Edge AI Engineer",
    team: "Autonomy & Mission Software",
    location: "Gurugram, India",
    type: "Full-time",
    applyUrl: "/contact?subject=careers&product=Embedded-Edge-AI-Engineer",
  },
  {
    title: "RF & Signal Processing Systems Engineer",
    team: "Subsurface & Aerial Sensing",
    location: "Hyderabad, India",
    type: "Full-time",
    applyUrl: "/contact?subject=careers&product=RF-Signal-Processing-Engineer",
  },
  {
    title: "Autonomous Flight Control & Swarm Engineer",
    team: "X Labs",
    location: "Bengaluru, India",
    type: "Full-time",
    applyUrl: "/contact?subject=careers&product=Flight-Control-Swarm-Engineer",
  },
  {
    title: "Electro-Optical & Thermal Payload Lead",
    team: "neXr Optronics",
    location: "Chennai, India",
    type: "Full-time",
    applyUrl: "/contact?subject=careers&product=EO-Thermal-Payload-Lead",
  },
];

export const CAREERS_EMPTY = {
  heading: "Open positions",
  message: "No open roles right now.",
  cta: "Send us your CV",
};
