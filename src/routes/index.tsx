import { createFileRoute } from '@tanstack/react-router'
import { PortfolioPage } from '#/components/portfolio/templates/PortfolioPage'
import { getPortfolioContent } from '#/lib/portfolio-api'

const siteUrl = 'https://lilzulf.my.id/'
const profileImageUrl = new URL('/headshot-on-white.jpg', siteUrl).href

export const Route = createFileRoute('/')({
  loader: () => getPortfolioContent(new AbortController().signal),
  head: ({ loaderData }) => {
    const site = loaderData?.site
    const title = site?.seoTitle || 'Ahmad Zulfan Najib | Software Engineer'
    const description =
      site?.seoDescription ||
      'Portfolio of Ahmad Zulfan Najib, a software engineer focused on backend systems and integrations.'
    const name = [site?.heroNameFirst, site?.heroNameSecond]
      .filter(Boolean)
      .join(' ') || 'Ahmad Zulfan Najib'
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name,
      url: siteUrl,
      image: profileImageUrl,
      jobTitle: 'Software Engineer',
      description,
      ...(site?.email ? { email: site.email } : {}),
    }

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'profile' },
        { property: 'og:url', content: siteUrl },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: profileImageUrl },
        { property: 'og:image:alt', content: `Portrait of ${name}` },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: profileImageUrl },
      ],
      links: [{ rel: 'canonical', href: siteUrl }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        },
      ],
    }
  },
  component: function IndexRoute() {
    return <PortfolioPage initialContent={Route.useLoaderData()} />
  },
})
