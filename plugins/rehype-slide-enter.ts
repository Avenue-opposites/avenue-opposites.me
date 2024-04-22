import type { Element } from 'hast'

interface Options {
	delay?: number | string;
	maxStagger?: number;
	className?: string | string[];
}

export default function rehypeSlideEnter(options: Options = {}) {
	return (tree: Element) => {
		const { 
			delay = 60, 
			maxStagger = 20, 
			className = ['slide-enter']
		} = options
		const c = Array.isArray(className) ? className : [className]
		const d = typeof delay === 'string' ? delay : delay + 'ms'
		const children  = tree.children.filter(child => child.type === 'element' || child.type === 'raw')
		let i = 0
		
		while (i < children.length) {
			let stagger = i
			if(stagger > maxStagger) {
				stagger = 1
			}
			const child = children[i]
			
			if(child.type === 'element') {
				const props = child.properties
				
				// md ==> className []
				// mdx ==> class = ''
				const className = props.className = (props.className || []) as string[]
				// 把__slide-enter__移除，因为它只在raw中作为占位符
				const index = className.indexOf('__slide-enter__')
				if(index !== -1) {
					className.splice(index, 1)
				}
				className.push('slide-enter')
				props.className = className
				
				let { style = '' } = props

				// 把占位符
				if(child.tagName === 'pre' && typeof style === 'string') {
					style = style.slice(0, style.length - ';--delay: ?;--stagger: ?'.length)
				}
				
		    props.style = (style && `${style};`) + `--delay: ${d};--stagger: ${stagger}`

				console.log(child.tagName, props)
			}

			// 处理pre标签
			// md ==> raw
			// mdx ==> element
			if(child.type === 'raw' && child.value.includes('<pre')) {
				child.value = child.value
					.replace('__slide-enter__', c.join(' '))
					.replace('?', d)
					.replace('?', stagger.toString())
			}
			
			i++
		}
	}
}