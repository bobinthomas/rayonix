"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import TransformingHeading from "@/components/ui/TransformingHeading";
import PillTab from "@/components/ui/PillTab";

interface EcosystemItem {
  id: string;
  tabTitle: string;
  cardTitle: string;
  image: string;
}

const ecosystemData: EcosystemItem[] = [
  {
    id: "tab-1",
    tabTitle: "Sensing Systems",
    cardTitle: "Multi-Modal Surveillance & Detection",
    image: "/assets/ecosystem-tab1.webp",
  },
  {
    id: "tab-2",
    tabTitle: "Mission Software & Autonomy",
    cardTitle: "XOS • DMS • Autonomous Mission Execution",
    image: "/assets/ecosystem-tab2.webp",
  },
  {
    id: "tab-3",
    tabTitle: "Unified Agnostic Platforms",
    cardTitle: "UAVs • UGVs • Robotic Systems",
    image: "/assets/ecosystem-tab3.webp",
  },
  {
    id: "tab-4",
    tabTitle: "Command Systems Static & Mobile",
    cardTitle: "C2 • C3I. C4. C5. C6 Capability",
    image: "/assets/ecosystem-tab4.webp",
  },
  {
    id: "tab-5",
    tabTitle: "Weapons & Tactical Systems",
    cardTitle: "Weapons Accessories • Tactical Systems",
    image: "/assets/ecosystem-tab5.webp",
  },
  {
    id: "tab-6",
    tabTitle: "Counter-UAS Systems",
    cardTitle: "Detection • Mitigation • Interception",
    image: "/assets/ecosystem-tab6.webp",
  },
  {
    id: "tab-7",
    tabTitle: "Secure Communications",
    cardTitle: "Tactical • Resilient • Mission Networks",
    image: "/assets/ecosystem-tab7.webp",
  },
];

const GLYPHS = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'.";

function CardTitleScramble({
  title,
  isActive,
  isHovered,
}: {
  title: string;
  isActive: boolean;
  isHovered: boolean;
}) {
  const [displayText, setDisplayText] = useState(title);
  const animRef = useRef<NodeJS.Timeout | null>(null);

  const runScramble = useCallback(() => {
    if (animRef.current) clearInterval(animRef.current);

    const length = title.length;
    const ticks = new Array(length).fill(0);
    const startDelays = title.split("").map((_, i) => Math.floor(i * 0.7));
    let currentGlobalTick = 0;
    const scrambleTicks = 5;

    animRef.current = setInterval(() => {
      currentGlobalTick++;
      let allDone = true;
      const newChars: string[] = [];

      for (let i = 0; i < length; i++) {
        const char = title[i];
        if (char === " " || char === "•" || char === ".") {
          newChars.push(char);
          continue;
        }

        if (currentGlobalTick < startDelays[i]) {
          allDone = false;
          newChars.push(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        } else {
          ticks[i]++;
          if (ticks[i] < scrambleTicks) {
            allDone = false;
            newChars.push(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
          } else {
            newChars.push(char);
          }
        }
      }

      setDisplayText(newChars.join(""));

      if (allDone) {
        if (animRef.current) clearInterval(animRef.current);
        animRef.current = null;
        setDisplayText(title);
      }
    }, 24);
  }, [title]);

  // Trigger whenever this card becomes active
  useEffect(() => {
    if (isActive) {
      runScramble();
    }
  }, [isActive, runScramble]);

  // Trigger on card hover
  useEffect(() => {
    if (isHovered) {
      runScramble();
    }
  }, [isHovered, runScramble]);

  useEffect(() => {
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, []);

  return <span>{displayText}</span>;
}

// Mathematical grid line constant matching max-w-[1280px] mx-auto px-6 sm:px-8 (32px / 2rem on sm+)
const GRID_LEFT_CSS = "max(2rem, calc((100% - 1280px) / 2 + 2rem))";
const GRID_WIDTH_CSS = "calc(100% - max(2rem, calc((100% - 1280px) / 2 + 2rem)))";

export default function EcosystemSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [carouselOffset, setCarouselOffset] = useState(0);
  // Mobile (< md) accordion: one category open at a time, first open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  // Measure and update carousel translation, clamping to eliminate right-side gaps
  const updateOffset = useCallback(() => {
    const activeCard = cardRefs.current[activeTab];
    if (activeCard && trackRef.current && containerRef.current) {
      const naturalOffset = activeCard.offsetLeft;
      const maxOffset = Math.max(
        0,
        trackRef.current.scrollWidth - containerRef.current.clientWidth
      );
      setCarouselOffset(Math.min(naturalOffset, maxOffset));
    } else if (activeCard) {
      setCarouselOffset(activeCard.offsetLeft);
    }
  }, [activeTab]);

  useEffect(() => {
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [updateOffset]);

  // Touch swipe support for mobile carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveTab((prev) => (prev + 1) % ecosystemData.length);
      } else {
        setActiveTab((prev) => (prev - 1 + ecosystemData.length) % ecosystemData.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f5f6f6] py-16 lg:py-[50px] overflow-hidden"
      aria-label="One Connected Defense Ecosystem"
      data-node-id="210:1961"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredCardIndex(null);
      }}
    >
      <div className="w-full flex flex-col gap-[30px]">
        {/* Section Heading - Strictly aligned to 1280px master container grid */}
        <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8">
          <div className="pt-2">
            <TransformingHeading
              as="h2"
              segments={[
                { text: "One Connected\nDefense ", className: "text-[#080f12]" },
                { text: "Ecosystem", className: "text-[#7f8a91]" },
              ]}
              accentDot={true}
              accentColor="#e22328"
              className="type-hero"
            />
          </div>
        </div>

        {/* Mobile (< md): accordion. All 7 categories visible; tap to reveal its card */}
        <div className="md:hidden max-w-[1280px] mx-auto w-full px-6 flex flex-col gap-3">
          {ecosystemData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-[4px] border shadow-sm transition-colors duration-300 ${
                  isOpen ? "border-[#bdc4c8]" : "border-[#e2e8f0]"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`ecosystem-panel-${item.id}`}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full min-h-[56px] flex items-center gap-3 px-4 py-3 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] rounded-[4px]"
                  >
                    <span
                      className={`font-mono text-[11px] tracking-wider ${
                        isOpen ? "text-[#e22328]" : "text-[#7f8a91]"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 type-body font-medium text-[#080f12] ">
                      {item.tabTitle}
                    </span>
                    <span
                      className={`relative shrink-0 w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <span className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#e22328]" />
                      <span className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#e22328]" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`ecosystem-panel-${item.id}`}
                  role="region"
                  aria-label={item.tabTitle}
                  hidden={!isOpen}
                  className={`px-3 pb-3 ${isOpen ? "block" : "hidden"}`}
                >
                  <div className="eco-reveal relative w-full aspect-[16/10] rounded-[8px] overflow-hidden bg-black">
                    <Image
                      src={item.image}
                      alt={item.cardTitle}
                      fill
                      sizes="92vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0.064) 40%, rgba(0, 0, 0, 0.82) 100%)",
                      }}
                    />
                    <div className="absolute top-0 left-0 size-[8px] bg-[#e22328] z-20" />
                    <div className="absolute bottom-0 right-0 size-[8px] bg-[#e22328] z-20" />
                    <div className="absolute bottom-5 left-6 right-6 z-10">
                      <div className="relative inline-block pr-5 pb-1.5">
                        <span className="absolute -top-2.5 -left-2.5 size-[8px] border-t border-l border-[#e22328]" />
                        <p className="type-body-lg font-medium text-[#f5f6f6] ">
                          <CardTitleScramble title={item.cardTitle} isActive={isOpen} isHovered={false} />
                        </p>
                        <span className="absolute -bottom-0.5 right-0 size-[8px] border-b border-r border-[#e22328]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop (md+): 7 Filter Tabs - Anchored strictly to the 1280px grid line on the left, extends to the right */}
        <div
          ref={tabsContainerRef}
          className="hidden md:block relative overflow-x-auto no-scrollbar"
          style={{
            marginLeft: GRID_LEFT_CSS,
            width: GRID_WIDTH_CSS,
          }}
        >
          <div className="flex items-center gap-[6px] sm:gap-[8px] min-w-max pb-1">
            {ecosystemData.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <PillTab
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  active={isActive}
                  paused={isPaused}
                  onClick={() => setActiveTab(idx)}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onProgressEnd={() => setActiveTab((prev) => (prev + 1) % ecosystemData.length)}
                >
                  {item.tabTitle}
                </PillTab>
              );
            })}
          </div>
        </div>

        {/* Desktop (md+): Horizontal Carousel Track - Clipped strictly at left grid line, bleeds to right */}
        <div
          ref={containerRef}
          className="hidden md:block relative overflow-hidden"
          style={{
            marginLeft: GRID_LEFT_CSS,
            width: GRID_WIDTH_CSS,
            clipPath: "inset(0 0 0 0)",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex gap-[10px] items-start transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translate3d(-${carouselOffset}px, 0, 0)`,
            }}
          >
            {ecosystemData.map((item, idx) => {
              const isActive = activeTab === idx;
              const isCardHovered = hoveredCardIndex === idx;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    if (!isActive) setActiveTab(idx);
                  }}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  className={`group relative w-[88vw] sm:w-[680px] lg:w-[976px] h-[468px] rounded-[14px] overflow-hidden shrink-0 shadow-lg bg-black cursor-pointer transition-opacity duration-500 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-90 hover:opacity-100"
                  }`}
                  role="group"
                  aria-label={item.cardTitle}
                >
                  {/* Background Image & Gradients */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.cardTitle}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 88vw, (max-width: 1200px) 680px, 976px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Figma Gradients: 180deg dark vignette & 244deg red/maroon tactical glow */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0.064) 53.31%, rgba(0, 0, 0, 0.8) 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(243.85deg, rgba(226, 35, 40, 0.19) 8.33%, rgba(113, 18, 20, 0.19) 52.36%, rgba(57, 9, 10, 0.19) 74.37%, rgba(28, 4, 5, 0.19) 85.38%, rgba(0, 0, 0, 0.19) 96.38%)",
                      }}
                    />
                  </div>

                  {/* Tactical Corner Red Reticles matching Figma nodes */}
                  <div className="absolute top-0 left-0 size-[10px] bg-[#e22328] z-20" />
                  <div className="absolute bottom-0 right-0 size-[10px] bg-[#e22328] z-20" />

                  {/* Card Title Container with Tactical Framing Brackets & Scramble Animation */}
                  <div className="absolute bottom-10 left-8 sm:left-10 z-10 max-w-[85%] sm:max-w-[80%]">
                    <div className="relative inline-block pr-6 pb-2">
                      {/* Top-left mini bracket */}
                      <span className="absolute -top-3 -left-3 size-[10px] border-t border-l border-[#e22328]" />

                      <h3 className="type-h3 text-[#f5f6f6] ">
                        <CardTitleScramble
                          title={item.cardTitle}
                          isActive={isActive}
                          isHovered={isCardHovered}
                        />
                      </h3>

                      {/* Bottom-right mini bracket */}
                      <span className="absolute -bottom-1 right-0 size-[10px] border-b border-r border-[#e22328]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
