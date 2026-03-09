import {Page} from '@playwright/test';

export const contactInformation = {
  firstName: 'Fname',
  lastName: 'Lname',
  email: 'abc@email.com',
  Address: 'Fake street 1',
  City: 'fake city',
  Zipcode: '79114',
  Nameoncard: 'fake name',
  Cardnumber: '1478 5236 9856 1268', 
    Expiry: '01/30',
    CVC: '145'
}

export async function fillContactInformation( page: Page  ) {
    await page.locator('[data-test-id="checkout-firstname-input"]').fill(contactInformation.firstName);
    await page.locator('[data-test-id="checkout-lastname-input"]').fill(contactInformation.lastName);
    await page.locator('[data-test-id="checkout-email-input"]').fill(contactInformation.email);
}

export async function fillShippingAddress( page: Page  ) {
    await page.locator('[data-test-id="checkout-address-input"]').fill(contactInformation.Address);
    await page.locator('[data-test-id="checkout-city-input"]').fill(contactInformation.City);
    await page.locator('[data-test-id="checkout-zipcode-input"]').fill(contactInformation.Zipcode);
}

export async function fillPaymentInformation( page: Page  ) {
    await page.locator('[data-test-id="checkout-cardname-input"]').fill(contactInformation.Nameoncard);
    await page.locator('[data-test-id="checkout-cardnumber-input"]').fill(contactInformation.Cardnumber);
    await page.locator('[data-test-id="checkout-cardexpiry-input"]').fill(contactInformation.Expiry);
    await page.locator('[data-test-id="checkout-cardcvc-input"]').fill(contactInformation.CVC);
}

export async function clickPlaceOrderButton(page: Page) {
    await page.locator('[data-test-id="place-order-button"]').click();
}