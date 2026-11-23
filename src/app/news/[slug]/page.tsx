import type { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";
import { allArticles, getArticle } from "@/content/company/newsroom";
import { BreadcrumbSchema, ArticleSchema } from "@/lib/seo/json-ld";

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
    ? {
        title: article.title,
        description: article.summary,
        alternates: { canonical: `/news/${slug}` },
      }
    : {
        title: `Coverage: ${slug} | Newsroom | Rayonix`,
        description: `Full dispatch text and media assets for ${slug} are being indexed.`,
        alternates: { canonical: `/news/${slug}` },
        robots: { index: false, follow: true },
      };
}

export default async function NewsSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  
  if (article) {
    return (
      <>
        <BreadcrumbSchema
          items={[
            { name: "Home", href: "/" },
            { name: "Newsroom", href: "/news" },
            { name: article.title, href: `/news/${article.slug}` },
          ]}
        />
        <ArticleSchema
          title={article.title}
          description={article.summary}
          url={`/news/${article.slug}`}
          datePublished={article.date}
          image={article.image?.src}
          authorName="Rayonix Defence Technologies"
        />
        <TacticalPlaceholder
          badge={`NEWSROOM · ${article.tag.toUpperCase()}`}
          title={article.title}
          subtitle={article.summary}
        />
      </>
    );
  }

  return (
    <TacticalPlaceholder
      badge="PRESS COVERAGE · DISPATCH"
      title="Strategic Defence Announcement"
      subtitle={`Full dispatch text and media assets for "${slug}" are being indexed.`}
    />
  );
}
