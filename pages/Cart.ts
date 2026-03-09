import {Page, expect} from '@playwright/test';

export async function verifyCartItem(page: Page, productName: string, productPrice: string) {
    const cartItem = await page.locator('[data-test-id="cart-item"]').first();
    const cartItemName = await cartItem.locator('h3').textContent();
    expect(cartItemName).toBe(productName);
    const cartItemPrice = await cartItem.locator('h3').locator('//following-sibling::p[2]').textContent();
    expect(cartItemPrice).toBe(productPrice); 
}

export async function verifySubTotal(page: Page, expectedSubTotal: string) {
    await page.getByText('Subtotal').locator('..').locator('.font-semibold').textContent().then(subtotal => {
        expect(subtotal).toBe(expectedSubTotal);
    });
}

export async function clickProceedToCheckout(page: Page) {
    await page.locator('[data-test-id="proceed-to-checkout"]').click();
}
