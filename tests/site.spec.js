import { test, expect } from "@playwright/test";

test("renders all services without runtime errors", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("eldotz — Big ideas. Real-world impact.");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Real-world",
  );
  await expect(page.locator(".service-card")).toHaveCount(4);
  await expect(page.locator("canvas")).toBeVisible();
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("mobile menu navigates and restores access to content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: /^(Open|Close) navigation$/,
  });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Expertise" })
    .click();
  await expect(page).toHaveURL(/#expertise$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
});

test("project and privacy dialogs support keyboard dismissal", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of ["Verdant", "Orbit"]) {
    await page
      .getByRole("button", { name: new RegExp(`Explore ${name}`) })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("dialog").getByRole("heading", { level: 2 }),
    ).toHaveText(name);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
  await page.getByRole("button", { name: "Privacy notice" }).click();
  await expect(
    page.getByRole("dialog", { name: "Privacy notice" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close privacy notice" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("FAQ expands and service selection carries into the email draft", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByText("Can we start with just one service?", { exact: true })
    .click();
  await expect(page.locator("details[open]")).toContainText("Absolutely.");
  await page.locator(".service-card").last().click();
  await expect(page.getByLabel("What are you thinking?")).toHaveValue(
    "AI solutions",
  );
  await page.getByLabel("Your name").fill("Alex Morgan");
  await page.getByLabel("Work email").fill("alex@example.com");
  await page
    .getByLabel("A little about your idea")
    .fill("We would like to automate our support workflow.");
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await expect(page.getByRole("status")).toContainText(
    "it has not been sent yet",
  );
  const draft = await page
    .getByRole("link", { name: "Open it again" })
    .getAttribute("href");
  expect(draft).toMatch(/^mailto:hello@eldotz.com\?/);
  expect(decodeURIComponent(draft)).toContain("AI solutions");
  expect(decodeURIComponent(draft)).toContain("alex@example.com");
});

test("reduced motion keeps all content available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#expertise").scrollIntoViewIfNeeded();
  await expect(page.locator("#expertise h2")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-copy")).toHaveCSS("animation-name", "none");
});
