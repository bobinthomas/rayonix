/** About Us page copy (client content, verbatim). */

export const ABOUT_HERO = {
  eyebrow: "OUR APPROACH",
  title: "Building Capability Around the Mission.",
  intro:
    "We bring together global technologies, indigenous capabilities and integrated systems to address evolving defence challenges. Our approach is mission-led, integration-driven and focused on delivering operationally ready capabilities.",
};

export const ABOUT_PILLARS = [
  {
    title: "MISSION-LED THINKING",
    body: "Understanding operational challenges to build capabilities around mission requirements.",
  },
  {
    title: "INTEGRATED BY DESIGN",
    body: "Connecting sensors, platforms, intelligence and command systems into unified solutions.",
  },
  {
    title: "PROACTIVE DEFENCE",
    body: "Enabling greater situational awareness and informed decisions through connected capabilities.",
  },
  {
    title: "BUILT FOR READINESS",
    body: "Combining global partnerships, indigenous development and local manufacturing to deliver mission-ready solutions.",
  },
];

export const MISSION = {
  heading: "Mission",
  statement: "To build integrated, mission-ready defence capabilities for evolving operational environments.",
};

export const VISION = {
  heading: "Vision",
  /** Three-step sequence: today, tomorrow, future. */
  steps: [
    { stage: "Today", line: "Technology transfer today." },
    { stage: "Tomorrow", line: "Local manufacturing tomorrow." },
    { stage: "Future", line: "Independent innovation for the future." },
  ],
};

export type Leader = {
  name: string;
  title: string;
  quote: string;
  focus: string[];
  /** TODO_CONTENT: no photo supplied; an initials avatar is shown instead. */
  photo: { src: string; alt: string } | null;
  /** TODO_CONTENT: no LinkedIn URL supplied; the icon is hidden while null. */
  linkedin: string | null;
};

export const LEADERSHIP_HEADING = "Leadership";

/** Order as given in the client content. */
export const LEADERS: Leader[] = [
  {
    name: "AMIT PANDE",
    title: "Co-Founder | Managing Director",
    quote: "The future belongs to organizations that anticipate change and build ecosystems ready to evolve.",
    focus: ["Defence", "Strategy", "Execution"],
    photo: null, // TODO_CONTENT: leader photo
    linkedin: null, // TODO_CONTENT: leader LinkedIn URL
  },
  {
    name: "RAVI JANARTHANAN",
    // A press release uses "Founder, Defence Systems Architect & Strategic Engagement"; the client content says "Founder".
    title: "Founder",
    quote: "Technology creates its greatest value when it works as an ecosystem.",
    focus: ["Founder", "Entrepreneur", "Defence Innovator", "Investor"],
    photo: null, // TODO_CONTENT: leader photo
    linkedin: null, // TODO_CONTENT: leader LinkedIn URL
  },
];

export const ABOUT_SEO = {
  title: "About Us",
  description:
    "We bring together global technologies, indigenous capabilities and integrated systems to address evolving defence challenges. Mission-led and integration-driven.",
};
