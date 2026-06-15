import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens driven by CSS variables so light/dark swap globally.
        paper: "var(--bg)",
        ink: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        mist: "var(--surface)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      maxWidth: { shell: "1240px" },
      borderRadius: { xl2: "1.4rem" },
      boxShadow: {
        float: "0 30px 60px -20px var(--shadow-strong), 0 12px 24px -12px var(--shadow-soft)",
        card: "0 18px 40px -24px var(--shadow-strong)",
        soft: "0 8px 30px -16px var(--shadow-soft)"
      },
      transitionTimingFunction: { spring: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        }
      },
      animation: { floaty: "floaty 7s ease-in-out infinite" }
    }
  },
  plugins: []
};
export default config;
