import React from "react"
import Form from "next/form"
import SearchBarClear from "./SearchBarClear"
import { Search } from "lucide-react"

const SearchBar = ({ query }: { query?: string }) => {
	return (
		<Form action="/" scroll={false} className="search-form">
			<input
				name="query"
				defaultValue={query}
				placeholder="Search for ideas..."
				className="search-input"
			/>

			<div className="flex gap-2">
				{query && <SearchBarClear />}

				<button type="submit" className="search-btn text-white">
					<Search className="size-5" />
				</button>
			</div>
		</Form>
	)
}

export default SearchBar
