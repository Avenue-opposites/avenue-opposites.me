import plugin from 'tailwindcss/plugin'

interface Config {
  /**
   * @description 使用的类名加上-[n]
   * @default 'multi-ellipsis'
   */
  className: string
}

const defaultConfig: Config = {
	className: 'multi-ellipsis'
}

/**
 * @name multi-line-ellipses
 * @description 使用multi-ellipsis-[n]来支持多行省略号
*/
export default (config: Config = defaultConfig) => plugin(({ matchUtilities }) => {
	const {
		className
	} = config

	matchUtilities({
		// 支持多行省略号
		[className]: value => {
			return {
				'overflow': 'hidden',
				'text-overflow': 'ellipsis',
				'display': '-webkit-box',
				'-webkit-box-orient': 'vertical',
				'-webkit-line-clamp': value
			}
		},
		's': value => {
			return {
				width: value,
				height: value
			}
		}
	})
})