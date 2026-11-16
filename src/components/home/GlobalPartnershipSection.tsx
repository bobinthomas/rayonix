"use client";

import Image from "next/image";

export default function GlobalPartnershipSection() {
  return (
    <section
      className="relative w-full min-h-[900px] lg:min-h-[1200px] bg-[#080f12] text-[#f5f6f6] pt-[100px] lg:pt-[116px] pb-[60px] px-6 sm:px-12 lg:px-[84px] overflow-hidden flex flex-col justify-between"
      aria-label="Global Partnership and Indian Defence Presence"
      data-node-id="640:3954"
    >
      {/* Background 3D Sci-Fi World Map with Red Target Markers matching Figma node 640:3956 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/world-map.png"
          alt="Rayonix Global Defense Network"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-top opacity-90"
        />
        {/* Wireframe mountain horizon glow at bottom matching Figma node 640:3955 */}
        <div className="absolute bottom-0 left-0 right-0 h-[483px] opacity-40 pointer-events-none">
          <Image
            src="/assets/mountain-wireframe.png"
            alt=""
            fill
            className="object-cover object-bottom"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto w-full flex flex-col gap-12">
        {/* Editorial Content matching Figma node 640:3958 */}
        <div className="max-w-4xl space-y-6">
          <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#f5f6f6] leading-tight lg:leading-[72px]">
            Global Technology.
            <br />
            Indian Defence Capability
            <span className="text-[#e22328]">.</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-[18px] text-[#f5f6f6] font-normal leading-[28px] max-w-[1256px]">
            We bring field-proven defence technologies from across the world to India through strategic global partnerships, combining international expertise with local integration and deployment capabilities.
          </p>
        </div>

        {/* Global Partner Logos Card matching Figma node 640:3965 */}
        <div className="mt-8 lg:mt-24 bg-white/10 p-3 sm:p-4 rounded-[4px] shadow-2xl backdrop-blur-sm border border-white/10">
          <div className="relative w-full aspect-[1256/346] rounded overflow-hidden">
            <Image
              src="/assets/partner-logos.png"
              alt="Rayonix Global Defense and Technology Partners"
              fill
              sizes="(max-width: 1280px) 100vw, 1256px"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
