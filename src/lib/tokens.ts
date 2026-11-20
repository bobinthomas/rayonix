/**
 * Rayonix Design System Tokens
 * Source of Truth: Figma (Rayonix — Full Homepage · Dark Premium)
 * High-performance, zero-CLS constants
 */

export const tokens = {
  colors: {
    background: {
      canvas: "#080f12",
      panel: "#10181c",
      footer: "#000000",
      action: "#e22328",
      actionInverse: "#f5f6f6",
    },
    border: {
      subtle: "#253035",
      hairline: "rgba(255, 255, 255, 0.08)",
      accent: "#e22328",
    },
    text: {
      primary: "#f5f6f6",
      secondary: "#bdc4c8",
      muted: "#7f8a91",
      inverse: "#080f12",
      accent: "#e22328",
    },
    footer: {
      background: "#000000",
      textSecondary: "#bdbdbd",
      textMuted: "#808080",
    },
  },
  typography: {
    fontFamilies: {
      sans: "var(--font-sans)",
      display: "var(--font-display)",
      mono: "var(--font-mono)",
    },
    /**
     * Type scale — the ONLY sizes the site should use.
     * Each role compiles to a Tailwind class `type-<role>` (see tailwind.config.ts)
     * that is mobile-first and switches to `desktop` at the `lg` breakpoint (1024px).
     * Use the class instead of hand-written text-[NNpx] / leading-[NNpx] / tracking-[…].
     *
     * Gordita ships 400 / 500 / 700 only in practice — never use 600 (renders as 700).
     */
    desktopBreakpoint: "1024px",
    scale: {
      /** Product hero, short names (e.g. "GPR") */
      display: {
        mobile: { fontSize: "60px", lineHeight: "60px" },
        desktop: { fontSize: "128px", lineHeight: "128px" },
        fontWeight: "700",
        letterSpacing: "-0.025em",
      },
      /** Product hero, longer names (e.g. "Command & intelligence") */
      displayLong: {
        mobile: { fontSize: "48px", lineHeight: "52px" },
        desktop: { fontSize: "104px", lineHeight: "108px" },
        fontWeight: "700",
        letterSpacing: "-0.025em",
      },
      /** Page hero H1 on every non-product page; also big home section statements */
      hero: {
        mobile: { fontSize: "36px", lineHeight: "44px" },
        desktop: { fontSize: "64px", lineHeight: "72px" },
        fontWeight: "700",
        letterSpacing: "-0.035em",
      },
      /** Section heading (H2) */
      h2: {
        mobile: { fontSize: "30px", lineHeight: "38px" },
        desktop: { fontSize: "48px", lineHeight: "56px" },
        fontWeight: "500",
        letterSpacing: "-0.025em",
      },
      /** Large statement copy / featured card titles (e.g. Battlespace paragraph, "Detect.") */
      statement: {
        mobile: { fontSize: "22px", lineHeight: "32px" },
        desktop: { fontSize: "32px", lineHeight: "40px" },
        fontWeight: "400",
        letterSpacing: "-0.01em",
      },
      /** Figures: "15+", "600 MHz", "14+" */
      stat: {
        mobile: { fontSize: "26px", lineHeight: "32px" },
        desktop: { fontSize: "40px", lineHeight: "48px" },
        fontWeight: "500",
        letterSpacing: "-0.025em",
      },
      /** Card / sub-section title (H3) */
      h3: {
        mobile: { fontSize: "20px", lineHeight: "28px" },
        desktop: { fontSize: "24px", lineHeight: "32px" },
        fontWeight: "500",
        letterSpacing: "-0.015em",
      },
      /** Lead / intro paragraph */
      bodyLg: {
        mobile: { fontSize: "16px", lineHeight: "26px" },
        desktop: { fontSize: "18px", lineHeight: "28px" },
        fontWeight: "400",
        letterSpacing: "0",
      },
      /** Default paragraph */
      body: {
        mobile: { fontSize: "16px", lineHeight: "24px" },
        desktop: { fontSize: "16px", lineHeight: "24px" },
        fontWeight: "400",
        letterSpacing: "0",
      },
      /** Secondary text, card descriptions, nav sub-items */
      small: {
        mobile: { fontSize: "14px", lineHeight: "20px" },
        desktop: { fontSize: "14px", lineHeight: "20px" },
        fontWeight: "400",
        letterSpacing: "0",
      },
      /** Dates, legal, metadata */
      caption: {
        mobile: { fontSize: "12px", lineHeight: "18px" },
        desktop: { fontSize: "12px", lineHeight: "18px" },
        fontWeight: "400",
        letterSpacing: "0",
      },
      /** Buttons and text CTAs ("Learn more", "Read article") */
      cta: {
        mobile: { fontSize: "16px", lineHeight: "24px" },
        desktop: { fontSize: "16px", lineHeight: "24px" },
        fontWeight: "500",
        letterSpacing: "0",
      },
      /** Eyebrows / kicker labels ("01 / Company", "Usecase/001") */
      eyebrow: {
        mobile: { fontSize: "12px", lineHeight: "16px" },
        desktop: { fontSize: "13px", lineHeight: "20px" },
        fontWeight: "500",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      },
    },
  },
  spacing: {
    pageInset: "84px",
    sectionGap: "80px",
    cardPadding: "24px",
  },
  radii: {
    card: "4px",
    square: "0px",
  },
  motion: {
    easeApple: [0.16, 1, 0.3, 1] as const,
    easeAppleCss: "cubic-bezier(0.16, 1, 0.3, 1)",
    durationFast: 0.25,
    durationMedium: 0.45,
    durationSlow: 0.75,
  },
} as const;

export type DesignTokens = typeof tokens;
