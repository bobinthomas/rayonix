/**
 * JSON-LD Structured Data Components
 *
 * Reusable React Server Components injecting valid Schema.org JSON-LD
 * into the <head> via Next.js <script> tags.
 *
 * Schemas: Organization, WebSite, BreadcrumbList, Service, Article, FAQPage
 */

import type { FAQ } from "@/lib/cms/types";

const SITE_URL = "https://rayonix.com";
const ORG_NAME = "Rayonix Tech Private Limited";
const ORG_LEGAL = "Rayonix Tech Private Limited";

// ---------------------------------------------------------------------------
// Helper: inject JSON-LD <script>
// ---------------------------------------------------------------------------

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

// ---------------------------------------------------------------------------
// Organization Schema
// ---------------------------------------------------------------------------

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    legalName: ORG_LEGAL,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Integrated defence technology company delivering autonomous solutions across Subsurface, Surface, and Aerial operational domains.",
    foundingDate: "2024",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@rayonix.com",
        contactType: "general",
        areaServed: ["IN", "AU"],
        availableLanguage: "English",
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Kochi",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Sydney",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
    ],
    sameAs: ["https://linkedin.com/company/rayonix"],
    knowsAbout: [
      "Autonomous Underwater Vehicles",
      "Unmanned Surface Vehicles",
      "Unmanned Aerial Systems",
      "Defence Technology",
      "C4ISR",
      "Electronic Warfare",
    ],
  };

  return <JsonLdScript data={data} />;
}

// ---------------------------------------------------------------------------
// WebSite Schema (for sitelinks search box)
// ---------------------------------------------------------------------------

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rayonix",
    url: SITE_URL,
    description:
      "The Future of Defence Is Integrated. Autonomous systems across Subsurface, Surface, and Aerial domains.",
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
    },
  };

  return <JsonLdScript data={data} />;
}

// ---------------------------------------------------------------------------
// BreadcrumbList Schema
// ---------------------------------------------------------------------------

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `${SITE_URL}${item.href}`,
    })),
  };

  return <JsonLdScript data={data} />;
}

// ---------------------------------------------------------------------------
// Service Schema (for operational domains / solutions pages)
// ---------------------------------------------------------------------------

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export function ServiceSchema({
  name,
  description,
  url,
  category,
}: ServiceSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
    },
    ...(category && { category }),
    areaServed: {
      "@type": "GeoCircle",
      description: "Indo-Pacific",
    },
  };

  return <JsonLdScript data={data} />;
}

// ---------------------------------------------------------------------------
// Article Schema (for blog / news / insights)
// ---------------------------------------------------------------------------

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  authorName,
}: ArticleSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: authorName || ORG_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
      },
    }),
  };

  return <JsonLdScript data={data} />;
}

// ---------------------------------------------------------------------------
// FAQPage Schema
// ---------------------------------------------------------------------------

export function FAQPageSchema({ faqs }: { faqs: FAQ[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLdScript data={data} />;
}
