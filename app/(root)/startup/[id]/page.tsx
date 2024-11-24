import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import {
	PLAYLIST_BY_SLUG_QUERY,
	STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import markdownit from "markdown-it"
import Image from "next/image"
import React, { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"
import Link from "next/link"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"

export const experimental_ppr = true // PPR is enabled

const md = markdownit()
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id

	// Parallel fetching -- two independent requests concurrently
	// Faster load-times
	const [post, { select: editorStartups }] = await Promise.all([
		client.fetch(STARTUP_BY_ID_QUERY, { id }),
		client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-new" }),
	])

	if (!post) {
		return notFound()
	}

	const parsedMd = md.render(post?.pitch || "")

	return (
		<>
			<section className="orange_container !min-h-[230px]">
				<p className="tag">{formatDate(post?._createdAt)}</p>

				<h1 className="heading">{post.title}</h1>
				<p className="sub-heading !max-w-5xl">{post.description}</p>
			</section>

			<section className="section_container">
				<Image
					src={post.image}
					alt="thumbnail"
					width={1200}
					height={1200}
					className="w-full h-auto rounded-xl"
				/>

				<div className="space-y-5 mt-10 max-w-4xl mx-auto">
					<div className="flex-between gap-5">
						<Link
							href={`/user/${post?.author?._id}`}
							className="flex gap-3 items-center mb-3"
						>
							<Image
								src={post.author.image}
								alt="avatar"
								width={54}
								height={54}
								className="rounded-full drop-shadow-lg aspect-square"
							/>
							<div>
								<p className="text-20-medium">{post?.author?.name}</p>
								{post?.author?.username && (
									<p className="text-20-medium">
										@{post?.author?.username}
									</p>
								)}
							</div>
						</Link>

						<p className="category-tag">{post.category}</p>
					</div>

					<h3 className="text-30-bold">Pitch Details</h3>
					{parsedMd ? (
						<article
							className="prose max-w-4xl font-work-sans break-all"
							dangerouslySetInnerHTML={{ __html: parsedMd }}
						/>
					) : (
						<p>No details provided.</p>
					)}
				</div>

				<hr className="divider" />

				{editorStartups?.length > 0 && (
					<div className="max-w-4xl mx-auto">
						<p className="text-30-semibold">Editor Picks</p>

						<ul className="mt-7 card_grid-sm">
							{editorStartups.map(
								(startup: StartupTypeCard, index: number) => (
									<StartupCard key={index} post={startup} />
								)
							)}
						</ul>
					</div>
				)}

				<Suspense fallback={<Skeleton className="view_skeleton" />}>
					<View id={id} />
				</Suspense>
			</section>
		</>
	)
}
export default page
