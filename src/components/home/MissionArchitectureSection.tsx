"use client";

import Image from "next/image";

export default function MissionArchitectureSection() {
  return (
    <section
      className="relative w-full min-h-[750px] lg:h-[792px] flex items-center bg-[#080f12] px-6 sm:px-12 lg:px-[84px] py-16 lg:py-0 overflow-hidden"
      aria-label="Detect Decide Respond Mission Architecture"
      data-node-id="640:3899"
    >
      {/* Background Command Centre photo with 20% opacity matching Figma node I640:3899;127:954 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full opacity-20">
          <Image
            src="/assets/command-centre.png"
            alt="Tactical Command Centre"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080f12] via-transparent to-[#080f12]" />
      </div>

      <div className="relative z-10 max-w-[1408px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Big Editorial Words matching Figma node I640:3899;127:957 */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-hero leading-tight lg:leading-[72px]">
            <span className="text-[#f5f6f6]">
              Detect<span className="text-[#e22328]">.</span>
            </span>
            <br />
            <span className="text-[#f5f6f6] opacity-30">
              Decide.
            </span>
            <br />
            <span className="text-[#f5f6f6] opacity-30">
              Respond<span className="text-[#7f8a91]">.</span>
            </span>
          </h2>
        </div>

        {/* Right Column: 3 Pillar Explanations matching Figma node I640:3899;127:962 */}
        <div className="lg:col-span-7 flex flex-col gap-8 max-w-[480px] lg:ml-auto">
          {/* 01 · Detect */}
          <div className="flex flex-col gap-[12px]">
            <span className="text-[14px] font-medium text-[#e8141a]">01</span>
            <h3 className="text-2xl sm:text-[32px] font-normal text-[#f5f6f6] leading-[40px]">
              Detect.
            </h3>
            <p className="text-[16px] sm:text-[18px] font-normal text-[#a3adb2] leading-[28px]">
              Build a unified operational picture by collecting intelligence from sensors across land, air, maritime and subsurface domains.
            </p>
          </div>

          {/* 02 · Decide (opacity 30% matching Figma) */}
          <div className="flex flex-col gap-[12px] opacity-30 hover:opacity-100 transition-opacity">
            <span className="text-[14px] font-medium text-[#e8141a]">02</span>
            <h3 className="text-2xl sm:text-[32px] font-normal text-[#f5f6f6] leading-[40px]">
              Decide.
            </h3>
            <p className="text-[16px] sm:text-[18px] font-normal text-[#a3adb2] leading-[28px]">
              Fuse mission data, AI and operator intent into a common decision layer for faster, coordinated decision-making.
            </p>
          </div>

          {/* 03 · Respond (opacity 30% matching Figma) */}
          <div className="flex flex-col gap-[12px] opacity-30 hover:opacity-100 transition-opacity">
            <span className="text-[14px] font-medium text-[#e8141a]">03</span>
            <h3 className="text-2xl sm:text-[32px] font-normal text-[#f5f6f6] leading-[40px]">
              Respond.
            </h3>
            <p className="text-[16px] sm:text-[18px] font-normal text-[#a3adb2] leading-[28px]">
              Enable coordinated, mission-specific responses by integrating autonomous systems, command centres and operational assets into a unified response framework.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
