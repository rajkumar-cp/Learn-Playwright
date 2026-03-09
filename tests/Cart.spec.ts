import{test,expect} from '@playwright/test';
import  *  as products from '../pages/Products';
import  *  as cart from '../pages/Cart';

test.describe('Cart', () => {
  test('should add item to cart', async ({ page }) => {
    
    await page.goto('/products');

    const { productName, productPrice } = await products.addProductToCart(page);

    await page.locator('[data-test-id="header-cart-button"]').click();

    await cart.verifyCartItem(page, productName!, productPrice!);

    await cart.verifySubTotal(page, productPrice!);
  });
});