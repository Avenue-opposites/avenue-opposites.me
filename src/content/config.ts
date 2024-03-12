import { defineCollection, reference, z } from 'astro:content'
import { DEFAULT_LANGUAGE } from '~/consts'

// note frontmatter schema
const notesModel = z.object({
	title: z.string(),
	description: z.string(),
	duration: z.string(),
	publishDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	heroImage: z.string().optional(),
	toc: z.boolean().optional().default(false),
	tags: z.array(z.string()).optional(),
	lang: z.string().optional().default(DEFAULT_LANGUAGE),
})

const notesCollection = defineCollection({
	type: 'content',
	schema: notesModel,
})

const postsCollection = defineCollection({
	type: 'content',
	schema: notesModel.extend({
		authors: reference('authors'),
	}),
})

const authorsCollection = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		avatar: z.string().optional()
	}),
})

export const collections = { 
	posts: postsCollection,
	notes: notesCollection,
	authors: authorsCollection
}
