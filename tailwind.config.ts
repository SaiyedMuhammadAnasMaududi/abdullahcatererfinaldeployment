import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { screens: {
      ' xxs':"0px",'msmall':"420px",
       'xs': "480px",
       
      
     },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        topheadertext:"#646178",
        headerbg:"#f0f2f3",
      },
    },
  },
  plugins: [],
} satisfies Config;
