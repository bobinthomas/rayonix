import { Metadata } from "next";
import TacticalPlaceholder from "@/components/common/TacticalPlaceholder";

export const metadata: Metadata = {
  title: "Newsroom | Rayonix Defence Technologies",
  description:
    "Official dispatches, operational deployments, and strategic partnerships from Rayonix.",
};

export default function NewsPage() {
  return (
    <TacticalPlaceholder
      badge="PRESS & DISPATCHES"
      title="The Latest from Rayonix."
      subtitle="Stay connected with our latest deployments, government trials, strategic global partnerships, and technology milestones."
    />
  );
}
