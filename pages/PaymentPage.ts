import { type Locator, type Page, expect } from "@playwright/test";

export class PaymentPage {

    page: Page;
    phoneNumber: Locator;
    merchant: Locator;
    amount: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.phoneNumber = page.locator('span').filter({hasText: "+91"})
        this.merchant = page.locator('.merchant-info');
        this.amount = page.locator('.amount span');
    }
    async validatePaymentPage() {
        await expect(this.page.getByText('Payment Options')).toBeVisible();
        await expect(this.merchant).toBeVisible();
    }
    async validatePaymentDetails(consultationPrice: string) {
        await expect(this.amount.first()).toContainText(consultationPrice);
    }
    async validateFilledPhoneNumber(phoneNumber: string) {
        await expect(this.phoneNumber).toContainText(phoneNumber);
    }
}