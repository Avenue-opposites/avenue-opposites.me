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

declare module 'shikiji' {
	interface ShikijiTransformerContextMeta {
		lineHighlight?: ({
			lineNumber: number,
			start: number,
			end: number
		})[];
	}
}

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
						preprocess(code, options) {
							const __raw = options.meta?.__raw
							const match = __raw?.match(/{(?<lines>(.*))}/)
							const lines = match?.groups?.lines

							if(lines) {				
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								this.meta.lineHighlight = lines.split(',').map(line => {
									const [s, d] = line.split('-')
									const start = parseInt(s)
									const end = d ? parseInt(d) : start
									const lineNumber = (start === end) ? 1 : (end - start + 1)

									return {
										lineNumber,
										start,
										end
									}
								})
							}
							return code
						},
						pre(hast: Element) {
							if(!this.meta.lineHighlight?.length)
								return
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							addClassToHast(hast as any, 'has-highlighted')
							return hast
						},
						line(hast: Element, line) {
							const lines = this.meta.lineHighlight
														
							if(hast.tagName !== 'span' || hast.type !== 'element') 
								return

							if(lines) {
								for(const { start, end } of lines) {
									if(start <= line && end >= line) {
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										addClassToHast(hast as any, 'highlighted')
									}
								}
							}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							addClassToHast(hast as any, 'highlight-transparent')
							return hast
						},
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

// const a = /[([\d+|])]/