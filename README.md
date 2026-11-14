# eldotz

A responsive React 19 + Vite landing page with an original SVG identity, animated globe, accessible dialogs, unbranded solution demos, and an email-draft contact form. Production builds pre-render the full page to HTML, then hydrate it for interaction. No server runtime or animation library required.

## Run

Requires Node.js 20.19+ or 22.12+. From `eldotz/`:

```sh
cd landing-page
npm ci
npm run dev
```

## Production build

```sh
cp .env.example .env.production.local
# Edit .env.production.local: set SITE_URL to your verified HTTPS origin.
npm run build
npm run preview
```

The verified canonical origin is `https://eldotz.com`. `SITE_URL` accepts an HTTPS origin only, with no subpath, credentials, query, or fragment.

- **Ordinary production builds:** default to `https://eldotz.com` when `SITE_URL` is missing or blank. A valid explicit `SITE_URL` can override it. The build rejects blocking production robots metadata.
- **Vercel Preview:** always `noindex`, even if it inherits a production `SITE_URL`.
- **Local staging builds:** use `VERCEL_ENV=preview npm run build` to generate a deliberate `noindex` preview without a canonical or sitemap.

The dev server also sends `X-Robots-Tag: noindex, nofollow`. Domain changes require a rebuild.

Deploy `dist/` to an HTTPS static host. Build command: `npm run build`. Output: `dist`. No Node.js server is needed after building. `vercel.json` declares the build/output, clean URLs, and canonical-host/index redirects. The `www` domain must also be attached to the hosting project with a valid certificate; redirects alone cannot fix TLS.

## SEO included

- Pre-rendered headings, service copy, FAQs, links, and contact details in the initial HTML; content is available without JavaScript.
- One descriptive title, one meta description, service-specific headings, semantic sections, English language metadata, and accessible navigation.
- Canonical homepage URL, absolute Open Graph/social image URLs, and complete Open Graph and Twitter card metadata when `SITE_URL` is set.
- Generated `robots.txt` and a sitemap covering the homepage, notes index, and five field guides. Section fragments are deliberately excluded.
- Connected Organization, WebSite, WebPage, Service, and FAQPage JSON-LD. FAQ markup and visible answers share one data source. No invented addresses, clients, ratings, or social profiles. FAQ markup does not guarantee search rich results.
- Self-hosted variable WOFF2 fonts with preload and `font-display: swap`; no external font requests. Original font licenses are in `public/fonts/`.
- SVG favicon, 180px touch icon, 512px organization mark, and a 1200×630 social preview.
- Hydrated React interactions, reduced-motion support, and genuine 404 responses in Vite preview rather than landing-page fallbacks for unknown URLs.

### Deployment checklist

1. Deploy the latest code to Vercel **Production**, not Preview. Confirm the canonical origin is `https://eldotz.com`.
2. Configure permanent redirects from HTTP and alternate hostnames to that canonical HTTPS origin on your host. Redirect `/index.html` to `/` if your host exposes both.
3. Do not configure a catch-all SPA rewrite. Return actual HTTP 404 responses for unknown paths.
4. Enable host compression; cache fingerprinted `/assets/` files long-term and revalidate HTML. Configure appropriate security headers for your host.
5. Run `npm run seo:live` after deployment. Check live HTML and response headers, canonical URLs, `/robots.txt`, `/sitemap.xml`, redirects, and the `www` certificate.
6. Verify site ownership in your search console and submit the sitemap. External verification, indexing, monitoring, and ranking cannot be completed from this repository alone.

## Browser tests

```sh
npx playwright install chromium
npm run test:seo-policy
npm test
npm run seo:live
```

Tests build and serve the actual production output on port 4173. They cover six viewport sizes, navigation, dialogs, form validation, email drafts, animations, reduced motion, no-JavaScript content, hydration, metadata, structured data, self-hosted assets, and 404 responses.

To simulate the hosting modes, run `VERCEL_ENV=production npm test` and `VERCEL_ENV=preview SITE_URL=https://eldotz.com npm test`. The policy tests also check blank env values and invalid canonical URLs. `seo:live` is a separate network check, not part of offline browser tests; it exits unsuccessfully while live blockers remain.

See [the live indexing audit](docs/SEO-AUDIT.md) for the confirmed deployment blockers and Search Console/DNS actions that require account access.

## Contact and content

- Confirm `hello@eldotz.com` in `src/components/ContactForm.jsx` is monitored. The form opens an email draft; it does **not** send to a server or claim a message was sent. A native email action is provided when JavaScript is disabled. For direct submission, use a server-side email endpoint with validation and abuse protection. Never expose email API secrets in client code.
- Solution demos are unbranded illustrations, not company websites or commissioned client projects. Their mockup metrics are not real client results.
- Review business copy and the privacy notice before launch. This website does not include analytics or advertising trackers.

## Files

```text
src/
├── App.jsx                      # Page composition and shared state
├── main.jsx                     # Client rendering / hydration
├── entry-server.jsx             # Build-time React rendering
├── components/
│   ├── ButtonArrow.jsx          # Animated CTA arrow
│   ├── ContactForm.jsx          # Email-draft form and business inbox
│   ├── IconLibrary.jsx          # Shared SVG symbols
│   ├── Orb.jsx                  # Animated wireframe globe
│   ├── dialogs/Dialogs.jsx      # Project and privacy dialogs
│   └── layout/                  # Header and footer
├── sections/                    # One component per page section
├── data/                        # Shared FAQs and concept details
├── hooks/usePageEffects.js      # Scroll reveals and linked motion
└── styles/styles.css            # Responsive styles and design tokens
scripts/prerender.mjs            # Static rendering, canonical metadata, schema, sitemap
public/
├── brand/                       # Logo, favicon, touch and organization icons
├── fonts/                       # Self-hosted fonts and licenses
└── images/                      # Social preview
tests/                           # Production browser and SEO tests
```
