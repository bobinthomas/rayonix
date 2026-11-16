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
    scale: {
      hero: {
        fontSize: "4rem", // 64px
        lineHeight: "4.5rem", // 72px
        fontWeight: "700",
        letterSpacing: "-0.035em",
      },
      sectionHeading: {
        fontSize: "3rem", // 48px
        lineHeight: "3.5rem", // 56px
        fontWeight: "500",
        letterSpacing: "-0.025em",
      },
      heading: {
        fontSize: "2rem", // 32px
        lineHeight: "2.5rem", // 40px
        fontWeight: "400",
        letterSpacing: "-0.02em",
      },
      cardTitle: {
        fontSize: "1.5rem", // 24px
        lineHeight: "2rem", // 32px
        fontWeight: "500",
        letterSpacing: "-0.015em",
      },
      bodyLarge: {
        fontSize: "1.125rem", // 18px
        lineHeight: "1.75rem", // 28px
        fontWeight: "400",
      },
      body: {
        fontSize: "1rem", // 16px
        lineHeight: "1.5rem", // 24px
        fontWeight: "400",
      },
      label: {
        fontSize: "0.875rem", // 14px
        lineHeight: "1.25rem", // 20px
        fontWeight: "500",
        letterSpacing: "0.06em",
        textTransform: "uppercase" as const,
      },
      caption: {
        fontSize: "0.75rem", // 12px
        lineHeight: "1.125rem", // 18px
        fontWeight: "400",
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
