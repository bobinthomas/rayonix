# 002 — Preserve reduced-motion opacity fades and gate hover transforms

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 3 files

## Problem

1. In `src/app/globals.css:182-186` and `src/app/globals.css:237-251`, `prefers-reduced-motion: reduce` sets `animation: none` and `transition: none`, which strips all comprehension feedback instead of keeping gentle opacity fades and dropping spatial movement:

```css
/* src/app/globals.css:182-186 — current */
@media (prefers-reduced-motion: reduce) {
  .eco-reveal {
    animation: none;
  }
}

/* src/app/globals.css:237-251 — current */
@media (prefers-reduced-motion: reduce) {
  .anim-fade-in,
  .anim-fade-up,
  .page-enter,
  .sniper-reticle-lock,
  .sniper-dot-pulse {
    animation: none;
  }

  .reveal,
  .reveal[data-reveal="hidden"] {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

2. `src/components/home/NewsCard.tsx:58` and `src/components/home/GlobalPartnershipSection.tsx:221, :230` apply `:hover` transforms (`group-hover:-translate-y-[160px]`, `group-hover:scale-125`) without `@media (hover: hover)` or `motion-reduce:`, causing sticky hover states on touch taps and unexpected movement for reduced-motion users.

## Target

```css
/* src/app/globals.css — target under @media (prefers-reduced-motion: reduce) */
@media (prefers-reduced-motion: reduce) {
  .eco-reveal,
  .anim-fade-in,
  .anim-fade-up,
  .page-enter {
    animation: anim-fade 200ms ease backwards;
  }

  .sniper-reticle-lock,
  .sniper-dot-pulse {
    animation: none;
  }

  .reveal {
    transition: opacity 200ms ease;
    transform: none;
  }

  .reveal[data-reveal="hidden"] {
    opacity: 0;
    transform: none;
  }
}
```

And gate hover-only scale/translate classes behind hover-capable pointers or `motion-reduce:transform-none` so touch taps never trigger sticky hover motion.

## Repo conventions to follow

- `src/app/globals.css:42` already gates desktop-only cursor rules with `@media (hover: hover) and (pointer: fine)`.
- `src/components/ui/PillTab.tsx:44` already uses `motion-reduce:animate-none`.

## Steps

1. Update `src/app/globals.css:182-186` and `src/app/globals.css:237-251` to replace `animation: none` on `.eco-reveal`, `.anim-fade-in`, `.anim-fade-up`, and `.page-enter` with `animation: anim-fade 200ms ease backwards;`, and keep `.reveal` as `transition: opacity 200ms ease; transform: none;`.
2. In `src/components/home/NewsCard.tsx:58` and `:73`, add `motion-reduce:transform-none` and wrap hover-only image shift in `@media (hover: hover)` (or Tailwind `[@media(hover:hover)]:group-hover:-translate-y-[160px]`), while keeping `group-focus-within:` accessible.
3. In `src/components/home/GlobalPartnershipSection.tsx:221` and `:230`, change `group-hover:scale-125` to `[@media(hover:hover)]:group-hover:scale-125 motion-reduce:transform-none`.

## Boundaries

- Do NOT alter `SniperCursor.tsx` reduced-motion behavior (continuous spin/pulse must remain `animation: none` under `prefers-reduced-motion: reduce`).
- Do NOT add new dependencies.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits `0`.
- **Feel check**:
  - In Chrome DevTools Rendering panel, enable `prefers-reduced-motion: reduce`. Navigate between `/` and `/about` and open the MegaMenu: elements should softly fade in (`200ms`) with zero vertical/horizontal slide.
  - Emulate a touch device (`390×844`) and tap `NewsCard` and `GlobalPartnershipSection` pins: no sticky hover scale/slide should remain after tap.
- **Done when**: Reduced-motion keeps `200ms` opacity fades with zero translation, and touch devices do not trigger hover-only transforms.
