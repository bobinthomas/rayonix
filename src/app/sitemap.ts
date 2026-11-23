import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { solutions } from "@/content/solutions";
import { allArticles } from "@/content/company/newsroom";

const SITE_URL = "https://rayonix.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Core live pages
  const coreEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ecosystem/x-labs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
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
  const articleEntries: MetadataRoute.Sitemap = allArticles.map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
    lastModified: new Date(article.date),
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
