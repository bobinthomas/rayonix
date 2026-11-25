/** Ecosystem companies (client content, verbatim). */
import type { CapabilityLink } from "./capabilities";

export const ECOSYSTEM_HUB = {
  heading: "Beyond Integration. Built for Defence.",
  seo: {
    title: "Ecosystem",
    description:
      "X Labs, neXr Optronics and Mcray Xtend: research, electro-optical sensing and UAV manufacturing within the Rayonix defence ecosystem.",
  },
};

export type EcosystemCapability = { label: string; links: CapabilityLink[] };

export type EcosystemCompany = {
  slug: "x-labs" | "nexr-optronics" | "mcray-xtend";
  number: string;
  name: string;
  headline: string;
  intro: string;
  /** "Key Focus Areas" for X Labs, "Key Capabilities" for the others. */
  listHeading: string;
  capabilities: EcosystemCapability[];
  closingLine: string;
  /** Slugs of related stories in src/content/news.ts. */
  relatedNews: string[];
};

const S = (href: string) => ({ label: "Surface", href });
const A = (href: string) => ({ label: "Aerial", href });

export const ECOSYSTEM_COMPANIES: EcosystemCompany[] = [
  {
    slug: "x-labs",
    number: "01",
    name: "X Labs",
    headline: "Research. Develop. Innovate.",
    intro:
      "We focus on specialised research and development to advance indigenous defence capabilities. Our work supports the development of technologies aligned with evolving operational requirements.",
    listHeading: "Key Focus Areas",
    // Focus areas are themes, so they are not linked.
    capabilities: [
      { label: "Specialised Defence R&D", links: [] },
      { label: "Indigenous Capability Development", links: [] },
      { label: "Advanced Technology Research", links: [] },
      { label: "Mission-Oriented Innovation", links: [] },
    ],
    closingLine: "Building Indigenous Capabilities for Tomorrow's Battlespace.",
    relatedNews: [],
  },
  {
    slug: "nexr-optronics",
    number: "02",
    name: "neXr Optronics",
    headline: "See More. Detect Better.",
    intro:
      "We develop electro-optical and sensing capabilities that enhance visibility, detection and situational awareness across challenging operational environments.",
    listHeading: "Key Capabilities",
    capabilities: [
      { label: "EO/IR Imaging", links: [S("/surface/detect/optical-radar"), A("/aerial/detect/optical-radar")] },
      { label: "Thermal Imaging", links: [S("/surface/detect/polarimetric"), A("/aerial/detect/polarimetric")] },
      { label: "Polarimetric Thermal Imaging", links: [S("/surface/detect/polarimetric"), A("/aerial/detect/polarimetric")] },
      { label: "AI-Based Imaging Systems", links: [{ label: "View", href: "/solutions/video-analytics" }] },
      { label: "3D LiDAR Perception", links: [{ label: "View", href: "/surface/detect/lidar" }] },
      { label: "Passive RF & GNSS Sensing", links: [{ label: "View", href: "/aerial/detect/rf-gnss" }] },
    ],
    closingLine: "Advanced Sensing. Greater Operational Awareness.",
    relatedNews: [],
  },
  {
    slug: "mcray-xtend",
    number: "03",
    name: "MCRAY XTEND",
    headline: "Advancing the Future of UAVs.",
    intro:
      "We focus on advanced UAV manufacturing, bringing aerial platforms and mission-specific capabilities together to support diverse operational requirements.",
    listHeading: "Key Capabilities",
    capabilities: [
      { label: "UAV Manufacturing", links: [] },
      { label: "Fixed-Wing Platforms", links: [] },
      { label: "Multi-Mission UAVs", links: [] },
      {
        label: "Tactical Aerial Platforms",
        links: [
          { label: "Drone response", href: "/surface/respond/drone-response" },
          { label: "Warrior Drone Buddy", href: "/solutions/warrior-drone-buddy" },
        ],
      },
      { label: "Cargo & Defence Applications", links: [] },
    ],
    closingLine: "Advancing Aerial Capabilities for Evolving Missions.",
    relatedNews: ["shephard-xtend-technology-transfer", "toi-xtend-uav-deal"],
  },
];

export function getEcosystemCompany(slug: string) {
  return ECOSYSTEM_COMPANIES.find((c) => c.slug === slug);
}
