import { Metadata } from "next";
import { redirect } from "next/navigation";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export function generateStaticParams() {
  return [
    { slug: "subsurface" },
    { slug: "surface" },
    { slug: "aerial" },
  ];
}

const domainInfo: Record<string, { title: string; subtitle: string; redirect?: string }> = {
  subsurface: {
    title: "Subsurface Domain Systems",
    subtitle:
      "Deep underground and underwater detection, mapping, and seismic intelligence systems.",
    redirect: "/subsurface/detect/gpr",
  },
  surface: {
    title: "Surface Warfare & Ground Systems",
    subtitle:
      "Autonomous ground vehicles, optical surveillance sentries, and tactical field mobility.",
  },
  aerial: {
    title: "Aerial Autonomous & C-UAS Systems",
    subtitle:
      "Airborne radar, drone swarms, and hard/soft kill counter-UAS interception grids.",
  },
};

export default async function DomainSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const domain = domainInfo[slug] || {
    title: "Operational Domain",
    subtitle: "Advanced multispectral defence hardware architecture.",
  };

  // If visiting subsurface, seamlessly route to the active GPR platform
  if (slug === "subsurface") {
    redirect("/subsurface/detect/gpr");
  }

  return (
    <TacticalPlaceholder
      badge="DOMAIN ARCHITECTURE"
      title={domain.title}
      subtitle={domain.subtitle}
    />
  );
}
