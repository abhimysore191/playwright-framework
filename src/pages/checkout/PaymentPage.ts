import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class PaymentPage extends BasePage {
    // Locators for payment page elements
    readonly paymentMethodDropdown: Locator;
    readonly confirmBtn: Locator;
    readonly paymentSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.paymentMethodDropdown = page.getByTestId('payment-method');
        this.confirmBtn = page.getByTestId('finish');
        this.paymentSuccessMessage = page.getByTestId(
            'payment-success-message'
        );
    }

    async selectPaymentMethod(method: string): Promise<void> {
        await this.paymentMethodDropdown.selectOption(method);
        await this.confirmBtn.click();
        await this.waitForPageLoad();
    }

    async verifyPaymentSuccess(paymentSuccessMessage: string): Promise<void> {
        await this.assertVisible(this.paymentSuccessMessage);
        await this.assertTextContains(
            this.paymentSuccessMessage,
            paymentSuccessMessage
        );
    }

    async confirmOrder(): Promise<void> {
        await this.assertEnabled(
            this.confirmBtn,
            'Confirm button should be enabled before clicking'
        );
        await this.confirmBtn.click();
        await this.waitForPageLoad();
    }
}
