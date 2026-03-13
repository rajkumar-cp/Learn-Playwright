import { test } from "@playwright/test";
import * as signup from "../pages/Signup";
import { EmailHelper } from "../utils/EmailHelper";
import * as loginPage from "../pages/Login";

test.describe("Signup", () => {
  test("should allow user to sign up", async ({ page }) => {
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
    await test.step("Verify that the user is logged in by checking the presence of the logout button", async () => {
      await loginPage.login(page, inbox!.emailAddress, signup.signUpData.pass);
    });
  });
});
