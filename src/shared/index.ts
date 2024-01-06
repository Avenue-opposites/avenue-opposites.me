import type { CollectionKey } from 'astro:content'
import { resolve } from 'node:path'
import { stat } from 'node:fs/promises'

export async function getContentStatus(dir: CollectionKey, filename: string) {
	const path = resolve(`src/content/${dir}/`, filename)
	return stat(path)
}