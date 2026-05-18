import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

import { CURRENCY_REGEX } from '../../utils/testData';

export interface ProductDetails {
    name: string;
    description: string;
    price: string;
}

/**
 * ProductDetailPage — models the individual product page at `/#/product/{id}`.
 *
 * Responsibilities:
 *  - Expose every meaningful element as a named Locator
 *  - Provide action methods (addToCart, etc.)
 *  - Provide assertion helpers specific to the product detail page
 */
export class ProductDetailPage extends BasePage {
    //Locators

    readonly productName: Locator;

    readonly productDescription: Locator;

    readonly productPrice: Locator;

    readonly productImage: Locator;

    readonly addToCartButton: Locator;

    readonly quantityInput: Locator;

    readonly breadcrumb: Locator;

    readonly successToast: Locator;

    readonly increaseQtyButton: Locator;

    constructor(page: Page) {
        super(page);

        this.productName = page.getByTestId('product-name');
        this.productImage = page.getByTestId('product-image');
        this.productDescription = page.getByTestId('product-description');
        this.productPrice = page.getByTestId('unit-price');
        this.addToCartButton = page.getByTestId('add-to-cart');
        this.quantityInput = page.getByTestId('quantity');
        this.breadcrumb = page.getByTestId('[breadcrumb');
        this.successToast = page.locator('.toast-message');
        this.increaseQtyButton = page.locator('#btn-increase-quantity');
    }

    // Actions

    getProductImage(value: string) {
        return this.page.getByAltText(value);
    }

    getProductImageByAlt(alt: string) {
        return this.page.locator(`img[alt="${alt}"]`);
    }

    async navigateById(productId: number): Promise<void> {
        await this.goto(`/#/product/${productId}`);
        await this.waitForVisible(this.productName);
    }

    async addToCart(): Promise<void> {
        await this.waitForVisible(this.addToCartButton);
        await this.addToCartButton.click();
        // Wait for the toast to confirm the add was accepted
        await this.waitForVisible(this.successToast);
    }

    async setQuantity(qty: number): Promise<void> {
        await this.quantityInput.fill(String(qty));
    }

    // Data accessors

    async getProductDetails(): Promise<ProductDetails> {
        const [name, description, price] = await Promise.all([
            this.productName.innerText(),
            this.productDescription.innerText(),
            this.productPrice.innerText()
        ]);

        return {
            name: name.trim(),
            description: description.trim(),
            price: price.trim()
        };
    }

    async assertProductImage(productName: string): Promise<void> {
        await this.assertVisible(
            this.getProductImageByAlt(productName),
            'Product image should be visible'
        );
        const isLoaded = await this.getProductImageByAlt(productName).evaluate(
            (img: any) => {
                return img.complete && img.naturalWidth > 0;
            }
        );

        expect(isLoaded, 'Product image should be fully loaded').toBeTruthy();
    }

    async assertProductNameNotEmpty(): Promise<void> {
        const name = await this.productName.innerText();
        expect(
            name.trim().length,
            'Product name should not be empty'
        ).toBeGreaterThan(0);
    }

    async assertProductName(productName: string): Promise<void> {
        const name = await this.productName.innerText();
        expect(name).toEqual(productName);
    }

    async assertProductDescriptionNotEmpty(): Promise<void> {
        const desc = await this.productDescription.innerText();
        expect(
            desc.trim().length,
            'Product description should not be empty'
        ).toBeGreaterThan(0);
    }

    async assertProductDescriptionHasMinLength(
        description: string,
        min_length: number
    ): Promise<void> {
        expect(
            description.length,
            `Description should be at least ${min_length} characters`
        ).toBeGreaterThanOrEqual(min_length);
    }

    async assertPriceFormat(): Promise<void> {
        const price = (await this.productPrice.innerText()).trim();
        expect(price, `Price "${price}" should match currency format`).toMatch(
            CURRENCY_REGEX
        );
    }

    async assertAddToCartButtonReady(): Promise<void> {
        await this.assertVisible(
            this.addToCartButton,
            '"Add to Cart" should be visible'
        );
        await this.assertEnabled(
            this.addToCartButton,
            '"Add to Cart" should be enabled'
        );
    }

    async assertOnProductPage(): Promise<void> {
        await this.assertUrlContains('/product/');
    }

    async assertSuccessToastContains(message: string): Promise<void> {
        await expect(this.successToast).toContainText(message);
    }

    async navigateBack(): Promise<void> {
        await this.page.goBack();
    }
}
