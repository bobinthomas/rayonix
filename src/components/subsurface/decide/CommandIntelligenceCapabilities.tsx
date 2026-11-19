"use client";

import React, { useState, useEffect } from "react";
import CTAButton from "@/components/ui/CTAButton";

interface CapabilityTab {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  diagram: React.ReactNode;
}

const capabilities: CapabilityTab[] = [
  {
    id: "data-acquisition",
    num: "01",
    title: "Data Acquisition & Processing",
    tagline: "High-speed multi-channel sensor signal ingestion and conversion",
    description:
      "Collects and processes GPR, seismic, acoustic and hydrophone sensor data into structured information.",
    bullets: [
      "Continuous high-throughput telemetry ingestion across heterogenous subterranean sensor networks.",
      "Adaptive signal conditioning, bandpass filtering, and noise decimation at the tactical edge.",
      "Standardized conversion from raw analogue voltages and seismic pulses into indexed geospatial vectors.",
    ],
    metrics: [
      { label: "Sampling Rate", value: "Up to 50 kHz" },
      { label: "Sensor Channels", value: "64+ Concurrent" },
      { label: "Stream Format", value: "Zero-Loss Binary" },
    ],
    diagram: (
      <div className="relative w-full h-[240px] sm:h-[280px] bg-[#080f12] rounded-[6px] border border-[#253035] p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#7f8a91]">
          <span>SIGNAL INGESTION MATRIX</span>
          <span className="text-[#e22328]">STATUS: STREAMING</span>
        </div>
        {/* Signal Stream Flow Visualization */}
        <div className="grid grid-cols-4 gap-2 my-auto">
          {[
            { name: "GPR Waveforms", freq: "600 MHz", color: "#e22328" },
            { name: "Seismic Pulses", freq: "15-120 Hz", color: "#bdc4c8" },
            { name: "DAS Acoustic", freq: "0.1-5 kHz", color: "#7f8a91" },
            { name: "Hydrophone", freq: "10-25 kHz", color: "#f5f6f6" },
          ].map((stream) => (
            <div
              key={stream.name}
              className="bg-[#10181c] p-2.5 rounded border border-[#253035] flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#7f8a91]">
                  {stream.freq}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: stream.color }}
                />
              </div>
              <div className="h-7 w-full flex items-end gap-0.5">
                {[40, 75, 55, 90, 60, 85, 45, 100].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 bg-white/20 rounded-t-[1px]"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i % 2 === 0 ? stream.color : undefined,
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium text-[#f5f6f6] truncate">
                {stream.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] text-[#7f8a91] border-t border-white/5 pt-2">
          <span>PACKET PROTOCOL: MIL-STD-1553 / ETHERNET</span>
          <span className="text-white/60">BANDWIDTH: 1.2 GB/S</span>
        </div>
      </div>
    ),
  },
  {
    id: "ai-analytics",
    num: "02",
    title: "AI Analytics & Classification",
    tagline: "Neural network subterranean threat signature verification",
    description:
      "Identifies anomalies, recognises signal patterns and classifies detected activities.",
    bullets: [
      "Deep convolutional networks trained on military subsurface acoustic and seismic waveform banks.",
      "Real-time disambiguation between background geological seismic noise and tactical excavation/intrusion.",
      "Automatic confidence scoring with false-alarm suppression under complex environmental conditions.",
    ],
    metrics: [
      { label: "Classification Confidence", value: "99.4%" },
      { label: "False Alarm Rate", value: "< 0.02%" },
      { label: "Inference Time", value: "14ms Edge" },
    ],
    diagram: (
      <div className="relative w-full h-[240px] sm:h-[280px] bg-[#080f12] rounded-[6px] border border-[#253035] p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#7f8a91]">
          <span>NEURAL CLASSIFIER / MODEL: SUB-NN-V4</span>
          <span className="text-[#e22328]">CONFIDENCE: 99.4%</span>
        </div>
        {/* Neural Classification Breakdown */}
        <div className="space-y-2.5 my-auto">
          {[
            {
              type: "Subterranean Boring / Tunneling",
              prob: 99.4,
              color: "#e22328",
            },
            {
              type: "Heavy Vehicular Transit",
              prob: 12.1,
              color: "#7f8a91",
            },
            {
              type: "Ambient Seismic Reflection",
              prob: 2.8,
              color: "#253035",
            },
          ].map((cls) => (
            <div key={cls.type} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f5f6f6]">{cls.type}</span>
                <span style={{ color: cls.color }}>{cls.prob}%</span>
              </div>
              <div className="w-full h-2 bg-[#10181c] rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${cls.prob}%`,
                    backgroundColor: cls.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] text-[#7f8a91] border-t border-white/5 pt-2">
          <span>SIGNATURE MATCH: CLANDESTINE SHAFT</span>
          <span className="text-[#e22328] font-bold">CRITICAL THREAT</span>
        </div>
      </div>
    ),
  },
  {
    id: "multi-sensor-fusion",
    num: "03",
    title: "Multi-Sensor Fusion",
    tagline: "Unified spatial correlation of acoustic, seismic, and radar telemetry",
    description:
      "Correlates data from multiple sensors to create a unified intelligence picture.",
    bullets: [
      "Bayesian state estimation and Kalman filtering across GPR, DAS acoustic cables, and geophone arrays.",
      "Eliminates blind spots by cross-verifying electromagnetic reflections against micro-vibration vectors.",
      "Synthesizes disparate sensor inputs into a single geospatial Common Operating Picture (COP).",
    ],
    metrics: [
      { label: "Correlated Modalities", value: "4 Distinct" },
      { label: "Spatial Resolution", value: "± 0.25 m" },
      { label: "Blind-Spot Decimation", value: "100%" },
    ],
    diagram: (
      <div className="relative w-full h-[240px] sm:h-[280px] bg-[#080f12] rounded-[6px] border border-[#253035] p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#7f8a91]">
          <span>SPATIAL FUSION MATRIX</span>
          <span className="text-[#bdc4c8]">CORRELATION: OPTIMAL</span>
        </div>
        {/* Visual Sensor Overlay Radar */}
        <div className="relative h-32 w-full flex items-center justify-center">
          <div className="relative w-28 h-28 rounded-full border border-white/10 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border border-dashed border-[#e22328]/30 animate-spin"
              style={{ animationDuration: "12s" }}
            />
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#e22328] shadow-[0_0_12px_#e22328]" />
            </div>
            {/* Nodes */}
            <span className="absolute top-1 left-2 font-mono text-[9px] text-[#bdc4c8]">
              GPR
            </span>
            <span className="absolute bottom-1 right-2 font-mono text-[9px] text-[#7f8a91]">
              DAS
            </span>
            <span className="absolute top-1 right-2 font-mono text-[9px] text-[#e22328]">
              SEISMIC
            </span>
            <span className="absolute bottom-1 left-2 font-mono text-[9px] text-[#bdc4c8]">
              HYDRO
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] text-[#7f8a91] border-t border-white/5 pt-2">
          <span>FUSED PICTURE: 3D COMMON OPERATING PICTURE</span>
          <span className="text-[#f5f6f6]">SYNC: &lt; 5MS</span>
        </div>
      </div>
    ),
  },
  {
    id: "localisation-tracking",
    num: "04",
    title: "Localisation & Tracking",
    tagline: "Subterranean 3D vector coordinates and dynamic trajectory estimation",
    description:
      "Determines the location of detected activities and monitors movement patterns.",
    bullets: [
      "Pinpoints underground coordinates in three axes (Latitude, Longitude, and Subterranean Depth).",
      "Tracks trajectory and velocity vectors of underground human movement, heavy vehicles, or excavation bits.",
      "Predicts breach destination points and ETA using velocity trend projection models.",
    ],
    metrics: [
      { label: "Depth Calculation", value: "Up to 30m" },
      { label: "Vector Refresh", value: "10 Hz Dynamic" },
      { label: "Trajectory Drift", value: "< 1.5%" },
    ],
    diagram: (
      <div className="relative w-full h-[240px] sm:h-[280px] bg-[#080f12] rounded-[6px] border border-[#253035] p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#7f8a91]">
          <span>3D LOCALISATION TRACKER</span>
          <span className="text-[#e22328]">ACTIVE LOCK</span>
        </div>
        {/* 3D Depth & Coordinates Display */}
        <div className="bg-[#10181c] p-3 rounded border border-white/10 flex flex-col gap-2 my-auto">
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="bg-[#080f12] p-2 rounded border border-white/5">
              <span className="text-[10px] text-[#7f8a91] block">LATITUDE</span>
              <span className="text-sm font-bold text-[#f5f6f6]">
                32° 44&apos; 12&quot; N
              </span>
            </div>
            <div className="bg-[#080f12] p-2 rounded border border-white/5">
              <span className="text-[10px] text-[#7f8a91] block">LONGITUDE</span>
              <span className="text-sm font-bold text-[#f5f6f6]">
                74° 51&apos; 08&quot; E
              </span>
            </div>
            <div className="bg-[#080f12] p-2 rounded border border-[#e22328]/30">
              <span className="text-[10px] text-[#e22328] block">DEPTH (Z)</span>
              <span className="text-sm font-bold text-[#e22328]">- 8.4 M</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-mono px-1">
            <span className="text-[#bdc4c8]">HEADING: 142° SE</span>
            <span className="text-[#bdc4c8]">VELOCITY: 0.85 M/MIN</span>
          </div>
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] text-[#7f8a91] border-t border-white/5 pt-2">
          <span>PREDICTED BREACH POINT: GRID 04-B</span>
          <span className="text-white/60">ETA: 42 MIN</span>
        </div>
      </div>
    ),
  },
  {
    id: "threat-assessment",
    num: "05",
    title: "Threat Assessment & Decision Support",
    tagline:
      "Automated risk scoring, rule-based escalation, and response prioritization",
    description:
      "Evaluates potential threats, prioritises incidents and supports informed decisions.",
    bullets: [
      "Calculates threat severity indices combining location criticality, velocity, and signature lethality.",
      "Automatically prioritizes incidents into triage queues (Priority 1 Critical to Routine Monitoring).",
      "Generates actionable tactical decision checklists for command post duty officers.",
    ],
    metrics: [
      { label: "Threat Escalation", value: "Autonomous" },
      { label: "Decision Latency", value: "< 2 Seconds" },
      { label: "Rule Engine", value: "Doctrine-Aligned" },
    ],
    diagram: (
      <div className="relative w-full h-[240px] sm:h-[280px] bg-[#080f12] rounded-[6px] border border-[#253035] p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#7f8a91]">
          <span>THREAT ESCALATION MATRIX</span>
          <span className="text-[#e22328]">LEVEL: P1 HIGH</span>
        </div>
        {/* Threat Priority Levels */}
        <div className="grid grid-cols-4 gap-2 my-auto font-mono text-center">
          {[
            { code: "P1", name: "BREACH", status: "CRITICAL", active: true },
            { code: "P2", name: "APPROACH", status: "HIGH", active: false },
            { code: "P3", name: "ANOMALY", status: "EVAL", active: false },
            { code: "P4", name: "SEISMIC", status: "NORMAL", active: false },
          ].map((p) => (
            <div
              key={p.code}
              className={`p-2.5 rounded border flex flex-col gap-1 ${
                p.active
                  ? "bg-[#e22328]/15 border-[#e22328] text-[#f5f6f6]"
                  : "bg-[#10181c] border-white/5 text-[#7f8a91]"
              }`}
            >
              <span
                className={`text-lg font-bold ${
                  p.active ? "text-[#e22328]" : ""
                }`}
              >
                {p.code}
              </span>
              <span className="text-[10px] tracking-wider">{p.name}</span>
              <span className="text-[9px] opacity-70">{p.status}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] text-[#7f8a91] border-t border-white/5 pt-2">
          <span>RULE TRIGGERED: PERIMETER BUFFER BREACH</span>
          <span className="text-[#e22328] font-bold">ACTION: DISPATCH QRF</span>
        </div>
      </div>
    ),
  },
  {
    id: "command-control",
    num: "06",
    title: "Command & Control",
    tagline:
      "Centralised monitoring, geospatial visualisation and coordinated incident management",
    description:
      "Enables centralised monitoring, geospatial visualisation and coordinated incident management through an integrated C3I platform.",
    bullets: [
      "Unified multi-tiered C3I operations console designed for battalion, brigade, and command headquarters.",
      "Geospatial map overlays linking subsurface telemetry with UAV aerial reconnaissance and surface sentries.",
      "Encrypted tactical radio/data dispatch to Quick Reaction Teams (QRF) with real-time target handoff.",
    ],
    metrics: [
      { label: "Console Interfaces", value: "C3I Multi-Role" },
      { label: "Dispatched Nodes", value: "Real-Time Mesh" },
      { label: "Encryption", value: "Type-1 / AES-256" },
    ],
    diagram: (
      <div className="relative w-full h-[240px] sm:h-[280px] bg-[#080f12] rounded-[6px] border border-[#253035] p-5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#7f8a91]">
          <span>C3I TACTICAL OPERATIONS CONSOLE</span>
          <span className="text-[#e22328]">MESH: LINKED</span>
        </div>
        {/* Command & Control Grid */}
        <div className="grid grid-cols-3 gap-2 my-auto">
          <div className="bg-[#10181c] p-2.5 rounded border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] font-mono text-[#7f8a91]">
              SUBSURFACE
            </span>
            <span className="text-xs font-bold text-[#f5f6f6]">
              4 SENSOR ARRAYS
            </span>
            <span className="text-[10px] font-mono text-[#e22328]">
              1 ACTIVE THREAT
            </span>
          </div>
          <div className="bg-[#10181c] p-2.5 rounded border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] font-mono text-[#7f8a91]">
              AERIAL DOMAIN
            </span>
            <span className="text-xs font-bold text-[#f5f6f6]">
              2 UAVS ON PATROL
            </span>
            <span className="text-[10px] font-mono text-[#bdc4c8]">
              OVERWATCH SYNC
            </span>
          </div>
          <div className="bg-[#10181c] p-2.5 rounded border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] font-mono text-[#7f8a91]">
              TACTICAL RESPONSE
            </span>
            <span className="text-xs font-bold text-[#f5f6f6]">
              QRF UNIT 02
            </span>
            <span className="text-[10px] font-mono text-[#e22328]">
              EN ROUTE (ETA 4M)
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] text-[#7f8a91] border-t border-white/5 pt-2">
          <span>NETWORK: TACTICAL SATCOM + C4I FIBRE</span>
          <span className="text-[#f5f6f6]">STATUS: SECURE MESH</span>
        </div>
      </div>
    ),
  },
];

export default function CommandIntelligenceCapabilities() {
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const foundIndex = capabilities.findIndex((c) => c.id === hash);
        if (foundIndex !== -1) {
          setActiveTab(foundIndex);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const current = capabilities[activeTab];

  return (
    <section
      id="capabilities"
      className="relative w-full bg-[#10181c] border-t border-[#253035] text-[#f5f6f6] py-16 lg:py-24"
      aria-label="Command & Intelligence Capabilities"
    >
      <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-8 flex flex-col gap-12 lg:gap-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="flex flex-col gap-3 max-w-[800px]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#e22328]">
              OPERATIONAL CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-bold text-[#f5f6f6] leading-tight lg:leading-[56px] tracking-tight">
              Command &amp; Intelligence Capabilities
            </h2>
            <p className="text-sm sm:text-base text-[#bdc4c8] font-normal leading-[26px]">
              End-to-end subterranean intelligence architecture from raw signal
              telemetry to coordinated tactical command across six core
              capabilities.
            </p>
          </div>

          <div>
            <CTAButton
              href="mailto:info@rayonix.in?subject=Subsurface%20Command%20and%20Intelligence%20Inquiry"
              variant="primary"
            >
              Discuss Requirement
            </CTAButton>
          </div>
        </div>

        {/* 6 Capability Tabs Navigation Bar */}
        <div className="w-full overflow-x-auto no-scrollbar scrollbar-none pb-2">
          <div
            role="tablist"
            className="flex items-center gap-2 border-b border-[#253035] min-w-max pb-px"
          >
            {capabilities.map((tab, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(index)}
                  className={`relative px-4 py-3 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 outline-none select-none ${
                    isActive
                      ? "text-white border-b-2 border-[#e22328] bg-white/[0.04]"
                      : "text-[#7f8a91] hover:text-[#bdc4c8] hover:bg-white/[0.02]"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] ${
                      isActive ? "text-[#e22328]" : "text-[#7f8a91]"
                    }`}
                  >
                    {tab.num}
                  </span>
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Capability Details Panel */}
        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#080f12] p-6 sm:p-8 lg:p-10 rounded-[6px] border border-[#253035]"
        >
          {/* Left Column: Description & Specifications */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e22328]">
                <span>CAPABILITY {current.num}</span>
                <span className="text-white/20">/</span>
                <span className="text-[#bdc4c8] uppercase">
                  {current.tagline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f6f6] tracking-tight leading-snug">
                {current.title}
              </h3>

              <p className="text-base sm:text-lg text-[#bdc4c8] leading-relaxed">
                {current.description}
              </p>

              {/* Bullet Features */}
              <ul className="space-y-3 pt-2">
                {current.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[#bdc4c8] leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e22328] mt-2 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capability Metrics Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#253035]">
              {current.metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-mono text-[#7f8a91] uppercase">
                    {m.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#f5f6f6]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Custom Tactical Visualization Diagram */}
          <div className="lg:col-span-5 flex items-center justify-center">
            {current.diagram}
          </div>
        </div>
      </div>
    </section>
  );
}
