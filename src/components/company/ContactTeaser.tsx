import CTAButton from "@/components/ui/CTAButton";
import { CONTACT_TEASER } from "@/content/contact";

/** Closing band: "Let's Start a Conversation." with one button to /contact. */
export default function ContactTeaser({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <section
      aria-label="Contact us"
      className="relative w-full bg-[#080f12] text-[#f5f6f6] border-t border-[#253035] py-16 lg:py-24"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8">
        <div className="relative overflow-hidden bg-[#10181c] border border-[#253035] rounded-[8px] p-6 sm:p-12 lg:p-[72px] flex flex-col gap-6">
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#e22328]" aria-hidden="true" />
          <p className="type-eyebrow text-[#e22328]">{CONTACT_TEASER.eyebrow}</p>
          <Heading className="max-w-[1100px] type-h2 text-[#f5f6f6]">{CONTACT_TEASER.heading}</Heading>
          <p className="max-w-[860px] type-body-lg text-[#bdc4c8]">{CONTACT_TEASER.body}</p>
          <div className="pt-4">
            <CTAButton href="/contact" variant="primary">
              {CONTACT_TEASER.cta}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
