import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import CareerApplyList from "@/components/company/CareerApplyList";
import CTAButton from "@/components/ui/CTAButton";
import { BUILD_WITH_US, CAREERS_EMPTY, CAREERS_SEO } from "@/content/careers";
import { getPublishedCareerRoles } from "@/lib/cms";
import { CAREERS_LABEL, contactHref } from "@/content/site";

export const runtime = "edge";

export const metadata: Metadata = pageMetadata({
  title: CAREERS_SEO.title,
  description: CAREERS_SEO.description,
  path: "/careers",
});

export default async function CareersPage() {
  const roles = await getPublishedCareerRoles();
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Company", href: "/about" },
          { name: CAREERS_LABEL, href: "/careers" },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel={CAREERS_LABEL}
          eyebrow={BUILD_WITH_US.eyebrow}
          crumbs={[{ label: "Home", href: "/" }, { label: "Company", href: "/about" }, { label: CAREERS_LABEL }]}
          title={BUILD_WITH_US.heading}
          intro={BUILD_WITH_US.lines[0]}
        >
          <div className="flex flex-col gap-8 -mt-2">
            {BUILD_WITH_US.lines.slice(1).map((line) => (
              <p key={line} className="type-body-lg text-[#bdc4c8] max-w-[1176px]">
                {line}
              </p>
            ))}
            <div>
              <CTAButton href="#open-positions" variant="primary">
                {BUILD_WITH_US.cta}
              </CTAButton>
            </div>
          </div>
        </CompanyHero>

        <CompanySection tone="light" id="open-positions" ariaLabel={CAREERS_EMPTY.heading}>
          <div className="flex flex-col gap-8">
            <h2 className="type-h2 text-[#080f12]">{CAREERS_EMPTY.heading}</h2>
            {roles.length ? (
              <CareerApplyList roles={roles} />
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white border border-[#d5dadc] rounded-[4px] p-6 sm:p-10">
                <p className="type-body-lg text-[#080f12]">{CAREERS_EMPTY.message}</p>
                <CTAButton href={contactHref("careers")} variant="primary">
                  {CAREERS_EMPTY.cta}
                </CTAButton>
              </div>
            )}
          </div>
        </CompanySection>
      </div>
    </>
  );
}
