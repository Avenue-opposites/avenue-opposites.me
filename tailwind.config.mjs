import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import multiLineEllipses from './plugins/tailwindcss/multi-line-ellipses'
import size from './plugins/tailwindcss/size'
import theme from './theme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		forms({
			strategy: 'base'
		}),
		typography(),
		daisyui,
		multiLineEllipses(),
		size()
	],
	daisyui: {
		themes: [theme],
		darkTheme: 'dark',
		styled: true,
		base: true,
		utils: true,
		logs: true,
		prefix: 'daisy-',
		themeRoot: ':root'
	},
	darkMode: ['class', '[data-theme="dark"]'],
}
