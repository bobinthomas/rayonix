import type { ProductPageContent } from "./types";

export const commandIntelligence: ProductPageContent = {
  path: "/subsurface/decide",
  domain: "subsurface",
  phase: "decide",

  seo: {
    title: "Command & Intelligence — Subsurface Sensor Fusion & Decision Support | Rayonix",
    description:
      "Our Command & Intelligence layer transforms subsurface sensor data into actionable intelligence through AI analytics, sensor fusion, localisation and threat assessment, enabling informed operational decisions.",
  },

  breadcrumbs: [
    { label: "Home", href: "/", linked: true },
    { label: "Subsurface", href: "/domains/subsurface" },
    { label: "Decide", href: "/subsurface/decide" },
    { label: "Command & Intelligence", href: "/subsurface/decide" },
  ],

  hero: {
    ariaLabel: "Subsurface Command & Intelligence Architecture Overview",
    title: "COMMAND & INTELLIGENCE",
    titleSize: "long",
    eyebrow: "Subsurface Sensor Fusion & Decision Support",
    intro:
      "Our Command & Intelligence layer transforms subsurface sensor data into actionable intelligence through AI analytics, sensor fusion, localisation and threat assessment, enabling informed operational decisions.",
    image: {
      src: "/assets/command-centre.webp",
      alt: "Rayonix Subsurface Command & Intelligence Tactical Operational Console",
    },
    hud: {
      coordinates: "GRID: X 0442 · Y 0891",
      badge: "C3I Node: Active // AI Fusion Engine",
    },
    specs: [
      { value: "< 50ms", label: "Telemetry Ingestion Latency", accent: true },
      { value: "4-Layer", label: "Multi-Sensor Fusion Engine" },
      { value: "99.4%", label: "AI Signature Verification" },
      { value: "3D Vector", label: "Localisation & Trajectory" },
      { value: "MIL-STD", label: "C3I System Interoperability" },
    ],
  },

  capabilities: {
    ariaLabel: "Command & Intelligence Capabilities",
    heading: "Command & Intelligence Capabilities",
    subheading:
      "End-to-end subterranean intelligence architecture from raw signal telemetry to coordinated tactical command across six core capabilities.",
    // Tab ids are linked from the mega menu (/subsurface/decide#<id>); keep them stable.
    tabs: [
      {
        id: "data-acquisition",
        label: "Data Acquisition & Processing",
        title: "Data Acquisition & Processing",
        description:
          "Collects and processes GPR, seismic, acoustic and hydrophone sensor data into structured information.",
      },
      {
        id: "ai-analytics",
        label: "AI Analytics & Classification",
        title: "AI Analytics & Classification",
        description:
          "Identifies anomalies, recognises signal patterns and classifies detected activities.",
      },
      {
        id: "multi-sensor-fusion",
        label: "Multi-Sensor Fusion",
        title: "Multi-Sensor Fusion",
        description:
          "Correlates data from multiple sensors to create a unified intelligence picture.",
      },
      {
        id: "localisation-tracking",
        label: "Localisation & Tracking",
        title: "Localisation & Tracking",
        description:
          "Determines the location of detected activities and monitors movement patterns.",
      },
      {
        id: "threat-assessment",
        label: "Threat Assessment & Decision Support",
        title: "Threat Assessment & Decision Support",
        description:
          "Evaluates potential threats, prioritises incidents and supports informed decisions.",
      },
      {
        id: "command-control",
        label: "Command & Control",
        title: "Command & Control",
        description:
          "Enables centralised monitoring, geospatial visualisation and coordinated incident management through an integrated C3I platform.",
      },
    ],
  },

  useCases: {
    heading: "Use Cases",
    description:
      "Supporting integrated intelligence and monitoring across subsurface security environments.",
    items: [
      {
        id: "001",
        tag: "USECASE/001",
        title: "Border & Underground Surveillance",
        description: "Identifying and assessing underground intrusion activities.",
      },
      {
        id: "002",
        tag: "USECASE/002",
        title: "Subsea Infrastructure Protection",
        description: "Monitoring underwater assets and potential security threats.",
      },
      {
        id: "003",
        tag: "USECASE/003",
        title: "Critical Pipeline Security",
        description: "Identifying suspicious activities around pipeline infrastructure.",
      },
      {
        id: "004",
        tag: "USECASE/004",
        title: "Maritime & Coastal Surveillance",
        description: "Integrating sensor data for underwater and surface threat monitoring.",
      },
      {
        id: "005",
        tag: "USECASE/005",
        title: "Integrated Subsurface Operations",
        description:
          "Unifying sensor networks and intelligence through centralised command and control.",
      },
    ],
  },

  schema: {
    type: "Service",
    name: "Rayonix Subsurface Command & Intelligence",
    description:
      "Command & Intelligence layer transforming subsurface sensor data into actionable intelligence through AI analytics, sensor fusion, localisation and threat assessment.",
  },
};
