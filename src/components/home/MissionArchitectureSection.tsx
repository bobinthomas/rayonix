"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MissionPillar {
  id: string;
  number: string;
  title: string;
  description: string;
}

const pillars: MissionPillar[] = [
  {
    id: "detect",
    number: "01",
    title: "Detect.",
    description:
      "Build a unified operational picture by collecting intelligence from sensors across land, air, maritime and subsurface domains.",
  },
  {
    id: "decide",
    number: "02",
    title: "Decide.",
    description:
      "Fuse mission data, AI and operator intent into a common decision layer for faster, coordinated decision-making.",
  },
  {
    id: "respond",
    number: "03",
    title: "Respond.",
    description:
      "Enable coordinated, mission-specific responses by integrating autonomous systems, command centres and operational assets into a unified response framework.",
  },
];

export default function MissionArchitectureSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger combined with native scroll calculation
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=16",
        end: "bottom bottom-=16",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.33) {
            setActiveIndex(0);
          } else if (p < 0.66) {
            setActiveIndex(1);
          } else {
            setActiveIndex(2);
          }
        },
      });
    }, sectionRef);

    // Fallback native scroll listener for instant reactivity
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cardHeight = cardRef.current?.offsetHeight || 792;
      const stickyTop = Math.max(16, (window.innerHeight - cardHeight) / 2);
      const totalScrollable = el.offsetHeight - cardHeight;
      if (totalScrollable <= 0) return;

      const scrolled = stickyTop - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      if (progress < 0.33) {
        setActiveIndex(0);
      } else if (progress < 0.66) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Click on any stage to smoothly navigate to that stage
  const scrollToStage = useCallback((index: number) => {
    const el = sectionRef.current;
    if (!el) return;

    const cardHeight = cardRef.current?.offsetHeight || 792;
    const stickyTop = Math.max(16, (window.innerHeight - cardHeight) / 2);
    const totalScrollable = el.offsetHeight - cardHeight;
    const targetProgress = index === 0 ? 0.1 : index === 1 ? 0.5 : 0.85;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = sectionTop - stickyTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[220vh] sm:h-[250vh]"
      aria-label="Detect Decide Respond Mission Architecture"
      data-node-id="640:3899"
    >
      {/* Sticky Card Container - Natural Figma height (792px), vertically centered in viewport */}
      <div
        ref={cardRef}
        className="sticky top-4 lg:top-[calc((100vh-792px)/2)] w-full min-h-[750px] lg:h-[792px] bg-[#080f12] overflow-hidden rounded-[14px] flex items-center justify-center px-6 sm:px-12 lg:px-[84px] py-16 lg:py-0 shadow-2xl"
      >
        {/* Background Command Centre imagery at 20% opacity */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="relative w-full h-full opacity-20">
            <Image
              src="/assets/command-centre.webp"
              alt="Tactical Command Centre"
              fill
              priority={false}
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
          </div>
          {/* Edge Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080f12] via-transparent to-[#080f12]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f12] via-transparent to-[#080f12]" />
        </div>

        {/* Inner Content Grid */}
        <div className="relative z-10 max-w-[1408px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Big Editorial Words (Detect. Decide. Respond.) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-tight lg:leading-[76px] select-none">
              {pillars.map((pillar, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => scrollToStage(idx)}
                    className={`block text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer py-1 ${
                      isActive
                        ? "opacity-100 scale-100 text-[#f5f6f6]"
                        : "opacity-25 scale-95 text-[#7f8a91] hover:opacity-50"
                    }`}
                  >
                    <span>{pillar.title.replace(".", "")}</span>
                    <span
                      className={`transition-colors duration-500 ${
                        isActive ? "text-[#e22328]" : "text-[#7f8a91]"
                      }`}
                    >
                      .
                    </span>
                  </button>
                );
              })}
            </h2>
          </div>

          {/* Right Column: 3 Pillar Explanations */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 max-w-[540px] lg:ml-auto">
            {pillars.map((pillar, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={pillar.id}
                  onClick={() => scrollToStage(idx)}
                  className={`group relative flex flex-col gap-3 p-5 sm:p-6 rounded-[10px] cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "opacity-100 translate-x-0 scale-100 bg-[#10181c]/75 backdrop-blur-md border-l-2 border-[#e22328] shadow-2xl shadow-black/60"
                      : "opacity-20 translate-x-2 scale-[0.97] border-l-2 border-transparent hover:opacity-40"
                  }`}
                >
                  {/* Step Number */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[14px] font-medium transition-colors duration-500 ${
                        isActive ? "text-[#e8141a]" : "text-[#7f8a91]"
                      }`}
                    >
                      {pillar.number}
                    </span>
                    {isActive && (
                      <span className="size-[6px] rounded-full bg-[#e22328] animate-pulse" />
                    )}
                  </div>

                  {/* Heading */}
                  <h3
                    className={`text-2xl sm:text-[32px] font-normal leading-[40px] transition-colors duration-500 ${
                      isActive ? "text-[#f5f6f6]" : "text-[#f5f6f6]/40"
                    }`}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-[16px] sm:text-[18px] font-normal leading-[28px] transition-colors duration-500 ${
                      isActive ? "text-[#a3adb2]" : "text-[#a3adb2]/40"
                    }`}
                  >
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
