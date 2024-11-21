import { title } from "process"
import SearchBar from "../../components/SearchBar"
import StartupCard from "@/components/StartupCard"

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>
}) {
	const query = (await searchParams).query

	const posts = [
		{
			_createdAt: new Date(),
			views: 55,
			author: { _id: 1, name: "John Doe" },
			_id: 1,
			description:
				"A platform that helps you find the best deals on the internet.",
			title: "Deal Finder",
			category: "E-Commerce",
			image: "https://images.unsplash.com/photo-1622838320000-4b3b3b3b3b3b",
		},
	]

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
						posts.map((post: StartupCardType, index: number) => (
							<StartupCard key={post.author?.id} post={post} />
						))
					) : (
						<p className="no-results">No startups found.</p>
					)}
				</ul>
			</section>
		</>
	)
}
