/**
 * Edge-safe CMS Store for Newsroom, Blog & Careers.
 *
 * - Uses Cloudflare D1 (`DB` binding) in production / `wrangler pages dev`.
 * - Falls back to an in-memory store seeded from static content modules in
 *   `next dev` or static build when `DB` is not bound.
 */

import { NEWS, type NewsStory } from "@/content/news";
import { blogPosts, type BlogPost } from "@/content/company/blog";
import { ROLES, type Role } from "@/content/careers";
import { CONTACT } from "@/content/site";
import { getD1 } from "./env";
import type { CmsBlogPost, CmsCareerRole, CmsNewsStory, SiteSettings } from "./types";

/* -------------------------------------------------------------------------- */
/* Local Dev In-Memory Fallback                                               */
/* -------------------------------------------------------------------------- */

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  careersEmail: "hr@rayonix.com",
  newsletterEmail: CONTACT.email,
  demoEmail: CONTACT.email,
  brochureEmail: CONTACT.email,
  contactEmail: CONTACT.email,
  ga4Id: "",
  gtmId: "",
  metaPixelId: "",
  clarityId: "",
  linkedinUrl: CONTACT.linkedin,
  xUrl: "",
  youtubeUrl: "",
  instagramUrl: "",
};

interface DevMediaItem {
  id: number;
  filename: string;
  contentType: string;
  sizeBytes: number;
  dataBase64: string;
}

interface DevCmsState {
  news: CmsNewsStory[];
  blog: CmsBlogPost[];
  roles: CmsCareerRole[];
  settings: SiteSettings;
  media: DevMediaItem[];
  nextId: number;
}

const globalForCms = globalThis as unknown as { __rayonixDevCms?: DevCmsState };

function getDevState(): DevCmsState {
  if (!globalForCms.__rayonixDevCms) {
    let id = 1;
    globalForCms.__rayonixDevCms = {
      news: NEWS.map((item, idx) => ({
        id: id++,
        slug: item.slug,
        kind: item.kind,
        published: item.published,
        homepage: Boolean(item.homepage),
        category: item.category,
        date: item.date,
        title: item.title,
        summary: [...item.summary],
        coverageUrl: item.coverageUrl ?? null,
        source: item.source,
        buttons: item.buttons.map((b) => ({ ...b })),
        image: item.image ? { ...item.image } : undefined,
        article: item.article
          ? {
              body: item.article.body ? [...item.article.body] : null,
              sourceLink: item.article.sourceLink ? { ...item.article.sourceLink } : undefined,
              related: item.article.related.map((r) => ({ ...r })),
            }
          : undefined,
        sortOrder: idx,
      })),
      blog: blogPosts.map((p) => ({
        id: id++,
        slug: p.slug,
        title: p.title,
        date: p.date,
        summary: p.summary,
        body: [...p.body],
        published: true,
      })),
      roles: ROLES.map((r, idx) => ({
        id: id++,
        title: r.title,
        team: r.team,
        location: r.location,
        type: r.type,
        applyUrl: r.applyUrl,
        published: true,
        sortOrder: idx,
      })),
      settings: { ...DEFAULT_SITE_SETTINGS },
      media: [],
      nextId: id,
    };
  }
  return globalForCms.__rayonixDevCms;
}

/* -------------------------------------------------------------------------- */
/* Row Mappers (D1 -> Domain Types)                                           */
/* -------------------------------------------------------------------------- */

function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

interface NewsRow {
  id: number;
  slug: string;
  kind: "announcement" | "coverage";
  published: number;
  homepage: number;
  category: string;
  published_date: string | null;
  title: string;
  summary_json: string;
  body_json: string | null;
  coverage_url: string | null;
  source: string | null;
  image_src: string | null;
  image_alt: string | null;
  buttons_json: string;
  source_link_json: string | null;
  related_json: string;
  sort_order: number;
  updated_at: string;
}

function mapNewsRow(row: NewsRow): CmsNewsStory {
  const body = row.body_json ? parseJson<string[] | null>(row.body_json, null) : null;
  const sourceLink = row.source_link_json
    ? parseJson<{ label: string; href: string } | undefined>(row.source_link_json, undefined)
    : undefined;
  const related = parseJson<{ label: string; href: string }[]>(row.related_json, []);

  return {
    id: row.id,
    slug: row.slug,
    kind: row.kind,
    published: row.published === 1,
    homepage: row.homepage === 1,
    category: row.category,
    date: row.published_date,
    title: row.title,
    summary: parseJson<string[]>(row.summary_json, []),
    coverageUrl: row.coverage_url,
    source: row.source ?? undefined,
    buttons: parseJson(row.buttons_json, []),
    image: row.image_src ? { src: row.image_src, alt: row.image_alt ?? row.title } : undefined,
    article:
      row.kind === "announcement"
        ? { body, sourceLink, related }
        : undefined,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  };
}

interface BlogRow {
  id: number;
  slug: string;
  title: string;
  published_date: string;
  summary: string;
  body_json: string;
  cover_image: string | null;
  published: number;
  updated_at: string;
}

function mapBlogRow(row: BlogRow): CmsBlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.published_date,
    summary: row.summary,
    body: parseJson<string[]>(row.body_json, []),
    coverImage: row.cover_image ?? undefined,
    published: row.published === 1,
    updatedAt: row.updated_at,
  };
}

interface RoleRow {
  id: number;
  title: string;
  team: string;
  location: string;
  type: string;
  description: string | null;
  apply_url: string;
  published: number;
  sort_order: number;
  updated_at: string;
}

function mapRoleRow(row: RoleRow): CmsCareerRole {
  return {
    id: row.id,
    title: row.title,
    team: row.team,
    location: row.location,
    type: row.type,
    description: row.description ?? undefined,
    applyUrl: row.apply_url,
    published: row.published === 1,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  };
}

export function toPublicNewsStory(s: CmsNewsStory): NewsStory {
  return {
    slug: s.slug,
    kind: s.kind,
    published: s.published,
    homepage: s.homepage,
    category: s.category,
    date: s.date,
    title: s.title,
    summary: s.summary,
    coverageUrl: s.coverageUrl,
    source: s.source,
    buttons: s.buttons,
    image: s.image,
    article: s.article,
  };
}

export function toPublicBlogPost(p: CmsBlogPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    summary: p.summary,
    body: p.body,
  };
}

export function toPublicRole(r: CmsCareerRole): Role {
  return {
    title: r.title,
    team: r.team,
    location: r.location,
    type: r.type,
    applyUrl: r.applyUrl,
  };
}

/* -------------------------------------------------------------------------- */
/* Newsroom Queries & Mutations                                               */
/* -------------------------------------------------------------------------- */

export async function listNews(opts?: { onlyPublished?: boolean; onlyHomepage?: boolean }): Promise<CmsNewsStory[]> {
  const db = getD1();
  if (!db) {
    let items = [...getDevState().news].sort((a, b) => a.sortOrder - b.sortOrder);
    if (opts?.onlyPublished) items = items.filter((n) => n.published);
    if (opts?.onlyHomepage) items = items.filter((n) => n.homepage);
    return items;
  }

  const clauses: string[] = [];
  if (opts?.onlyPublished) clauses.push("published = 1");
  if (opts?.onlyHomepage) clauses.push("homepage = 1");
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const res = await db
    .prepare(`SELECT * FROM news_stories ${where} ORDER BY sort_order ASC, published_date DESC, id DESC`)
    .all<NewsRow>();
  return (res.results ?? []).map(mapNewsRow);
}

export async function getNewsBySlug(slug: string): Promise<CmsNewsStory | null> {
  const db = getD1();
  if (!db) {
    return getDevState().news.find((n) => n.slug === slug) ?? null;
  }
  const row = await db.prepare("SELECT * FROM news_stories WHERE slug = ? LIMIT 1").bind(slug).first<NewsRow>();
  return row ? mapNewsRow(row) : null;
}

export async function getNewsById(id: number): Promise<CmsNewsStory | null> {
  const db = getD1();
  if (!db) {
    return getDevState().news.find((n) => n.id === id) ?? null;
  }
  const row = await db.prepare("SELECT * FROM news_stories WHERE id = ? LIMIT 1").bind(id).first<NewsRow>();
  return row ? mapNewsRow(row) : null;
}

export type NewsInput = Omit<CmsNewsStory, "id" | "updatedAt">;

export async function createNews(input: NewsInput): Promise<CmsNewsStory> {
  const db = getD1();
  if (!db) {
    const state = getDevState();
    const created: CmsNewsStory = { ...input, id: state.nextId++, updatedAt: new Date().toISOString() };
    state.news.unshift(created);
    return created;
  }

  const res = await db
    .prepare(
      `INSERT INTO news_stories (
        slug, kind, published, homepage, category, published_date, title,
        summary_json, body_json, coverage_url, source, image_src, image_alt,
        buttons_json, source_link_json, related_json, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      input.slug,
      input.kind,
      input.published ? 1 : 0,
      input.homepage ? 1 : 0,
      input.category,
      input.date,
      input.title,
      JSON.stringify(input.summary),
      input.article?.body ? JSON.stringify(input.article.body) : null,
      input.coverageUrl ?? null,
      input.source ?? null,
      input.image?.src ?? null,
      input.image?.alt ?? null,
      JSON.stringify(input.buttons),
      input.article?.sourceLink ? JSON.stringify(input.article.sourceLink) : null,
      JSON.stringify(input.article?.related ?? []),
      input.sortOrder
    )
    .run();

  const id = Number(res.meta?.last_row_id ?? 0);
  const created = await getNewsById(id);
  if (!created) throw new Error("Failed to read created news story");
  return created;
}

export async function updateNews(id: number, input: Partial<NewsInput>): Promise<CmsNewsStory | null> {
  const existing = await getNewsById(id);
  if (!existing) return null;

  const merged: NewsInput = {
    ...existing,
    ...input,
    summary: input.summary ?? existing.summary,
    buttons: input.buttons ?? existing.buttons,
    article: input.article !== undefined ? input.article : existing.article,
    image: input.image !== undefined ? input.image : existing.image,
  };

  const db = getD1();
  if (!db) {
    const state = getDevState();
    const idx = state.news.findIndex((n) => n.id === id);
    if (idx === -1) return null;
    state.news[idx] = { ...merged, id, updatedAt: new Date().toISOString() };
    return state.news[idx];
  }

  await db
    .prepare(
      `UPDATE news_stories SET
        slug = ?, kind = ?, published = ?, homepage = ?, category = ?, published_date = ?, title = ?,
        summary_json = ?, body_json = ?, coverage_url = ?, source = ?, image_src = ?, image_alt = ?,
        buttons_json = ?, source_link_json = ?, related_json = ?, sort_order = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .bind(
      merged.slug,
      merged.kind,
      merged.published ? 1 : 0,
      merged.homepage ? 1 : 0,
      merged.category,
      merged.date,
      merged.title,
      JSON.stringify(merged.summary),
      merged.article?.body ? JSON.stringify(merged.article.body) : null,
      merged.coverageUrl ?? null,
      merged.source ?? null,
      merged.image?.src ?? null,
      merged.image?.alt ?? null,
      JSON.stringify(merged.buttons),
      merged.article?.sourceLink ? JSON.stringify(merged.article.sourceLink) : null,
      JSON.stringify(merged.article?.related ?? []),
      merged.sortOrder,
      id
    )
    .run();

  return getNewsById(id);
}

export async function deleteNews(id: number): Promise<boolean> {
  const db = getD1();
  if (!db) {
    const state = getDevState();
    const before = state.news.length;
    state.news = state.news.filter((n) => n.id !== id);
    return state.news.length < before;
  }
  const res = await db.prepare("DELETE FROM news_stories WHERE id = ?").bind(id).run();
  return (res.meta?.changes ?? 0) > 0;
}

/* -------------------------------------------------------------------------- */
/* Blog Queries & Mutations                                                   */
/* -------------------------------------------------------------------------- */

export async function listBlogPosts(opts?: { onlyPublished?: boolean }): Promise<CmsBlogPost[]> {
  const db = getD1();
  if (!db) {
    let items = [...getDevState().blog].sort((a, b) => b.date.localeCompare(a.date));
    if (opts?.onlyPublished) items = items.filter((p) => p.published);
    return items;
  }

  const where = opts?.onlyPublished ? "WHERE published = 1" : "";
  const res = await db
    .prepare(`SELECT * FROM blog_posts ${where} ORDER BY published_date DESC, id DESC`)
    .all<BlogRow>();
  return (res.results ?? []).map(mapBlogRow);
}

export async function getBlogBySlug(slug: string): Promise<CmsBlogPost | null> {
  const db = getD1();
  if (!db) {
    return getDevState().blog.find((p) => p.slug === slug) ?? null;
  }
  const row = await db.prepare("SELECT * FROM blog_posts WHERE slug = ? LIMIT 1").bind(slug).first<BlogRow>();
  return row ? mapBlogRow(row) : null;
}

export async function getBlogById(id: number): Promise<CmsBlogPost | null> {
  const db = getD1();
  if (!db) {
    return getDevState().blog.find((p) => p.id === id) ?? null;
  }
  const row = await db.prepare("SELECT * FROM blog_posts WHERE id = ? LIMIT 1").bind(id).first<BlogRow>();
  return row ? mapBlogRow(row) : null;
}

export type BlogInput = Omit<CmsBlogPost, "id" | "updatedAt">;

export async function createBlogPost(input: BlogInput): Promise<CmsBlogPost> {
  const db = getD1();
  if (!db) {
    const state = getDevState();
    const created: CmsBlogPost = { ...input, id: state.nextId++, updatedAt: new Date().toISOString() };
    state.blog.unshift(created);
    return created;
  }

  const res = await db
    .prepare(
      `INSERT INTO blog_posts (slug, title, published_date, summary, body_json, cover_image, published)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      input.slug,
      input.title,
      input.date,
      input.summary,
      JSON.stringify(input.body),
      input.coverImage ?? null,
      input.published ? 1 : 0
    )
    .run();

  const id = Number(res.meta?.last_row_id ?? 0);
  const created = await getBlogById(id);
  if (!created) throw new Error("Failed to read created blog post");
  return created;
}

export async function updateBlogPost(id: number, input: Partial<BlogInput>): Promise<CmsBlogPost | null> {
  const existing = await getBlogById(id);
  if (!existing) return null;

  const merged: BlogInput = {
    ...existing,
    ...input,
    body: input.body ?? existing.body,
  };

  const db = getD1();
  if (!db) {
    const state = getDevState();
    const idx = state.blog.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    state.blog[idx] = { ...merged, id, updatedAt: new Date().toISOString() };
    return state.blog[idx];
  }

  await db
    .prepare(
      `UPDATE blog_posts SET
        slug = ?, title = ?, published_date = ?, summary = ?, body_json = ?,
        cover_image = ?, published = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .bind(
      merged.slug,
      merged.title,
      merged.date,
      merged.summary,
      JSON.stringify(merged.body),
      merged.coverImage ?? null,
      merged.published ? 1 : 0,
      id
    )
    .run();

  return getBlogById(id);
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  const db = getD1();
  if (!db) {
    const state = getDevState();
    const before = state.blog.length;
    state.blog = state.blog.filter((p) => p.id !== id);
    return state.blog.length < before;
  }
  const res = await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();
  return (res.meta?.changes ?? 0) > 0;
}

/* -------------------------------------------------------------------------- */
/* Careers Roles Queries & Mutations                                          */
/* -------------------------------------------------------------------------- */

export async function listCareerRoles(opts?: { onlyPublished?: boolean }): Promise<CmsCareerRole[]> {
  const db = getD1();
  if (!db) {
    let items = [...getDevState().roles].sort((a, b) => a.sortOrder - b.sortOrder);
    if (opts?.onlyPublished) items = items.filter((r) => r.published);
    return items;
  }

  const where = opts?.onlyPublished ? "WHERE published = 1" : "";
  const res = await db
    .prepare(`SELECT * FROM career_roles ${where} ORDER BY sort_order ASC, id DESC`)
    .all<RoleRow>();
  return (res.results ?? []).map(mapRoleRow);
}

export async function getCareerRoleById(id: number): Promise<CmsCareerRole | null> {
  const db = getD1();
  if (!db) {
    return getDevState().roles.find((r) => r.id === id) ?? null;
  }
  const row = await db.prepare("SELECT * FROM career_roles WHERE id = ? LIMIT 1").bind(id).first<RoleRow>();
  return row ? mapRoleRow(row) : null;
}

export type CareerRoleInput = Omit<CmsCareerRole, "id" | "updatedAt">;

export async function createCareerRole(input: CareerRoleInput): Promise<CmsCareerRole> {
  const db = getD1();
  if (!db) {
    const state = getDevState();
    const created: CmsCareerRole = { ...input, id: state.nextId++, updatedAt: new Date().toISOString() };
    state.roles.push(created);
    return created;
  }

  const res = await db
    .prepare(
      `INSERT INTO career_roles (title, team, location, type, description, apply_url, published, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      input.title,
      input.team,
      input.location,
      input.type,
      input.description ?? null,
      input.applyUrl,
      input.published ? 1 : 0,
      input.sortOrder
    )
    .run();

  const id = Number(res.meta?.last_row_id ?? 0);
  const created = await getCareerRoleById(id);
  if (!created) throw new Error("Failed to read created career role");
  return created;
}

export async function updateCareerRole(id: number, input: Partial<CareerRoleInput>): Promise<CmsCareerRole | null> {
  const existing = await getCareerRoleById(id);
  if (!existing) return null;

  const merged: CareerRoleInput = { ...existing, ...input };

  const db = getD1();
  if (!db) {
    const state = getDevState();
    const idx = state.roles.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    state.roles[idx] = { ...merged, id, updatedAt: new Date().toISOString() };
    return state.roles[idx];
  }

  await db
    .prepare(
      `UPDATE career_roles SET
        title = ?, team = ?, location = ?, type = ?, description = ?,
        apply_url = ?, published = ?, sort_order = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .bind(
      merged.title,
      merged.team,
      merged.location,
      merged.type,
      merged.description ?? null,
      merged.applyUrl,
      merged.published ? 1 : 0,
      merged.sortOrder,
      id
    )
    .run();

  return getCareerRoleById(id);
}

export async function deleteCareerRole(id: number): Promise<boolean> {
  const db = getD1();
  if (!db) {
    const state = getDevState();
    const before = state.roles.length;
    state.roles = state.roles.filter((r) => r.id !== id);
    return state.roles.length < before;
  }
  const res = await db.prepare("DELETE FROM career_roles WHERE id = ?").bind(id).run();
  return (res.meta?.changes ?? 0) > 0;
}

/* -------------------------------------------------------------------------- */
/* Site Settings                                                              */
/* -------------------------------------------------------------------------- */

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = getD1();
  if (!db) {
    return { ...getDevState().settings };
  }

  try {
    const res = await db.prepare("SELECT key, value FROM site_settings").all<{ key: string; value: string }>();
    const merged: SiteSettings = { ...DEFAULT_SITE_SETTINGS };
    for (const row of res.results ?? []) {
      if (row.key in merged) {
        (merged as unknown as Record<string, string>)[row.key] = row.value;
      }
    }
    return merged;
  } catch {
    return { ...DEFAULT_SITE_SETTINGS };
  }
}

export async function updateSiteSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const next: SiteSettings = { ...current };
  for (const key of Object.keys(DEFAULT_SITE_SETTINGS) as (keyof SiteSettings)[]) {
    if (typeof patch[key] === "string") {
      next[key] = patch[key]!.trim();
    }
  }

  const db = getD1();
  if (!db) {
    getDevState().settings = next;
    return next;
  }

  const stmts = (Object.keys(DEFAULT_SITE_SETTINGS) as (keyof SiteSettings)[]).map((key) =>
    db
      .prepare(
        `INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
      )
      .bind(key, next[key])
  );
  await db.batch(stmts);
  return next;
}

/* -------------------------------------------------------------------------- */
/* Free-Plan D1 Media Assets                                                  */
/* -------------------------------------------------------------------------- */

export async function saveMediaAsset(input: {
  filename: string;
  contentType: string;
  sizeBytes: number;
  dataBase64: string;
}): Promise<{ id: number; url: string }> {
  const db = getD1();
  if (!db) {
    const state = getDevState();
    const id = state.nextId++;
    state.media.push({ id, ...input });
    return { id, url: `/api/media/d1/${id}` };
  }

  const res = await db
    .prepare("INSERT INTO media_assets (filename, content_type, size_bytes, data_base64) VALUES (?, ?, ?, ?)")
    .bind(input.filename, input.contentType, input.sizeBytes, input.dataBase64)
    .run();
  const id = Number(res.meta?.last_row_id ?? 0);
  return { id, url: `/api/media/d1/${id}` };
}

export async function getMediaAsset(id: number): Promise<DevMediaItem | null> {
  const db = getD1();
  if (!db) {
    return getDevState().media.find((m) => m.id === id) ?? null;
  }
  const row = await db
    .prepare("SELECT id, filename, content_type, size_bytes, data_base64 FROM media_assets WHERE id = ? LIMIT 1")
    .bind(id)
    .first<{ id: number; filename: string; content_type: string; size_bytes: number; data_base64: string }>();
  if (!row) return null;
  return {
    id: row.id,
    filename: row.filename,
    contentType: row.content_type,
    sizeBytes: row.size_bytes,
    dataBase64: row.data_base64,
  };
}
