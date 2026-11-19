import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export function generateStaticParams() {
  return [
    // x-labs has its own page: src/app/ecosystem/x-labs/page.tsx
    { slug: "nexr-optronics" },
    { slug: "mcray-xtend" },
  ];
}

const titles: Record<string, { title: string; subtitle: string }> = {
  "x-labs": {
    title: "Rayonix X Labs",
    subtitle:
      "Advanced R&D and rapid prototyping laboratory engineering sovereign deep-tech for forward operations.",
  },
  "nexr-optronics": {
    title: "neXr Optronics",
    subtitle:
      "Next-generation thermal, night-vision, and multispectral electro-optical sensor payloads.",
  },
  "mcray-xtend": {
    title: "Mcray Xtend",
    subtitle:
      "Human-guided tactical micro-drones and autonomous interception platforms.",
  },
};

export default async function EcosystemSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const info = titles[slug] || {
    title: "Defence Ecosystem Partner",
    subtitle: "Specialized military engineering and integration facility.",
  };

  return (
    <TacticalPlaceholder
      badge="SUBSIDIARY INTELLIGENCE"
      title={info.title}
      subtitle={info.subtitle}
    />
  );
}
