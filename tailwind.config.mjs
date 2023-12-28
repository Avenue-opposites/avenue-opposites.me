import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import colors from 'tailwindcss/colors'

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
				light: {
					primary: colors.green[400],
					'primary-content': colors.white,
					secondary: colors.cyan[400],
					'secondary-content': colors.white,
					accent: colors.lime[400],
					'accent-content':colors.white,
					neutral: colors.slate[400],
					'neutral-content':colors.white,
					'base-100': colors.gray[50],
					'base-200': colors.gray[100],
					'base-300': colors.gray[200],
					'base-content': colors.gray[900],
					info: colors.sky[400],
					'info-content':colors.white,
					success: colors.green[400],
					'success-content':colors.white,
					warning: colors.orange[400],
					'warning-content':colors.white,
					error: colors.red[400],
					'error-content':colors.white,
				},
				dark: {
					primary: colors.emerald[500],
					'primary-content':colors.white,
					secondary: colors.cyan[500],
					'secondary-content':colors.white,
					accent: colors.lime[500],
					'accent-content':colors.white,
					neutral: colors.slate[500],
					'neutral-content':colors.white,
					'base-100': colors.gray[950],
					'base-200': colors.gray[900],
					'base-300': colors.gray[800],
					'base-content':colors.white,
					info: colors.sky[500],
					'info-content':colors.white,
					success: colors.green[500],
					'success-content':colors.white,
					warning: colors.orange[500],
					'warning-content':colors.white,
					error: colors.red[500],
					'error-content':colors.white,
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
	darkMode: ['class', '[data-theme="dark"]'],
}
