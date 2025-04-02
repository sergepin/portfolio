/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--text-primary)',
        },
        secondary: {
          DEFAULT: 'var(--text-secondary)',
        },
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        border: {
          DEFAULT: 'var(--border-color)',
        }
      },
    },
  },
  plugins: [],
} 