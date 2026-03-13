import { test } from "@playwright/test";
import * as loginPage from "../pages/Login";
import path from "node:path";
import fs from "fs";

 test("setup", async ({ page }) => {
    await page.goto("/login");
    const loginDatafile = path.resolve(__dirname, "../playwright/.auth/credentials.json");
    const loginData = JSON.parse(fs.readFileSync(loginDatafile, "utf-8")) as {
      email: string;
      password: string;
    };
    await loginPage.login(page, loginData.email, loginData.password);
    await loginPage.verifyLoggedIn(page);
    await page.context().storageState({
      path: path.resolve(__dirname, "../playwright/.auth/storageState.json"),
    });
  });