import{test,expect} from '@playwright/test';

test.describe('Cart', () => {
  test('should add item to cart', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Shop', exact: true }).click();
    const productCard = await page.locator('.p-6').first();
    const productName = await productCard.locator('h3').textContent();
    const productPrice = await productCard.locator('.font-bold').textContent();
    await productCard.getByRole('button', { name: 'Add to Cart' }).click();
    await page.locator('[data-test-id="header-cart-button"]').click();
    const cartItem = await page.locator('[data-test-id="cart-item"]').first();
    const cartItemName = await cartItem.locator('h3').textContent();
    expect(cartItemName).toBe(productName);
    const cartItemPrice = await cartItem.locator('h3').locator('//following-sibling::p[2]').textContent();
    expect(cartItemPrice).toBe(productPrice);
    await page.getByText('Subtotal').locator('..').locator('.font-semibold').textContent().then(subtotal => {
        expect(subtotal).toBe(productPrice);
    });
  });
});