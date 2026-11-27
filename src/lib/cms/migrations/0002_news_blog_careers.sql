-- Migration 0002: Newsroom, Blog & Careers CMS tables (Cloudflare D1 / SQLite)

-- Newsroom stories (announcements & media coverage)
CREATE TABLE IF NOT EXISTS news_stories (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT    NOT NULL UNIQUE,
  kind          TEXT    NOT NULL CHECK(kind IN ('announcement', 'coverage')),
  published     INTEGER NOT NULL DEFAULT 0,
  homepage      INTEGER NOT NULL DEFAULT 0,
  category      TEXT    NOT NULL,
  published_date TEXT,                          -- ISO yyyy-mm-dd, yyyy-mm, or NULL
  title         TEXT    NOT NULL,
  summary_json  TEXT    NOT NULL DEFAULT '[]',  -- JSON string[]
  body_json     TEXT,                           -- JSON string[] | NULL
  coverage_url  TEXT,
  source        TEXT,
  image_src     TEXT,
  image_alt     TEXT,
  buttons_json  TEXT    NOT NULL DEFAULT '[]',  -- JSON NewsButton[]
  source_link_json TEXT,                        -- JSON { label, href } | NULL
  related_json  TEXT    NOT NULL DEFAULT '[]',  -- JSON { label, href }[]
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT    NOT NULL UNIQUE,
  title         TEXT    NOT NULL,
  published_date TEXT   NOT NULL,               -- ISO yyyy-mm-dd
  summary       TEXT    NOT NULL,
  body_json     TEXT    NOT NULL DEFAULT '[]',  -- JSON string[]
  cover_image   TEXT,
  published     INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Careers / open roles
CREATE TABLE IF NOT EXISTS career_roles (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  title         TEXT    NOT NULL,
  team          TEXT    NOT NULL,
  location      TEXT    NOT NULL,
  type          TEXT    NOT NULL,               -- e.g. Full-time, Contract
  description   TEXT,
  apply_url     TEXT    NOT NULL,
  published     INTEGER NOT NULL DEFAULT 1,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_news_published ON news_stories(published, sort_order, published_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_homepage  ON news_stories(published, homepage, sort_order);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published, published_date DESC);
CREATE INDEX IF NOT EXISTS idx_roles_published ON career_roles(published, sort_order);
