import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

interface RevealProps<T extends ElementType> {
	as?: T
	children: ReactNode
	delay?: number
	className?: string
}

export function Reveal<T extends ElementType = "div">({
	as,
	children,
	delay = 0,
	className = "",
	...props
}: RevealProps<T> &
	Omit<ComponentPropsWithoutRef<T>, keyof RevealProps<T>>) {
	const Component = as ?? "div"

	return (
		<Component
			className={className}
			data-reveal=""
			style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
			{...props}
		>
			{children}
		</Component>
	)
}

