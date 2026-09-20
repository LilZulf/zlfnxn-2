import { useEffect, useId, useRef, useState } from "react"

export interface CircularTextProps {
	terms: readonly string[]
	initialText: string
	separator?: string
}

function composeTerms(terms: readonly string[], separator: string, termCount: number) {
	const available = [...terms]
	const selected: string[] = []
	while (available.length > 0 && selected.length < termCount) {
		const index = Math.floor(Math.random() * available.length)
		selected.push(available.splice(index, 1)[0] ?? "")
	}
	return `${selected.join(` ${separator} `)} ${separator}`
}

const layerRadii = [112, 101, 90, 79, 68, 57] as const
const layerTermCounts = [5, 5, 4, 4, 3, 3] as const
const launchDuration = 3400
const maximumPlaybackRate = 64

export function CircularText({
	terms,
	initialText,
	separator = "...",
}: CircularTextProps) {
	const pathId = useId().replaceAll(":", "")
	const orbitRef = useRef<SVGSVGElement>(null)
	const launchFrameRef = useRef<number | null>(null)
	const contactTimerRef = useRef<number | null>(null)
	const resetTimerRef = useRef<number | null>(null)
	const [phrases, setPhrases] = useState<readonly string[]>([initialText])
	const [isLaunching, setIsLaunching] = useState(false)
	const remixIdentity = () =>
		setPhrases(
			layerRadii.map((_, index) =>
				composeTerms(terms, separator, layerTermCounts[index] ?? 3),
			),
		)

	useEffect(() => {
		remixIdentity()
	}, [initialText, separator, terms])

	useEffect(
		() => () => {
			if (launchFrameRef.current !== null) cancelAnimationFrame(launchFrameRef.current)
			if (contactTimerRef.current !== null) window.clearTimeout(contactTimerRef.current)
			if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current)
		},
		[],
	)

	const goToContact = (behavior: ScrollBehavior) => {
		const contact = document.querySelector<HTMLElement>("#contact")
		if (!contact) return
		window.history.pushState(null, "", "#contact")
		contact.scrollIntoView({ behavior, block: "start" })
	}

	const startContactLaunch = () => {
		if (isLaunching) return
		remixIdentity()

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			goToContact("auto")
			return
		}

		setIsLaunching(true)
		const orbitAnimation = orbitRef.current?.getAnimations()[0]
		const startedAt = performance.now()

		const accelerate = (now: number) => {
			const progress = Math.min((now - startedAt) / launchDuration, 1)
			const easedProgress = progress ** 3
			if (orbitAnimation) {
				orbitAnimation.playbackRate =
					1 + easedProgress * (maximumPlaybackRate - 1)
			}

			if (progress < 1) {
				launchFrameRef.current = requestAnimationFrame(accelerate)
				return
			}

			contactTimerRef.current = window.setTimeout(() => {
				goToContact("smooth")
				resetTimerRef.current = window.setTimeout(() => {
					if (orbitAnimation) orbitAnimation.playbackRate = 1
					setIsLaunching(false)
				}, 900)
			}, 550)
		}

		launchFrameRef.current = requestAnimationFrame(accelerate)
	}

	return (
		<button
			type="button"
			className="orbit-control"
			onClick={startContactLaunch}
			disabled={isLaunching}
			data-launching={isLaunching ? "true" : undefined}
			aria-label="Send a Signal"
		>
			<svg ref={orbitRef} className="orbit-svg" viewBox="0 0 260 260" aria-hidden="true">
				<defs>
					{layerRadii.map((radius, index) => (
						<path
							key={radius}
							id={`${pathId}-${index}`}
							d={`M 130,130 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
						/>
					))}
				</defs>
				{phrases.map((phrase, index) => {
					const radius = layerRadii[index] ?? 57
					return (
						<text
							key={`${phrase}-${index}`}
							className="orbit-layer"
							textLength={Math.floor(2 * Math.PI * radius - 10)}
							lengthAdjust="spacingAndGlyphs"
						>
							<textPath href={`#${pathId}-${index}`} startOffset="0%">
								{phrase}
							</textPath>
						</text>
					)
				})}
			</svg>
			<span className="orbit-center" aria-hidden="true">
				<span>Send a</span>
				<span>Signal!</span>
			</span>
			<span className="sr-only" aria-live="polite">
				Identity orbit: {phrases.join(" / ")}
			</span>
		</button>
	)
}
