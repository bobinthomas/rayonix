import CTAButton from "@/components/ui/CTAButton";
import { BUILD_WITH_US } from "@/content/careers";

/** "Build What Matters. Shape What's Next." band, linking to the open positions. */
export default function BuildWithUsBand() {
  return (
    <section
      aria-labelledby="build-with-us-heading"
      className="relative w-full bg-[#080f12] text-[#f5f6f6] border-t border-[#253035] py-16 lg:py-20"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <p className="type-eyebrow text-[#e22328]">{BUILD_WITH_US.eyebrow}</p>
          <h2 id="build-with-us-heading" className="type-h2 text-[#f5f6f6]">
            {BUILD_WITH_US.heading}
          </h2>
          {BUILD_WITH_US.lines.map((line) => (
            <p key={line} className="type-body-lg text-[#bdc4c8] max-w-[760px]">
              {line}
            </p>
          ))}
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <CTAButton href="/careers#open-positions" variant="primary">
            {BUILD_WITH_US.cta}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
