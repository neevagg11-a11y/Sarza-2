/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./constants.ts",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#00F5D4', // Brighter, more "neon" teal
          dark: '#00D1B2',
          light: '#79FFE1',
        },
        charcoal: {
          DEFAULT: '#111111', // Deeper black
          light: '#1A1A1A',
          dark: '#050505',
        },
        terracotta: {
          DEFAULT: '#FF4D00', // More vibrant orange-red
          dark: '#D13F00',
          light: '#FF7D47',
        },
        dark: {
          DEFAULT: '#000000',
          lighter: '#0A0A0A',
        },
        accent: {
          pink: '#FF007A',
          purple: '#7000FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['League Spartan', 'sans-serif'],
        display: ['League Spartan', 'sans-serif'], // For extra large headings
        body: ['Inter', 'sans-serif'], // Simplified to Inter for better legibility
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.03em',
      }
    },
  },
  plugins: [],
}
