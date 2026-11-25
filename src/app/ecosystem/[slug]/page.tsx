import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import ContactTeaser from "@/components/company/ContactTeaser";
import StoryCard from "@/components/company/StoryCard";
import CapabilityChips from "@/components/common/CapabilityChips";
import { getEcosystemCompany } from "@/content/ecosystem";
import { getStory, type NewsStory } from "@/content/news";
import { contactHref } from "@/content/site";

// x-labs has its own page: src/app/ecosystem/x-labs/page.tsx
const SLUGS = ["nexr-optronics", "mcray-xtend"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getEcosystemCompany(slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name}: ${c.headline}`,
    description: c.intro,
    path: `/ecosystem/${slug}`,
  });
}

export default async function EcosystemCompanyPage({ params }: Props) {
  const { slug } = await params;
  const c = getEcosystemCompany(slug);
  if (!c) notFound();

  const related = c.relatedNews
    .map(getStory)
    .filter((s): s is NewsStory => !!s && s.published);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Ecosystem", href: "/ecosystem" },
          { name: c.name, href: `/ecosystem/${c.slug}` },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel={c.name}
          eyebrow={c.name}
          crumbs={[{ label: "Home", href: "/" }, { label: "Ecosystem", href: "/ecosystem" }, { label: c.name }]}
          title={c.headline}
          intro={c.intro}
        />

        <CompanySection tone="light" id="capabilities" ariaLabel={c.listHeading}>
          <div className="flex flex-col gap-8">
            <h2 className="type-h2 text-[#080f12]">{c.listHeading}</h2>
            <CapabilityChips items={c.capabilities} tone="light" label={c.listHeading} />
          </div>
        </CompanySection>

        <section aria-label="Closing line" className="w-full bg-[#080f12] border-t border-[#253035] py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8">
            <p className="type-hero text-[#f5f6f6] max-w-[1100px]">{c.closingLine}</p>
          </div>
        </section>

        {related.length > 0 && (
          <CompanySection tone="light" ariaLabel="Related news">
            <div className="flex flex-col gap-8">
              <h2 className="type-h2 text-[#080f12]">Related news</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((s) => (
                  <li key={s.slug}>
                    <StoryCard story={s} />
                  </li>
                ))}
              </ul>
            </div>
          </CompanySection>
        )}

        <ContactTeaser href={contactHref("partnerships")} />
      </div>
    </>
  );
}
