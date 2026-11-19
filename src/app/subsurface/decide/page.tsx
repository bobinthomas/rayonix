import { Metadata } from "next";
import CommandIntelligenceHero from "@/components/subsurface/decide/CommandIntelligenceHero";
import CommandIntelligenceCapabilities from "@/components/subsurface/decide/CommandIntelligenceCapabilities";
import CommandIntelligenceUseCases from "@/components/subsurface/decide/CommandIntelligenceUseCases";

export const metadata: Metadata = {
  title:
    "Command & Intelligence — Subsurface Sensor Fusion & Decision Support | Rayonix",
  description:
    "Our Command & Intelligence layer transforms subsurface sensor data into actionable intelligence through AI analytics, sensor fusion, localisation and threat assessment, enabling informed operational decisions.",
  openGraph: {
    title:
      "Command & Intelligence — Subsurface Sensor Fusion & Decision Support | Rayonix",
    description:
      "Our Command & Intelligence layer transforms subsurface sensor data into actionable intelligence through AI analytics, sensor fusion, localisation and threat assessment, enabling informed operational decisions.",
    url: "https://rayonix-site.pages.dev/subsurface/decide",
    siteName: "Rayonix",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Command & Intelligence — Subsurface Sensor Fusion & Decision Support | Rayonix",
    description:
      "Our Command & Intelligence layer transforms subsurface sensor data into actionable intelligence through AI analytics, sensor fusion, localisation and threat assessment, enabling informed operational decisions.",
  },
  alternates: {
    canonical: "/subsurface/decide",
  },
};

export default function CommandIntelligencePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://rayonix-site.pages.dev/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Subsurface",
            item: "https://rayonix-site.pages.dev/domains/subsurface",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Decide",
            item: "https://rayonix-site.pages.dev/subsurface/decide",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Command & Intelligence",
            item: "https://rayonix-site.pages.dev/subsurface/decide",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Rayonix Subsurface Command & Intelligence",
        image: "https://rayonix-site.pages.dev/assets/command-centre.webp",
        description:
          "Command & Intelligence layer transforming subsurface sensor data into actionable intelligence through AI analytics, sensor fusion, localisation and threat assessment.",
        provider: {
          "@type": "Organization",
          name: "Rayonix",
          url: "https://rayonix-site.pages.dev",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Command & Intelligence Capabilities",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Data Acquisition & Processing",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Analytics & Classification",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Multi-Sensor Fusion",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Localisation & Tracking",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Threat Assessment & Decision Support",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Command & Control",
              },
            },
          ],
        },
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
        {/* 1. Hero: Display Title, Breadcrumbs, C3I Interface Enclosure, Spec Strip */}
        <CommandIntelligenceHero />

        {/* 2. Command & Intelligence Capabilities (6 Tabs) */}
        <CommandIntelligenceCapabilities />

        {/* 3. Use Cases Carousel (5 Blocks) */}
        <CommandIntelligenceUseCases />
      </main>
    </>
  );
}
