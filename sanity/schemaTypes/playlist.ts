import { defineField, defineType } from "sanity"

export const playlist = defineType({
	name: "playlist",
	title: "Playlists",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			// Automatically generate a slug from the title field
			options: {
				source: "title",
			},
		}),
		defineField({
			name: "select",
			type: "array",
			of: [{ type: "reference", to: [{ type: "startup" }] }],
		}),
	],
})
