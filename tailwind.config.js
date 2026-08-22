/** @type {import('tailwindcss').Config} */
export default {
  // The site is light-only. Left unset this defaults to 'media', which fired
  // every stray `dark:` variant (modal Close buttons, footer) whenever the
  // visitor's phone was in dark mode, on an otherwise light page.
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ambient-<tab> is composed at runtime, so Tailwind's content scan can't see
  // it. These are plain custom utilities in index.css, not generated classes,
  // so they survive purge regardless; listed here as documentation.
  safelist: [
    'ambient-profile',
    'ambient-education',
    'ambient-projects',
    'ambient-skills',
    'ambient-leadership',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
