import { useCallback, useEffect, useRef, useState } from "react"

export interface AsciiImageProps {
	src: string
	alt: string
	columns?: { mobile: number; desktop: number }
	characters?: string
	contrast?: number
	gamma?: number
	threshold?: number
	invert?: boolean
}

type LoadState = "loading" | "ready" | "error"

const asciiCache = new Map<string, string>()

function cacheKey(
	src: string,
	columns: number,
	characters: string,
	contrast: number,
	gamma: number,
	threshold: number,
	invert: boolean,
) {
	return [src, columns, characters, contrast, gamma, threshold, invert].join("|")
}

function imageToAscii(
	image: HTMLImageElement,
	columns: number,
	characters: string,
	contrast: number,
	gamma: number,
	threshold: number,
	invert: boolean,
) {
	const key = cacheKey(image.currentSrc || image.src, columns, characters, contrast, gamma, threshold, invert)
	const cached = asciiCache.get(key)
	if (cached) return cached

	const rows = Math.max(1, Math.round(columns * (image.naturalHeight / image.naturalWidth) * 0.6))
	const canvas = document.createElement("canvas")
	canvas.width = columns
	canvas.height = rows
	const context = canvas.getContext("2d", { willReadFrequently: true })
	if (!context) throw new Error("Canvas is unavailable")

	context.drawImage(image, 0, 0, columns, rows)
	const { data } = context.getImageData(0, 0, columns, rows)
	const lines: string[] = []

	for (let y = 0; y < rows; y += 1) {
		let line = ""
		for (let x = 0; x < columns; x += 1) {
			const offset = (y * columns + x) * 4
			const luminance =
				0.2126 * (data[offset] ?? 0) +
				0.7152 * (data[offset + 1] ?? 0) +
				0.0722 * (data[offset + 2] ?? 0)
			const gammaCorrected = Math.pow(luminance / 255, gamma)
			let normalized = ((gammaCorrected - 0.5) * contrast + 0.5) * 255
			if (normalized < threshold) normalized = 0
			normalized = Math.max(0, Math.min(255, normalized))
			if (invert) normalized = 255 - normalized
			const index = Math.min(
				characters.length - 1,
				Math.floor((normalized / 255) * characters.length),
			)
			line += characters[index] ?? " "
		}
		lines.push(line)
	}

	const output = lines.join("\n")
	asciiCache.set(key, output)
	return output
}

export function AsciiImage({
	src,
	alt,
	columns = { mobile: 48, desktop: 84 },
	characters = " .:-=+*#%@",
	contrast = 1.12,
	gamma = 0.78,
	threshold = 8,
	invert = false,
}: AsciiImageProps) {
	const frameRef = useRef<HTMLElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)
	const animationFrameRef = useRef<number | null>(null)
	const [ascii, setAscii] = useState("")
	const [loadState, setLoadState] = useState<LoadState>("loading")
	const [showOriginal, setShowOriginal] = useState(false)

	const setReveal = useCallback((radius: string, x = 50, y = 50) => {
		if (animationFrameRef.current !== null) {
			cancelAnimationFrame(animationFrameRef.current)
		}
		animationFrameRef.current = requestAnimationFrame(() => {
			const frame = frameRef.current
			if (!frame) return
			frame.style.setProperty("--ascii-reveal-radius", radius)
			frame.style.setProperty("--ascii-reveal-x", `${x}%`)
			frame.style.setProperty("--ascii-reveal-y", `${y}%`)
		})
	}, [])

	const transform = useCallback(() => {
		const image = imageRef.current
		if (!image?.complete || image.naturalWidth === 0) return

		try {
			const width = window.matchMedia("(min-width: 768px)").matches
				? columns.desktop
				: columns.mobile
			setAscii(imageToAscii(image, width, characters, contrast, gamma, threshold, invert))
			setLoadState("ready")
		} catch {
			setLoadState("error")
		}
	}, [characters, columns.desktop, columns.mobile, contrast, gamma, invert, threshold])

	useEffect(() => {
		const media = window.matchMedia("(min-width: 768px)")
		media.addEventListener("change", transform)
		return () => media.removeEventListener("change", transform)
	}, [transform])

	useEffect(() => {
		transform()
	}, [transform])

	useEffect(
		() => () => {
			if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current)
		},
		[],
	)

	function toggleView() {
		setShowOriginal((current) => {
			setReveal(current ? "0px" : "150%")
			return !current
		})
	}

	return (
		<figure className="ascii-figure">
			<div className="ascii-frame-shell">
				<article
					ref={frameRef}
					className="ascii-frame"
					onPointerMove={(event) => {
						if (event.pointerType === "touch" || showOriginal) return
						const bounds = event.currentTarget.getBoundingClientRect()
						const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))
						const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100))
						setReveal("clamp(5rem, 22cqw, 8rem)", x, y)
					}}
					onPointerLeave={() => setReveal(showOriginal ? "150%" : "0px")}
				>
					<pre aria-hidden="true" className="ascii-output">
						{ascii || "INITIALIZING SOURCE..."}
					</pre>
					<div className="ascii-original" aria-hidden="true">
						<img
							ref={imageRef}
							src={src}
							alt=""
							width="1024"
							height="1536"
							decoding="async"
							fetchPriority="high"
							onLoad={transform}
							onError={() => setLoadState("error")}
						/>
					</div>
					{loadState === "error" && (
						<div className="ascii-error" role="img" aria-label={alt}>
							<span>IMAGE SIGNAL UNAVAILABLE</span>
							<span>ASCII FALLBACK ACTIVE</span>
						</div>
					)}
					<span className="sr-only">{alt}</span>
				</article>
				<button
					type="button"
					className="ascii-toggle"
					onClick={toggleView}
					aria-pressed={showOriginal}
					disabled={loadState === "error"}
				>
					<span>{showOriginal ? "Show ASCII" : "Show original"}</span>
					<span aria-hidden="true">[{showOriginal ? "01" : "00"}]</span>
				</button>
			</div>
		</figure>
	)
}
