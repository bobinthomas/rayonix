import type { Metadata } from "next";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import NewsArchive from "@/components/company/NewsArchive";
import { articles, featuredArticle, formatNewsDate } from "@/content/company/newsroom";

export const metadata: Metadata = {
  title: "Newsroom | Rayonix Defence Technologies",
  description:
    "Official announcements, field testing milestones, defence symposium showcases, and strategic partnerships from Rayonix's global engineering hubs.",
  alternates: { canonical: "/news" },
};

/** Figma 556:7661 "Newsroom". */
export default function NewsPage() {
  const f = featuredArticle;
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Company", href: "/about" },
          { name: "Newsroom", href: "/news" },
        ]}
      />
      <main className="relative w-full min-h-screen bg-[#080f12]">
      <CompanyHero
        ariaLabel="Newsroom"
        crumbs={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "Newsroom" }]}
        title="The latest from Rayonix."
        intro="Official announcements, field testing milestones, defence symposium showcases, and strategic partnerships from our global engineering hubs."
        introBeside
      >
        {/* Featured press card (556:8134) */}
        <article className="relative grid grid-cols-1 lg:grid-cols-[745fr_533fr] bg-[#10181c] border border-[rgba(226,35,40,0.4)] rounded-[8px] overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <div className="relative h-[240px] sm:h-[360px] lg:h-auto lg:min-h-[479px] bg-[#080f12]">
            {f.image && (
              <Image
                src={f.image.src}
                alt={f.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 745px"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#10181c] via-transparent to-transparent opacity-30" aria-hidden="true" />
          </div>
          <div className="flex flex-col justify-between gap-6 p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start gap-3">
                <span className="bg-[#e22328] rounded-[2px] px-3 py-1 type-caption font-medium text-[#fffbff]">
                  {f.tag}
                </span>
                <p className="type-caption text-[#7f8a91]">
                  <time dateTime={f.date}>{formatNewsDate(f.date)}</time>
                  {f.location && <> • {f.location}</>}
                </p>
              </div>
              <h2 className="pt-1 type-h3 text-[#f5f6f6]">{f.title}</h2>
              <p className="type-body text-[#bdc4c8]">{f.summary}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#253035] pt-8">
              <p className="type-caption text-[#7f8a91]">
                {[f.kind, f.readTime].filter(Boolean).join(" • ")}
              </p>
              <CTAButton href={`/news/${f.slug}`} variant="primary">
                Read full press release
              </CTAButton>
            </div>
          </div>
          {/* Tactical reticle accents (556:8160–8167) */}
          <div className="absolute left-3 top-3 hidden sm:flex items-center gap-[6px] pointer-events-none select-none" aria-hidden="true">
            <span className="size-2 border-l-2 border-t-2 border-[#e22328]" />
            <span className="font-mono text-[10px] leading-[24px] tracking-[0.5px] text-[#7f8a91]">Rayonix Press Dispatch // 01</span>
          </div>
          <span className="absolute right-3 top-[21px] size-2 border-r-2 border-t-2 border-[#e22328] pointer-events-none" aria-hidden="true" />
          <span className="absolute right-3 bottom-[19px] size-2 border-r-2 border-b-2 border-[#e22328] pointer-events-none" aria-hidden="true" />
        </article>
      </CompanyHero>

      {/* Filterable archive (556:8169) */}
      <CompanySection tone="light" ariaLabel="Press releases and field bulletins">
        <NewsArchive articles={articles} featured={featuredArticle} />
      </CompanySection>
    </main>
    </>
  );
}
