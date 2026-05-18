import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class OrderConfirmationPage extends BasePage {
    readonly orderConfirmationMessage: Locator;
    readonly orderNumber: Locator;

    constructor(page: Page) {
        super(page);
        this.orderConfirmationMessage = page.locator('#order-confirmation');
        this.orderNumber = this.orderConfirmationMessage.locator('span');
    }

    async verifyOrderConfirmation(confirmationText: string): Promise<void> {
        await this.assertVisible(this.orderConfirmationMessage);
        await this.assertTextContains(
            this.orderConfirmationMessage,
            confirmationText
        );
    }

    async assertInvoiceNumberPresent(): Promise<void> {
        await this.assertVisible(this.orderNumber);
        const orderNumText = await this.orderNumber.textContent();
        if (!orderNumText || orderNumText.trim() === '') {
            throw new Error(
                'Order number is not present in the confirmation page'
            );
        }
    }

    async getOrderNumber(): Promise<string> {
        return (await this.orderNumber.textContent()) || '';
    }
}
