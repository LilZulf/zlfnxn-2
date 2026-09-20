You are a senior frontend engineer and creative web developer specializing in experimental interactive portfolios.

Your task is to completely redesign and rebuild the current Vite + React project into a highly interactive personal portfolio website.

## Primary Design Reference

Use the following website as the main visual and interaction reference:

https://www.contentarchitecture.dev/

Study the live website carefully before implementing anything.

The goal is NOT to copy its branding, content, assets, or exact visual identity. Instead, reproduce its overall design philosophy, interaction density, typography behavior, motion language, experimental layout, scrolling experience, hover behavior, text animations, transitions, and playful developer-oriented presentation.

The finished website should feel like a hacker / terminal-inspired personal reinterpretation of the reference.

---

# IMPORTANT PROJECT CONTEXT

The project already exists and is built using:

* Vite
* React

There is currently a default/demo page inside the project.

IGNORE the existing demo design completely.

It has absolutely no influence on the new design.

Treat the application as if the frontend design is being created from scratch.

Before starting implementation, read:

`docs/DESIGN.md`

Use `docs/DESIGN.md` as additional context for the general portfolio direction, content strategy, identity, layout intentions, and other design decisions.

If this prompt conflicts with the existing demo application, this prompt and `docs/DESIGN.md` take priority.

Do not unnecessarily replace the existing Vite configuration if it already works correctly.

---

# PORTFOLIO IDENTITY

This is a personal portfolio for:

**Ahmad Zulfan Najib**

Online / developer identity:

**lilzulf**

The website should communicate:

* Software Engineer
* Backend Engineer
* Fullstack Developer
* System Integration Engineer
* Developer interested in systems, distributed architecture, automation, AI, and infrastructure

The visual identity should feel like:

**experimental developer portfolio × hacker terminal × retro computing × modern interactive editorial website**

Avoid stereotypical "Matrix hacker" visuals.

Do NOT make the website look like a cheap hacking template.

It should remain:

* clean
* sophisticated
* technical
* minimal
* experimental
* professional
* modern

Think more:

"high-end creative developer portfolio"

and less:

"cybersecurity landing page template".

---

# COLOR DIRECTION

Replace the visual color language of the reference with a hacker-green inspired palette.

Primary colors should revolve around:

* near-black
* black
* dark charcoal
* terminal green
* phosphor green
* subtle muted green
* off-white where needed for contrast

Examples of the intended feeling:

`#050805`
`#080b08`
`#0d120d`
`#39ff14`
`#00ff66`
`#8aff80`

These are references only.

Create proper CSS variables / design tokens rather than scattering hard-coded colors throughout the application.

The green should feel like a monochrome terminal/phosphor display rather than a neon gaming website.

---

# TYPOGRAPHY

Typography is extremely important.

Use a combination of:

* expressive large display typography
* monospace typography
* terminal/system-like text
* compact metadata
* numbered labels
* oversized headings

Try to reproduce the typography hierarchy and experimental text placement philosophy from the reference website.

Text itself should become part of the visual composition.

Use typography to create rhythm rather than relying on cards everywhere.

Avoid excessive rounded cards.

Avoid generic SaaS design patterns.

---

# INTERACTION PHILOSOPHY

The reference website is highly interactive.

The new portfolio must preserve this characteristic.

Do not build a static portfolio.

Interactions should exist throughout the page.

Study the reference website and recreate comparable interaction patterns where appropriate, including:

* smooth scrolling behavior
* hover transformations
* animated typography
* text distortion / movement
* marquee behavior
* scrolling text
* progressive reveals
* cursor-aware interactions
* animated separators
* section transitions
* responsive motion
* subtle parallax
* interactive navigation
* hover state changes
* motion triggered by scroll position
* animated numbering
* experimental text placement

Interactions should feel intentional rather than decorative.

Animations must remain smooth and performant.

Prefer transforms and opacity for animation.

Respect:

`prefers-reduced-motion`

when appropriate.

---

# CIRCULAR / ORBITING TEXT EFFECT

One important interaction from the reference is the circular / rotating text treatment.

Create a similar effect for this portfolio.

Instead of copying the original words, dynamically combine personal identity information.

Use random combinations of:

* AHMAD ZULFAN NAJIB
* ZULFAN
* lilzulf
* SOFTWARE ENGINEER
* BACKEND ENGINEER
* FULLSTACK
* SYSTEM INTEGRATION
* JAVA
* SPRING BOOT
* NODE.JS
* REACT
* NEXT.JS
* LARAVEL
* PYTHON
* GO
* KAFKA
* POSTGRESQL
* REDIS
* DOCKER
* MICROSERVICES
* EVENT DRIVEN
* REAL TIME SYSTEMS
* DISTRIBUTED SYSTEMS
* API
* MIDDLEWARE
* AI
* AUTOMATION

Randomly compose these words to produce circular strings.

Example concept:

`lilzulf • JAVA • SYSTEM INTEGRATION • AHMAD ZULFAN NAJIB • KAFKA •`

Another generated instance could be:

`BACKEND ENGINEER • ZULFAN • SPRING BOOT • POSTGRESQL • REAL TIME SYSTEMS •`

The combination may change on refresh or at controlled intervals.

However:

DO NOT cause React hydration issues or layout shifts.

The circular typography should visually resemble the reference interaction while maintaining this portfolio's identity.

It may:

* rotate slowly
* react to hover
* react to cursor position
* change rotation direction
* accelerate slightly during interaction

Keep the effect elegant.

---

# ASCII IMAGE TRANSFORMER

This is a major feature.

Recreate the **image-to-ASCII transformer interaction** found on the reference website.

Build it as an actual functional component, NOT a pre-rendered fake effect.

Create something similar to:

`<AsciiImage />`

The component should:

1. Accept an image source.
2. Load the image into an offscreen Canvas.
3. Downsample the image into a configurable grid.
4. Calculate luminance / brightness for each sampled pixel.
5. Convert brightness values into ASCII characters.
6. Render the resulting image as ASCII text.
7. Maintain the approximate aspect ratio of the source image.

Possible character ramp:

`@%#*+=-:. `

or create a more visually suitable custom ramp.

The component should support configurable properties such as:

* resolution
* character set
* font size
* contrast
* brightness threshold
* inversion
* responsive resolution

Create smooth transitions between:

* original image
* ASCII representation

Possible interaction:

Default:
ASCII portrait.

On hover:
partially reveal the original image.

Or:

Cursor movement determines how much of the photograph becomes ASCII.

Another possible interaction:

Image → ASCII → image.

Study the reference website first and reproduce its interaction as closely as reasonably possible.

The image transformer must remain performant.

Avoid recalculating the entire Canvas every animation frame unless absolutely necessary.

Cache calculated ASCII output where possible.

---

# HERO SECTION

The hero should immediately communicate personality.

Possible composition:

Large identity typography:

**AHMAD ZULFAN NAJIB**

and/or:

**lilzulf**

Supporting description:

Software Engineer focused on backend systems, distributed architecture, integration, real-time data, and building reliable software.

Do not necessarily use this exact sentence.

Use `docs/DESIGN.md` to determine the best final copy.

The hero should include strong interactive typography inspired by the reference.

Potential metadata:

`JAVA / SPRING BOOT`
`KAFKA`
`POSTGRESQL`
`NODE.JS`
`SYSTEM INTEGRATION`
`INDONESIA`

Use developer/system-status aesthetics where appropriate.

Example visual language:

`STATUS: AVAILABLE`
`LOCATION: INDONESIA`
`STACK: BACKEND / DISTRIBUTED SYSTEMS`
`BUILD: 2026`

Use these selectively.

Do not turn the entire website into a fake terminal window.

---

# PORTFOLIO STRUCTURE

Create sections appropriate for a personal developer portfolio.

Potential structure:

01 / INTRO

02 / ABOUT

03 / EXPERIENCE

04 / SELECTED WORK

05 / ENGINEERING STACK

06 / EXPERIMENTS

07 / CONTACT

Do not blindly follow this structure if `docs/DESIGN.md` defines something more appropriate.

Maintain the numbered editorial style found in the reference.

---

# EXPERIENCE

Create an expressive timeline / technical experience section.

Important experience may include work involving:

* Java
* Spring Boot
* Apache Camel
* Kafka
* PostgreSQL
* distributed data processing
* airline middleware integration
* Amadeus reservation systems
* real-time data processing
* backend services

Do NOT fabricate confidential company data or project metrics.

Prefer high-level professional descriptions.

---

# SELECTED WORK

Projects should not look like standard Bootstrap portfolio cards.

Use experimental layouts inspired by the reference.

Potential project presentation:

`001 PROJECT NAME`

Category metadata.

Large title.

Short technical summary.

Stack.

Interactive image / ASCII preview.

Hover behavior.

Expandable technical information.

Some projects may have:

* live URL
* GitHub URL
* case study
* technical details

Only display links that actually exist in project data.

Create reusable project data structures rather than hardcoding every project directly inside JSX.

---

# ENGINEERING STACK

Avoid a generic grid of technology logos.

Instead create an interactive technical index.

Example categories:

BACKEND

Java
Spring Boot
Node.js
Laravel
Python
Go

DATA

PostgreSQL
MySQL
Redis
Parquet

MESSAGING

Kafka
ActiveMQ
MQTT

INFRASTRUCTURE

Docker
Nginx
Linux
Cloudflare

FRONTEND

React
Next.js
Vite

ARCHITECTURE

Microservices
Event-Driven Architecture
Real-Time Data Processing
System Integration
REST APIs
Middleware

Use the skills as both content and visual material.

Some skill names can participate in:

* marquee animations
* circular text
* hover effects
* section transitions
* background typography

---

# ATOMIC DESIGN ARCHITECTURE

The React project MUST follow Atomic Design principles.

Do NOT build the entire website inside `App.jsx`.

Create a clean scalable architecture.

Suggested structure:

```text
src/
├── assets/
│
├── components/
│   ├── atoms/
│   │   ├── Text/
│   │   ├── Label/
│   │   ├── Divider/
│   │   ├── Icon/
│   │   ├── CursorDot/
│   │   └── AsciiCharacter/
│   │
│   ├── molecules/
│   │   ├── NavItem/
│   │   ├── SkillItem/
│   │   ├── ProjectMeta/
│   │   ├── CircularText/
│   │   ├── MarqueeText/
│   │   └── AsciiImage/
│   │
│   ├── organisms/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── AboutSection/
│   │   ├── ExperienceSection/
│   │   ├── ProjectSection/
│   │   ├── SkillsSection/
│   │   ├── PlaygroundSection/
│   │   └── Footer/
│   │
│   └── templates/
│       └── PortfolioLayout/
│
├── hooks/
│   ├── useMousePosition.js
│   ├── useScrollProgress.js
│   └── useReducedMotion.js
│
├── data/
│   ├── projects.js
│   ├── skills.js
│   └── experience.js
│
├── utils/
│   ├── ascii.js
│   ├── randomText.js
│   └── motion.js
│
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   ├── typography.css
│   └── animations.css
│
├── App.jsx
└── main.jsx
```

This structure is a guideline.

Adjust it if the existing repository already has a better compatible structure.

The important requirement is:

**Atomic architecture must remain clear and consistent.**

---

# DATA SEPARATION

Portfolio content should be separated from presentation components.

For example:

`src/data/projects.js`

```js
export const projects = [
  {
    id: "...",
    title: "...",
    description: "...",
    stack: [],
    image: "...",
    url: "...",
  },
]
```

Do the same for:

* experience
* skills
* social links

This should make future portfolio updates easy.

---

# MOTION IMPLEMENTATION

Use CSS animations and browser APIs when they are sufficient.

If the project already includes an animation library, reuse it when appropriate.

If an external motion library is required, prefer a lightweight and well-maintained solution.

Possible options:

* Motion / Framer Motion
* GSAP only when the animation genuinely requires it

Do NOT install large dependencies for effects that can easily be implemented using CSS.

Avoid dependency bloat.

---

# RESPONSIVENESS

The reference experience is visually experimental, but the implementation must still work properly on:

* desktop
* laptop
* tablet
* mobile

Do not simply scale the desktop version down.

Adapt interactions where necessary.

For example:

Desktop:
cursor-driven interaction.

Mobile:
touch-driven or scroll-driven equivalent.

Circular text must remain readable.

ASCII images should dynamically reduce resolution on smaller screens to avoid excessive DOM/text rendering.

Large typography should use:

`clamp()`

where appropriate.

---

# PERFORMANCE

This portfolio should feel lightweight despite having many interactions.

Requirements:

* avoid unnecessary React re-renders
* lazy load images when appropriate
* avoid excessive state updates on `mousemove`
* use `requestAnimationFrame` for cursor animation when needed
* prefer transform/opacity animation
* clean up event listeners
* clean up animation frames
* memoize expensive ASCII calculations
* avoid huge DOM trees generated by ASCII rendering
* avoid layout thrashing
* avoid expensive scroll handlers
* use IntersectionObserver when appropriate

Target a smooth 60 FPS experience on modern desktop hardware.

---

# ACCESSIBILITY

Experimental design must not destroy usability.

Ensure:

* semantic HTML
* keyboard navigation
* visible focus states
* reasonable contrast
* buttons are actual buttons
* links are actual links
* decorative effects use appropriate `aria-hidden`
* images use alt text
* reduced-motion behavior exists

---

# NAVIGATION

Create minimalist navigation inspired by the reference.

Navigation could contain:

`INDEX`
`WORK`
`ABOUT`
`STACK`
`CONTACT`

or equivalent wording based on `docs/DESIGN.md`.

Navigation should interact smoothly with page sections.

Use native anchor behavior or a controlled smooth-scroll implementation.

Ensure direct URL hashes still function.

---

# CUSTOM CURSOR

If appropriate after studying the reference, implement a subtle custom cursor.

It may:

* expand over links
* display short action labels
* react to interactive project previews
* influence nearby typography

But do not make the cursor distracting.

Disable the custom cursor on touch devices.

---

# MICRO-INTERACTIONS

Pay attention to details.

Examples:

When hovering a project title:

`PROJECT NAME → PROJECT NAME ↗`

When hovering navigation:

characters may slightly shift or reveal an index.

Section numbers may animate.

Separators may stretch.

ASCII previews may resolve into photographs.

Skill names may move horizontally based on cursor proximity.

Circular text may increase rotation speed.

These effects should build a coherent interaction language.

---

# FOOTER

Create a memorable footer rather than a generic copyright block.

Possible elements:

`AHMAD ZULFAN NAJIB`

`lilzulf`

Current year.

Developer status.

Contact.

GitHub.

LinkedIn.

Instagram.

A large animated final statement may be used.

Example concept:

`LET'S BUILD SOMETHING THAT SHOULD EXIST.`

Do not necessarily use this exact copy.

Use `docs/DESIGN.md` for the final writing direction.

---

# VISUAL DETAILS

Use:

* thin grid lines
* indexed numbers
* metadata labels
* oversized typography
* structured whitespace
* ASCII textures
* monospace symbols
* terminal indicators
* technical data patterns
* subtle noise/dithering if it improves the design
* occasional brackets
* coordinates / system metadata

Possible decorative strings:

`[01]`
`{ BACKEND }`
`// SYSTEM`
`:: PORTFOLIO`
`>_`
`[ ACTIVE ]`

Use them sparingly.

Do not make every piece of text look like source code.

---

# DESIGN RULES

DO:

* study the reference deeply
* recreate its level of interaction
* reinterpret it through a hacker-green developer identity
* use strong typography
* create unusual layouts
* make interactions meaningful
* make the portfolio memorable
* keep components reusable
* keep code maintainable

DO NOT:

* copy the website's text
* copy proprietary images/assets
* clone the reference pixel-for-pixel
* build a generic portfolio template
* use glassmorphism
* use excessive gradients
* use excessive rounded cards
* use generic SaaS cards
* use glowing neon everywhere
* use fake terminal windows for every section
* create unnecessary animation that hurts usability
* put the entire application inside one component

---

# IMPLEMENTATION WORKFLOW

Before modifying code:

1. Inspect the current repository.
2. Read `docs/DESIGN.md`.
3. Inspect `package.json`.
4. Understand the existing Vite setup.
5. Inspect the current application structure.
6. Study https://www.contentarchitecture.dev/ carefully.
7. Identify its major visual patterns.
8. Identify its interactive patterns.
9. Identify typography behavior.
10. Identify scrolling/motion behavior.

Then create the portfolio architecture.

After implementation:

1. Run the project.
2. Check for console errors.
3. Check responsive layouts.
4. Test interactive effects.
5. Test navigation.
6. Test the ASCII transformer.
7. Test mobile behavior.
8. Test reduced-motion behavior.
9. Run linting if configured.
10. Run a production build.

The application must successfully pass:

```bash
npm run build
```

Fix all build errors before considering the task complete.

---

# IMPLEMENTATION PRIORITY

Priority order:

1. Visual identity
2. Layout fidelity to the reference's design philosophy
3. Interaction fidelity
4. Typography
5. ASCII transformer
6. Circular text interaction
7. Responsive behavior
8. Performance
9. Accessibility
10. Code organization

Do not sacrifice visual quality by creating a generic implementation merely to finish quickly.

---

# EXPECTED RESULT

The final result should feel like:

**Content Architecture's experimental interaction philosophy**

combined with:

**retro terminal / hacker-green visual language**

combined with:

**Ahmad Zulfan Najib / lilzulf's software engineering identity**

The visitor should immediately feel that this is the portfolio of someone who works with:

systems, backend engineering, real-time data, distributed architecture, infrastructure, and experimental technology.

It should feel technically sophisticated before the visitor even starts reading the content.

Most importantly:

**Do not just imitate the reference visually. Understand why its interactions work, then rebuild that interaction language into an original personal portfolio.**
