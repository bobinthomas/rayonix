/**
 * Dynamic Sitemap
 *
 * Auto-generates sitemap.xml from CMS page data.
 * Synced with all published pages and dynamic content.
 */

import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/cms";
import { getPublishedStories } from "@/lib/cms";
import { products } from "@/content/products";

const SITE_URL = "https://rayonix.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages from CMS
  const pages = await getAllPages();
  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${SITE_URL}${page.slug === "/" ? "" : page.slug}`,
    lastModified: new Date(),
    changeFrequency: page.slug === "/" ? "weekly" : "monthly",
    priority: page.priority ?? 0.5,
  }));

  // Dynamic story/news pages
  const stories = await getPublishedStories();
  const storyEntries: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${SITE_URL}/news/${story.slug}`,
    lastModified: new Date(story.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Domain pages
  const domainEntries: MetadataRoute.Sitemap = [
    "subsurface",
    "surface",
    "aerial",
  ].map((domain) => ({
    url: `${SITE_URL}/domains/${domain}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Product / capability pages from src/content/products
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}${product.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pageEntries, ...domainEntries, ...productEntries, ...storyEntries];
}
