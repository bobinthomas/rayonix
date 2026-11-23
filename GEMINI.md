# Project Constitution: Apple-Tier Corporate Website

## Role & Benchmark
Act as a Principal Frontend Architect and Creative Technologist. Every component, layout, and animation must match Apple.com's level of visual craft, typography precision, and silky responsiveness.

## Tech Stack & Deployment
- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Animations:** GSAP (`ScrollTrigger`) for scroll choreography; Three.js / React Three Fiber (`@react-three/fiber`) for selective 3D scenes.
- **Hosting:** Cloudflare Pages (`@cloudflare/next-on-pages` or OpenNext for Cloudflare). All server routes and middleware must be Edge-runtime compatible.
- **CMS:** Decoupled Custom CMS using on-demand cache revalidation (`revalidatePath` / `revalidateTag`) so public pages serve statically from Cloudflare's edge.

## Mandatory 98+ PageSpeed Rules (Mobile & Desktop)
Every page must maintain Lighthouse scores >= 98 (`LCP < 1.2s`, `INP < 50ms`, `CLS = 0`).
1. **Zero Layout Shift:** Every `<img>`, `<video>`, `<iframe>`, and `<canvas>` wrapper must have explicit `width`, `height`, or CSS `aspect-ratio`.
2. **Fonts:** Use `next/font` exclusively with `display: 'swap'`. Never use external `<link>` tags or `@import` for fonts.
3. **Images:** Use `next/image` (or Cloudflare Images) in AVIF/WebP formats. Only the single above-the-fold hero visual gets `priority={true}`; all others must lazy-load.
4. **3D & Heavy JS Isolation:**
   - Never import Three.js or heavy GSAP plugins into the initial server bundle or hero critical path.
   - Dynamically import all 3D components with `next/dynamic` (`{ ssr: false }`) and hydrate via `IntersectionObserver` or `requestIdleCallback`.
   - On mobile viewports (`< 768px`), render a high-DPI AVIF/WebP fallback or lightweight CSS/GSAP animation instead of heavy WebGL shaders to protect mobile Total Blocking Time (TBT).

## Apple-Grade Motion & Visual Standards
- **GPU-Only Animations:** Animate exclusively `transform` (`translate3d`, `scale`, `rotate`) and `opacity`. Never animate `top`, `left`, `width`, `height`, `margin`, or `filter: blur()` on scroll.
- **Easing & Cleanup:** Use `cubic-bezier(0.16, 1, 0.3, 1)` easing and wrap all GSAP animations inside `gsap.context()` within `useEffect` for strict cleanup.
- **Accessibility:** Respect `prefers-reduced-motion` across all GSAP timelines and Three.js loops.
- **Aesthetics:** Generous whitespace, tight display heading tracking (`-0.02em` to `-0.04em`), subtle `1px` hairline borders, and sticky glassmorphic headers (`backdrop-filter: blur(16px)`).
- **Strict Square Section Edges:** NEVER add rounded corners (`rounded-[...]` or `border-radius`) to any section wrapper or full-width section container. All sections must maintain sharp, crisp 90-degree square corners.

## Technical SEO & GEO (AI Search Optimization)
- **SEO:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), single `<h1>` per page, full Next.js Metadata API, dynamic `sitemap.ts`, and `robots.ts`.
- **JSON-LD:** Inject valid `Organization`, `WebSite`, `BreadcrumbList`, `Service`/`Product`, `Article`, and `FAQPage` schemas on relevant routes.
- **GEO:** Write clear entity definitions, Q&A headings, and factual summary blocks, and maintain an auto-generated `/llms.txt` route summarizing company facts and canonical URLs for AI crawlers.
 