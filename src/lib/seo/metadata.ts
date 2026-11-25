/**
 * SEO Metadata Helpers
 *
 * Utility functions to generate Next.js Metadata objects from CMS data.
 */

import type { Metadata } from "next";
import type { PageSEO } from "@/lib/cms/types";

const SITE_URL = "https://rayonix.com";
const SITE_NAME = "Rayonix";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

/**
 * Clamps a description string to maxLen characters, truncating on a word boundary.
 */
export function clampDescription(text: string, maxLen = 155): string {
  if (!text || text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen - 3);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 100) {
    return truncated.slice(0, lastSpace) + "...";
  }
  return truncated.trim() + "...";
}

/**
 * Build a full Next.js Metadata object from CMS PageSEO data
 */
export function buildMetadata(page: PageSEO): Metadata {
  const canonicalUrl = page.canonical || `${SITE_URL}${page.slug}`;
  const ogImage = page.ogImage || DEFAULT_OG_IMAGE;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [
        ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`,
      ],
    },
    robots: page.indexable === false
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Metadata for a static page: title (the layout template adds the site suffix),
 * description, canonical and the default OG image.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = `${title} | Rayonix Defence Technologies`;
  return {
    title,
    description: clampDescription(description),
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_US",
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      title: fullTitle,
      description: clampDescription(description),
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Rayonix" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: clampDescription(description),
      images: [DEFAULT_OG_IMAGE],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export { DEFAULT_OG_IMAGE };
