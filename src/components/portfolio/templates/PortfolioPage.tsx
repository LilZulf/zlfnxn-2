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
	type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	getPortfolioContent,
	type PortfolioContent,
} from "../../../lib/portfolio-api";
import { Reveal } from "../atoms/Reveal";
import { RevealController } from "../atoms/RevealController";
import { SectionIndex } from "../atoms/SectionIndex";
import { AsciiImage } from "../molecules/AsciiImage";
import { HeroRadar } from "../molecules/HeroRadar";
import { StackMarquee } from "../molecules/StackMarquee";
import { Navigation } from "../organisms/Navigation";
const workIcons: Record<string, LucideIcon> = {
	waypoints: Waypoints,
	"radio-tower": RadioTower,
	"git-fork": GitFork,
};

const stackIcons: Record<string, LucideIcon> = {
	webhook: Webhook,
	"chart-network": ChartNetwork,
	"radio-tower": RadioTower,
	"satellite-dish": SatelliteDish,
	"share-2": Share2,
	network: Network,
};

export function PortfolioPage({ initialContent }: { initialContent: PortfolioContent }) {
	const [content, setContent] = useState(initialContent);

	useEffect(() => {
		const controller = new AbortController();
		getPortfolioContent(controller.signal)
			.then((result) => {
				setContent(result);
			})
			.catch((reason: unknown) => {
				if (controller.signal.aborted) return;
				console.error("Failed to load portfolio content", reason);
			});
		return () => controller.abort();
	}, []);

	useEffect(() => {
		document.title = content.site.seoTitle;
		document
			.querySelector('meta[name="description"]')
			?.setAttribute("content", content.site.seoDescription);
	}, [content]);

	return <PortfolioView content={content} />;
}

function PortfolioView({ content }: { content: PortfolioContent }) {
	const { site, work, stack, posts } = content;
	return (
		<>
			<a className="skip-link" href="#main-content">
				{site.skipLink}
			</a>
			<RevealController />
			<Navigation site={site} />
			<main id="main-content">
				<section
					id="intro"
					className="hero-section"
					aria-labelledby="intro-title"
				>
					<div className="hero-ghost" aria-hidden="true">
						{site.wordmark} {site.wordmark} {site.wordmark}
					</div>
					<div className="page-frame hero-grid">
						<div className="hero-copy">
							<Reveal as="h1" id="intro-title" delay={70}>
								<span data-text={site.heroNameFirst}>{site.heroNameFirst}</span>
								<span data-text={site.heroNameSecond}>{site.heroNameSecond}</span>
							</Reveal>
							<Reveal as="p" className="hero-summary" delay={140}>
								{site.heroSummary}
							</Reveal>
							<Reveal delay={210}>
								<a className="primary-link" href="#work">
									<span>{site.heroCta}</span>
									<Eye
										className="signal-icon"
										aria-hidden="true"
										strokeWidth={1.5}
									/>
								</a>
							</Reveal>
						</div>
						<Reveal className="hero-media" delay={150}>
							<HeroRadar terms={site.radarTerms} />
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
								{site.aboutHeading}
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
									{site.aboutParagraphOne}
								</Reveal>
								<Reveal as="p" delay={140}>
									{site.aboutParagraphTwo}
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
								{site.workHeading}
							</Reveal>
							<div className="work-list">
								{work.map((entry, index) => (
									<Reveal
										as="article"
										className={`work-row work-row-${index + 1}`}
										key={entry.slug}
										delay={index * 70}
									>
										{(() => {
											const WorkIcon = workIcons[entry.icon] ?? Waypoints;
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
					<StackMarquee items={site.marqueeItems} />
					<div className="page-frame section-grid">
						<SectionIndex number="04" />
						<div className="section-content">
							<Reveal as="h2" id="stack-title" className="section-title">
								{site.stackHeading}
							</Reveal>
							<div className="stack-list">
								{stack.map((group, index) => {
									const StackIcon = stackIcons[group.icon] ?? Network;
									return (
										<Reveal
											className={`stack-row stack-row-${index + 1}`}
											key={group.category}
											delay={index * 45}
										>
											<div className="stack-row-heading">
												<StackIcon
													className="stack-symbol"
													aria-hidden="true"
													strokeWidth={1.35}
												/>
												<h3>{group.category}</h3>
											</div>
											<p>{group.items}</p>
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
								<h2 id="experiments-title">{site.experimentsHeading}</h2>
								<p>
									{site.experimentsSummary}
								</p>
							</Reveal>
							<div className="blog-list">
								{posts.map((post, index) => (
									<Reveal
										as="article"
										className="blog-card"
										key={post.slug}
										delay={index * 55}
									>
										{post.imageUrl && (
											<AsciiImage src={post.imageUrl} alt={post.imageAlt} />
										)}
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
							{site.contactImageUrl && (
								<AsciiImage src={site.contactImageUrl} alt="" background />
							)}
							<div className="contact-heading-grid">
								<div>
									<Reveal as="p">{site.contactEyebrow}</Reveal>
									<Reveal as="h2" id="contact-title" delay={70}>
										{site.contactHeading} <span>{site.contactHighlight}</span>
									</Reveal>
								</div>
							</div>
							<Reveal className="contact-panel" delay={100}>
								<div className="contact-panel-intro">
									<span className="contact-panel-index">{site.contactPanelLabel}</span>
									<p>
										{site.contactIntro}
									</p>
									<a
										className="whatsapp-link"
										href={site.whatsappUrl}
										target="_blank"
										rel="noreferrer"
									>
										{site.whatsappLabel}{" "}
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
										<a href={`mailto:${site.email}`}>
											{site.email}{" "}
											<Waypoints
												className="signal-icon"
												aria-hidden="true"
												strokeWidth={1.5}
											/>
										</a>
									</div>
									<div className="contact-detail">
										<span>STATUS</span>
										<strong>{site.status}</strong>
									</div>
									<div className="contact-detail">
										<span>LOCATION</span>
										<strong>{site.location}</strong>
									</div>
								</div>
							</Reveal>
							<Reveal delay={130}>
								<a className="return-link" href="#intro">
									{site.returnLabel} <span aria-hidden="true">↑</span>
								</a>
							</Reveal>
						</div>
					</div>
				</section>
			</main>
			<footer className="site-footer">
				<div className="page-frame">
					<span>{site.footerName}</span>
					<span>{site.footerRole}</span>
				</div>
			</footer>
		</>
	);
}
