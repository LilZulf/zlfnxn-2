import {
	ChartNetwork,
	Eye,
	GitFork,
	Network,
	RadioTower,
	SatelliteDish,
	Share2,
	Waypoints,
	Webhook,
} from "lucide-react";
import { Reveal } from "../atoms/Reveal";
import { RevealController } from "../atoms/RevealController";
import { SectionIndex } from "../atoms/SectionIndex";
import { AsciiImage } from "../molecules/AsciiImage";
import { HeroRadar } from "../molecules/HeroRadar";
import { StackMarquee } from "../molecules/StackMarquee";
import { Navigation } from "../organisms/Navigation";
import type { PortfolioEntry } from "../types";

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
] as const;

const stackGroups = [
	["Backend", "Java / Spring Boot / Node.js / Laravel / Python / Go"],
	["Data", "PostgreSQL / Redis"],
	["Messaging", "Kafka / Event Driven"],
	["Infrastructure", "Docker / Automation"],
	["Frontend", "React / Next.js"],
	["Architecture", "Microservices / API / Middleware / Distributed Systems"],
] as const;

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
] as const;

const radarTerms = [
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
] as const;

const blogPosts = [
	{
		title: "When services need a shared language",
		summary:
			"A practical look at the boundaries, contracts, and small decisions that keep integrations legible.",
		src: "/media/earth-signal.png",
		alt: "Earth viewed from low orbit with a thin green atmospheric rim",
	},
	{
		title: "Designing event flows that stay observable",
		summary:
			"What to record before a message enters the queue, and how that context helps the next system respond.",
		src: "/media/signal-field.webp",
		alt: "Green signal traces crossing a dark fibre surface",
	},
	{
		title: "The quiet cost of leaky boundaries",
		summary:
			"A note on ownership, coupling, and the hidden maintenance work created by unclear system edges.",
		src: "/media/earth-signal.png",
		alt: "Earth viewed from low orbit with a thin green atmospheric rim",
	},
	{
		title: "A field guide to integration seams",
		summary:
			"Patterns for translating between external systems without letting one unreliable edge shape the whole platform.",
		src: "/media/signal-field.webp",
		alt: "Abstract green traces representing connected systems",
	},
	{
		title: "Why reliability starts before deployment",
		summary:
			"The useful checks happen in interfaces, failure paths, and assumptions long before a service reaches production.",
		src: "/media/earth-signal.png",
		alt: "Earth viewed from low orbit with a thin green atmospheric rim",
	},
	{
		title: "Small automations, fewer handoffs",
		summary:
			"A compact argument for removing repeated manual steps before adding another layer of operational complexity.",
		src: "/media/signal-field.webp",
		alt: "Luminous signal lines moving across a dark surface",
	},
] as const;

const workIcons = [Waypoints, RadioTower, GitFork] as const;
const stackIcons = [
	Webhook,
	ChartNetwork,
	RadioTower,
	SatelliteDish,
	Share2,
	Network,
] as const;

export function PortfolioPage() {
	return (
		<>
			<a className="skip-link" href="#main-content">
				Skip to content
			</a>
			<RevealController />
			<Navigation />
			<main id="main-content">
				<section
					id="intro"
					className="hero-section"
					aria-labelledby="intro-title"
				>
					<div className="hero-ghost" aria-hidden="true">
						lilzulf lilzulf lilzulf
					</div>
					<div className="page-frame hero-grid">
						<div className="hero-copy">
							<Reveal as="h1" id="intro-title" delay={70}>
								<span data-text="AHMAD">AHMAD</span>
								<span data-text="ZULFAN NAJIB">ZULFAN NAJIB</span>
							</Reveal>
							<Reveal as="p" className="hero-summary" delay={140}>
								Backend systems, integrations, and real-time software built for
								reliability.
							</Reveal>
							<Reveal delay={210}>
								<a className="primary-link" href="#work">
									<span>View work</span>
									<Eye
										className="signal-icon"
										aria-hidden="true"
										strokeWidth={1.5}
									/>
								</a>
							</Reveal>
						</div>
						<Reveal className="hero-media" delay={150}>
							<HeroRadar terms={radarTerms} />
						</Reveal>
					</div>
				</section>

				<section
					id="about"
					className="portfolio-section about-section"
					aria-labelledby="about-title"
				>
					<div className="page-frame section-grid">
						<SectionIndex number="02" />
						<div className="section-content about-content">
							<Reveal as="h2" id="about-title">
								I build at the point where systems need to talk.
							</Reveal>
							<Reveal className="about-signal-map" delay={70}>
								<div aria-hidden="true">
									<Network className="about-network-main" strokeWidth={1.2} />
									<Eye className="about-network-eye" strokeWidth={1.2} />
									<Waypoints
										className="about-network-points"
										strokeWidth={1.2}
									/>
								</div>
							</Reveal>
							<div className="about-columns">
								<Reveal as="p" delay={80}>
									Software Engineer focused on backend engineering, fullstack
									development, and system integration.
								</Reveal>
								<Reveal as="p" delay={140}>
									Interested in distributed architecture, automation, AI,
									infrastructure, and software that stays reliable under
									real-world conditions.
								</Reveal>
							</div>
						</div>
					</div>
				</section>

				<section
					id="work"
					className="portfolio-section work-section"
					aria-labelledby="work-title"
				>
					<div className="page-frame section-grid">
						<SectionIndex number="03" />
						<div className="section-content">
							<Reveal as="h2" id="work-title" className="section-title">
								Selected systems themes
							</Reveal>
							<div className="work-list">
								{work.map((entry, index) => (
									<Reveal
										as="article"
										className={`work-row work-row-${index + 1}`}
										key={entry.id}
										delay={index * 70}
									>
										{(() => {
											const WorkIcon = workIcons[index];
											return (
												<WorkIcon
													className="work-symbol"
													aria-hidden="true"
													strokeWidth={1.25}
												/>
											);
										})()}
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

				<section
					id="stack"
					className="portfolio-section stack-section"
					aria-labelledby="stack-title"
				>
					<StackMarquee items={marqueeItems} />
					<div className="page-frame section-grid">
						<SectionIndex number="04" />
						<div className="section-content">
							<Reveal as="h2" id="stack-title" className="section-title">
								Tools are chosen around the system.
							</Reveal>
							<div className="stack-list">
								{stackGroups.map(([category, items], index) => {
									const StackIcon = stackIcons[index];
									return (
										<Reveal
											className={`stack-row stack-row-${index + 1}`}
											key={category}
											delay={index * 45}
										>
											<div className="stack-row-heading">
												<StackIcon
													className="stack-symbol"
													aria-hidden="true"
													strokeWidth={1.35}
												/>
												<h3>{category}</h3>
											</div>
											<p>{items}</p>
										</Reveal>
									);
								})}
							</div>
						</div>
					</div>
				</section>

				<section
					id="experiments"
					className="portfolio-section experiments-section"
					aria-labelledby="experiments-title"
				>
					<div className="page-frame section-grid">
						<SectionIndex number="05" />
						<div className="section-content blog-content">
							<Reveal className="experiments-heading">
								<h2 id="experiments-title">Notes from the system.</h2>
								<p>
									Short writing on integrations, distributed systems, and the
									work between services.
								</p>
							</Reveal>
							<div className="blog-list">
								{blogPosts.map((post, index) => (
									<Reveal
										as="article"
										className="blog-card"
										key={post.title}
										delay={index * 55}
									>
										<AsciiImage src={post.src} alt={post.alt} />
										<div className="blog-card-copy">
											<h3>{post.title}</h3>
											<p>{post.summary}</p>
										</div>
									</Reveal>
								))}
							</div>
						</div>
					</div>
				</section>

				<section
					id="contact"
					className="portfolio-section contact-section"
					aria-labelledby="contact-title"
				>
					<div className="page-frame section-grid">
						<SectionIndex number="06" />
						<div className="section-content contact-content">
							<pre
								className="contact-ascii-earth"
								aria-hidden="true"
							>{`                  .-=========-.
             .-=+*#%%%%%%%%%%%#*+=-.
          .-+*#%%%%%##***##%%%%%#*+-.
        .=*%%%%%#+-.  .::::.  .-+#%%%%*=.
      .=#%%%%%*-   .-+*#%%%%#*-.   -*%%%%#=.
     -#%%%%%+.   .+%%%%%##%%%%%+.   .+%%%%%-
    *%%%%%+   .-#%%%*:  ..  :*%%%#-.   +%%%%%*
   #%%%%%-  .+%%%%+.  .-=+=-.  .+%%%%+.  -%%%%%#
  *%%%%%:  -%%%%*  .+%%%%%%#%%+.  *%%%%-  :%%%%%*
  %%%%%=  #%%%%-  *%%%%%#*#%%%%%*  -%%%%#  =%%%%%
  %%%%%=  #%%%%:  %%%%%:   :%%%%%  :%%%%#  =%%%%%
  *%%%%%:  -%%%%*  *%%%%%#*#%%%%%*  *%%%%-  :%%%%%*
   #%%%%%-  .+%%%%+.  .-=+=-.  .+%%%%+.  -%%%%%#
    *%%%%%+   .-#%%%*:  ..  :*%%%#-.   +%%%%%*
     -#%%%%%+.   .+%%%%%##%%%%%+.   .+%%%%%-
      .=#%%%%%*-   .-+*#%%%%#*-.   -*%%%%#=.
        .=*%%%%%#+-.  .::::.  .-+#%%%%*=.
          .-+*#%%%%%##***##%%%%%#*+-.
             .-=+*#%%%%%%%%%%%#*+=-.
                  '-=========-'`}</pre>
							<div className="contact-heading-grid">
								<div>
									<Reveal as="p">THE SIGNAL ENDS HERE.</Reveal>
									<Reveal as="h2" id="contact-title" delay={70}>
										Find me as <span>lilzulf.</span>
									</Reveal>
								</div>
							</div>
							<Reveal className="contact-panel" delay={100}>
								<div className="contact-panel-intro">
									<span className="contact-panel-index">[ OPEN CHANNEL ]</span>
									<p>
										For systems, collaborations, or a thoughtful exchange about
										software.
									</p>
									<a
										className="whatsapp-link"
										href="https://wa.me/?text=Halo%20Ahmad%2C%20saya%20ingin%20berdiskusi%20tentang%20proyek."
										target="_blank"
										rel="noreferrer"
									>
										Send to WhatsApp{" "}
										<RadioTower
											className="signal-icon"
											aria-hidden="true"
											strokeWidth={1.5}
										/>
									</a>
								</div>
								<div className="contact-details">
									<div className="contact-detail">
										<span>EMAIL</span>
										<a href="mailto:hello@lilzulf.dev">
											hello@lilzulf.dev{" "}
											<Waypoints
												className="signal-icon"
												aria-hidden="true"
												strokeWidth={1.5}
											/>
										</a>
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
	);
}
