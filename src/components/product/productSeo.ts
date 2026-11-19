import type { Metadata } from "next";
import type { ProductPageContent } from "@/content/products/types";

// Matches the URLs product pages already publish. Note: src/lib/seo uses
// https://rayonix.com; the two should be unified once the domain is final.
const SITE_URL = "https://rayonix-site.pages.dev";

export function buildProductMetadata(content: ProductPageContent): Metadata {
  const { title, description } = content.seo;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${content.path}`,
      siteName: "Rayonix",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: content.path,
    },
  };
}

export function buildProductJsonLd(content: ProductPageContent) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: content.breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.label,
          item: `${SITE_URL}${crumb.href}`,
        })),
      },
      {
        "@type": "Product",
        name: content.schema.name,
        image: `${SITE_URL}${content.hero.image.src}`,
        description: content.schema.description,
        brand: {
          "@type": "Brand",
          name: "Rayonix",
        },
        additionalProperty: content.hero.specs.map((spec) => ({
          "@type": "PropertyValue",
          name: spec.label,
          value: spec.value,
        })),
      },
    ],
  };
}
