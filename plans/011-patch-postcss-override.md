# 011 — Pin `postcss >= 8.5.23` in `pnpm.overrides`

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: LOW
- **Category**: Security
- **Estimated scope**: `package.json` + `pnpm-lock.yaml`

## Problem

`pnpm audit --prod` reports 4 vulnerabilities (`2 high`, `2 moderate`) in transitive `postcss` (`<=8.5.22`, via `next > postcss` and `devDependencies.postcss: ^8.5.3`). All 4 are patched in `postcss >= 8.5.23`.

## Target

Pin `postcss` to `>=8.5.23` in `package.json` under `pnpm.overrides`, update `pnpm-lock.yaml`, and verify `pnpm audit --prod` reports `0` vulnerabilities.

## Repo conventions to follow

- `package.json:38-44` already uses the `"pnpm"` configuration block.

## Steps

1. In `package.json`, add `"overrides": { "postcss": ">=8.5.23" }` inside the `"pnpm"` object (and bump `"postcss": "^8.5.23"` in `devDependencies`).
2. Run `pnpm install` (outside sandbox on Windows per repo rules) to update `pnpm-lock.yaml`.
3. Run `pnpm audit --prod` to confirm `0` vulnerabilities.
4. Run `pnpm build` to verify Tailwind CSS / PostCSS compilation still succeeds cleanly.

## Boundaries

- Do NOT upgrade `next`, `react`, or `tailwindcss` major/minor versions in this plan.
- If `pnpm build` fails after the override, revert `package.json` and `pnpm-lock.yaml` and report.

## Verification

- **Mechanical**:
  - `pnpm audit --prod` exits `0` with `0` vulnerabilities.
  - `pnpm exec tsc --noEmit` and `pnpm build` exit `0`.
- **Done when**: `pnpm audit --prod` passes cleanly and the Cloudflare Pages production build succeeds.
