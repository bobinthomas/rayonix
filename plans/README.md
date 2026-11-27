# Animation Improvement Plans

Generated from the `improve-animations` audit at commit `d1fc456`.

| # | Plan | Severity | Category | Status |
| --- | --- | --- | --- | --- |
| 001 | [Replace `transition-all` with explicit GPU/paint-safe properties](001-replace-transition-all.md) | HIGH | Performance | DONE |
| 002 | [Preserve reduced-motion opacity fades and gate hover transforms](002-fix-reduced-motion-and-touch-hover.md) | HIGH | Accessibility | DONE |
| 003 | [Tighten UI durations to ≤300ms and apply strong `--ease-out`](003-tighten-ui-durations-and-ease-out.md) | MEDIUM | Easing & duration | DONE |
| 004 | [Make MegaMenu mode switches and FAQ accordion interruptible](004-make-megamenu-and-faq-interruptible.md) | MEDIUM | Interruptibility | DONE |
| 005 | [Add `:active` press feedback to PillTab and MegaMenu tabs](005-add-tab-press-feedback.md) | MEDIUM | Physicality & origin | DONE |
| 006 | [Consolidate motion easing and duration tokens](006-consolidate-motion-tokens.md) | LOW | Cohesion & tokens | DONE |
| 007 | [Add entrance motion to Careers Apply modal and ProductCapabilities panel](007-animate-apply-modal-and-panels.md) | LOW | Missed opportunities | DONE |
| 008 | [Add security headers (`public/_headers` and `next.config.ts`)](008-add-security-headers.md) | HIGH | Security | DONE |
| 009 | [Add branded App Router error boundary (`src/app/error.tsx`)](009-add-error-boundary.md) | MEDIUM | Code quality | DONE |
| 010 | [Escape `<` in JSON-LD `dangerouslySetInnerHTML` serialization](010-harden-jsonld-serialization.md) | LOW | Security | DONE |
| 011 | [Pin `postcss >= 8.5.23` in `pnpm.overrides`](011-patch-postcss-override.md) | LOW | Security | DONE |

## Recommended Execution Order

1. **`008`**, **`009`**, **`010`** (Security headers, error boundary, JSON-LD escaping — zero lockfile risk).
2. **`006`** first among animation plans if you want `--ease-out` tokens in `:root` and `tailwind.config.ts` before updating component classes.
3. **`001`** and **`002`** (HIGH severity — performance & reduced-motion/touch accessibility).
4. **`003`**, **`004`**, **`005`** (MEDIUM — crisp UI timing, interruptible MegaMenu/FAQ, tactile tab press).
5. **`007`** (LOW — Apply modal & capability panel polish).
6. **`011`** (LOW — `postcss` override + `pnpm install` + lockfile verification).

## Dependencies

- `003` and `005` touch `MegaMenu.tsx` and `PillTab.tsx`; execute `001` before `003`/`004`/`005` to avoid class merge conflicts.
- `002` and `006` both touch `src/app/globals.css`; apply `006` before `002` (or merge their edits carefully).
