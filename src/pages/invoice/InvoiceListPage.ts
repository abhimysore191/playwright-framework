import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class InvoiceListPage extends BasePage {
    readonly pageTitle: Locator;
    readonly invoiceTable: Locator;
    readonly invoiceRows: Locator;
    readonly previousPageButton: Locator;
    readonly nextPageButton: Locator;

    constructor(page: Page) {
        super(page);

        this.pageTitle = page.getByTestId('page-title');
        this.invoiceTable = page.locator('table');
        this.invoiceRows = page.locator('tbody tr');
        this.previousPageButton = page.getByTestId('pagination-prev');
        this.nextPageButton = page.getByTestId('pagination-next');
    }

    async goToInvoices() {
        await this.page.goto('/account/invoices');
    }

    async verifyPageLoaded(): Promise<void> {
        await this.assertText(this.pageTitle, 'Invoices');
    }

    async verifyInvoicesDisplayed(): Promise<void> {
        await this.assertVisible(this.invoiceRows.first());
    }

    getInvoiceRow(invoiceNumber: string): Locator {
        return this.page.locator('tbody tr', {
            hasText: invoiceNumber
        });
    }

    getInvoiceDetailsButton(invoiceNumber: string): Locator {
        return this.getInvoiceRow(invoiceNumber).getByRole('link', {
            name: 'Details'
        });
    }

    async openInvoiceDetails(invoiceNumber: string): Promise<void> {
        await this.getInvoiceDetailsButton(invoiceNumber).click();
    }

    async verifyInvoiceExists(invoiceNumber: string): Promise<void> {
        await this.assertVisible(
            this.getInvoiceRow(invoiceNumber).first(),
            `Expected to find invoice with number: ${invoiceNumber}`
        );
    }

    async verifyInvoiceTotal(
        invoiceNumber: string,
        expectedTotal: string
    ): Promise<void> {
        await this.assertTextContains(
            this.getInvoiceRow(invoiceNumber).first(),
            expectedTotal
        );
    }

    async goToNextPage(): Promise<void> {
        await this.nextPageButton.click();
    }

    async goToPreviousPage(): Promise<void> {
        await this.previousPageButton.click();
    }

    async goToPage(pageNumber: number): Promise<void> {
        await this.page
            .getByRole('link', { name: `Page-${pageNumber}` })
            .click();
    }
}
