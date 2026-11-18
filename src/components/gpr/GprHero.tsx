"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TransformingHeading from "@/components/ui/TransformingHeading";

interface SpecItem {
  value: string;
  label: string;
  accent?: boolean;
}

const specs: SpecItem[] = [
  { value: "600 MHz", label: "Antenna Frequency", accent: true },
  { value: "2.7 kg", label: "System Weight" },
  { value: "1+ Hours", label: "Operating Time" },
  { value: "IP65", label: "Environmental Protection Rating" },
  { value: "620 × 216 × 80 mm", label: "System Dimensions" },
];

export default function GprHero() {
  return (
    <section
      className="relative w-full bg-[#080f12] text-[#f5f6f6] px-6 sm:px-12 lg:px-[64px] pt-28 sm:pt-32 pb-16 lg:pb-20"
      aria-label="GPR Subsurface Detection and Mapping Overview"
      data-node-id="480:4633"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 lg:gap-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm font-medium text-[#7f8a91]"
          data-node-id="486:5632"
        >
          <Link
            href="/"
            className="text-[#bdc4c8] hover:text-white transition-colors"
          >
            Home
          </Link>
          <span className="text-[#7f8a91]" aria-hidden="true">
            /
          </span>
          <span className="text-[#bdc4c8]">Subsurface</span>
          <span className="text-[#7f8a91]" aria-hidden="true">
            /
          </span>
          <span className="text-[#bdc4c8]">Detect</span>
          <span className="text-[#7f8a91]" aria-hidden="true">
            /
          </span>
          <span className="text-[#e22328]" aria-current="page">
            GPR
          </span>
        </nav>

        {/* Display Title and Intro */}
        <div className="flex flex-col gap-6 lg:gap-8 max-w-[1230px]">
          <TransformingHeading
            as="h1"
            text="GPR"
            className="text-6xl sm:text-8xl lg:text-[128px] font-bold text-[#f5f6f6] tracking-tight leading-none"
          />

          <div className="flex flex-col gap-3">
            <h2 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#e22328] leading-[32px]">
              Subsurface Detection & Mapping
            </h2>
            <p className="text-base sm:text-lg lg:text-[18px] text-[#bdc4c8] font-normal leading-[28px] max-w-[1176px]">
              Our Ground Penetrating Radar (GPR) solution uses electromagnetic
              waves to detect buried objects, map underground structures and
              identify subsurface anomalies without excavation.
            </p>
          </div>
        </div>

        {/* Tactical Sensor Render Enclosure */}
        <div
          className="relative w-full h-[380px] sm:h-[500px] lg:h-[635px] rounded-[8px] overflow-hidden border border-[#253035] bg-[#080f12] shadow-2xl group"
          data-node-id="527:1192"
        >
          {/* Main GPR Sensor Image */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/assets/gpr-hero.webp"
              alt="GPR Tactical Sensor Hardware Spec GPR-TR400"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
            />
            {/* Atmospheric overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080f12]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* HUD Top Left: Coordinates */}
          <div
            className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 flex items-center gap-2 select-none pointer-events-none"
            data-node-id="527:1207"
          >
            <span className="text-[#e22328] text-xs font-mono font-bold">+</span>
            <span className="text-[#bdc4c8] text-[11px] font-mono tracking-[1.1px]">
              LAT 33.4241° N // LON 111.9281° W
            </span>
          </div>

          {/* HUD Top Right: Hardware Spec Badge */}
          <div
            className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 backdrop-blur-[6px] bg-[#080f12]/90 border border-[#253035] px-3.5 py-1.5 rounded-[4px] select-none pointer-events-none"
            data-node-id="527:1211"
          >
            <span className="text-[#bdc4c8] text-[11px] font-mono tracking-[1.1px]">
              Hardware Spec: GPR-TR400 // Air-Ground Dual
            </span>
          </div>

          {/* Corner Alignment Reticles */}
          <div
            className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#e22328] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#e22328] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Floating 5-Column Specification Strip */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 w-full"
          data-node-id="527:1216"
        >
          {specs.map((spec, idx) => (
            <div
              key={idx}
              className={`relative bg-[#10181c] border border-[#253035] rounded-[4px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-md transition-all duration-300 hover:border-[#38464d] ${
                idx === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              {/* Left Accent Bar */}
              <div
                className={`absolute top-0 bottom-0 left-0 w-1 ${
                  spec.accent ? "bg-[#e22328]" : "bg-[#253035]"
                }`}
                aria-hidden="true"
              />

              <div className="flex flex-col gap-1 pl-1">
                <span className="text-2xl sm:text-3xl lg:text-[30px] font-normal text-[#f5f6f6] tracking-tight leading-tight">
                  {spec.value}
                </span>
                <span className="text-xs sm:text-sm lg:text-[15px] font-normal text-[#7f8a91] leading-snug">
                  {spec.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
