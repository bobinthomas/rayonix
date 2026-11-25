/**
 * Newsroom: the single data file for announcements and media coverage.
 *
 * - `kind: "announcement"` stories have an article page at /news/<slug>.
 * - `kind: "coverage"` stories link out to the publisher (new tab).
 * - `published: false` keeps a story out of the listing, the homepage and the sitemap
 *   (its URL redirects to /news, see next.config.ts).
 *
 * Array order is display order (newest first).
 */

export type NewsKind = "announcement" | "coverage";

export type NewsButton = { label: string; href: string; external?: boolean };

export type NewsStory = {
  slug: string;
  kind: NewsKind;
  published: boolean;
  /** Shown in the homepage Newsroom block. */
  homepage?: boolean;
  /** Category label as supplied, e.g. "DEFENCE TECHNOLOGY | GLOBAL PARTNERSHIP". */
  category: string;
  /** ISO date (yyyy-mm-dd), a month (yyyy-mm, shown as "March 2026"), or null when unknown. */
  date: string | null;
  title: string;
  /** One or more paragraphs. */
  summary: string[];
  /** Coverage: the publisher URL. Null hides the "Read the Coverage" button. */
  coverageUrl?: string | null;
  /** Publisher name for coverage cards. */
  source?: string;
  buttons: NewsButton[];
  image?: { src: string; alt: string };
  /** Article pages only. */
  article?: {
    /** TODO_CONTENT: full article body not supplied; the summary is used as the body. */
    body: string[] | null;
    sourceLink?: { label: string; href: string };
    related: { label: string; href: string }[];
  };
};

export const NEWSROOM_INTRO = {
  eyebrow: "Newsroom",
  heading: "The Latest from Rayonix.",
  body: "Stay connected with our latest announcements, strategic partnerships, media coverage and developments shaping the future of defence technology.",
  cta: "Explore News",
  mediaEnquiries: "Media enquiries",
};

export const NEWS_SEO = {
  title: "Newsroom",
  description:
    "Stay connected with our latest announcements, strategic partnerships, media coverage and developments shaping the future of defence technology.",
};

export const NEWS_FILTERS = [
  { id: "all", label: "All" },
  { id: "announcement", label: "Announcements" },
  { id: "coverage", label: "Media coverage" },
] as const;

export type NewsFilter = (typeof NEWS_FILTERS)[number]["id"];

const TOI_URL =
  "https://timesofindia.indiatimes.com/defence/news/israels-ai-major-in-11-million-deal-with-indian-companies-to-make-uavs-locally/articleshow/129668268.cms";

export const NEWS: NewsStory[] = [
  /* ----------------------------- Client stories ---------------------------- */
  {
    slug: "guideline-geo-gpr-partnership",
    kind: "announcement",
    published: true,
    homepage: true,
    category: "DEFENCE TECHNOLOGY | GLOBAL PARTNERSHIP",
    date: "2026-10-27",
    title: "Rayonix and Guideline Geo Join Forces in $1.7 Million Defence Technology Deal",
    summary: [
      "Our strategic partnership with Guideline Geo advances drone-based ground-penetrating radar (GPR) solutions, combining AI-driven sensing and multi-sensor integration to strengthen IED detection capabilities.",
    ],
    buttons: [{ label: "Read the Announcement", href: "/news/guideline-geo-gpr-partnership" }],
    // TODO_CONTENT: story image
    article: {
      body: null, // TODO_CONTENT: full article body
      sourceLink: {
        label: "Guideline Geo release",
        href: "https://www.inderes.se/releases/guideline-geo-wins-17-musd-order-from-a-strategic-partner-in-the-defense-sector",
      },
      related: [
        { label: "Ground-penetrating radar", href: "/subsurface/detect/gpr" },
        { label: "IED detection", href: "/solutions/ied-detection" },
      ],
    },
  },
  {
    slug: "sri-lanka-metropolitan-partnership",
    kind: "announcement",
    published: true,
    homepage: true,
    category: "GLOBAL EXPANSION",
    date: null, // TODO_CONTENT: publication date (sorted second until known)
    title: "A Strategic Partnership. A Broader Horizon. Sri Lanka.",
    // Verify the name and title of Roshan Tissera, CEO of Metropolitan Group, before production.
    summary: [
      "We are expanding our global footprint through a strategic partnership with Metropolitan Technologies, bringing advanced defence technologies and intelligence-driven security solutions to Sri Lanka.",
      "The partnership between Roshan Tissera, CEO of Metropolitan Group, and Nat Iyer, Director of Rayonix Australia, marks the beginning of a new chapter in our global expansion.",
    ],
    buttons: [{ label: "Explore the Partnership", href: "/news/sri-lanka-metropolitan-partnership" }],
    // TODO_CONTENT: story image
    article: {
      body: null, // TODO_CONTENT: full article body
      related: [{ label: "Our global presence", href: "/contact#global-presence" }],
    },
  },
  {
    slug: "shephard-xtend-technology-transfer",
    kind: "coverage",
    published: true,
    homepage: true,
    category: "Shephard",
    source: "Shephard",
    date: "2026-04-16",
    title: "India's Drone Industry Ambitions Accelerate with XTEND Technology Transfer Deal",
    summary: [
      "The agreement supports technology transfer and local manufacturing, strengthening India's capabilities in AI-enabled tactical and interceptor drone systems.",
    ],
    coverageUrl:
      "https://www.shephardmedia.com/news/landwarfareintl/india-drone-industry-ambitions-accelerates-with-xtend-technology-transfer-deal/",
    buttons: [
      {
        label: "Discover the Story",
        href: "https://www.shephardmedia.com/news/landwarfareintl/india-drone-industry-ambitions-accelerates-with-xtend-technology-transfer-deal/",
        external: true,
      },
    ],
    image: { src: "/assets/story-news2-v5.webp", alt: "Tactical drone in flight over open terrain" },
  },
  {
    slug: "toi-xtend-uav-deal",
    kind: "coverage",
    published: true,
    homepage: true,
    category: "Defence HQ | TOI",
    source: "Defence HQ · TOI",
    date: "2026-03",
    title: "Israel's AI Major in $11 Million Deal with Indian Company to Make UAVs Locally",
    summary: [
      "Our partnership with XTEND advances local UAV manufacturing, testing and distribution, supported by technology transfer and autonomous systems.",
    ],
    // The brief lists this link as unknown. This URL was already on the site (former coverage.ts,
    // taken from rayonix.in/newsroom). TODO_CONTENT: confirm, or set to null to hide the button.
    coverageUrl: TOI_URL,
    buttons: [
      { label: "Explore the Partnership", href: "/ecosystem/mcray-xtend" },
      { label: "Read the Coverage", href: TOI_URL, external: true },
    ],
    image: { src: "/assets/story-news1-v5.webp", alt: "UAV on a test stand during a manufacturing and integration trial" },
  },

  /* ------------------ Earlier press coverage already on the site ------------------ */
  {
    slug: "the-hindu-magellanic-jv",
    kind: "coverage",
    published: true,
    category: "The Hindu",
    source: "The Hindu",
    date: "2026-04-28",
    title: "Magellanic, Rayonix ink $11 million JV pact for defence drones",
    summary: [],
    coverageUrl:
      "https://www.thehindu.com/news/cities/Hyderabad/magellanic-rayonix-ink-11-million-jv-pact-for-defence-drones/article70916684.ece",
    buttons: [],
  },
  {
    slug: "the-week-magellanic-jv",
    kind: "coverage",
    published: true,
    category: "The Week",
    source: "The Week",
    date: "2026-04-28",
    title: "India's drone ecosystem gets boost with ₹100-crore Magellanic-Rayonix JV",
    summary: [],
    coverageUrl:
      "https://www.theweek.in/news/defence/2026/04/28/indias-drone-ecosystem-gets-boost-with-indian-rupee100-crore-magellanic-rayonix-jv.html",
    buttons: [],
  },
  {
    slug: "the-week-xtend-deal",
    kind: "coverage",
    published: true,
    category: "The Week",
    source: "The Week",
    date: "2026-03-18",
    title:
      "An Israeli push to India's drone making dreams: What does the $11 million XTEND-Rayonix Tech AI defence deal mean?",
    summary: [],
    coverageUrl:
      "https://www.theweek.in/news/defence/2026/03/18/an-israeli-push-to-indias-drone-making-dreams-what-does-the-dollar11-million-xtend-rayonix-tech-ai-defence-deal-mean.html",
    buttons: [],
  },
  {
    slug: "globenewswire-xtend-agreement",
    kind: "coverage",
    published: true,
    category: "GlobeNewswire",
    source: "GlobeNewswire",
    date: "2026-03-16",
    title: "Rayonix has been appointed XTEND's exclusive manufacturing and distribution partner for XTEND platforms in India.",
    summary: [],
    coverageUrl:
      "https://www.globenewswire.com/news-release/2026/03/16/3256282/0/en/JFB-NASDAQ-JFB-Announces-XTEND-and-Rayonix-Execute-Exclusive-Manufacturing-and-Distribution-Agreement-with-Initial-11-Million-Commitment-to-Expand-XOS-Platform-into-India.html",
    buttons: [],
  },
  {
    slug: "investing-xtend-agreement",
    kind: "coverage",
    // TODO_CONTENT: the supplied link points at an unrelated JFB Construction article. Unpublished until replaced.
    published: false,
    category: "Investing.com",
    source: "Investing.com",
    date: "2026-03-16",
    title: "XTEND has entered into an $11 million agreement with Rayonix Tech Private Limited to expand its XOS autonomy platform in India.",
    summary: [],
    coverageUrl:
      "https://www.investing.com/news/company-news/jfb-construction-sets-march-25-stock-split-ahead-of-xtend-merger-93CH-4564496",
    buttons: [],
  },

  /* ---------------- Retired placeholder stories (URLs 301 to /news) ---------------- */
  {
    slug: "aero-india-integrated-suite",
    kind: "announcement",
    published: false,
    category: "Exhibition & Defence Showcase",
    date: "2026-02-18",
    title: "Rayonix Showcases Integrated Subsurface & Aerial Suite at Aero India",
    summary: [],
    buttons: [],
  },
  {
    slug: "extreme-cold-testing-gpr-18000-ft",
    kind: "announcement",
    published: false,
    category: "Field Trials",
    date: "2026-01-24",
    title: "Extreme Cold Testing: Ground Penetrating Radar Achieves 100% Reliability at 18,000 ft",
    summary: [],
    buttons: [],
  },
  {
    slug: "x-labs-swarm-d-loitering-munition",
    kind: "announcement",
    published: false,
    category: "Product Milestone",
    date: "2026-01-12",
    title: "X Labs Unveils Next-Gen Swarm-D Autonomous Loitering Munition Architecture",
    summary: [],
    buttons: [],
  },
  {
    slug: "australia-bilateral-integration-facility-canberra",
    kind: "announcement",
    published: false,
    category: "Partnerships & Grants",
    date: "2025-12-28",
    title: "Rayonix and Australia Bilateral Defence Integration Facility Formed in Canberra",
    summary: [],
    buttons: [],
  },
];

export const publishedNews = NEWS.filter((s) => s.published);
export const homepageNews = publishedNews.filter((s) => s.homepage);
export const publishedArticles = publishedNews.filter((s) => s.kind === "announcement" && s.article);

export function getStory(slug: string) {
  return NEWS.find((s) => s.slug === slug);
}

/** Primary destination of a story card. */
export function storyHref(s: NewsStory): { href: string; external: boolean } | null {
  if (s.kind === "announcement") return { href: `/news/${s.slug}`, external: false };
  return s.coverageUrl ? { href: s.coverageUrl, external: true } : null;
}

export function formatNewsDate(date: string | null): string | null {
  if (!date) return null;
  if (/^\d{4}-\d{2}$/.test(date)) {
    return new Date(`${date}-01T00:00:00Z`).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Machine-readable value for <time dateTime>. */
export function isoDate(date: string | null): string | undefined {
  return date ?? undefined;
}
