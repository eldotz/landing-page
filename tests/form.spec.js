import { test, expect } from "@playwright/test";

test("rejects whitespace-only messages and clears the error on input", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.getByLabel("Your name").fill("Alex Morgan");
  await page.getByLabel("Work email").fill("alex@example.com");
  const message = page.getByLabel("A little about your idea");
  await message.fill("   ");
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await expect(message).toHaveJSProperty(
    "validationMessage",
    "Tell us a little about your idea.",
  );
  await expect(page.getByRole("status")).toBeEmpty();
  await message.fill("A new product idea.");
  await expect(message).toHaveJSProperty("validationMessage", "");
});

test("resizing an open mobile menu restores desktop content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await expect(page.locator("body")).not.toHaveClass(/nav-open/);
});
