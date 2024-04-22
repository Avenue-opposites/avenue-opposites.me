import type { Element } from 'hast'

interface Options {
	delay?: number | string;
	maxStagger?: number;
}

export default function rehypeSlideEnter(options: Options = {}) {
	return (tree: Element) => {
		const { delay = 60, maxStagger = 20 } = options
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
			  const { style = '' } = props
				props.class = (props.class || '') + ' slide-enter'
		    props.style = style + ` --delay: ${d};--stagger: ${stagger}`
			}

			if(child.type === 'raw' && child.value.includes('<pre')) {
				child.value = child.value
					.replace('__slide-enter__', 'slide-enter')
					.replace('?', d)
					.replace('?', stagger.toString())
			}

			i++
		}
	}
}