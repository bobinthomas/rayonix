# 005 — Add `:active` press feedback to PillTab and MegaMenu tabs

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 2 files

## Problem

`CTAButton` provides subtle tactile press feedback (`active:scale-[0.98]`), whereas high-frequency interactive tabs (`PillTab.tsx` and `MegaMenu.tsx`) have no `:active` press response:

```tsx
// src/components/ui/PillTab.tsx:35 — current
className={`group relative shrink-0 px-[9px] sm:px-[10px] xl:px-[11px] py-[9px] sm:py-[10px] xl:py-[12px] rounded-[4px] type-caption font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap overflow-hidden select-none border-0 outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] ${...}`}

// src/components/layout/MegaMenu.tsx:90 — current
className={`relative px-3.5 py-1.5 type-small font-medium transition-colors duration-200 rounded-[2px] flex items-center gap-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#e22328] ${...}`}
```

## Target

Both `PillTab` and `MegaMenu` mode tabs apply `active:scale-[0.97]` with `transition-[transform,background-color,color] duration-[150ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:active:scale-100`.

## Repo conventions to follow

- `src/components/ui/CTAButton.tsx:93` uses `active:scale-[0.98]`.

## Steps

1. In `src/components/ui/PillTab.tsx:35`:
   - Replace `transition-colors duration-200` with `transition-[transform,background-color,color] duration-[150ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:active:scale-100`.
2. In `src/components/layout/MegaMenu.tsx:90`:
   - Replace `transition-colors duration-200` with `transition-[transform,background-color,color] duration-[150ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:active:scale-100`.

## Boundaries

- Do NOT modify `tabProgress` progress bar inside `PillTab.tsx:41-50`.
- Do NOT use `scale(0)` or `scale < 0.95`.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits `0`.
- **Feel check**:
  - Click and hold a `PillTab` on `/` (`EcosystemSection`) or `/subsurface/detect/das` (`ProductCapabilities`) and a mode tab in `MegaMenu`: confirm a subtle `0.97` press-in that snaps back on release.
  - Verify with `prefers-reduced-motion: reduce` that scale press is disabled.
- **Done when**: Both tab components respond to `:active` with `scale(0.97)` over `150ms`.
