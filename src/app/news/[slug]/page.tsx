import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema, ArticleSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import { formatNewsDate } from "@/content/news";
import { getNewsStoryBySlug } from "@/lib/cms";

export const runtime = "edge";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getNewsStoryBySlug(slug);
  if (!story) return {};
  return pageMetadata({
    title: story.title,
    description: story.summary[0] ?? story.title,
    path: `/news/${slug}`,
    type: "article",
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const story = await getNewsStoryBySlug(slug);
  if (!story || !story.published || !story.article) notFound();

  const date = formatNewsDate(story.date);
  const body = story.article.body ?? story.summary;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Newsroom", href: "/news" },
          { name: story.title, href: `/news/${story.slug}` },
        ]}
      />
      {story.date && /^\d{4}-\d{2}-\d{2}$/.test(story.date) && (
        <ArticleSchema
          title={story.title}
          description={story.summary[0] ?? story.title}
          url={`/news/${story.slug}`}
          datePublished={story.date}
          image={story.image?.src}
          authorName="Rayonix Defence Technologies"
        />
      )}
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel={story.title}
          eyebrow={story.category}
          crumbs={[{ label: "Home", href: "/" }, { label: "Newsroom", href: "/news" }, { label: "Announcement" }]}
          title={story.title}
          intro={date ?? undefined}
        />

        <CompanySection tone="light" ariaLabel="Article">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8 flex flex-col gap-6">
              {body.map((p) => (
                <p key={p} className="type-body-lg text-[#2f3639]">
                  {p}
                </p>
              ))}
              {story.article.sourceLink && (
                <p className="type-body text-[#2f3639]">
                  Source:{" "}
                  <a
                    href={story.article.sourceLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e22328] underline underline-offset-4"
                  >
                    {story.article.sourceLink.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              )}
              <div className="pt-4">
                <Link href="/news" prefetch={false} className="type-cta text-[#e22328] underline-offset-4 hover:underline">
                  <span aria-hidden="true">←</span> Back to Newsroom
                </Link>
              </div>
            </div>
            {story.article.related.length > 0 && (
              <aside aria-labelledby="related-heading" className="lg:col-span-4 flex flex-col gap-4 bg-white border border-[#d5dadc] rounded-[4px] p-6">
                <h2 id="related-heading" className="type-eyebrow text-[#7f8a91]">
                  Related
                </h2>
                <ul className="flex flex-col gap-3">
                  {story.article.related.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} prefetch={false} className="type-body font-medium text-[#080f12] hover:text-[#e22328]">
                        {r.label} <span aria-hidden="true" className="text-[#e22328]">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </article>
        </CompanySection>
      </div>
    </>
  );
}
