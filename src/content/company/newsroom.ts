/**
 * Newsroom content (Figma 556:7661 "Newsroom").
 * Copy is as supplied in the Figma design; replace with confirmed releases before launch.
 */

export type NewsCategory = "press-release" | "exhibition" | "announcement";

export const NEWS_FILTERS: { id: "all" | NewsCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "press-release", label: "Press releases" },
  { id: "exhibition", label: "Exhibitions" },
  { id: "announcement", label: "Announcements" },
];

export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  /** Badge shown on the card image. */
  tag: string;
  date: string; // ISO yyyy-mm-dd
  location?: string;
  title: string;
  summary: string;
  readTime?: string;
  kind?: string;
  image?: { src: string; alt: string };
}

export const featuredArticle: NewsArticle = {
  slug: "aero-india-integrated-suite",
  category: "exhibition",
  tag: "Exhibition & Defense Showcase",
  date: "2026-02-18",
  location: "Bengaluru, India",
  title: "Rayonix Showcases Integrated Subsurface & Aerial Suite at Aero India",
  summary:
    "Demonstrating operational live feeds of autonomous subterranean tunnel detection alongside tactical swarm loitering munitions to sovereign defense delegations and allied procurement leaders.",
  kind: "Press Release",
  readTime: "4 min read",
  image: {
    src: "/assets/company/news-featured-aero-india.jpg",
    alt: "Rayonix delegation at a defence exhibition stand with loitering munitions and radar displays",
  },
};

export const articles: NewsArticle[] = [
  {
    slug: "extreme-cold-testing-gpr-18000-ft",
    category: "press-release",
    tag: "Field Trials",
    date: "2026-01-24",
    title: "Extreme Cold Testing: Ground Penetrating Radar Achieves 100% Reliability at 18,000 ft",
    summary:
      "Sub-zero operational evaluation completed in high-altitude northern sectors, validating subterranean anomaly detection in permafrost.",
    image: {
      src: "/assets/company/news-himalayan-gpr.jpg",
      alt: "Ground penetrating radar and sensor station deployed on a snow-covered Himalayan proving ground",
    },
  },
  {
    slug: "x-labs-swarm-d-loitering-munition",
    category: "announcement",
    tag: "Product Milestone",
    date: "2026-01-12",
    title: "X Labs Unveils Next-Gen Swarm-D Autonomous Loitering Munition Architecture",
    summary:
      "Equipped with neuromorphic edge intelligence and decentralized swarm mesh protocol for GPS-denied environments.",
  },
  {
    slug: "australia-bilateral-integration-facility-canberra",
    category: "announcement",
    tag: "Partnerships & Grants",
    date: "2025-12-28",
    title: "Rayonix and Australia Bilateral Defense Integration Facility Formed in Canberra",
    summary:
      "Accelerating collaborative sovereign testing for subsurface autonomous acoustics and multi-sensor edge intelligence.",
  },
];

export const allArticles = [featuredArticle, ...articles];

export function getArticle(slug: string) {
  return allArticles.find((a) => a.slug === slug);
}

export function formatNewsDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
