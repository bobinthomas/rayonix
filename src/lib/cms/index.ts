/**
 * CMS Data Access Layer
 *
 * In local development: reads from static TypeScript seed data.
 * In production: replace function bodies with Cloudflare D1 queries.
 *
 * All functions are async to maintain the same interface for both modes.
 */

import {
  pages,
  capabilities,
  stories,
  faqs,
  contacts,
  proofPoints,
  headerNav,
  footerNav,
  llmsContent,
} from "./content";

import type {
  PageSEO,
  Capability,
  Story,
  FAQ,
  OfficeContact,
  ProofPoint,
  NavItem,
  LLMsContent,
} from "./types";

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export async function getPageSEO(slug: string): Promise<PageSEO | undefined> {
  return pages.find((p) => p.slug === slug);
}

export async function getAllPages(): Promise<PageSEO[]> {
  return pages.filter((p) => p.indexable !== false);
}

// ---------------------------------------------------------------------------
// Capabilities
// ---------------------------------------------------------------------------

export async function getCapabilities(): Promise<Capability[]> {
  return [...capabilities].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCapabilityByDomain(
  domain: Capability["domain"]
): Promise<Capability | undefined> {
  return capabilities.find((c) => c.domain === domain);
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export async function getPublishedStories(): Promise<Story[]> {
  return [...stories].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getFeaturedStory(): Promise<Story | undefined> {
  return stories.find((s) => s.featured);
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  return stories.find((s) => s.slug === slug);
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export async function getFAQs(category?: string): Promise<FAQ[]> {
  const filtered = category
    ? faqs.filter((f) => f.category === category)
    : faqs;
  return [...filtered].sort((a, b) => a.sortOrder - b.sortOrder);
}

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------

export async function getContacts(): Promise<OfficeContact[]> {
  return contacts;
}

// ---------------------------------------------------------------------------
// Proof Points
// ---------------------------------------------------------------------------

export async function getProofPoints(): Promise<ProofPoint[]> {
  return [...proofPoints].sort((a, b) => a.sortOrder - b.sortOrder);
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export async function getHeaderNav(): Promise<NavItem[]> {
  return [...headerNav].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFooterNav(): Promise<NavItem[]> {
  return [...footerNav].sort((a, b) => a.sortOrder - b.sortOrder);
}

// ---------------------------------------------------------------------------
// LLMs.txt
// ---------------------------------------------------------------------------

export async function getLLMsContent(): Promise<LLMsContent[]> {
  return [...llmsContent].sort((a, b) => a.sortOrder - b.sortOrder);
}

// ---------------------------------------------------------------------------
// Newsroom, Blog & Careers (D1-backed in prod, in-memory fallback in dev)
// ---------------------------------------------------------------------------

import {
  listNews,
  getNewsBySlug,
  listBlogPosts,
  getBlogBySlug,
  listCareerRoles,
  toPublicNewsStory,
  toPublicBlogPost,
  toPublicRole,
} from "./store";
import type { NewsStory } from "@/content/news";
import type { BlogPost } from "@/content/company/blog";
import type { Role } from "@/content/careers";

export async function getPublishedNews(): Promise<NewsStory[]> {
  const rows = await listNews({ onlyPublished: true });
  return rows.map(toPublicNewsStory);
}

export async function getHomepageNews(): Promise<NewsStory[]> {
  const rows = await listNews({ onlyPublished: true, onlyHomepage: true });
  return rows.map(toPublicNewsStory);
}

export async function getPublishedNewsArticles(): Promise<NewsStory[]> {
  const rows = await listNews({ onlyPublished: true });
  return rows.filter((r) => r.kind === "announcement" && r.article).map(toPublicNewsStory);
}

export async function getNewsStoryBySlug(slug: string): Promise<NewsStory | undefined> {
  const row = await getNewsBySlug(slug);
  return row ? toPublicNewsStory(row) : undefined;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const rows = await listBlogPosts({ onlyPublished: true });
  return rows.map(toPublicBlogPost);
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const row = await getBlogBySlug(slug);
  if (!row || !row.published) return undefined;
  return toPublicBlogPost(row);
}

export async function getPublishedCareerRoles(): Promise<Role[]> {
  const rows = await listCareerRoles({ onlyPublished: true });
  return rows.map(toPublicRole);
}
