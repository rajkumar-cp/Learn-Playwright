import { test, expect } from '@playwright/test';
import * as products from '../pages/Products';
import * as cart from '../pages/Cart';
import * as checkout from '../pages/Checkout';
import * as orderConfirmation from '../pages/Order-Confirmation';
import * as contact from '../pages/contact';
import * as orderDetails from '../pages/Order-Details';

test.describe('Cart', () => {
  test('should add item to cart', async ({ page }) => {
    
    await page.goto('/products');

    const { productName, productPrice } = await products.addProductToCart(page);

    await page.locator('[data-test-id="header-cart-button"]').click();

    await cart.verifyCartItem(page, productName!, productPrice!);

    await cart.verifySubTotal(page, productPrice!);
  });

  test('complete checkout process', async ({ page }) => {
    
    await page.goto('/products');

    const { productName, productPrice } = await products.addProductToCart(page);

    await page.locator('[data-test-id="header-cart-button"]').click();

    await cart.verifyCartItem(page, productName!, productPrice!);

    await cart.verifySubTotal(page, productPrice!);

    await cart.clickProceedToCheckout(page);

    await checkout.fillContactInformation(page);

    await checkout.fillShippingAddress(page);

    await checkout.fillPaymentInformation(page);

    await checkout.clickPlaceOrderButton(page);

    const trackingNumber = await orderConfirmation.returnTrackingNumber(page);

    await orderConfirmation.clickTrackYourOrder(page);

    await contact.trackOrder(page, trackingNumber!, checkout.contactInformation.email);

    const orderDetail = await orderDetails.getOrderDetails(page);

  //  expect(orderDetail.productName).toBe(productName);
    expect(orderDetail.productPrice).toBe(productPrice);
    expect(orderDetail.customerName).toBe(`Name: ${checkout.contactInformation.firstName} ${checkout.contactInformation.lastName}`);
    expect(orderDetail.email).toBe(`Email: ${checkout.contactInformation.email}`);

  });
});