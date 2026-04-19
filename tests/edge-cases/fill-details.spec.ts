import { test, expect, type Page } from '@playwright/test';
import { BookConsultationPage } from '../../pages/BookConsultation';
import { SetConsultationDateTimePage } from '../../pages/SetConsultationDateTimePage';
import { FillDetailsPage } from '../../pages/FillDetailsPage';
import dataSet from '../fixtures/negativeTestData.json';
import userData from '../fixtures/positiveTestData.json';

async function goToFillDetailsPage(page: Page) {
    const bookConsultationPage = new BookConsultationPage(page);
    const setConsultationDateTimePage = new SetConsultationDateTimePage(page);
    await bookConsultationPage.goTo();
    const consultationTypes = await bookConsultationPage.getConsultationCardTitles();
    await bookConsultationPage.bookConsultation(consultationTypes[1]);
    await setConsultationDateTimePage.selectFirstAvailableDateAndTime();
}


test.describe('Fill-Details Negative Scenarios', () => {

    test.beforeEach(async ({ page }) => {
        await goToFillDetailsPage(page);
    });

    for (const data of dataSet.invalidUsers) {
        test(`Checkout validation: ${data.scenario}`, async ({ page }) => {
            const fillDetailsPage = new FillDetailsPage(page);
            await fillDetailsPage.fillConsultationDetails(data.name, data.email, data.phone, data.problem);
            await fillDetailsPage.uploadPrescription(data.filePath);
            await fillDetailsPage.clickProceedToPay();
            await fillDetailsPage.validateErrorMessages({
                name: data.error.includes('Name') ? data.error : undefined,
                email: data.error.includes('email') ? data.error : undefined,
                phoneNumber: data.error.includes('Phone') ? data.error : undefined,
            });
        });
    }
});

test.describe('Fill-Details Positive Scenarios', () => {

    test.beforeEach(async ({ page }) => {
        await goToFillDetailsPage(page);
    });

    test('Fill Details validation: empty email', async ({ page }) => {
        const fillDetailsPage = new FillDetailsPage(page);
        const user = userData.emptyEmailUser;
        await fillDetailsPage.fillConsultationDetails(user.name, user.email, user.phone, user.problem);
        await fillDetailsPage.uploadPrescription(user.filePath);
        await fillDetailsPage.clickProceedToPay();
        await expect(page.getByText('Payment Options')).toBeVisible();
    });

    test('Fill Details validation: empty file upload', async ({ page }) => {
        const fillDetailsPage = new FillDetailsPage(page);
        const user = userData.noFileUploadUser;
        await fillDetailsPage.fillConsultationDetails(user.name, user.email, user.phone, user.problem);
        await fillDetailsPage.clickProceedToPay();
        await expect(page.getByText('Payment Options')).toBeVisible();
    });

    test('Fill Details validation: empty email and file upload', async ({ page }) => {
        const fillDetailsPage = new FillDetailsPage(page);
        const user = userData.emptyEmailNoFileUser;
        await fillDetailsPage.fillConsultationDetails(user.name, user.email, user.phone, user.problem);
        await fillDetailsPage.clickProceedToPay();
        await expect(page.getByText('Payment Options')).toBeVisible();
    });
});