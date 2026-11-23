/**
 * Rayonix blog. Text is the company's own article, reproduced from
 * rayonix.in/blog with the client's confirmation. Kept noindex until go-live.
 */
export type BlogPost = {
  slug: string;
  title: string;
  /** Shown as "Month YYYY". The source page shows no visible date, so the client's chosen month is used. */
  date: string; // ISO yyyy-mm-dd (day is not displayed)
  summary: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "self-reliance-need-not-be-solo",
    title:
      "The Journey to Self-Reliance Need Not be Solo: Global Partnerships Powering the 'Made in India' Vision",
    date: "2026-11-01",
    summary:
      "In sectors like aerospace and defense, progress has never been about working in isolation. Nations adopt the most advanced globally available technologies, integrate them into local ecosystems, and build the expertise required to eventually lead innovation themselves.",
    body: [
      "In sectors like aerospace and defense, progress has never been about working in isolation. Nations adopt the most advanced globally available technologies, integrate them into local ecosystems, and build the expertise required to eventually lead innovation themselves.",
      "The underlying fact here is that any significant progress rarely happens overnight. It is built through phases.",
      "Today, India stands at a pivotal point where it has access to global innovation and the ability to strategically identify and integrate the best of technologies to accelerate its growth. This gives India the advantage to move boldly towards its ambition of becoming a truly self-reliant manufacturing and technology powerhouse. The Atmanirbhar dream no longer seems distant, rather with a faster time to market, it feels closer than ever.",
      "However, the catch is that the transition from ‘Make in India’ to ‘Made in India’ is not simply about increasing domestic production, but about building ownership of capabilities. This process follows the route of strengthening intellectual property and creating systems that can help design, develop and scale innovation that can stand at the global stage.",
      "That said, the move from intent to true self-reliance will not be achieved in a single leap. It is a structured and deliberate journey.",
      "This journey begins with identifying the best strategic enablers; like technology, a patented ingredient, a raw material that allows Indian companies to bring advanced and tested methods into the domestic ecosystem. These then enable India to strengthen its technological depth and expand industrial capacity, to further accelerate its move towards self-reliance.",
      "At its very core, such partnerships create a dual advantage. One, they allow for faster deployment of proven technologies while laying the foundation for knowledge transfer and skill development within the country. Second, as India continues to leverage this approach, the outcome extends far beyond production. It leads to capability. Working with global expertise aids in understanding complex technologies in depth, identifying gaps, and building solutions that are tailored to the country’s unique requirements.",
      "Next comes scale. A strong example of this approach is Rayonix’s collaboration with XTEND, where we have brought advanced global technology into India and embedded it within our local manufacturing ecosystems. Through this, we are being able to reinforce the value of global partnerships in the broader shift toward building and scaling capabilities domestically.",
      "Over time, this approach goes beyond integration. It will enable the development of infrastructure and operational depth required to support next-gen systems at scale. It will foster an environment where Indian teams not only adopt global technologies but also adapt and innovate on top of them.",
      "In this sense, global partnerships are not indicators of dependence, but reflections of strategic intent. They represent a conscious effort towards building domestic strength by combining global excellence with local execution.",
      "As we progress, the very vision of Atmanirbar that began as an economic initiative will eventually evolve into a broader transformation, where India will not only be manufacturing but also innovating and leading on a global stage. And in this journey, we see such global collaborations as a strategic bridge between aspiration and execution, because ultimately self-reliance is not about isolation. It is about the ability to learn and lead with confidence in a globally connected world.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

/** "November 2026" from an ISO date. */
export function formatBlogMonth(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}
