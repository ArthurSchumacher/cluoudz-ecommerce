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
            content1: "#f5f5f4", //STONE-100 -> Navbar, HomeBannerText SignIn
            content2: "#d6d3d1", //STONE-300 -> TitleLines, SetQuantityBorder
            content3: "#57534e", //STONE-600 -> Texts and Borders
            primary: {
              700: "#44403c", //STONE-700 -> CategoriesBanner, Footer
              800: "#292524", //STONE-800 -> Navbar and ContactNav
              900: "#1c1917", //STONE-900
              DEFAULT: "#78716c", //STONE-500
            },
            secondary: {
              700: "#b91c1c", //RED-700 -> HomeBanner
              900: "#7f1d1d", //RED-900 -> HomeBanner
              DEFAULT: "#ef4444", //RED-500
            },
          },
        },
      },
    }),
  ],
};
export default config;
