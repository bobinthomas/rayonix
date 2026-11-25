import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero, CompanySection } from "@/components/company/ui";
import ContactTeaser from "@/components/company/ContactTeaser";
import LinkCardGrid from "@/components/common/LinkCardGrid";
import { megaMenuData } from "@/content/mega-menu";
import { contactHref } from "@/content/site";
import { solutionGroupId } from "@/content/solutions/groups";

const HERO = {
  eyebrow: "MISSION SOLUTIONS · ARCHITECTURE",
  title: "Integrated Defence Solutions.",
  intro: "Tailored operational capabilities for asymmetric warfare, tactical reconnaissance, and critical asset defence.",
};

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description: HERO.intro,
  path: "/solutions",
});

export default function SolutionsPage() {
  const groups = megaMenuData.solutions.modes;
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel="Solutions"
          eyebrow={HERO.eyebrow}
          crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
          title={HERO.title}
          intro={HERO.intro}
        >
          <nav aria-label="Solution groups" className="flex flex-wrap gap-3">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${solutionGroupId(g.label)}`}
                className="rounded-[2px] border border-[#253035] px-4 py-2 type-small text-[#f5f6f6] hover:border-[#e22328]"
              >
                {g.label}
              </a>
            ))}
          </nav>
        </CompanyHero>

        {groups.map((g, i) => (
          <CompanySection
            key={g.id}
            tone={i % 2 === 0 ? "light" : "dark"}
            id={solutionGroupId(g.label)}
            ariaLabel={g.label}
          >
            <div className="flex flex-col gap-8">
              <h2 className={`type-h2 ${i % 2 === 0 ? "text-[#080f12]" : "text-[#f5f6f6]"}`}>{g.label}</h2>
              <LinkCardGrid items={g.items} tone={i % 2 === 0 ? "light" : "dark"} />
            </div>
          </CompanySection>
        ))}

        <ContactTeaser href={contactHref("defence-solutions")} />
      </div>
    </>
  );
}
