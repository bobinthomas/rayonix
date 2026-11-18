"use client";

import React, { useState } from "react";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";

interface TabItem {
  id: string;
  label: string;
  title: string;
  description: string;
  diagram: React.ReactNode;
}

export default function GprCapabilities() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: TabItem[] = [
    {
      id: "transmission",
      label: "Electromagnetic Signal Transmission",
      title: "Electromagnetic Signal Transmission",
      description:
        "Transmits electromagnetic pulses into the ground to investigate subsurface layers and objects.",
      diagram: (
        <div className="relative w-[168px] h-[168px] flex items-center justify-center">
          <div className="relative w-[140px] h-[140px]">
            <Image
              src="/assets/gpr/antenna.svg"
              alt="Antenna"
              width={20}
              height={24}
              className="absolute left-1/2 -translate-x-1/2 top-4"
            />
            <Image
              src="/assets/gpr/ground.svg"
              alt="Ground surface"
              width={128}
              height={2}
              className="absolute left-1/2 -translate-x-1/2 top-[58px]"
            />
            <Image
              src="/assets/gpr/transmitted-pulses.svg"
              alt="Transmitted pulses"
              width={108}
              height={54}
              className="absolute left-1/2 -translate-x-1/2 top-[66px]"
            />
          </div>
        </div>
      ),
    },
    {
      id: "reflection",
      label: "Subsurface Reflection Detection",
      title: "Subsurface Reflection Detection",
      description:
        "Captures reflected signals from underground structures and materials with differing electrical properties.",
      diagram: (
        <div className="relative w-[168px] h-[168px] flex items-center justify-center">
          <div className="relative w-[140px] h-[140px]">
            <Image
              src="/assets/gpr/ground-surface.svg"
              alt="Ground surface"
              width={124}
              height={2}
              className="absolute left-1/2 -translate-x-1/2 top-12"
            />
            <Image
              src="/assets/gpr/incident-signal.svg"
              alt="Incident signal"
              width={38}
              height={38}
              className="absolute left-[38px] top-6"
            />
            <Image
              src="/assets/gpr/reflected-signal.svg"
              alt="Reflected signal"
              width={38}
              height={38}
              className="absolute right-[36px] top-6"
            />
            <Image
              src="/assets/gpr/geological-interface.svg"
              alt="Geological interface"
              width={124}
              height={14}
              className="absolute left-1/2 -translate-x-1/2 bottom-8"
            />
          </div>
        </div>
      ),
    },
    {
      id: "detection",
      label: "Underground Object Detection",
      title: "Underground Object Detection",
      description:
        "Identifies buried utilities, pipes, storage tanks and other subsurface objects.",
      diagram: (
        <div className="relative w-[168px] h-[168px] flex items-center justify-center">
          <div className="relative w-[140px] h-[140px]">
            <Image
              src="/assets/gpr/scanning-pulse.svg"
              alt="Scanning pulse"
              width={38}
              height={20}
              className="absolute left-1/2 -translate-x-1/2 top-6"
            />
            <Image
              src="/assets/gpr/ground-surface1.svg"
              alt="Ground boundary"
              width={120}
              height={2}
              className="absolute left-1/2 -translate-x-1/2 top-[56px]"
            />
            <Image
              src="/assets/gpr/targeting-reticle.svg"
              alt="Targeting reticle"
              width={70}
              height={70}
              className="absolute left-1/2 -translate-x-1/2 bottom-4"
            />
            <Image
              src="/assets/gpr/buried-pipe.svg"
              alt="Buried pipe"
              width={34}
              height={34}
              className="absolute left-1/2 -translate-x-1/2 bottom-[34px]"
            />
          </div>
        </div>
      ),
    },
    {
      id: "depth",
      label: "Depth & Resolution Analysis",
      title: "Depth & Resolution Analysis",
      description:
        "Supports depth investigation and target identification through selectable antenna frequencies.",
      diagram: (
        <div className="relative w-[168px] h-[168px] flex items-center justify-center">
          <div className="relative w-[140px] h-[140px]">
            <Image
              src="/assets/gpr/resolution-waveform.svg"
              alt="Resolution waveform"
              width={44}
              height={18}
              className="absolute right-6 top-6"
            />
            <Image
              src="/assets/gpr/depth-dimension.svg"
              alt="Depth dimension indicator"
              width={14}
              height={66}
              className="absolute left-6 top-[52px]"
            />
            <Image
              src="/assets/gpr/subsurface-layers.svg"
              alt="Subsurface strata layers"
              width={94}
              height={66}
              className="absolute right-5 top-[52px]"
            />
          </div>
        </div>
      ),
    },
    {
      id: "imaging",
      label: "Subsurface Imaging",
      title: "Subsurface Imaging",
      description:
        "Processes reflected signals into radargrams for visualisation and interpretation of underground structures.",
      diagram: (
        <div className="relative w-[168px] h-[168px] flex items-center justify-center">
          <div className="relative w-[140px] h-[140px]">
            <Image
              src="/assets/gpr/monitor.svg"
              alt="Radar monitor display"
              width={118}
              height={78}
              className="absolute left-1/2 -translate-x-1/2 top-6"
            />
            <Image
              src="/assets/gpr/radargram.svg"
              alt="Radargram reflection curves"
              width={96}
              height={46}
              className="absolute left-1/2 -translate-x-1/2 top-[44px]"
            />
            <Image
              src="/assets/gpr/stand.svg"
              alt="Monitor stand"
              width={38}
              height={16}
              className="absolute left-1/2 -translate-x-1/2 bottom-5"
            />
          </div>
        </div>
      ),
    },
    {
      id: "surveying",
      label: "Multi-Platform Surveying",
      title: "Multi-Platform Surveying",
      description:
        "Supports ground-based, borehole and drone-mounted surveys across different environments.",
      diagram: (
        <div className="relative w-[168px] h-[168px] flex items-center justify-center">
          <div className="relative w-[140px] h-[140px]">
            <Image
              src="/assets/gpr/drone.svg"
              alt="Airborne GPR Drone"
              width={78}
              height={30}
              className="absolute left-1/2 -translate-x-1/2 top-4"
            />
            <Image
              src="/assets/gpr/ground-surface2.svg"
              alt="Ground surface"
              width={124}
              height={2}
              className="absolute left-1/2 -translate-x-1/2 top-[68px]"
            />
            <Image
              src="/assets/gpr/radar-cart.svg"
              alt="Surface Radar Cart"
              width={42}
              height={34}
              className="absolute left-8 bottom-4"
            />
            <Image
              src="/assets/gpr/borehole-probe.svg"
              alt="Borehole Probe"
              width={16}
              height={40}
              className="absolute right-9 bottom-3"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      className="relative w-full bg-[#f4f5f7] text-[#080f12] px-6 sm:px-12 lg:px-[64px] py-16 lg:py-24"
      aria-label="Advanced Subsurface Detection & Mapping Capabilities"
      data-node-id="527:2340"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16 lg:gap-20">
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-[1200px]" data-node-id="527:2342">
          <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-medium text-[#080f12] leading-tight lg:leading-[56px] tracking-tight">
            Advanced Subsurface Detection & Mapping Capabilities
          </h2>
          <p className="text-lg sm:text-xl lg:text-[24px] font-medium text-[#475569] leading-snug lg:leading-[32px]">
            Enables non-invasive underground investigation through electromagnetic sensing, signal processing and subsurface imaging.
          </p>
        </div>

        {/* 6-Tab Container */}
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
            id={`capability-panel-${tabs[activeTab].id}`}
            role="tabpanel"
            aria-labelledby={`capability-tab-${tabs[activeTab].id}`}
            className="bg-white rounded-[4px] p-6 sm:p-10 lg:p-[48px] border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 min-h-[260px] transition-all duration-300"
          >
            <div className="flex flex-col gap-2 max-w-[850px]">
              <h3 className="text-xl sm:text-2xl lg:text-[24px] font-medium text-[#080f12] leading-[32px]">
                {tabs[activeTab].title}
              </h3>
              <p className="text-base lg:text-[16px] text-[#475569] font-normal leading-[26px]">
                {tabs[activeTab].description}
              </p>
            </div>

            <div className="shrink-0 flex items-center justify-center p-2 bg-[#fafbfc] rounded-[4px] border border-[#f1f5f9]">
              {tabs[activeTab].diagram}
            </div>
          </div>
        </div>

        {/* Documentation and Datasheets Section */}
        <div className="flex flex-col gap-8 pt-4" data-node-id="792:1222">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl sm:text-4xl lg:text-[48px] font-medium text-[#7f8a91] leading-tight lg:leading-[56px] tracking-tight">
              Documentation and datasheets
            </h3>
            <p className="text-sm sm:text-base text-[#475569] font-normal leading-normal">
              Technical specifications, system information and product documentation for the GPR
            </p>
          </div>

          <div className="flex flex-col divide-y divide-[#bdc4c8]/40 border-t border-b border-[#bdc4c8]/40">
            {/* Item 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5">
              <div className="flex flex-col">
                <span className="text-base lg:text-[16px] font-medium text-[#080f12] leading-[26px]">
                  GPR Platform Brochure.
                </span>
                <span className="text-xs lg:text-[12px] text-[#7f8a91] leading-[18px]">
                  Overview, capability summary, deployment scenarios
                </span>
              </div>
              <div>
                <CTAButton
                  href="/downloads/gpr-platform-brochure.pdf"
                  variant="secondary"
                >
                  Download Brochure
                </CTAButton>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5">
              <div className="flex flex-col">
                <span className="text-base lg:text-[16px] font-medium text-[#080f12] leading-[26px]">
                  GPR Technical Specifications
                </span>
                <span className="text-xs lg:text-[12px] text-[#7f8a91] leading-[18px]">
                  Full datasheet: UAV, payload, mission software
                </span>
              </div>
              <div>
                <CTAButton
                  href="/downloads/gpr-technical-specifications.pdf"
                  variant="secondary"
                >
                  Download Brochure
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
