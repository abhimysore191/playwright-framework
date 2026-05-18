import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path = '/'): Promise<void> {
        await this.page.goto(path);
        await this.waitForPageLoad();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator('#spinner')).toHaveCount(0);
    }

    async assertUrlContains(substring: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(substring));
    }

    async assertVisible(locator: Locator, description?: string): Promise<void> {
        await expect(locator, description).toBeVisible();
    }

    async assertText(locator: Locator, expected: string): Promise<void> {
        await expect(locator).toHaveText(expected, { useInnerText: true });
    }

    async assertCount(locator: Locator, expectedCount: number): Promise<void> {
        await expect(locator).toHaveCount(expectedCount);
    }

    async assertTextContains(
        locator: Locator,
        expected: string
    ): Promise<void> {
        await expect(locator).toContainText(expected);
    }

    async assertToHaveValue(locator: Locator, expected: string): Promise<void> {
        await expect(locator).toHaveValue(expected);
    }

    async assertEnabled(locator: Locator, description?: string): Promise<void> {
        await expect(locator, description).toBeEnabled();
    }

    async assertDisabled(
        locator: Locator,
        description?: string
    ): Promise<void> {
        await expect(locator, description).toBeDisabled();
    }

    async waitForVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
    }

    async asserToBeUnchecked(locator: Locator): Promise<void> {
        await expect(locator).not.toBeChecked();
    }

    async aassertToBeTrue(condition: boolean, message: string): Promise<void> {
        expect(condition, message).toBeTruthy();
    }
}
