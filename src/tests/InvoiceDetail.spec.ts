import { test, expect } from '../fixtures/pages';
import { BILLING_ADDRESS, PAYMENT_METHOD } from '../utils/testData';

test.describe('Feature: View Invoice After Purchase', () => {
    let orderNumber: string;
    let productPrice: string;
    let productQuantity: string;
    let productName: string;
    let linePrice: string;

    test.beforeEach(
        async ({
            loginPage,
            homePage,
            productDetailPage,
            cartPage,
            billingAddressPage,
            paymentPage,
            orderConfirmationPage,
            registeredUser
        }) => {
            await loginPage.navigate();
            await loginPage.login(
                registeredUser.email,
                registeredUser.password
            );

            await homePage.navigate();
            productName = await homePage.clickFirstInStockProduct();
            await productDetailPage.addToCart();

            await cartPage.navigate();

            productQuantity = await cartPage
                .getQuantityInput(productName)
                .inputValue();
            productPrice = await cartPage.getProductPriceValue(productName);
            linePrice = await cartPage.getLinePriceValue(productName);

            await cartPage.proceedToCheckout();
            await cartPage.verifyUserAlreadyLoggedIn();
            await cartPage.proceedToCheckoutLoggedIn();

            await billingAddressPage.fillBillingAddress({
                country: BILLING_ADDRESS.country,
                postalCode: BILLING_ADDRESS.postcode,
                houseNumber: BILLING_ADDRESS.houseNumber,
                street: BILLING_ADDRESS.street,
                city: BILLING_ADDRESS.city,
                state: BILLING_ADDRESS.state
            });

            await billingAddressPage.waitForPageLoad();
            await billingAddressPage.proceedToCheckout();

            await paymentPage.selectPaymentMethod(PAYMENT_METHOD);
            await paymentPage.verifyPaymentSuccess('Payment was successful');
            await paymentPage.confirmOrder();

            await orderConfirmationPage.waitForPageLoad();
            await orderConfirmationPage.verifyOrderConfirmation(
                'Thanks for your order!'
            );
            orderNumber = await orderConfirmationPage.getOrderNumber();
        }
    );

    test('Cart is empty after a successful purchase', async ({ cartPage }) => {
        await cartPage.navigate();
        await cartPage.verifyCartIsEmpty();
    });

    test('Invoice number is visible and non-empty on the confirmation page', async ({
        orderConfirmationPage
    }) => {
        await orderConfirmationPage.assertInvoiceNumberPresent();
    });

    test('Invoice shows correct billing address, payment method, and amount paid', async ({
        navigationPage,
        invoiceListPage,
        invoiceDetailPage
    }) => {
        await invoiceListPage.goToInvoices();
        await invoiceListPage.verifyPageLoaded();
        await invoiceListPage.waitForPageLoad();
        await invoiceListPage.verifyInvoiceExists(orderNumber);
        await invoiceListPage.verifyInvoiceTotal(orderNumber, linePrice);
        await invoiceListPage.openInvoiceDetails(orderNumber);

        await invoiceDetailPage.waitForPageLoad();
        await invoiceDetailPage.verifyInvoiceNumber(orderNumber);
        await invoiceDetailPage.verifyBillingAddress(
            BILLING_ADDRESS.street,
            BILLING_ADDRESS.postcode,
            BILLING_ADDRESS.city,
            BILLING_ADDRESS.state,
            BILLING_ADDRESS.country
        );
        await invoiceDetailPage.verifyPaymentMethod(PAYMENT_METHOD);
        await invoiceDetailPage.verifyProductInInvoice(productName);
        await invoiceDetailPage.verifyTotal(linePrice);
    });
});
