import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join, dirname } from "node:path";
import { loadEnv } from "vite";
import { faqs } from "../src/data/faqs.js";
import { blogPosts } from "../src/data/blog.js";
import { resolveSiteOrigin } from "./site-origin.mjs";

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

function setMeta(html, selector, content) {
  return html.replace(selector, () => content);
}

try {
  const origin = resolveSiteOrigin({
    siteUrl:
      process.env.SITE_URL ?? loadEnv("production", root, "").SITE_URL ?? "",
    vercelEnv: process.env.VERCEL_ENV,
  });

  const { render } = await import(
    pathToFileURL(join(serverBuild, "entry-server.js")).href
  );
  const template = await readFile(join(dist, "index.html"), "utf8");
  if (
    !template.includes("<!--app-html-->") ||
    !template.includes("<!--seo-head-->")
  ) {
    throw new Error("Missing HTML pre-render markers.");
  }

  const home = origin ? `${origin}/` : "/";
  const image = origin
    ? `${origin}/images/og-image.png`
    : "/images/og-image.png";
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
  const organization = {
    "@type": "Organization",
    "@id": `${home}#organization`,
    name: "Eldotz",
    url: home,
    description:
      "IT services, digital marketing, product development, and AI solutions.",
    logo: {
      "@type": "ImageObject",
      url: `${home}brand/logo-mark.png`,
      width: 512,
      height: 512,
    },
  };
  const homepageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${home}#website`,
        url: home,
        name: "Eldotz",
        inLanguage: "en",
        publisher: { "@id": `${home}#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${home}#webpage`,
        url: home,
        name: "Eldotz | IT Services, Digital Marketing & AI Solutions",
        inLanguage: "en",
        isPartOf: { "@id": `${home}#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image,
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
        provider: { "@id": `${home}#organization` },
      })),
      {
        "@type": "FAQPage",
        "@id": `${home}#faq`,
        url: `${home}#faq`,
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  function pageHtml(
    pathname,
    { title, description, schema, type = "website" },
  ) {
    let html = template.replace("<!--app-html-->", () => render(pathname));
    html = setMeta(
      html,
      /<title>.*?<\/title>/,
      `<title>${escape(title)}</title>`,
    );
    html = setMeta(
      html,
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(description)}" />`,
    );
    html = setMeta(
      html,
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:type" content="${type}" />`,
    );
    html = setMeta(
      html,
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escape(title)}" />`,
    );
    html = setMeta(
      html,
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escape(description)}" />`,
    );
    html = setMeta(
      html,
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image" content="${escape(image)}" />`,
    );
    html = setMeta(
      html,
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${escape(title)}" />`,
    );
    html = setMeta(
      html,
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escape(description)}" />`,
    );
    html = setMeta(
      html,
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image" content="${escape(image)}" />`,
    );
    const canonical = origin ? `${origin}${pathname}` : "";
    const pageSchema = origin
      ? schema
      : {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Eldotz",
          description: organization.description,
        };
    const extraHead = `${canonical ? `<link rel="canonical" href="${escape(canonical)}" />\n<meta property="og:url" content="${escape(canonical)}" />\n` : ""}<script type="application/ld+json">${JSON.stringify(pageSchema).replace(/</g, "\\u003c")}</script>`;
    html = html.replace("<!--seo-head-->", () => extraHead);
    if (origin) {
      html = setMeta(
        html,
        /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/,
        '<meta name="robots" content="index, follow, max-image-preview:large" />',
      );
      const robots =
        html.match(/<meta\s+name="robots"\s+content="([^"]*)"/)?.[1] ?? "";
      if (!/\bindex\b/i.test(robots) || /\bnoindex\b/i.test(robots))
        throw new Error(
          `Refusing to publish an unindexable production page: ${pathname}`,
        );
    }
    return html;
  }

  const pages = [
    {
      pathname: "/",
      output: join(dist, "index.html"),
      title: "Eldotz | IT Services, Digital Marketing & AI Solutions",
      description:
        "Eldotz delivers IT services, web and app development, digital marketing, product design, and practical AI solutions.",
      schema: homepageSchema,
    },
    {
      pathname: "/blog",
      output: join(dist, "blog.html"),
      title: "Notes | Eldotz",
      description:
        "Practical notes on technology, products, brand, and growth from Eldotz.",
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Eldotz Notes",
        url: origin ? `${origin}/blog` : "/blog",
        isPartOf: { "@id": `${home}#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: blogPosts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: origin ? `${origin}/blog/${post.slug}` : `/blog/${post.slug}`,
            name: post.title,
          })),
        },
      },
    },
  ];

  for (const post of blogPosts) {
    pages.push({
      pathname: `/blog/${post.slug}`,
      output: join(dist, "blog", `${post.slug}.html`),
      title: `${post.title} | Eldotz Notes`,
      description: post.excerpt,
      type: "article",
      schema: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: origin ? `${origin}/blog/${post.slug}` : `/blog/${post.slug}`,
        image,
        author: { "@type": "Organization", name: "Eldotz", url: home },
        publisher: organization,
        mainEntityOfPage: origin
          ? `${origin}/blog/${post.slug}`
          : `/blog/${post.slug}`,
        isPartOf: { "@id": `${home}#website` },
        inLanguage: "en",
      },
    });
  }

  for (const page of pages) {
    await mkdir(dirname(page.output), { recursive: true });
    await writeFile(page.output, pageHtml(page.pathname, page));
  }

  if (origin) {
    const urls = pages.map(({ pathname }) => `${origin}${pathname}`);
    await writeFile(
      join(dist, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${escape(url)}</loc></url>`).join("")}</urlset>\n`,
    );
  } else {
    console.warn(
      "Generating an explicit noindex preview without a sitemap. Ordinary builds default to https://eldotz.com.",
    );
  }
  await writeFile(
    join(dist, "robots.txt"),
    `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ""}`,
  );
  console.log(
    `Pre-rendered ${pages.length} pages${origin ? ` for ${origin}` : " (preview)"}.`,
  );
} finally {
  await rm(serverBuild, { recursive: true, force: true });
}
