require("dotenv").config();
import { test, devices, Page, BrowserContext } from "@playwright/test";
import * as crypto from "crypto";
import * as fs from "fs";

const myKey: any = process.env.SECRET_KEY; // Here we are using the secret key from the .env file that MUST BE 32 CHARACTERS
const SECRET_KEY = crypto.createHash("sha256").update(myKey).digest();
const ALGORITHM = "aes-256-cbc";

// Function to decrypt a file
function decryptFile(inputPath: string, outputPath: string) {
  const encryptedData = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    SECRET_KEY,
    Buffer.from(encryptedData.iv, "hex")
  );

  let decrypted = decipher.update(encryptedData.content, "hex", "utf8");
  decrypted += decipher.final("utf8");

  fs.writeFileSync(outputPath, decrypted);
  console.log(`Archivo desencriptado guardado temporalmente en: ${outputPath}`);
}

// Function to delete a file
function deleteFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Archivo eliminado: ${filePath}`);
  }
}

// Your TG tests
test.describe("Pruebas de Telegram Web", () => {
  test("Verificar estado logueado", async ({ browser }) => {
    const encryptedSessionPath = "crypto/telegram-session.enc.json";
    const decryptedSessionPath = "crypto/telegram-session.json";

    // Decrypt the session file
    decryptFile(encryptedSessionPath, decryptedSessionPath);

    const context: BrowserContext = await browser.newContext({
      ...devices["iPhone 12"],
      storageState: decryptedSessionPath, // Here we use the decrypted session to restore the state and have our session inside the browser
    });
    const page: Page = await context.newPage();
    deleteFile(decryptedSessionPath); // Once we have the session, we delete the decrypted file

    await page.goto("https://web.telegram.org/");
    await page.waitForTimeout(10000);

    await browser.close();
  });
});
