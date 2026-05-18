import { BasePage } from '../BasePage';
import { expect, type Locator, type Page } from '@playwright/test';

export class ProfilePage extends BasePage {
    // Navigation / header
    readonly pageTitle: Locator;

    // Profile form fields

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly successBanner: Locator;
    readonly updateButton: Locator;
    readonly navMenu: Locator;

    // Field-level validation errors
    readonly alertMessage: Locator;

    // Password change
    readonly currentPasswordInput: Locator;
    readonly newPasswordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly changePasswordButton: Locator;

    readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('h1').getByText('Profile');

        this.firstNameInput = page.getByTestId('first-name');
        this.lastNameInput = page.getByTestId('last-name');
        this.emailInput = page.getByTestId('email');
        this.phoneInput = page.getByTestId('phone');
        this.successBanner = page.getByTestId('alert-success');
        this.updateButton = page.getByTestId('update-profile-submit');
        this.alertMessage = page.locator('role=alert');
        this.navMenu = page.locator('[data-test="nav-menu"]');

        this.currentPasswordInput = page.getByTestId('current-password');
        this.newPasswordInput = page.getByTestId('new-password');
        this.confirmPasswordInput = page.getByTestId('new-password-confirm');
        this.changePasswordButton = page.getByTestId('change-password-submit');

        this.logoutButton = page.getByTestId('login-submit');
    }

    async navigate(): Promise<void> {
        await this.goto('/account/profile');
        await this.waitForVisible(this.pageTitle);
        await this.waitForPageLoad();
    }

    async verifyConnectedUser(username: string): Promise<void> {
        await this.assertTextContains(this.navMenu, username);
    }

    async verifyUserEmail(expectedEmail: string): Promise<void> {
        await this.assertToHaveValue(this.emailInput, expectedEmail);
    }

    async updateProfileDetails(profile: {
        firstName: string;
        lastName: string;
        phone: string;
    }): Promise<void> {
        await this.firstNameInput.fill(profile.firstName);
        await this.lastNameInput.fill(profile.lastName);
        await this.phoneInput.fill(profile.phone);
        await this.updateButton.click();
    }

    async changePassword(
        currentPassword: string,
        newPassword: string
    ): Promise<void> {
        await this.currentPasswordInput.fill(currentPassword);
        await this.newPasswordInput.fill(newPassword);
        await this.confirmPasswordInput.fill(newPassword);
        await this.changePasswordButton.click();
        await this.waitForPageLoad();
    }

    async verifyAlertMessages(messages: string[]): Promise<void> {
        const alert = this.page.locator('[role="alert"]');

        for (const message of messages) {
            await this.assertTextContains(alert, message);
        }
    }
}
