import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import RemarkShikiji from './plugins/remark-shikiji'

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
		remarkPlugins: [
			[RemarkShikiji, {
				themes: {
					light: 'vitesse-light',
					dark: 'vitesse-dark',
				},
				langs:  ['js', 'ts', 'html', 'css', 'json', 'jsx', 'tsx'],
			}],
		],
	},
	server: {
		host: '0.0.0.0'
	}
})