import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-bg": "#F7F5F0",
        "brand-text": "#2C2C2C",
        "brand-accent": "#8C6C52",
        "brand-card": "#FFFFFF",
      },
      boxShadow: {
        elegant: "0 10px 40px -10px rgba(0, 0, 0, 0.04)",
        "elegant-hover": "0 20px 40px -10px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif-sc)", "Noto Serif SC", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
