import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { transformerTwoSlash, rendererRich } from 'shikiji-twoslash'
import { 
	transformerNotationDiff, 
	transformerNotationHighlight,
	transformerNotationFocus,
	transformerNotationErrorLevel
} from 'shikiji-transformers'
import RemarkShikiji from './plugins/remark-shikiji'
import { transformerMultipleLine } from './plugins/shikiji-multiple-line'

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
			[
				RemarkShikiji, {
					themes: {
						light: 'vitesse-light',
						dark: 'vitesse-dark',
					},
					langs:  ['js', 'ts', 'html', 'css', 'json', 'jsx', 'tsx'],
					transformers: [
						transformerTwoSlash({
							renderer: rendererRich(),
							// 只有mete中包含twoslash才会触发
							explicitTrigger: true,
						}),
						// 使用[!code ++]和[!code --]来标记添加和删除的行。
						transformerNotationDiff(),
						// 使用[!code highlight]来标记代码行高亮
						transformerNotationHighlight(),
						// 使用[!code focus]来标记焦点代码
						transformerNotationFocus(),
						// 使用[!code warning]和[!code error]来标记警告代码和错误代码
						transformerNotationErrorLevel(),
						transformerMultipleLine({
							meteFlag: 'ml'
						}),
					],
				}
			],
		],
	},
	server: {
		host: '0.0.0.0'
	}
})