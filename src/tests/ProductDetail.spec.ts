import { test, expect } from '../fixtures/pages';
import { SEARCH_PRODUCT, MIN_DESCRIPTION_LENGTH } from '../utils/testData';

test.describe('Feature: View Product Details', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
        await homePage.search(SEARCH_PRODUCT.query);
        await homePage.openProductByName(SEARCH_PRODUCT.name);
    });

    test('Searching for a product and clicking it opens the correct detail page', async ({
        page,
        productDetailPage
    }) => {
        await productDetailPage.assertOnProductPage();
        await productDetailPage.assertProductName(SEARCH_PRODUCT.name);
    });

    test('Detail page displays name, description, price, and product image', async ({
        productDetailPage
    }) => {
        const details = await productDetailPage.getProductDetails();

        await productDetailPage.assertProductNameNotEmpty();
        await productDetailPage.assertProductName(SEARCH_PRODUCT.name);

        await productDetailPage.assertProductDescriptionNotEmpty();
        await productDetailPage.assertProductDescriptionHasMinLength(
            details.description,
            MIN_DESCRIPTION_LENGTH
        );

        await productDetailPage.assertPriceFormat();

        await productDetailPage.assertProductImage(SEARCH_PRODUCT.name);
    });

    test('"Add to Cart" button is visible, enabled, and confirms the action', async ({
        productDetailPage
    }) => {
        await productDetailPage.assertAddToCartButtonReady();
        await productDetailPage.addToCart();
        await productDetailPage.assertSuccessToastContains(
            'Product added to shopping cart.'
        );
    });

    test('browser back navigation returns to the product listing', async ({
        homePage,
        productDetailPage
    }) => {
        await productDetailPage.navigateBack();
        await homePage.waitForPageLoad();
        await expect(homePage.productCards.first()).toBeVisible();
    });
});
