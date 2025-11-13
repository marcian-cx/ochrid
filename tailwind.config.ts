import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#f5f0e8",
        ink: "#2c2416",
        gold: "#d4af37",
        burgundy: "#6b2a2a",
      },
      fontFamily: {
        serif: ["Georgia", "Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

