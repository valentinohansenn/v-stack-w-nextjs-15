import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

export function formatViews(views: number) {
	return views === 1 ? "View" : "Views"
}

export function parseServerActionResponse<T>(response: T) {
	return JSON.parse(JSON.stringify(response))
}
