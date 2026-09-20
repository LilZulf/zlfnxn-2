import { useEffect, useRef, useState } from "react"

interface StackMarqueeProps {
	items: readonly string[]
}

export function StackMarquee({ items }: StackMarqueeProps) {
	const [documentHidden, setDocumentHidden] = useState(false)
	const [manuallyPaused, setManuallyPaused] = useState(false)
	const [copyCount, setCopyCount] = useState(2)
	const marqueeRef = useRef<HTMLButtonElement>(null)
	const firstSetRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function onVisibilityChange() {
			setDocumentHidden(document.hidden)
		}

		document.addEventListener("visibilitychange", onVisibilityChange)
		return () => document.removeEventListener("visibilitychange", onVisibilityChange)
	}, [])

	useEffect(() => {
		const marquee = marqueeRef.current
		const firstSet = firstSetRef.current
		if (!marquee || !firstSet) return

		function syncMarqueeCopies() {
			const currentMarquee = marqueeRef.current
			const currentFirstSet = firstSetRef.current
			if (!currentMarquee || !currentFirstSet) return

			const setWidth = currentFirstSet.getBoundingClientRect().width
			if (setWidth === 0) return

			currentMarquee.style.setProperty("--stack-marquee-shift", `${-setWidth}px`)
			setCopyCount(Math.max(2, Math.ceil(currentMarquee.clientWidth / setWidth) + 1))
		}

		syncMarqueeCopies()
		const resizeObserver = new ResizeObserver(syncMarqueeCopies)
		resizeObserver.observe(marquee)
		resizeObserver.observe(firstSet)

		return () => resizeObserver.disconnect()
	}, [])

	if (items.length === 0) return null

	return (
		<button
			ref={marqueeRef}
			type="button"
			className="stack-marquee"
			data-paused={documentHidden || manuallyPaused ? "true" : undefined}
			aria-label={`${manuallyPaused ? "Resume" : "Pause"} technology stack marquee. Stack: ${items.join(", ")}`}
			aria-pressed={manuallyPaused}
			onClick={() => setManuallyPaused((paused) => !paused)}
		>
			<div className="stack-marquee-track">
				{Array.from({ length: copyCount }, (_, copyIndex) => (
					<div
						className="stack-marquee-set"
						ref={copyIndex === 0 ? firstSetRef : undefined}
						aria-hidden={copyIndex === 0 ? undefined : true}
						// biome-ignore lint/suspicious/noArrayIndexKey: these duplicate, stateless sets never reorder
						key={copyIndex}
					>
						{items.map((item) => (
							<span key={item}>{item}</span>
						))}
					</div>
				))}
			</div>
		</button>
	)
}
