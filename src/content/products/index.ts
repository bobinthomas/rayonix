import type { Breadcrumb, ProductPageContent } from "./types";
import { gpr } from "./gpr";
import { commandIntelligence } from "./command-intelligence";
import { surfaceDecide } from "./surface-decide";
import { aerialDecide } from "./aerial-decide";
import { surfaceDetectAcoustic } from "./surface-detect-acoustic";
import { generatedProducts } from "./generated";
import { heroImages } from "./hero-images";
import { FLAGS } from "../site";

/**
 * All product pages, keyed by canonical path. Each one is served by
 * src/app/[...productPath] and listed in the sitemap.
 *
 * - Hand-written pages (with diagrams / downloads) live next to this file.
 * - Pages imported from the client's Google Docs live in ./generated and are
 *   rebuilt by `node scripts/import-content.mjs`.
 *
 * Site-wide fixes (naming, breadcrumbs, titles, flags) are applied below rather
 * than in the generated files, so a re-import keeps them.
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

/** Page-specific SEO title fixes. */
const TITLE_OVERRIDES: Record<string, string> = {
  // The Surface page title said "aerial threat detection".
  "/surface/detect/optical-radar": "Optical radar | Surface | Rayonix",
};

const DOMAIN_LABEL: Record<ProductPageContent["domain"], string> = {
  subsurface: "Subsurface",
  surface: "Surface",
  aerial: "Aerial",
};
const STAGES = ["detect", "decide", "respond"] as const;

/** British spelling and the "Subsurface" name, applied to titles and labels. */
const fixNaming = (text: string) =>
  text
    .replace(/\bFiber\b/g, "Fibre")
    .replace(/\bfiber\b/g, "fibre")
    .replace(/\bSub[ -]Surface\b/g, "Subsurface");

/** Link the middle crumbs: domain → overview, stage → overview section. */
function linkBreadcrumbs(p: ProductPageContent): Breadcrumb[] {
  return p.breadcrumbs.map((crumb, i, all) => {
    const label = fixNaming(crumb.label);
    if (i === 0 || i === all.length - 1) return { ...crumb, label };
    const lower = label.toLowerCase();
    if (lower === DOMAIN_LABEL[p.domain].toLowerCase()) {
      return { label: DOMAIN_LABEL[p.domain], href: `/domains/${p.domain}`, linked: true };
    }
    const stage = STAGES.find((s) => s === lower);
    if (stage) return { label, href: `/domains/${p.domain}#${stage}`, linked: true };
    return { ...crumb, label };
  });
}

const HIDE_USE_CASES = new Set(
  FLAGS.SHOW_SURFACE_AERIAL_DECIDE_USE_CASES ? [] : ["/surface/decide", "/aerial/decide"]
);

export const products: ProductPageContent[] = allProducts.map((p) => {
  const withImage =
    p.hero.image || !heroImages[p.path] ? p : { ...p, hero: { ...p.hero, image: heroImages[p.path] } };
  return {
    ...withImage,
    // Surface and Aerial Decide are now live (their copied use cases are hidden instead).
    indexable: HIDE_USE_CASES.has(p.path) ? true : withImage.indexable,
    seo: {
      ...withImage.seo,
      title: fixNaming(TITLE_OVERRIDES[p.path] ?? withImage.seo.title),
    },
    breadcrumbs: linkBreadcrumbs(withImage),
    hero: {
      ...withImage.hero,
      title: fixNaming(withImage.hero.title),
      ariaLabel: fixNaming(withImage.hero.ariaLabel),
      eyebrow: fixNaming(withImage.hero.eyebrow),
    },
    hideUseCases: HIDE_USE_CASES.has(p.path) || withImage.hideUseCases,
  };
});

export function getProductByPath(path: string): ProductPageContent | undefined {
  return products.find((p) => p.path === path);
}

/** Slug used for ?product= on the Contact page, e.g. /surface/detect/lidar -> surface-detect-lidar. */
export function productSlug(p: ProductPageContent): string {
  return p.path.replace(/^\//, "").replace(/\//g, "-");
}

export type { ProductPageContent } from "./types";
