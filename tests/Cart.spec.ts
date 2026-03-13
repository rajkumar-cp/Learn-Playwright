import { test, expect } from "@playwright/test";
import * as products from "../pages/Products";
import * as cart from "../pages/Cart";
import * as checkout from "../pages/Checkout";
import * as orderConfirmation from "../pages/Order-Confirmation";
import * as contact from "../pages/contact";
import * as orderDetails from "../pages/Order-Details";

test.describe("Cart", () => {
  test("should add item to cart", async ({ page }) => {
    await page.goto("/products");

    const { productName, productPrice } = await products.addProductToCart(page);

    await page.locator('[data-test-id="header-cart-button"]').click();

    await cart.verifyCartItem(page, productName!, productPrice!);

    await cart.verifySubTotal(page, productPrice!);
  });

  test("complete checkout process", async ({ page }) => {
    await page.goto("/products");

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

    await contact.trackOrder(
      page,
      trackingNumber!,
      checkout.contactInformation.email,
    );

    const orderDetail = await orderDetails.getOrderDetails(page);
    expect(orderDetail.productPrice).toBe(productPrice);
    expect(orderDetail.customerName).toBe(
      `Name: ${checkout.contactInformation.firstName} ${checkout.contactInformation.lastName}`,
    );
    expect(orderDetail.email).toBe(
      `Email: ${checkout.contactInformation.email}`,
    );
  });

  test("complete checkout process - with steps", async ({ page }) => {
    await page.goto("/products");

    let addedProduct: Awaited<ReturnType<typeof products.addProductToCart>> =
      {} as any;

    await test.step("Add product to cart", async () => {
      addedProduct = await products.addProductToCart(page);
    });

    await test.step("Verify cart item and subtotal", async () => {
      await page.locator('[data-test-id="header-cart-button"]').click();
      await cart.verifyCartItem(
        page,
        addedProduct.productName!,
        addedProduct.productPrice!,
      );
      await cart.verifySubTotal(page, addedProduct.productPrice!);
    });

    await test.step("Complete checkout process", async () => {
      await cart.clickProceedToCheckout(page);
      await checkout.fillContactInformation(page);
      await checkout.fillShippingAddress(page);
      await checkout.fillPaymentInformation(page);
      await checkout.clickPlaceOrderButton(page);
    });

    await test.step("Track order and verify details", async () => {
      const trackingNumber = await orderConfirmation.returnTrackingNumber(page);

      await orderConfirmation.clickTrackYourOrder(page);

      await contact.trackOrder(
        page,
        trackingNumber!,
        checkout.contactInformation.email,
      );

      const orderDetail = await orderDetails.getOrderDetails(page);

      expect(orderDetail.productPrice).toBe(addedProduct.productPrice);
      expect(orderDetail.customerName).toBe(
        `Name: ${checkout.contactInformation.firstName} ${checkout.contactInformation.lastName}`,
      );

      expect(orderDetail.email).toBe(
        `Email: ${checkout.contactInformation.email}`,
      );
    });
  });
});
