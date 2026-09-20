interface SectionIndexProps {
	number: string
}

export function SectionIndex({ number }: SectionIndexProps) {
	return (
		<div className="section-index" aria-hidden="true">
			<span>{number}</span>
		</div>
	)
}
