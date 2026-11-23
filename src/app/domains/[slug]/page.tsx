import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export function generateStaticParams() {
  return [
    { slug: "surface" },
    { slug: "aerial" },
  ];
}

const domainInfo: Record<string, { title: string; subtitle: string }> = {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const domain = domainInfo[slug] || {
    title: "Operational Domain",
    subtitle: "Advanced multispectral defence hardware architecture.",
  };

  return {
    title: domain.title,
    description: domain.subtitle,
    alternates: { canonical: `/domains/${slug}` },
    robots: { index: false, follow: true },
  };
}

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

  return (
    <TacticalPlaceholder
      badge="DOMAIN ARCHITECTURE"
      title={domain.title}
      subtitle={domain.subtitle}
    />
  );
}
