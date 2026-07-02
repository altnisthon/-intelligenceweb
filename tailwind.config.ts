import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#ECE6F5",
        plum: "#1e1826",
        purple: {
          DEFAULT: "#5b2a98",
          dark: "#3d1a6e",
        },
        orchid: "#ca90dc",
        mint: {
          DEFAULT: "#c5f1b2",
          light: "#F0FAE8",
        },
        lavender: {
          DEFAULT: "#E8DCF5",
          border: "#cbb8e6",
        },
        muted: "#6B5F7A",
        offwhite: "#F7F5FA",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        quote: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      backgroundImage: {
        "and-radial":
          "radial-gradient(58vw 52vh at 80% 12%, rgba(197,241,178,0.42), transparent 60%), radial-gradient(52vw 52vh at 6% 52%, rgba(202,144,220,0.20), transparent 60%), radial-gradient(48vw 48vh at 94% 90%, rgba(197,241,178,0.34), transparent 60%)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
