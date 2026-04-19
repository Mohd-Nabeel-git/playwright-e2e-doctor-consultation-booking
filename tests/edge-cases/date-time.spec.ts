import { test, expect, type Page } from '@playwright/test';
import { BookConsultationPage } from '../../pages/BookConsultation';
import { SetConsultationDateTimePage } from '../../pages/SetConsultationDateTimePage';

async function goToFillDetailsPage(page: Page) {
    const bookConsultationPage = new BookConsultationPage(page);
    await bookConsultationPage.goTo();
    const consultationTypes = await bookConsultationPage.getConsultationCardTitles();
    await bookConsultationPage.bookConsultation(consultationTypes[1]);
}


test.describe('Date-Time edge cases', () => {

    test.beforeEach(async ({ page }) => {
        await goToFillDetailsPage(page);
    });

    test('Should not proceed when only date is selected', async ({ page }) => {
        const dateTimePage = new SetConsultationDateTimePage(page);
        await dateTimePage.selectDateOnly();
        await expect(page.getByText('Your Details')).not.toBeVisible();
    });

    test('Should proceed when time slot is selected', async ({ page }) => {
        const dateTimePage = new SetConsultationDateTimePage(page);
        await dateTimePage.selectFirstAvailableDateAndTime();
        await expect(page.getByText('Your Details').first()).toBeVisible();
    });
});