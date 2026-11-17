"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import TransformingHeading from "@/components/ui/TransformingHeading";

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

export default function EcosystemSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [carouselOffset, setCarouselOffset] = useState(0);

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

  // Keep active tab smoothly scrolled horizontally within its own container only (never touch window/page scroll)
  useEffect(() => {
    const container = tabsContainerRef.current;
    const currentTabEl = tabRefs.current[activeTab];
    if (container && currentTabEl) {
      const targetLeft =
        currentTabEl.offsetLeft -
        container.clientWidth / 2 +
        currentTabEl.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
  }, [activeTab]);

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
      className="relative w-full bg-[#f5f6f6] py-16 lg:py-[50px] overflow-hidden"
      style={{
        paddingLeft: "max(24px, calc((100% - 1320px) / 2))",
        paddingRight: 0,
      }}
      aria-label="One Connected Defense Ecosystem"
      data-node-id="210:1961"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredCardIndex(null);
      }}
    >
      <div className="w-full flex flex-col gap-[30px]">
        {/* Section Heading with Axion text-transform decrypt animation */}
        <div className="pt-2 max-w-[1320px] pr-6 sm:pr-10">
          <TransformingHeading
            as="h2"
            segments={[
              { text: "One Connected\nDefense ", className: "text-[#080f12]" },
              { text: "Ecosystem", className: "text-[#7f8a91]" },
            ]}
            accentDot={true}
            accentColor="#e22328"
            className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-tight lg:leading-[72px]"
          />
        </div>

        {/* 7 Filter Tabs - Solid high-contrast styling extending to right edge */}
        <div ref={tabsContainerRef} className="w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-[10px] min-w-max pb-1 pr-6 sm:pr-10">
            {ecosystemData.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  className={`group relative px-[12px] py-[13.5px] rounded-[4px] text-[14px] font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap overflow-hidden select-none border-0 outline-none ${
                    isActive
                      ? "bg-[#10181c] text-[#f1f2f2]"
                      : "bg-[#9da1a4] text-white hover:bg-[#868c90]"
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <span className="relative z-10">{item.tabTitle}</span>

                  {/* Red progress bar that animates (grows) over the auto-advance interval */}
                  {isActive && (
                    <div
                      key={`progress-${idx}`}
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e22328] animate-tab-progress"
                      style={{
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                      onAnimationEnd={() => {
                        if (!isPaused) {
                          setActiveTab((prev) => (prev + 1) % ecosystemData.length);
                        }
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Carousel Track - Bleeds smoothly all the way to the right edge */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
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

                      <h3 className="text-lg sm:text-2xl font-medium text-[#f5f6f6] leading-snug sm:leading-[32px]">
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
