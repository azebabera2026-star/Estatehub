/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A0F1E',
          900: '#0F172E',
          800: '#16213E',
          700: '#1E2D4F',
          600: '#2C3E63',
        },
        emerald: {
          DEFAULT: '#0F9D6C',
          50: '#E7F6EF',
          100: '#CFEEDF',
          400: '#1BB884',
          500: '#0F9D6C',
          600: '#0C7F58',
        },
        parchment: '#F7F6F2',
        clay: '#C9782F',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        blueprint: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
      backgroundSize: {
        blueprint: '28px 28px',
      },
    },
  },
  plugins: [],
}
