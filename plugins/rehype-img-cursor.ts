import type { Element } from 'hast'
import { visit } from 'unist-util-visit'

export default function rehypeImgCursor() {
	return (tree: Element) => {
		visit(tree, 'element', (hast) => {      
			if(hast.tagName === 'img') {
				const className = hast.properties.className || []

				if(Array.isArray(className)) {
					className.push('cursor-pointer')
				}

				hast.properties.className = className
			}
		})
	}
}