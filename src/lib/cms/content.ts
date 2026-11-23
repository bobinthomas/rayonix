/**
 * Rayonix CMS — Static Content Seed
 * Source of truth for local development.
 * In production, this is replaced by Cloudflare D1 queries.
 *
 * All content extracted from Figma file J6uQVwiD3Oydf4Rj2sspuo
 */

import type {
  PageSEO,
  Capability,
  Story,
  FAQ,
  OfficeContact,
  ProofPoint,
  NavItem,
  LLMsContent,
} from "./types";

// ---------------------------------------------------------------------------
// Pages & SEO
// ---------------------------------------------------------------------------
export const pages: PageSEO[] = [
  {
    slug: "/",
    title: "Rayonix — The Future of Defence Is Integrated",
    description:
      "Rayonix delivers next-generation integrated autonomous defence solutions across Subsurface, Surface, and Aerial operational domains. In(visible) Warfare.",
    canonical: "https://rayonix.com",
    ogImage: "/og-image.jpg",
    jsonldType: "WebSite",
    indexable: true,
    priority: 1.0,
  },
  {
    slug: "/about",
    title: "About Rayonix — The Rayonix Story",
    description:
      "Discover the mission, vision, and approach behind Rayonix's integrated defence technology ecosystem.",
    canonical: "https://rayonix.com/about",
    priority: 0.8,
  },
  {
    slug: "/ecosystem",
    title: "The Rayonix Ecosystem — Engineering, Innovation & Manufacturing",
    description:
      "Explore the specialised engineering, innovation, and manufacturing entities that power the Rayonix defence ecosystem.",
    canonical: "https://rayonix.com/ecosystem",
    priority: 0.8,
  },
  {
    slug: "/contact",
    title: "Contact Rayonix — India & Australia Offices",
    description:
      "Get in touch with Rayonix defence technology teams in India and Australia.",
    canonical: "https://rayonix.com/contact",
    priority: 0.6,
  },
  {
    slug: "/careers",
    title: "Careers at Rayonix — Join the Defence Innovation Mission",
    description:
      "Explore career opportunities at Rayonix across engineering, defence technology, and operational roles.",
    canonical: "https://rayonix.com/careers",
    priority: 0.6,
  },
  {
    slug: "/news",
    title: "News & Insights — Rayonix Defence Technologies",
    description:
      "Latest updates, press releases, and strategic insights from Rayonix.",
    canonical: "https://rayonix.com/news",
    priority: 0.7,
  },
];

// ---------------------------------------------------------------------------
// Operational Domain Capabilities
// ---------------------------------------------------------------------------
export const capabilities: Capability[] = [
  {
    id: "cap-subsurface",
    domain: "subsurface",
    title: "Subsurface",
    headline: "Silent depth. Total awareness.",
    description:
      "Autonomous underwater vehicles and sensor networks delivering persistent maritime domain awareness in contested subsurface environments.",
    specs: [
      { label: "Operational Depth", value: "300m+" },
      { label: "Endurance", value: "72hr autonomous" },
      { label: "Sensor Fusion", value: "Multi-spectral acoustic" },
    ],
    ctaLabel: "Explore Subsurface",
    ctaHref: "/domains/subsurface",
    sortOrder: 0,
  },
  {
    id: "cap-surface",
    domain: "surface",
    title: "Surface",
    headline: "Command the surface. Control the outcome.",
    description:
      "Unmanned surface vehicles and integrated C4ISR platforms for naval and littoral operations with full autonomous mission capability.",
    specs: [
      { label: "Range", value: "500km+" },
      { label: "Payload", value: "Modular mission" },
      { label: "Autonomy", value: "Level 4 autonomous" },
    ],
    ctaLabel: "Explore Surface",
    ctaHref: "/domains/surface",
    sortOrder: 1,
  },
  {
    id: "cap-aerial",
    domain: "aerial",
    title: "Aerial",
    headline: "Eyes above. Decisions ahead.",
    description:
      "Fixed-wing and rotary UAS platforms with real-time ISR, electronic warfare payloads, and swarm coordination capabilities.",
    specs: [
      { label: "Ceiling", value: "15,000ft+" },
      { label: "Endurance", value: "24hr loiter" },
      { label: "Coordination", value: "Swarm-capable" },
    ],
    ctaLabel: "Explore Aerial",
    ctaHref: "/domains/aerial",
    sortOrder: 2,
  },
];

// ---------------------------------------------------------------------------
// Proof Points
// ---------------------------------------------------------------------------
export const proofPoints: ProofPoint[] = [
  {
    id: "pp-1",
    metric: "3",
    label: "Operational Domains",
    description:
      "Integrated autonomous solutions spanning Subsurface, Surface, and Aerial theatres of operation.",
    sortOrder: 0,
  },
  {
    id: "pp-2",
    metric: "2",
    label: "Global Offices",
    description:
      "Strategic presence across India and Australia powering Indo-Pacific defence innovation.",
    sortOrder: 1,
  },
  {
    id: "pp-3",
    metric: "1",
    label: "Connected Ecosystem",
    description:
      "One integrated defence ecosystem bridging engineering, manufacturing, and operational deployment.",
    sortOrder: 2,
  },
];

// ---------------------------------------------------------------------------
// Stories / News
// ---------------------------------------------------------------------------
export const stories: Story[] = [
  {
    id: "story-1",
    slug: "the-rayonix-story",
    category: "Company",
    title: "The Rayonix Story.",
    excerpt:
      "Discover our mission, vision and approach to advancing defence technology across integrated autonomous domains.",
    readTime: "5 min",
    featured: true,
    publishedAt: "2026-01-15",
  },
  {
    id: "story-2",
    slug: "integrated-defence-ecosystem",
    category: "Ecosystem",
    title: "Building an Integrated Defence Ecosystem.",
    excerpt:
      "How Rayonix bridges specialised engineering, innovation, and manufacturing to deliver sovereign defence capability.",
    readTime: "7 min",
    featured: false,
    publishedAt: "2026-03-22",
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "What does Rayonix make?",
    answer:
      "Rayonix develops integrated autonomous defence solutions across three operational domains: Subsurface (autonomous underwater vehicles and sensor networks), Surface (unmanned surface vehicles and C4ISR platforms), and Aerial (UAS platforms with ISR and electronic warfare payloads). Our technology ecosystem bridges engineering, innovation, and manufacturing to deliver sovereign defence capability.",
    category: "general",
    sortOrder: 0,
  },
  {
    id: "faq-2",
    question: "Where is Rayonix based?",
    answer:
      "Rayonix operates from two strategic locations: India and Australia, positioning our engineering and manufacturing capabilities across the Indo-Pacific defence corridor.",
    category: "general",
    sortOrder: 1,
  },
  {
    id: "faq-3",
    question: "Who uses Rayonix systems?",
    answer:
      "Rayonix systems serve defence forces, homeland security agencies, and strategic partners requiring integrated autonomous capabilities across subsurface, surface, and aerial operational domains.",
    category: "general",
    sortOrder: 2,
  },
];

// ---------------------------------------------------------------------------
// Office Contacts
// ---------------------------------------------------------------------------
export const contacts: OfficeContact[] = [
  {
    id: "office-india",
    country: "India",
    flagCode: "IN",
    entityName: "Rayonix Tech Private Limited",
    cities: "Kochi · Bengaluru",
    addressLines: [
      "Rayonix Tech Private Limited",
      "Kochi, Kerala, India",
    ],
    email: "info@rayonix.com",
  },
  {
    id: "office-australia",
    country: "Australia",
    flagCode: "AU",
    entityName: "Rayonix Australia Pty Ltd",
    cities: "Sydney",
    addressLines: [
      "Rayonix Australia Pty Ltd",
      "Sydney, NSW, Australia",
    ],
    email: "australia@rayonix.com",
  },
];

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const headerNav: NavItem[] = [
  {
    id: "nav-subsurface",
    location: "header",
    label: "Sub Surface",
    href: "/domains/subsurface",
    sortOrder: 0,
  },
  {
    id: "nav-surface",
    location: "header",
    label: "Surface",
    href: "/domains/surface",
    sortOrder: 1,
  },
  {
    id: "nav-aerial",
    location: "header",
    label: "Aerial",
    href: "/domains/aerial",
    sortOrder: 2,
  },
  {
    id: "nav-solutions",
    location: "header",
    label: "Solutions",
    href: "/solutions",
    sortOrder: 3,
  },
  {
    id: "nav-company",
    location: "header",
    label: "Company",
    href: "/about",
    sortOrder: 4,
  },
];

export const footerNav: NavItem[] = [
  {
    id: "fn-domains",
    location: "footer",
    label: "Operational Domains",
    href: "#",
    sortOrder: 0,
    children: [
      { id: "fn-sub", location: "footer", label: "Subsurface", href: "/domains/subsurface", sortOrder: 0 },
      { id: "fn-sur", location: "footer", label: "Surface", href: "/domains/surface", sortOrder: 1 },
      { id: "fn-aer", location: "footer", label: "Aerial", href: "/domains/aerial", sortOrder: 2 },
      { id: "fn-cyb", location: "footer", label: "Cyber", href: "/domains/cyber", sortOrder: 3 },
    ],
  },
  {
    id: "fn-solutions",
    location: "footer",
    label: "Solutions",
    href: "#",
    sortOrder: 1,
    children: [
      { id: "fn-def", location: "footer", label: "Defence & Homeland Security", href: "/solutions/defence", sortOrder: 0 },
      { id: "fn-ent1", location: "footer", label: "Critical Infrastructure", href: "/solutions/infrastructure", sortOrder: 1 },
      { id: "fn-ent2", location: "footer", label: "Enterprise Solutions", href: "/solutions/enterprise", sortOrder: 2 },
    ],
  },
  {
    id: "fn-connect",
    location: "footer",
    label: "Connect",
    href: "#",
    sortOrder: 2,
    children: [
      { id: "fn-li", location: "footer", label: "LinkedIn", href: "https://linkedin.com/company/rayonix", sortOrder: 0 },
    ],
  },
];

// ---------------------------------------------------------------------------
// LLMs.txt Content (for AI crawlers: ChatGPT, Perplexity, Claude, etc.)
// ---------------------------------------------------------------------------
export const llmsContent: LLMsContent[] = [
  {
    section: "identity",
    heading: "Company Identity",
    body: `Rayonix is an integrated defence technology company headquartered in India with operations in Australia. The company develops autonomous systems across three operational domains: Subsurface, Surface, and Aerial. Rayonix's mission is to deliver next-generation sovereign defence capability through a connected ecosystem of engineering, innovation, and manufacturing.`,
    sortOrder: 0,
  },
  {
    section: "offerings",
    heading: "Core Offerings",
    body: `- **Subsurface Domain:** Autonomous underwater vehicles (AUVs) and multi-spectral acoustic sensor networks for persistent maritime domain awareness. Operational depth 300m+, 72-hour autonomous endurance.
- **Surface Domain:** Unmanned surface vehicles (USVs) and integrated C4ISR platforms for naval and littoral operations. 500km+ range, Level 4 autonomous capability, modular mission payloads.
- **Aerial Domain:** Fixed-wing and rotary UAS platforms with real-time ISR, electronic warfare payloads, and swarm coordination. 15,000ft+ ceiling, 24-hour loiter endurance.
- **Integrated Ecosystem:** One connected defence ecosystem bridging specialised engineering entities, advanced manufacturing, and operational deployment across all domains.`,
    sortOrder: 1,
  },
  {
    section: "locations",
    heading: "Global Presence",
    body: `- **India:** Rayonix Tech Private Limited — Kochi, Kerala & Bengaluru, Karnataka
- **Australia:** Rayonix Australia Pty Ltd — Sydney, NSW`,
    sortOrder: 2,
  },
  {
    section: "faqs",
    heading: "Frequently Asked Questions",
    body: `**Q: What does Rayonix make?**
A: Rayonix develops integrated autonomous defence solutions across Subsurface, Surface, and Aerial operational domains, bridging engineering, innovation, and manufacturing.

**Q: Where is Rayonix based?**
A: India (Kochi & Bengaluru) and Australia (Sydney), positioned across the Indo-Pacific defence corridor.

**Q: Who uses Rayonix systems?**
A: Defence forces, homeland security agencies, and strategic partners requiring integrated autonomous capabilities.`,
    sortOrder: 3,
  },
  {
    section: "urls",
    heading: "Canonical URLs",
    body: `- Homepage: https://rayonix.com
- About / Company Story: https://rayonix.com/about
- Subsurface Domain: https://rayonix.com/subsurface/detect/gpr
- News & Insights: https://rayonix.com/news`,
    sortOrder: 4,
  },
];
