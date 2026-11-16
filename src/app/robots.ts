/**
 * Robots.txt
 *
 * Allows all crawlers; disallows admin routes.
 * Points to the auto-generated sitemap.
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: "https://rayonix.com/sitemap.xml",
  };
}
