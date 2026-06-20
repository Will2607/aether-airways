import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders without crashing", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AetherAirways/);
  });
});
