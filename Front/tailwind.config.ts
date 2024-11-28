import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        h1: ['Bree Serif', 'serif'], // Títulos principales
        h2: ['Bree Serif', 'serif'], // Subtítulos (H2)
        subtitle: ['Nunito', 'sans-serif'], // H3 y H4
        navbar: ['Raleway', 'sans-serif'], // Navbar
        body: ['Open Sans', 'sans-serif'], // Párrafos
        button: ['Oswald', 'sans-serif'], // Botones
        footer: ['Quattrocento', 'serif'], // Footer
      },
    },
  },
  plugins: [],
};
export default config;





