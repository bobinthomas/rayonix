# 009 — Add branded App Router error boundary (`src/app/error.tsx`)

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: MEDIUM
- **Category**: Code quality
- **Estimated scope**: 1 new file (`src/app/error.tsx`)

## Problem

There is currently no `src/app/error.tsx` boundary in the App Router. If an Edge-rendered page (`/news`, `/blog`, `/careers`, `/admin`) or client component throws an unexpected runtime error, Next.js renders its generic unstyled error screen.

## Target

Create `src/app/error.tsx` (`"use client"`) matching Rayonix's tactical dark theme (`#080f12` canvas, `#10181c` panel, `#253035` border, `#e22328` accent) with a `reset()` recovery button and a link back to `/`, without exposing raw stack traces or internal messages to end users.

## Repo conventions to follow

- Page wrappers use `bg-[#080f12] text-[#f5f6f6]` and `rounded-[4px]` inner cards with `border-[#253035]`, matching `src/components/admin/AdminDashboard.tsx`.

## Steps

1. Create `src/app/error.tsx`:
   - Export default `"use client"` component receiving `{ error, reset }: { error: Error & { digest?: string }; reset: () => void }`.
   - Log `error` via `console.error` inside `useEffect` (never render `error.message` or `error.stack` in JSX).
   - Render a centered dark card (`bg-[#10181c] border border-[#253035] rounded-[4px] p-8`) with heading `"Something went wrong"`, a brief message, a `"Try again"` button calling `reset()`, and a `<Link href="/">Return Home</Link>`.

## Boundaries

- Do NOT render `error.message` or `error.stack` in the UI.
- Do NOT add new dependencies.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` and `pnpm next:build` exit `0`.
- **Feel check**: Temporarily throw an error in a dev-only test or inspect the component rendering; verify `"Try again"` triggers `reset()` cleanly.
- **Done when**: `src/app/error.tsx` compiles cleanly and provides recovery UI without leaking error internals.
