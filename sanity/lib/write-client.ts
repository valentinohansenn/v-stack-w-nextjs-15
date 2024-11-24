import "server-only"

import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, token } from "../env"

// token: API >> Add new token >> Edit Permissions >> Read and Write
export const writeClient = createClient({
	projectId,
	dataset,
	apiVersion,
	token,
	useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

if (!writeClient.config().token) {
	throw new Error("Sanity Write Client is not configured with a token")
}
