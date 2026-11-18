/**
 * VELORA Luxury Fashion E-commerce Demo — Centralized Design Tokens
 * 
 * Built with Material Design 3 measurement standards (4px baseline, 8px rhythm, 
 * 48px minimum touch targets) while strictly preserving VELORA's European editorial
 * luxury identity and palette.
 */

export const DESIGN_TOKENS = {
  // Brand Palette
  colors: {
    ink: {
      DEFAULT: "#171717",
      900: "#171717",
      800: "#262626",
      700: "#404040",
      600: "#525252",
      muted: "#737373",
    },
    ivory: {
      DEFAULT: "#F3EEE6",
      light: "#FAF7F2",
      dark: "#E8DFD3",
      canvas: "#F8F5EE",
    },
    camel: {
      DEFAULT: "#B78D6C",
      light: "#CDB098",
      dark: "#996F4E",
      hover: "#A67A58",
    },
    white: "#FFFFFF",
    muted: {
      DEFAULT: "#888580",
      light: "#A5A29D",
      dark: "#6B6863",
    },
    semantic: {
      success: "#047857",
      successLight: "#ECFDF5",
      warning: "#B45309",
      warningLight: "#FFFBEB",
      danger: "#B91C1C",
      dangerLight: "#FEF2F2",
      info: "#1D4ED8",
      infoLight: "#EFF6FF",
    },
  },

  // Material Design 3 Rhythm & Metrics
  metrics: {
    baselineGrid: 4,      // 4px
    layoutRhythm: 8,      // 8px
    minTouchTarget: 48,   // 48px touch target for mobile a11y
    buttonHeightMobile: 48,
    buttonHeightDesktop: 44,
    inputHeight: 48,
    tableRowHeight: 52,
    headerHeightDesktop: 80,
    headerHeightMobile: 64,
    announcementHeight: 36,
  },

  // Responsive Breakpoints (CSS pixels)
  breakpoints: {
    xs: 360,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },

  // Container Gutters & Max Widths
  layout: {
    maxWidth: 1280,
    gutters: {
      mobile: 16,     // px-4
      tablet: 24,     // px-6
      desktop: 32,    // px-8
    },
  },

  // Typography Scales (Desktop / Mobile)
  typography: {
    displaySerif: "Playfair Display, Cormorant Garamond, Georgia, serif",
    bodySans: "Plus Jakarta Sans, Inter, -apple-system, sans-serif",
    arabic: "Cairo, Amiri, sans-serif",
    scales: {
      hero: "text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight",
      h1: "text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight",
      h2: "text-2xl sm:text-3xl font-serif font-bold tracking-tight",
      h3: "text-xl sm:text-2xl font-serif font-semibold",
      h4: "text-base sm:text-lg font-serif font-medium",
      body: "text-sm sm:text-base font-sans text-ink leading-relaxed",
      caption: "text-xs font-sans text-muted",
      overline: "text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em]",
    },
  },

  // Focus and Interaction States
  interactions: {
    focusRing: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-camel focus-visible:ring-offset-2",
    disabledState: "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    hoverTransition: "transition-colors duration-200 ease-out",
  },
} as const;

