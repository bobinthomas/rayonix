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

export interface CmsNewsButton {
  label: string;
  href: string;
  external?: boolean;
}

export interface CmsNewsStory {
  id: number;
  slug: string;
  kind: "announcement" | "coverage";
  published: boolean;
  homepage: boolean;
  category: string;
  date: string | null;
  title: string;
  summary: string[];
  coverageUrl?: string | null;
  source?: string;
  buttons: CmsNewsButton[];
  image?: { src: string; alt: string };
  article?: {
    body: string[] | null;
    sourceLink?: { label: string; href: string };
    related: { label: string; href: string }[];
  };
  sortOrder: number;
  updatedAt?: string;
}

export interface CmsBlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
  coverImage?: string;
  published: boolean;
  updatedAt?: string;
}

export interface CmsCareerRole {
  id: number;
  title: string;
  team: string;
  location: string;
  type: string;
  description?: string;
  applyUrl: string;
  published: boolean;
  sortOrder: number;
  updatedAt?: string;
}

export interface SiteSettings {
  careersEmail: string;
  newsletterEmail: string;
  demoEmail: string;
  brochureEmail: string;
  contactEmail: string;
  ga4Id: string;
  gtmId: string;
  metaPixelId: string;
  clarityId: string;
  linkedinUrl: string;
  xUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
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
