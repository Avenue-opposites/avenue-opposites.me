import type { ShikiTransformer } from 'shiki'
import { addClassToHast } from 'shiki'

declare module 'shiki' {
	interface ShikiTransformerContextMeta {
    /**
     * @description 包含的类型
     * @default []
     */ 
    includedTypes?: string[];
    /**
     * @description 使用类型的多行
     * @default []?
     */
		multipleLines?: MultipleLine[];
	}
}

interface MultipleLine {
  type: string,
  lineNumber: number,
  start: number,
  end: number
}

type ClassName = string | string[]

interface MetaMap {
  [key: string]: {
    addPreClass: ClassName;
    addLineClass: ClassName;
  }
}

interface TransformerMultipleLineOptions {
  /**
   * @default 'multiple-line
   */
  meteFlag?: string;
  /**
   * @default ['[',']']
   */
  includeFlag?: [string, string];
  metaMap?: MetaMap;
  /**
   * @default '|' 默认分隔符
   */
  separator?: string;
}

// 默认的meta
const defaultMetaMap: MetaMap = {
	'++': {
		addPreClass: 'has-diff',
		addLineClass: ['diff', 'add'],
	},
	'--': {
		addPreClass: 'has-diff',
		addLineClass: ['diff', 'remove'],
	},
	'$$': {
		addPreClass: 'has-highlighted',
		addLineClass: 'highlighted',
	},
	'@@': {
		addPreClass: 'has-focused',
		addLineClass: 'focused',
	},
	'??': {
		addPreClass: 'has-highlighted',
		addLineClass: ['highlighted', 'warning'],
	},
	'!!': {
		addPreClass: 'has-highlighted',
		addLineClass:['highlighted', 'error'],
	}
}
const escapeCharactersRegex = /[-[\]{}()*+?.,\\^$|#\s]/g
const typeRegex = /(?<type>(.*)){/

export function transformerMultipleLine(options: TransformerMultipleLineOptions = {} as TransformerMultipleLineOptions): ShikiTransformer {
	const { 
		metaMap = defaultMetaMap,
		separator = '|',
		meteFlag = 'multiple-line',
		includeFlag = ['[',']']
	} = options

	const openChar = isIncludeEscapeChar(includeFlag[0]) ? handleEscapeChar(includeFlag[0]) : includeFlag[0]
	const closeChar = isIncludeEscapeChar(includeFlag[1]) ? handleEscapeChar(includeFlag[1]) : includeFlag[1]
	const enableRegex = new RegExp(`${meteFlag}\\s*${openChar}(?<raw>(.*))${closeChar}`)

	return {
		name: 'shikiji-transformer:multiple-line',
		preprocess(code, options) {
			const __raw = options.meta?.__raw
			const raw =__raw?.match(enableRegex)?.groups?.raw
			const includedTypes = Object.keys(metaMap).filter(type => __raw?.includes(type))

			if(!raw)
				return 

			this.meta.includedTypes = includedTypes

			const multipleLines = raw.split(separator).reduce<MultipleLine[]>((current, rule) => {
				const type = rule.match(typeRegex)?.groups?.type.trim()

				if(type && includedTypes.includes(type)) {  
					const regex = new RegExp(`${isIncludeEscapeChar(type) ? handleEscapeChar(type) : type}\\s*{(?<scope>(.*))}`)
					const scope = rule.match(regex)?.groups?.scope
					
					if(scope) {
						scope.split(',').forEach(interval => {
							const [s, e] = interval.split('-')
							const start = parseInt(s)
							const end = e ? parseInt(e) : start
							const lineNumber = (start === end) ? 1 : (end - start + 1)
              
							current.push({
								type,
								lineNumber,
								start,
								end
							})
						})
					}
				}

				return current
			}, [])

			this.meta.multipleLines = multipleLines
      
			return code
		},
		pre(hast) {
			const includedTypes = this.meta.includedTypes
      
			if(!includedTypes)
				return

			for(const type of includedTypes) {
				addClassToHast(hast, metaMap[type].addPreClass)
			}

			return hast
		},
		line(hast, line) {
			if(hast.tagName !== 'span' || hast.type !== 'element') 
				return

			const multipleLines = this.meta.multipleLines
      
			if(multipleLines) {
				for(const { type, start, end } of multipleLines) {
					if(line >= start && line <= end) {
						addClassToHast(hast, metaMap[type].addLineClass)
					}
				}
			}
      
			return hast
		}
	}
}

function isIncludeEscapeChar(str: string) {
	return escapeCharactersRegex.test(str)
}

function handleEscapeChar(str: string) {
	return str.replace(escapeCharactersRegex, '\\$&')
}