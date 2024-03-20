import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#fafaf9", //STONE-50 -> PageBackground
            foreground: "#0c0a09", //STONE-950 -> PageText, Title, Hover:SetQuantityBorder
            content1: "#292524", //STONE-200 -> Profile Navbar Background, HomeBanner Text, SignIn
            content2: "#d6d3d1", //STONE-300 -> TitleLines, SetQuantityBorder
            content3: "#57534e", //STONE-600 -> Texts and Borders
            primary: {
              700: "#facc15", //YELLOW-400 -> CategoriesNavbar, Footer
              800: "#e7e5e4", //STONE-200 -> Navbar and ContactNav, onHover categories
              900: "#1c1917", //STONE-900
              DEFAULT: "#0369a1", //STONE-500 -> Active profile navbar
            },
            secondary: {
              700: "#0369a1", //SKY-700 -> HomeBanner
              900: "#0c4a6e", //SKY-900 -> HomeBanner
              DEFAULT: "#0ea5e9", //RED-500
            },
          },
        },
      },
    }),
  ],
};
export default config;
