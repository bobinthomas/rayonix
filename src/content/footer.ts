/** Footer copy and link columns (client content). */
import { CAREERS_LABEL } from "./site";

export const FOOTER_BRAND = {
  tagline: "Detect. Decide. Respond.",
  line: "Technology built for what lies beyond the visible.",
};

export type FooterLink = { label: string; href: string };

export const FOOTER_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "Solutions", href: "/solutions" },
      { label: "Platforms", href: "/platforms" },
      { label: "Technologies", href: "/ecosystem" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Newsroom", href: "/news" },
      { label: "Contact Us", href: "/contact" },
      { label: CAREERS_LABEL, href: "/careers" },
    ],
  },
];

export const FOOTER_LEGAL: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
