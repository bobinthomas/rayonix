"use client";

import { useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Element refs for continuous GSAP scrubbing
  const leftWordRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial visual states: Step 0 is fully active, Steps 1 and 2 are dimmed
      gsap.set([leftWordRefs.current[0], pillarRefs.current[0]], { opacity: 1 });
      gsap.set([leftWordRefs.current[1], pillarRefs.current[1]], { opacity: 0.25 });
      gsap.set([leftWordRefs.current[2], pillarRefs.current[2]], { opacity: 0.25 });

      gsap.set(dotRefs.current[0], { color: "#e22328" });
      gsap.set(dotRefs.current[1], { color: "#7f8a91" });
      gsap.set(dotRefs.current[2], { color: "#7f8a91" });

      gsap.set(numberRefs.current[0], { color: "#e8141a" });
      gsap.set(numberRefs.current[1], { color: "rgba(232, 20, 26, 0.3)" });
      gsap.set(numberRefs.current[2], { color: "rgba(232, 20, 26, 0.3)" });

      // Create a smooth scrubbed timeline: plays forward on scroll down, reverses symmetrically on scroll back (3 -> 2 -> 1)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=16",
          end: "bottom bottom-=16",
          scrub: 0.5,
        },
      });

      // --- STAGE 0 to STAGE 1 (Detect -> Decide) ---
      // Hold Stage 0 initially
      tl.to({}, { duration: 0.5 });

      // Cross-fade Step 0 down, Step 1 up
      tl.to(
        [leftWordRefs.current[0], pillarRefs.current[0]],
        { opacity: 0.25, duration: 1, ease: "power1.inOut" },
        "step0to1"
      )
        .to(dotRefs.current[0], { color: "#7f8a91", duration: 1, ease: "power1.inOut" }, "step0to1")
        .to(numberRefs.current[0], { color: "rgba(232, 20, 26, 0.3)", duration: 1, ease: "power1.inOut" }, "step0to1")
        .to(
          [leftWordRefs.current[1], pillarRefs.current[1]],
          { opacity: 1, duration: 1, ease: "power1.inOut" },
          "step0to1"
        )
        .to(dotRefs.current[1], { color: "#e22328", duration: 1, ease: "power1.inOut" }, "step0to1")
        .to(numberRefs.current[1], { color: "#e8141a", duration: 1, ease: "power1.inOut" }, "step0to1");

      // Hold Stage 1 in center focus
      tl.to({}, { duration: 0.6 });

      // --- STAGE 1 to STAGE 2 (Decide -> Respond) ---
      // Cross-fade Step 1 down, Step 2 up
      tl.to(
        [leftWordRefs.current[1], pillarRefs.current[1]],
        { opacity: 0.25, duration: 1, ease: "power1.inOut" },
        "step1to2"
      )
        .to(dotRefs.current[1], { color: "#7f8a91", duration: 1, ease: "power1.inOut" }, "step1to2")
        .to(numberRefs.current[1], { color: "rgba(232, 20, 26, 0.3)", duration: 1, ease: "power1.inOut" }, "step1to2")
        .to(
          [leftWordRefs.current[2], pillarRefs.current[2]],
          { opacity: 1, duration: 1, ease: "power1.inOut" },
          "step1to2"
        )
        .to(dotRefs.current[2], { color: "#e22328", duration: 1, ease: "power1.inOut" }, "step1to2")
        .to(numberRefs.current[2], { color: "#e8141a", duration: 1, ease: "power1.inOut" }, "step1to2");

      // Hold Stage 2 before unpinning
      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll click navigation to stage
  const scrollToStage = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;

    const cardHeight = cardRef.current?.offsetHeight || 792;
    const stickyTop = Math.max(16, (window.innerHeight - cardHeight) / 2);
    const totalScrollable = el.offsetHeight - cardHeight;
    const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.5 : 0.95;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = sectionTop - stickyTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

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
        className="sticky top-4 lg:top-[calc((100vh-792px)/2)] w-full min-h-[750px] lg:h-[792px] bg-[#080f12] overflow-hidden flex items-center justify-center px-6 sm:px-12 lg:px-[64px] py-16 lg:py-0 shadow-2xl"
      >
        {/* Background Image: detect-decide-respond-bg.png matching user specification */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="relative w-full h-full opacity-45">
            <Image
              src="/assets/detect-decide-respond-bg.png"
              alt="Tactical Mission Equipment"
              fill
              priority={false}
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
          </div>
          {/* Edge Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080f12]/90 via-transparent to-[#080f12]/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f12]/80 via-transparent to-[#080f12]/80" />
        </div>

        {/* Inner Content Grid */}
        <div className="relative z-10 max-w-[1408px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Big Editorial Words (Detect. Decide. Respond.) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-tight lg:leading-[76px] select-none text-[#f5f6f6]">
              {pillars.map((pillar, idx) => (
                <button
                  key={pillar.id}
                  ref={(el) => {
                    leftWordRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => scrollToStage(idx)}
                  className="block text-left py-1 cursor-pointer transition-transform duration-300 hover:scale-[1.02] will-change-[opacity]"
                >
                  <span>{pillar.title.replace(".", "")}</span>
                  <span
                    ref={(el) => {
                      dotRefs.current[idx] = el;
                    }}
                    className="transition-colors duration-300"
                  >
                    .
                  </span>
                </button>
              ))}
            </h2>
          </div>

          {/* Right Column: Clean Typography Without Card Backgrounds */}
          <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-10 max-w-[480px] lg:ml-auto">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                ref={(el) => {
                  pillarRefs.current[idx] = el;
                }}
                onClick={() => scrollToStage(idx)}
                className="flex flex-col gap-[12px] cursor-pointer transition-transform duration-300 hover:translate-x-1 will-change-[opacity]"
              >
                {/* Step Number */}
                <span
                  ref={(el) => {
                    numberRefs.current[idx] = el;
                  }}
                  className="text-[14px] font-medium transition-colors duration-300"
                >
                  {pillar.number}
                </span>

                {/* Heading */}
                <h3 className="text-2xl sm:text-[32px] font-normal leading-[40px] text-[#f5f6f6]">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-[16px] sm:text-[18px] font-normal leading-[28px] text-[#a3adb2]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
