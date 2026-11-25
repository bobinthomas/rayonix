/** Company mega menu and mobile menu structure (client structure, section 3.2). */
import { CAREERS_LABEL } from "./site";

export type NavItem = { title: string; description: string; href: string };
export type NavGroup = { id: string; label: string; items: NavItem[] };

export const COMPANY_MENU: NavGroup[] = [
  {
    id: "about",
    label: "About Us",
    items: [
      { title: "Mission", description: "To build integrated, mission-ready defence capabilities", href: "/about#mission" },
      { title: "Vision", description: "Technology transfer today. Local manufacturing tomorrow.", href: "/about#vision" },
      { title: "Leadership", description: "Amit Pande and Ravi Janarthanan", href: "/about#leadership" },
    ],
  },
  {
    id: "newsroom",
    label: "Newsroom",
    items: [{ title: "Newsroom", description: "The Latest from Rayonix.", href: "/news" }],
  },
  {
    id: "contact",
    label: "Contact",
    items: [{ title: "Contact", description: "Let's Start a Conversation.", href: "/contact" }],
  },
  {
    id: "careers",
    label: CAREERS_LABEL,
    items: [{ title: CAREERS_LABEL, description: "Build What Matters. Shape What's Next.", href: "/careers" }],
  },
];

/** Shown only when FLAGS.SHOW_XFACTOR_IN_COMPANY_MENU is true. */
export const XFACTOR_MENU: NavGroup = {
  id: "xfactor",
  label: "X Factor",
  items: [
    { title: "X Labs", description: "Research. Develop. Innovate.", href: "/ecosystem/x-labs" },
    { title: "neXr Optronics", description: "See More. Detect Better.", href: "/ecosystem/nexr-optronics" },
    { title: "Mcray Xtend", description: "Advancing the Future of UAVs.", href: "/ecosystem/mcray-xtend" },
  ],
};
