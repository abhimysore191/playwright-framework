import { test, expect } from '../fixtures/pages';

import { HomePage } from '../pages/products/HomePage';
test.describe('Verify filter functionality', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
    });
    test(' Category filters are visible on the products page', async ({
        homePage
    }) => {
        await homePage.verifyFilterOptionsVisible([
            'Hammer',
            'Screwdriver',
            'Wrench'
        ]);
    });

    test('Selecting "Hand Tools" updates the product list to show only Hand Tools', async ({
        homePage
    }) => {
        await homePage.clickonCatergory('Hammer');
        await homePage.checkFilteredResultsContainProduct('Hammer');
    });

    test('Check reset filter functionality', async ({ homePage }) => {
        await homePage.clickonCatergory('Screwdriver');
        await homePage.resetFilters();
        await homePage.verifyCategoryFilterIsUnchecked('Screwdriver');
    });

    test('Pagination controls are rendered when there are multiple pages', async ({
        homePage
    }) => {
        await homePage.verifyPaginationControls();
    });

    test('TC-US3-14 (edge): "Previous" button is disabled on the first page', async ({
        homePage
    }) => {
        await homePage.goToPage(1);
        await expect(homePage.paginationPrevButton.locator('..')).toHaveClass(
            /disabled/
        );
    });

    test('TC-US3-15 (edge): "Next" button is disabled on the last page', async ({
        homePage
    }) => {
        await homePage.goToPage(await homePage.getPageCount()); // Navigate to the last page
        await expect(homePage.paginationNextButton.locator('..')).toHaveClass(
            /disabled/
        );
    });
});
