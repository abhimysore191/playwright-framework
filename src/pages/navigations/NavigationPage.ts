import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class NavigationPage extends BasePage {
    // User menu
    readonly userMenuButton: Locator;
    readonly myProfileLink: Locator;

    constructor(page: Page) {
        super(page);
        this.userMenuButton = page.getByTestId('nav-menu');
        this.myProfileLink = page.getByTestId('nav-my-profile');
    }

    async openUserMenu() {
        await this.userMenuButton.click();
    }

    async goToProfile() {
        await this.openUserMenu();
        await this.myProfileLink.click();

        await expect(this.page).toHaveURL(/.*account\/profile/);
    }
}
