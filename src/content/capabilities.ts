/**
 * "One Connected Defence Ecosystem" capability areas (client content, verbatim).
 * Used by /capabilities and the homepage tab section.
 *
 * Each capability lists the existing pages it links to. A capability with no
 * links renders as a plain text chip.
 */

export type CapabilityLink = { label: string; href: string };
export type Capability = { label: string; links: CapabilityLink[] };

export type CapabilityArea = {
  id: string; // anchor on /capabilities
  number: string;
  name: string;
  headline: string;
  description: string;
  capabilities: Capability[];
  /** Area-level link shown after the chips. */
  areaLinks?: CapabilityLink[];
};

export const CAPABILITIES_INTRO = {
  heading: "One Connected Defence Ecosystem.",
  body: "We bring sensing, intelligence, autonomy, command and response together to deliver integrated, mission-ready defence capabilities across operational domains.",
};

export const CAPABILITIES_SEO = {
  title: "Capabilities | One Connected Defence Ecosystem",
  description:
    "We bring sensing, intelligence, autonomy, command and response together to deliver integrated, mission-ready defence capabilities across operational domains.",
};

const S = (href: string) => ({ label: "Surface", href });
const A = (href: string) => ({ label: "Aerial", href });
const one = (href: string) => [{ label: "View", href }];

export const CAPABILITY_AREAS: CapabilityArea[] = [
  {
    id: "sensing",
    number: "01",
    name: "Sensing Systems",
    headline: "See Beyond the Visible.",
    description:
      "We integrate multi-modal sensing technologies to detect, identify and monitor threats across land, air, water and subsurface environments.",
    capabilities: [
      { label: "EO/IR & Edge AI Imaging", links: [S("/surface/detect/optical-radar"), A("/aerial/detect/optical-radar")] },
      { label: "3D LiDAR Perception", links: [S("/surface/detect/lidar"), A("/aerial/detect/lidar")] },
      { label: "Polarimetric Thermal Imaging", links: [S("/surface/detect/polarimetric"), A("/aerial/detect/polarimetric")] },
      { label: "Passive RF & GNSS Sensing", links: one("/aerial/detect/rf-gnss") },
      { label: "Fibre-Optic Perimeter Sensing", links: one("/subsurface/detect/das") },
      {
        label: "Fence-Line Intrusion Sensing",
        links: [
          { label: "E-Fence", href: "/surface/detect/efence" },
          { label: "Vibration", href: "/surface/detect/vibration" },
        ],
      },
      { label: "Ground-Penetrating Radar", links: one("/subsurface/detect/gpr") },
      { label: "Terrain Intelligence", links: one("/surface/detect/terrain-mapping") },
    ],
  },
  {
    id: "software",
    number: "02",
    name: "Mission Software & Autonomy",
    headline: "Intelligence That Drives Decisions.",
    description:
      "We connect sensor data, AI intelligence and autonomous systems to enable faster decisions and coordinated mission execution.",
    capabilities: [
      { label: "XOS & DMS", links: [] },
      { label: "Unified C2 / C3I / C4 / C5 / C6", links: one("/solutions/iccs") },
      { label: "Edge AI Compute", links: [] },
      { label: "Real-Time 3D Spatial Intelligence", links: one("/surface/detect/terrain-mapping") },
      { label: "Autonomous Mission Execution", links: [] },
    ],
    areaLinks: [
      { label: "Subsurface Decide", href: "/subsurface/decide" },
      { label: "Surface Decide", href: "/surface/decide" },
      { label: "Aerial Decide", href: "/aerial/decide" },
    ],
  },
  {
    id: "platforms",
    number: "03",
    name: "Unified Agnostic Platforms",
    headline: "One Mission. Multiple Platforms.",
    description:
      "We bring aerial, ground and robotic platforms together for coordinated operations across diverse mission environments.",
    capabilities: [
      { label: "Tactical Ground Robotics", links: one("/surface/respond/ugv") },
      { label: "Multi-Form-Factor Robotics", links: [] },
      { label: "Confined-Space Robotics", links: [] },
      { label: "Swarm Systems", links: [] },
      { label: "Cross-Domain Autonomy", links: [] },
      { label: "Mother–Baby Architecture", links: [] },
    ],
    areaLinks: [{ label: "Mcray Xtend", href: "/ecosystem/mcray-xtend" }],
  },
  {
    id: "command",
    number: "04",
    name: "Command Systems – Static & Mobile",
    headline: "One Picture. Complete Control.",
    description:
      "We integrate sensor feeds, operational intelligence and field assets into unified command environments for informed decision-making.",
    capabilities: [
      { label: "Unified Command & Control", links: one("/solutions/iccs") },
      { label: "Static Command Centres", links: one("/solutions/iccs") },
      { label: "Mobile Command Systems", links: [] },
      { label: "Rudrarakshak", links: one("/solutions/sdrr") },
      { label: "Seeker", links: one("/solutions/facial-recognition") },
      { label: "Digital Sandtable", links: [] },
    ],
  },
  {
    id: "weapons",
    number: "05",
    name: "Weapons & Tactical Systems",
    headline: "Capability Built Around the Mission.",
    description:
      "We deliver mission-configurable weapon systems, tactical accessories and intelligent weapon-management solutions.",
    capabilities: [
      { label: "Weapon Systems & Accessories", links: one("/surface/respond/weapons-tactical") },
      { label: "Weapon-Mounted Intelligence", links: [] },
      { label: "Smart Weapon Management", links: [] },
      { label: "Smart Target & Training Systems", links: [] },
      { label: "Less-Lethal Response Systems", links: one("/surface/respond/non-lethal") },
    ],
  },
  {
    id: "counter-uas",
    number: "06",
    name: "Counter-UAS Systems",
    headline: "Detect. Mitigate. Intercept.",
    description:
      "We bring together multi-layer detection, electronic mitigation and physical interception to address evolving aerial threats.",
    capabilities: [
      {
        label: "Drone Detection Systems",
        links: [
          { label: "Acoustic", href: "/aerial/detect/acoustic" },
          { label: "Optical radar", href: "/aerial/detect/optical-radar" },
        ],
      },
      { label: "Passive RF Detection", links: one("/aerial/detect/rf-gnss") },
      { label: "RF Jamming Systems", links: one("/aerial/respond/rf-jamming") },
      { label: "Kinetic Interception", links: one("/aerial/respond/kinetic-interception") },
      { label: "Net-Based Capture Systems", links: one("/aerial/respond/net-interception") },
      { label: "Laser Interception", links: one("/aerial/respond/laser-interception") },
    ],
    areaLinks: [{ label: "Aerial domain", href: "/domains/aerial" }],
  },
  {
    id: "communications",
    number: "07",
    name: "Secure Communications",
    headline: "Connected. Secure. Mission-Ready.",
    description:
      "We focus on tactical, resilient communication networks that support connectivity across mission environments.",
    capabilities: [
      { label: "Tactical Communications", links: [] },
      { label: "Resilient Networks", links: [] },
      { label: "Mission Networks", links: [] },
    ],
    areaLinks: [{ label: "Discuss your requirement", href: "/contact?subject=defence-solutions" }],
  },
];
