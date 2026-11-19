import type { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";
import { allArticles, getArticle } from "@/content/company/newsroom";

/** Press coverage linked from the home page (no newsroom entry yet). */
const COVERAGE = ["xtend-partnership", "xtend-coverage", "shephard-coverage"];

export const dynamicParams = false;

export function generateStaticParams() {
  return [...COVERAGE, ...allArticles.map((a) => a.slug)].map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article
    ? { title: `${article.title} | Newsroom | Rayonix`, description: article.summary }
    : { title: "Newsroom | Rayonix" };
}

export default async function NewsSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  // Full article bodies are not written yet: show the headline and summary.
  return article ? (
    <TacticalPlaceholder badge={`NEWSROOM · ${article.tag.toUpperCase()}`} title={article.title} subtitle={article.summary} />
  ) : (
    <TacticalPlaceholder
      badge="PRESS COVERAGE · DISPATCH"
      title="Strategic Defence Announcement"
      subtitle={`Full dispatch text and media assets for "${slug}" are being indexed.`}
    />
  );
}
