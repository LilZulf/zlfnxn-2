export interface PortfolioEntry {
	id: string
	title: string
	summary: string
	stack: readonly string[]
	href?: string
	image?: string
	imageAlt?: string
}

