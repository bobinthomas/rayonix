"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TransformingHeading from "@/components/ui/TransformingHeading";

interface MetricItem {
  value: string;
  label: string;
  accent?: boolean;
}

const metrics: MetricItem[] = [
  { value: "< 50ms", label: "Telemetry Ingestion Latency", accent: true },
  { value: "4-Layer", label: "Multi-Sensor Fusion Engine" },
  { value: "99.4%", label: "AI Signature Verification" },
  { value: "3D Vector", label: "Localisation & Trajectory" },
  { value: "MIL-STD", label: "C3I System Interoperability" },
];

export default function CommandIntelligenceHero() {
  return (
    <section
      className="relative w-full bg-[#080f12] text-[#f5f6f6] pt-28 sm:pt-32 pb-16 lg:pb-20"
      aria-label="Subsurface Command & Intelligence Architecture Overview"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-10 lg:gap-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm font-medium text-[#7f8a91]"
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
          <span className="text-[#bdc4c8]">Decide</span>
          <span className="text-[#7f8a91]" aria-hidden="true">
            /
          </span>
          <span className="text-[#e22328]" aria-current="page">
            Command & Intelligence
          </span>
        </nav>

        {/* Display Title and Lead Statement */}
        <div className="flex flex-col gap-6 lg:gap-8 max-w-[1230px]">
          <TransformingHeading
            as="h1"
            text="COMMAND & INTELLIGENCE"
            className="text-5xl sm:text-7xl lg:text-[104px] font-bold text-[#f5f6f6] tracking-tight leading-[1.05]"
          />

          <div className="flex flex-col gap-3">
            <h2 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#e22328] leading-[32px]">
              Subsurface Sensor Fusion & Decision Support
            </h2>
            <p className="text-base sm:text-lg lg:text-[18px] text-[#bdc4c8] font-normal leading-[28px] max-w-[1176px]">
              Our Command & Intelligence layer transforms subsurface sensor data
              into actionable intelligence through AI analytics, sensor fusion,
              localisation and threat assessment, enabling informed operational
              decisions.
            </p>
          </div>
        </div>

        {/* Tactical Sensor Render Enclosure (C2 Command Center Interface) */}
        <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[635px] rounded-[8px] overflow-hidden border border-[#253035] bg-[#080f12] shadow-2xl group">
          {/* Main Command Centre Image */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/assets/command-centre.webp"
              alt="Rayonix Subsurface Command & Intelligence Tactical Operational Console"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
            />
            {/* Atmospheric tactical vignetting */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080f12]/85 via-transparent to-[#080f12]/30 pointer-events-none" />
          </div>

          {/* HUD Top Left: Coordinates & System State */}
          <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 flex items-center gap-2 select-none pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#080f12]/90 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#e22328] animate-pulse" />
              <span className="font-mono text-[11px] text-[#f5f6f6] tracking-wider uppercase font-semibold">
                C3I NODE: ACTIVE
              </span>
            </div>
            <div className="hidden sm:flex items-center px-2 py-1 rounded-[2px] bg-[#080f12]/70 border border-white/5 font-mono text-[10px] text-[#7f8a91] tracking-widest">
              GRID: X 0442 · Y 0891
            </div>
          </div>

          {/* HUD Top Right: Security Classification */}
          <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 hidden sm:flex items-center gap-2 select-none pointer-events-none">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-[#080f12]/80 border border-white/10 font-mono text-[10px] text-[#bdc4c8] tracking-widest uppercase">
              <span>SEC: RESTRICTED</span>
              <span className="text-white/20">|</span>
              <span className="text-[#e22328]">AI FUSION ENGINE</span>
            </div>
          </div>

          {/* HUD Bottom Left: Tactical Layer Label */}
          <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 z-10 select-none pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#080f12]/90 border border-white/10 backdrop-blur-md font-mono text-xs text-[#f5f6f6] tracking-wider">
              <span className="text-[#e22328] font-bold">DECIDE</span>
              <span className="text-white/20">/</span>
              <span className="text-[#bdc4c8]">SUBSURFACE C3I LAYER</span>
            </div>
          </div>

          {/* HUD Bottom Right: Reticle Mark */}
          <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 z-10 hidden sm:flex items-center gap-1 font-mono text-[10px] text-[#7f8a91] select-none pointer-events-none">
            <span>[ + ] LATENCY &lt; 50MS</span>
          </div>
        </div>

        {/* 5-Column Tactical Metrics Strip */}
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-px bg-[#253035] border border-[#253035] rounded-[4px] overflow-hidden">
          {metrics.map((spec) => (
            <div
              key={spec.label}
              className="bg-[#10181c] p-4 sm:p-5 flex flex-col justify-between gap-2 min-h-[96px] sm:min-h-[110px]"
            >
              <span className="text-xs sm:text-[12px] font-medium text-[#7f8a91] uppercase tracking-wider">
                {spec.label}
              </span>
              <span
                className={`text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight ${
                  spec.accent ? "text-[#e22328]" : "text-[#f5f6f6]"
                }`}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
