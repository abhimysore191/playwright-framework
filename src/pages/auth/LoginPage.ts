import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * LoginPage: models the login page functionality.
 *
 * Responsibilities:
 * - Navigate to login page
 * - Fill login credentials
 * - Submit login form
 */
export class LoginPage extends BasePage {
    // Locators
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly myAccountTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
        this.loginError = page.getByTestId('login-error');
        this.myAccountTitle = page.getByTestId('page-title');
    }

    // Actions
    async navigate(): Promise<void> {
        await this.goto('/auth/login');
        await this.waitForVisible(this.emailInput);
    }

    async login(email: string, password: string): Promise<void> {
        await this.waitForPageLoad();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.waitForPageLoad();
        await this.loginButton.click();
        await this.assertText(this.myAccountTitle, 'My account');
    }
}
