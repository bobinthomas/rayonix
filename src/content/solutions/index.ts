import type { SolutionPageContent } from "./types";
import { generatedSolutions } from "./generated";

/** All solution pages, served at /solutions/<slug>. Rebuilt by scripts/import-solutions.mjs. */
export const solutions: SolutionPageContent[] = generatedSolutions;

export function getSolution(slug: string): SolutionPageContent | undefined {
  return solutions.find((s) => s.slug === slug);
}

export type { SolutionPageContent } from "./types";
