import { type Locator, type Page, expect } from "@playwright/test";

export class SetConsultationDateTimePage {

    page: Page;
    calendar: Locator;
    dates: Locator;
    timeSlots: Locator;
    selectedDate: Locator;
    selectedDateText: string;

    constructor(page: Page) {
        this.page = page;
        this.calendar = page.locator('.calendar');
        this.dates = page.locator('.row p');
        this.timeSlots = page.locator('div.border').filter({ hasText: ':' });
        this.selectedDate = page.locator('h3.text-left.font-bold');
        this.selectedDateText = '';
    }
    async validateSetDateTimePage(consultationType: string) {
        await expect(this.page.getByText(consultationType)).toBeVisible();
        await expect(this.calendar.first()).toBeVisible();
        await expect(this.timeSlots.first()).toBeVisible();
    }
    async selectFirstAvailableDateAndTime() {
        const availableDates = this.dates.filter({ hasNot: this.page.locator('.cursor-not-allowed') });
        const count = await availableDates.count();
        for (let i = 0; i < count; i++) {
            await availableDates.nth(i).click();
            await expect(this.selectedDate).toBeVisible();
            this.selectedDateText = (await this.selectedDate.innerText()).trim();
            const slotAvailable = await this.timeSlots.first().isVisible();
            if (slotAvailable) {
                await this.timeSlots.first().click();
                break;
            }
        }
    }
    async getSelectedDate() {
        if (this.selectedDateText) {
            return this.selectedDateText;
        }

        // Fallback for flows where date was not captured before transition.
        try {
            await expect(this.selectedDate).toBeVisible();
            this.selectedDateText = (await this.selectedDate.innerText()).trim();
            return this.selectedDateText;
        } catch {
            return '';
        }
    }
    async getAvailableDatesCount() {
        return await this.dates
            .filter({ hasNot: this.page.locator('.cursor-not-allowed') })
            .count();
    }

    async selectDateOnly(index = 0) {
        const availableDates = this.dates
            .filter({ hasNot: this.page.locator('.cursor-not-allowed') });

        await availableDates.nth(index).click();
        await expect(this.selectedDate).toBeVisible();
    }
}