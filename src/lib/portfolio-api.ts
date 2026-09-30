const apiBaseUrl = (
  import.meta.env.VITE_CONTENT_API_URL || 'https://be.lilzulf.my.id/api/v1'
).replace(/\/$/, '')

export interface SiteContent {
  seoTitle: string
  seoDescription: string
  wordmark: string
  navAbout: string
  navWork: string
  navStack: string
  navExperiments: string
  navContact: string
  skipLink: string
  heroNameFirst: string
  heroNameSecond: string
  heroSummary: string
  heroCta: string
  radarTerms: string[]
  aboutHeading: string
  aboutParagraphOne: string
  aboutParagraphTwo: string
  workHeading: string
  stackHeading: string
  marqueeItems: string[]
  experimentsHeading: string
  experimentsSummary: string
  contactEyebrow: string
  contactHeading: string
  contactHighlight: string
  contactIntro: string
  contactPanelLabel: string
  whatsappLabel: string
  whatsappUrl: string
  email: string
  status: string
  location: string
  contactImageUrl: string | null
  returnLabel: string
  footerName: string
  footerRole: string
}

export interface WorkItem {
  slug: string
  title: string
  summary: string
  stack: string[]
  icon: string
}

export interface StackGroup {
  category: string
  items: string
  icon: string
}

export interface Post {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  imageAlt: string
}

export interface PortfolioContent {
  site: SiteContent
  work: WorkItem[]
  stack: StackGroup[]
  posts: Post[]
}

async function getContent<T>(path: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(`${apiBaseUrl}/${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to load ${path}: HTTP ${response.status}`)
  }

  const payload: { data?: T } = await response.json()
  if (payload.data === undefined) {
    throw new Error(`Invalid response for ${path}`)
  }

  return payload.data
}

// The current backend sends localhost image URLs when APP_URL is unset in production.
// Keep published images usable until that deployment setting is corrected.
function resolveImageUrl(value: string | null): string | null {
  if (!value) return null

  const apiOrigin = new URL(apiBaseUrl).origin
  const imageUrl = new URL(value, apiOrigin)
  if (['localhost', '127.0.0.1'].includes(imageUrl.hostname)) {
    return `${apiOrigin}${imageUrl.pathname}${imageUrl.search}`
  }
  return imageUrl.href
}

export async function getPortfolioContent(
  signal: AbortSignal,
): Promise<PortfolioContent> {
  const [site, work, stack, posts] = await Promise.all([
    getContent<SiteContent>('site', signal),
    getContent<WorkItem[]>('work-items', signal),
    getContent<StackGroup[]>('stack-groups', signal),
    getContent<Post[]>('posts', signal),
  ])

  return {
    site: {
      ...site,
      contactImageUrl: resolveImageUrl(site.contactImageUrl),
    },
    work,
    stack,
    posts: posts.map((post) => ({
      ...post,
      imageUrl: resolveImageUrl(post.imageUrl),
    })),
  }
}
