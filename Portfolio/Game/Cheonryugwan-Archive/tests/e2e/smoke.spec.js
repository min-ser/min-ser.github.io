import { test, expect } from "@playwright/test";

test("home navigation links are interactive", async ({ page }) => {
  await page.goto("/index.html");
  await expect(page.locator('a[href="./game/"]').first()).toBeVisible();
  await expect(page.locator('a[href="./pages/characters/"]').first()).toBeVisible();
  await expect(page.locator('a[href="./pages/backgrounds/"]').first()).toBeVisible();
  await expect(page.locator('a[href="./pages/sounds/"]').first()).toBeVisible();
});

test("game title buttons and chapter dialog work", async ({ page }) => {
  await page.goto("/game/");
  await expect(page.locator("html")).toHaveAttribute("data-game-ready", "v0.9.4");
  await expect(page.locator("#new-game")).toBeVisible();
  await page.locator("#chapter-select-btn").click();
  await expect(page.locator("#chapter-dialog")).toHaveAttribute("open", "");
  await expect(page.locator("#chapter-list .chapter-item").first()).toBeVisible();
});

test("save import export controls exist", async ({ page }) => {
  await page.goto("/game/");
  await page.locator("#title-settings").click();
  await expect(page.locator("#export-save-btn")).toBeVisible();
  await expect(page.locator("#import-save-btn")).toBeVisible();
});
