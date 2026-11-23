/**
 * Press coverage of Rayonix from third-party publications. Headlines are taken
 * word for word from the newsroom listing at rayonix.in/newsroom. Cards link out
 * to the publisher; article text is not reproduced.
 */
export type CoverageItem = {
  id: string;
  slug: string | null;
  title: string;
  source: string;
  date: string; // ISO yyyy-mm-dd
  url: string;
};

export const coverage: CoverageItem[] = [
  {
    id: "the-hindu-jv",
    slug: null,
    title: "Magellanic, Rayonix ink $11 million JV pact for defence drones",
    source: "The Hindu",
    date: "2026-04-28",
    url: "https://www.thehindu.com/news/cities/Hyderabad/magellanic-rayonix-ink-11-million-jv-pact-for-defence-drones/article70916684.ece",
  },
  {
    id: "the-week-jv",
    slug: null,
    title: "India's drone ecosystem gets boost with ₹100-crore Magellanic-Rayonix JV",
    source: "The Week",
    date: "2026-04-28",
    url: "https://www.theweek.in/news/defence/2026/04/28/indias-drone-ecosystem-gets-boost-with-indian-rupee100-crore-magellanic-rayonix-jv.html",
  },
  {
    id: "toi-xos",
    slug: "xtend-coverage",
    title: "XTEND's XOS operating system will serve as the software backbone of UAV systems manufactured by Rayonix in India.",
    source: "Times of India",
    date: "2026-03-19",
    url: "https://timesofindia.indiatimes.com/defence/news/israels-ai-major-in-11-million-deal-with-indian-companies-to-make-uavs-locally/articleshow/129668268.cms",
  },
  {
    id: "the-week-xtend",
    slug: null,
    title: "An Israeli push to India's drone making dreams: What does the $11 million XTEND-Rayonix Tech AI defence deal mean?",
    source: "The Week",
    date: "2026-03-18",
    url: "https://www.theweek.in/news/defence/2026/03/18/an-israeli-push-to-indias-drone-making-dreams-what-does-the-dollar11-million-xtend-rayonix-tech-ai-defence-deal-mean.html",
  },
  {
    id: "globenewswire-partner",
    slug: "xtend-partnership",
    title: "Rayonix has been appointed XTEND's exclusive manufacturing and distribution partner for XTEND platforms in India.",
    source: "GlobeNewswire",
    date: "2026-03-16",
    url: "https://www.globenewswire.com/news-release/2026/03/16/3256282/0/en/JFB-NASDAQ-JFB-Announces-XTEND-and-Rayonix-Execute-Exclusive-Manufacturing-and-Distribution-Agreement-with-Initial-11-Million-Commitment-to-Expand-XOS-Platform-into-India.html",
  },
  {
    // Link kept as the client asked, but it points at a JFB Construction article; to be replaced.
    id: "investing-xtend",
    slug: null,
    title: "XTEND has entered into an $11 million agreement with Rayonix Tech Private Limited to expand its XOS autonomy platform in India.",
    source: "Investing.com",
    date: "2026-03-16",
    url: "https://www.investing.com/news/company-news/jfb-construction-sets-march-25-stock-split-ahead-of-xtend-merger-93CH-4564496",
  },
];

export function getCoverageBySlug(slug: string) {
  return coverage.find((c) => c.slug === slug);
}
