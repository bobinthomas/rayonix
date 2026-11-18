import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export const metadata: Metadata = {
  title: "Solutions | Rayonix Integrated Defence Systems",
  description:
    "Mission-tailored solutions integrating command and control, automated surveillance, and multi-sensor fusion.",
};

export default function SolutionsPage() {
  return (
    <TacticalPlaceholder
      badge="MISSION SOLUTIONS · ARCHITECTURE"
      title="Integrated Defence Solutions."
      subtitle="Tailored operational capabilities for asymmetric warfare, tactical reconnaissance, and critical asset defense. Detailed solution portfolios will be published shortly."
    />
  );
}
