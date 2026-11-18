import { Metadata } from "next";
import GprHero from "@/components/gpr/GprHero";
import GprCapabilities from "@/components/gpr/GprCapabilities";
import GprUseCases from "@/components/gpr/GprUseCases";

export const metadata: Metadata = {
  title: "GPR — Ground Penetrating Radar | Subsurface Detection & Mapping | Rayonix",
  description:
    "Our Ground Penetrating Radar (GPR) solution uses electromagnetic waves to detect buried objects, map underground structures and identify subsurface anomalies without excavation.",
  openGraph: {
    title: "GPR — Ground Penetrating Radar | Subsurface Detection & Mapping | Rayonix",
    description:
      "Our Ground Penetrating Radar (GPR) solution uses electromagnetic waves to detect buried objects, map underground structures and identify subsurface anomalies without excavation.",
    url: "https://rayonix-site.pages.dev/subsurface/detect/gpr",
    siteName: "Rayonix",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPR — Ground Penetrating Radar | Subsurface Detection & Mapping | Rayonix",
    description:
      "Our Ground Penetrating Radar (GPR) solution uses electromagnetic waves to detect buried objects, map underground structures and identify subsurface anomalies without excavation.",
  },
  alternates: {
    canonical: "/subsurface/detect/gpr",
  },
};

export default function GprPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rayonix-site.pages.dev/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Subsurface",
            "item": "https://rayonix-site.pages.dev/subsurface",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Detect",
            "item": "https://rayonix-site.pages.dev/subsurface/detect",
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "GPR",
            "item": "https://rayonix-site.pages.dev/subsurface/detect/gpr",
          },
        ],
      },
      {
        "@type": "Product",
        "name": "Rayonix GPR-TR400 Ground Penetrating Radar",
        "image": "https://rayonix-site.pages.dev/assets/gpr-hero.webp",
        "description":
          "Ground Penetrating Radar system using electromagnetic pulses to investigate subsurface layers, identify buried utilities and map geological interfaces.",
        "brand": {
          "@type": "Brand",
          "name": "Rayonix",
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Antenna Frequency",
            "value": "600 MHz",
          },
          {
            "@type": "PropertyValue",
            "name": "System Weight",
            "value": "2.7 kg",
          },
          {
            "@type": "PropertyValue",
            "name": "Operating Time",
            "value": "1+ Hours",
          },
          {
            "@type": "PropertyValue",
            "name": "Environmental Protection",
            "value": "IP65",
          },
          {
            "@type": "PropertyValue",
            "name": "System Dimensions",
            "value": "620 × 216 × 80 mm",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative w-full min-h-screen bg-[#080f12]">
        {/* 1. Hero: Title, Breadcrumbs, Enclosure, 5-Column Spec Strip */}
        <GprHero />

        {/* 2. Advanced Subsurface Detection & Mapping Capabilities (6 Tabs) & Documentation */}
        <GprCapabilities />

        {/* 3. Use Cases Carousel (4 Blocks) */}
        <GprUseCases />
      </main>
    </>
  );
}
