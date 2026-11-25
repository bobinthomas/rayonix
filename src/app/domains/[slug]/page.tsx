import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero, CompanySection, CornerTicks } from "@/components/company/ui";
import ContactTeaser from "@/components/company/ContactTeaser";
import LinkCardGrid from "@/components/common/LinkCardGrid";
import { DOMAIN_SLUGS, getDomain } from "@/content/domains";
import { contactHref } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return DOMAIN_SLUGS.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getDomain(slug);
  if (!d) return {};
  return pageMetadata({
    title: `${d.name}: ${d.title}`,
    description: [d.intro, d.extraIntro].filter(Boolean).join(" "),
    path: `/domains/${slug}`,
  });
}

export default async function DomainPage({ params }: Props) {
  const { slug } = await params;
  const d = getDomain(slug);
  if (!d) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Platforms", href: "/platforms" },
          { name: d.name, href: `/domains/${d.slug}` },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel={`${d.name} overview`}
          eyebrow={d.tag}
          crumbs={[{ label: "Home", href: "/" }, { label: "Platforms", href: "/platforms" }, { label: d.name }]}
          title={d.title}
          intro={d.intro}
          introBeside
        >
          {d.extraIntro && <p className="type-body-lg text-[#bdc4c8] max-w-[880px]">{d.extraIntro}</p>}
          <nav aria-label={`${d.name} stages`} className="flex flex-wrap gap-3">
            {d.stages.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-[2px] border border-[#253035] px-4 py-2 type-small text-[#f5f6f6] hover:border-[#e22328]"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="relative bg-[#10181c] border border-[#253035] rounded-[4px] p-2 sm:p-[9px]">
            <div className="relative h-[220px] sm:h-[360px] lg:h-[460px] rounded-[2px] overflow-hidden">
              <Image
                src={d.image}
                alt={`${d.name} domain: ${d.title}`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1270px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080f12] via-transparent to-transparent" aria-hidden="true" />
            </div>
            <CornerTicks />
          </div>
        </CompanyHero>

        {d.stages.map((stage, i) =>
          stage.items.length ? (
            <CompanySection
              key={stage.id}
              tone={i % 2 === 0 ? "light" : "dark"}
              id={stage.id}
              ariaLabel={`${d.name} ${stage.label}`}
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <p className="type-eyebrow text-[#e22328]">
                    {String(i + 1).padStart(2, "0")} · {d.name}
                  </p>
                  <h2 className={`type-h2 ${i % 2 === 0 ? "text-[#080f12]" : "text-[#f5f6f6]"}`}>{stage.label}</h2>
                </div>
                <LinkCardGrid items={stage.items} tone={i % 2 === 0 ? "light" : "dark"} />
              </div>
            </CompanySection>
          ) : null
        )}

        <ContactTeaser href={contactHref("defence-solutions")} />
      </div>
    </>
  );
}
