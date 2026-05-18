import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class CartPage extends BasePage {
    readonly proceedToCheckoutBtn: Locator;
    readonly proceedToCheckoutBtnLoggedIn: Locator;
    readonly continueShoppingBtn: Locator;
    readonly cartTotal: Locator;
    readonly productTitles: Locator;

    constructor(page: Page) {
        super(page);

        this.proceedToCheckoutBtn = page.getByTestId('proceed-1');
        this.continueShoppingBtn = page.getByTestId('continue-shopping');
        this.cartTotal = page.getByTestId('cart-total');
        this.proceedToCheckoutBtnLoggedIn = page.getByTestId('proceed-2');
        this.productTitles = page.getByTestId('product-title');
    }

    async navigate(): Promise<void> {
        await this.goto('/checkout');
        await this.waitForPageLoad();
    }

    getProductRow(productName: string): Locator {
        return this.page.locator('tbody tr', {
            has: this.page.locator('[data-test="product-title"]', {
                hasText: productName
            })
        });
    }

    getQuantityInput(productName: string): Locator {
        return this.getProductRow(productName).locator(
            '[data-test="product-quantity"]'
        );
    }

    getProductPrice(productName: string): Locator {
        return this.getProductRow(productName).locator(
            '[data-test="product-price"]'
        );
    }

    getLinePrice(productName: string): Locator {
        return this.getProductRow(productName).locator(
            '[data-test="line-price"]'
        );
    }

    async getProductPriceValue(productName: string): Promise<string> {
        return await this.getProductPrice(productName).innerText();
    }

    async getLinePriceValue(productName: string): Promise<string> {
        return await this.getLinePrice(productName).innerText();
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutBtn.click();
    }

    async verifyUserAlreadyLoggedIn(): Promise<void> {
        await this.assertVisible(
            this.page.locator('p', {
                hasText: 'you are already logged in'
            })
        );
        await this.assertVisible(this.proceedToCheckoutBtnLoggedIn);
        await this.assertEnabled(this.proceedToCheckoutBtnLoggedIn);
    }

    async proceedToCheckoutLoggedIn(): Promise<void> {
        await this.proceedToCheckoutBtnLoggedIn.click();
        await this.waitForPageLoad();
    }

    async verifyCartIsEmpty() {
        await this.assertCount(this.productTitles, 0);
    }
}
