# 008 — Add security headers (`public/_headers` and `next.config.ts`)

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: HIGH
- **Category**: Security
- **Estimated scope**: 2 files (`public/_headers`, `next.config.ts`)

## Problem

Live `https://rayonix-site.pages.dev/` currently returns `x-content-type-options: nosniff` and `referrer-policy: strict-origin-when-cross-origin`, but lacks `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, and `Permissions-Policy`. There is no `public/_headers` file and `next.config.ts` does not define `async headers()`.

## Target

1. `public/_headers` covers static assets served directly by Cloudflare Pages CDN:
   ```text
   /*
     X-Frame-Options: DENY
     X-Content-Type-Options: nosniff
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: geolocation=(), camera=(), microphone=()
     Strict-Transport-Security: max-age=31536000; includeSubDomains
     Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.figma.com https://images.unsplash.com; font-src 'self'; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
   ```
2. `next.config.ts` exports `async headers()` returning the same headers for `source: "/(.*)"` so Edge-rendered routes (`/news`, `/blog`, `/careers`, `/admin`) served by `_worker.js` also include them.

## Repo conventions to follow

- `next.config.ts:25-54` already uses `async redirects()` for `@cloudflare/next-on-pages` routing.

## Steps

1. Create `public/_headers` with the headers in **Target**.
2. Add `async headers()` to `next.config.ts` returning `source: "/(.*)"` with `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, and `Content-Security-Policy-Report-Only`.

## Boundaries

- Use `Content-Security-Policy-Report-Only` first; do NOT switch to enforcing `Content-Security-Policy` until DevTools console confirms zero false-positive violations across `/`, `/contact` (Turnstile), and `/admin`.
- Do NOT add `preload` to `Strict-Transport-Security` without confirming all subdomains support HTTPS.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` and `pnpm build` exit `0`.
- **Runtime check**: After deploying, run `curl.exe -s -I https://rayonix-site.pages.dev/` and `curl.exe -s -I https://rayonix-site.pages.dev/news` and confirm `strict-transport-security`, `x-frame-options`, `permissions-policy`, and `content-security-policy-report-only` are present; check browser console for zero CSP report-only errors.
- **Done when**: Both static assets and Edge routes return the security headers.
