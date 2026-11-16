-- Rayonix CMS Schema · Cloudflare D1 (SQLite)
-- Migration 0001: Core content tables

-- Pages & SEO metadata
CREATE TABLE IF NOT EXISTS pages (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  title       TEXT    NOT NULL,
  description TEXT,
  canonical   TEXT,
  og_image    TEXT,
  jsonld_type TEXT    DEFAULT 'WebPage',
  indexable   INTEGER DEFAULT 1,
  priority    REAL    DEFAULT 0.5,
  created_at  TEXT    DEFAULT (datetime('now')),
  updated_at  TEXT    DEFAULT (datetime('now'))
);

-- Operational domain capabilities
CREATE TABLE IF NOT EXISTS capabilities (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  domain      TEXT    NOT NULL CHECK(domain IN ('subsurface','surface','aerial')),
  title       TEXT    NOT NULL,
  headline    TEXT,
  description TEXT,
  specs       TEXT,   -- JSON: [{ label, value }]
  cta_label   TEXT,
  cta_href    TEXT,
  sort_order  INTEGER DEFAULT 0,
  published   INTEGER DEFAULT 1,
  created_at  TEXT    DEFAULT (datetime('now')),
  updated_at  TEXT    DEFAULT (datetime('now'))
);

-- Stories / News / Insights
CREATE TABLE IF NOT EXISTS stories (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  category    TEXT    NOT NULL,
  title       TEXT    NOT NULL,
  excerpt     TEXT,
  content     TEXT,   -- Markdown
  cover_image TEXT,
  read_time   TEXT,
  featured    INTEGER DEFAULT 0,
  published   INTEGER DEFAULT 0,
  published_at TEXT,
  created_at  TEXT    DEFAULT (datetime('now')),
  updated_at  TEXT    DEFAULT (datetime('now'))
);

-- FAQ entries
CREATE TABLE IF NOT EXISTS faqs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  question    TEXT    NOT NULL,
  answer      TEXT    NOT NULL,
  category    TEXT    DEFAULT 'general',
  sort_order  INTEGER DEFAULT 0,
  published   INTEGER DEFAULT 1,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- Office / Contact locations
CREATE TABLE IF NOT EXISTS contacts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  country     TEXT    NOT NULL,
  flag_code   TEXT    NOT NULL,
  entity_name TEXT    NOT NULL,
  cities      TEXT,
  address     TEXT,   -- JSON array of lines
  email       TEXT,
  phone       TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- Proof-point metrics
CREATE TABLE IF NOT EXISTS proof_points (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  metric      TEXT    NOT NULL,
  label       TEXT    NOT NULL,
  description TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TEXT    DEFAULT (datetime('now'))
);

-- Navigation items
CREATE TABLE IF NOT EXISTS navigation (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  location    TEXT    NOT NULL CHECK(location IN ('header','footer')),
  parent_id   INTEGER,
  label       TEXT    NOT NULL,
  href        TEXT,
  sort_order  INTEGER DEFAULT 0,
  FOREIGN KEY (parent_id) REFERENCES navigation(id)
);

-- LLMs.txt structured content
CREATE TABLE IF NOT EXISTS llms_content (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  section     TEXT    NOT NULL,
  heading     TEXT,
  body        TEXT    NOT NULL,
  sort_order  INTEGER DEFAULT 0,
  updated_at  TEXT    DEFAULT (datetime('now'))
);

-- Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_capabilities_domain ON capabilities(domain, sort_order);
CREATE INDEX IF NOT EXISTS idx_stories_published ON stories(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_stories_featured ON stories(featured, published);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category, sort_order);
CREATE INDEX IF NOT EXISTS idx_navigation_location ON navigation(location, sort_order);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
