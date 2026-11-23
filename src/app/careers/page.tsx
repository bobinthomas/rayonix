import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the vanguard of aerospace, robotics, and defence engineering at Rayonix.",
  alternates: { canonical: "/careers" },
  robots: { index: false, follow: true },
};

export default function CareersPage() {
  return (
    <TacticalPlaceholder
      badge="HUMAN CAPITAL · RECRUITMENT"
      title="Engineering the Line of Defence."
      subtitle="We are assembling elite teams across computer vision, robotics, RF systems, and autonomous combat architecture. Open postings will be listed here soon."
    />
  );
}
