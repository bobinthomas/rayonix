"use client";

import React, { useState, useEffect, useRef } from "react";
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

const MAP_WIDTH = 1408;
const MAP_HEIGHT = 1369;

export default function GlobalPartnershipSection() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<Record<string, { left: number; top: number }>>({});

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const { clientWidth: width, clientHeight: height } = containerRef.current;
      if (width === 0 || height === 0) return;

      // Exact mathematical replication of CSS `object-cover object-top`
      const scale = Math.max(width / MAP_WIDTH, height / MAP_HEIGHT);
      const offsetX = (width - MAP_WIDTH * scale) / 2;
      const offsetY = 0; // object-top aligns to top = 0

      const newCoords: Record<string, { left: number; top: number }> = {};
      countryMarkers.forEach((m) => {
        newCoords[m.id] = {
          left: Math.round((offsetX + m.origX * scale) * 10) / 10,
          top: Math.round((offsetY + m.origY * scale) * 10) / 10,
        };
      });
      setCoords(newCoords);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      observer = new ResizeObserver(updatePositions);
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updatePositions);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[960px] lg:min-h-[1260px] bg-[#080f12] text-[#f5f6f6] pt-[100px] lg:pt-[116px] pb-[60px] px-6 sm:px-12 lg:px-[84px] overflow-hidden flex flex-col justify-between rounded-none"
      aria-label="Global Technology and Indian Defence Capability"
      data-node-id="354:2941"
    >
      {/* 1. Background 3D Sci-Fi World Map — Fills Section Edge-to-Edge with NO Mountain Wireframe */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/assets/figma-node-map.png"
          alt="Rayonix Global Defense Network"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-top opacity-90"
        />

        {/* Interactive Tactical Hotspot Markers dynamically anchored to the edge-to-edge map */}
        <div className="absolute inset-0 pointer-events-auto">
          {countryMarkers.map((marker) => {
            const isHovered = activeMarker === marker.id;
            const pos = coords[marker.id];

            // Fallback before hydration / measurement
            const style = pos
              ? { left: `${pos.left}px`, top: `${pos.top}px` }
              : {
                  left: `${(marker.origX / MAP_WIDTH) * 100}%`,
                  top: `${(marker.origY / MAP_HEIGHT) * 100}%`,
                };

            return (
              <div
                key={marker.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                style={style}
                onMouseEnter={() => setActiveMarker(marker.id)}
                onMouseLeave={() => setActiveMarker(null)}
                onClick={() =>
                  setActiveMarker(isHovered ? null : marker.id)
                }
                role="button"
                tabIndex={0}
                aria-label={`${marker.country}: ${marker.role}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveMarker(isHovered ? null : marker.id);
                  }
                }}
              >
                {/* Outer Sonar / Radar Pulse Animation */}
                <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8">
                  {/* Concentric Ping Ring */}
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      marker.isHQ
                        ? "animate-ping bg-[#e22328]"
                        : "animate-ping bg-[#e22328]/60"
                    }`}
                    style={{
                      animationDuration: marker.isHQ ? "1.8s" : "2.6s",
                    }}
                  />

                  {/* Secondary Subtle Ring */}
                  <span
                    className={`relative inline-flex rounded-full transition-transform duration-300 ${
                      isHovered ? "scale-125" : "scale-100"
                    } ${
                      marker.isHQ
                        ? "w-4 h-4 bg-[#e22328]/30 border border-[#e22328]"
                        : "w-3 h-3 bg-[#e22328]/20 border border-[#e22328]/70"
                    }`}
                  />

                  {/* Core Solid Red Target Dot */}
                  <span
                    className={`absolute rounded-full bg-[#e22328] shadow-[0_0_10px_#e22328] transition-transform duration-200 ${
                      marker.isHQ ? "w-2.5 h-2.5" : "w-2 h-2"
                    } ${isHovered ? "scale-125" : "scale-100"}`}
                  >
                    {/* Inner High-Precision Center White Dot */}
                    <span className="absolute inset-[25%] rounded-full bg-white opacity-90" />
                  </span>
                </div>

                {/* Tactical Military HUD Country Tooltip */}
                <div
                  className={`absolute bottom-full mb-2.5 z-30 transition-all duration-300 ease-out ${
                    marker.align === "left"
                      ? "left-0 translate-x-0"
                      : marker.align === "right"
                      ? "right-0 translate-x-0"
                      : "left-1/2 -translate-x-1/2"
                  } ${
                    isHovered
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 translate-y-1.5 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="relative bg-[#080f12]/95 backdrop-blur-md px-3.5 py-2 rounded-[2px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.85)] min-w-[190px] max-w-[260px] whitespace-normal select-none">
                    {/* Top Corner Hairline Brackets */}
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
                          ? "left-4"
                          : marker.align === "right"
                          ? "right-4"
                          : "left-1/2 -translate-x-1/2"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Content Container: Strict Left-Flush Alignment of Header, Subtext, and Logos Card */}
      <div className="relative z-10 max-w-[1256px] mx-auto w-full flex flex-col justify-between flex-1 gap-12 lg:gap-20">
        {/* Editorial Content with Decrypt Animation matching Figma node 354:2945 */}
        <div className="w-full">
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
          className="w-full bg-white/[0.08] backdrop-blur-md p-[10px] sm:p-[12px] rounded-[4px] border border-white/10 shadow-2xl"
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
