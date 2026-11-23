import type { ProductPageContent } from "./types";

// Surface Acoustic Sensor. The client's Surface Google Doc has no copy for this page yet,
// so the text fields are left empty until copy is supplied. Kept noindex until approved.
export const surfaceDetectAcoustic: ProductPageContent = {
  path: "/surface/detect/acoustic",
  domain: "surface",
  phase: "detect",
  indexable: false,

  seo: {
    title: "Acoustic Sensor — Surface | Rayonix",
    description: "Surface acoustic sensor from Rayonix.",
  },

  breadcrumbs: [
    { label: "Home", href: "/", linked: true },
    { label: "Surface", href: "/domains/surface" },
    { label: "Detect", href: "/domains/surface" },
    { label: "Acoustic Sensor", href: "/surface/detect/acoustic" },
  ],

  hero: {
    ariaLabel: "Surface Acoustic Sensor Overview",
    title: "Acoustic Sensor",
    titleSize: "long",
    eyebrow: "Surface detection",
    intro: "",
    image: {
      src: "/assets/banners/surface-detect-acoustic.webp",
      alt: "Acoustic Sensor banner",
    },
    specs: [],
  },

  useCases: {
    heading: "Use Cases",
    items: [],
  },

  schema: {
    type: "Product",
    name: "Rayonix Surface Acoustic Sensor",
    description: "Surface acoustic sensor from Rayonix.",
  },
};
