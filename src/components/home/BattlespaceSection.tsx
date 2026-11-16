"use client";

import Image from "next/image";

export default function BattlespaceSection() {
  return (
    <section
      className="relative w-full min-h-[737px] flex flex-col justify-center bg-black px-6 sm:px-12 lg:px-[64px] py-[40px] overflow-hidden"
      aria-label="The New Battlespace"
      data-node-id="640:3823"
    >
      {/* Background Image: Two Soldiers Walking in Fog matching Figma node 640:3823 */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/two-soldiers-fog.png"
          alt="The New Battlespace"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle dark tint matching Figma rgba(8,13,15,0.3) */}
        <div className="absolute inset-0 bg-[#080d0f]/30" />
        {/* Figma linear gradient 87% transparent to 60% black */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-[1408px] mx-auto w-full flex flex-col gap-16 lg:gap-[150px] justify-between py-12 lg:py-16">
        {/* Heading matching Figma node 640:3832 */}
        <div>
          <h2 className="text-3xl sm:text-5xl lg:text-[64px] font-bold text-[#f5f6f6] tracking-[2px] sm:tracking-[4.48px] leading-tight lg:leading-[72px]">
            The Future of Defence Is Integrated
            <span className="text-[#e22328]">.</span>
          </h2>
        </div>

        {/* Editorial Text matching Figma node 640:3833 */}
        <div className="max-w-[1269px] space-y-6 sm:space-y-8 text-xl sm:text-2xl lg:text-[32px] font-normal text-[#f5f6f6] leading-relaxed lg:leading-[40px]">
          <p>
            Today&apos;s asymmetric threats transcend conventional boundaries,
            demanding intelligent, interconnected defence capabilities.
          </p>
          <p>
            We combine AI, autonomy and advanced technologies to engineer
            integrated defence systems tailored to mission-specific requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
