# 003 — Tighten UI durations to ≤300ms and apply strong `--ease-out`

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: MEDIUM
- **Category**: Easing & duration
- **Estimated scope**: 3 files

## Problem

Several interactive UI transitions exceed the `300ms` UI duration budget or use built-in CSS `ease-out` (which is too weak for deliberate UI motion):

```tsx
// src/components/layout/Header.tsx:469 — current (500ms dropdown curtain; budget is 150–250ms)
className={`w-full transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${...}`}

// src/components/home/NewsCard.tsx:58, :73 — current (500ms hover reveal; budget is ≤300ms)
className="... transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ..."

// src/components/ui/CTAButton.tsx:61, :101 — current (300ms + weak built-in ease-out)
<g className="transition-transform duration-300 ease-out group-hover:translate-x-[26px]">
<span className="absolute inset-0 transition-transform duration-300 ease-out z-0 pointer-events-none ...">
```

## Target

- Dropdown curtain (`Header.tsx:460, :469`): `220ms` with `cubic-bezier(0.23, 1, 0.32, 1)` (`--ease-out`).
- Card hover reveal (`NewsCard.tsx:58, :73`): `260ms` with `cubic-bezier(0.23, 1, 0.32, 1)` (`--ease-out`).
- Button hover/press (`CTAButton.tsx:61, :81, :101`): `160ms` with `cubic-bezier(0.23, 1, 0.32, 1)` (`--ease-out`).

## Repo conventions to follow

- `src/app/globals.css:213-224` defines component timing classes using explicit millisecond durations and `cubic-bezier(...)`.

## Steps

1. In `src/components/layout/Header.tsx`:
   - Line 460: change `duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]` to `duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]`.
   - Line 469: change `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]` to `duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]`.
2. In `src/components/home/NewsCard.tsx`:
   - Lines 58 and 73: change `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]` to `duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)]`.
3. In `src/components/ui/CTAButton.tsx`:
   - Lines 61 and 101: change `duration-300 ease-out` to `duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]`.
   - Line 81: change `duration-300` to `duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]`.

## Boundaries

- Do NOT modify marketing scroll-linked GSAP timelines (`MissionArchitectureSection.tsx`, `ScrollGradientText.tsx`) or `Reveal.tsx` (section reveals).
- Do NOT add new dependencies.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits `0`.
- **Feel check**:
  - Hover across `Header` MegaMenu tabs and `CTAButton`s: the menu and button fill should feel immediate and snappy rather than floaty.
  - In Chrome DevTools Animations panel at `25%` playback speed, confirm MegaMenu curtain completes in `220ms` and `CTAButton` sweep completes in `160ms` with fast initial acceleration.
- **Done when**: MegaMenu curtain (`220ms`), `NewsCard` (`260ms`), and `CTAButton` (`160ms`) all use `cubic-bezier(0.23, 1, 0.32, 1)`.
