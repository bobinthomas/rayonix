import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionPage from "@/components/solution/SolutionPage";
import { buildSolutionMetadata } from "@/components/solution/solutionSeo";
import { solutions, getSolution } from "@/content/solutions";

/** Solution pages, prerendered from src/content/solutions (see scripts/import-solutions.mjs). */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getSolution(slug);
  return content ? buildSolutionMetadata(content) : {};
}

export default async function SolutionRoute({ params }: Props) {
  const { slug } = await params;
  const content = getSolution(slug);
  if (!content) notFound();
  return <SolutionPage content={content} />;
}
