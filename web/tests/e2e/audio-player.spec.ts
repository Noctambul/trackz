import { expect, test } from "@playwright/test";

test("should display the player when playing a Trackz", async ({ page }) => {
  const trackzIndex = 1;

  await page.goto("/");
  await expect(page.locator(`[aria-label="Audio Player"]`)).toBeHidden();

  await page.click(
    `[aria-label="Trackz Card ${trackzIndex}"] [aria-label="Play Button"]`
  );
  await expect(page.locator(`[aria-label="Audio Player"]`)).toBeVisible();
});
