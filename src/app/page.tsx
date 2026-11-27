import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { OrganizationSchema, WebSiteSchema } from "@/lib/seo/json-ld";
import HeroSection from "@/components/home/HeroSection";
import BattlespaceSection from "@/components/home/BattlespaceSection";
import FieldDroneBanner from "@/components/home/FieldDroneBanner";
import ContactTeaser from "@/components/company/ContactTeaser";
import Reveal from "@/components/ui/Reveal";
import { getHomepageNews } from "@/lib/cms";

const EcosystemSection = dynamic(() => import("@/components/home/EcosystemSection"));
const MissionArchitectureSection = dynamic(() => import("@/components/home/MissionArchitectureSection"));
const CapabilitiesSection = dynamic(() => import("@/components/home/CapabilitiesSection"));
const BeyondIntegrationSection = dynamic(() => import("@/components/home/BeyondIntegrationSection"));
const GlobalPartnershipSection = dynamic(() => import("@/components/home/GlobalPartnershipSection"));
const ExploreSection = dynamic(() => import("@/components/home/ExploreSection"));

export const revalidate = 86400; // Static edge caching with on-demand revalidation

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const homepageStories = await getHomepageNews();
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/assets/hero-poster-mobile.webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/hero-poster.webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      {/* Schema.org Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />

      {/* Clean continuous section-by-section flow matching Figma frame 640:3758 with 16px gap */}
      <main className="w-full flex flex-col gap-0 min-[700px]:gap-4">
        {/* 01 · Hero Video Banner */}
        <HeroSection />

        {/* 02 · The New Battlespace (Two Soldiers in Fog) */}
        <Reveal><BattlespaceSection /></Reveal>

        {/* 03 · One Connected Defence Ecosystem (Light Section) */}
        <Reveal><EcosystemSection /></Reveal>

        {/* 04 · Detect. Decide. Respond. (Mission Architecture) — scroll-pinned via GSAP, not wrapped */}
        <MissionArchitectureSection />

        {/* 05 · Engineered for the Mission. Proven in the Field. (Dark Slate) */}
        <Reveal><CapabilitiesSection /></Reveal>

        {/* 06 · Tactical Field Drone Banner */}
        <Reveal><FieldDroneBanner /></Reveal>

        {/* 07 · Beyond Integration. Built for Defence. (Light Section - X Labs, neXr, Mcray) */}
        <Reveal><BeyondIntegrationSection /></Reveal>

        {/* 08 · Global Technology. Indian Defence Capability. (World Map & Partner Logos) */}
        <Reveal><GlobalPartnershipSection /></Reveal>

        {/* 09 · Explore Rayonix (Light Section - Stories, Ecosystem, Careers, News) */}
        <Reveal><ExploreSection stories={homepageStories} /></Reveal>

        {/* 10 · Closing band: Let's Start a Conversation */}
        <Reveal><ContactTeaser /></Reveal>
      </main>
    </>
  );
}
