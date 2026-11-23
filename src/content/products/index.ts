import type { ProductPageContent } from "./types";
import { gpr } from "./gpr";
import { commandIntelligence } from "./command-intelligence";
import { surfaceDecide } from "./surface-decide";
import { aerialDecide } from "./aerial-decide";
import { surfaceDetectAcoustic } from "./surface-detect-acoustic";
import { generatedProducts } from "./generated";
import { heroImages } from "./hero-images";

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
const allProducts: ProductPageContent[] = [
  gpr,
  commandIntelligence,
  surfaceDecide,
  aerialDecide,
  surfaceDetectAcoustic,
  ...generatedProducts,
];

// Fill in client banners where a page has no hero image of its own.
export const products: ProductPageContent[] = allProducts.map((p) =>
  p.hero.image || !heroImages[p.path]
    ? p
    : { ...p, hero: { ...p.hero, image: heroImages[p.path] } }
);

export function getProductByPath(path: string): ProductPageContent | undefined {
  return products.find((p) => p.path === path);
}

export type { ProductPageContent } from "./types";
