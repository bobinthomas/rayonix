import type { ProductPageContent } from "./types";
import { gpr } from "./gpr";
import { commandIntelligence } from "./command-intelligence";
import { generatedProducts } from "./generated";

/**
 * All product pages, keyed by canonical path. Each one is served by
 * src/app/[...productPath] and listed in the sitemap.
 *
 * - Hand-written pages (with diagrams / downloads) live next to this file.
 * - Pages imported from the client's Google Docs live in ./generated and are
 *   rebuilt by `node scripts/import-content.mjs`.
 *
 * This registry is the seam a CMS will replace later (same shape, different source).
 */
export const products: ProductPageContent[] = [gpr, commandIntelligence, ...generatedProducts];

export function getProductByPath(path: string): ProductPageContent | undefined {
  return products.find((p) => p.path === path);
}

export type { ProductPageContent } from "./types";
