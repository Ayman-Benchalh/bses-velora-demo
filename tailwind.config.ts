import type { Config } from "tailwindcss";

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
        ink: {
          DEFAULT: "#171717",
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#171717",
          950: "#0d0d0d",
        },
        ivory: {
          DEFAULT: "#F3EEE6",
          light: "#FAF7F2",
          dark: "#E8DFD3",
          50: "#FAF7F2",
          100: "#F3EEE6",
          200: "#E8DFD3",
          300: "#D9CBB9",
        },
        camel: {
          DEFAULT: "#B78D6C",
          light: "#CDB098",
          dark: "#996F4E",
          hover: "#A67A58",
          50: "#F9F6F2",
          100: "#F0E7DD",
          200: "#E2CFBE",
          300: "#D3B59D",
          400: "#C39C7E",
          500: "#B78D6C",
          600: "#A37655",
          700: "#835C40",
          800: "#684832",
        },
        muted: {
          DEFAULT: "#888580",
          light: "#A5A29D",
          dark: "#6B6863",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "-apple-system", "sans-serif"],
        arabic: ["var(--font-arabic)", "Cairo", "Amiri", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-down": "slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulseSubtle 2.5s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      boxShadow: {
        "luxury-sm": "0 2px 8px -2px rgba(23, 23, 23, 0.05)",
        "luxury": "0 10px 30px -10px rgba(23, 23, 23, 0.08)",
        "luxury-lg": "0 20px 45px -15px rgba(23, 23, 23, 0.12)",
        "luxury-drawer": "-10px 0 35px -5px rgba(23, 23, 23, 0.15)",
        "luxury-drawer-rtl": "10px 0 35px -5px rgba(23, 23, 23, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;

