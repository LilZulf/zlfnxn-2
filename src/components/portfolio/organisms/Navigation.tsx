import { type MouseEvent, useEffect, useState } from "react";

const navigation = [
	["About", "#about"],
	["Work", "#work"],
	["Stack", "#stack"],
	["Experiments", "#experiments"],
	["Contact", "#contact"],
] as const;

export function Navigation() {
	const [open, setOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string | null>(null);

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setOpen(false);
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	const scrollToSection = (
		event: MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
			return;
		const section = document.querySelector<HTMLElement>(href);
		if (!section) return;

		event.preventDefault();
		const headerHeight =
			document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
		const target =
			section.getBoundingClientRect().top + window.scrollY - headerHeight;
		const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
			.matches
			? "auto"
			: "smooth";

		window.history.pushState(null, "", href);
		window.scrollTo({ top: Math.max(0, target), behavior });
		setOpen(false);
	};

	useEffect(() => {
		const sections = navigation
			.map(([, href]) => document.querySelector<HTMLElement>(href))
			.filter((section): section is HTMLElement => section !== null);
		const visibleSections = new Map<string, number>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting)
						visibleSections.set(entry.target.id, entry.intersectionRatio);
					else visibleSections.delete(entry.target.id);
				}

				const nextActiveSection =
					[...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
					null;
				setActiveSection((current) =>
					current === nextActiveSection ? current : nextActiveSection,
				);
			},
			{ rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
		);

		for (const section of sections) observer.observe(section);
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<header className="site-header">
			<nav className="site-nav" aria-label="Primary navigation">
				<a
					href="#intro"
					className="wordmark"
					aria-label="lilzulf, back to intro"
				>
					<span aria-hidden="true">Z/</span>
					<span>lilzulf</span>
				</a>
				<div className="desktop-nav">
					{navigation.map(([label, href]) => (
						<a
							key={href}
							href={href}
							onClick={(event) => scrollToSection(event, href)}
							data-active={activeSection === href.slice(1) ? "true" : undefined}
							aria-current={
								activeSection === href.slice(1) ? "location" : undefined
							}
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
				<div
					id="mobile-navigation"
					className="mobile-nav"
					data-open={open ? "true" : undefined}
				>
					{navigation.map(([label, href]) => (
						<a
							key={href}
							href={href}
							onClick={(event) => scrollToSection(event, href)}
							data-active={activeSection === href.slice(1) ? "true" : undefined}
							aria-current={
								activeSection === href.slice(1) ? "location" : undefined
							}
						>
							{label}
						</a>
					))}
				</div>
			</nav>
		</header>
	);
}
