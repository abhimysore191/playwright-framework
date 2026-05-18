import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class HomePage extends BasePage {
    // Locators
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productCards: Locator;
    readonly productName: Locator;
    readonly allProductCards: Locator;
    readonly resetFiltersButton: Locator;
    readonly paginationContainer: Locator;
    readonly paginationNextButton: Locator;
    readonly paginationPrevButton: Locator;
    readonly pageNumbers: Locator;

    constructor(page: Page) {
        super(page);

        this.searchInput = page.locator('#search-query');
        this.productCards = page.locator('[data-test^="product-"]');
        this.productName = page.getByTestId('product-name');
        this.searchButton = page.getByTestId('search-submit');
        this.allProductCards = page.locator('.card[data-test^="product-"]');
        this.resetFiltersButton = page.getByTestId('search-reset');
        this.paginationContainer = page.locator('.pagination');
        this.paginationNextButton = page.getByTestId('pagination-next');
        this.paginationPrevButton = page.getByTestId('pagination-prev');
        this.pageNumbers = page.locator('.pagination .page-link');
    }

    async navigate(): Promise<void> {
        await this.goto('/#/');
        await this.waitForVisible(this.productCards.first());
    }

    getCategoryCheckbox(categoryName: string): Locator {
        return this.page.locator('.checkbox label', {
            hasText: categoryName
        });
    }

    async verifyFilterOptionsVisible(categories: string[]): Promise<void> {
        for (const category of categories) {
            const checkbox = this.getCategoryCheckbox(category);
            await this.assertVisible(
                checkbox,
                `Expected filter option for category "${category}" to be visible`
            );
        }
    }

    getProductCard(productName: string) {
        return this.page.locator('a.card', {
            has: this.page.locator('[data-test="product-name"]', {
                hasText: new RegExp(`^\\s*${productName}\\s*$`)
            })
        });
    }

    async resetFilters(): Promise<void> {
        await this.waitForVisible(this.resetFiltersButton);
        await this.resetFiltersButton.click();
        await this.waitForVisible(this.allProductCards.first());
    }

    async verifyCategoryFilterIsUnchecked(categoryName: string): Promise<void> {
        const checkbox = this.getCategoryCheckbox(categoryName).locator(
            'input[type="checkbox"]'
        );
        await this.asserToBeUnchecked(checkbox);
    }

    async clickonCatergory(categoryName: string): Promise<void> {
        const checkbox = this.getCategoryCheckbox(categoryName);
        await this.waitForVisible(checkbox);
        await checkbox.click();
    }

    async search(query: string): Promise<void> {
        await this.waitForVisible(this.searchInput);
        await this.searchInput.fill(query);
        await this.waitForVisible(this.searchButton);
        await this.searchButton.click();
        const card = this.getProductCard(query);
        await this.assertVisible(
            card,
            `Expected at least one product card to appear for query: "${query}"`
        );
    }

    async checkFilteredResultsContainProduct(
        productName: string
    ): Promise<void> {
        const card = this.getProductCard(productName);
        await this.assertVisible(
            card,
            `Expected to find product "${productName}" in filtered results, but it was not visible.`
        );
    }

    async clickFirstInStockProduct(): Promise<string> {
        const cards = this.productCards;
        const count = await cards.count();

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);

            const outOfStock = await card
                .locator('[data-test="out-of-stock"]')
                .count();

            if (outOfStock === 0) {
                const nameLocator = card.locator('[data-test="product-name"]');
                const productName =
                    (await nameLocator.textContent())?.trim() ?? '';
                await card.click();
                await this.waitForPageLoad();
                return productName;
            }
        }
        throw new Error('No in-stock product found');
    }

    async verifyProductInFilteredResults(productName: string): Promise<void> {
        const names = await Promise.all(
            (await this.productCards.all()).map(async (card) =>
                (
                    await card.locator('[data-test="product-name"]').innerText()
                ).trim()
            )
        );
        const allMatch = names.every((name) =>
            name.toLowerCase().includes(productName.toLowerCase())
        );

        await this.aassertToBeTrue(
            allMatch,
            `Expected ALL filtered products to match "${productName}", but got: ${names.join(', ')}`
        );
    }

    async checkProductDetailsInFilteredResults(): Promise<void> {
        const cards = this.productCards;
        const count = await cards.count();

        for (let i = 0; i < count; i++) {
            const card = this.productCards.nth(i);

            const listName = (
                await card.locator('[data-test="product-name"]').innerText()
            ).trim();

            await card.click();
            await this.waitForPageLoad();

            const detailName = (
                await this.page
                    .locator('[data-test="product-name"]')
                    .innerText()
            ).trim();

            await this.aassertToBeTrue(
                listName.toLowerCase() === detailName.toLowerCase(),
                `Mismatch: ${listName} vs ${detailName}`
            );

            await this.page.goBack();
            await this.waitForPageLoad();
        }

        throw new Error('No filtered products found');
    }

    async openProductByName(productName: string): Promise<void> {
        const card = this.getProductCard(productName);
        await this.waitForVisible(card);
        await card.click();
        await this.waitForPageLoad();
    }

    async verifyPaginationControls(): Promise<void> {
        await this.assertVisible(
            this.paginationContainer,
            'Expected pagination controls to be visible'
        );
        await this.assertVisible(
            this.paginationNextButton,
            'Expected "Next" pagination button to be visible'
        );
    }

    async goToPage(pageNumber: number): Promise<void> {
        await this.page.locator(`a[aria-label="Page-${pageNumber}"]`).click();
    }

    async getPageCount(): Promise<number> {
        const pageCount = await this.pageNumbers.count();
        return pageCount - 2; // Subtract "Previous" and "Next" buttons
    }

    async verifyPreButtonDisabledOnFirstPage(): Promise<void> {
        this.assertDisabled(this.paginationPrevButton.locator('..'));
    }

    async verifyNextButtonDisabledOnLastPage(): Promise<void> {
        this.assertDisabled(this.paginationNextButton.locator('..'));
    }
}
