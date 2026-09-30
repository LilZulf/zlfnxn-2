Welcome to your new TanStack Start app!

# Getting Started

To run this application:

```bash
npm install
npm run dev
```

# Building For Production

To build this application for production:

```bash
npm run build
```

### Static build for cPanel

```bash
npm run build:static
```

Upload **the contents** of `dist-static/` to your domain's `public_html/`
directory (or the document root of a subdomain). The generated `index.html`
contains the rendered portfolio, and its JavaScript, CSS, fonts, and images are
included in the same output folder. No Node.js process is needed on cPanel.

Asset URLs start at `/`, so deploy this build at the root of a domain or
subdomain.

Portfolio content comes from `https://be.lilzulf.my.id/api/v1`. The build
fetches the published site settings, work items, stack groups, and posts and
prerenders them into `index.html`. The browser fetches them again when the page
opens, so newly published content can appear without rebuilding. To use a
different backend, set `VITE_CONTENT_API_URL` to its full `/api/v1` URL before
building.

The static HTML also includes the backend's SEO title and description, social
sharing metadata, and structured data. Rebuild and redeploy after changing SEO
fields or other content that search engines should see. The build includes
`robots.txt` and `sitemap.xml` for `https://lilzulf.my.id/`.

On the deployed Laravel backend, set `CONTENT_FRONTEND_ORIGIN` to
`https://lilzulf.my.id` so browsers may read the API. Set `APP_URL` to
`https://be.lilzulf.my.id` so uploaded image URLs use the public domain.
The web server serving `/storage/*` must also return
`Access-Control-Allow-Origin: https://lilzulf.my.id` for images used by the
ASCII transformer. API CORS settings alone may not affect those static files.
Bundled copies of the current portfolio images are used if the browser blocks
their remote versions; newly uploaded images need the server header.

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Remove `@tailwindcss/vite` and `tailwindcss` from `package.json`

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:


```bash
npm run lint
npm run format
npm run check
```


# Resume Example

A personal portfolio built with TanStack Start for static deployment.

## Features

- **Static Build**: Prerendered HTML and browser assets for shared hosting
- **Interactive UI**: Client-side animations and portfolio sections

## Project Structure

```
├── content/
│   ├── jobs/              # Work experience entries
│   └── education/         # Education entries
├── src/
│   ├── components/
│   │   └── ui/            # Shadcn UI components
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── hover-card.tsx
│   │       └── separator.tsx
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   └── routes/
│       ├── __root.tsx     # Root layout
│       └── index.tsx      # Resume page
└── public/
    └── headshot-on-white.jpg
```

## Adding Work Experience

Create a new markdown file in `content/jobs/` with the following frontmatter:

```markdown
---
jobTitle: Your Job Title
company: Company Name
location: City, State
startDate: 2024-01-01
endDate: 2024-12-31  # Optional - omit for current position
summary: Brief summary of your role
tags:
  - React
  - TypeScript
  - Web Development
---

Detailed description of your responsibilities and achievements...
```

## Adding Education

Create a new markdown file in `content/education/`:

```markdown
---
school: School Name
summary: Degree or Program Name
startDate: 2020-01-01
endDate: 2024-01-01
tags:
  - Relevant
  - Skills
---

Details about your education...
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build
```



## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')
  
  useEffect(() => {
    getServerTime().then(setTime)
  }, [])
  
  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).


# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.


# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
