# 007 — Add entrance motion to Careers Apply modal and ProductCapabilities panel

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 2 files (`CareerApplyList.tsx`, `ProductCapabilities.tsx`)

## Problem

1. `src/components/company/CareerApplyList.tsx:105-120`: Clicking **Apply** on `/careers` mounts the modal (`role="dialog"`) instantaneously (`opacity: 1`, `scale: 1`) with no backdrop fade or modal entrance, making it feel abrupt.
2. `src/components/product/ProductCapabilities.tsx:204-216`: Clicking a capability tab swaps the panel text and diagram instantaneously with no subtle cross-reveal.

## Target

1. `CareerApplyList.tsx`: Backdrop fades in over `180ms` (`opacity: 0 → 1`) and the modal card enters from `scale(0.96)` + `opacity: 0` → `scale(1)` + `opacity: 1` over `220ms cubic-bezier(0.23, 1, 0.32, 1)` (using `data-mounted` state set in `useEffect` so it transitions cleanly without `scale(0)`).
2. `ProductCapabilities.tsx`: Panel content uses a `180ms` `opacity` + `translate3d(0, 4px, 0)` entrance (`anim-fade-up` or `transition-[opacity,transform]`) when switching tabs.

## Repo conventions to follow

- `src/app/globals.css:217-219` (`anim-fade-up`) uses GPU-only `opacity` + `translate3d`.
- Never use `scale(0)`; always start modals at `scale(0.96)`.

## Steps

1. In `src/components/company/CareerApplyList.tsx` (`ApplyModal`):
   - Add `const [mounted, setMounted] = useState(false);` with `useEffect(() => { const id = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(id); }, []);`.
   - On the backdrop `div` (line 106), add `transition-opacity duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${mounted ? "opacity-100" : "opacity-0"}`.
   - On the dialog card `div` (line 116), add `transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"}`.
2. In `src/components/product/ProductCapabilities.tsx:204-210`:
   - Add `key={active.id}` on the inner content wrapper (`<div key={active.id} className="... anim-fade-up">`) so tab switches have a subtle `4–6px` rise + fade.

## Boundaries

- Do NOT animate `CareerApplyList` modal with `scale(0)`.
- Do NOT break Escape key or backdrop-click dismissal in `ApplyModal`.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits `0`.
- **Feel check**:
  - On `/careers`, click **Apply**: modal should scale smoothly from `0.96` with backdrop fade in `~220ms` (check at `10%` speed in DevTools Animations panel).
  - On `/subsurface/detect/das`, click across capability tabs: panel content should transition smoothly without a harsh snap.
- **Done when**: Both `ApplyModal` and `ProductCapabilities` panel animate smoothly and respect `prefers-reduced-motion`.
