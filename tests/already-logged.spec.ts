import { test, devices, Page, BrowserContext } from "@playwright/test";

test.describe("Pruebas de Telegram Web", () => {
  test("Verificar estado logueado", async ({ browser }) => {
    const context: BrowserContext = await browser.newContext({
      ...devices["iPhone 12"],
      storageState: "telegram-session.json", // This give the storageState we downloaded in the login.spec.ts to the Browser Context.
    });
    const page: Page = await context.newPage();
    await page.goto("https://web.telegram.org/");
    await page.waitForTimeout(10000);
  });
});
