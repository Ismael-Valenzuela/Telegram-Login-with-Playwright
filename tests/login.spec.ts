import { test, devices, Page, BrowserContext } from "@playwright/test";

test("Save session of TG", async ({ browser }) => {
  test.setTimeout(70000); // This is the max time the test have to be. (DO NOT CLOSE THE BROWSER UNTIL THE TEST FINISHES, NOT EVEN IF YOU ALREADY LOGGED IN)
  const context: BrowserContext = await browser.newContext({
    ...devices["iPhone 12"],
  });
  const page: Page = await context.newPage();

  await page.goto("https://web.telegram.org/");
  console.log("Please, log in Telegram manually. (You have 60 seconds)");
  await page.waitForTimeout(60000); // This give you 60 seconds to log in, if you can't log in in that time, change this value AND the test.setTimeout() at the beggining with a margin of 5-10 seconds.

  await context.storageState({ path: "telegram-session.json" }); //This is the magic line that saves the session into the storageState of the browser.
  console.log("Session saved in: telegram-session.json");

  await browser.close();
});
