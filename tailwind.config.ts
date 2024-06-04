import { nextui } from "@nextui-org/react"
import tailwindScrollbar from "tailwind-scrollbar"
import type { Config } from "tailwindcss"
import tailwindAnimate from "tailwindcss-animate"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      screens: {
        default: "1230px",
        mobile: "390px",
        tablet: "820px",
        retina: "1440px",
        fhd: "1920px",
        qhd: "2560px",
        uhd: "3840px",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
      keyframes: {
        heightIn: {
          from: { opacity: "0", height: "0" },
          to: { opacity: "100%", height: "var(--height)" },
        },
        heightOut: {
          from: { opacity: "100%", height: "var(--height)" },
          to: { opacity: "0", height: "0" },
        },
      },
      animation: {
        heightIn: "heightIn 0.3s forwards",
        heightOut: "heightOut 0.3s forwards",
      },
    },
  },
  plugins: [
    tailwindAnimate,
    tailwindScrollbar({ nocompatible: true }),
    nextui(),
  ],
}

export default config
