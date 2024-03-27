import type { Node, Element } from 'hast'
import { visit } from 'unist-util-visit'
import type { VFile as _VFile } from 'vfile'

interface VFile extends _VFile {
	data: {
		astro: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			frontmatter: Record<string, any>
		}
	}
}

export default function rehypeToc() {
	return (tree: Node, file: VFile) => {
		if(!file.data.astro.frontmatter.toc)
			return

		visit(tree, 'element', (hast: Element) => {
			if(!hast.tagName.startsWith('h'))
				return
			hast.properties['data-anchor'] = true
		})
	}
}