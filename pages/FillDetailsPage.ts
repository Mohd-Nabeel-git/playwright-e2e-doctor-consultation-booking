import { type Locator, type Page, expect } from "@playwright/test";

export class FillDetailsPage {

    page: Page;
    form: Locator;
    Name: Locator;
    Email: Locator;
    PhoneNumber: Locator;
    Problem: Locator
    uploadFile: Locator;
    paymentBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.form = page.locator('form');
        this.Name = page.getByLabel('Name');
        this.Email = page.getByLabel('Email Address');
        this.PhoneNumber = page.getByLabel('Phone Number');
        this.Problem = page.getByLabel('Problem');
        this.uploadFile = page.locator('#file');
        this.paymentBtn = page.getByRole('button', { name: 'PROCEED TO PAY ₹200' });
    }
    async validateFillDetailsPage(selectedDate: string) {
        const normalizedDate = new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
        await expect(this.page.getByText(normalizedDate, { exact: true })).toBeVisible();
        await expect(this.form.first()).toBeVisible();
    }
    async fillConsultationDetails(name: string, email: string, phoneNumber: string, problem: string) {
        await this.Name.fill(name);
        await this.Email.fill(email);
        await this.PhoneNumber.fill(phoneNumber);
        await this.Problem.fill(problem);
    }
    async uploadPrescription(filePath: string) {
        await this.uploadFile.setInputFiles(filePath);
        const fileCount = await this.uploadFile.evaluate((input) => (input as HTMLInputElement).files?.length ?? 0);
        expect(fileCount).toBe(1);
    }
    async clickProceedToPay() {
        await expect(this.paymentBtn).toBeEnabled();
        await this.paymentBtn.click();
    }
    async validateErrorMessages(expectedErrors: { name?: string; email?: string; phoneNumber?: string; }) {
        if (expectedErrors.name) {
            await expect(this.page.getByText(expectedErrors.name)).toBeVisible();
        }
        if (expectedErrors.email) {
            await expect(this.page.getByText(expectedErrors.email)).toBeVisible();
        }
        if (expectedErrors.phoneNumber) {
            await expect(this.page.getByText(expectedErrors.phoneNumber)).toBeVisible();
        }
    }
    async validateNavigationToPaymentPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/cashfree/, { timeout: 15000 });
    }
}