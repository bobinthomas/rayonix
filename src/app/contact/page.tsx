import type { Metadata } from "next";
import { Suspense } from "react";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { CompanyHero } from "@/components/company/ui";
import ContactForm from "@/components/contact/ContactForm";
import GlobalPresence from "@/components/contact/GlobalPresence";
import BuildWithUsBand from "@/components/company/BuildWithUsBand";
import { CONTACT_PAGE } from "@/content/contact";
import { CONTACT, OFFICES } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: CONTACT_PAGE.seo.title,
  description: CONTACT_PAGE.seo.description,
  path: "/contact",
});

function ContactDetails() {
  const india = OFFICES.find((o) => o.id === "india");
  return (
    <aside aria-label="Contact details" className="flex flex-col gap-6 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 sm:p-8">
      <h2 className="type-h3 text-[#f5f6f6]">Reach us directly</h2>
      <dl className="flex flex-col gap-5 type-body">
        <div className="flex flex-col gap-1">
          <dt className="type-eyebrow text-[#7f8a91]">Email</dt>
          <dd>
            <a href={`mailto:${CONTACT.email}`} className="text-[#f5f6f6] hover:text-[#e22328] underline-offset-4 hover:underline">
              {CONTACT.email}
            </a>
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="type-eyebrow text-[#7f8a91]">Phone</dt>
          <dd>
            <a href={CONTACT.phoneHref} className="text-[#f5f6f6] hover:text-[#e22328] underline-offset-4 hover:underline">
              {CONTACT.phoneDisplay}
            </a>
          </dd>
        </div>
        {india && (
          <div className="flex flex-col gap-1">
            <dt className="type-eyebrow text-[#7f8a91]">Headquarters</dt>
            <dd className="text-[#bdc4c8]">
              {india.entity}
              <br />
              {india.address}
            </dd>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <dt className="type-eyebrow text-[#7f8a91]">LinkedIn</dt>
          <dd>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f6f6] hover:text-[#e22328] underline-offset-4 hover:underline"
            >
              Rayonix on LinkedIn
            </a>
          </dd>
        </div>
      </dl>
      <a href="#global-presence" className="type-cta text-[#e22328] underline-offset-4 hover:underline">
        See all offices
      </a>
    </aside>
  );
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Company", href: "/about" },
          { name: "Contact Us", href: "/contact" },
        ]}
      />
      <div className="relative w-full min-h-screen bg-[#080f12]">
        <CompanyHero
          ariaLabel="Contact us"
          crumbs={[{ label: "Home", href: "/" }, { label: "Company", href: "/about" }, { label: "Contact Us" }]}
          title={CONTACT_PAGE.title}
          intro={CONTACT_PAGE.intro}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-8">
              {/* useSearchParams needs a Suspense boundary so the page stays statically rendered. */}
              <Suspense fallback={<div className="min-h-[640px] bg-[#10181c] border border-[#253035] rounded-[4px]" />}>
                <ContactForm />
              </Suspense>
            </div>
            <div className="lg:col-span-4">
              <ContactDetails />
            </div>
          </div>
        </CompanyHero>

        <BuildWithUsBand />

        <GlobalPresence />

        <section aria-labelledby="closing-heading" className="w-full bg-[#080f12] border-t border-[#253035] py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-4">
            <h2 id="closing-heading" className="type-hero text-[#f5f6f6]">
              {CONTACT_PAGE.closing.heading}
            </h2>
            <p className="type-statement text-[#bdc4c8]">{CONTACT_PAGE.closing.line}</p>
          </div>
        </section>
      </div>
    </>
  );
}
