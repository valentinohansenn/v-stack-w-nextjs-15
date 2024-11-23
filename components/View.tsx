import React from "react"
import Ping from "./Ping"
import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import { formatViews } from "@/lib/utils"

const View = async ({ id }: { id: string }) => {
	const { views: totalViews } = await client
		.withConfig({ useCdn: false })
		.fetch(STARTUP_VIEWS_QUERY, { id })

	if (!totalViews) {
		return null
	}

	// TODO: Update the number of views whenever the page is visited
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
