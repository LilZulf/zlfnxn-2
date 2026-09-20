import { useEffect } from "react"

export function RevealController() {
	useEffect(() => {
		const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
		document.documentElement.dataset.revealReady = "true"
		const hashTarget = window.location.hash
			? document.querySelector(window.location.hash)
			: null

		if (!("IntersectionObserver" in window)) {
			for (const node of nodes) node.dataset.visible = "true"
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					;(entry.target as HTMLElement).dataset.visible = "true"
					observer.unobserve(entry.target)
				}
			},
			{ rootMargin: "0px 0px -8%", threshold: 0.08 },
		)

		for (const node of nodes) {
			if (node.closest("#intro") || hashTarget?.contains(node)) {
				node.dataset.visible = "true"
			} else {
				observer.observe(node)
			}
		}
		const hashFrame = hashTarget
			? window.requestAnimationFrame(() => hashTarget.scrollIntoView({ block: "start" }))
			: null
		return () => {
			observer.disconnect()
			if (hashFrame !== null) window.cancelAnimationFrame(hashFrame)
			delete document.documentElement.dataset.revealReady
		}
	}, [])

	return null
}
