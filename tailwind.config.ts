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
        parchment: "#0a0a0a",
        ink: "#e8e8e8",
        gold: "#e6c458",
        burgundy: "#d4a5a5",
      },
      fontFamily: {
        serif: ["Georgia", "Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

