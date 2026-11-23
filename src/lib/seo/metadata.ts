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
