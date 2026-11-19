import type { ProductPageContent } from "./types";
import { gpr } from "./gpr";

/**
 * All product pages, keyed by canonical path. Add a new page by creating a
 * content file next to gpr.ts and listing it here. This registry is the
 * seam a CMS will replace later (same shape, different source).
 */
export const products: ProductPageContent[] = [gpr];

export function getProductByPath(path: string): ProductPageContent | undefined {
  return products.find((p) => p.path === path);
}

export type { ProductPageContent } from "./types";
