import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export function generateStaticParams() {
  return [
    { slug: "xtend-partnership" },
    { slug: "xtend-coverage" },
    { slug: "shephard-coverage" },
  ];
}

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <TacticalPlaceholder
      badge="PRESS COVERAGE · DISPATCH"
      title="Strategic Defence Announcement"
      subtitle={`Full dispatch text and media assets for "${slug}" are being indexed.`}
    />
  );
}
