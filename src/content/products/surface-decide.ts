import type { ProductPageContent } from "./types";
import { commandIntelligence } from "./command-intelligence";

// Copy taken from the Surface Google Doc (Decide > Command & Intelligence) as written.
// Capabilities and use cases match the doc; the hero has no specs or image because the doc has none.
const DESCRIPTION =
  "Our Command & Intelligence layer transforms subsurface sensor data into actionable intelligence through AI analytics, sensor fusion, localisation and threat assessment, enabling informed operational decisions.";

export const surfaceDecide: ProductPageContent = {
  path: "/surface/decide",
  domain: "surface",
  phase: "decide",
  indexable: false,

  seo: {
    title: "Command & Intelligence — Surface Sensor Fusion & Decision Support | Rayonix",
    description: DESCRIPTION,
  },

  breadcrumbs: [
    { label: "Home", href: "/", linked: true },
    { label: "Surface", href: "/domains/surface" },
    { label: "Decide", href: "/surface/decide" },
    { label: "Command & Intelligence", href: "/surface/decide" },
  ],

  hero: {
    ariaLabel: "Surface Command & Intelligence Architecture Overview",
    title: "Command & intelligence",
    titleSize: "long",
    eyebrow: "Command & Intelligence",
    intro: DESCRIPTION,
    specs: [],
  },

  capabilities: {
    ariaLabel: "Command & Intelligence Capabilities",
    heading: "Command & Intelligence Capabilities",
    // Tab ids match the mega menu links (/surface/decide#<id>); keep them stable.
    tabs: commandIntelligence.capabilities!.tabs,
  },

  useCases: commandIntelligence.useCases,

  schema: {
    type: "Service",
    name: "Rayonix Surface Command & Intelligence",
    description: DESCRIPTION,
  },
};
