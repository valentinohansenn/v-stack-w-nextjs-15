import SearchBar from "@/components/SearchBar"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { STARTUPS_QUERY } from "@/sanity/lib/queries"

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>
}) {
	const query = (await searchParams).query
	// Search queries feature
	const params = { search: query || null }

	const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })
	console.log({ data: posts })
	return (
		<>
			<section className="orange_container">
				<h1 className="heading">
					The easiest way to pitch and validate your startup ideas!
				</h1>

				<p className="sub-heading !max-w-3xl">
					Search it up! Pitch it up! Validate it up! All in one place.
				</p>

				<SearchBar query={query} />
			</section>

			{/* Start-ups Cards */}
			<section className="section_container">
				<p className="text-30-semibold">
					{query ? `Search results for "${query}"` : "All Startups"}
				</p>

				<ul className="mt-7 card_grid">
					{posts.length > 0 ? (
						posts.map((post: StartupTypeCard) => (
							<StartupCard key={Number(post?._id)} post={post} />
						))
					) : (
						<p className="no-results">No startups found.</p>
					)}
				</ul>
			</section>

			<SanityLive />
		</>
	)
}
