import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export const metadata: Metadata = {
  title: "Solutions | Rayonix Integrated Defence Systems",
  description:
    "Mission-tailored solutions integrating command and control, automated surveillance, and multi-sensor fusion.",
  alternates: { canonical: "/solutions" },
  robots: { index: false, follow: true },
};

export default function SolutionsPage() {
  return (
    <TacticalPlaceholder
      badge="MISSION SOLUTIONS · ARCHITECTURE"
      title="Integrated Defence Solutions."
      subtitle="Tailored operational capabilities for asymmetric warfare, tactical reconnaissance, and critical asset defence. Detailed solution portfolios will be published shortly."
    />
  );
}
