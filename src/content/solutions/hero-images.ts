/**
 * Hero banner per solution slug (optimized WebP in public/assets/banners).
 * Applied in src/content/solutions/index.ts when hero.image is not already set.
 */
export const solutionHeroImages: Record<string, { src: string; alt: string }> = {
  iccs: {
    src: "/assets/banners/solution-iccs.webp",
    alt: "ICCS — Integrated Command & Control System banner",
  },
  srop: {
    src: "/assets/banners/solution-srop.webp",
    alt: "SROP — Smart Range Operations Platform banner",
  },
  "ied-detection": {
    src: "/assets/banners/solution-ied-detection.webp",
    alt: "IED Detection Solution banner",
  },
  "warrior-drone-buddy": {
    src: "/assets/banners/solution-warrior-drone-buddy.webp",
    alt: "Warrior Drone Buddy banner",
  },
  gmts: {
    src: "/assets/banners/solution-gmts.webp",
    alt: "GMTS — Geo-Spatial Mapping & Tracking System banner",
  },
  sdrr: {
    src: "/assets/banners/solution-sdrr.webp",
    alt: "SDRR — Software Defined Radio & Relay banner",
  },
  "foliage-penetration": {
    src: "/assets/banners/solution-foliage-penetration.webp",
    alt: "Foliage Penetration Radar Solution banner",
  },
  "critical-infrastructure-protection": {
    src: "/assets/banners/solution-critical-infrastructure-protection.webp",
    alt: "Critical Infrastructure Protection banner",
  },
  "facial-recognition": {
    src: "/assets/banners/solution-facial-recognition.webp",
    alt: "Facial Recognition System banner",
  },
  "video-analytics": {
    src: "/assets/banners/solution-video-analytics.webp",
    alt: "AI Video Analytics Solution banner",
  },
};
