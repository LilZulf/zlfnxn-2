import { useEffect, useRef } from "react"
import { Reveal } from "../atoms/Reveal"
import { RevealController } from "../atoms/RevealController"
import { SectionIndex } from "../atoms/SectionIndex"
import { AsciiImage } from "../molecules/AsciiImage"
import { CircularText } from "../molecules/CircularText"
import { StackMarquee } from "../molecules/StackMarquee"
import { Navigation } from "../organisms/Navigation"
import type { PortfolioEntry } from "../types"

const work: readonly PortfolioEntry[] = [
	{
		id: "reservation-systems",
		title: "Reservation Systems Integration",
		summary:
			"Reservation flows connected across backend services, APIs, and external system boundaries.",
		stack: ["SYSTEM INTEGRATION", "API", "MIDDLEWARE"],
	},
	{
		id: "real-time-data",
		title: "Real-Time Data Processing",
		summary:
			"Event-driven data flows designed for timely processing and reliable message handling.",
		stack: ["KAFKA", "EVENT DRIVEN", "REAL TIME SYSTEMS"],
	},
	{
		id: "distributed-backend",
		title: "Distributed Backend Services",
		summary:
			"Backend services shaped around clear interfaces, messaging, data, and infrastructure.",
		stack: ["MICROSERVICES", "DISTRIBUTED SYSTEMS", "DOCKER"],
	},
] as const

const stackGroups = [
	["Backend", "Java / Spring Boot / Node.js / Laravel / Python / Go"],
	["Data", "PostgreSQL / Redis"],
	["Messaging", "Kafka / Event Driven"],
	["Infrastructure", "Docker / Automation"],
	["Frontend", "React / Next.js"],
	["Architecture", "Microservices / API / Middleware / Distributed Systems"],
] as const

const marqueeItems = [
	"JAVA",
	"SPRING BOOT",
	"NODE.JS",
	"KAFKA",
	"POSTGRESQL",
	"REDIS",
	"DOCKER",
	"REACT",
	"GO",
] as const

const orbitTerms = [
	"AHMAD ZULFAN NAJIB",
	"lilzulf",
	"SOFTWARE ENGINEER",
	"BACKEND ENGINEER",
	"SYSTEM INTEGRATION",
	"JAVA",
	"SPRING BOOT",
	"NODE.JS",
	"REACT",
	"KAFKA",
	"POSTGRESQL",
	"REDIS",
	"DOCKER",
	"MICROSERVICES",
	"EVENT DRIVEN",
	"DISTRIBUTED SYSTEMS",
] as const

export function PortfolioPage() {
	const heroGhostRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const ghost = heroGhostRef.current
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
		if (!ghost || reducedMotion.matches) return

		let frame = 0
		const updateGhostPosition = () => {
			frame = 0
			ghost.style.setProperty("--ghost-shift", `${Math.min(window.scrollY * 0.12, window.innerWidth * 0.08)}px`)
		}
		const onScroll = () => {
			if (frame === 0) frame = window.requestAnimationFrame(updateGhostPosition)
		}

		updateGhostPosition()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => {
			window.removeEventListener("scroll", onScroll)
			if (frame !== 0) window.cancelAnimationFrame(frame)
		}
	}, [])

	return (
		<>
			<a className="skip-link" href="#main-content">
				Skip to content
			</a>
			<RevealController />
			<Navigation />
			<main id="main-content">
				<section id="intro" className="hero-section" aria-labelledby="intro-title">
					<div ref={heroGhostRef} className="hero-ghost" aria-hidden="true">
						lilzulf lilzulf lilzulf
					</div>
					<div className="page-frame hero-grid">
						<div className="hero-copy">
							<Reveal as="h1" id="intro-title" delay={70}>
								<span data-text="AHMAD">AHMAD</span>
								<span data-text="ZULFAN NAJIB">ZULFAN NAJIB</span>
							</Reveal>
							<Reveal as="p" className="hero-summary" delay={140}>
								Backend systems, integrations, and real-time software built for reliability.
							</Reveal>
							<Reveal delay={210}>
								<a className="primary-link" href="#work">
									<span>View work</span>
									<span aria-hidden="true">↘</span>
								</a>
							</Reveal>
						</div>
						<Reveal className="hero-media" delay={150}>
							<CircularText
								terms={orbitTerms}
								initialText="lilzulf ... SOFTWARE ENGINEER ... SYSTEM INTEGRATION ..."
							/>
						</Reveal>
					</div>
				</section>

				<section id="about" className="portfolio-section about-section" aria-labelledby="about-title">
					<div className="page-frame section-grid">
						<SectionIndex number="02" />
						<div className="section-content about-content">
							<Reveal as="h2" id="about-title">
								I build at the point where systems need to talk.
							</Reveal>
							<div className="about-columns">
								<Reveal as="p" delay={80}>
									Software Engineer focused on backend engineering, fullstack development, and system integration.
								</Reveal>
								<Reveal as="p" delay={140}>
									Interested in distributed architecture, automation, AI, infrastructure, and software that stays reliable under real-world conditions.
								</Reveal>
							</div>
						</div>
					</div>
				</section>

				<section id="work" className="portfolio-section work-section" aria-labelledby="work-title">
					<div className="page-frame section-grid">
						<SectionIndex number="03" />
						<div className="section-content">
							<Reveal as="h2" id="work-title" className="section-title">
								Selected systems themes
							</Reveal>
							<div className="work-list">
								{work.map((entry, index) => (
									<Reveal as="article" className="work-row" key={entry.id} delay={index * 70}>
										<div className="work-number">0{index + 1}</div>
										<div>
											<h3>{entry.title}</h3>
											<p>{entry.summary}</p>
										</div>
										<ul aria-label={`${entry.title} technologies`}>
											{entry.stack.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									</Reveal>
								))}
							</div>
						</div>
					</div>
				</section>

				<section id="stack" className="portfolio-section stack-section" aria-labelledby="stack-title">
					<StackMarquee items={marqueeItems} />
					<div className="page-frame section-grid">
						<SectionIndex number="04" />
						<div className="section-content">
							<Reveal as="h2" id="stack-title" className="section-title">
								Tools are chosen around the system.
							</Reveal>
							<div className="stack-list">
								{stackGroups.map(([category, items], index) => (
									<Reveal className="stack-row" key={category} delay={index * 45}>
										<h3>{category}</h3>
										<p>{items}</p>
									</Reveal>
								))}
							</div>
						</div>
					</div>
				</section>

				<section id="experiments" className="portfolio-section experiments-section" aria-labelledby="experiments-title">
					<div className="page-frame section-grid">
						<SectionIndex number="05" />
						<div className="section-content experiments-content">
							<Reveal className="experiments-heading">
								<h2 id="experiments-title">Interfaces as working experiments.</h2>
								<p>Canvas transformation, generative typography, and progressive interaction are part of this page itself.</p>
							</Reveal>
							<Reveal className="experiment-ascii" delay={100}>
								<AsciiImage
									src="/media/systems-core.webp"
									alt="Editorial macro study of dark server connections and bundled cables"
								/>
							</Reveal>
							<Reveal className="signal-media" delay={130}>
								<img
									src="/media/signal-field.webp"
									alt="Generated abstract study of green signal traces passing over dark fibre materials"
									width="1600"
									height="1066"
									loading="lazy"
									decoding="async"
								/>
							</Reveal>
						</div>
					</div>
				</section>

				<section id="contact" className="portfolio-section contact-section" aria-labelledby="contact-title">
					<div className="page-frame section-grid">
						<SectionIndex number="06" />
						<div className="section-content contact-content">
							<Reveal as="p">THE SIGNAL ENDS HERE.</Reveal>
							<Reveal as="h2" id="contact-title" delay={70}>
								Find me as <span>lilzulf.</span>
							</Reveal>
							<Reveal className="contact-panel" delay={100}>
								<div className="contact-panel-intro">
									<span className="contact-panel-index">[ OPEN CHANNEL ]</span>
									<p>For systems, collaborations, or a thoughtful exchange about software.</p>
								</div>
								<div className="contact-details" aria-label="Contact details">
									<div className="contact-detail">
										<span>EMAIL</span>
										<a href="mailto:hello@lilzulf.dev">hello@lilzulf.dev ↗</a>
									</div>
									<div className="contact-detail">
										<span>STATUS</span>
										<strong>AVAILABLE / SELECTIVE</strong>
									</div>
									<div className="contact-detail">
										<span>LOCATION</span>
										<strong>INDONESIA / UTC+7</strong>
									</div>
								</div>
							</Reveal>
							<Reveal delay={130}>
								<a className="return-link" href="#intro">
									Return to intro <span aria-hidden="true">↑</span>
								</a>
							</Reveal>
						</div>
					</div>
				</section>
			</main>
			<footer className="site-footer">
				<div className="page-frame">
					<span>AHMAD ZULFAN NAJIB</span>
					<span>SOFTWARE ENGINEER / lilzulf</span>
				</div>
			</footer>
		</>
	)
}
