"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Safely trigger autoplay on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy prevented playback; poster remains visible
      });
    }
  }, []);

  return (
    <section
      className="relative w-full h-[calc(100vh-32px)] sm:h-[calc(100dvh-32px)] min-h-[580px] bg-black overflow-hidden"
      aria-label="Rayonix Tactical Video Banner"
      data-node-id="640:3763"
    >
      {/* Background Hero Video with Poster Fallback */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/hero-banner.png"
          className="w-full h-full object-cover object-center"
        >
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Top vignette for navigation contrast and readability */}
        <div className="absolute top-0 left-0 right-0 h-[220px] bg-gradient-to-b from-black/85 via-black/40 to-transparent" />

        {/* Bottom edge blending */}
        <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
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
