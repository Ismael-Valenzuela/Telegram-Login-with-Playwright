# INSTRUCTIONS TO EXECUTE THE TEST:

- Clone this repository from **Github**.
- Open the folder in you favourite **IDE** (like **Visual Studio Code**) and open the **CMD** to execute the next commands.
- First, we need to log in Telegram manually to save the cookies in your local folder. The command you have to execute is:

  ```bash
  npx playwright test tests/login.spec.ts
  ```

  **(⚠️ MAKE SURE TO HAVE NODE INSTALLED: https://nodejs.org/es ⚠️) (⚠️ Also make sure you are inside the clone folder ⚠️)**

- You have 60 seconds to log-in. If you need more time, modify the script inside the tests files changing the values. **(⚠️ DO NOT CLOSE THE WINDOW, NOT EVEN IF YOU ALREADY LOGGED IN. JUST WAIT FOR THE TEST TO CLOSE IT AUTOMATICALLY ⚠️)**
- Once you do this, a folder called **"telegram-session.json"** should be created inside the folder.
- After checking if the JSON is created. Enjoy making your tests with your account already logged executing this command:
  ```bash
  npx playwright test tests/already-logged.spec.ts
  ```

# ⚠️ THINGS TO CONSIDER ⚠️

Remember that cookies can expire! So, if your session does not work, delete the telegram-session.json and log-in again.  


![Playwright Logo](./images/Playwright-logo.png)

