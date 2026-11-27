import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import NewsList from "@/components/company/NewsList";
import { NEWSROOM_INTRO, NEWS_SEO } from "@/content/news";
import { getPublishedNews } from "@/lib/cms";
import { contactHref } from "@/content/site";

export const runtime = "edge";

export const metadata: Metadata = pageMetadata({
  title: NEWS_SEO.title,
  description: NEWS_SEO.description,
  path: "/news",
});

export default async function NewsPage() {
  const stories = await getPublishedNews();
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Company", href: "/about" },
          { name: "Newsroom", href: "/news" },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel="Newsroom"
          eyebrow={NEWSROOM_INTRO.eyebrow}
          crumbs={[{ label: "Home", href: "/" }, { label: "Company", href: "/about" }, { label: "Newsroom" }]}
          title={NEWSROOM_INTRO.heading}
          intro={NEWSROOM_INTRO.body}
        >
          <div>
            <Link
              href={contactHref("media")}
              prefetch={false}
              className="type-cta text-[#e22328] underline-offset-4 hover:underline"
            >
              {NEWSROOM_INTRO.mediaEnquiries} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </CompanyHero>

        <CompanySection tone="light" ariaLabel="Announcements and media coverage">
          <NewsList stories={stories} />
        </CompanySection>
      </div>
    </>
  );
}
