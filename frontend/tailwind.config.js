/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        earth: {
          rusty: '#7f5539',
          tan: '#a68a64',
          cream: '#ede0d4',
          moss: '#656d4a',
          dark: '#414833',
        }
      },
      fontFamily: {
        heading: ['Calistoga', 'serif'],
        accent: ['Syne', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
