import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	site: 'https://avenue-opposites.com',
	integrations: [
		mdx(), 
		sitemap(), 
		tailwind({
			// 取消自动导入base样式
			applyBaseStyles: false
		}), 
	],
	markdown: {
		shikiConfig: {
			theme: 'one-dark-pro',
			langs: ['javascript', 'typescript', 'html', 'css', 'json', 'jsx', 'tsx'],
			wrap: true
		},
		syntaxHighlight: 'shiki'
	},
	server: {
		host: '0.0.0.0'
	}
})