# eldotz

A responsive, single-page company website built with React 19, Vite, and CSS. Original SVG identity, animated Canvas 2D globe, scroll-linked motion, service enquiry selection, accessible native dialogs, FAQs, and an email-draft contact form. No animation library or stock imagery.

## Run

Requires Node.js 20.19+ or 22.12+. From the `eldotz/` directory:

```sh
cd landing-page
npm ci
npm run dev
```

## Build and deploy

```sh
npm run build
npm run preview
```

Deploy `dist/` to any static host, including Netlify, Vercel, Cloudflare Pages, or an HTTPS web server. Build command: `npm run build`. Output directory: `dist`.

## Browser tests

```sh
npx playwright install chromium
npm test
```

Tests cover six viewport sizes, runtime errors, mobile navigation, keyboard dismissal, concept dialogs, FAQs, service preselection, email draft generation, and reduced-motion behavior.

## Before launch

- Confirm `hello@eldotz.com` in `src/components/ContactForm.jsx` is a monitored inbox. The form opens the visitor’s email app; it does **not** submit to a server or claim a message was sent. For direct submission, connect an email API through a server-side endpoint with validation and abuse protection. Never put email API secrets in client code.
- Replace concept projects with approved client work when available. Current projects are explicitly labeled original concepts; no fabricated clients or results.
- Review company copy and privacy notice. Google Fonts is the only external asset service. Typography falls back to system sans-serif if unavailable.
- Add your final domain to canonical and social metadata in `index.html` when known. Configure HTTPS, cache headers, and security headers on your hosting platform.

## Files

```text
src/
├── App.jsx                      # Page composition and shared state
├── main.jsx                     # React entry point
├── components/
│   ├── ContactForm.jsx          # Email-draft form and business inbox
│   ├── IconLibrary.jsx          # Shared SVG symbols
│   ├── Orb.jsx                  # Animated wireframe globe
│   ├── dialogs/Dialogs.jsx      # Project and privacy dialogs
│   └── layout/
│       ├── Header.jsx
│       └── Footer.jsx
├── sections/                    # One component per page section
│   ├── Hero.jsx
│   ├── Intro.jsx
│   ├── Expertise.jsx
│   ├── Work.jsx
│   ├── Approach.jsx
│   ├── About.jsx
│   ├── FAQ.jsx
│   └── Contact.jsx
├── data/projects.js             # Concept project details
├── hooks/usePageEffects.js      # Scroll reveals and linked motion
└── styles/styles.css            # Responsive styles and design tokens
public/
├── brand/                       # Logo and favicon
└── images/                      # Social preview image
tests/                           # Playwright browser tests
```

Native dialogs provide focus containment and Escape dismissal. Motion respects `prefers-reduced-motion`. Enquiry details are not persisted or sent by this website.
