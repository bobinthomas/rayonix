/**
 * Product / capability page content model.
 *
 * One object of this shape drives a full product page (hero, capability
 * tabs, technical repository, use cases, metadata and JSON-LD) through
 * <ProductPage />. Keep it plain, serialisable data: no JSX, no functions,
 * no Tailwind class names. That keeps the same shape usable as the CMS
 * schema later, and keeps content out of Tailwind's class scanning.
 */

export interface Breadcrumb {
  label: string;
  /** Path used in BreadcrumbList JSON-LD (e.g. "/subsurface/detect"). */
  href: string;
  /** Render as a visible link. Only "Home" is linked today. */
  linked?: boolean;
}

export interface ProductSpec {
  value: string;
  label: string;
  /** Red accent bar on the left edge (normally the first spec). */
  accent?: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
}

/**
 * One layer of a capability diagram: an SVG/image placed inside the
 * 140×140px diagram canvas. Offsets are in px; `centerX` centres the
 * layer horizontally (left: 50% + translateX(-50%)).
 */
export interface DiagramLayer {
  src: string;
  alt: string;
  width: number;
  height: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  centerX?: boolean;
}

export interface CapabilityTab {
  /** Stable id; also the URL hash that opens this tab (e.g. #imaging). */
  id: string;
  label: string;
  title: string;
  description: string;
  /** Optional illustration; the panel is text-only without one. */
  diagram?: DiagramLayer[];
}

export interface DownloadItem {
  title: string;
  subtitle: string;
  href: string;
  ctaLabel: string;
}

export interface UseCase {
  id: string;
  tag: string;
  title: string;
  description: string;
}

export interface ProductPageContent {
  /** Canonical path, e.g. "/subsurface/detect/gpr". */
  path: string;
  /**
   * Set false to serve the page with noindex and leave it out of the sitemap
   * (used while client copy is pending approval). Defaults to indexable.
   */
  indexable?: boolean;
  domain: "subsurface" | "surface" | "aerial";
  phase: "detect" | "decide" | "respond";

  seo: {
    title: string;
    description: string;
  };

  breadcrumbs: Breadcrumb[];

  hero: {
    ariaLabel: string;
    /** Page <h1>. Short names (e.g. "GPR") use the largest display size. */
    title: string;
    /** display: ≤ ~8 chars; long: one or two words; extended: full product names. */
    titleSize?: "display" | "long" | "extended";
    eyebrow: string;
    intro: string;
    /** Hero visual. Without one, a neutral placeholder panel is shown. */
    image?: ProductImage;
    /** Optional HUD labels overlaid on the hero image. */
    hud?: {
      coordinates: string;
      badge: string;
    };
    specs: ProductSpec[];
  };

  /** Capability tabs section. Omitted on pages without capability content. */
  capabilities?: {
    ariaLabel: string;
    heading: string;
    subheading?: string;
    tabs: CapabilityTab[];
  };

  repository?: {
    heading: string;
    description: string;
    items: DownloadItem[];
  };

  useCases: {
    heading: string;
    description?: string;
    items: UseCase[];
  };

  /**
   * JSON-LD. "Product" (default) emits specs as additionalProperty;
   * "Service" (software / C2 layers) emits capability tabs as an OfferCatalog.
   */
  schema: {
    type?: "Product" | "Service";
    name: string;
    description: string;
  };
}
