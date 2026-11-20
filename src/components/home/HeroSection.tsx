"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const videoEl = videoRef.current;
    if (!sectionEl || !videoEl) return;

    // Poster image is the LCP element. The video is attached only after the page
    // has loaded and the main thread is idle, so it never competes with critical
    // resources. Skipped entirely for reduced-motion and data-saver users.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reducedMotion || saveData) return;

    let observer: IntersectionObserver | undefined;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const attachVideo = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      videoEl.src = isMobile
        ? "/assets/videos/website-hero-mobile.mp4"
        : "/assets/videos/website-hero-web.mp4";
      videoEl.addEventListener(
        "playing",
        () => videoEl.classList.remove("opacity-0"),
        { once: true }
      );
      videoEl.play().catch(() => {});

      // Pause video when scrolled out of view to preserve GPU/CPU for scrolling
      observer = new IntersectionObserver(
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
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(attachVideo, { timeout: 2000 });
      } else {
        timeoutId = setTimeout(attachVideo, 200);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      observer?.disconnect();
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
      className="relative w-full h-[70svh] min-h-[440px] min-[700px]:h-[calc(100dvh-32px)] min-[700px]:min-h-[580px] bg-black overflow-hidden"
      aria-label="Rayonix Tactical Video Banner"
      data-node-id="640:3763"
    >
      {/* Background Hero Video with Poster Fallback */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/hero-poster.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-700"
        />

        {/* Top vignette for navigation contrast and readability */}
        <div className="absolute top-0 left-0 right-0 h-[220px] bg-gradient-to-b from-black/85 via-black/40 to-transparent" />

        {/* Bottom edge blending */}
        <div className="absolute bottom-0 left-0 right-0 h-[320px] bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
      </div>

      {/* Left-aligned tagline + CTA on the site grid, 15% from bottom */}
      <div className="absolute bottom-[15%] inset-x-0 z-20 pointer-events-none">
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col items-start gap-6 sm:gap-8 text-left pointer-events-auto">
        <h1 className="flex flex-col items-start gap-2 sm:gap-3">
          <span className="text-[32px] sm:text-5xl lg:text-[64px] font-bold leading-[1.05] tracking-[0.05em] text-[#f5f6f6]">
            In<span className="text-[#7f8a91]">(Visible)</span> Warfare
          </span>
          <span className="text-[22px] sm:text-[32px] lg:text-[43px] font-normal leading-snug tracking-[-0.01em] text-white">
            Intelligence Beyond Boundaries.
          </span>
        </h1>
        <CTAButton
          variant="outline"
          href="#battlespace"
          onClick={handleScrollToNext}
          className="text-[13px] sm:text-[15px] md:text-[16px] font-medium tracking-[0.02em] px-5 sm:px-7 py-3.5 sm:py-4 shadow-2xl"
          aria-label="See Beyond"
        >
          See Beyond
        </CTAButton>
      </div>
      </div>
    </section>
  );
}
