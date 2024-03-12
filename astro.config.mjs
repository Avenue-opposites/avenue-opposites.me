import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { transformerTwoslash, rendererRich } from '@shikijs/twoslash'
import { 
	transformerNotationDiff, 
	transformerNotationHighlight,
	transformerNotationFocus,
	transformerNotationErrorLevel,
	transformerMetaWordHighlight
} from '@shikijs/transformers'
import remarkShiki from './plugins/remark-shiki'
import rehypeToc from './plugins/rehype-toc'
import { transformerMultipleLine } from './plugins/shiki-multiple-line'

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
		icon()
	],
	markdown: {
		remarkPlugins: [
			[
				remarkShiki, {
					themes: {
						light: 'vitesse-light',
						dark: 'vitesse-dark',
					},
					langs:  ['js', 'ts', 'html', 'css', 'json', 'jsx', 'tsx', 'kotlin'],
					transformers: [
						transformerTwoslash({
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
						// 使用ml [++ {1, 3-5}|-- {10, 15-20}]来标记多行
						transformerMultipleLine({
							meteFlag: 'ml'
						}),
						// 在meta中使用/word/来标记高亮单词
						transformerMetaWordHighlight(),
					],
				}
			],
		],
		rehypePlugins: [rehypeToc]
	},
	server: {
		host: '0.0.0.0'
	}
})