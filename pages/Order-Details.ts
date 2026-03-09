import { Page } from '@playwright/test';

export async function getOrderDetails(page: Page) {

    const orderDetails = await page.locator('.space-y-4');
    const productName = await orderDetails.locator('p').nth(0).textContent();
    const productPrice = await orderDetails.locator('p').nth(2).textContent();
    const customerDetails = await page.locator('.text-gray-700');
    const email = await customerDetails.locator('p').nth(1).textContent();
    const customerName = await customerDetails.locator('p').nth(0).textContent();
    return {
        productName,
        productPrice,
        email,
        customerName
    };
}