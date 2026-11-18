import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy | Rayonix",
  description: "Data handling, information security, and privacy policies of Rayonix.",
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
