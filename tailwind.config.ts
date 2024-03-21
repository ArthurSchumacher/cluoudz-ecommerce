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
            background: "#fffff1",
            foreground: "#0c0a09",
            content1: "#292524",
            content2: "#fafafa",
            content3: "#57534e",
            primary: {
              700: "#3a6319",
              800: "#fffff1",
              900: "#1c1917",
              DEFAULT: "#3a6319",
            },
            secondary: {
              700: "#f6e092",
              900: "#eec634",
              DEFAULT: "#f2d363", //RED-500
            },
          },
        },
      },
    }),
  ],
};
export default config;
