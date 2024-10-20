import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",   
        foreground: "var(--foreground)",
      },
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'), 
            a: {
              color: theme('colors.blue.500'), 
              '&:hover': {
                color: theme('colors.blue.700'), 
              },
            },
            h1: { color: theme('colors.foreground') },  
            h2: { color: theme('colors.foreground') },
            h3: { color: theme('colors.foreground') },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),  
            a: {
              color: theme('colors.blue.400'), 
              '&:hover': {
                color: theme('colors.blue.600'), 
              },
            },
            h1: { color: theme('colors.white') }, 
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
          },
        },
      }),
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
