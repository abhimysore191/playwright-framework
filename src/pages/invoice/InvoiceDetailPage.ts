import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class InvoiceDetailPage extends BasePage {
    readonly invoiceNumberInput: Locator;
    readonly invoiceDateInput: Locator;
    readonly totalInput: Locator;
    readonly streetInput: Locator;
    readonly postalCodeInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly countryInput: Locator;
    readonly paymentMethodInput: Locator;
    readonly productRows: Locator;

    constructor(page: Page) {
        super(page);

        this.invoiceNumberInput = page.getByTestId('invoice-number');
        this.invoiceDateInput = page.getByTestId('invoice-date');
        this.totalInput = page.getByTestId('total');

        this.streetInput = page.getByTestId('street');
        this.postalCodeInput = page.getByTestId('postal_code');
        this.cityInput = page.getByTestId('city');
        this.stateInput = page.getByTestId('state');
        this.countryInput = page.getByTestId('country');

        this.paymentMethodInput = page.getByTestId('payment-method');

        this.productRows = page.locator('tbody tr');
    }

    async verifyInvoiceNumber(expectedInvoiceNumber: string): Promise<void> {
        await this.assertToHaveValue(
            this.invoiceNumberInput,
            expectedInvoiceNumber
        );
    }

    async verifyTotal(expectedTotal: string): Promise<void> {
        const actual = await this.totalInput.inputValue();

        expect(actual.replace(/\s+/g, '')).toBe(
            expectedTotal.replace(/\s+/g, '')
        );
    }

    async verifyPaymentMethod(expectedPaymentMethod: string): Promise<void> {
        await this.assertToHaveValue(
            this.paymentMethodInput,
            expectedPaymentMethod
        );
    }

    async verifyBillingAddress(
        street: string,
        postalCode: string,
        city: string,
        state: string,
        country: string
    ): Promise<void> {
        await this.assertToHaveValue(this.streetInput, street);
        await this.assertToHaveValue(this.postalCodeInput, postalCode);
        await this.assertToHaveValue(this.cityInput, city);
        await this.assertToHaveValue(this.stateInput, state);
        await this.assertToHaveValue(this.countryInput, country);
    }

    getProductRow(productName: string): Locator {
        return this.page.locator('tbody tr', {
            hasText: productName
        });
    }

    async verifyProductInInvoice(productName: string): Promise<void> {
        await this.assertVisible(this.getProductRow(productName));
    }
}
