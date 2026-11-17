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

export default function EcosystemSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [carouselOffset, setCarouselOffset] = useState(0);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  // Measure and update carousel translation whenever activeTab changes or window resizes
  const updateOffset = useCallback(() => {
    const activeCard = cardRefs.current[activeTab];
    if (activeCard) {
      setCarouselOffset(activeCard.offsetLeft);
    }
  }, [activeTab]);

  useEffect(() => {
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [updateOffset]);

  // Keep active tab smoothly scrolled into view inside the tabs navigation on mobile
  useEffect(() => {
    const currentTabEl = tabRefs.current[activeTab];
    if (currentTabEl) {
      currentTabEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
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
        // Swipe left -> next
        setActiveTab((prev) => (prev + 1) % ecosystemData.length);
      } else {
        // Swipe right -> prev
        setActiveTab((prev) => (prev - 1 + ecosystemData.length) % ecosystemData.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full bg-[#f5f6f6] px-6 sm:px-10 lg:px-[45px] py-16 lg:py-[50px] overflow-hidden rounded-[14px]"
      aria-label="One Connected Defense Ecosystem"
      data-node-id="210:1961"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1320px] mx-auto flex flex-col gap-[30px]">
        {/* Section Heading with Axion text-transform decrypt animation */}
        <div className="pt-2">
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

        {/* 7 Filter Tabs with animating red indicator border */}
        <div className="overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-[10px] min-w-max pb-1">
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
                  className={`group relative px-[12px] py-[13.5px] rounded-[4px] text-[14px] font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap overflow-hidden select-none ${
                    isActive
                      ? "bg-[#10181c] text-[#f1f2f2]"
                      : "bg-[#10181c]/38 text-[#f1f2f2] hover:bg-[#10181c]/60"
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

        {/* Horizontal Carousel Track */}
        <div
          className="relative w-full overflow-hidden -mx-6 px-6 sm:mx-0 sm:px-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex gap-[10px] items-start transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translate3d(-${carouselOffset}px, 0, 0)`,
            }}
          >
            {ecosystemData.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    if (!isActive) setActiveTab(idx);
                  }}
                  className={`group relative h-[468px] rounded-[14px] overflow-hidden shrink-0 shadow-lg bg-black cursor-pointer transition-opacity duration-500 ${
                    isActive
                      ? "w-[88vw] sm:w-[680px] lg:w-[976px] opacity-100"
                      : "w-[88vw] sm:w-[680px] lg:w-[814px] opacity-90 hover:opacity-100"
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

                  {/* Card Title Container with Tactical Framing Brackets */}
                  <div className="absolute bottom-10 left-8 sm:left-10 z-10 max-w-[85%] sm:max-w-[80%]">
                    <div className="relative inline-block pr-6 pb-2">
                      {/* Top-left mini bracket */}
                      <span className="absolute -top-3 -left-3 size-[10px] border-t border-l border-[#e22328]" />

                      <h3 className="text-lg sm:text-2xl font-medium text-[#f5f6f6] leading-snug sm:leading-[32px]">
                        {item.cardTitle}
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
