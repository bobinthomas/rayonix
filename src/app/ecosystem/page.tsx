import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/company/ui";
import ContactTeaser from "@/components/company/ContactTeaser";
import TransformingHeading from "@/components/ui/TransformingHeading";
import { ECOSYSTEM_COMPANIES, ECOSYSTEM_HUB } from "@/content/ecosystem";
import { contactHref } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: ECOSYSTEM_HUB.seo.title,
  description: ECOSYSTEM_HUB.seo.description,
  path: "/ecosystem",
});

export default function EcosystemPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Ecosystem", href: "/ecosystem" },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12] text-[#f5f6f6]">
        <section aria-label="Ecosystem" className="pt-28 sm:pt-32 pb-16 lg:pb-24">
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10 lg:gap-14">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Ecosystem" }]} />
            <TransformingHeading as="h1" text={ECOSYSTEM_HUB.heading} className="type-hero text-[#f5f6f6]" />
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {ECOSYSTEM_COMPANIES.map((c) => (
                <li key={c.slug} className="flex">
                  <Link
                    href={`/ecosystem/${c.slug}`}
                    prefetch={false}
                    className="group flex flex-col justify-between gap-10 w-full bg-[#10181c] border border-[#253035] rounded-[4px] p-6 lg:p-8 transition-colors hover:border-[#e22328]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328]"
                  >
                    <div className="flex flex-col gap-4">
                      <span className="type-h3 text-[#e22328]">{c.number}</span>
                      <h2 className="type-h2 text-[#f5f6f6]">{c.name}</h2>
                      <p className="type-statement text-[#bdc4c8]">{c.headline}</p>
                      <p className="type-body text-[#7f8a91]">{c.intro}</p>
                    </div>
                    <span className="type-cta text-[#e22328] group-hover:underline underline-offset-4">
                      Explore {c.name} <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <ContactTeaser href={contactHref("partnerships")} />
      </div>
    </>
  );
}
