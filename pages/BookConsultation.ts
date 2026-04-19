import { type Locator, type Page, expect } from "@playwright/test";

export class BookConsultationPage {

    page: Page;
    consulationCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.consulationCards = page.getByRole('button', {name: 'Book now'}).locator('..').locator('..');
    }
    async goTo() {
        await this.page.goto('https://ayuvya.com/online-doctor-consultation');
    }
    async validateConsultationPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/online-doctor-consultation/);
        await expect(this.page.getByText('Talk to an Ayurvedic Expert')).toBeVisible();
        await expect(this.consulationCards.first()).toBeVisible();
    }
    async getConsultationCardTitles() {
        const titles = await this.consulationCards.locator('h3,h4,h5').allTextContents();
        return titles.map((title) => title.trim()).filter(Boolean);
    }
    async bookConsultation(consultationType: string) {
        await this.consulationCards.filter({ hasText: consultationType }).getByRole('button', { name: 'Book now' }).click();
    }
    async getSelectedConsultationTypePrice(consultationType: string) {
        const card = this.consulationCards.filter({ hasText: consultationType });
        const priceElement = await card.locator('p').textContent();
        return priceElement?.trim() ?? '';
    }
}