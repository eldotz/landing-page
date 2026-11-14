import { test, expect } from "@playwright/test";
import { blogPosts } from "../src/data/blog.js";

const title = "Eldotz | IT Services, Digital Marketing & AI Solutions";

test("homepage is pre-rendered, crawlable, and usable without JavaScript", async ({
  browser,
  baseURL,
  request,
}) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('<main id="main">');
  expect(html).toContain('id="it-services"');
  expect(html).toContain("Who do you work with?");
  expect(html).not.toContain("<!--app-html-->");
  expect(html).not.toContain("<!--seo-head-->");

  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL);
    await expect(page).toHaveTitle(title);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".service-card")).toHaveCount(4);
    await page.getByText("Who do you work with?", { exact: true }).click();
    await expect(page.locator("details[open]")).toContainText(
      "Ambitious startups",
    );
    await expect(page.locator("#contact-form")).toHaveAttribute(
      "action",
      "mailto:hello@eldotz.com",
    );
    await expect(page.locator("#contact-form")).toHaveAttribute(
      "method",
      "post",
    );
  } finally {
    await context.close();
  }
});

test("metadata is unique and social previews have descriptive text", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(title);
  await expect(page.locator("title")).toHaveCount(1);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /IT services.*digital marketing.*AI solutions/,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "website",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
    "content",
    /Eldotz/,
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("indexing and sitemap use only the configured canonical origin", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Allow: /");
  const schema = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((element) => JSON.parse(element.textContent));
  const canonical = page.locator('link[rel="canonical"]');
  if (!(await canonical.count())) {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    expect(schema["@type"]).toBe("Organization");
    expect((await request.get("/sitemap.xml")).status()).toBe(404);
    return;
  }

  const home = await canonical.getAttribute("href");
  const homeResponse = await request.get("/");
  expect(homeResponse.headers()["x-robots-tag"] || "").not.toMatch(/noindex/i);
  expect(new URL(home).protocol).toBe("https:");
  expect(new URL(home).pathname).toBe("/");
  await expect(canonical).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /^index, follow/,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    home,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    `${home}images/og-image.png`,
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    `${home}images/og-image.png`,
  );
  expect(await robots.text()).toContain(`Sitemap: ${home}sitemap.xml`);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain(`<loc>${home}</loc>`);
  expect(sitemapText).toContain(`<loc>${home}blog</loc>`);
  for (const post of blogPosts)
    expect(sitemapText).toContain(`<loc>${home}blog/${post.slug}</loc>`);
  expect([...sitemapText.matchAll(/<loc>/g)]).toHaveLength(
    blogPosts.length + 2,
  );

  const graph = schema["@graph"];
  for (const type of ["Organization", "WebSite", "WebPage", "FAQPage"]) {
    expect(graph.filter((node) => node["@type"] === type)).toHaveLength(1);
  }
  const services = graph.filter((node) => node["@type"] === "Service");
  expect(services).toHaveLength(4);
  for (const service of services) {
    await expect(page.locator(new URL(service.url).hash)).toHaveCount(1);
  }
  const faq = graph.find((node) => node["@type"] === "FAQPage");
  for (const question of faq.mainEntity) {
    await expect(page.locator(".faq-list")).toContainText(question.name);
    await expect(page.locator(".faq-list")).toContainText(
      question.acceptedAnswer.text,
    );
  }
});

test("fonts and brand images are self-hosted and available", async ({
  page,
  request,
  baseURL,
}) => {
  const origins = new Set();
  page.on("request", (request) => {
    if (request.url().startsWith("http"))
      origins.add(new URL(request.url()).origin);
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  expect([...origins]).toEqual([new URL(baseURL).origin]);
  for (const path of [
    "/fonts/manrope-latin-variable.woff2",
    "/fonts/dm-sans-latin-variable.woff2",
    "/brand/apple-touch-icon.png",
    "/brand/logo-mark.png",
    "/images/og-image.png",
  ]) {
    expect((await request.get(path)).status()).toBe(200);
  }
});

test("hydration preserves interactions without runtime or console errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await page
    .getByRole("button", { name: "Explore AI workspace concept" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  expect(errors).toEqual([]);
});

test("blog pages are pre-rendered with route-specific indexability and metadata", async ({
  page,
}) => {
  for (const entry of [
    { path: "/blog", title: "Notes | Eldotz", type: "CollectionPage" },
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Eldotz Notes`,
      type: "BlogPosting",
    })),
  ]) {
    const response = await page.goto(entry.path);
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(entry.title);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count()) {
      const url = await canonical.getAttribute("href");
      const origin = new URL(url).origin;
      expect(url).toBe(`${origin}${entry.path}`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /^index, follow/,
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        `${origin}/images/og-image.png`,
      );
      const schema = await page
        .locator('script[type="application/ld+json"]')
        .evaluate((element) => JSON.parse(element.textContent));
      expect(schema["@type"]).toBe(entry.type);
      if (entry.type === "BlogPosting") {
        expect(schema.publisher.name).toBe("Eldotz");
        expect(schema.publisher.logo.url).toBe(`${origin}/brand/logo-mark.png`);
      }
    } else {
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, nofollow",
      );
    }
  }
});

test("unknown URLs return 404 instead of duplicate landing pages", async ({
  request,
}) => {
  expect((await request.get("/not-a-real-page")).status()).toBe(404);
  expect((await request.get("/blog/not-a-real-article")).status()).toBe(404);
});
