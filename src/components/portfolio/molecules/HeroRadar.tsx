import { ArrowDown, Pause, Play, Radio } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface HeroRadarProps {
	terms: readonly string[];
}

interface Target {
	label: string;
	x: number;
	y: number;
	angle: number;
}

const sweepDuration = 6000;

// Separate horizontal lanes reserve room for even the longest two-line labels.
function placeTargets(labels: string[], size: number): Target[] {
	const labelWidth = Math.min(140, size * 0.44);
	return labels.map((label, index) => {
		const lane =
			labels.length === 3 ? [0.25, 0.48, 0.71] : [0.22, 0.4, 0.58, 0.76];
		const y = size * ((lane[index] ?? 0.5) + (Math.random() - 0.5) * 0.015);
		const edgeY = Math.max(
			Math.abs(y - 5 - size / 2),
			Math.abs(y + 38 - size / 2),
		);
		const halfChord = Math.sqrt(Math.max(0, (size / 2 - 12) ** 2 - edgeY ** 2));
		const travel = Math.max(0, halfChord - labelWidth / 2);
		const x = size / 2 + (Math.random() * 2 - 1) * travel;
		const angle =
			((Math.atan2(x - size / 2, size / 2 - y) * 180) / Math.PI + 360) % 360;
		return { label, x, y, angle };
	});
}

export function HeroRadar({ terms }: HeroRadarProps) {
	const gridId = useId();
	const screenRef = useRef<HTMLDivElement>(null);
	const sweepRef = useRef<HTMLDivElement>(null);
	const targetRefs = useRef<(HTMLDivElement | null)[]>([]);
	const pausedRef = useRef(false);
	const sendingRef = useRef(false);
	const timerRef = useRef<number | null>(null);
	const [paused, setPaused] = useState(false);
	const [received, setReceived] = useState(false);
	const [reduced, setReduced] = useState(false);
	const [size, setSize] = useState(0);
	const [compact, setCompact] = useState(false);
	const [targets, setTargets] = useState<Target[]>([]);

	useEffect(() => {
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const mobile = window.matchMedia("(max-width: 639px)");
		const sync = () => {
			setReduced(motion.matches);
			setCompact(mobile.matches);
		};
		sync();
		motion.addEventListener("change", sync);
		mobile.addEventListener("change", sync);
		const observer = new ResizeObserver(([entry]) => {
			if (entry) setSize(entry.contentRect.width);
		});
		if (screenRef.current) observer.observe(screenRef.current);
		return () => {
			motion.removeEventListener("change", sync);
			mobile.removeEventListener("change", sync);
			observer.disconnect();
			if (timerRef.current !== null) window.clearTimeout(timerRef.current);
		};
	}, []);

	useEffect(() => {
		if (!size || !terms.length) return;
		let queue: string[] = [];
		const nextTargets = () => {
			const labels: string[] = [];
			const count = Math.min(compact ? 3 : 4, terms.length);
			while (labels.length < count) {
				if (!queue.length) {
					queue = [...new Set(terms)];
					for (let i = queue.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[queue[i], queue[j]] = [queue[j], queue[i]];
					}
				}
				const index = queue.findIndex((label) => !labels.includes(label));
				if (index < 0) break;
				labels.push(queue.splice(index, 1)[0]);
			}
			return placeTargets(labels, size);
		};
		let current = nextTargets();
		setTargets(current);
		if (reduced) return;
		let visible = true;
		let elapsed = 0;
		let lastTime = 0;
		let frame = 0;
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			lastTime = 0;
		});
		if (screenRef.current) observer.observe(screenRef.current);
		const tick = (now: number) => {
			if (visible && !document.hidden && !pausedRef.current) {
				if (lastTime) elapsed += Math.min(now - lastTime, 100);
				lastTime = now;
				if (elapsed >= sweepDuration) {
					elapsed %= sweepDuration;
					current = nextTargets();
					setTargets(current);
				}
				if (sweepRef.current)
					sweepRef.current.style.transform = `rotate(${(elapsed / sweepDuration) * 360}deg)`;
				current.forEach((target, index) => {
					const age = elapsed - (target.angle / 360) * sweepDuration;
					const opacity =
						age < 0
							? 0
							: Math.max(
									0,
									Math.min(
										age / 100,
										1,
										(2000 - age) / 500,
										(sweepDuration - elapsed) / 180,
									),
								);
					const node = targetRefs.current[index];
					if (node) node.style.opacity = String(opacity);
				});
			} else lastTime = 0;
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	}, [compact, reduced, size, terms]);

	const sendSignal = () => {
		if (sendingRef.current) return;
		const contact = document.getElementById("contact");
		if (!contact) return;
		sendingRef.current = true;
		setReceived(true);
		const navigate = () => {
			if (window.location.hash !== "#contact")
				window.history.pushState(null, "", "#contact");
			contact.scrollIntoView({
				behavior: reduced ? "instant" : "smooth",
				block: "start",
			});
			const heading = document.getElementById("contact-title");
			if (heading) {
				heading.setAttribute("tabindex", "-1");
				heading.focus({ preventScroll: true });
			}
			timerRef.current = window.setTimeout(() => {
				sendingRef.current = false;
				setReceived(false);
			}, 1200);
		};
		if (reduced) navigate();
		else timerRef.current = window.setTimeout(navigate, 600);
	};

	return (
		<div className="hero-radar" data-reduced={reduced} data-received={received}>
			<div className="radar-heading">
				<span>SONAR / IDENTITY FIELD</span>
				<span>CH. 01</span>
			</div>
			<div className="radar-bezel">
				<span className="radar-bearing radar-north">000</span>
				<span className="radar-bearing radar-east">090</span>
				<span className="radar-bearing radar-south">180</span>
				<span className="radar-bearing radar-west">270</span>
				<div ref={screenRef} className="radar-screen" aria-hidden="true">
					<svg className="radar-grid" viewBox="0 0 400 400">
						<title>Radar grid</title>
						<defs>
							<pattern
								id={gridId}
								width="25"
								height="25"
								patternUnits="userSpaceOnUse"
							>
								<path d="M25 0H0V25" fill="none" />
							</pattern>
						</defs>
						<circle cx="200" cy="200" r="199" fill={`url(#${gridId})`} />
						<g fill="none">
							<circle cx="200" cy="200" r="50" />
							<circle cx="200" cy="200" r="100" />
							<circle cx="200" cy="200" r="150" />
							<path d="M0 200H400M200 0V400" />
						</g>
					</svg>
					<div className="radar-sweep" ref={sweepRef} />
					<span className="radar-origin" />
					{targets.map((target, index) => (
						<div
							key={target.label}
							ref={(node) => {
								targetRefs.current[index] = node;
							}}
							className="radar-target"
							style={{ left: target.x, top: target.y }}
						>
							<span className="radar-dot" />
							<span className="radar-label">{target.label}</span>
						</div>
					))}
					{received && <span className="radar-pulse" />}
				</div>
			</div>
			<div className="radar-telemetry">
				<span>
					{reduced
						? "STATIC DISPLAY"
						: paused
							? "SCAN PAUSED"
							: "SCANNING / 360°"}
				</span>
				<button
					type="button"
					className="radar-pause"
					disabled={reduced}
					aria-label={paused ? "Resume radar scan" : "Pause radar scan"}
					aria-pressed={paused}
					onClick={() => {
						pausedRef.current = !paused;
						setPaused(!paused);
					}}
				>
					{paused ? (
						<Play size={12} aria-hidden="true" />
					) : (
						<Pause size={12} aria-hidden="true" />
					)}
					<span>{paused ? "RESUME" : "PAUSE"}</span>
				</button>
			</div>
			<div className="radar-action">
				<button
					type="button"
					className="radar-send"
					onClick={sendSignal}
					disabled={received}
				>
					<Radio size={17} aria-hidden="true" />
					<span>Send signal</span>
					<ArrowDown size={16} aria-hidden="true" />
				</button>
				<output className="radar-status" aria-live="polite">
					{received ? "Received from target" : "AWAITING TRANSMISSION"}
				</output>
			</div>
			<p className="sr-only">Radar identity signals: {terms.join(", ")}.</p>
		</div>
	);
}
