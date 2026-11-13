import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";
import { loadEnv } from "vite";
import { faqs } from "../src/data/faqs.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
const serverBuild = join(root, ".prerender");
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character],
  );

try {
  const value = (
    process.env.SITE_URL ??
    loadEnv("production", root, "").SITE_URL ??
    ""
  ).trim();
  let origin;
  if (value) {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/"
    ) {
      throw new Error(
        "SITE_URL must be an HTTPS origin with no credentials, subpath, query, or fragment.",
      );
    }
    origin = url.origin;
  }

  const { render } = await import(
    pathToFileURL(join(serverBuild, "entry-server.js")).href
  );
  let html = await readFile(join(dist, "index.html"), "utf8");
  if (!html.includes("<!--app-html-->") || !html.includes("<!--seo-head-->")) {
    throw new Error("Missing HTML pre-render markers.");
  }
  html = html.replace("<!--app-html-->", render());

  const organization = {
    "@type": "Organization",
    name: "Eldotz",
    description:
      "IT services, digital marketing, product development, and AI solutions.",
  };
  let structuredData = { "@context": "https://schema.org", ...organization };
  let extraHead = "";

  if (origin) {
    const home = `${origin}/`;
    const organizationId = `${home}#organization`;
    const services = [
      {
        id: "it-services",
        name: "IT services and web development",
        description:
          "Software, web and app development, and scalable infrastructure.",
      },
      {
        id: "digital-marketing",
        name: "Digital marketing and brand strategy",
        description:
          "Digital campaigns, brand strategy, and measurable business growth.",
      },
      {
        id: "product-development",
        name: "Digital product development",
        description: "User-centered product development and UI/UX design.",
      },
      {
        id: "ai-solutions",
        name: "AI solutions and automation",
        description:
          "Practical AI solutions and intelligent workflow automation.",
      },
    ];
    structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          ...organization,
          "@id": organizationId,
          url: home,
          logo: {
            "@type": "ImageObject",
            url: `${origin}/brand/logo-mark.png`,
            width: 512,
            height: 512,
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Eldotz digital services",
            itemListElement: services.map((service) => ({
              "@type": "Offer",
              itemOffered: { "@id": `${home}#${service.id}` },
            })),
          },
        },
        {
          "@type": "WebSite",
          "@id": `${home}#website`,
          url: home,
          name: "Eldotz",
          inLanguage: "en",
          publisher: { "@id": organizationId },
        },
        {
          "@type": "WebPage",
          "@id": `${home}#webpage`,
          url: home,
          name: "Eldotz | IT Services, Digital Marketing & AI Solutions",
          inLanguage: "en",
          isPartOf: { "@id": `${home}#website` },
          about: { "@id": organizationId },
          mainEntity: services.map((service) => ({
            "@id": `${home}#${service.id}`,
          })),
          hasPart: { "@id": `${home}#faq` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${origin}/images/og-image.png`,
            width: 1200,
            height: 630,
          },
        },
        ...services.map((service) => ({
          "@type": "Service",
          "@id": `${home}#${service.id}`,
          url: `${home}#${service.id}`,
          name: service.name,
          description: service.description,
          provider: { "@id": organizationId },
        })),
        {
          "@type": "FAQPage",
          "@id": `${home}#faq`,
          url: `${home}#faq`,
          isPartOf: { "@id": `${home}#webpage` },
          mainEntity: faqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    };
    extraHead = `<link rel="canonical" href="${escape(home)}" />\n<meta property="og:url" content="${escape(home)}" />\n`;
    html = html.replace(
      'content="noindex, nofollow"',
      'content="index, follow, max-image-preview:large"',
    );
    html = html.replaceAll(
      'content="/images/og-image.png"',
      `content="${escape(`${origin}/images/og-image.png`)}"`,
    );
    await writeFile(
      join(dist, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(home)}</loc></url></urlset>\n`,
    );
  } else {
    console.warn(
      "SITE_URL is unset: generating a noindex preview. Set your verified production origin before deployment.",
    );
  }

  const json = JSON.stringify(structuredData).replace(/</g, "\\u003c");
  html = html.replace(
    "<!--seo-head-->",
    `${extraHead}<script type="application/ld+json">${json}</script>`,
  );
  await writeFile(join(dist, "index.html"), html);
  await writeFile(
    join(dist, "robots.txt"),
    `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ""}`,
  );
  console.log(
    `Pre-rendered homepage${origin ? ` for ${origin}` : " (preview)"}.`,
  );
} finally {
  await rm(serverBuild, { recursive: true, force: true });
}
