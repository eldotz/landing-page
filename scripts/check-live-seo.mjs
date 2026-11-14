import { PRODUCTION_ORIGIN } from "./site-origin.mjs";

const input = new URL(process.argv[2] || PRODUCTION_ORIGIN);
if (
  input.protocol !== "https:" ||
  input.username ||
  input.password ||
  input.pathname !== "/" ||
  input.search ||
  input.hash
) {
  throw new Error("Pass an HTTPS origin, not a page URL.");
}
const origin = input.origin;
let failures = 0;
function check(ok, message) {
  console.log(`${ok ? "PASS" : "FAIL"} ${message}`);
  if (!ok) failures++;
}
async function get(url, redirect = "follow") {
  return fetch(url, {
    redirect,
    signal: AbortSignal.timeout(15000),
    headers: { "User-Agent": "Eldotz-SEO-Check/1.0" },
  });
}
function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map((match) => [
      match[1].toLowerCase(),
      match[3],
    ]),
  );
}
function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(
    (match) => attributes(match[0]),
  );
}
async function checkPage(url) {
  const response = await get(url);
  const html = await response.text();
  check(response.status === 200, `${url} returns 200`);
  check(
    !/\b(noindex|none)\b/i.test(response.headers.get("x-robots-tag") || ""),
    `${url} has no blocking X-Robots-Tag`,
  );
  const meta = tags(html, "meta");
  const robots = meta.filter((tag) =>
    ["robots", "googlebot", "bingbot"].includes(tag.name?.toLowerCase()),
  );
  check(
    !robots.some((tag) => /\b(noindex|none)\b/i.test(tag.content)),
    `${url} has no noindex meta directive`,
  );
  const canonicals = tags(html, "link").filter(
    (tag) => tag.rel === "canonical",
  );
  check(
    canonicals.length === 1 && canonicals[0].href === url,
    `${url} has the expected canonical`,
  );
  check(
    /<h1\b/i.test(html) && /<main\b/i.test(html),
    `${url} contains pre-rendered main content`,
  );
  for (const key of ["og:image", "twitter:image"]) {
    const image = meta.find(
      (tag) => (tag.property || tag.name) === key,
    )?.content;
    check(
      Boolean(image?.startsWith(`${origin}/`)),
      `${url} has an absolute ${key}`,
    );
  }
}

console.log(`Live technical SEO audit: ${origin}\n`);
try {
  await checkPage(`${origin}/`);
  const robots = await get(`${origin}/robots.txt`);
  const robotsText = await robots.text();
  check(robots.status === 200, "robots.txt is available");
  check(
    !/^\s*Disallow:\s*\/\s*$/im.test(robotsText),
    "robots.txt does not disallow the whole site",
  );
  check(
    robotsText.includes(`Sitemap: ${origin}/sitemap.xml`),
    "robots.txt advertises the sitemap",
  );
  const sitemap = await get(`${origin}/sitemap.xml`);
  const xml = await sitemap.text();
  check(
    sitemap.status === 200 && /<urlset\b/.test(xml),
    "sitemap.xml is available and contains a URL set",
  );
  if (sitemap.ok && /<urlset\b/.test(xml)) {
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1],
    );
    check(
      urls.includes(`${origin}/`) && urls.includes(`${origin}/blog`),
      "sitemap contains the homepage and blog index",
    );
    for (const url of urls) {
      const parsed = new URL(url);
      if (parsed.origin !== origin || parsed.hash || parsed.search) {
        check(false, `Invalid or foreign sitemap URL: ${url}`);
        continue;
      }
      if (url !== `${origin}/`) await checkPage(url);
    }
  }
  const index = await get(`${origin}/index.html`, "manual");
  const indexTarget = new URL(
    index.headers.get("location") || "/index.html",
    origin,
  ).href;
  check(
    [301, 308].includes(index.status) && indexTarget === `${origin}/`,
    "index.html permanently redirects to the homepage",
  );
  const http = await get(`${origin.replace("https:", "http:")}/`, "manual");
  check(
    [301, 308].includes(http.status) &&
      new URL(http.headers.get("location") || "/", origin).href ===
        `${origin}/`,
    "HTTP permanently redirects to HTTPS",
  );
  const missing = await get(`${origin}/_eldotz-seo-check-not-found`);
  check(missing.status === 404, "unknown paths return a real 404");
  if (!input.hostname.startsWith("www.")) {
    try {
      const www = await get(`https://www.${input.host}/`, "manual");
      check(
        [301, 308].includes(www.status) &&
          new URL(www.headers.get("location") || "/", origin).href ===
            `${origin}/`,
        "www has valid TLS and permanently redirects to the canonical host",
      );
    } catch (error) {
      check(
        false,
        `www TLS/connectivity: ${error.cause?.code || error.message}`,
      );
    }
  }
} catch (error) {
  check(false, `Audit request failed: ${error.cause?.code || error.message}`);
}
console.log(
  `\n${failures} failed check(s). These checks do not establish search-engine indexing or ranking.`,
);
process.exitCode = failures ? 1 : 0;
