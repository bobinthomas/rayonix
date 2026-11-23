import type { ProductPageContent } from "./types";
import { commandIntelligence } from "./command-intelligence";

// Copy taken from the Aerial Google Doc (Decide > Command & Intelligence) as written.
// Capabilities and use cases match the doc; the hero has no specs or image because the doc has none.
const DESCRIPTION =
  "Our Command & Intelligence layer transforms subsurface sensor data into actionable intelligence through AI analytics, sensor fusion, localisation and threat assessment, enabling informed operational decisions.";

export const aerialDecide: ProductPageContent = {
  path: "/aerial/decide",
  domain: "aerial",
  phase: "decide",
  indexable: false,

  seo: {
    title: "Command & Intelligence — Aerial Sensor Fusion & Decision Support | Rayonix",
    description: DESCRIPTION,
  },

  breadcrumbs: [
    { label: "Home", href: "/", linked: true },
    { label: "Aerial", href: "/domains/aerial" },
    { label: "Decide", href: "/aerial/decide" },
    { label: "Command & Intelligence", href: "/aerial/decide" },
  ],

  hero: {
    ariaLabel: "Aerial Command & Intelligence Architecture Overview",
    title: "Command & intelligence",
    titleSize: "long",
    eyebrow: "Command & Intelligence",
    intro: DESCRIPTION,
    specs: [],
  },

  capabilities: {
    ariaLabel: "Command & Intelligence Capabilities",
    heading: "Command & Intelligence Capabilities",
    // Tab ids match the mega menu links (/aerial/decide#<id>); keep them stable.
    tabs: commandIntelligence.capabilities!.tabs,
  },

  useCases: commandIntelligence.useCases,

  schema: {
    type: "Service",
    name: "Rayonix Aerial Command & Intelligence",
    description: DESCRIPTION,
  },
};
