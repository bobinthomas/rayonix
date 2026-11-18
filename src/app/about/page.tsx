import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export const metadata: Metadata = {
  title: "About Rayonix | Asymmetric Warfare & Integrated Defence",
  description:
    "Rayonix engineers intelligent, interconnected defence systems combining AI, autonomy, and advanced sensor platforms.",
};

export default function AboutPage() {
  return (
    <TacticalPlaceholder
      badge="COMPANY PROFILE · INTELLIGENCE"
      title="Engineering Beyond Visible Frontiers."
      subtitle="Rayonix pioneers advanced defence technologies across Subsurface, Surface, and Aerial domains. Full leadership, certifications, and institutional background are being prepared for release."
    />
  );
}
