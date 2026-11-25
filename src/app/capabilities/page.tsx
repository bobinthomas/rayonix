import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import CapabilityChips from "@/components/common/CapabilityChips";
import ContactTeaser from "@/components/company/ContactTeaser";
import { CAPABILITIES_INTRO, CAPABILITIES_SEO, CAPABILITY_AREAS } from "@/content/capabilities";
import { contactHref } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: CAPABILITIES_SEO.title,
  description: CAPABILITIES_SEO.description,
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Capabilities", href: "/capabilities" },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel="Capabilities"
          crumbs={[{ label: "Home", href: "/" }, { label: "Capabilities" }]}
          title={CAPABILITIES_INTRO.heading}
          intro={CAPABILITIES_INTRO.body}
        >
          <nav aria-label="Capability areas" className="border-t border-[#253035] pt-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {CAPABILITY_AREAS.map((a) => (
                <li key={a.id}>
                  <a href={`#${a.id}`} className="type-small text-[#bdc4c8] hover:text-white">
                    <span className="text-[#e22328]">{a.number}</span> {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </CompanyHero>

        {CAPABILITY_AREAS.map((area, i) => {
          const tone = i % 2 === 0 ? "light" : "dark";
          const ink = tone === "light" ? "text-[#080f12]" : "text-[#f5f6f6]";
          const muted = tone === "light" ? "text-[#2f3639]" : "text-[#bdc4c8]";
          return (
            <CompanySection key={area.id} tone={tone} id={area.id} ariaLabel={area.name}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <p className="type-eyebrow text-[#e22328]">
                    {area.number}. {area.name}
                  </p>
                  <h2 className={`type-h2 ${ink}`}>{area.headline}</h2>
                </div>
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <p className={`type-body-lg ${muted}`}>{area.description}</p>
                  <div className="flex flex-col gap-3">
                    <h3 className={`type-eyebrow ${tone === "light" ? "text-[#7f8a91]" : "text-[#7f8a91]"}`}>
                      Key Capabilities
                    </h3>
                    <CapabilityChips items={area.capabilities} tone={tone} label={`${area.name} key capabilities`} />
                  </div>
                  {area.areaLinks && (
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                      {area.areaLinks.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} prefetch={false} className="type-cta text-[#e22328] underline-offset-4 hover:underline">
                            {l.label} <span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </CompanySection>
          );
        })}

        <ContactTeaser href={contactHref("defence-solutions")} />
      </div>
    </>
  );
}
