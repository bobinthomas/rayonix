# 001 — Replace `transition-all` with explicit GPU/paint-safe properties

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 6 files, mechanical class replacements

## Problem

`transition-all` animates every CSS property that changes (including layout/paint properties like `width`, `height`, `padding`, `border-width`, and `box-shadow` off-GPU). It appears across high-frequency navigation, buttons, and cards:

```tsx
// src/components/layout/Header.tsx:168 (and :223, :278, :336, :391) — current
className={`relative flex items-center h-full transition-all ${...}`}

// src/components/layout/Header.tsx:460 — current
className={`absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${...}`}

// src/components/ui/CTAButton.tsx:81 — current
"group relative overflow-hidden inline-flex items-center justify-center gap-[16px] px-[20px] py-[13px] rounded-[4px] type-cta whitespace-nowrap transition-all duration-300 ..."

// src/components/layout/MegaMenu.tsx:15, :115, :123, :134, :158 — current
// e.g. line 134:
<div className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">

// src/components/home/NewsCard.tsx:73, :86 — current
// line 73:
<div className="... transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[140px] opacity-0 ...">
// line 86:
className="... transition-all duration-300 ..."

// src/components/product/ProductUseCases.tsx:190, :249 — current
className={`block h-1.5 rounded-full transition-all duration-300 ${...}`}
```

## Target

Every transition specifies only the properties it actually animates (`transform`, `opacity`, `colors`, `border-color`):

- `Header.tsx` nav tab wrappers: `transition-colors` (border-color only).
- `Header.tsx:460` MegaMenu outer wrapper: `transition-[opacity,visibility]`.
- `CTAButton.tsx:81` and `NewsCard.tsx:86`: `transition-[transform,colors,border-color,background-color]`.
- `MegaMenu.tsx:15`: `transition-colors duration-200`; `MegaMenu.tsx:115`: `transition-[transform,opacity] duration-200`; `MegaMenu.tsx:123`: `transition-colors duration-200`; `MegaMenu.tsx:134`: `transition-[transform,opacity] duration-200`; `MegaMenu.tsx:158`: `transition-[border-color,box-shadow] duration-200`.
- `NewsCard.tsx:73`: `transition-[transform,opacity]`.
- `ProductUseCases.tsx:190, :249`: replace animated `w-8`/`w-2` width layout shift with `transition-[transform,background-color] duration-200` or `transition-[width,background-color] duration-200` (explicitly scoped so `transition-all` is eliminated).

## Repo conventions to follow

- GPU-only animations: animate exclusively `transform` and `opacity` (plus `color`/`background-color`/`border-color` on hover), per `src/components/home/NewsCard.tsx:58` (`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`).

## Steps

1. Edit `src/components/layout/Header.tsx`:
   - On lines 168, 223, 278, 336, 391: replace `transition-all` with `transition-colors duration-200`.
   - On line 460: replace `transition-all` with `transition-[opacity,visibility]`.
2. Edit `src/components/ui/CTAButton.tsx` line 81:
   - Replace `transition-all` with `transition-[transform,background-color,border-color,color]`.
3. Edit `src/components/layout/MegaMenu.tsx`:
   - Line 15: replace `transition-all` with `transition-colors`.
   - Line 115: replace `transition-all` with `transition-[transform,opacity]`.
   - Line 123: replace `transition-all` with `transition-colors`.
   - Line 134: replace `transition-all` with `transition-[transform,opacity]`.
   - Line 158: replace `transition-all` with `transition-[border-color,box-shadow]`.
4. Edit `src/components/home/NewsCard.tsx`:
   - Line 73: replace `transition-all` with `transition-[transform,opacity]`.
   - Line 86: replace `transition-all` with `transition-[transform,background-color,border-color,color]`.
5. Edit `src/components/product/ProductUseCases.tsx`:
   - Lines 190 and 249: replace `transition-all` with `transition-[width,background-color]`.

## Boundaries

- Do NOT touch GSAP `ScrollTrigger` animations or `SniperCursor.tsx`.
- Do NOT change markup structure or add new dependencies.
- If any line has shifted, STOP and report instead of guessing.

## Verification

- **Mechanical**:
  - Run `Get-ChildItem -Path src -Recurse -File | Select-String -Pattern "transition-all"` → expected `0` matches in the edited files.
  - Run `pnpm exec tsc --noEmit` → exit code `0`.
- **Feel check**:
  - Hover nav items, open MegaMenu, hover `CTAButton` and `NewsCard`, and click `ProductUseCases` pagination dots.
  - Open Chrome DevTools Performance panel, record hovering across MegaMenu links and `NewsCard`s, and confirm zero Layout/Recalculate Style spikes from `transition-all`.
- **Done when**: Zero `transition-all` occurrences remain in `Header.tsx`, `CTAButton.tsx`, `MegaMenu.tsx`, `NewsCard.tsx`, and `ProductUseCases.tsx`, and `tsc --noEmit` passes.
