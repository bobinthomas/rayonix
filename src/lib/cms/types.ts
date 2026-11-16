/**
 * CMS Content Types
 * Mirrors D1 schema — used by both static seed data and production D1 queries
 */

export interface PageSEO {
  slug: string;
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonldType?: string;
  indexable?: boolean;
  priority?: number;
}

export interface Capability {
  id: string;
  domain: "subsurface" | "surface" | "aerial";
  title: string;
  headline: string;
  description: string;
  specs: { label: string; value: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  sortOrder: number;
}

export interface Story {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  readTime: string;
  featured: boolean;
  publishedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
}

export interface OfficeContact {
  id: string;
  country: string;
  flagCode: string;
  entityName: string;
  cities: string;
  addressLines: string[];
  email: string;
  phone?: string;
}

export interface ProofPoint {
  id: string;
  metric: string;
  label: string;
  description: string;
  sortOrder: number;
}

export interface NavItem {
  id: string;
  location: "header" | "footer";
  parentId?: string;
  label: string;
  href: string;
  sortOrder: number;
  children?: NavItem[];
}

export interface LLMsContent {
  section: string;
  heading?: string;
  body: string;
  sortOrder: number;
}

/**
 * Full CMS content response for a page
 */
export interface CMSContent {
  pages: PageSEO[];
  capabilities: Capability[];
  stories: Story[];
  faqs: FAQ[];
  contacts: OfficeContact[];
  proofPoints: ProofPoint[];
  headerNav: NavItem[];
  footerNav: NavItem[];
  llmsContent: LLMsContent[];
}
