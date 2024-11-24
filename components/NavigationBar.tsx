import Link from "next/link"
import Image from "next/image"
import React from "react"
import { auth, signOut, signIn } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { BadgePlus, LogOut, Plus } from "lucide-react"

const NavigationBar = async () => {
	const session = await auth()
	return (
		<header className="px-5 py-3 bg-white text-black shadow-sm font-work-sans">
			<nav className="flex justify-between items-center">
				<Link href="/">
					<Image src="/logo.svg" alt="Logo" width={40} height={40} />
				</Link>

				<div className="flex items-center gap-5">
					{session && session?.user ? (
						<>
							<Link href="/startup/create">
								<span className="max-sm:hidden">Create</span>
								<BadgePlus className="size-6 sm:hidden" />
							</Link>

							<form
								action={async () => {
									"use server"

									await signOut({ redirectTo: "/" })
								}}
							>
								<button type="submit" className="text-red-600">
									<span className="max-sm:hidden">Log Out</span>
									<LogOut className="size-6 sm:hidden" />
								</button>
							</form>

							<Link href={`/user/${session?.id}`}>
								<Avatar>
									<AvatarImage
										src={session?.user?.image || ""}
										alt={session?.user?.name || ""}
									/>
									<AvatarFallback>AV</AvatarFallback>
								</Avatar>
							</Link>
						</>
					) : (
						<>
							<form
								action={async () => {
									"use server"

									await signIn("github")
								}}
							>
								<button type="submit">Log In</button>
							</form>
						</>
					)}
				</div>
			</nav>
		</header>
	)
}

export default NavigationBar
