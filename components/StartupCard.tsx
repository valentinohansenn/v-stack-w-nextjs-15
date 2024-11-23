import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"
import { Author, Startup } from "@/sanity/types"

// Type of Startup without the property of author
export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author }

const StartupCard = ({ key, post }: { key: number; post: StartupTypeCard }) => {
	const {
		_createdAt,
		views,
		author,
		_id,
		description,
		title,
		category,
		image,
	} = post
	return (
		<li className="startup-card group" key={key}>
			<div className="flex-between">
				<p className="startup_card_date">{formatDate(_createdAt)}</p>
				<div className="flex gap-1.5">
					<EyeIcon className="size-6 text-primary" />
					<span className="text-16-medium">{views}</span>
				</div>
			</div>

			<div className="flex-between mt-5 gap-5">
				<div className="flex-1">
					<Link href={`/user/${author?._id}`}>
						<p className="text-16-medium line-clamp-1">
							Published by: {author?.name}
						</p>
					</Link>

					<Link href={`/startup/${_id}`}>
						<h3 className="text-26-semibold">{title}</h3>
					</Link>
				</div>
				<Link href={`/user/${author?._id}`}>
					<Image
						src="https://placehold.co/48x48"
						alt={author?.name!}
						width={48}
						height={48}
						className="rounded-full"
					/>
				</Link>
			</div>

			<Link href={`/startup/${_id}`}>
				<p className="startup-card_desc">{description}</p>

				<Image
					src={image || "https://placehold.co/400x300"}
					alt="placeholder"
					width={400}
					height={300}
					className="startup-card_image"
				/>
			</Link>

			<div className="flex-between gap-3 mt-5">
				<Link href={`/?query=${category?.toLowerCase()}`}>
					<p className="text-16-medium">{category}</p>
				</Link>
				<Button className="startup-card_btn" asChild>
					<Link href={`/startup/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	)
}

export default StartupCard
