import type { ProductImage } from "./types";

/**
 * Hero banner per page path, from the client's banner set (optimized WebP in
 * public/assets/banners). Applied in index.ts only where a page's own
 * hero.image is not set, so pages with a hand-set image keep it.
 */
export const heroImages: Record<string, ProductImage> = {
  // Subsurface
  "/subsurface/detect/das": { src: "/assets/banners/subsurface-detect-das.webp", alt: "Fibre Optic DAS banner" },
  "/subsurface/detect/seismic": { src: "/assets/banners/subsurface-detect-seismic.webp", alt: "Seismic Sensors banner" },
  "/subsurface/detect/hydrophone": { src: "/assets/banners/subsurface-detect-hydrophone.webp", alt: "Hydrophone Sensors banner" },
  "/subsurface/respond": { src: "/assets/banners/subsurface-respond.webp", alt: "Threat Alert & Response banner" },

  // Surface
  "/surface/decide": { src: "/assets/banners/subsurface-decide.webp", alt: "Command & Intelligence banner" },
  "/surface/detect/lidar": { src: "/assets/banners/surface-detect-lidar.webp", alt: "3D LiDAR banner" },
  "/surface/detect/terrain-mapping": { src: "/assets/banners/surface-detect-terrain-mapping.webp", alt: "3D Terrain Mapping banner" },
  "/surface/detect/vibration": { src: "/assets/banners/surface-detect-vibration.webp", alt: "Vibration Sensors banner" },
  "/surface/detect/efence": { src: "/assets/banners/surface-detect-efence.webp", alt: "E-Fence banner" },
  "/surface/detect/optical-radar": { src: "/assets/banners/surface-detect-optical-radar.webp", alt: "Optical Radar banner" },
  "/surface/respond/weapons-tactical": { src: "/assets/banners/surface-respond-weapons-tactical.webp", alt: "Weapons & Tactical Systems banner" },
  "/surface/respond/drone-response": { src: "/assets/banners/surface-respond-drone-response.webp", alt: "Autonomous Drone Response banner" },
  "/surface/respond/ugv": { src: "/assets/banners/surface-respond-ugv.webp", alt: "Unmanned Ground Systems banner" },

  // Aerial
  "/aerial/decide": { src: "/assets/banners/subsurface-decide.webp", alt: "Command & Intelligence banner" },
  "/aerial/detect/optical-radar": { src: "/assets/banners/aerial-detect-optical-radar.webp", alt: "Optical Radar banner" },
  "/aerial/detect/polarimetric": { src: "/assets/banners/aerial-detect-polarimetric.webp", alt: "Polarimetric Thermal Imaging banner" },
  "/aerial/detect/lidar": { src: "/assets/banners/aerial-detect-lidar.webp", alt: "LiDAR banner" },
  "/aerial/detect/rf-gnss": { src: "/assets/banners/aerial-detect-rf-gnss.webp", alt: "RF & GNSS banner" },
  "/aerial/detect/acoustic": { src: "/assets/banners/aerial-detect-acoustic.webp", alt: "Acoustic Sensing banner" },
};
