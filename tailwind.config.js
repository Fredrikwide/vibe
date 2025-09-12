/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#baddff',
          300: '#8ac6ff',
          400: '#57a7ff',
          500: '#2b86ff',
          600: '#1868e6',
          700: '#1453b3',
          800: '#123f85',
          900: '#102f63',
          DEFAULT: '#2b86ff',
        },
        accent: {
          500: '#22c3a6',
          600: '#16a98f',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 10px 15px -3px rgba(16,24,40,0.08)',
      },
      borderRadius: {
        xl: '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
    },
  },
  plugins: [],
}
