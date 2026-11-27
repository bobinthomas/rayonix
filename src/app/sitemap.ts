import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { solutions } from "@/content/solutions";
import { getPublishedNewsArticles } from "@/lib/cms";

const SITE_URL = "https://rayonix.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Core live pages
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly"
  ) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency, priority });

  const coreEntries: MetadataRoute.Sitemap = [
    page("", 1.0, "weekly"),
    page("/about", 0.8),
    page("/capabilities", 0.8),
    page("/platforms", 0.8),
    page("/domains/subsurface", 0.8),
    page("/domains/surface", 0.8),
    page("/domains/aerial", 0.8),
    page("/solutions", 0.8),
    page("/ecosystem", 0.7),
    page("/ecosystem/x-labs", 0.7),
    page("/ecosystem/nexr-optronics", 0.7),
    page("/ecosystem/mcray-xtend", 0.7),
    page("/news", 0.7, "weekly"),
    page("/contact", 0.7),
    page("/careers", 0.6),
    page("/privacy", 0.3, "yearly"),
    page("/terms", 0.3, "yearly"),
  ];

  // Live product pages
  const productEntries: MetadataRoute.Sitemap = products.filter((product) => product.indexable !== false).map((product) => ({
    url: `${SITE_URL}${product.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Live solution pages
  const solutionEntries: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: `${SITE_URL}/solutions/${solution.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Real published newsroom articles
  const articles = await getPublishedNewsArticles();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
    ...(article.date && /^\d{4}-\d{2}-\d{2}$/.test(article.date) ? { lastModified: new Date(article.date) } : {}),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...coreEntries,
    ...productEntries,
    ...solutionEntries,
    ...articleEntries,
  ];
}
