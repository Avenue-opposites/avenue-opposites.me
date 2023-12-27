import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import theme from 'daisyui/src/theming/themes'

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
		daisyui
	],
	daisyui: {
		themes: [
			{
				dark: {
					...theme.dark,
					'base-100': '#050505',
				}
			},
			{
				light: {
					...theme.light,
					'base-100': '#ffffff',
				}
			},
		],
		darkTheme: 'dark',
		styled: true,
		base: true,
		utils: true,
		logs: true,
		prefix: 'daisy-',
		themeRoot: ':root'
	},
	darkMode: 'class',
}
