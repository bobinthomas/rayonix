import type { Metadata } from "next";
import { OrganizationSchema, WebSiteSchema } from "@/lib/seo/json-ld";
import HeroSection from "@/components/home/HeroSection";
import BattlespaceSection from "@/components/home/BattlespaceSection";
import EcosystemSection from "@/components/home/EcosystemSection";
import MissionArchitectureSection from "@/components/home/MissionArchitectureSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import FieldDroneBanner from "@/components/home/FieldDroneBanner";
import BeyondIntegrationSection from "@/components/home/BeyondIntegrationSection";
import GlobalPartnershipSection from "@/components/home/GlobalPartnershipSection";
import ExploreSection from "@/components/home/ExploreSection";
import LetsTalkSection from "@/components/home/LetsTalkSection";
import Reveal from "@/components/ui/Reveal";

export const revalidate = 86400; // Static edge caching with on-demand revalidation

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
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
        <Reveal><ExploreSection /></Reveal>

        {/* 10 · Lets Talk (3 Consultation Pillars) */}
        <Reveal><LetsTalkSection /></Reveal>
      </main>
    </>
  );
}
