import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        parchment: "rgb(var(--color-parchment) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        burgundy: "rgb(var(--color-burgundy) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["Georgia", "Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

