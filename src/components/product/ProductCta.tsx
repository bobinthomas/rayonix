import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import { CONTACT_TEASER } from "@/content/contact";
import { contactHref } from "@/content/site";
import { productSlug, type ProductPageContent } from "@/content/products";

const DOMAIN_LABEL = { subsurface: "Subsurface", surface: "Surface", aerial: "Aerial" } as const;
const STAGES = [
  { id: "detect", label: "Detect" },
  { id: "decide", label: "Decide" },
  { id: "respond", label: "Respond" },
] as const;

const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a");

/**
 * End-of-page CTA block for product pages (same panel as the solution pages),
 * plus related links to the same domain's Detect, Decide and Respond sections.
 */
export default function ProductCta({ content }: { content: ProductPageContent }) {
  const name = content.hero.title;
  const domain = DOMAIN_LABEL[content.domain];
  return (
    <section className="relative w-full bg-[#080f12] pt-8 pb-20 lg:pb-28" aria-label="Call to action">
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10">
        <div className="relative overflow-hidden bg-[#10181c] border border-[#253035] rounded-[8px] p-6 sm:p-12 lg:p-[72px] flex flex-col gap-6">
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#e22328]" aria-hidden="true" />
          <h2 className="max-w-[1100px] type-h2 text-[#f5f6f6]">{CONTACT_TEASER.heading}</h2>
          <p className="max-w-[860px] type-body-lg text-[#bdc4c8]">{CONTACT_TEASER.body}</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <CTAButton href={contactHref("sales", productSlug(content))} variant="primary">
              {`Schedule ${article(name)} ${name} demo`}
            </CTAButton>
          </div>
        </div>

        <nav aria-label={`Related ${domain} capabilities`} className="flex flex-col gap-3">
          <h2 className="type-eyebrow text-[#7f8a91]">Related</h2>
          <ul className="flex flex-wrap gap-3">
            {STAGES.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/domains/${content.domain}#${s.id}`}
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-[2px] border border-[#253035] px-4 py-2 type-small text-[#f5f6f6] hover:border-[#e22328] transition-colors"
                >
                  {domain} {s.label} <span aria-hidden="true" className="text-[#e22328]">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
