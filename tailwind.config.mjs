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
		extend: {
			animation: {
				'slide-in': 'slide-enter 1s ease both',
				'slide-out': 'slide-out 1s ease both'
			},
			keyframes:{
				'slide-in': {
					'0%': {
						opacity: 0,
						transform: 'translateY(-10px)'
					},
					'100%': {
						opacity: 1,
						transform: 'translateY(0)'
					}
				},
				'slide-out': {
					'0%': {
						opacity: 0,
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: 1,
						transform: 'translateY(0px)'
					}
				}
			}
		},
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
