import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class BillingAddressPage extends BasePage {
    // Locators for billing address form fields
    readonly countryDropdown: Locator;
    readonly postalCodeInput: Locator;
    readonly houseNumberInput: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly proceedToCheckoutBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.countryDropdown = page.getByTestId('country');
        this.postalCodeInput = page.getByTestId('postal_code');
        this.houseNumberInput = page.getByTestId('house_number');
        this.streetInput = page.getByTestId('street');
        this.cityInput = page.getByTestId('city');
        this.stateInput = page.getByTestId('state');
        this.proceedToCheckoutBtn = page.getByTestId('proceed-3');
    }

    async fillBillingAddress(billingAddress: {
        country: string;
        postalCode: string;
        houseNumber: string;
        street: string;
        city: string;
        state: string;
    }): Promise<void> {
        await this.countryDropdown.selectOption(billingAddress.country);
        await this.postalCodeInput.fill(billingAddress.postalCode);
        await this.houseNumberInput.fill(billingAddress.houseNumber);
        await this.streetInput.fill(billingAddress.street);
        await this.cityInput.fill(billingAddress.city);
        await this.stateInput.fill(billingAddress.state);
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutBtn.click();
        await this.waitForPageLoad();
    }
}
