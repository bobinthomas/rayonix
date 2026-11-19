"use client";

import React, { useState } from "react";

interface UseCaseItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  operationalDomain: string;
  keySensors: string;
  tacticalOutcome: string;
}

const useCases: UseCaseItem[] = [
  {
    id: "001",
    tag: "USE CASE / 001",
    title: "Border & Underground Surveillance",
    description: "Identifying and assessing underground intrusion activities.",
    operationalDomain: "Border Security & Perimeter Defense",
    keySensors: "Geophones, Seismic Arrays, Deep GPR",
    tacticalOutcome:
      "Automated detection and depth mapping of clandestine cross-border tunnels and covert subterranean excavations before surface breach.",
  },
  {
    id: "002",
    tag: "USE CASE / 002",
    title: "Subsea Infrastructure Protection",
    description: "Monitoring underwater assets and potential security threats.",
    operationalDomain: "Critical Energy & Telecommunications Infrastructure",
    keySensors: "Fibre Optic DAS, Hydrophone Networks, Marine Sonar",
    tacticalOutcome:
      "Continuous acoustic threat monitoring around seabed cables, pipelines, and offshore platforms against diver intrusion or unauthorized anchoring.",
  },
  {
    id: "003",
    tag: "USE CASE / 003",
    title: "Critical Pipeline Security",
    description: "Identifying suspicious activities around pipeline infrastructure.",
    operationalDomain: "Strategic Oil, Gas & High-Pressure Fluid Corridors",
    keySensors: "Distributed Acoustic Sensing (DAS), Ground Vibration Sensors",
    tacticalOutcome:
      "Instantaneous pin-point alert on mechanical digging, illegal hot-tapping, and heavy machinery encroachment along thousands of pipeline kilometers.",
  },
  {
    id: "004",
    tag: "USE CASE / 004",
    title: "Maritime & Coastal Surveillance",
    description: "Integrating sensor data for underwater and surface threat monitoring.",
    operationalDomain: "Harbor Defense & Littoral Corridors",
    keySensors: "Subsurface Hydrophones, Sonar, Surface Thermal Cameras",
    tacticalOutcome:
      "Cross-domain sensor correlation for early warning of submersible drones (UUVs), small stealth surface crafts, and harbor sabotage activities.",
  },
  {
    id: "005",
    tag: "USE CASE / 005",
    title: "Integrated Subsurface Operations",
    description: "Unifying sensor networks and intelligence through centralised command and control.",
    operationalDomain: "Joint Military Command & Operational Headquarters",
    keySensors: "Unified C3I Console, Multi-Sensor Telemetry Mesh, Satellite Link",
    tacticalOutcome:
      "Centralized Common Operating Picture (COP) integrating real-time subsurface, ground, and aerial feeds for synchronized command decisions.",
  },
];

export default function CommandIntelligenceUseCases() {
  // Carousel page on desktop (2 cards per page, total 3 pages: 0-1, 2-3, 4)
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = Math.ceil(useCases.length / 2);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="use-cases"
      className="relative w-full bg-[#080f12] border-t border-[#253035] text-[#f5f6f6] py-16 lg:py-24"
      aria-label="Subsurface Command & Intelligence Use Cases"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10 lg:gap-12">
        {/* Header Row with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#e22328]">
              OPERATIONAL DEPLOYMENT
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-bold text-[#f5f6f6] leading-tight lg:leading-[56px] tracking-tight">
              Use Cases
            </h2>
            <p className="text-sm text-[#7f8a91] font-normal leading-[22px] max-w-[700px]">
              Supporting integrated intelligence and monitoring across subsurface security environments.
            </p>
          </div>

          {/* Carousel Tactical Navigation Arrows */}
          <div className="flex items-center gap-3 select-none">
            <button
              onClick={handlePrev}
              aria-label="Previous use cases"
              className="w-12 h-12 rounded-[4px] bg-[#10181c] border border-[#253035] flex items-center justify-center transition-all duration-300 hover:border-[#e22328] hover:bg-[#162025] cursor-pointer group outline-none"
            >
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              >
                <path
                  d="M7 1L2 6L7 11"
                  stroke="#bdc4c8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next use cases"
              className="w-12 h-12 rounded-[4px] bg-[#10181c] border border-[#253035] flex items-center justify-center transition-all duration-300 hover:border-[#e22328] hover:bg-[#162025] cursor-pointer group outline-none"
            >
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M1 1L6 6L1 11"
                  stroke="#bdc4c8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] gap-6"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
            }}
          >
            {/* Pair 1: Use Cases 001 & 002 */}
            <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[useCases[0], useCases[1]].map((item) => (
                <UseCaseCard key={item.id} item={item} />
              ))}
            </div>

            {/* Pair 2: Use Cases 003 & 004 */}
            <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[useCases[2], useCases[3]].map((item) => (
                <UseCaseCard key={item.id} item={item} />
              ))}
            </div>

            {/* Pair 3: Use Case 005 */}
            <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <UseCaseCard item={useCases[4]} />
              {/* Optional tactical inquiry card filling the 2nd slot */}
              <div className="bg-[#10181c] p-6 sm:p-8 rounded-[6px] border border-[#253035] flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-xs text-[#e22328] tracking-widest uppercase">
                    CUSTOM DEPLOYMENT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f5f6f6]">
                    Tailored Subsurface Intelligence
                  </h3>
                  <p className="text-sm text-[#bdc4c8] leading-relaxed">
                    Have mission-critical subterranean requirements or specialized geological conditions? Rayonix engineers custom sensor arrays and C3I integrations.
                  </p>
                </div>
                <div>
                  <a
                    href="mailto:info@rayonix.in?subject=Custom%20Subsurface%20Intelligence%20Deployment"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#e22328] hover:text-white transition-colors"
                  >
                    <span>Consult with Systems Engineers &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === idx
                  ? "w-8 bg-[#e22328]"
                  : "w-2 bg-[#253035] hover:bg-[#7f8a91]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ item }: { item: UseCaseItem }) {
  return (
    <div className="group bg-[#10181c] p-6 sm:p-8 rounded-[6px] border border-[#253035] hover:border-[#384850] transition-colors duration-300 flex flex-col justify-between gap-6 min-h-[320px]">
      <div className="flex flex-col gap-4">
        {/* Tactical Tag & Domain Badge */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#e22328] font-bold tracking-wider">
            {item.tag}
          </span>
          <span className="text-[#7f8a91] text-[11px] uppercase tracking-wider">
            {item.operationalDomain}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-[26px] font-bold text-[#f5f6f6] tracking-tight leading-snug group-hover:text-white transition-colors">
          {item.title}
        </h3>

        {/* Description from user prompt */}
        <p className="text-base text-[#bdc4c8] font-medium leading-relaxed">
          {item.description}
        </p>

        {/* Tactical Outcome & Details */}
        <div className="pt-2 text-sm text-[#7f8a91] leading-relaxed">
          <span className="text-[#bdc4c8] font-semibold block mb-1">Operational Impact:</span>
          {item.tacticalOutcome}
        </div>
      </div>

      {/* Sensor Stack Footnote */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-[#7f8a91]">
        <span>Sensors: {item.keySensors}</span>
      </div>
    </div>
  );
}
