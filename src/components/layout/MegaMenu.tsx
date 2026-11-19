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
            href: "/domains/subsurface#das",
          },
          {
            title: "Seismic Sensors",
            description: "Low-frequency ground vibration and footstep detection arrays",
            href: "/domains/subsurface#seismic",
          },
          {
            title: "Hydrophone Sensors",
            description: "Sub-surface littoral and underwater acoustic monitoring",
            href: "/domains/subsurface#hydrophone",
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
            href: "/domains/subsurface#response-coordination",
          },
        ],
      },
    ],
    spotlight: {
      tag: "SUBTERRANEAN DEFENCE",
      title: "Subsurface Threat Matrix: Eliminating Underground Blind Spots",
      description: "Distributed acoustic sensing and seismic analytics safeguarding sovereign perimeter corridors.",
      image: "/assets/ecosystem-1.png",
      href: "/domains/subsurface",
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
            href: "/domains/surface#optical-radar",
          },
          {
            title: "Polarimetric Thermal Imaging",
            description: "Thermal visibility through dense smoke, fog, and foliage",
            href: "/domains/surface#polarimetric",
          },
          {
            title: "3D LiDAR",
            description: "High-density point cloud spatial perimeter mapping",
            href: "/domains/surface#lidar",
          },
          {
            title: "Acoustic Sensor",
            description: "Directional gunshot, engine, and impact sound triangulation",
            href: "/domains/surface#acoustic",
          },
          {
            title: "Vibration Sensors",
            description: "Unattended ground sensors for covert border perimeter breaches",
            href: "/domains/surface#vibration",
          },
          {
            title: "E-Fence",
            description: "Virtual tripwires with neural-network false alarm filtering",
            href: "/domains/surface#efence",
          },
          {
            title: "3D Terrain Mapping",
            description: "Volumetric terrain modeling and topographical surface scans",
            href: "/domains/surface#terrain-mapping",
          },
        ],
      },
      {
        id: "decide",
        label: "Decide",
        items: [
          {
            title: "Data Acquisition & Processing",
            description: "Real-time edge ingestion of optical and radar telemetry",
            href: "/domains/surface#data-processing",
          },
          {
            title: "AI Analytics and Classification",
            description: "Automated target recognition and behavioral classification",
            href: "/domains/surface#ai-classification",
          },
          {
            title: "Multisensor Fusion",
            description: "Correlation of optical, thermal, radar, and acoustic signals",
            href: "/domains/surface#fusion",
          },
          {
            title: "Localisation & Tracking",
            description: "Simultaneous multi-target geospatial position lock",
            href: "/domains/surface#tracking",
          },
          {
            title: "Threat Assessment & Decision Support",
            description: "Predictive threat trajectory and tactical intervention advice",
            href: "/domains/surface#decision-support",
          },
          {
            title: "Command & Control",
            description: "Common Operating Picture (COP) integration for land operations",
            href: "/domains/surface#c2",
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
            href: "/domains/surface#weapons-tactical",
          },
          {
            title: "Non Lethal Response System",
            description: "Directional acoustic deterrence, dazzling lasers, and barriers",
            href: "/domains/surface#non-lethal",
          },
          {
            title: "Autonomous Drone Response",
            description: "Rapid airborne reconnaissance and pursuit deployment",
            href: "/domains/surface#drone-response",
          },
          {
            title: "Unmanned Ground Systems",
            description: "Autonomous UGVs for perimeter sweep and escort operations",
            href: "/domains/surface#ugv",
          },
        ],
      },
    ],
    spotlight: {
      tag: "LAND & LITTORAL",
      title: "Autonomous Perimeter Defense: 24/7 All-Weather Dominance",
      description: "Integrating optical radar and polarimetric thermal cameras with unmanned ground systems.",
      image: "/assets/ecosystem-2.png",
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
            href: "/domains/aerial#optical-radar",
          },
          {
            title: "RF & GNSS",
            description: "Spectrum monitoring for rogue drone command and satellite links",
            href: "/domains/aerial#rf-gnss",
          },
          {
            title: "Polarimetric Thermal Imaging",
            description: "Long-range airborne thermal signature tracking",
            href: "/domains/aerial#polarimetric",
          },
          {
            title: "LiDAR",
            description: "Airborne terrain contouring and low-altitude obstacle detection",
            href: "/domains/aerial#lidar",
          },
          {
            title: "Acoustic",
            description: "Propeller sound signature matching and micro-UAS triangulation",
            href: "/domains/aerial#acoustic",
          },
        ],
      },
      {
        id: "decide",
        label: "Decide",
        items: [
          {
            title: "Data Acquisition & Processing",
            description: "Edge sensor processing for extreme-speed airborne triage",
            href: "/domains/aerial#data-processing",
          },
          {
            title: "AI Analytics and Classification",
            description: "Deep learning classification of aerial threats and UAS types",
            href: "/domains/aerial#ai-classification",
          },
          {
            title: "Multisensor Fusion",
            description: "Unified air picture combining RF, radar, and optical telemetry",
            href: "/domains/aerial#fusion",
          },
          {
            title: "Localisation & Tracking",
            description: "High-precision 3D flight trajectory calculation",
            href: "/domains/aerial#tracking",
          },
          {
            title: "Threat Assessment & Decision Support",
            description: "Kinetic risk assessment and weapon-target pairing",
            href: "/domains/aerial#decision-support",
          },
          {
            title: "Command & Control",
            description: "Integrated anti-drone air defense console",
            href: "/domains/aerial#c2",
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
            href: "/domains/aerial#rf-jamming",
          },
          {
            title: "GNSS Spoofing",
            description: "Satellite navigation spoofing forcing safe perimeter landings",
            href: "/domains/aerial#gnss-spoofing",
          },
          {
            title: "Laser based Interception",
            description: "Directed energy neutralization of drone optical sensors",
            href: "/domains/aerial#laser-interception",
          },
          {
            title: "Net based Interception",
            description: "Tethered high-speed net capture for forensic recovery",
            href: "/domains/aerial#net-interception",
          },
          {
            title: "Kinetic Interception",
            description: "High-speed pursuit drones for direct physical neutralization",
            href: "/domains/aerial#kinetic-interception",
          },
        ],
      },
    ],
    spotlight: {
      tag: "AIR DOMINANCE",
      title: "Layered Counter-UAS & Autonomous Aerial Interception",
      description: "Neutralizing low-observable rogue drones and hostile swarm attacks in under 4 seconds.",
      image: "/assets/field-drone.png",
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
            href: "/solutions#iccs",
          },
          {
            title: "GMTS",
            description: "Ground Movement Targeting System for contested borders",
            href: "/solutions#gmts",
          },
          {
            title: "SROP",
            description: "Surveillance & Reconnaissance Observation Platform",
            href: "/solutions#srop",
          },
          {
            title: "SDRR",
            description: "Software-Defined Radar & Reconnaissance payload system",
            href: "/solutions#sdrr",
          },
          {
            title: "IED Detection",
            description: "Standoff explosive and buried anomaly identification",
            href: "/solutions#ied-detection",
          },
          {
            title: "Foliage Penetration",
            description: "Synthetic aperture radar for dense canopy visibility",
            href: "/solutions#foliage-penetration",
          },
          {
            title: "Warrior Drone Buddy",
            description: "Autonomous loyal-wingman tactical support UAS",
            href: "/solutions#warrior-drone-buddy",
          },
        ],
      },
      {
        id: "critical-infra",
        label: "Critical Infrastructure Protection",
        items: [
          {
            title: "Perimeter Intrusion Detection",
            description: "Automated perimeter defense for nuclear and energy sites",
            href: "/solutions#perimeter-intrusion",
          },
          {
            title: "Automated Drone Surveillance",
            description: "Scheduled autonomous patrol drones with docking stations",
            href: "/solutions#drone-surveillance",
          },
          {
            title: "Thermal Perimeter Security",
            description: "Continuous 360° thermal imaging for facility borders",
            href: "/solutions#thermal-security",
          },
          {
            title: "Command & Monitoring Centre",
            description: "Multi-screen centralized security operations console",
            href: "/solutions#command-monitoring",
          },
          {
            title: "Integrated Asset Protection",
            description: "Multi-layered physical, acoustic, and RF security shielding",
            href: "/solutions#asset-protection",
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
            href: "/solutions#facial-recognition",
          },
          {
            title: "AI Video Analytics",
            description: "Automated crowd density, loitering, and anomaly detection",
            href: "/solutions#video-analytics",
          },
          {
            title: "Industrial AI",
            description: "Automated safety compliance and edge vision for enterprise",
            href: "/solutions#industrial-ai",
          },
        ],
      },
    ],
    spotlight: {
      tag: "TACTICAL DEPLOYMENT",
      title: "Sovereign Defense Systems & Critical Infrastructure Security",
      description: "Deploying integrated command and sensor fusion networks across extreme operational theatres.",
      image: "/assets/command-centre.png",
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
            description: "Mil-Spec, AS9100D, and ISO defense manufacturing standards",
            href: "/about#certifications",
          },
          {
            title: "Global Presence",
            description: "Facilities across India and strategic defense corridors",
            href: "/about#presence",
          },
          {
            title: "Leadership",
            description: "Defence veterans, robotics architects, and visionaries",
            href: "/about#leadership",
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
          {
            title: "Indigenous Innovation",
            description: "100% sovereign defense technology designed under Make in India",
            href: "/ecosystem#indigenous",
          },
        ],
      },
      {
        id: "respond",
        label: "Careers",
        items: [
          {
            title: "Life at Rayonix",
            description: "High-impact mission culture engineering critical technologies",
            href: "/careers#culture",
          },
          {
            title: "Engineering Roles",
            description: "Embedded software, computer vision, and systems engineering",
            href: "/careers#engineering",
          },
          {
            title: "Autonomy & Robotics",
            description: "Swarm intelligence and robotics research fellows",
            href: "/careers#robotics",
          },
          {
            title: "Apply Now",
            description: "Submit your credentials directly to our talent acquisition team",
            href: "/careers#apply",
          },
        ],
      },
    ],
    spotlight: {
      tag: "THE RAYONIX STORY",
      title: "Building Sovereign Defense Tech: The Journey from R&D to Frontline",
      description: "Discover how our interdisciplinary engineering team is transforming modern military capability.",
      image: "/assets/story-company.png",
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
            <div className="flex items-center gap-2 sm:gap-2.5 border-b border-[#253035] pb-3 mb-5 overflow-x-auto scrollbar-none">
              {content.modes.map((mode) => {
                const isActive = mode.id === currentMode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onMouseEnter={() => handleModeChange(mode.id)}
                    onClick={() => handleModeChange(mode.id)}
                    className={`relative px-3.5 py-1.5 text-[13px] font-medium tracking-normal transition-colors duration-200 rounded-[2px] flex items-center gap-2 cursor-pointer ${
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
                className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1.5 w-full transition-all duration-300 ease-out animate-in fade-in-50 slide-in-from-bottom-1"
              >
                {currentMode.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    prefetch={false}
                    onClick={onClose}
                    className="group flex items-center justify-between p-3 rounded-[4px] transition-all duration-200 hover:bg-white/[0.04] border border-transparent hover:border-[#253035]/60"
                  >
                    <div className="pr-3">
                      <h4 className="text-[14px] font-semibold text-[#f5f6f6] group-hover:text-[#e22328] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[12px] text-[#8e9ca2] leading-relaxed mt-0.5 line-clamp-2">
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
              className="pt-4 mt-3 border-t border-[#253035] flex items-center justify-between text-xs text-[#7f8e95] animate-in fade-in-50 duration-200"
            >
              <span className="truncate pr-4">{content.subtitle}</span>
            </div>
          </div>

          {/* Right Column (4 cols): Spotlight Card with smooth cross-fade */}
          <div className="lg:col-span-4 flex flex-col">
            <div
              key={activeTab}
              className="h-full bg-[#162025] border border-[#253035] rounded-[4px] p-5 sm:p-6 flex flex-col justify-between group hover:border-[#e22328]/40 transition-all duration-300 shadow-md animate-in fade-in-50"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#e22328]">
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
                <h3 className="text-[15px] font-bold text-[#f5f6f6] leading-snug group-hover:text-[#e22328] transition-colors">
                  {content.spotlight.title}
                </h3>
                <p className="text-[13px] text-[#8e9ca2] leading-relaxed mt-1.5">
                  {content.spotlight.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
