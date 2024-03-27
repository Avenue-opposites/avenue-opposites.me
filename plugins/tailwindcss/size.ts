import plugin from 'tailwindcss/plugin'

type CSSValue = number | string
type Transformer = (value: CSSValue) => CSSValue
type CSSRuleObject = Record<string, string>
type Generator = (value: CSSValue) => CSSRuleObject

/**
 * @description 创建样式生成器选项
*/
interface CreateGenOptions {
  /**
   * @description 前缀
   * @default ''
   */
  prefix?: string | string[]
  /**
   * @description 后缀
   * @default ''
   */
  suffix?: string | string[]
  /**
   * @description 样式名
  */
  styleNames: string[]
  /**
   * @description 转换器
   * @default []
  */
  transformers?: Transformer[]
}

const full = 100
const styleNames = ['width', 'height']
const remUnitTransformer = (value: number) => value * 0.25
const integerRemoveDecimalPointTransformer = (value: number) => {
	const [integer, decimal] = value.toString().split('.')
	let result = integer
	if(decimal) {
		let i = decimal.length - 1
		while(i >= 0) {
			if(decimal[i] !== '0') {
				result = `${integer}.${decimal.slice(0, i + 1)}`
				break
			}
			i -= 1
		}
	}
	return result
}
const genSRem = createGen({ styleNames, suffix: 'rem', transformers: [remUnitTransformer as Transformer] })
const genSPX = createGen({ styleNames, suffix: 'px' })
const genSPercent = createGen({ styleNames, suffix: '%', transformers: [integerRemoveDecimalPointTransformer as Transformer] })
const genSv = createGen({ styleNames, suffix: ['vw', 'vh'] })
const genSvs = createGen({ styleNames, suffix: ['svw', 'svh'] })
const genLvs = createGen({ styleNames, suffix: ['lvw', 'lvh'] })
const genDvs = createGen({ styleNames, suffix: ['dvw', 'dvh'] })
const customize = createGen({ styleNames })

export default () => plugin(({ addUtilities }) => {
	const sUtilities: {
    [key: string]: CSSRuleObject
  } = {
  	'.s-px': genSPX(1),
  	'.s-full': genSPercent(full),
  	'.s-screen': genSv(full),
  	'.s-svs': genSvs(full),
  	'.s-dvs': genDvs(full),
  	'.s-lvs': genLvs(full),
  	'.s-min': customize('min-content'),
  	'.s-max': customize('max-content'),
  	'.s-fit': customize('fit-content'),
  	'.s-14': genSRem(14),
  	'.s-16': genSRem(16),
  	'.s-20': genSRem(20),
  	'.s-24': genSRem(24),
  	'.s-28': genSRem(28),
  	'.s-32': genSRem(32),
  	'.s-36': genSRem(36),
  	'.s-40': genSRem(40),
  	'.s-44': genSRem(44),
  	'.s-48': genSRem(48),
  	'.s-52': genSRem(52),
  	'.s-56': genSRem(56),
  	'.s-60': genSRem(60),
  	'.s-64': genSRem(64),
  	'.s-72': genSRem(72),
  	'.s-80': genSRem(80),
  	'.s-96': genSRem(96),
  	'.s-auto': customize('auto'),
  }
  
	// 0-4 0.5step
	for(let i = 0; i <= 4; i += 0.5) {
		sUtilities[`.s-${i}`] = i == 0 ? genSPX(0) : genSRem(i)
	}
	// 5-12 1step
	for(let i = 5; i <= 12; i += 1) {
		sUtilities[`.s-${i}`] = genSRem(i)
	}

	const denominators = [2, 3, 4, 5, 6, 12]
	for(const i in denominators) {
		const denominator = denominators[i]
		for(let j = 1; j < denominator; j += 1) {
			sUtilities[`.s-${j}\\/${denominator}`] = genSPercent((j / denominator * full).toFixed(6))
		}
	}
	addUtilities(sUtilities, {
		respectPrefix: false,
		respectImportant: false
	})
})

/**
 * @description 创建样式生成器
 * @param options 
 * @returns
*/
function createGen(options: CreateGenOptions): Generator {
	const {
		prefix = '',
		suffix = '', 
		styleNames,
		transformers = [],
	} = options || {}
	const isPrefixArray = Array.isArray(prefix)
	const isSuffixArray = Array.isArray(suffix)

	return (value: CSSValue) => styleNames.reduce((cssRuleObject, name, i) => {
		const transformedValue = transformers.reduce((value, transformer) => transformer(value), value)
		cssRuleObject[name] = `${isPrefixArray ? prefix[i] : prefix}${transformedValue}${isSuffixArray ? suffix[i] : suffix}`
		return cssRuleObject
	}, {} as CSSRuleObject)
}