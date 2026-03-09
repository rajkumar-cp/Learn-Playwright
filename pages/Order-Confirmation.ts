import { Page } from "playwright";  

export async function returnTrackingNumber(page: Page) {
    return await page.locator('.tracking-wider').textContent();
}

export async function clickTrackYourOrder(page: Page) {
    await page.getByRole('button', { name: 'Track Your Order' }).click();
}