import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        panel: "#11181c",
        terminal: "#8dff9d",
        ink: "#d2e5dc",
        muted: "#7b9a8b"
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(141, 255, 157, 0.2), 0 0 32px rgba(141, 255, 157, 0.08)"
      },
      animation: {
        ticker: "ticker 1.2s ease-out",
        pulseDot: "pulseDot 2.2s ease-in-out infinite"
      },
      keyframes: {
        ticker: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
