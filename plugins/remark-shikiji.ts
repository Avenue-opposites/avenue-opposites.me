import type { Node } from 'unist'
import type {
	BundledHighlighterOptions, 
	BundledLanguage, 
	BundledTheme, 
	ShikijiTransformer 
} from 'shikiji' 
import { 
	getHighlighter, 
	bundledLanguages, 
	bundledThemes, 
	addClassToHast 
} from 'shikiji'
import { visit } from 'unist-util-visit'
import type { Element } from 'hast'

interface CodeNode extends Node {
	value: string;
	meta?: string;
	lang?: string;
}

export type Options = BundledHighlighterOptions<BundledLanguage, BundledTheme> & {
	theme: BundledTheme,
	highlighter?: Awaited<ReturnType<typeof getHighlighter>>,
	transformers?: ShikijiTransformer[],
}

const bundledTheme = Object.keys(bundledThemes)
const bundledLanguage = Object.keys(bundledLanguages)
const defaultHighlighter = await getHighlighter({
	themes: bundledTheme,
	langs: bundledLanguage,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function remarkShikiji(options: Options = {} as any) {	
	const {
		theme = 'vitesse-dark',
		themes = {},
		highlighter = defaultHighlighter,
		transformers = [],
	} = options	

	return (tree: Node) => {	
		const loadedLangs = highlighter.getLoadedLanguages()
		// 遍历所有code类型节点
		visit(tree, 'code', (node: CodeNode) => {
			let lang = node?.lang || 'plaintext'

			// 如果代码块语言是纯文本并且不在已加载的语言中，就用当做纯文本解析
			if (lang !== 'plaintext' && !loadedLangs.includes(lang)) {
				console.warn(`[remark-shikiji] ${lang} is not exist.`)
				lang = 'plaintext'
			}
			
			const themeOptions = Object.values(themes).length ? { themes } : { theme }

			// 将代码转换为html语法高亮文本
			const html = highlighter.codeToHtml(node.value, {
				...themeOptions,
				defaultColor: false,
				lang,
				transformers: [
					...transformers,
					{
						token(hast: Element) {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							addClassToHast(hast as any, 'highlight-transparent')
							return hast
						}
					}
				],
				meta: {
					// 用于twoslash解析
					__raw: node.meta // 'twoslash',
				}
			} as Parameters<typeof highlighter.codeToHtml>[1])
			
			node.type = 'html'
			node.value = html
		})
	}
}