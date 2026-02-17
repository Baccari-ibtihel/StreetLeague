/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1DB954',
          dark: '#169c46',
        },
        secondary: {
          DEFAULT: '#0F172A',
          light: '#1e293b',
        },
        accent: {
          DEFAULT: '#F97316',
        },
        background: {
          light: '#F8FAFC',
        },
        text: {
          dark: '#1E293B',
          light: '#64748b',
        }
      }
    },
  },
  plugins: [],
}
