import type { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import { allArticles, getArticle, formatNewsDate } from "@/content/company/newsroom";
import { getCoverageBySlug } from "@/content/company/coverage";
import { BreadcrumbSchema, ArticleSchema } from "@/lib/seo/json-ld";

/** Press coverage linked from the home page. Slugs with a matching press item show that item. */
const COVERAGE = ["xtend-partnership", "xtend-coverage", "shephard-coverage"];

export const dynamicParams = false;

export function generateStaticParams() {
  return [...COVERAGE, ...allArticles.map((a) => a.slug)].map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  const item = getCoverageBySlug(slug);
  if (article) {
    return {
      title: article.title,
      description: article.summary,
      alternates: { canonical: `/news/${slug}` },
    };
  }
  if (item) {
    return {
      title: `${item.title} | Rayonix`,
      description: `Press coverage of Rayonix in ${item.source}.`,
      alternates: { canonical: `/news/${slug}` },
    };
  }
  return {
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

  const item = getCoverageBySlug(slug);
  if (item) {
    return (
      <main className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel={item.title}
          crumbs={[{ label: "Home", href: "/" }, { label: "Newsroom", href: "/news" }, { label: "Coverage" }]}
          title={item.title}
          intro={`${item.source} · ${formatNewsDate(item.date)}`}
        >
          <span className="sr-only">Press coverage</span>
        </CompanyHero>
        <CompanySection tone="dark" ariaLabel="Read the coverage">
          <p className="type-body-lg text-[#bdc4c8] max-w-[760px]">
            This coverage is published by {item.source}. Read the full article on their site.
          </p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block type-body font-medium text-[#f5f6f6] hover:text-[#e22328] transition-colors"
          >
            Read in {item.source} →
          </a>
        </CompanySection>
      </main>
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
