"use client";

import Image from "next/image";
import TransformingHeading from "@/components/ui/TransformingHeading";
import ScrollGradientText from "@/components/ui/ScrollGradientText";

export default function BattlespaceSection() {
  return (
    <section
      id="battlespace"
      className="relative w-full min-h-[737px] flex flex-col justify-center bg-black py-[40px] overflow-hidden scroll-mt-24"
      aria-label="The New Battlespace"
      data-node-id="640:3823"
    >
      {/* Background Image: battlespace-bg.webp */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/battlespace-bg.webp"
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

      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-16 lg:gap-[120px] justify-between py-12 lg:py-16">
        {/* Axion-style Transforming Heading: fits cleanly on a single line on all resolutions >= 1280px */}
        <div className="w-full">
          <TransformingHeading
            text="The Future of Defence Is Integrated"
            accentDot={true}
            accentColor="#e22328"
            as="h2"
            className="w-full type-hero text-[#f5f6f6] "
          />
        </div>

        {/* Editorial Text with scroll-driven gradient fill animation */}
        <ScrollGradientText className="w-full space-y-6 sm:space-y-8 type-statement">
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
