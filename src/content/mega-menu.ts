/**
 * Mega menu data (desktop mega menu, mobile menu, domain overviews, /platforms, /solutions).
 * Plain data so server components can read it.
 */
import { COMPANY_MENU, XFACTOR_MENU } from "./navigation";
import { FLAGS } from "./site";

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
        id: "respond",
        label: "Respond",
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
    // Client structure (src/content/navigation.ts). X Factor tab is behind FLAGS.SHOW_XFACTOR_IN_COMPANY_MENU.
    modes: FLAGS.SHOW_XFACTOR_IN_COMPANY_MENU
      ? [COMPANY_MENU[0], XFACTOR_MENU, ...COMPANY_MENU.slice(1)]
      : COMPANY_MENU,
    spotlight: {
      tag: "THE RAYONIX STORY",
      title: "Building Sovereign Defence Tech: The Journey from R&D to Frontline",
      description: "Discover how our interdisciplinary engineering team is transforming modern military capability.",
      image: "/assets/story-company.webp",
      href: "/about",
    },
  },
};

