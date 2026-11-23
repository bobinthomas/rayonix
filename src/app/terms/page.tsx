import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions of access to Rayonix defence platforms and documentation.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <TacticalPlaceholder
      badge="LEGAL & REGULATORY"
      title="Terms of Use"
      subtitle="Access to Rayonix web systems, datasheets, and intellectual assets is governed by applicable defence export control regulations and bilateral confidentiality agreements."
    />
  );
}
