/**
 * Core Types for Rayonix Corporate Platform
 */

export type OperationalDomain = "subsurface" | "surface" | "aerial";

export interface DomainMeta {
  id: OperationalDomain;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    description?: string;
    href: string;
  }[];
}

export interface ProofPoint {
  id: string;
  metric: string;
  label: string;
  description: string;
}

export interface CapabilityCard {
  id: string;
  domain: OperationalDomain;
  title: string;
  headline: string;
  description: string;
  specs: { label: string; value: string }[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface OfficeContact {
  country: string;
  flagCode: string;
  entityName: string;
  cities: string;
  addressLines: string[];
  email: string;
  phone?: string;
}

export interface ArticleOrStory {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  featured?: boolean;
}
