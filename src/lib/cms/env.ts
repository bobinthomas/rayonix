import { getRequestContext } from "@cloudflare/next-on-pages";

export interface CmsEnv {
  DB?: D1Database;
  MEDIA_BUCKET?: R2Bucket;
  ADMIN_PASSWORD?: string;
  ADMIN_PASSWORD_HASH?: string;
  ADMIN_SESSION_SECRET?: string;
  REVALIDATION_SECRET?: string;
  R2_PUBLIC_URL?: string;
}

/**
 * Safely reads Cloudflare Pages bindings (`DB`, `MEDIA_BUCKET`, secrets) when
 * running on Cloudflare Workers/Pages, and falls back to `process.env` during
 * `next dev` or static build.
 */
export function getCmsEnv(): CmsEnv {
  try {
    const ctx = getRequestContext();
    if (ctx?.env) {
      return ctx.env as unknown as CmsEnv;
    }
  } catch {
    // Not in a Cloudflare request context (next dev / SSG build).
  }

  return {
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
    ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  };
}

export function getD1(): D1Database | null {
  return getCmsEnv().DB ?? null;
}

export function getR2(): R2Bucket | null {
  return getCmsEnv().MEDIA_BUCKET ?? null;
}
