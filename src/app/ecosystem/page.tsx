import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export const metadata: Metadata = {
  title: "Defence Ecosystem",
  description:
    "Rayonix ecosystem uniting X Labs, neXr Optronics, and Mcray Xtend for indigenous defence manufacturing.",
  alternates: { canonical: "/ecosystem" },
  robots: { index: false, follow: true },
};

export default function EcosystemPage() {
  return (
    <TacticalPlaceholder
      badge="CONNECTED DEFENCE ECOSYSTEM"
      title="One Connected Defence Ecosystem."
      subtitle="Uniting rapid prototyping at X Labs, thermal and electro-optics from neXr, and micro-drone platforms by Mcray Xtend."
    />
  );
}
