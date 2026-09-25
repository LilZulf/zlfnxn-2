import { useCallback, useEffect, useRef, useState } from "react";

export interface AsciiImageProps {
	src: string;
	alt: string;
	columns?: { mobile: number; desktop: number };
	characters?: string;
	contrast?: number;
	gamma?: number;
	threshold?: number;
	invert?: boolean;
	background?: boolean;
}

type LoadState = "loading" | "ready" | "error";

const asciiCache = new Map<string, string>();

function cacheKey(
	src: string,
	columns: number,
	characters: string,
	contrast: number,
	gamma: number,
	threshold: number,
	invert: boolean,
) {
	return [src, columns, characters, contrast, gamma, threshold, invert].join(
		"|",
	);
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
	const key = cacheKey(
		image.currentSrc || image.src,
		columns,
		characters,
		contrast,
		gamma,
		threshold,
		invert,
	);
	const cached = asciiCache.get(key);
	if (cached) return cached;

	const rows = Math.max(
		1,
		Math.round(columns * (image.naturalHeight / image.naturalWidth) * 0.6),
	);
	const canvas = document.createElement("canvas");
	canvas.width = columns;
	canvas.height = rows;
	const context = canvas.getContext("2d", { willReadFrequently: true });
	if (!context) throw new Error("Canvas is unavailable");

	context.drawImage(image, 0, 0, columns, rows);
	const { data } = context.getImageData(0, 0, columns, rows);
	const lines: string[] = [];

	for (let y = 0; y < rows; y += 1) {
		let line = "";
		for (let x = 0; x < columns; x += 1) {
			const offset = (y * columns + x) * 4;
			const luminance =
				0.2126 * (data[offset] ?? 0) +
				0.7152 * (data[offset + 1] ?? 0) +
				0.0722 * (data[offset + 2] ?? 0);
			const gammaCorrected = (luminance / 255) ** gamma;
			let normalized = ((gammaCorrected - 0.5) * contrast + 0.5) * 255;
			if (normalized < threshold) normalized = 0;
			normalized = Math.max(0, Math.min(255, normalized));
			if (invert) normalized = 255 - normalized;
			const index = Math.min(
				characters.length - 1,
				Math.floor((normalized / 255) * characters.length),
			);
			line += characters[index] ?? " ";
		}
		lines.push(line);
	}

	const output = lines.join("\n");
	asciiCache.set(key, output);
	return output;
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
	background = false,
}: AsciiImageProps) {
	const imageRef = useRef<HTMLImageElement>(null);
	const [ascii, setAscii] = useState("");
	const [loadState, setLoadState] = useState<LoadState>("loading");

	const transform = useCallback(() => {
		const image = imageRef.current;
		if (!image?.complete || image.naturalWidth === 0) return;

		try {
			const width = window.matchMedia("(min-width: 768px)").matches
				? columns.desktop
				: columns.mobile;
			setAscii(
				imageToAscii(
					image,
					width,
					characters,
					contrast,
					gamma,
					threshold,
					invert,
				),
			);
			setLoadState("ready");
		} catch {
			setLoadState("error");
		}
	}, [
		characters,
		columns.desktop,
		columns.mobile,
		contrast,
		gamma,
		invert,
		threshold,
	]);

	useEffect(() => {
		const media = window.matchMedia("(min-width: 768px)");
		media.addEventListener("change", transform);
		return () => media.removeEventListener("change", transform);
	}, [transform]);

	useEffect(() => {
		transform();
	}, [transform]);

	if (background) {
		return (
			<div className="contact-ascii-earth" aria-hidden="true">
				<pre>{ascii}</pre>
				<img
					ref={imageRef}
					src={src}
					alt=""
					hidden
					decoding="async"
					onLoad={transform}
				/>
			</div>
		);
	}

	return (
		<figure className="ascii-figure">
			<div className="ascii-frame-shell">
				<article className="ascii-frame">
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
			</div>
		</figure>
	);
}
