"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import type { DiagramLayer, ProductPageContent } from "@/content/products/types";

interface ProductCapabilitiesProps {
  capabilities: ProductPageContent["capabilities"];
  repository?: ProductPageContent["repository"];
}

function layerStyle(layer: DiagramLayer): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (layer.top !== undefined) style.top = layer.top;
  if (layer.bottom !== undefined) style.bottom = layer.bottom;
  if (layer.right !== undefined) style.right = layer.right;
  if (layer.centerX) {
    style.left = "50%";
    style.transform = "translateX(-50%)";
  } else if (layer.left !== undefined) {
    style.left = layer.left;
  }
  return style;
}

function Diagram({ layers }: { layers: DiagramLayer[] }) {
  return (
    <div className="relative w-[168px] h-[168px] flex items-center justify-center">
      <div className="relative w-[140px] h-[140px]">
        {layers.map((layer) => (
          <Image
            key={layer.src}
            src={layer.src}
            alt={layer.alt}
            width={layer.width}
            height={layer.height}
            className="absolute"
            style={layerStyle(layer)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductCapabilities({
  capabilities,
  repository,
}: ProductCapabilitiesProps) {
  const { tabs } = capabilities;
  const [activeTab, setActiveTab] = useState<number>(0);

  // Deep links: /page#<tab-id> opens that tab (used by mega menu links).
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      const idx = tabs.findIndex((t) => t.id === id);
      if (idx >= 0) setActiveTab(idx);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [tabs]);

  const active = tabs[activeTab];

  return (
    <section
      className="relative w-full bg-[#f4f5f7] text-[#080f12] py-16 lg:py-24"
      aria-label={capabilities.ariaLabel}
      data-node-id="527:2340"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-16 lg:gap-20">
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-[1200px]" data-node-id="527:2342">
          <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-medium text-[#080f12] leading-tight lg:leading-[56px] tracking-tight">
            {capabilities.heading}
          </h2>
          <p className="text-lg sm:text-xl lg:text-[24px] font-medium text-[#475569] leading-snug lg:leading-[32px]">
            {capabilities.subheading}
          </p>
        </div>

        {/* Tab Container */}
        <div className="flex flex-col w-full" data-node-id="615:3203">
          {/* Horizontal Tab Bar */}
          <div
            className="flex items-center gap-4 sm:gap-8 border-b border-[#bdc4c8] overflow-x-auto no-scrollbar"
            role="tablist"
            aria-label="Capabilities Navigation"
          >
            {tabs.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`capability-panel-${tab.id}`}
                  id={`capability-tab-${tab.id}`}
                  onClick={() => setActiveTab(idx)}
                  className={`pb-[15px] pr-2 text-sm lg:text-[14px] font-medium whitespace-nowrap cursor-pointer transition-all duration-200 outline-none select-none relative ${
                    isActive
                      ? "text-[#080f12] font-semibold"
                      : "text-[#7f8a91] hover:text-[#080f12]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e22328]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Panel */}
          <div
            id={`capability-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`capability-tab-${active.id}`}
            className="bg-white rounded-[4px] p-6 sm:p-10 lg:p-[48px] border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 min-h-[260px] transition-all duration-300"
          >
            <div className="flex flex-col gap-2 max-w-[850px]">
              <h3 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#080f12] leading-[32px]">
                {active.title}
              </h3>
              <p className="text-base lg:text-[16px] text-[#475569] font-normal leading-[26px]">
                {active.description}
              </p>
            </div>

            {active.diagram && active.diagram.length > 0 && (
              <div className="shrink-0 flex items-center justify-center p-2 bg-[#fafbfc] rounded-[4px] border border-[#f1f5f9]">
                <Diagram layers={active.diagram} />
              </div>
            )}
          </div>
        </div>

        {/* Technical Repository Section */}
        {repository && repository.items.length > 0 && (
          <div className="flex flex-col gap-8 pt-4" data-node-id="792:1222">
            <div className="flex flex-col gap-2">
              <h3 className="text-3xl sm:text-4xl lg:text-[48px] font-medium text-[#7f8a91] leading-tight lg:leading-[56px] tracking-tight">
                {repository.heading}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] font-normal leading-normal">
                {repository.description}
              </p>
            </div>

            <div className="flex flex-col divide-y divide-[#bdc4c8]/40 border-t border-b border-[#bdc4c8]/40">
              {repository.items.map((item) => (
                <div
                  key={item.href}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5"
                >
                  <div className="flex flex-col">
                    <span className="text-base lg:text-[16px] font-medium text-[#080f12] leading-[26px]">
                      {item.title}
                    </span>
                    <span className="text-xs lg:text-[12px] text-[#7f8a91] leading-[18px]">
                      {item.subtitle}
                    </span>
                  </div>
                  <div>
                    <CTAButton href={item.href} variant="secondary">
                      {item.ctaLabel}
                    </CTAButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
