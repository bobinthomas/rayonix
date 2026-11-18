"use client";

import React, { useState } from "react";
import Image from "next/image";
import TransformingHeading from "@/components/ui/TransformingHeading";

interface CountryMarker {
  id: string;
  country: string;
  region: string;
  role: string;
  isHQ?: boolean;
  // Exact continental pixel coordinates on the 1408 x 1369 figma-node-map.png
  origX: number;
  origY: number;
  align?: "left" | "center" | "right";
}

const countryMarkers: CountryMarker[] = [
  {
    id: "usa",
    country: "United States",
    region: "North America",
    role: "Strategic AI & Unmanned Systems",
    origX: 328.3,
    origY: 426.5,
    align: "left",
  },
  {
    id: "uk",
    country: "United Kingdom",
    region: "Europe",
    role: "Defence Avionics & Communication",
    origX: 682.1,
    origY: 381.7,
    align: "center",
  },
  {
    id: "sweden",
    country: "Sweden",
    region: "Northern Europe",
    role: "Ground Penetrating Radar & Sensor Systems",
    origX: 792.2,
    origY: 397.6,
    align: "center",
  },
  {
    id: "south-africa",
    country: "South Africa",
    region: "Africa",
    role: "Tactical Mobility & Border Surveillance",
    origX: 816.4,
    origY: 701.2,
    align: "center",
  },
  {
    id: "israel",
    country: "Israel",
    region: "Middle East",
    role: "Battle-Tested Electro-Optics & C-UAS",
    origX: 902.0,
    origY: 472.1,
    align: "center",
  },
  {
    id: "india",
    country: "India",
    region: "South Asia",
    role: "Rayonix Central Command & Integration Hub",
    isHQ: true,
    origX: 1026.4,
    origY: 474.6,
    align: "center",
  },
  {
    id: "singapore",
    country: "Singapore",
    region: "Southeast Asia",
    role: "Robotics & Subsurface Intelligence",
    origX: 1159.7,
    origY: 583.3,
    align: "center",
  },
  {
    id: "japan",
    country: "Japan",
    region: "East Asia",
    role: "Precision Photonics & Edge Compute",
    origX: 1317.6,
    origY: 434.5,
    align: "right",
  },
  {
    id: "australia",
    country: "Australia",
    region: "Oceania",
    role: "Maritime Domain Awareness & Early Warning",
    origX: 1322.3,
    origY: 722.6,
    align: "right",
  },
];

export default function GlobalPartnershipSection() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  return (
    <section
      className="relative w-full min-h-[960px] lg:min-h-[1260px] bg-[#080f12] text-[#f5f6f6] pt-[100px] lg:pt-[116px] pb-[60px] px-6 sm:px-12 lg:px-[84px] overflow-hidden flex flex-col justify-between rounded-none"
      aria-label="Global Technology and Indian Defence Capability"
      data-node-id="354:2941"
    >
      {/* 1. Background 3D Sci-Fi World Map & Tactical Markers inside Unified SVG Coordinate Space
          Both the map raster image and the target markers share the exact same 1408x1369 viewBox.
          The browser's native C++ matrix compositor handles all scaling, making marker drift
          physically impossible across any resolution, aspect ratio, or DPI scaling. */}
      <div className="absolute inset-0 select-none overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1408 1369"
          preserveAspectRatio="xMidYMin slice"
          className="w-full h-full pointer-events-none"
          role="region"
          aria-label="Interactive Global Defence Network Map"
        >
          <defs>
            <filter id="hud-glow-red" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#e22328" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Base Map Graphic */}
          <image
            href="/assets/figma-node-map.png"
            width={1408}
            height={1369}
            preserveAspectRatio="none"
            opacity={0.9}
          />

          {/* Pinned Tactical Markers — Coincident with map landmasses at all viewports */}
          {countryMarkers.map((marker) => {
            const isHovered = activeMarker === marker.id;
            return (
              <g
                key={marker.id}
                transform={`translate(${marker.origX}, ${marker.origY})`}
                className={`cursor-pointer focus:outline-none group ${
                  isHovered ? "is-active" : ""
                }`}
                style={{ pointerEvents: "all" }}
                role="button"
                tabIndex={0}
                aria-label={`${marker.country}: ${marker.role}`}
                onMouseEnter={() => setActiveMarker(marker.id)}
                onMouseLeave={() => setActiveMarker(null)}
                onClick={() => setActiveMarker(isHovered ? null : marker.id)}
                onFocus={() => setActiveMarker(marker.id)}
                onBlur={() => setActiveMarker(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveMarker(isHovered ? null : marker.id);
                  }
                }}
              >
                <title>{`${marker.country}: ${marker.role}`}</title>

                {/* Expanded hit target circle — 28px radius (56px diameter) with pointerEvents="all" */}
                <circle
                  r={28}
                  fill="#000000"
                  fillOpacity={0.0001}
                  style={{ pointerEvents: "all" }}
                />

                {/* SMIL Animated Radar Pulse Ring */}
                <circle r={marker.isHQ ? 5 : 4} fill="#e22328" style={{ pointerEvents: "none" }}>
                  <animate
                    attributeName="r"
                    values={marker.isHQ ? "5; 24; 28" : "4; 18; 22"}
                    dur={marker.isHQ ? "1.8s" : "2.6s"}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values={marker.isHQ ? "0.85; 0.25; 0" : "0.75; 0.2; 0"}
                    dur={marker.isHQ ? "1.8s" : "2.6s"}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Secondary Ring */}
                <circle
                  r={isHovered ? (marker.isHQ ? 11 : 9) : (marker.isHQ ? 8 : 6)}
                  fill="#e22328"
                  fillOpacity={marker.isHQ ? 0.35 : 0.2}
                  stroke="#e22328"
                  strokeWidth={1}
                  strokeOpacity={marker.isHQ ? 0.9 : 0.6}
                  className="transition-all duration-300 group-hover:scale-125"
                  style={{ pointerEvents: "none" }}
                />

                {/* Core Solid Red Target Dot */}
                <circle
                  r={isHovered ? (marker.isHQ ? 6 : 5) : (marker.isHQ ? 4.5 : 3.5)}
                  fill="#e22328"
                  filter="url(#hud-glow-red)"
                  className="transition-all duration-200 group-hover:scale-125"
                  style={{ pointerEvents: "none" }}
                />

                {/* Inner Center White Dot */}
                <circle
                  r={marker.isHQ ? 1.8 : 1.4}
                  fill="#ffffff"
                  fillOpacity={0.95}
                  style={{ pointerEvents: "none" }}
                />

                {/* Tactical Military HUD Tooltip via SVG foreignObject — 100% Locked to the marker */}
                <foreignObject
                  x={marker.align === "left" ? 0 : marker.align === "right" ? -240 : -120}
                  y={-92}
                  width={240}
                  height={86}
                  className={`overflow-visible pointer-events-none transition-all duration-200 ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0"
                  }`}
                >
                  <div
                    className="relative bg-[#080f12]/95 backdrop-blur-md px-3.5 py-2 rounded-[2px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.85)] min-w-[200px] max-w-[240px] whitespace-normal select-none"
                  >
                    {/* Corner Hairline Brackets */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#e22328]" />
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#e22328]" />
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#e22328]" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#e22328]" />

                    {/* Header Row: Country Name + Status Indicator */}
                    <div className="flex items-center justify-between gap-2 pb-1 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            marker.isHQ ? "bg-[#e22328] animate-pulse" : "bg-[#e22328]"
                          }`}
                        />
                        <span className="text-[13px] font-bold text-[#f5f6f6] tracking-wide uppercase font-sans">
                          {marker.country}
                        </span>
                      </div>
                      {marker.isHQ && (
                        <span className="text-[9px] font-mono tracking-wider px-1 py-0.2 bg-[#e22328]/20 text-[#e22328] font-bold border border-[#e22328]/40 rounded-[2px]">
                          HQ
                        </span>
                      )}
                    </div>

                    {/* Role & Tactical Capability */}
                    <p className="text-[11px] text-[#bdc4c8] font-mono tracking-tight leading-snug mt-1.5">
                      {marker.role}
                    </p>

                    {/* Downward Pointer Notch */}
                    <div
                      className={`absolute top-full w-2 h-2 -mt-1 bg-[#080f12] border-r border-b border-white/20 rotate-45 ${
                        marker.align === "left"
                          ? "left-6"
                          : marker.align === "right"
                          ? "right-6"
                          : "left-1/2 -translate-x-1/2"
                      }`}
                    />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 2. Content Container: Strict Left-Flush Alignment of Header, Subtext, and Logos Card
          pointer-events-none allows mouse events to pass through directly to the underlying map dots */}
      <div className="relative z-10 max-w-[1256px] mx-auto w-full flex flex-col justify-between flex-1 gap-12 lg:gap-20 pointer-events-none">
        {/* Editorial Content with Decrypt Animation matching Figma node 354:2945 */}
        <div className="w-full pointer-events-auto">
          <TransformingHeading
            as="h2"
            segments={[
              {
                text: "Global Technology.",
                className: "text-[#f5f6f6]",
              },
              {
                text: "\nIndian Defence Capability",
                className: "text-[#f5f6f6]",
              },
              {
                text: ".",
                className: "text-[#e22328] font-bold",
              },
            ]}
            accentDot={false}
            className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-tight lg:leading-[72px]"
          />

          <p className="text-base sm:text-lg lg:text-[18px] text-[#bdc4c8] font-normal leading-[28px] max-w-[1080px] mt-6">
            We bring field-proven defence technologies from across the world to India through strategic global partnerships, combining international expertise with local integration and deployment capabilities.
          </p>
        </div>

        {/* 3. Global Partner Logos Card matching Figma node 354:2952
            Strictly aligned edge-to-edge with the 1256px container column */}
        <div
          className="w-full bg-white/[0.08] backdrop-blur-md p-[10px] sm:p-[12px] rounded-[4px] border border-white/10 shadow-2xl pointer-events-auto"
          data-node-id="354:2952"
        >
          <div
            className="relative w-full aspect-[1944/535] rounded-[2px] overflow-hidden bg-[#fbfbfd]"
            data-node-id="354:2953"
          >
            <Image
              src="/assets/partner-logos.png"
              alt="Rayonix Global Defense and Technology Partners"
              fill
              sizes="(max-width: 1408px) 100vw, 1256px"
              className="object-cover object-left-top"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
