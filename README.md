# INSTRUCTIONS TO EXECUTE THE TEST:

- Clone this repository from **Github**.
- Open the folder in you favourite **IDE** (like **Visual Studio Code**) and open the **CMD** to execute the next commands.
- Install the next commands so you can use playwright in your machine:

  ```bash
  npm install playwright
  ```

  ```bash
  npm install dotenv
  ```

  ```bash
  npx install playwright
  ```

  **(⚠️ MAKE SURE TO HAVE NODE INSTALLED: https://nodejs.org/es ⚠️)**

- Once we installed everything, we have to create a folder named **.env**
- Inside **.env** we are going to create the next enviroment variable:

  ```bash
    SECRET_KEY="Insert_here_a_key_with_32_characters"
  ```

- Now, all the session files will be encrypted and secure in your local machine. To decript one of those files you will neex the SECRET_KEY that you put when you created the session, that is why is important to create the enviroment variable.
- We need to log in Telegram manually to save the cookies in your local folder. The command you have to execute is:

  ```bash
  npx playwright test tests/login.spec.ts
  ```

  **(⚠️ Also make sure you are inside the clone folder ⚠️)**

- You have 60 seconds to log-in. If you need more time, modify the script inside the tests files changing the values. **(⚠️ DO NOT CLOSE THE WINDOW, NOT EVEN IF YOU ALREADY LOGGED IN. JUST WAIT FOR THE TEST TO CLOSE IT AUTOMATICALLY ⚠️)**
- Once you do this, a folder called **"telegram-session.json"** should be created inside the folder.
- After checking if the JSON is created. Enjoy making your tests with your account already logged executing this command:
  ```bash
  npx playwright test tests/already-logged.spec.ts
  ```

# ⚠️ THINGS TO CONSIDER ⚠️

Remember that cookies can expire! So, if your session does not work, delete the telegram-session.json and log-in again.

<div align="center">
  <img src="./images/Playwright-logo.png" alt="Playwright Logo" width="400">
</div>
