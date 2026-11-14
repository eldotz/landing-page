# Eldotz live indexing audit

Checked: 2026-11-14. Public HTTPS, HTTP, DNS, crawler-user-agent, and registry checks. These findings describe the deployment observed at audit time, not changes already deployed.

## Confirmed blockers and gaps

| Priority | Finding                                       | Evidence                                                                         | Required action                                                                                                                                                                              |
| -------- | --------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Critical | Live homepage explicitly opts out of indexing | `https://eldotz.com/` returns `<meta name="robots" content="noindex, nofollow">` | Deploy an indexable Production build. `robots.txt` allowing crawling does not override `noindex`.                                                                                            |
| High     | Missing sitemap                               | `https://eldotz.com/sitemap.xml` returns HTTP 404                                | Deploy generated sitemap and its `robots.txt` declaration.                                                                                                                                   |
| High     | Missing canonical                             | Homepage has no canonical link or `og:url`                                       | Publish `https://eldotz.com/` as canonical.                                                                                                                                                  |
| High     | Broken www HTTPS alias                        | `https://www.eldotz.com/` fails certificate hostname validation                  | Add `www.eldotz.com` to the correct hosting project, complete its DNS/certificate setup, then redirect it to the apex domain. A repository redirect cannot repair a missing TLS certificate. |
| Medium   | Duplicate homepage URL                        | `/index.html` returns 200, not a redirect                                        | Permanently redirect to `/`.                                                                                                                                                                 |
| Medium   | New local blog is not live                    | `/blog/` returns 404; the local branch contains a newer blog commit              | Deploy the latest reviewed code, not just an older landing-page artifact.                                                                                                                    |
| Context  | Very recent domain registration               | Registry RDAP reports registration on 2026-11-12                                 | Discovery and indexing can take time after blockers are fixed. Domain age is not evidence of a penalty.                                                                                      |

## Checks that passed

- Apex HTTPS homepage responds with HTTP 200 and valid TLS.
- HTTP apex permanently redirects to HTTPS.
- Unknown homepage paths return genuine HTTP 404 responses.
- `robots.txt` permits crawling.
- Homepage text is present in the initial HTML; it is not an empty client-only app.
- A Googlebot user-agent request receives the same 200 response and the same blocking `noindex` directive, not a separate bot challenge.
- First-party fonts, organization mark, and social image are available.

## Repository fixes prepared

- Ordinary production builds default to the now-verified canonical origin `https://eldotz.com` if `SITE_URL` is missing or blank; a missing variable no longer silently publishes a noindex homepage.
- Vercel Preview stays `noindex` even if it inherits a production `SITE_URL` variable.
- A production build refuses to emit a page with a blocking robots meta tag.
- Every published homepage/blog URL receives its own canonical, absolute social images, and appropriate structured data.
- Homepage service entities and organization logo are restored in structured data.
- The sitemap includes the homepage, notes index, and all five field guides. Explicit previews do not emit production sitemap URLs.
- Clean blog URLs now map to real generated HTML files. The former directory-only output returned 404 for the existing no-trailing-slash internal links in production preview.
- Vercel configuration adds canonical-host/index redirects and consistent clean URL behavior without a catch-all rewrite.
- `npm run seo:live` checks the public deployment independently of local Lighthouse scores.

These files must be deployed before the live findings can change. No deployment, DNS update, or search-console action is implied by editing the repository.

## Deployment and account actions

1. Review and deploy this branch to **Vercel Production**. Use project root `landing-page` only if the repository contains that parent folder; this repository already has `package.json` at its root, so use the repository root. Build: `npm run build`; output: `dist`.
2. Check for incorrectly configured `SITE_URL` values. Production should use `https://eldotz.com`. Do not deploy a stale local `dist/` directory or a Preview build as Production.
3. Add `www.eldotz.com` under the same project's domains. Use the DNS instructions shown for that project and wait for its certificate to be valid. Then ensure the alias redirects to `https://eldotz.com`.
4. Run `npm run seo:live` after deployment. Confirm indexable HTML, canonical URLs, sitemap, redirects, TLS, and 404 responses.
5. Verify an `eldotz.com` Domain property in Search Console using its exact provided DNS verification record. The verification value cannot be invented or generated by this repository.
6. Inspect `https://eldotz.com/`, run the live URL test, and request indexing after it reports the URL can be indexed. Submit `https://eldotz.com/sitemap.xml` and inspect its processing status.
7. Inspect a blog article as well. Monitor Page indexing and branded-query impressions. Review Manual actions and Security issues; public HTTP checks cannot rule those out.

## Visibility beyond technical indexing

Once pages are indexable, strengthen real brand signals: a complete factual company description, verified contact details, consistent company naming on genuine profiles, and links from legitimate partners or relevant organizations. Publish useful, original service-related content. Add location information only if accurate; do not invent offices, reviews, customers, authorship credentials, or results.

Do not buy spam links, mass-submit to low-quality directories, create fake reviews, or generate large volumes of thin pages. Those do not solve the current `noindex` blocker.

## Limits of this audit

Google's public search interface presented an automated-traffic challenge during this check. Exact search position and index coverage were therefore not independently verified. Search Console access is required to distinguish exclusion, discovery, crawling, canonical selection, and low ranking reliably. `site:` searches are incomplete and are not a replacement for URL Inspection.

A Lighthouse SEO score measures a limited set of technical checks. It does not prove that the live deployment is indexable, that a URL is indexed, or that a brand will rank in the top ten. Re-crawling/indexing may take days or longer after correction; no ranking or indexing deadline is guaranteed.
