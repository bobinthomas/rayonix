import type { ProductPageContent } from "./types";

const G = "/assets/gpr";

export const gpr: ProductPageContent = {
  path: "/subsurface/detect/gpr",
  domain: "subsurface",
  phase: "detect",

  seo: {
    title: "GPR — Ground Penetrating Radar | Subsurface Detection & Mapping | Rayonix",
    description:
      "Our Ground Penetrating Radar (GPR) solution uses electromagnetic waves to detect buried objects, map underground structures and identify subsurface anomalies without excavation.",
  },

  breadcrumbs: [
    { label: "Home", href: "/", linked: true },
    { label: "Subsurface", href: "/subsurface" },
    { label: "Detect", href: "/subsurface/detect" },
    { label: "GPR", href: "/subsurface/detect/gpr" },
  ],

  hero: {
    ariaLabel: "GPR Subsurface Detection and Mapping Overview",
    title: "GPR",
    titleSize: "display",
    eyebrow: "Subsurface detection & mapping",
    intro:
      "Our Ground Penetrating Radar (GPR) solution uses electromagnetic waves to detect buried objects, map underground structures and identify subsurface anomalies without excavation.",
    image: {
      src: "/assets/banners/subsurface-detect-gpr.webp",
      alt: "Ground Penetrating Radar (GPR) banner",
    },
    specs: [
      { value: "600 MHz", label: "Antenna Frequency", accent: true },
      { value: "2.7 kg", label: "System Weight" },
      { value: "1+ Hours", label: "Operating Time" },
      { value: "IP65", label: "Environmental Protection Rating" },
      { value: "620 × 216 × 80 mm", label: "System Dimensions" },
    ],
  },

  capabilities: {
    ariaLabel: "Advanced Subsurface Detection & Mapping Capabilities",
    heading: "Advanced Subsurface Detection & Mapping Capabilities",
    subheading:
      "Enables non-invasive underground investigation through electromagnetic sensing, signal processing and subsurface imaging.",
    tabs: [
      {
        id: "transmission",
        label: "Electromagnetic Signal Transmission",
        title: "Electromagnetic Signal Transmission",
        description:
          "Transmits electromagnetic pulses into the ground to investigate subsurface layers and objects.",
        diagram: [
          { src: `${G}/antenna.svg`, alt: "Antenna", width: 20, height: 24, centerX: true, top: 16 },
          { src: `${G}/ground.svg`, alt: "Ground surface", width: 128, height: 2, centerX: true, top: 58 },
          { src: `${G}/transmitted-pulses.svg`, alt: "Transmitted pulses", width: 108, height: 54, centerX: true, top: 66 },
        ],
      },
      {
        id: "reflection",
        label: "Subsurface Reflection Detection",
        title: "Subsurface Reflection Detection",
        description:
          "Captures reflected signals from underground structures and materials with differing electrical properties.",
        diagram: [
          { src: `${G}/ground-surface.svg`, alt: "Ground surface", width: 124, height: 2, centerX: true, top: 48 },
          { src: `${G}/incident-signal.svg`, alt: "Incident signal", width: 38, height: 38, left: 38, top: 24 },
          { src: `${G}/reflected-signal.svg`, alt: "Reflected signal", width: 38, height: 38, right: 36, top: 24 },
          { src: `${G}/geological-interface.svg`, alt: "Geological interface", width: 124, height: 14, centerX: true, bottom: 32 },
        ],
      },
      {
        id: "detection",
        label: "Underground Object Detection",
        title: "Underground Object Detection",
        description:
          "Identifies buried utilities, pipes, storage tanks and other subsurface objects.",
        diagram: [
          { src: `${G}/scanning-pulse.svg`, alt: "Scanning pulse", width: 38, height: 20, centerX: true, top: 24 },
          { src: `${G}/ground-surface1.svg`, alt: "Ground boundary", width: 120, height: 2, centerX: true, top: 56 },
          { src: `${G}/targeting-reticle.svg`, alt: "Targeting reticle", width: 70, height: 70, centerX: true, bottom: 16 },
          { src: `${G}/buried-pipe.svg`, alt: "Buried pipe", width: 34, height: 34, centerX: true, bottom: 34 },
        ],
      },
      {
        id: "depth",
        label: "Depth & Resolution Analysis",
        title: "Depth & Resolution Analysis",
        description:
          "Supports depth investigation and target identification through selectable antenna frequencies.",
        diagram: [
          { src: `${G}/resolution-waveform.svg`, alt: "Resolution waveform", width: 44, height: 18, right: 24, top: 24 },
          { src: `${G}/depth-dimension.svg`, alt: "Depth dimension indicator", width: 14, height: 66, left: 24, top: 52 },
          { src: `${G}/subsurface-layers.svg`, alt: "Subsurface strata layers", width: 94, height: 66, right: 20, top: 52 },
        ],
      },
      {
        id: "imaging",
        label: "Subsurface Imaging",
        title: "Subsurface Imaging",
        description:
          "Processes reflected signals into radargrams for visualisation and interpretation of underground structures.",
        diagram: [
          { src: `${G}/monitor.svg`, alt: "Radar monitor display", width: 118, height: 78, centerX: true, top: 24 },
          { src: `${G}/radargram.svg`, alt: "Radargram reflection curves", width: 96, height: 46, centerX: true, top: 44 },
          { src: `${G}/stand.svg`, alt: "Monitor stand", width: 38, height: 16, centerX: true, bottom: 20 },
        ],
      },
      {
        id: "surveying",
        label: "Multi-Platform Surveying",
        title: "Multi-Platform Surveying",
        description:
          "Supports ground-based, borehole and drone-mounted surveys across different environments.",
        diagram: [
          { src: `${G}/drone.svg`, alt: "Airborne GPR Drone", width: 78, height: 30, centerX: true, top: 16 },
          { src: `${G}/ground-surface2.svg`, alt: "Ground surface", width: 124, height: 2, centerX: true, top: 68 },
          { src: `${G}/radar-cart.svg`, alt: "Surface Radar Cart", width: 42, height: 34, left: 32, bottom: 16 },
          { src: `${G}/borehole-probe.svg`, alt: "Borehole Probe", width: 16, height: 40, right: 36, bottom: 12 },
        ],
      },
    ],
  },

  useCases: {
    heading: "Use Cases",
    description:
      "Supporting non-destructive subsurface investigation, mapping and underground object detection.",
    items: [
      {
        id: "001",
        tag: "USECASE/001",
        title: "UXO & Landmine Detection",
        description:
          "Detecting and mapping potential unexploded ordnance, landmines and explosive remnants of war.",
      },
      {
        id: "002",
        tag: "USECASE/002",
        title: "Underground Tunnel Detection",
        description:
          "Identifying concealed tunnels, underground passages and subsurface voids.",
      },
      {
        id: "003",
        tag: "USECASE/003",
        title: "IED & Buried Threat Assessment",
        description:
          "Investigating subsurface anomalies and potential buried explosive threats during route and site assessments.",
      },
      {
        id: "004",
        tag: "USECASE/004",
        title: "Military Infrastructure Mapping",
        description:
          "Mapping buried utilities, cables, pipelines and other subsurface infrastructure within military installations.",
      },
    ],
  },

  schema: {
    name: "Rayonix GPR-TR400 Ground Penetrating Radar",
    description:
      "Ground Penetrating Radar system using electromagnetic pulses to investigate subsurface layers, identify buried utilities and map geological interfaces.",
  },
};
