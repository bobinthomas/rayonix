# 004 — Make MegaMenu mode switches and FAQ accordion interruptible

- **Status**: TODO
- **Commit**: `d1fc456`
- **Severity**: MEDIUM
- **Category**: Interruptibility
- **Estimated scope**: 2 files

## Problem

1. In `src/components/layout/MegaMenu.tsx:114-116, :144, :154`:
   Using `key={`${activeTab}-${currentMode.id}`}` and `key={activeTab}` with `.anim-fade-up` / `.anim-fade-in` (`@keyframes`) forces React to unmount and remount the DOM subtree on every mode hover/focus (`Detect` → `Decide` → `Respond`), restarting the keyframe from `0%` instead of retargeting cleanly:

```tsx
/* src/components/layout/MegaMenu.tsx:113-116 — current */
<div
  key={`${activeTab}-${currentMode.id}`}
  className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1.5 w-full transition-all duration-300 ease-out anim-fade-up"
>
```

2. In `src/components/home/FAQSection.tsx:70-74`:
   Conditional rendering `{isOpen && (...)}` with `.anim-fade-in` animates open via keyframe but teleports shut on close with no exit transition.

## Target

1. `MegaMenu.tsx`: Remove `key` remounting on the grid/spotlight wrappers and use a CSS transition (`transition-[opacity,transform] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]`) or `@starting-style` so rapid hovering across `Detect` / `Decide` / `Respond` never flickers or restarts from zero.
2. `FAQSection.tsx`: Keep the answer wrapper mounted using CSS Grid row collapse (`grid-rows-[0fr]` → `grid-rows-[1fr]`) + `opacity-0` → `opacity-100` over `240ms cubic-bezier(0.23, 1, 0.32, 1)` so rapid toggling mid-animation smoothly reverses.

## Repo conventions to follow

- `src/components/layout/Header.tsx:460-472` already keeps `MegaMenu` mounted and toggles classes rather than unmounting on close.

## Steps

1. In `src/components/layout/MegaMenu.tsx`:
   - Remove `key={`${activeTab}-${currentMode.id}`}` and `anim-fade-up` on line 114-115; replace with `transition-[opacity,transform] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]`.
   - Remove `key={activeTab}` and `anim-fade-in` on lines 144-145 and 154-158.
2. In `src/components/home/FAQSection.tsx:70-74`:
   - Replace `{isOpen && (<div className="mt-4 pr-12 type-body-lg text-[#bdc4c8] anim-fade-in">...</div>)}` with:
     ```tsx
     <div
       aria-hidden={!isOpen}
       className={`grid transition-[grid-template-rows,opacity] duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
         isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
       }`}
     >
       <div className="overflow-hidden pr-12 type-body-lg text-[#bdc4c8]">
         <p>{faq.answer}</p>
       </div>
     </div>
     ```

## Boundaries

- Do NOT remove `aria-expanded={isOpen}` on the FAQ button.
- Do NOT add new dependencies.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` exits `0`.
- **Feel check**:
  - Rapidly scrub the pointer across `Detect`, `Decide`, `Respond` in `MegaMenu`: content should never flash blank or restart a keyframe jump.
  - Rapidly click an FAQ question open and closed mid-animation: it should smoothly reverse direction without snapping.
- **Done when**: Neither `MegaMenu` mode switching nor `FAQSection` toggling uses keyframe remounting.
