import SearchBar from "../../components/SearchBar"

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>
}) {
	const query = (await searchParams).query

	return (
		<>
			<section className="orange_container">
				<h1 className="heading">
					The easiest way to pitch and validate your startup ideas!
				</h1>

				<p className="sub-heading !max-w-3xl">
					Submit your Innovative Ideas, Vote on Pitches, and Be Ahead of
					the Competition!
				</p>

				<SearchBar query={query} />
			</section>
		</>
	)
}
