/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D9488',
          dark: '#0F766E',
          light: '#5EEAD4',
        },
        secondary: {
          DEFAULT: '#EA580C',
          dark: '#C2410C',
          light: '#FB923C',
        },
        accent: '#F59E0B',
        dark: {
          DEFAULT: '#0F172A',
          lighter: '#1E293B',
        },
        // Preserve existing colors from index.html if they differ
        teal: {
          DEFAULT: '#0D9488',
          dark: '#0f766e',
        },
        charcoal: {
          DEFAULT: '#1E293B',
          light: '#334155',
          dark: '#0f172a'
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['League Spartan', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}