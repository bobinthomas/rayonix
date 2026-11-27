"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import PillTab from "@/components/ui/PillTab";
import type { DiagramLayer, ProductPageContent } from "@/content/products/types";

interface ProductCapabilitiesProps {
  capabilities: NonNullable<ProductPageContent["capabilities"]>;
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
  // Desktop: one active tab. Mobile: accordion, any number open (first open by default).
  const [activeTab, setActiveTab] = useState<number>(0);
  // Auto-advance (matches Home ecosystem tabs) pauses while the tab area is hovered or focused.
  const [isPaused, setIsPaused] = useState(false);
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set([tabs[0]?.id]));

  const toggleItem = (id: string) =>
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Deep links: /page#<tab-id> opens that tab / accordion item (used by mega menu links).
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      const idx = tabs.findIndex((t) => t.id === id);
      if (idx >= 0) {
        setActiveTab(idx);
        setOpenItems((prev) => new Set(prev).add(id));
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
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
          <h2 className="type-h2 text-[#080f12] ">
            {capabilities.heading}
          </h2>
          {capabilities.subheading && (
            <p className="type-h3 text-[#475569] ">
              {capabilities.subheading}
            </p>
          )}
        </div>

        {/* Anchor targets for deep links from mega menu (/subsurface/decide#<id>) */}
        <div className="relative w-full h-0 pointer-events-none" aria-hidden="true">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={tab.id}
              className="scroll-mt-28 h-0 w-0"
            />
          ))}
        </div>

        {/* Mobile (< md): accordion, so every capability title is visible */}
        <div className="md:hidden flex flex-col gap-3 w-full">
          {tabs.map((tab) => {
            const isOpen = openItems.has(tab.id);
            return (
              <div
                key={tab.id}
                id={`capability-item-${tab.id}`}
                className={`bg-white rounded-[4px] border shadow-sm transition-colors duration-300 ${
                  isOpen ? "border-[#bdc4c8]" : "border-[#e2e8f0]"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`capability-accordion-${tab.id}`}
                    onClick={() => toggleItem(tab.id)}
                    className="w-full min-h-[56px] flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] rounded-[4px]"
                  >
                    <span className="type-body-lg font-medium text-[#080f12] ">
                      {tab.title}
                    </span>
                    <span
                      className={`relative shrink-0 w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <span className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#e22328]" />
                      <span className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#e22328]" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`capability-accordion-${tab.id}`}
                  role="region"
                  aria-label={tab.title}
                  hidden={!isOpen}
                  className={`px-5 pb-5 flex-col gap-5 ${isOpen ? "flex" : "hidden"}`}
                >
                  <p className="type-body text-[#475569] ">
                    {tab.description}
                  </p>
                  {tab.diagram && tab.diagram.length > 0 && (
                    <div className="self-center flex items-center justify-center p-2 bg-[#fafbfc] rounded-[4px] border border-[#f1f5f9]">
                      <Diagram layers={tab.diagram} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop (md+): Tab Container */}
        <div
          className="hidden md:flex flex-col gap-6 w-full"
          data-node-id="615:3203"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {/* Horizontal Tab Bar — same pill tabs as Home "One Connected Defense Ecosystem" */}
          <div
            className="flex flex-wrap items-center gap-[6px] sm:gap-[8px] pb-1"
            role="tablist"
            aria-label="Capabilities Navigation"
          >
            {tabs.map((tab, idx) => (
              <PillTab
                key={tab.id}
                active={activeTab === idx}
                paused={isPaused}
                aria-controls={`capability-panel-${tab.id}`}
                id={`capability-tab-${tab.id}`}
                onClick={() => setActiveTab(idx)}
                onProgressEnd={() => setActiveTab((prev) => (prev + 1) % tabs.length)}
              >
                {tab.label}
              </PillTab>
            ))}
          </div>

          {/* Active Tab Content Panel */}
          <div
            id={`capability-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`capability-tab-${active.id}`}
            className="bg-white rounded-[4px] p-6 sm:p-10 lg:p-[48px] border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 min-h-[260px] transition-all duration-300"
          >
            <div className="flex flex-col gap-2 max-w-[850px]">
              <h3 className="type-h3 text-[#080f12] ">
                {active.title}
              </h3>
              <p className="type-body text-[#475569] ">
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
              <h3 className="type-h2 text-[#7f8a91] ">
                {repository.heading}
              </h3>
              <p className="type-body text-[#475569] ">
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
                    <span className="type-body font-medium text-[#080f12] ">
                      {item.title}
                    </span>
                    <span className="type-caption text-[#7f8a91] ">
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
