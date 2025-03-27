require("dotenv").config();
import { test, devices, Page, BrowserContext } from "@playwright/test";
import * as crypto from "crypto";
import * as fs from "fs";

const myKey: any = process.env.SECRET_KEY; // Here we are using the secret key from the .env file that MUST BE 32 CHARACTERS
const SECRET_KEY = crypto.createHash("sha256").update(myKey).digest();
const ALGORITHM = "aes-256-cbc";
const IV = crypto.randomBytes(16);

// Function to encrypt a file
function encryptFile(inputPath: string, outputPath: string) {
  const data = fs.readFileSync(inputPath, "utf8");
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  const encryptedData = {
    iv: IV.toString("hex"),
    content: encrypted,
  };

  fs.writeFileSync(outputPath, JSON.stringify(encryptedData, null, 2));
  console.log(`Archivo encriptado guardado en: ${outputPath}`);
}

// This is the test of login
const timeToLogin : number = 60000; // This is the max time you have to login manually, IF YOU NEED MORE TIME, CHANGE THIS VALUE TO A BIGGER ONE
test("Save session of TG", async ({ browser }) => {
  test.setTimeout(timeToLogin);
  const context: BrowserContext = await browser.newContext({
    ...devices["iPhone 12"],
  });
  const page: Page = await context.newPage();

  await page.goto("https://web.telegram.org/");
  console.log("Please, log in Telegram manually. (You have 60 seconds)");
  await page.waitForTimeout(timeToLogin);

  // Save the session
  const sessionPath = "crypto/telegram-session.json";
  await context.storageState({ path: sessionPath }); // Here is where the session is saved inside the storage State of the Browser so we can use it later

  // Encrypt the session
  const encryptedPath = "crypto/telegram-session.enc.json";
  encryptFile(sessionPath, encryptedPath);

  // Delete the original session
  fs.unlinkSync(sessionPath);

  await browser.close();
});
