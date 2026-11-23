import type { Metadata } from "next";
import type { SolutionPageContent } from "@/content/solutions/types";
import { clampDescription } from "@/lib/seo/metadata";

// Same base as product pages (see components/product/productSeo.ts).
const SITE_URL = "https://rayonix-site.pages.dev";

const pathOf = (c: SolutionPageContent) => `/solutions/${c.slug}`;

export function buildSolutionMetadata(content: SolutionPageContent): Metadata {
  const { title, description } = content.seo;
  const clampedDesc = clampDescription(description);
  return {
    title: { absolute: title },
    description: clampedDesc,
    openGraph: {
      title,
      description: clampedDesc,
      url: `${SITE_URL}${pathOf(content)}`,
      siteName: "Rayonix",
      locale: "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description: clampedDesc },
    alternates: { canonical: pathOf(content) },
  };
}

export function buildSolutionJsonLd(content: SolutionPageContent) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: content.name, href: pathOf(content) },
        ].map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: c.name,
          item: `${SITE_URL}${c.href}`,
        })),
      },
      {
        "@type": "Service",
        name: content.hero.eyebrow,
        description: content.hero.intro,
        ...(content.hero.image && { image: `${SITE_URL}${content.hero.image.src}` }),
        provider: { "@type": "Organization", name: "Rayonix", url: SITE_URL },
        category: content.category,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Key Capabilities",
          itemListElement: content.capabilities.items.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item.title, description: item.body },
          })),
        },
      },
    ],
  };
}
