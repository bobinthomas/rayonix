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

export const revalidate = 86400; // Static edge caching with on-demand revalidation

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
        <BattlespaceSection />

        {/* 03 · One Connected Defence Ecosystem (Light Section) */}
        <EcosystemSection />

        {/* 04 · Detect. Decide. Respond. (Mission Architecture) */}
        <MissionArchitectureSection />

        {/* 05 · Engineered for the Mission. Proven in the Field. (Dark Slate) */}
        <CapabilitiesSection />

        {/* 06 · Tactical Field Drone Banner */}
        <FieldDroneBanner />

        {/* 07 · Beyond Integration. Built for Defence. (Light Section - X Labs, neXr, Mcray) */}
        <BeyondIntegrationSection />

        {/* 08 · Global Technology. Indian Defence Capability. (World Map & Partner Logos) */}
        <GlobalPartnershipSection />

        {/* 09 · Explore Rayonix (Light Section - Stories, Ecosystem, Careers, News) */}
        <ExploreSection />

        {/* 10 · Lets Talk (3 Consultation Pillars) */}
        <LetsTalkSection />
      </main>
    </>
  );
}
