"use client";

import Image from "next/image";
import TransformingHeading from "@/components/ui/TransformingHeading";
import ScrollGradientText from "@/components/ui/ScrollGradientText";

export default function BattlespaceSection() {
  return (
    <section
      id="battlespace"
      className="relative w-full min-h-[737px] flex flex-col justify-center bg-black px-6 sm:px-12 lg:px-[64px] py-[40px] overflow-hidden scroll-mt-24"
      aria-label="The New Battlespace"
      data-node-id="640:3823"
    >
      {/* Background Image: battlespace-bg.png */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/battlespace-bg.png"
          alt="The New Battlespace"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle dark tint for text contrast */}
        <div className="absolute inset-0 bg-[#080d0f]/35" />
        {/* Figma linear gradient blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-[1408px] mx-auto w-full flex flex-col gap-16 lg:gap-[150px] justify-between py-12 lg:py-16">
        {/* Axion-style Transforming Heading: strictly single line on all resolutions >= 1280px */}
        <div className="w-full xl:whitespace-nowrap overflow-visible">
          <TransformingHeading
            text="The Future of Defence Is Integrated"
            accentDot={true}
            accentColor="#e22328"
            as="h2"
            className="text-3xl sm:text-5xl lg:text-5xl xl:text-[46px] 2xl:text-[58px] min-[1800px]:text-[64px] font-bold text-[#f5f6f6] tracking-tight sm:tracking-[2px] xl:tracking-[1.5px] 2xl:tracking-[3px] leading-tight lg:leading-[72px] xl:whitespace-nowrap"
          />
        </div>

        {/* Editorial Text with scroll-driven gradient fill animation */}
        <ScrollGradientText className="max-w-[1269px] space-y-6 sm:space-y-8 text-xl sm:text-2xl lg:text-[32px] font-normal leading-relaxed lg:leading-[40px]">
          <p data-gradient-text>
            Today&apos;s asymmetric threats transcend conventional boundaries,
            demanding intelligent, interconnected defence capabilities.
          </p>
          <p data-gradient-text>
            We combine AI, autonomy and advanced technologies to engineer
            integrated defence systems tailored to mission-specific requirements.
          </p>
        </ScrollGradientText>
      </div>
    </section>
  );
}
