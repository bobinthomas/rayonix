# Rayonix QA Backlog & Pending Content Tracker

This document tracks all deferred content, stub pages, temporarily hidden navigation items, and performance optimizations identified in the comprehensive QA audit (`rayonix-qa` report).

---

## 1. Stub Pages (Marked `noindex`, Excluded from Sitemap)
These routes currently display tactical placeholder cards and are set to `robots: { index: false, follow: true }`. They will be published to the sitemap once copy and assets are provided by the client.

| Route | Purpose / Required Content |
|---|---|
| `/solutions` | Master overview catalog of defence solutions. |
| `/domains/surface` | Surface Warfare & Ground Systems domain overview. |
| `/domains/aerial` | Aerial Autonomous & C-UAS Systems domain overview. |
| `/ecosystem` | Integrated Defence Ecosystem overview. |
| `/ecosystem/mcray-xtend` | Partner deep dive for McCray Xtend joint development. |
| `/ecosystem/nexr-optronics` | Partner deep dive for Nexr Optronics integration. |
| `/careers` | Full careers portal, open positions, and culture overview. |
| `/privacy` | Legal Privacy Policy document. |
| `/terms` | Legal Terms & Conditions document. |
| `/news/xtend-coverage` | Full article copy for Xtend media coverage. |
| `/news/shephard-coverage` | Full article copy for Shephard media coverage. |
| `/news/xtend-partnership` | Full press release for Xtend partnership announcement. |

---

## 2. Temporarily Hidden Navigation Items & Original Hrefs
These items were removed or collapsed in `src/components/layout/MegaMenu.tsx` to prevent 404s and dead anchors. Restore them once the corresponding sections or landing pages are authored:

### Surface Domain
- **Mode: Decide (6 links collapsed to `/domains/surface`)**
  - Ground C2: `/subsurface/decide#command-control`
  - Multi-Sensor Fusion: `/subsurface/decide#multi-sensor-fusion`
  - Target Tracking: `/subsurface/decide#localisation-tracking`
  - Threat Analysis: `/subsurface/decide#threat-assessment`
  - Sensor Integration: `/subsurface/decide#data-acquisition`
  - Threat Classification: `/subsurface/decide#ai-analytics`
- **Acoustic Sensor:** `/domains/surface#acoustic-sensor`

### Aerial Domain
- **Mode: Decide (6 links collapsed to `/domains/aerial`)**
  - Airborne C2: `/subsurface/decide#command-control`
  - Radar-Optical Fusion: `/subsurface/decide#multi-sensor-fusion`
  - Aerial Tracking: `/subsurface/decide#localisation-tracking`
  - Air Threat Analysis: `/subsurface/decide#threat-assessment`
  - Telemetry Ingestion: `/subsurface/decide#data-acquisition`
  - Drone Classification: `/subsurface/decide#ai-analytics`

### Solutions / Enterprise
- **Critical Infrastructure (5 links collapsed to 1 `/solutions/critical-infrastructure-protection`):**
  - Subsea Infrastructure: `/solutions/subsea-infrastructure`
  - Border Security: `/solutions/border-security`
  - Military Bases: `/solutions/military-bases`
  - Perimeter Defense: `/solutions/perimeter-defense`
  - Port Security: `/solutions/port-security`
- **Industrial AI:** `/solutions/industrial-ai`

### Company & X-Factor
- **Leadership:** `/about#leadership` (Restore once Leadership bio cards are added to About page).
- **Indigenous Innovation:** `/ecosystem/x-labs#innovation` (Restore once section anchor exists).
- **Careers (4 links collapsed to `/careers`):**
  - Open Positions: `/careers#open-positions`
  - Culture & Values: `/careers#culture`
  - Engineering: `/careers#engineering`
  - Internships: `/careers#internships`

---

## 3. Removed Placeholder Assets & Content
- **Datasheet PDFs:** Deleted the two 313-byte placeholder PDFs (`public/downloads/gpr-platform-brochure.pdf` and `public/downloads/gpr-technical-specifications.pdf`). Re-upload genuine product spec sheets and re-enable download links in `src/content/products/gpr.ts` once client approves the official brochures.
- **Australia Office Phone:** Removed `Phone: +91 000-0000-` from `src/components/layout/Footer.tsx`. Add verified Australian office contact number once allocated.
- **Solution Hero Mock Coordinates:** Removed dummy coordinate string `LAT 33.4241° N // LON 111.9281° W` from `src/components/solution/SolutionPage.tsx`.

---

## 4. Phase 2 Performance & Core Web Vitals (Completed)
- **Layout Shift / CLS (`TransformingHeading.tsx` - QA-010):**
  - Rendered final static text in regular document flow as an invisible sizing reference (`style={{ visibility: "hidden" }}` and `aria-hidden="true"`), locking container dimensions, line height, and line wrapping permanently from first paint.
  - Positioned animated cycling glyph stream in an absolute overlay (`absolute inset-0`). Sibling elements below the heading (hero visuals, eyebrow, intro paragraphs) now experience zero displacement during character transformation (CLS = 0).
- **Mobile Page Weight & LCP (QA-012):**
  - Replaced unoptimized multi-megabyte PNGs across MegaMenu spotlights and home sections with crisp WebP images:
    - `/assets/ecosystem-1.webp`: 34 KiB (down from 6.68 MB PNG, a 99.5% reduction).
    - `/assets/ecosystem-2.webp`: 51 KiB (down from 649 KB PNG).
    - `/assets/field-drone.webp`: 45 KiB (down from 904 KB PNG).
    - `/assets/command-centre.webp`: 55 KiB (down from 11.0 MB PNG).
    - `/assets/story-company.webp`: 22 KiB (down from 421 KB PNG).
    - `/assets/battlespace-bg.webp`: 26 KiB (down from 1.02 MB PNG).
    - `/assets/world-map-2.webp`: 70 KiB (down from 1.97 MB PNG).
    - `/assets/detect-decide-respond-bg.webp`: 31 KiB (down from 531 KB PNG).
    - All 7 ecosystem tab images scaled and compressed to ~50-149 KiB each (down from 4+ MB total).
  - Video streaming optimization:
    - Transcoded `public/assets/videos/website-hero-mobile.mp4` down to 2.0 MB (from 6.2 MB) with `faststart` atom placement.
    - Added lazy IntersectionObserver attachment on `FieldDroneBanner.tsx` video with `preload="none"`. The original `autoPlay` + `preload="metadata"` pulled the full 6.7 MB `ai-robotics-web.mp4` on page load; it now downloads only when the banner nears the viewport.
    - Re-encoded `story-news2-v5.webp` (home, `ExploreSection`) from its 7.4 MB PNG source at 1280px width: 569 KB → 29 KB.
    - Re-encoded desktop hero `public/assets/videos/website-hero-web.mp4` from 21.7 MB (1920px) to 3.8 MB (1280px, H.264 CRF 34, 450 kbps cap, faststart, no audio). Original kept outside the repo. Frame comparison at 40 s looked comparable; slightly softer on high-DPI screens.
