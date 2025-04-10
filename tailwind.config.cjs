/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'primary': 'rgb(var(--color-primary) / <alpha-value>)',
				'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
				'background-primary': 'rgb(var(--color-background-primary) / <alpha-value>)',
				'background-secondary': 'rgb(var(--color-background-secondary) / <alpha-value>)',
				'border': 'rgb(var(--color-border) / <alpha-value>)',
				'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
				'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
			}
		},
	},
	plugins: [],
} 