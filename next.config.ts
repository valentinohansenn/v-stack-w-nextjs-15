import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
			},
		],
	},
	// Partial Pre-rendering (PPR) is an experimental feature that allows you to pre-render only a part of your page
	experimental: {
		ppr: "incremental",
		after: true,
	},
	// Visualizes what happens during the PPR
	devIndicators: {
		appIsrStatus: true,
		buildActivity: true,
		buildActivityPosition: "bottom-right",
	},
}

export default nextConfig
