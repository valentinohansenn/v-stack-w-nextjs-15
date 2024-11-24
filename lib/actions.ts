"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils"
import slugify from "slugify"
import { strict } from "assert"
import { writeClient } from "@/sanity/lib/write-client"

export const createPitch = async (
	prevState: any,
	formData: FormData,
	pitch: string
) => {
	const session = await auth()

	if (!session) {
		return parseServerActionResponse({
			...prevState,
			status: "ERROR",
			error: "Not Authenticated!",
		})
	}

	const { title, description, category, link } = Object.fromEntries(
		Array.from(formData).filter(([key]) => key !== "pitch")
	)

	const slug = slugify(title as string, { lower: true, strict: true })

	try {
		const startup = {
			title,
			description,
			category,
			image: link,
			slug: {
				current: slug,
				_type: "slug",
			},
			author: {
				_type: "reference",
				_ref: session?.id,
			},
			pitch,
			views: 0,
		}

		const result = await writeClient.create({ _type: "startup", ...startup })

		return parseServerActionResponse({
			...result,
			status: "SUCCESS",
		})
	} catch (error) {
		console.log(error)

		return parseServerActionResponse({
			error: JSON.stringify(error),
			status: "ERROR",
		})
	}
}
