"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { megaMenuData, type MegaMenuTab } from "@/content/mega-menu";

export { megaMenuData };
export type { MegaMenuTab };

// Straight Red Arrow matching Sigmoid vector asset
function StraightArrow({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 w-6 h-6 transition-all duration-300 ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.206 4.99391C20.762 4.56491 20.063 4.56491 19.619 4.99391C19.19 5.43791 19.19 6.15291 19.619 6.58091L27.666 14.6279H1.111C0.492 14.6279 0 15.1199 0 15.7389C0 16.3579 0.492 16.8659 1.111 16.8659H27.666L19.619 24.8969C19.19 25.3409 19.19 26.0399 19.619 26.4839C20.063 26.9129 20.762 26.9129 21.206 26.4839L31.158 16.5319C31.587 16.1029 31.587 15.3889 31.158 14.9449L21.206 4.99391Z"
          fill="#E22328"
        />
      </svg>
    </span>
  );
}

interface MegaMenuProps {
  activeTab: MegaMenuTab;
  onClose: () => void;
}

export default function MegaMenu({ activeTab, onClose }: MegaMenuProps) {
  const content = megaMenuData[activeTab];

  // Per-tab active mode tracking: zero delay, synchronous frame-1 resolution
  const [activeModes, setActiveModes] = useState<Record<MegaMenuTab, string>>({
    subsurface: "detect",
    surface: "detect",
    aerial: "detect",
    solutions: "defence",
    company: "about",
  });

  const currentModeId = activeModes[activeTab] || content.modes[0]?.id || "detect";
  const currentMode =
    content.modes.find((m) => m.id === currentModeId) || content.modes[0];

  const handleModeChange = (modeId: string) => {
    setActiveModes((prev) => ({
      ...prev,
      [activeTab]: modeId,
    }));
  };

  return (
    <div
      id="rayonix-mega-menu-panel"
      role="region"
      aria-label={`${content.title} navigation panel`}
      className="w-full bg-[#10181c] text-[#f5f6f6] rounded-none border-b border-x border-[#253035] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden"
      data-testid="rayonix-mega-menu"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-7 sm:py-8">
        {/* Main Content Grid: Fixed vertical envelope (min-h-[380px]) so height never jumps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch min-h-[380px]">
          
          {/* Left / Middle Section (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Mode / Category Selector Bar */}
            <div className="flex items-center gap-2 sm:gap-2.5 border-b border-[#253035] pb-3 mb-5 overflow-x-auto scrollbar-none" role="tablist" aria-label="Operational modes">
              {content.modes.map((mode) => {
                const isActive = mode.id === currentMode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-pressed={isActive}
                    onFocus={() => handleModeChange(mode.id)}
                    onMouseEnter={() => handleModeChange(mode.id)}
                    onClick={() => handleModeChange(mode.id)}
                    className={`relative px-3.5 py-1.5 type-small font-medium transition-colors duration-200 rounded-[2px] flex items-center gap-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] ${
                      isActive
                        ? "bg-[#e22328] text-white shadow-sm"
                        : "text-[#9ca8ae] hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{mode.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1 py-0.2 rounded-[2px] transition-colors ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#1f2b31] text-[#7f8e95]"
                      }`}
                    >
                      {mode.items.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 2-Column Grid of Interactive Mega Links with smooth cross-dissolve & fixed envelope */}
            <div className="min-h-[230px] flex items-start">
              <div
                key={`${activeTab}-${currentMode.id}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1.5 w-full transition-all duration-300 ease-out anim-fade-up"
              >
                {currentMode.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    prefetch={false}
                    onClick={onClose}
                    className="group flex items-center justify-between p-3 rounded-[4px] transition-all duration-200 hover:bg-white/[0.04] border border-transparent hover:border-[#253035]/60 outline-none focus-visible:ring-1 focus-visible:ring-[#e22328]"
                  >
                    <div className="pr-3">
                      <h4 className="type-small font-medium text-[#f5f6f6] group-hover:text-[#e22328] transition-colors ">
                        {item.title}
                      </h4>
                      <p className="type-caption text-[#8e9ca2] mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    {/* Straight Red Arrow sliding in smoothly on hover */}
                    <div className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <StraightArrow />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Quick Bar */}
            <div
              key={activeTab}
              className="pt-4 mt-3 border-t border-[#253035] flex items-center justify-between type-caption text-[#7f8e95] anim-fade-in"
            >
              <span className="truncate pr-4">{content.subtitle}</span>
            </div>
          </div>

          {/* Right Column (4 cols): Spotlight Card with smooth cross-fade */}
          <div className="lg:col-span-4 flex flex-col">
            <Link
              key={activeTab}
              href={content.spotlight.href}
              onClick={onClose}
              prefetch={false}
              className="h-full bg-[#162025] border border-[#253035] rounded-[4px] p-5 sm:p-6 flex flex-col justify-between group hover:border-[#e22328]/40 transition-all duration-300 shadow-md anim-fade-in cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#e22328]"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="type-eyebrow text-[#e22328]">
                    {content.spotlight.tag}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e22328] animate-pulse" />
                </div>

                {/* Card Thumbnail */}
                <div className="relative w-full h-[140px] sm:h-[150px] rounded-[4px] overflow-hidden mb-3.5 bg-black/40 border border-[#253035]/60">
                  <Image
                    src={content.spotlight.image}
                    alt={content.spotlight.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Title & Description */}
                <h3 className="type-body font-medium text-[#f5f6f6] group-hover:text-[#e22328] transition-colors">
                  {content.spotlight.title}
                </h3>
                <p className="type-small text-[#8e9ca2] mt-1.5">
                  {content.spotlight.description}
                </p>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
