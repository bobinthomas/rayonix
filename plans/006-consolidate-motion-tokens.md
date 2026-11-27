# 006 — Consolidate motion easing and duration tokens

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 2 files (`globals.css`, `tailwind.config.ts`)

## Problem

Easing curves and durations are currently duplicated inline across CSS and TSX (`cubic-bezier(0.16, 1, 0.3, 1)`, Tailwind `ease-out`, `duration-200`, `duration-300`, `duration-500`) without shared CSS variables in `:root`:

```ts
// tailwind.config.ts:77-79 — current
transitionTimingFunction: {
  apple: "cubic-bezier(0.16, 1, 0.3, 1)",
},
```

```css
/* src/app/globals.css:213-224 — current */
.anim-fade-in {
  animation: anim-fade 220ms ease-out backwards;
}
.anim-fade-up {
  animation: anim-fade-up 260ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
.page-enter {
  animation: anim-fade-up 320ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
```

## Target

Define canonical motion tokens in `src/app/globals.css` `:root` and expose them in `tailwind.config.ts`:

```css
/* src/app/globals.css (:root) — target */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

```ts
// tailwind.config.ts — target
transitionTimingFunction: {
  apple: "var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1))",
  "ease-out-strong": "var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1))",
  "ease-in-out-strong": "var(--ease-in-out, cubic-bezier(0.77, 0, 0.175, 1))",
  drawer: "var(--ease-drawer, cubic-bezier(0.32, 0.72, 0, 1))",
},
```

## Repo conventions to follow

- Design tokens live in `:root` in `src/app/globals.css:5-24` and are mapped in `tailwind.config.ts:41-80`.

## Steps

1. Add `--ease-out`, `--ease-in-out`, and `--ease-drawer` to `:root` in `src/app/globals.css`.
2. Update `.eco-reveal`, `.anim-fade-in`, `.anim-fade-up`, and `.page-enter` in `src/app/globals.css:178-224` to reference `var(--ease-out)`.
3. Update `transitionTimingFunction` in `tailwind.config.ts:77-79` to expose `ease-out-strong`, `ease-in-out-strong`, and `drawer` backed by those CSS variables.

## Boundaries

- Execute this plan **before or alongside** `003` if you want `003` to use `ease-out-strong` instead of inline `ease-[cubic-bezier(0.23,1,0.32,1)]`.
- Do NOT alter GSAP scroll timelines or `SniperCursor` keyframes.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` and `pnpm next:build` exit `0`.
- **Feel check**: Trigger route navigation (`page-enter`) and mobile Ecosystem accordion (`eco-reveal`); confirm smooth deceleration with zero snap.
- **Done when**: `:root` defines `--ease-out`, `--ease-in-out`, and `--ease-drawer`, and Tailwind exposes them.
