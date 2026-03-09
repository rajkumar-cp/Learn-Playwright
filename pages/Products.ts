import { Page } from '@playwright/test';

export async function addProductToCart( page: Page, productIndex: number = 0   ) {
    const productCard = await page.locator('.p-6').nth(productIndex);
    const productName = await productCard.locator('h3').textContent();
    const productPrice = await productCard.locator('.font-bold').textContent();
    await productCard.getByRole('button', { name: 'Add to Cart' }).click();
    return { productName, productPrice };
}