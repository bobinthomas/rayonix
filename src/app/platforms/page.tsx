import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero } from "@/components/company/ui";
import ContactTeaser from "@/components/company/ContactTeaser";
import { DOMAIN_SLUGS, PLATFORMS_SEO, getDomain } from "@/content/domains";
import { contactHref } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: PLATFORMS_SEO.title,
  description: PLATFORMS_SEO.description,
  path: "/platforms",
});

export default function PlatformsPage() {
  const domains = DOMAIN_SLUGS.map((s) => getDomain(s)!);
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Platforms", href: "/platforms" },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel="Platforms"
          crumbs={[{ label: "Home", href: "/" }, { label: "Platforms" }]}
          title="Platforms"
          intro={PLATFORMS_SEO.description}
        >
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {domains.map((d) => (
              <li key={d.slug} className="flex">
                <Link
                  href={`/domains/${d.slug}`}
                  prefetch={false}
                  className="group flex flex-col w-full bg-[#10181c] border border-[#253035] rounded-[4px] overflow-hidden hover:border-[#e22328]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e22328]"
                >
                  <div className="relative h-[200px] bg-black/40">
                    <Image
                      src={d.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <span className="type-eyebrow text-[#e22328]">{d.tag}</span>
                    <h2 className="type-h3 text-[#f5f6f6] group-hover:text-[#e22328] transition-colors">{d.name}</h2>
                    <p className="type-body font-medium text-[#f5f6f6]">{d.title}</p>
                    <p className="type-small text-[#bdc4c8]">{d.intro}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CompanyHero>
        <ContactTeaser href={contactHref("defence-solutions")} />
      </div>
    </>
  );
}
