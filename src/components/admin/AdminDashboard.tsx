"use client";

import { useCallback, useEffect, useState } from "react";
import type { CmsBlogPost, CmsCareerRole, CmsNewsStory } from "@/lib/cms/types";

type Tab = "news" | "blog" | "careers";

interface SessionInfo {
  authenticated: boolean;
  storage: "d1" | "memory";
  mediaBucket: boolean;
}

const inputCls =
  "w-full bg-[#080f12] border border-[#253035] rounded-[4px] px-3 py-2 text-[14px] text-[#f5f6f6] placeholder:text-[#7f8a91] focus:outline-none focus:border-[#e22328]";
const labelCls = "block text-[11px] font-mono uppercase tracking-wider text-[#bdc4c8] mb-1.5";
const btnPrimary =
  "inline-flex items-center justify-center bg-[#e22328] hover:bg-[#b81b20] text-white text-[13px] font-medium px-4 py-2 rounded-[4px] transition-colors disabled:opacity-50";
const btnGhost =
  "inline-flex items-center justify-center border border-[#253035] hover:border-[#7f8a91] text-[#f5f6f6] text-[13px] font-medium px-3 py-1.5 rounded-[4px] transition-colors";

export default function AdminDashboard() {
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [tab, setTab] = useState<Tab>("news");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const [news, setNews] = useState<CmsNewsStory[]>([]);
  const [blog, setBlog] = useState<CmsBlogPost[]>([]);
  const [roles, setRoles] = useState<CmsCareerRole[]>([]);

  const loadSession = useCallback(async () => {
    const res = await fetch("/api/admin/auth/session", { cache: "no-store" });
    const data = (await res.json()) as SessionInfo;
    setSession(data);
  }, []);

  const loadAllContent = useCallback(async () => {
    const [nRes, bRes, cRes] = await Promise.all([
      fetch("/api/admin/news", { cache: "no-store" }),
      fetch("/api/admin/blog", { cache: "no-store" }),
      fetch("/api/admin/careers", { cache: "no-store" }),
    ]);
    if (nRes.ok) setNews(((await nRes.json()) as { items: CmsNewsStory[] }).items);
    if (bRes.ok) setBlog(((await bRes.json()) as { items: CmsBlogPost[] }).items);
    if (cRes.ok) setRoles(((await cRes.json()) as { items: CmsCareerRole[] }).items);
  }, []);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (session?.authenticated) {
      void loadAllContent();
    }
  }, [session?.authenticated, loadAllContent]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setAuthError(data.error ?? "Authentication failed.");
      } else {
        setPassword("");
        await loadSession();
      }
    } catch {
      setAuthError("Network error during login.");
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    setSession((prev) => (prev ? { ...prev, authenticated: false } : null));
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#080f12] text-[#f5f6f6] flex items-center justify-center px-6 pt-28 pb-16">
        <p className="font-mono text-[13px] text-[#7f8a91]">Checking session…</p>
      </main>
    );
  }

  if (!session.authenticated) {
    return (
      <main className="min-h-screen bg-[#080f12] text-[#f5f6f6] flex items-center justify-center px-6 pt-28 pb-16">
        <div className="w-full max-w-[420px] bg-[#10181c] border border-[#253035] rounded-[4px] p-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#e22328] mb-2">
            Rayonix CMS
          </p>
          <h1 className="type-h3 text-[#f5f6f6] mb-2">Admin Sign In</h1>
          <p className="text-[13px] text-[#bdc4c8] mb-6">
            Enter your administrator password to manage Newsroom, Blog, and Careers.
          </p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label htmlFor="admin-password" className={labelCls}>
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter strong admin password"
                className={inputCls}
              />
            </div>
            {authError && (
              <p className="text-[13px] text-[#f0494d] bg-[#e22328]/10 border border-[#e22328]/30 rounded-[4px] px-3 py-2">
                {authError}
              </p>
            )}
            <button type="submit" disabled={authLoading} className={btnPrimary}>
              {authLoading ? "Verifying…" : "Sign In"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080f12] text-[#f5f6f6] pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#253035] pb-6 mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#e22328]">
              Rayonix Backend CMS
            </p>
            <h1 className="type-h2 text-[#f5f6f6] mt-1">Content Manager</h1>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-[4px] bg-[#10181c] border border-[#253035] text-[#bdc4c8]">
              DB: {session.storage === "d1" ? "Cloudflare D1" : "Local Dev Memory"}
            </span>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-[4px] bg-[#10181c] border border-[#253035] text-[#bdc4c8]">
              R2: {session.mediaBucket ? "Connected" : "URL Mode"}
            </span>
            <button type="button" onClick={handleLogout} className={btnGhost}>
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8 border-b border-[#253035]">
          {(
            [
              { id: "news", label: `Newsroom (${news.length})` },
              { id: "blog", label: `Blog (${blog.length})` },
              { id: "careers", label: `Careers (${roles.length})` },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id);
                setStatusMsg(null);
              }}
              className={`px-4 py-2.5 text-[14px] font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "border-[#e22328] text-[#f5f6f6]"
                  : "border-transparent text-[#7f8a91] hover:text-[#bdc4c8]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {statusMsg && (
          <div className="mb-6 px-4 py-2.5 rounded-[4px] bg-[#10181c] border border-[#253035] text-[13px] text-[#bdc4c8] flex items-center justify-between">
            <span>{statusMsg}</span>
            <button type="button" onClick={() => setStatusMsg(null)} className="text-[#7f8a91] hover:text-white">
              Dismiss
            </button>
          </div>
        )}

        {tab === "news" && (
          <NewsManager
            items={news}
            hasR2={session.mediaBucket}
            onSaved={async (msg) => {
              setStatusMsg(msg);
              await loadAllContent();
            }}
          />
        )}

        {tab === "blog" && (
          <BlogManager
            items={blog}
            onSaved={async (msg) => {
              setStatusMsg(msg);
              await loadAllContent();
            }}
          />
        )}

        {tab === "careers" && (
          <CareersManager
            items={roles}
            onSaved={async (msg) => {
              setStatusMsg(msg);
              await loadAllContent();
            }}
          />
        )}
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Newsroom Manager                                                           */
/* -------------------------------------------------------------------------- */

function NewsManager({
  items,
  hasR2,
  onSaved,
}: {
  items: CmsNewsStory[];
  hasR2: boolean;
  onSaved: (msg: string) => Promise<void>;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [slug, setSlug] = useState("");
  const [kind, setKind] = useState<"announcement" | "coverage">("announcement");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("DEFENCE TECHNOLOGY");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [summaryText, setSummaryText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [source, setSource] = useState("");
  const [coverageUrl, setCoverageUrl] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [published, setPublished] = useState(true);
  const [homepage, setHomepage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function resetForm() {
    setEditingId(null);
    setSlug("");
    setKind("announcement");
    setTitle("");
    setCategory("DEFENCE TECHNOLOGY");
    setDate(new Date().toISOString().slice(0, 10));
    setSummaryText("");
    setBodyText("");
    setSource("");
    setCoverageUrl("");
    setImageSrc("");
    setPublished(true);
    setHomepage(false);
    setErr(null);
  }

  function startEdit(s: CmsNewsStory) {
    setEditingId(s.id);
    setSlug(s.slug);
    setKind(s.kind);
    setTitle(s.title);
    setCategory(s.category);
    setDate(s.date ?? "");
    setSummaryText(s.summary.join("\n\n"));
    setBodyText(s.article?.body?.join("\n\n") ?? "");
    setSource(s.source ?? "");
    setCoverageUrl(s.coverageUrl ?? "");
    setImageSrc(s.image?.src ?? "");
    setPublished(s.published);
    setHomepage(s.homepage);
    setErr(null);
  }

  async function handleImageUpload(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/media", { method: "POST", body: fd });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok) {
      setErr(data.error ?? "Upload failed.");
    } else if (data.url) {
      setImageSrc(data.url);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    const summary = summaryText.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    const body = bodyText.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

    const payload = {
      slug,
      kind,
      title,
      category,
      date: date || null,
      summary,
      source: source || undefined,
      coverageUrl: coverageUrl || null,
      image: imageSrc ? { src: imageSrc, alt: title } : undefined,
      buttons:
        kind === "announcement"
          ? [{ label: "Read Full Story", href: `/news/${slug}` }]
          : coverageUrl
            ? [{ label: "Read Coverage", href: coverageUrl, external: true }]
            : [],
      article: kind === "announcement" ? { body: body.length ? body : null, related: [] } : undefined,
      published,
      homepage,
      sortOrder: 0,
    };

    try {
      const res = await fetch(editingId ? `/api/admin/news/${editingId}` : "/api/admin/news", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setErr(data.error ?? "Save failed.");
      } else {
        resetForm();
        await onSaved(editingId ? "News story updated and revalidated." : "News story created and revalidated.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (editingId === id) resetForm();
      await onSaved("News story deleted.");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-5 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 flex flex-col gap-4 h-fit">
        <div className="flex items-center justify-between">
          <h2 className="type-h4 text-[#f5f6f6]">{editingId ? "Edit Story" : "New Newsroom Story"}</h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-[12px] text-[#7f8a91] hover:text-white">
              Cancel edit
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Kind</label>
            <select value={kind} onChange={(e) => setKind(e.target.value as "announcement" | "coverage")} className={inputCls}>
              <option value="announcement">Announcement</option>
              <option value="coverage">Media Coverage</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Date (YYYY-MM-DD)</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="2026-11-27" className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Title</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Slug</label>
            <input required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-story-slug" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <input required value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls} />
          </div>
        </div>
        {kind === "coverage" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Publisher</label>
              <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Times of India" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Coverage URL</label>
              <input value={coverageUrl} onChange={(e) => setCoverageUrl(e.target.value)} placeholder="https://..." className={inputCls} />
            </div>
          </div>
        )}
        <div>
          <label className={labelCls}>Cover Image URL</label>
          <div className="flex gap-2">
            <input value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} placeholder="/images/..." className={inputCls} />
            {hasR2 && (
              <label className={`${btnGhost} cursor-pointer shrink-0`}>
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void handleImageUpload(f);
                  }}
                />
              </label>
            )}
          </div>
        </div>
        <div>
          <label className={labelCls}>Summary (separate paragraphs with blank line)</label>
          <textarea rows={3} value={summaryText} onChange={(e) => setSummaryText(e.target.value)} className={inputCls} />
        </div>
        {kind === "announcement" && (
          <div>
            <label className={labelCls}>Article Body (optional, blank line per paragraph)</label>
            <textarea rows={4} value={bodyText} onChange={(e) => setBodyText(e.target.value)} className={inputCls} />
          </div>
        )}
        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2 text-[13px] text-[#bdc4c8]">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            Published
          </label>
          <label className="inline-flex items-center gap-2 text-[13px] text-[#bdc4c8]">
            <input type="checkbox" checked={homepage} onChange={(e) => setHomepage(e.target.checked)} />
            Feature on Homepage
          </label>
        </div>
        {err && <p className="text-[13px] text-[#f0494d]">{err}</p>}
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Saving…" : editingId ? "Update Story" : "Create Story"}
        </button>
      </form>

      <div className="lg:col-span-7 flex flex-col gap-3">
        {items.map((s) => (
          <div key={s.id} className="bg-[#10181c] border border-[#253035] rounded-[4px] p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded-[2px] ${s.published ? "bg-emerald-500/15 text-emerald-300" : "bg-zinc-700/40 text-zinc-400"}`}>
                  {s.published ? "PUBLISHED" : "DRAFT"}
                </span>
                <span className="font-mono text-[10px] uppercase text-[#7f8a91]">{s.kind}</span>
                {s.homepage && <span className="font-mono text-[10px] text-[#e22328]">HOMEPAGE</span>}
                {s.date && <span className="font-mono text-[10px] text-[#7f8a91]">{s.date}</span>}
              </div>
              <h3 className="text-[15px] font-medium text-[#f5f6f6] truncate">{s.title}</h3>
              <p className="font-mono text-[11px] text-[#7f8a91] mt-0.5">/news/{s.slug}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button type="button" onClick={() => startEdit(s)} className={btnGhost}>
                Edit
              </button>
              <button type="button" onClick={() => void handleDelete(s.id)} className={`${btnGhost} text-[#f0494d]`}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Blog Manager                                                               */
/* -------------------------------------------------------------------------- */

function BlogManager({
  items,
  onSaved,
}: {
  items: CmsBlogPost[];
  onSaved: (msg: string) => Promise<void>;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [summary, setSummary] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function resetForm() {
    setEditingId(null);
    setSlug("");
    setTitle("");
    setDate(new Date().toISOString().slice(0, 10));
    setSummary("");
    setBodyText("");
    setPublished(true);
    setErr(null);
  }

  function startEdit(p: CmsBlogPost) {
    setEditingId(p.id);
    setSlug(p.slug);
    setTitle(p.title);
    setDate(p.date);
    setSummary(p.summary);
    setBodyText(p.body.join("\n\n"));
    setPublished(p.published);
    setErr(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    const body = bodyText.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

    try {
      const res = await fetch(editingId ? `/api/admin/blog/${editingId}` : "/api/admin/blog", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title, date, summary, body, published }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setErr(data.error ?? "Save failed.");
      } else {
        resetForm();
        await onSaved(editingId ? "Blog post updated and revalidated." : "Blog post created and revalidated.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (editingId === id) resetForm();
      await onSaved("Blog post deleted.");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-5 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 flex flex-col gap-4 h-fit">
        <div className="flex items-center justify-between">
          <h2 className="type-h4 text-[#f5f6f6]">{editingId ? "Edit Blog Post" : "New Blog Post"}</h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-[12px] text-[#7f8a91] hover:text-white">
              Cancel edit
            </button>
          )}
        </div>
        <div>
          <label className={labelCls}>Title</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Slug</label>
            <input required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="article-slug" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Date (YYYY-MM-DD)</label>
            <input required value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Summary</label>
          <textarea required rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Body (separate paragraphs with blank line)</label>
          <textarea rows={6} value={bodyText} onChange={(e) => setBodyText(e.target.value)} className={inputCls} />
        </div>
        <label className="inline-flex items-center gap-2 text-[13px] text-[#bdc4c8]">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Published
        </label>
        {err && <p className="text-[13px] text-[#f0494d]">{err}</p>}
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Saving…" : editingId ? "Update Post" : "Create Post"}
        </button>
      </form>

      <div className="lg:col-span-7 flex flex-col gap-3">
        {items.map((p) => (
          <div key={p.id} className="bg-[#10181c] border border-[#253035] rounded-[4px] p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded-[2px] ${p.published ? "bg-emerald-500/15 text-emerald-300" : "bg-zinc-700/40 text-zinc-400"}`}>
                  {p.published ? "PUBLISHED" : "DRAFT"}
                </span>
                <span className="font-mono text-[10px] text-[#7f8a91]">{p.date}</span>
              </div>
              <h3 className="text-[15px] font-medium text-[#f5f6f6] truncate">{p.title}</h3>
              <p className="font-mono text-[11px] text-[#7f8a91] mt-0.5">/blog/{p.slug}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button type="button" onClick={() => startEdit(p)} className={btnGhost}>
                Edit
              </button>
              <button type="button" onClick={() => void handleDelete(p.id)} className={`${btnGhost} text-[#f0494d]`}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Careers Manager                                                            */
/* -------------------------------------------------------------------------- */

function CareersManager({
  items,
  onSaved,
}: {
  items: CmsCareerRole[];
  onSaved: (msg: string) => Promise<void>;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const [location, setLocation] = useState("Gurugram, India");
  const [type, setType] = useState("Full-time");
  const [applyUrl, setApplyUrl] = useState("/contact?subject=careers");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setTeam("");
    setLocation("Gurugram, India");
    setType("Full-time");
    setApplyUrl("/contact?subject=careers");
    setPublished(true);
    setErr(null);
  }

  function startEdit(r: CmsCareerRole) {
    setEditingId(r.id);
    setTitle(r.title);
    setTeam(r.team);
    setLocation(r.location);
    setType(r.type);
    setApplyUrl(r.applyUrl);
    setPublished(r.published);
    setErr(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(editingId ? `/api/admin/careers/${editingId}` : "/api/admin/careers", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, team, location, type, applyUrl, published, sortOrder: 0 }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setErr(data.error ?? "Save failed.");
      } else {
        resetForm();
        await onSaved(editingId ? "Role updated and revalidated." : "Role created and revalidated.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/admin/careers/${id}`, { method: "DELETE" });
    if (res.ok) {
      if (editingId === id) resetForm();
      await onSaved("Role deleted.");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-5 bg-[#10181c] border border-[#253035] rounded-[4px] p-6 flex flex-col gap-4 h-fit">
        <div className="flex items-center justify-between">
          <h2 className="type-h4 text-[#f5f6f6]">{editingId ? "Edit Role" : "New Open Role"}</h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-[12px] text-[#7f8a91] hover:text-white">
              Cancel edit
            </button>
          )}
        </div>
        <div>
          <label className={labelCls}>Role Title</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Embedded Systems Engineer" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Team</label>
            <input required value={team} onChange={(e) => setTeam(e.target.value)} placeholder="Autonomy & Edge AI" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Employment Type</label>
            <input required value={type} onChange={(e) => setType(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Location</label>
          <input required value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Apply URL</label>
          <input required value={applyUrl} onChange={(e) => setApplyUrl(e.target.value)} className={inputCls} />
        </div>
        <label className="inline-flex items-center gap-2 text-[13px] text-[#bdc4c8]">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Published on /careers
        </label>
        {err && <p className="text-[13px] text-[#f0494d]">{err}</p>}
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving ? "Saving…" : editingId ? "Update Role" : "Create Role"}
        </button>
      </form>

      <div className="lg:col-span-7 flex flex-col gap-3">
        {items.length === 0 ? (
          <div className="bg-[#10181c] border border-[#253035] rounded-[4px] p-6 text-[13px] text-[#7f8a91]">
            No open roles yet. Create one using the form on the left.
          </div>
        ) : (
          items.map((r) => (
            <div key={r.id} className="bg-[#10181c] border border-[#253035] rounded-[4px] p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-[2px] ${r.published ? "bg-emerald-500/15 text-emerald-300" : "bg-zinc-700/40 text-zinc-400"}`}>
                    {r.published ? "PUBLISHED" : "HIDDEN"}
                  </span>
                  <span className="font-mono text-[10px] text-[#7f8a91]">{r.type}</span>
                </div>
                <h3 className="text-[15px] font-medium text-[#f5f6f6] truncate">{r.title}</h3>
                <p className="text-[12px] text-[#7f8a91] mt-0.5">
                  {r.team} · {r.location}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" onClick={() => startEdit(r)} className={btnGhost}>
                  Edit
                </button>
                <button type="button" onClick={() => void handleDelete(r.id)} className={`${btnGhost} text-[#f0494d]`}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
