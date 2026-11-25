import { CompanyHero, CompanySection } from "@/components/company/ui";
import CTAButton from "@/components/ui/CTAButton";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { contactHref } from "@/content/site";

/** Legal page shell: summary sentence, full text when supplied, and a contact link. */
export default function LegalPage({
  eyebrow,
  title,
  summary,
  body,
  path,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  body: string[] | null;
  path: string;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: title, href: path },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel={title}
          eyebrow={eyebrow}
          crumbs={[{ label: "Home", href: "/" }, { label: title }]}
          title={title}
          intro={summary}
        />
        <CompanySection tone="light" ariaLabel={`${title} details`}>
          <div className="flex flex-col gap-6 max-w-[860px]">
            {body?.map((p) => (
              <p key={p} className="type-body-lg text-[#2f3639]">
                {p}
              </p>
            ))}
            <p className="type-body-lg text-[#2f3639]">
              For questions about this page, please contact us.
            </p>
            <div>
              <CTAButton href={contactHref("general")} variant="primary">
                Contact us
              </CTAButton>
            </div>
          </div>
        </CompanySection>
      </div>
    </>
  );
}
