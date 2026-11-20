import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import type { CSSRuleObject } from "tailwindcss/types/config";
import { tokens } from "./src/lib/tokens";

/**
 * Generates one responsive class per type role from tokens.typography.scale:
 *   .type-hero, .type-h2, .type-body-lg, .type-eyebrow, …
 * Mobile values apply by default; desktop values from the lg breakpoint up.
 */
const typeScale = plugin(({ addComponents }) => {
  const { scale, desktopBreakpoint } = tokens.typography;
  const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
  const components: CSSRuleObject = {};

  for (const [role, t] of Object.entries(scale)) {
    components[`.type-${kebab(role)}`] = {
      fontSize: t.mobile.fontSize,
      lineHeight: t.mobile.lineHeight,
      fontWeight: t.fontWeight,
      letterSpacing: t.letterSpacing,
      ...("textTransform" in t ? { textTransform: t.textTransform } : {}),
      [`@media (min-width: ${desktopBreakpoint})`]: {
        fontSize: t.desktop.fontSize,
        lineHeight: t.desktop.lineHeight,
      },
    };
  }

  addComponents(components);
});

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rayonix: {
          canvas: "var(--rayonix-background-canvas, #080f12)",
          panel: "var(--rayonix-background-panel, #10181c)",
          footer: "var(--rayonix-footer-background, #000000)",
          border: "var(--rayonix-border-subtle, #253035)",
          accent: "var(--rayonix-accent-brand, #e22328)",
          "accent-hover": "#b81b20",
          text: {
            primary: "var(--rayonix-text-primary, #f5f6f6)",
            secondary: "var(--rayonix-text-secondary, #bdc4c8)",
            muted: "var(--rayonix-text-muted, #7f8a91)",
            inverse: "var(--rayonix-text-inverse, #080f12)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        "display-tight": "-0.035em",
        "display-normal": "-0.02em",
        "label-loose": "0.12em",
      },
      borderRadius: {
        card: "4px",
        square: "0px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "hairline-dark": "inset 0 0 0 1px rgba(255, 255, 255, 0.08)",
        "hairline-accent": "inset 0 0 0 1px rgba(226, 35, 40, 0.3)",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [typeScale],
};

export default config;
