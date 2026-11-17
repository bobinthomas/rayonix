"use client";

import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import TransformingHeading from "@/components/ui/TransformingHeading";

export default function ExploreSection() {
  return (
    <section
      className="relative w-full bg-[#f5f6f6] text-[#080f12] px-6 sm:px-12 lg:px-[64px] py-16 lg:py-[80px] rounded-none"
      aria-label="Explore Rayonix"
      data-node-id="440:557"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 lg:gap-[40px]">
        {/* Section Heading with Decrypt Animation matching Figma node 440:558 */}
        <div>
          <TransformingHeading
            as="h2"
            segments={[
              {
                text: "Explore Rayonix",
                className: "text-[#080f12]",
              },
              {
                text: ".",
                className: "text-[#e22328] font-bold",
              },
            ]}
            accentDot={false}
            className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-tight lg:leading-[72px]"
          />
        </div>

        {/* 1. Featured Company Story Card (h-[653px]) matching Figma node 440:559 */}
        <div
          className="relative w-full h-[550px] sm:h-[653px] rounded-[12px] overflow-hidden border border-[#c4c9cc] bg-black shadow-lg flex flex-col justify-end p-8 sm:p-14 group"
          data-node-id="440:559"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Image
              src="/assets/story-company-v5.webp"
              alt="The Rayonix Story"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div
            className="relative z-10 max-w-[535px] flex flex-col gap-[12px]"
            data-node-id="440:561"
          >
            <span
              className="text-[14px] font-medium text-[#e8141a] tracking-wider uppercase"
              data-node-id="440:562"
            >
              01 / COMPANY
            </span>
            <h3
              className="text-3xl sm:text-5xl lg:text-[48px] font-medium text-[#f5f6f6] leading-tight lg:leading-[56px]"
              data-node-id="440:563"
            >
              The Rayonix Story.
            </h3>
            <p
              className="text-base sm:text-lg lg:text-[18px] text-[#f5f6f6]/90 font-normal leading-[28px]"
              data-node-id="440:564"
            >
              Discover our mission, vision and approach to advancing defence technology.
            </p>
            <div className="pt-2">
              <CTAButton href="/about" variant="primary">
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        {/* 2. Side-by-Side 2 Cards (h-[510px]) matching Figma nodes 440:566 & 440:579 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-[18px]">
          {/* Card 02 / ECOSYSTEM */}
          <div
            className="relative w-full h-[480px] sm:h-[510px] rounded-[12px] overflow-hidden border border-[#c4c9cc] bg-black shadow-md flex flex-col justify-end p-8 sm:p-10 group"
            data-node-id="440:566"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <Image
                src="/assets/story-ecosystem-v5.webp"
                alt="The Rayonix Ecosystem"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
            </div>

            <div
              className="relative z-10 flex flex-col gap-[15px] max-w-[442px]"
              data-node-id="440:569"
            >
              <span
                className="text-[14px] font-medium text-[#f5f6f6]/80 tracking-wider uppercase"
                data-node-id="440:570"
              >
                02 / ECOSYSTEM
              </span>
              <h3
                className="text-2xl sm:text-4xl lg:text-[48px] font-medium text-[#f5f6f6] leading-tight lg:leading-[56px]"
                data-node-id="440:571"
              >
                The Rayonix Ecosystem.
              </h3>
              <p
                className="text-sm sm:text-base lg:text-[18px] text-[#f5f6f6]/90 font-normal leading-[28px]"
                data-node-id="440:572"
              >
                Explore the specialised engineering, innovation and manufacturing entities behind our capabilities.
              </p>
              <div className="pt-2">
                <CTAButton href="/ecosystem" variant="primary">
                  Learn More
                </CTAButton>
              </div>
            </div>
          </div>

          {/* Card 04 / CAREERS */}
          <div
            className="relative w-full h-[480px] sm:h-[510px] rounded-[12px] overflow-hidden border border-[#c4c9cc] bg-black shadow-md flex flex-col justify-end p-8 sm:p-10 group"
            data-node-id="440:579"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <Image
                src="/assets/story-careers-v5.webp"
                alt="Build What's Next"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
            </div>

            <div
              className="relative z-10 flex flex-col gap-[16px] max-w-[516px]"
              data-node-id="440:584"
            >
              <span
                className="text-[14px] font-medium text-[#f5f6f6]/80 tracking-wider uppercase"
                data-node-id="440:585"
              >
                04 / CAREERS
              </span>
              <h3
                className="text-2xl sm:text-4xl lg:text-[48px] font-medium text-[#f5f6f6] leading-tight lg:leading-[56px]"
                data-node-id="440:586"
              >
                Build What’s Next.
              </h3>
              <p
                className="text-sm sm:text-base lg:text-[18px] text-[#f5f6f6]/90 font-normal leading-[28px]"
                data-node-id="440:587"
              >
                Explore opportunities to work across engineering, technology and defence innovation.
              </p>
              <div className="pt-2">
                <CTAButton href="/careers" variant="primary">
                  Learn More
                </CTAButton>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Sub-Section: The Latest from Rayonix matching Figma node 440:574 */}
        <div
          className="pt-16 lg:pt-20 flex flex-col gap-[28px]"
          data-node-id="440:574"
        >
          {/* Header Row with Explore News Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
            <div>
              <h3
                className="text-3xl sm:text-5xl lg:text-[48px] font-medium text-[#080f12] leading-tight lg:leading-[56px]"
                data-node-id="440:575"
              >
                The Latest from Rayonix.
              </h3>
              <p
                className="text-base sm:text-lg lg:text-[18px] text-[#080f12]/80 font-normal leading-[28px] max-w-[805px] mt-2"
                data-node-id="440:577"
              >
                Stay connected with our latest announcements, strategic partnerships, media coverage and developments shaping the future of defence technology.
              </p>
            </div>

            <div>
              <CTAButton href="/news" variant="secondary">
                Explore News
              </CTAButton>
            </div>
          </div>

          {/* 2 Featured Story News Cards matching Figma nodes 440:589 & 440:596 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* News 1: bg-[#253035] (Slate Dark) matching Figma node 440:589 */}
            <div
              className="bg-[#253035] rounded-[8px] p-8 sm:p-12 flex flex-col justify-between min-h-[580px] shadow-lg border border-white/[0.06]"
              data-node-id="440:589"
            >
              <div className="space-y-4">
                <h4
                  className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#f5f6f6] leading-[32px] max-w-[494px]"
                  data-node-id="I705:4758;705:4676"
                >
                  Israel&apos;s AI Major in $11 Million Deal with Indian Company to Make UAVs Locally
                </h4>
                <div className="h-px w-full bg-white/10" />
              </div>

              <div
                className="relative w-full h-[260px] sm:h-[300px] rounded-[4px] overflow-hidden my-4"
                data-node-id="I705:4758;705:4678"
              >
                <Image
                  src="/assets/story-news1-v5.webp"
                  alt="Israel AI Major UAV Deal"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <p
                  className="text-sm sm:text-base lg:text-[16px] text-[#f5f6f6]/90 font-normal leading-[24px]"
                  data-node-id="I705:4758;705:4684"
                >
                  Our partnership with XTEND advances local UAV manufacturing, testing and distribution, supported by technology transfer and autonomous systems.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <CTAButton href="/news/xtend-partnership" variant="secondary">
                    Explore the Partnership
                  </CTAButton>
                  <CTAButton href="/news/xtend-coverage" variant="secondary">
                    Read the Coverage
                  </CTAButton>
                </div>

                <div
                  className="flex items-center gap-3 text-[12px] text-[#7f8a91] font-normal pt-2 border-t border-white/10"
                  data-node-id="I705:4758;705:4679"
                >
                  <span className="font-bold text-[#bdc4c8]">Defence HQ · TOI</span>
                  <span>•</span>
                  <span>April 28, 2026</span>
                </div>
              </div>
            </div>

            {/* News 2: bg-[#10181c] (Deep Panel Dark) matching Figma node 440:596 */}
            <div
              className="bg-[#10181c] rounded-[8px] p-8 sm:p-12 flex flex-col justify-between min-h-[580px] shadow-lg border border-white/[0.06]"
              data-node-id="440:596"
            >
              <div className="space-y-4">
                <h4
                  className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#f5f6f6] leading-[32px] max-w-[494px]"
                  data-node-id="I707:4780;705:4676"
                >
                  India&apos;s Drone Industry Ambitions Accelerate with XTEND Technology Transfer Deal
                </h4>
                <div className="h-px w-full bg-white/10" />
              </div>

              <div
                className="relative w-full h-[260px] sm:h-[300px] rounded-[4px] overflow-hidden my-4"
                data-node-id="I707:4780;705:4678"
              >
                <Image
                  src="/assets/story-news2-v5.webp"
                  alt="India Drone Industry Ambitions"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <p
                  className="text-sm sm:text-base lg:text-[16px] text-[#f5f6f6]/90 font-normal leading-[24px]"
                  data-node-id="I707:4780;705:4684"
                >
                  The agreement supports technology transfer and local manufacturing, strengthening India&apos;s capabilities in AI-enabled tactical and interceptor drone systems.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <CTAButton href="/news/xtend-partnership" variant="secondary">
                    Explore the Partnership
                  </CTAButton>
                  <CTAButton href="/news/shephard-coverage" variant="secondary">
                    Read the Coverage
                  </CTAButton>
                </div>

                <div
                  className="flex items-center gap-3 text-[12px] text-[#7f8a91] font-normal pt-2 border-t border-white/10"
                  data-node-id="I707:4780;705:4679"
                >
                  <span className="font-bold text-[#bdc4c8]">Shephard</span>
                  <span>•</span>
                  <span>April 28, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
