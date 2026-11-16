"use client";

import { useState } from "react";
import Image from "next/image";

const tabs = [
  "Sensing Systems",
  "Mission Software & Autonomy",
  "Unified Agnostic Platforms",
  "Command Systems Static & Mobile",
  "Weapons & Tactical Systems",
  "Counter-UAS Systems",
  "Secure Communications",
];

const cards = [
  {
    id: "card-1",
    title: "Multi-Modal Surveillance & Detection",
    image: "/assets/ecosystem-1.png",
  },
  {
    id: "card-2",
    title: "XOS • DMS • Autonomous Mission Execution",
    image: "/assets/ecosystem-2.png",
  },
  {
    id: "card-3",
    title: "UAVs • UGVs • Robotic Systems",
    image: "/assets/ecosystem-3.png",
  },
  {
    id: "card-4",
    title: "C2 • C3I. C4. C5. C6 Capability",
    image: "/assets/ecosystem-4.png",
  },
  {
    id: "card-5",
    title: "Weapons Accessories • Tactical Systems",
    image: "/assets/ecosystem-5.png",
  },
  {
    id: "card-6",
    title: "Detection • Mitigation • Interception",
    image: "/assets/ecosystem-1.png",
  },
  {
    id: "card-7",
    title: "Tactical • Resilient • Mission Networks",
    image: "/assets/ecosystem-2.png",
  },
];

export default function EcosystemSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      className="relative w-full bg-[#f5f6f6] px-6 sm:px-10 lg:px-[45px] py-16 lg:py-[40px] overflow-hidden"
      aria-label="One Connected Defence Ecosystem"
      data-node-id="640:3865"
    >
      <div className="max-w-[1363px] mx-auto flex flex-col gap-[30px]">
        {/* Section Heading matching Figma node I640:3866;206:1728 */}
        <div className="pt-4">
          <h2 className="text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#080f12] leading-tight lg:leading-[72px]">
            One Connected
            <br />
            Defense{" "}
            <span className="text-[#7f8a91]">Ecosystem</span>
            <span className="text-[#e22328]">.</span>
          </h2>
        </div>

        {/* 7 Filter Tabs matching Figma node I640:3866;206:1732 */}
        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-[10px] min-w-max">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-[12px] py-[13.5px] rounded-[4px] text-[14px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === idx
                    ? "bg-[#10181c] text-[#f1f2f2] border-b-2 border-[#e22328]"
                    : "bg-[#10181c]/38 text-[#f1f2f2] hover:bg-[#10181c]/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scroll Carousel of Architecture Cards matching Figma node I640:3866;206:1747 */}
        <div className="overflow-x-auto no-scrollbar pb-6 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-[45px] lg:px-[45px]">
          <div className="flex gap-[10px] items-start min-w-max">
            {cards.map((card) => (
              <div
                key={card.id}
                className="group relative w-[85vw] sm:w-[600px] lg:w-[814px] h-[468px] rounded-[14px] overflow-hidden shrink-0 shadow-md bg-black"
              >
                {/* Background Image & Gradient */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 814px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Figma Gradients: 180deg dark vignette & 244deg red/maroon tactical glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(243.85deg, rgba(226,35,40,0.19) 8.33%, rgba(113,18,20,0.19) 52.36%, rgba(57,9,10,0.19) 74.37%, rgba(0,0,0,0.19) 96.38%)",
                    }}
                  />
                </div>

                {/* Tactical Corner Reticles matching Figma nodes */}
                <div className="absolute top-0 left-0 size-[10px] bg-[#e22328] z-20" />
                <div className="absolute bottom-0 right-0 size-[10px] bg-[#e22328] z-20" />

                {/* Card Title Container with corner markers */}
                <div className="absolute bottom-10 left-8 sm:left-10 z-10 max-w-[90%]">
                  <div className="relative inline-block pr-6 pb-2">
                    {/* Top-left mini bracket */}
                    <span className="absolute -top-3 -left-3 size-[10px] border-t border-l border-[#e22328]" />
                    <h3 className="text-xl sm:text-2xl font-medium text-[#f5f6f6] leading-[32px]">
                      {card.title}
                    </h3>
                    {/* Bottom-right mini bracket */}
                    <span className="absolute -bottom-1 right-0 size-[10px] border-b border-r border-[#e22328]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
