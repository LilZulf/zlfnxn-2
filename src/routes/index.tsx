import { createFileRoute } from '@tanstack/react-router'
import { PortfolioPage } from '#/components/portfolio/templates/PortfolioPage'

export const Route = createFileRoute('/')({
  component: PortfolioPage,
})
