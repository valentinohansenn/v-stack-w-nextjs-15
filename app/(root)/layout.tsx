import NavigationBar from "@/components/NavigationBar"

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<NavigationBar />
			<main className="font-work-sans">{children}</main>
		</>
	)
}
