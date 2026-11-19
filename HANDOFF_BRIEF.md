# Comprehensive Handoff Brief: Rayonix Corporate Website

> **Document Version:** 1.0.0  
> **Date:** November 19, 2026  
> **Target Audience:** Claude / Incoming Engineering Team  
> **Working Directory:** `d:\Rayonix\Site`  
> **Production Deployment:** [https://6d875e3d.rayonix-site.pages.dev](https://6d875e3d.rayonix-site.pages.dev)  
> **Canonical Domain:** Rayonix Defence Technologies (`rayonix-site.pages.dev`)

---

## 1. Executive Summary & Mission

Rayonix is an elite defense technology and autonomous systems company engineering integrated defense solutions across three operational domains: **Subsurface**, **Surface**, and **Aerial**, structured under the **Detect → Decide → Respond** operational doctrine.

The objective is to architect and deliver an **Apple-tier corporate website** that matches Apple.com's standards of visual craftsmanship, typography precision, buttery 60fps animations, and silky responsiveness, while achieving **98+ Lighthouse / PageSpeed scores** across desktop and mobile.

---

## 2. Tech Stack & Environment Architecture

| Layer | Technology | Key Details & Constraints |
|---|---|---|
| **Framework** | Next.js 15.5.29 (App Router) | React 19, Edge Runtime on select endpoints (`/api/revalidate`), SSG / static prerendering on public pages. |
| **Language** | TypeScript | Strict type checking (`noImplicitAny`, strict null checks). |
| **Styling** | Tailwind CSS 3.4 | Custom theme tokens, custom utility classes, `no-scrollbar` cross-browser definitions. |
| **Animation** | GSAP 3.14 + `ScrollTrigger` | Cleaned up with `gsap.context()` in `useEffect`. Custom DecryptedText / TransformingHeading typography. |
| **3D / Canvas** | Three.js / R3F (isolated) | Dynamically loaded via `next/dynamic({ ssr: false })` via `IntersectionObserver` / `requestIdleCallback`. Never in the hero critical path. |
| **Hosting & Edge** | Cloudflare Pages | Built using `@cloudflare/next-on-pages` and deployed via Wrangler CLI to the `rayonix-site` project. |
| **Package Manager** | `pnpm` (v12.4.2) | Fast, deterministic lockfile. |
| **OS Environment** | Windows (PowerShell) | Prepending Git Bash binaries (`D:\Git\bin;D:\Git\usr\bin`) is required for `next-on-pages`. |

---

## 3. Project Constitution & Engineering Rules (`GEMINI.md`)

Every engineer working on this repository must strictly adhere to these non-negotiable rules:

### A. Strict Square Section Edges
- **NEVER** add rounded corners (`rounded-[...]` or `border-radius`) to any section wrapper or full-width section container.
- All section wrappers (`<section>`, `<header>`, `<footer>`) must maintain sharp, crisp, 90-degree square corners.
- Rounded corners (`rounded-[4px]`, `rounded-[6px]`, `rounded-[8px]`) are permitted **only** inside inner elements (cards, buttons, badge pills, media thumbnails).

### B. Mandatory 98+ PageSpeed / Core Web Vitals Rules
- **LCP < 1.2s, INP < 50ms, CLS = 0**.
- **Zero Layout Shift:** Every `<img>`, `<video>`, `<iframe>`, and `<canvas>` wrapper must have explicit `width`, `height`, or CSS `aspect-ratio`.
- **Fonts:** Use `next/font` exclusively (`font-sans`, `font-mono`) with `display: 'swap'`. Never use external `<link>` tags or `@import` for fonts.
- **Images:** Use `next/image` in AVIF/WebP formats. Only the single above-the-fold hero visual gets `priority={true}`; all others must lazy-load with explicit `sizes`.
- **Mobile WebGL Protection:** On viewports `< 768px`, render high-DPI AVIF/WebP fallback instead of heavy WebGL shaders to protect mobile Total Blocking Time (TBT).

### C. Apple-Grade Motion & Visual Standards
- **GPU-Only Animations:** Animate exclusively `transform` (`translate3d`, `scale`, `rotate`) and `opacity`. Never animate `top`, `left`, `width`, `height`, `margin`, or `filter: blur()` on scroll.
- **Easing & Cleanup:** Use `cubic-bezier(0.16, 1, 0.3, 1)` easing. Always wrap GSAP animations in `gsap.context()` inside `useEffect` with cleanup `ctx.revert()`.
- **Accessibility:** Strictly honor `prefers-reduced-motion` across all timelines.
- **Aesthetics:** Generous whitespace, tight display heading tracking (`-0.02em` to `-0.04em`), subtle `1px` hairline borders (`#253035`), sticky glassmorphic headers (`backdrop-filter: blur(16px)`).

---

## 4. Design System & Design Tokens

Defined in `src/app/globals.css` and `tailwind.config.ts`:

```css
:root {
  --rayonix-background-canvas: #080f12;   /* Deep tactical dark backdrop */
  --rayonix-background-panel:  #10181c;   /* Elevated tactical card/container */
  --rayonix-footer-background: #000000;   /* Pitch black footer */
  --rayonix-border-subtle:     #253035;   /* 1px hairline border */
  --rayonix-accent-brand:      #e22328;   /* Rayonix Signal Red */
  --rayonix-text-primary:      #f5f6f6;   /* Pure crisp white text */
  --rayonix-text-secondary:    #bdc4c8;   /* Soft silver subtitle/body text */
  --rayonix-text-muted:        #7f8a91;   /* Tactical muted metadata/coordinates */
  --rayonix-text-inverse:      #080f12;
  --rayonix-inset-page:        84px;
}
```

### Key UI Components:
1. **`CTAButton.tsx` (`src/components/ui/CTAButton.tsx`):**
   - Rayonix standard tactical CTA button with primary red filled state, bottom-to-top sweep hover animation, chevron icon, and secondary ghost variant.
2. **`TransformingHeading.tsx` / `DecryptedText.tsx`:**
   - Apple-tier character-decoding text animation for section display headings.
3. **Sniper Crosshair Cursor (`src/components/ui/CustomCursor.tsx`):**
   - Desktop-only custom cursor with full-length vertical and horizontal hairline intersecting crosshair lines (`rgba(255,255,255,0.12)`) and live X/Y coordinates HUD badge (`X 0842 · Y 0612`).
   - Automatically disabled (`cursor: default`) when the MegaMenu is open via `html.megamenu-open`.

---

## 5. Information Architecture & Navigation

Rayonix's operational architecture is divided into 3 operational domains, each operating through 3 operational phases:

```
Rayonix
│
├── Subsurface (/domains/subsurface)
│   ├── Detect: Ground Penetrating Radar (GPR)       → /subsurface/detect/gpr
│   │           Fibre Optic DAS
│   │           Seismic Sensor Arrays
│   │           Hydrophone Underwater Networks
│   ├── Decide: Command & Intelligence              → /subsurface/decide
│   │           (Data Acquisition, AI Analytics, Multi-Sensor Fusion,
│   │            Localisation, Threat Assessment, Command & Control)
│   └── Respond: Coordinated Tactical Response
│
├── Surface (/domains/surface)
│   ├── Detect: EO/IR, Radar, Surveillance Mast
│   ├── Decide: Autonomous Mission Software & C2
│   └── Respond: Tactical Mobile Systems & Armament
│
├── Aerial (/domains/aerial)
│   ├── Detect: Airborne Sensor Pods & Recon
│   ├── Decide: Swarm Autonomy & Edge AI
│   └── Respond: Kinetic & Electronic Counter-UAS
│
├── Solutions (/solutions)
├── Ecosystem (/ecosystem)
│   ├── X-Labs (/ecosystem/x-labs)
│   ├── NexR Optronics (/ecosystem/nexr-optronics)
│   └── Mcray Xtend (/ecosystem/mcray-xtend)
└── Company: About (/about), Careers (/careers), News (/news)
```

---

## 6. Detailed Walkthrough of Pages & Components

### A. Homepage (`src/app/page.tsx`)

Composed of 10 meticulously crafted sections:

1. **Section 01: Hero (`src/components/home/HeroSection.tsx`)**
   - High-definition tactical background video (`/assets/videos/website-video.mp4`) with smooth fade-in.
   - DecryptedText main headline with single-line lock above 1280px.
   - 15% bottom CTA bar and GSAP ScrollTrigger-driven statistical counter re-triggering smoothly on scroll.
2. **Section 02: Future of Defence (`src/components/home/FutureOfDefence.tsx`)**
   - Edge-to-edge container alignment with strict 1280px inner boundary.
   - Heading font size explicitly set to `64px` with `2px` letter-spacing at `xl` breakpoint (`xl:text-[64px] xl:tracking-[2px]`).
3. **Section 03: One Connected Defense Ecosystem (`src/components/home/EcosystemSection.tsx`)**
   - **Crucial Layout Rule:** Heading and Tab navigation are pinned strictly to the 1280px content grid (`max-w-[1280px] mx-auto px-6 sm:px-8`).
   - 7 Tactical Tabs: *Mission Software & Autonomy, Unified Agnostic Platforms, Command Systems Static & Mobile, Weapons & Tactical Systems, Counter-UAS Systems, Secure Communications, Edge Robotics*.
   - Pure CSS deterministic grid alignment. Zero horizontal scrolling on tabs on desktop.
   - Carousel cards bleed to the right edge of the screen, but are strictly clipped on the left (`clip-path: inset(0 0 0 0)`) so cards never bleed past the 1280px content line.
4. **Section 04: Detect, Decide, Respond (`src/components/home/DetectDecideRespond.tsx`)**
   - Tactical 3-mode workflow card grid with background image `detect-decide-respond-bg.png`.
5. **Section 05: Field Drone Tactical Banner (`src/components/home/FieldDroneBanner.tsx`)**
   - Tactical video player with poster fallback and ambient dark gradients.
6. **Section 06: Subsidiaries & Venture Ecosystem (`src/components/home/SubsidiariesSection.tsx`)**
   - Showcases *X-Labs*, *NexR Optronics*, and *Mcray Xtend*.
   - Subtle top hairline borders, bottom separator line removed as per user design review.
   - Hover state smoothly elevates text opacity and reveals subsidiary overview.
7. **Section 07: Global Footprint / World Map (`src/components/home/GlobalFootprintSection.tsx`)**
   - Background: Pristine `World Map 2.png` with `#071629` dark sky gradient.
   - Coordinates: All 9 global continental hubs locked to SVG `viewBox="0 0 2000 1000"` coordinate space. Central India locked at `X: 1030, Y: 542`.
   - Interactive military HUD `foreignObject` tooltips displaying local time, operational readiness, and facility type.
8. **Section 08: Latest from Rayonix (`src/components/home/LatestNewsSection.tsx`)**
   - Dual news cards with locked container height (`490px`).
   - Image smoothly slides upward by 35px on hover, unveiling full synopsis and red hairline CTAs.
   - Bottom CTA button with bottom-to-top background fill animation.
9. **Section 09: Explore Story Cards (`src/components/home/ExploreV5Story.tsx`)**
   - 3-column tactical story tiles (`story-careers-v5.png`, `story-company-v5.png`, `story-ecosystem-v5.png`).
10. **Section 10: Mission Starts Here (`src/components/home/ContactSection.tsx`)**
    - Updated heading: `Mission Starts Here.` with brand red accent dot.
    - 3 inquiry cards: Operational Requirement, Technology Partnership, General Connect.
    - Solid high-visibility LinkedIn brand icon.

---

### B. Subsurface Domain: Ground Penetrating Radar (`/subsurface/detect/gpr`)
- **Route:** `src/app/subsurface/detect/gpr/page.tsx`
- **Component File:** `src/components/subsurface/GPRSubpage.tsx`
- **Features:**
  - Full breadcrumbs: `Home / Subsurface / Detect / Ground Penetrating Radar`.
  - Tactical GPR radar hardware spec render with live coordinates.
  - 6-tab capabilities system: *High-Frequency Radar Imaging, Deep Geological Penetration, Real-Time Voxel Reconstruction, Multi-Array Swarm Ingestion, Subterranean Void & Anomaly Detection, Rugged Tactical Field Deployment*.
  - Interactive technical diagram matrices and downloadable spec sheets.
  - 4-block operational use cases carousel.

---

### C. Subsurface Domain: Command & Intelligence (`/subsurface/decide`)
- **Route:** `src/app/subsurface/decide/page.tsx` (Alias redirect at `src/app/subsurface/command-intelligence/page.tsx`)
- **Components:**
  1. `CommandIntelligenceHero.tsx`:
     - Display Title: `COMMAND & INTELLIGENCE` via `TransformingHeading`.
     - Subtitle: `Subsurface Sensor Fusion & Decision Support` (`#e22328`).
     - Image: `/assets/command-centre.webp` with live HUD coordinates (`GRID: X 0442 · Y 0891`) and restricted security tags.
     - 5-Column Metrics Strip: `< 50ms Telemetry Latency`, `4-Layer Fusion Engine`, `99.4% AI Verification`, `3D Vector Localisation`, `MIL-STD Interoperability`.
  2. `CommandIntelligenceCapabilities.tsx`:
     - 6 Interactive Tabs matching user docx content:
       - `01 Data Acquisition & Processing`: Ingests GPR, seismic, acoustic, hydrophone signals (waveform matrix visualization).
       - `02 AI Analytics & Classification`: Anomaly detection & signature verification (neural confidence classifier).
       - `03 Multi-Sensor Fusion`: Cross-sensor correlation (spatial radar diagram).
       - `04 Localisation & Tracking`: 3D coordinate trajectory mapping.
       - `05 Threat Assessment & Decision Support`: Automated threat prioritization matrix.
       - `06 Command & Control`: Centralized C3I geospatial situational awareness console.
     - Deep linking supported via `#data-acquisition`, `#ai-analytics`, etc.
     - Cross-browser scrollbar hiding via `.no-scrollbar` and `.scrollbar-none`.
  3. `CommandIntelligenceUseCases.tsx`:
     - 5 Tactical Use Cases:
       - `USE CASE / 001`: Border & Underground Surveillance
       - `USE CASE / 002`: Subsea Infrastructure Protection
       - `USE CASE / 003`: Critical Pipeline Security
       - `USE CASE / 004`: Maritime & Coastal Surveillance
       - `USE CASE / 005`: Integrated Subsurface Operations
     - Carousel offset math: `transform: translateX(calc(-${currentPage * 100}% - ${currentPage * 1.5}rem))` ensuring pixel-perfect card alignment without drift.

---

### D. Global Header & MegaMenu (`src/components/layout/MegaMenu.tsx`)
- Triggered on hover over primary nav items: *Sub Surface*, *Surface*, *Aerial*, *Solutions*, *Company*.
- **Sentence Case:** Submenu headers formatted in sentence case (`Detect`, `Decide`, `Respond`).
- **Cursor Override:** When MegaMenu is open, `html.megamenu-open body` enforces `cursor: default !important;` so the custom sniper crosshair does not interfere with reading or clicking links.
- **Direct Deep-Links:** Sub Surface > Decide links route directly to `/subsurface/decide#[capability-anchor]`.

---

## 7. Hard-Learned Lessons & Critical Bug Fixes

1. **Cloudflare Pages Next-on-Pages Windows Bug:**
   - **Problem:** Running `@cloudflare/next-on-pages` directly on Windows fails with `spawn bash ENOENT` because the CLI expects bash in `PATH`.
   - **Solution:** Always run deployments via `node scripts/deploy.js` or `node scripts/patch-nop.js`, which injects `D:\Git\bin;D:\Git\usr\bin` into `process.env.PATH`.
2. **Ecosystem Carousel Left Bleed & Tab Truncation:**
   - **Problem:** Dynamic JavaScript `getBoundingClientRect()` measurements caused hydration mismatches, cutting off the leftmost tab name and bleeding carousel cards to the left margin.
   - **Solution:** Discarded all dynamic JS measurement loops. Replaced with pure, deterministic CSS grid containers (`max-w-[1280px] mx-auto px-6 sm:px-8`) and applied `clip-path: inset(0 0 0 0)` to the outer carousel viewport so the carousel bleeds only to the right.
3. **Carousel Gap Translation Drift:**
   - **Problem:** Using `transform: translateX(-${page * 100}%)` with a `gap-6` (1.5rem) causes slides to drift off-center by 24px per slide.
   - **Solution:** Use `transform: translateX(calc(-${page * 100}% - ${page * 1.5}rem))`.
4. **Scrollbar Suppression Across Chrome / Safari / Edge / Firefox:**
   - Always define both `.no-scrollbar` and `.scrollbar-none` in `globals.css` with `::-webkit-scrollbar { display: none !important; }`, `-ms-overflow-style: none !important;`, and `scrollbar-width: none !important;`.

---

## 8. Build, Verification & Deployment Pipeline

### Deployment Command:
```bash
node scripts/deploy.js
```

### What `scripts/deploy.js` Executes:
1. **`patch-nop.js`:** Patches `next-on-pages` for Windows environments.
2. **`npx vercel build`:** Compiles Next.js App Router static pages, bundles, and serverless functions into `.vercel/output`.
3. **`pnpm exec next-on-pages --skip-build`:** Bundles Cloudflare Edge Worker (`_worker.js`) from `.vercel/output`.
4. **`npx wrangler pages deploy .vercel/output/static --project-name=rayonix-site --branch=main`:** Uploads static assets and worker bundle directly to Cloudflare Pages edge.

### Local Quality Assurance:
- **Build Verification:** Run `npx vercel build` locally to verify 0 TypeScript or Next.js build errors.
- **Browser Subagent:** Run visual verification across desktop (1440px / 1280px) and mobile (375px) viewports to confirm zero horizontal window scrolling (`overflow-x: hidden`), zero layout shift, and clean console logs.

---

## 9. Current Status & Immediate Next Steps

### Completed Work:
- [x] Full Homepage implementation with 10 sections and Apple-grade animations.
- [x] Global MegaMenu with deep links and cursor handling.
- [x] Sniper crosshair cursor with live coordinate HUD.
- [x] Section 02 typography refinement (`xl:text-[64px] xl:tracking-[2px]`).
- [x] Section 03 Ecosystem tab alignment & zero left bleed fix.
- [x] Subsurface Detect GPR subpage (`/subsurface/detect/gpr`).
- [x] Subsurface Decide Command & Intelligence page (`/subsurface/decide`) with 6 capabilities and 5 use cases from user docx.
- [x] Deployed and verified live at [https://6d875e3d.rayonix-site.pages.dev](https://6d875e3d.rayonix-site.pages.dev).

### Immediate Next Steps for Claude:
1. **Complete Remaining Subsurface Detect Pages:**
   - Fibre Optic Distributed Acoustic Sensing (DAS)
   - Seismic Sensor Arrays
   - Hydrophone Underwater Networks
2. **Surface Domain Architecture:**
   - Develop `/domains/surface` overview page and subpages for *EO/IR systems*, *Radar surveillance masts*, and *Tactical Command vehicles*.
3. **Aerial Domain Architecture:**
   - Develop `/domains/aerial` overview page and subpages for *Airborne sensor pods*, *Autonomous drone swarms*, and *Counter-UAS systems*.
4. **Company & Solutions Subpages:**
   - Build out dedicated `/about`, `/careers`, and `/solutions` deep dives using the same tactical design language and Apple-tier visual standards.

---

*This document serves as the single source of truth for the Rayonix web architecture. Maintain strict fidelity to `GEMINI.md` and keep all git commits clean and descriptive.*
