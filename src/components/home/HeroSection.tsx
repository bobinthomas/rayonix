"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[750px] sm:h-[810px] bg-black overflow-hidden"
      aria-label="Rayonix Tactical Video Banner"
      data-node-id="640:3763"
    >
      {/* Background Weapon / Turret Optical Hero Image matching Figma node 640:3763 */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/hero-banner.png"
          alt="Rayonix Tactical Autonomous Weapon System"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Top vignette for navigation contrast */}
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
        {/* Bottom edge blending */}
        <div className="absolute bottom-0 left-0 right-0 h-[140px] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Bottom-Left Tactical Badge: RAYONIX | ASYMMETRIC WARFARE matching uploaded reference */}
      <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 lg:left-[60px] z-20 flex items-center gap-3.5 select-none">
        <div className="relative w-[84px] h-[22px]">
          <Image
            src="/assets/rayonix-logo.svg"
            alt="RAYONIX"
            fill
            className="object-contain object-left"
          />
        </div>
        <span className="w-[1.5px] h-3.5 bg-[#e22328]" />
        <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.22em] text-[#bdc4c8]">
          ASYMMETRIC WARFARE
        </span>
      </div>
    </section>
  );
}
