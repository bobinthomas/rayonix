"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type MegaMenuTab = "subsurface" | "surface" | "aerial" | "solutions" | "company";

export interface MegaMenuItem {
  title: string;
  description: string;
  href: string;
}

export interface OperationalMode {
  id: string;
  label: string;
  items: MegaMenuItem[];
}

export interface SpotlightCard {
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface DomainMenuData {
  title: string;
  subtitle: string;
  modes: OperationalMode[];
  spotlight: SpotlightCard;
}

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

// Final Information Architecture matching user's spreadsheet in Rayonix dark styling
export const megaMenuData: Record<MegaMenuTab, DomainMenuData> = {
  subsurface: {
    title: "Subsurface",
    subtitle: "In(visible) subterranean detection, acoustic sensing, and autonomous counter-tunneling",
    modes: [
      {
        id: "detect",
        label: "Detect",
        items: [
          {
            title: "GPR",
            description: "Ground Penetrating Radar for deep dielectric anomaly mapping",
            href: "/subsurface/detect/gpr",
          },
          {
            title: "Fibre Optic DAS",
            description: "Distributed acoustic sensing over extended perimeter corridors",
            href: "/subsurface/detect/das",
          },
          {
            title: "Seismic Sensors",
            description: "Low-frequency ground vibration and footstep detection arrays",
            href: "/subsurface/detect/seismic",
          },
          {
            title: "Hydrophone Sensors",
            description: "Sub-surface littoral and underwater acoustic monitoring",
            href: "/subsurface/detect/hydrophone",
          },
        ],
      },
      {
        id: "decide",
        label: "Decide",
        items: [
          {
            title: "Data Acquisition & Processing",
            description: "High-speed multi-channel sensor signal ingestion",
            href: "/subsurface/decide#data-acquisition",
          },
          {
            title: "AI Analytics and Classification",
            description: "Neural network subterranean threat signature verification",
            href: "/subsurface/decide#ai-analytics",
          },
          {
            title: "Multisensor Fusion",
            description: "Unified spatial correlation of acoustic and seismic telemetry",
            href: "/subsurface/decide#multi-sensor-fusion",
          },
          {
            title: "Localisation & Tracking",
            description: "Sub-surface coordinate mapping and trajectory estimation",
            href: "/subsurface/decide#localisation-tracking",
          },
          {
            title: "Threat Assessment & Decision Support",
            description: "Automated risk scoring and response prioritization",
            href: "/subsurface/decide#threat-assessment",
          },
          {
            title: "Command & Control",
            description: "Direct low-latency telemetry feeds to military C2 consoles",
            href: "/subsurface/decide#command-control",
          },
        ],
      },
      {
        id: "response",
        label: "Response",
        items: [
          {
            title: "Threat Alert and Response Co-ordination",
            description: "Automated alert dispatch and tactical team coordination",
            href: "/subsurface/respond",
          },
        ],
      },
    ],
    spotlight: {
      tag: "SUBTERRANEAN DEFENCE",
      title: "Subsurface Threat Matrix: Eliminating Underground Blind Spots",
      description: "Distributed acoustic sensing and seismic analytics safeguarding sovereign perimeter corridors.",
      image: "/assets/ecosystem-1.webp",
      href: "/subsurface/detect/gpr",
    },
  },

  surface: {
    title: "Surface",
    subtitle: "Precision optical surveillance, unattended ground sensors, and autonomous patrol units",
    modes: [
      {
        id: "detect",
        label: "Detect",
        items: [
          {
            title: "Optical Radar",
            description: "High-resolution optical tracking and spatial radar synchronization",
            href: "/surface/detect/optical-radar",
          },
          {
            title: "Polarimetric Thermal Imaging",
            description: "Thermal visibility through dense smoke, fog, and foliage",
            href: "/surface/detect/polarimetric",
          },
          {
            title: "3D LiDAR",
            description: "High-density point cloud spatial perimeter mapping",
            href: "/surface/detect/lidar",
          },
          {
            title: "Vibration Sensors",
            description: "Unattended ground sensors for covert border perimeter breaches",
            href: "/surface/detect/vibration",
          },
          {
            title: "E-Fence",
            description: "Virtual tripwires with neural-network false alarm filtering",
            href: "/surface/detect/efence",
          },
          {
            title: "3D Terrain Mapping",
            description: "Volumetric terrain modeling and topographical surface scans",
            href: "/surface/detect/terrain-mapping",
          },
        ],
      },
      {
        id: "decide",
        label: "Decide",
        items: [
          {
            title: "Data Acquisition & Processing",
            description: "Collects and processes GPR, seismic, acoustic and hydrophone sensor data into structured information.",
            href: "/surface/decide#data-acquisition",
          },
          {
            title: "AI Analytics & Classification",
            description: "Identifies anomalies, recognises signal patterns and classifies detected activities.",
            href: "/surface/decide#ai-analytics",
          },
          {
            title: "Multi-Sensor Fusion",
            description: "Correlates data from multiple sensors to create a unified intelligence picture.",
            href: "/surface/decide#multi-sensor-fusion",
          },
          {
            title: "Localisation & Tracking",
            description: "Determines the location of detected activities and monitors movement patterns.",
            href: "/surface/decide#localisation-tracking",
          },
          {
            title: "Threat Assessment & Decision Support",
            description: "Evaluates potential threats, prioritises incidents and supports informed decisions.",
            href: "/surface/decide#threat-assessment",
          },
          {
            title: "Command & Control",
            description: "Enables centralised monitoring, geospatial visualisation and coordinated incident management through an integrated C3I platform.",
            href: "/surface/decide#command-control",
          },
        ],
      },
      {
        id: "respond",
        label: "Respond",
        items: [
          {
            title: "Weapons & Tactical Systems",
            description: "Precision remote weapon stations and tactical engagement",
            href: "/surface/respond/weapons-tactical",
          },
          {
            title: "Non Lethal Response System",
            description: "Directional acoustic deterrence, dazzling lasers, and barriers",
            href: "/surface/respond/non-lethal",
          },
          {
            title: "Autonomous Drone Response",
            description: "Rapid airborne reconnaissance and pursuit deployment",
            href: "/surface/respond/drone-response",
          },
          {
            title: "Unmanned Ground Systems",
            description: "Autonomous UGVs for perimeter sweep and escort operations",
            href: "/surface/respond/ugv",
          },
        ],
      },
    ],
    spotlight: {
      tag: "LAND & LITTORAL",
      title: "Autonomous Perimeter Defence: 24/7 All-Weather Dominance",
      description: "Integrating optical radar and polarimetric thermal cameras with unmanned ground systems.",
      image: "/assets/ecosystem-2.webp",
      href: "/domains/surface",
    },
  },

  aerial: {
    title: "Aerial",
    subtitle: "Swarm autonomy, tactical UAVs, and multi-layered counter-drone interception systems",
    modes: [
      {
        id: "detect",
        label: "Detect",
        items: [
          {
            title: "Optical Radar",
            description: "Multi-aperture aerial target acquisition and visual radar fusion",
            href: "/aerial/detect/optical-radar",
          },
          {
            title: "RF & GNSS",
            description: "Spectrum monitoring for rogue drone command and satellite links",
            href: "/aerial/detect/rf-gnss",
          },
          {
            title: "Polarimetric Thermal Imaging",
            description: "Long-range airborne thermal signature tracking",
            href: "/aerial/detect/polarimetric",
          },
          {
            title: "LiDAR",
            description: "Airborne terrain contouring and low-altitude obstacle detection",
            href: "/aerial/detect/lidar",
          },
          {
            title: "Acoustic",
            description: "Propeller sound signature matching and micro-UAS triangulation",
            href: "/aerial/detect/acoustic",
          },
        ],
      },
      {
        id: "decide",
        label: "Decide",
        items: [
          {
            title: "Data Acquisition & Processing",
            description: "Collects and processes GPR, seismic, acoustic and hydrophone sensor data into structured information.",
            href: "/aerial/decide#data-acquisition",
          },
          {
            title: "AI Analytics & Classification",
            description: "Identifies anomalies, recognises signal patterns and classifies detected activities.",
            href: "/aerial/decide#ai-analytics",
          },
          {
            title: "Multi-Sensor Fusion",
            description: "Correlates data from multiple sensors to create a unified intelligence picture.",
            href: "/aerial/decide#multi-sensor-fusion",
          },
          {
            title: "Localisation & Tracking",
            description: "Determines the location of detected activities and monitors movement patterns.",
            href: "/aerial/decide#localisation-tracking",
          },
          {
            title: "Threat Assessment & Decision Support",
            description: "Evaluates potential threats, prioritises incidents and supports informed decisions.",
            href: "/aerial/decide#threat-assessment",
          },
          {
            title: "Command & Control",
            description: "Enables centralised monitoring, geospatial visualisation and coordinated incident management through an integrated C3I platform.",
            href: "/aerial/decide#command-control",
          },
        ],
      },
      {
        id: "respond",
        label: "Respond",
        items: [
          {
            title: "RF Jamming",
            description: "Multi-band directional RF and command link denial",
            href: "/aerial/respond/rf-jamming",
          },
          {
            title: "GNSS Spoofing",
            description: "Satellite navigation spoofing forcing safe perimeter landings",
            href: "/aerial/respond/gnss-spoofing",
          },
          {
            title: "Laser based Interception",
            description: "Directed energy neutralization of drone optical sensors",
            href: "/aerial/respond/laser-interception",
          },
          {
            title: "Net based Interception",
            description: "Tethered high-speed net capture for forensic recovery",
            href: "/aerial/respond/net-interception",
          },
          {
            title: "Kinetic Interception",
            description: "High-speed pursuit drones for direct physical neutralization",
            href: "/aerial/respond/kinetic-interception",
          },
        ],
      },
    ],
    spotlight: {
      tag: "AIR DOMINANCE",
      title: "Layered Counter-UAS & Autonomous Aerial Interception",
      description: "Neutralizing low-observable rogue drones and hostile swarm attacks in under 4 seconds.",
      image: "/assets/field-drone.webp",
      href: "/domains/aerial",
    },
  },

  solutions: {
    title: "Detect. Decide. Respond",
    subtitle: "Enterprise platforms, sovereign defence capabilities, and mission-ready countermeasure suites",
    modes: [
      {
        id: "defence",
        label: "Defence & Homeland",
        items: [
          {
            title: "ICCS",
            description: "Integrated Command & Control System for multi-domain operations",
            href: "/solutions/iccs",
          },
          {
            title: "GMTS",
            description: "Grid Monitoring & Tracking System for identity-led intelligence",
            href: "/solutions/gmts",
          },
          {
            title: "SROP",
            description: "Smartization of Road Opening Procedure for convoy security",
            href: "/solutions/srop",
          },
          {
            title: "SDRR",
            description: "Sarva Drishti Rudra Rakshak integrated mobile defence system",
            href: "/solutions/sdrr",
          },
          {
            title: "IED Detection",
            description: "Standoff explosive and buried anomaly identification",
            href: "/solutions/ied-detection",
          },
          {
            title: "Foliage Penetration",
            description: "Synthetic aperture radar for dense canopy visibility",
            href: "/solutions/foliage-penetration",
          },
          {
            title: "Warrior Drone Buddy",
            description: "Compact tactical drone for rapid area surveillance",
            href: "/solutions/warrior-drone-buddy",
          },
        ],
      },
      {
        id: "critical-infra",
        label: "Critical Infrastructure Protection",
        items: [
          {
            title: "Critical Infrastructure Protection",
            description: "Automated perimeter defence, drone surveillance, and asset protection",
            href: "/solutions/critical-infrastructure-protection",
          },
        ],
      },
      {
        id: "enterprise",
        label: "Enterprise",
        items: [
          {
            title: "Facial Recognition",
            description: "High-throughput contactless biometric identity checkpoints",
            href: "/solutions/facial-recognition",
          },
          {
            title: "AI Video Analytics",
            description: "Automated crowd density, loitering, and anomaly detection",
            href: "/solutions/video-analytics",
          },
        ],
      },
    ],
    spotlight: {
      tag: "TACTICAL DEPLOYMENT",
      title: "Sovereign Defence Systems & Critical Infrastructure Security",
      description: "Deploying integrated command and sensor fusion networks across extreme operational theatres.",
      image: "/assets/command-centre.webp",
      href: "/solutions",
    },
  },

  company: {
    title: "About us",
    subtitle: "Pioneering indigenous defence technologies, sovereign engineering, and asymmetric warfare capabilities",
    modes: [
      {
        id: "company",
        label: "Company",
        items: [
          {
            title: "Mission & Vision",
            description: "Pioneering sovereign asymmetric warfare technology",
            href: "/about#mission",
          },
          {
            title: "Certifications",
            description: "Mil-Spec, AS9100D, and ISO defence manufacturing standards",
            href: "/about#certifications",
          },
          {
            title: "Global Presence",
            description: "Facilities across India and strategic defence corridors",
            href: "/about#presence",
          },
          {
            title: "Partners",
            description: "Global strategic technology and industrial collaborators",
            href: "/about#partners",
          },
        ],
      },
      {
        id: "xfactor",
        label: "X Factor",
        items: [
          {
            title: "X Labs (R&D)",
            description: "Applied robotics, neural sensor fusion, and edge autonomy",
            href: "/ecosystem/x-labs",
          },
          {
            title: "neXr Optronics",
            description: "High-resolution thermal cores, night vision, and electro-optics",
            href: "/ecosystem/nexr-optronics",
          },
          {
            title: "Mcray Xtend",
            description: "Ruggedized battlefield communications and edge compute",
            href: "/ecosystem/mcray-xtend",
          },
        ],
      },
      {
        id: "respond",
        label: "Careers",
        items: [
          {
            title: "Careers at Rayonix",
            description: "Join our team engineering sovereign defence and autonomous technologies",
            href: "/careers",
          },
        ],
      },
    ],
    spotlight: {
      tag: "THE RAYONIX STORY",
      title: "Building Sovereign Defence Tech: The Journey from R&D to Frontline",
      description: "Discover how our interdisciplinary engineering team is transforming modern military capability.",
      image: "/assets/story-company.webp",
      href: "/about",
    },
  },
};

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
    company: "company",
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
