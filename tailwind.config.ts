import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#faf6f0",
        bg: "#faf6f0",
        plum: "#1e1826",
        purple: {
          DEFAULT: "#5b2a98",
          dark: "#3d1a6e",
        },
        orchid: "#ca90dc",
        mint: {
          DEFAULT: "#c5f1b2",
          light: "#f4f0e2",
        },
        lavender: {
          DEFAULT: "#f3ede2",
          border: "#e4dccd",
        },
        muted: "#6b5f5a",
        offwhite: "#F7F5FA",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        quote: ["var(--font-cormorant)", "Georgia", "serif"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      backgroundImage: {
        "and-radial": "none",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "radial-pop": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        "radial-pop": "radial-pop .18s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
