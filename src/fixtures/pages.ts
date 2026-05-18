import { test as base, type APIRequestContext } from '@playwright/test';
import { HomePage } from '../pages/products/HomePage';
import { ProductDetailPage } from '../pages/products/ProductDetailPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { CartPage } from '../pages/cart/CartPage';
import { CheckoutPage } from '../pages/checkout/CheckoutPage';
import { BillingAddressPage } from '../pages/checkout/BillingAddressPage';
import { PaymentPage } from '../pages/checkout/PaymentPage';
import { OrderConfirmationPage } from '../pages/checkout/OrderConfirmationPage';
import { InvoiceDetailPage } from '../pages/invoice/InvoiceDetailPage';
import { InvoiceListPage } from '../pages/invoice/InvoiceListPage';
import { NavigationPage } from '../pages/navigations/NavigationPage';
import { CustomerRegistrationApi } from '../api/CustomerRegistrationApi';
import { request } from '@playwright/test';
import { PayloadGenerator } from '../generators/payloadGenerator';
import { ProfilePage } from '../pages/account/ProfilePage';
/**
 * PageObjects — the shape of the extended fixture object available in every test.
 */
interface PageObjects {
    homePage: HomePage;
    productDetailPage: ProductDetailPage;
    loginPage: LoginPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    billingAddressPage: BillingAddressPage;
    paymentPage: PaymentPage;
    orderConfirmationPage: OrderConfirmationPage;
    invoiceDetailPage: InvoiceDetailPage;
    invoiceListPage: InvoiceListPage;
    navigationPage: NavigationPage;
    profilePage: ProfilePage;
    registeredUser: ReturnType<typeof PayloadGenerator.generateRegisterPayload>;
    apiContext: APIRequestContext;
}

/**
 * Custom `test` fixture that auto-instantiates page objects.
 *
 * Usage:
 * ```ts
 * import { test } from '@fixtures/pages';
 *
 * test('my test', async ({ homePage, checkoutPage }) => {
 *   // ...
 * });
 * ```
 */
export const test = base.extend<PageObjects>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    billingAddressPage: async ({ page }, use) => {
        await use(new BillingAddressPage(page));
    },

    paymentPage: async ({ page }, use) => {
        await use(new PaymentPage(page));
    },

    orderConfirmationPage: async ({ page }, use) => {
        await use(new OrderConfirmationPage(page));
    },

    invoiceDetailPage: async ({ page }, use) => {
        await use(new InvoiceDetailPage(page));
    },

    invoiceListPage: async ({ page }, use) => {
        await use(new InvoiceListPage(page));
    },

    navigationPage: async ({ page }, use) => {
        await use(new NavigationPage(page));
    },

    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },

    apiContext: async ({}, use) => {
        const context = await request.newContext();

        await use(context);

        await context.dispose();
    },

    // -------------------------
    // USER REGISTRATION FIXTURE
    // -------------------------
    registeredUser: async ({ apiContext }, use) => {
        const registerUserPayload = PayloadGenerator.generateRegisterPayload();
        const registrationApi = new CustomerRegistrationApi(apiContext);

        const response =
            await registrationApi.postCustomerRegistration(registerUserPayload);

        if (!response.ok()) {
            throw new Error(`Registration failed: ${response.status()}`);
        }
        await use(registerUserPayload);
    }
});

export { expect } from '@playwright/test';
