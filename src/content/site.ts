/**
 * Site-wide contact details, offices and feature flags.
 *
 * Single source of truth: every email, phone number, address and the LinkedIn
 * URL on the site is imported from here. Change a value once and it updates in
 * the header, footer, Contact page and API.
 */

export const SITE_URL = "https://rayonix.com";

export const CONTACT = {
  email: "info@rayonix.in",
  emailAustralia: "info@rayonix.au",
  phoneDisplay: "+91 89397 92592",
  phoneHref: "tel:+918939792592",
  linkedin: "https://linkedin.com/company/rayonix",
  /** Default recipient for /api/contact notifications (overridden by the CONTACT_TO env var). */
  recipient: "info@rayonix.in",
} as const;

export type Office = {
  id: "india" | "australia";
  /** Region label, e.g. "INDIA". */
  region: string;
  /** Role label, e.g. "Headquarters". */
  role: string;
  entity: string;
  cities?: string;
  address: string;
  phone?: { display: string; href: string };
  email: string;
};

export const OFFICES: Office[] = [
  {
    id: "india",
    region: "INDIA",
    role: "Headquarters",
    entity: "Rayonix Tech Private Limited",
    cities: "Delhi · Hyderabad · Mumbai · Chennai · Bangalore",
    address: "H.O.: Plot 89, 4th Floor, Sector 44, Gurugram – 122003",
    phone: { display: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    email: CONTACT.email,
  },
  {
    id: "australia",
    region: "AUSTRALIA",
    role: "Global Presence",
    entity: "Rayonix Australia Pty Ltd",
    address: "PO Box 4021, Carlton, NSW 2218, Australia",
    // TODO_CONTENT: Australia phone. The source copy has a placeholder ("+91 000-0000-0000"), so it is left out.
    email: CONTACT.emailAustralia,
  },
];

export const GLOBAL_PRESENCE = {
  heading: "Our Global Presence",
  subheading: "Rooted in India. Connected to the World.",
};

/* -------------------------------------------------------------------------- */
/* Contact subjects                                                            */
/* -------------------------------------------------------------------------- */

export const CONTACT_SUBJECTS = [
  { value: "sales", label: "Sales & Demonstrations" },
  { value: "defence-solutions", label: "Defence Solutions & Enquiries" },
  { value: "partnerships", label: "Technology Partnerships" },
  { value: "global", label: "Global Collaborations" },
  { value: "media", label: "Media & Press" },
  { value: "careers", label: "Careers" },
  { value: "general", label: "General Enquiries" },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]["value"];

export function isContactSubject(v: unknown): v is ContactSubject {
  return typeof v === "string" && CONTACT_SUBJECTS.some((s) => s.value === v);
}

/** Link to the Contact page with the subject (and optionally a product) preselected. */
export function contactHref(subject?: ContactSubject, product?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (product) params.set("product", product);
  const qs = params.toString();
  return qs ? `/contact?${qs}` : "/contact";
}

/* -------------------------------------------------------------------------- */
/* Flags for decisions the client has not confirmed yet (one-line changes)     */
/* -------------------------------------------------------------------------- */

export const FLAGS = {
  /** Client structure removes the X Factor tab (X Labs, neXr, Mcray) from the Company menu. */
  SHOW_XFACTOR_IN_COMPANY_MENU: false,
  /**
   * Surface and Aerial Decide use cases are copies of the Subsurface ones.
   * Hidden until domain-specific copy arrives.
   */
  SHOW_SURFACE_AERIAL_DECIDE_USE_CASES: false,
} as const;

/** Careers label used in the menu, footer and homepage. URL stays /careers. */
export const CAREERS_LABEL = "Build With Us";

export const COPYRIGHT = "© 2026 Rayonix. All Rights Reserved.";
export const CLOSING_BRAND_LINE = "Invisible Warfare. Visible Impact.";
