import type { Node } from 'unist'
import type { BundledHighlighterOptions, BundledLanguage, BundledTheme } from 'shikiji' 
import { getHighlighter, bundledLanguages } from 'shikiji'
import { visit } from 'unist-util-visit'
import { transformerTwoSlash, rendererRich } from 'shikiji-twoslash'
import { 
	transformerNotationDiff, 
	transformerNotationHighlight,
	transformerNotationFocus,
	transformerNotationErrorLevel
} from 'shikiji-transformers'

interface CodeNode extends Node {
	value: string;
	meta?: string;
	lang?: string;
}

export type Options = BundledHighlighterOptions<BundledLanguage, BundledTheme> & {
	theme: BundledTheme,
}

const bundledLanguage = Object.keys(bundledLanguages)

export default function remarkShikiji(options: Options) {	
	const {
		theme = 'github-dark',
		themes: _themes = {},
		langs = [],
		...otherOptions
	} = options
	let highlighter: Awaited<ReturnType<typeof getHighlighter>>
	let loadedLangs: string[]
	const themes: string[] = Object.keys(_themes).length ? Object.values(_themes) : [theme]
	const themeOptions = Object.values(_themes).length ? { themes: _themes } : { theme } 
		
	return async (tree: Node) => {	
		highlighter ??= await getHighlighter({ 
			themes,
			langs: langs.length ? langs : Object.keys(bundledLanguage), 
			...otherOptions,
		})
		
		loadedLangs ??= highlighter.getLoadedLanguages()
		// 遍历所有code类型节点
		visit(tree, 'code', (node: CodeNode) => {
			let lang = node?.lang || 'plaintext'

			// 如果代码块语言是纯文本并且不在已加载的语言中，就用当做纯文本解析
			if (lang !== 'plaintext' && !loadedLangs.includes(lang)) {
				console.warn(`[remark-shikiji] ${lang} is not exist.`)
				lang = 'plaintext'
			}

			// 将代码转换为html语法高亮文本
			const html = highlighter.codeToHtml(node.value, {
				...themeOptions,
				defaultColor: false,
				lang,
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