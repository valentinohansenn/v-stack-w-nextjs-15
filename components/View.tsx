import React from "react"
import Ping from "./Ping"
import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import { formatViews } from "@/lib/utils"
import { writeClient } from "@/sanity/lib/write-client"
import { unstable_after as after } from "next/server"

const View = async ({ id }: { id: string }) => {
	const { views: totalViews } = await client
		.withConfig({ useCdn: false })
		.fetch(STARTUP_VIEWS_QUERY, { id })

	if (!totalViews) {
		return null
	}
	// Patch is used to update
	after(
		async () =>
			await writeClient
				.patch(id)
				.set({ views: totalViews + 1 })
				.commit()
	)

	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<Ping />
			</div>

			<p className="view-text font-work-sans">
				<span className="font-bold">{totalViews} </span>
				<span className="font-medium">{formatViews(totalViews)}</span>
			</p>
		</div>
	)
}

export default View
