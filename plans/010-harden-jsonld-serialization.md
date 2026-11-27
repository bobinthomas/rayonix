# 010 — Escape `<` in JSON-LD `dangerouslySetInnerHTML` serialization

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: LOW
- **Category**: Security
- **Estimated scope**: 3 files (`json-ld.tsx`, `ProductPage.tsx`, `SolutionPage.tsx`)

## Problem

Three components inject JSON-LD via `dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }}` without escaping `<`:

```tsx
// src/lib/seo/json-ld.tsx:24 — current
dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}

// src/components/product/ProductPage.tsx:18 — current
dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductJsonLd(content)) }}

// src/components/solution/SolutionPage.tsx:91 — current
dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSolutionJsonLd(content)) }}
```

If any CMS-backed `ArticleSchema` title/description or product copy contains `</script>`, unescaped `<` can terminate the `<script>` tag early.

## Target

Replace `JSON.stringify(x)` in all 3 places with `JSON.stringify(x).replace(/</g, "\\u003c")` (or reuse `JsonLdScript` / a shared `serializeJsonLd` helper).

## Repo conventions to follow

- `src/lib/seo/json-ld.tsx:20-27` already centralizes `JsonLdScript`.

## Steps

1. In `src/lib/seo/json-ld.tsx:24`, change `JSON.stringify(data)` to `JSON.stringify(data).replace(/</g, "\\u003c")`.
2. In `src/components/product/ProductPage.tsx:18`, change `JSON.stringify(buildProductJsonLd(content))` to `JSON.stringify(buildProductJsonLd(content)).replace(/</g, "\\u003c")`.
3. In `src/components/solution/SolutionPage.tsx:91`, change `JSON.stringify(buildSolutionJsonLd(content))` to `JSON.stringify(buildSolutionJsonLd(content)).replace(/</g, "\\u003c")`.

## Boundaries

- Do NOT alter the JSON-LD schema shapes or fields.
- Do NOT add new dependencies.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits `0`.
- **Runtime check**: Inspect `<script type="application/ld+json">` on `/`, `/subsurface/detect/das`, `/solutions/ied-detection`, and `/news/guideline-geo-gpr-partnership` to verify valid JSON-LD parsing.
- **Done when**: All 3 JSON-LD `<script>` injections escape `<` as `\u003c`.
