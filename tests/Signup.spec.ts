import { test } from "@playwright/test";
import * as signup from "../pages/Signup";
import { EmailHelper } from "../utils/EmailHelper";
import * as loginPage from "../pages/Login";
import { writeFileSync } from "fs";

test.describe("Signup", () => {
  test("should allow user to sign up", async ({ page }) => {
    test.skip(
      process.env.TEST_SIGNUP_FLOW !== "true",
      "Skipping signup flow test because TEST_SIGNUP_FLOW is not set to true",
    );
    await page.goto("/signup");

    let inbox: { id: string; emailAddress: string } | undefined;
    let emailHelper: EmailHelper;
    await test.step("Create a temporary email inbox", async () => {
      emailHelper = new EmailHelper();
      inbox = await emailHelper.createInbox();
    });
    await test.step("Fill the signup form with the temporary email", async () => {
      await signup.fillSignupForm(page, inbox!.emailAddress);
    });
    let code: string;
    await test.step("Wait for the confirmation email and extract the code", async () => {
      const confirmationEmail = await emailHelper.waitForLatestEmail(inbox!.id);
      // get the code\ from the email body:
      code = /([0-9]{6})$/.exec(confirmationEmail.body!)![1];
    });
    await test.step("Fill the confirmation code and submit", async () => {
      await signup.addConfirmationCode(page, code);
    });
    await test.step("Verify that the user is logged in by checking the URL", async () => {
      await loginPage.login(page, inbox!.emailAddress, signup.signUpData.pass);
      await loginPage.verifyLoggedIn(page);
    });
    await test.step("Save new account credentials to JSON file", async () => {
      const credentials = {
        email: inbox!.emailAddress,
        password: signup.signUpData.pass
      };
      writeFileSync('playwright/.auth/credentials.json', JSON.stringify(credentials, null, 2));
    });
    });
});