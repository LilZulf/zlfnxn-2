import { useEffect, useState } from "react"

const navigation = [
	["About", "#about"],
	["Work", "#work"],
	["Stack", "#stack"],
	["Experiments", "#experiments"],
	["Contact", "#contact"],
] as const

export function Navigation() {
	const [open, setOpen] = useState(false)
	const [activeSection, setActiveSection] = useState<string | null>(null)

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setOpen(false)
		}

		window.addEventListener("keydown", onKeyDown)
		return () => window.removeEventListener("keydown", onKeyDown)
	}, [])

	useEffect(() => {
		let frame = 0

		const updateActiveSection = () => {
			frame = 0
			const marker = window.scrollY + window.innerHeight * 0.28
			let nextActiveSection: string | null = null

			for (const [, href] of navigation) {
				const section = document.querySelector(href)
				if (section && section.getBoundingClientRect().top + window.scrollY <= marker) {
					nextActiveSection = href.slice(1)
				}
			}

			setActiveSection((current) => (current === nextActiveSection ? current : nextActiveSection))
		}

		const onScroll = () => {
			if (frame === 0) frame = window.requestAnimationFrame(updateActiveSection)
		}

		updateActiveSection()
		window.addEventListener("scroll", onScroll, { passive: true })
		window.addEventListener("resize", onScroll)
		return () => {
			window.removeEventListener("scroll", onScroll)
			window.removeEventListener("resize", onScroll)
			if (frame !== 0) window.cancelAnimationFrame(frame)
		}
	}, [])

	return (
		<header className="site-header">
			<nav className="site-nav" aria-label="Primary navigation">
				<a href="#intro" className="wordmark" aria-label="lilzulf, back to intro">
					<span aria-hidden="true">Z/</span>
					<span>lilzulf</span>
				</a>
				<div className="desktop-nav">
					{navigation.map(([label, href]) => (
						<a
							key={href}
							href={href}
							data-active={activeSection === href.slice(1) ? "true" : undefined}
							aria-current={activeSection === href.slice(1) ? "location" : undefined}
						>
							{label}
						</a>
					))}
				</div>
				<button
					type="button"
					className="menu-toggle"
					aria-expanded={open}
					aria-controls="mobile-navigation"
					onClick={() => setOpen((current) => !current)}
				>
					<span>{open ? "Close" : "Menu"}</span>
					<span aria-hidden="true">[{open ? "−" : "+"}]</span>
				</button>
				<div id="mobile-navigation" className="mobile-nav" data-open={open ? "true" : undefined}>
					{navigation.map(([label, href]) => (
						<a
							key={href}
							href={href}
							data-active={activeSection === href.slice(1) ? "true" : undefined}
							aria-current={activeSection === href.slice(1) ? "location" : undefined}
							onClick={() => setOpen(false)}
						>
							{label}
						</a>
					))}
				</div>
			</nav>
		</header>
	)
}
