import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Data handling, information security, and privacy policies of Rayonix.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <TacticalPlaceholder
      badge="SECURITY & COMPLIANCE"
      title="Privacy Policy"
      subtitle="Rayonix is dedicated to strict data sovereignty, military-grade encryption, and adherence to international privacy protocols."
    />
  );
}
