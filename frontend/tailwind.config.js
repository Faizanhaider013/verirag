/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Editorial light palette
        ivory: "#F8F7F4",
        paper: "#FFFFFF",
        graphite: "#252633",
        muted: "#888995",
        line: "#EAE9E4",
        indigo: {
          DEFAULT: "#5555A8",
          600: "#4A4A96",
          700: "#3F3F80",
          50: "#F1F0FB",
        },
        lavender: "#EAE8FA",
        emerald: {
          DEFAULT: "#188B65",
          soft: "#E3F2EC",
        },
        garnet: {
          DEFAULT: "#C94F54",
          soft: "#F8E7E8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["Fraunces", "Georgia", "ui-serif", "serif"],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        display: ["3.25rem", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        hero: ["2.5rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(37,38,51,0.04), 0 1px 1px rgba(37,38,51,0.03)",
        card: "0 1px 3px rgba(37,38,51,0.04), 0 8px 24px -16px rgba(37,38,51,0.12)",
        lift: "0 2px 8px rgba(37,38,51,0.06), 0 16px 40px -20px rgba(37,38,51,0.22)",
        pop: "0 12px 40px -12px rgba(37,38,51,0.28)",
        ring: "0 0 0 4px rgba(85,85,168,0.12)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-fast": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s cubic-bezier(0.22,1,0.36,1)",
        "fade-in-fast": "fade-in-fast 0.2s ease-out",
        "scale-in": "scale-in 0.18s cubic-bezier(0.22,1,0.36,1)",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.22,1,0.36,1)",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
