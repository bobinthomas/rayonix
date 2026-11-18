"use client";

import { useRef, useEffect } from "react";
import CTAButton from "@/components/ui/CTAButton";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const videoEl = videoRef.current;
    if (!sectionEl || !videoEl) return;

    // Safely trigger autoplay on mount
    videoEl.play().catch(() => {});

    // Pause video when scrolled out of view to preserve 100% GPU/CPU for scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollToNext = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById("battlespace");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
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
          <source src="/assets/videos/website-video.mp4" type="video/mp4" />
          <source src="/assets/videos/Website%20VIDEO.mp4" type="video/mp4" />
        </video>

        {/* Top vignette for navigation contrast and readability */}
        <div className="absolute top-0 left-0 right-0 h-[220px] bg-gradient-to-b from-black/85 via-black/40 to-transparent" />

        {/* Bottom edge blending */}
        <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      </div>

      {/* Centered CTA positioned 15% from bottom */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-20 w-full max-w-[92vw] sm:max-w-max flex justify-center pointer-events-auto">
        <CTAButton
          variant="primary"
          href="#battlespace"
          onClick={handleScrollToNext}
          className="!whitespace-normal sm:!whitespace-nowrap text-center text-[13px] sm:text-[15px] md:text-[16px] font-medium tracking-normal sm:tracking-[0.02em] px-5 sm:px-7 py-3.5 sm:py-4 shadow-2xl"
          aria-label="Technology built for what lies beyond the visible"
        >
          Technology built for what lies beyond the visible.
        </CTAButton>
      </div>
    </section>
  );
}
