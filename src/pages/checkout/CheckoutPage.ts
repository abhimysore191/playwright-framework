import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * InvoiceDetails — the shape returned by `getInvoiceDetails()`.
 */
export interface InvoiceDetails {
    invoiceNumber: string;
    billingAddress: string;
    paymentMethod: string;
    totalAmount: string;
}

export class CheckoutPage extends BasePage {
    readonly proceedToCheckoutStep2: Locator;

    readonly paymentMethodBnpl: Locator;

    readonly monthlyInstallments: Locator;

    readonly finishButton: Locator;

    readonly confirmButton: Locator;

    readonly orderConfirmation: Locator;

    readonly invoiceNumber: Locator;

    readonly billingAddress: Locator;

    readonly paymentMethod: Locator;

    readonly totalAmount: Locator;

    constructor(page: Page) {
        super(page);

        // Step 2
        this.proceedToCheckoutStep2 = page.getByTestId('proceed-2');

        // Step 3
        this.paymentMethodBnpl = page.getByTestId('payment-method-bnpl');
        this.monthlyInstallments = page.getByTestId(
            'monthly-installments-value'
        );
        this.finishButton = page.getByTestId('finish');
        this.confirmButton = page.getByTestId('proceed-3');

        // Step 4 — invoice
        this.orderConfirmation = page.getByTestId('payment-success-message');
        this.invoiceNumber = page.getByTestId('invoice-number');
        this.billingAddress = page.getByTestId('billing-address');
        this.paymentMethod = page.getByTestId('payment-method');
        this.totalAmount = page.getByTestId('total-amount');
    }

    async proceedFromAddressStep(): Promise<void> {
        await this.waitForVisible(this.proceedToCheckoutStep2);
        await this.proceedToCheckoutStep2.click();
        await this.waitForPageLoad();
    }

    async navigate(): Promise<void> {
        await this.goto('/checkout');
        await this.waitForPageLoad();
    }

    async getInvoiceDetails(): Promise<InvoiceDetails> {
        const [invoiceNumber, billingAddress, paymentMethod, totalAmount] =
            await Promise.all([
                this.invoiceNumber.innerText(),
                this.billingAddress.innerText(),
                this.paymentMethod.innerText(),
                this.totalAmount.innerText()
            ]);

        return {
            invoiceNumber: invoiceNumber.trim(),
            billingAddress: billingAddress.trim(),
            paymentMethod: paymentMethod.trim(),
            totalAmount: totalAmount.trim()
        };
    }
}
