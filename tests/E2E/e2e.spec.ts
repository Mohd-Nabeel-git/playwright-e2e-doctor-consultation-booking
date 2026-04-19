import { test, expect } from '@playwright/test';
import { BookConsultationPage } from '../../pages/BookConsultation';
import { SetConsultationDateTimePage } from '../../pages/SetConsultationDateTimePage';
import { FillDetailsPage } from '../../pages/FillDetailsPage';
import { PaymentPage } from '../../pages/PaymentPage';
import userData from '../fixtures/positiveTestData.json';

test.describe('E2E Checkout Flow', () => {
    test('E2E: user can book consultation and reach payment page', async ({ page }) => {
        // Navigating to the consultation booking page and booking a consultation
        const bookConsultationPage = new BookConsultationPage(page);
        await bookConsultationPage.goTo();
        await bookConsultationPage.validateConsultationPage();
        const consultationTitles = await bookConsultationPage.getConsultationCardTitles();
        const consultationPrice = await bookConsultationPage.getSelectedConsultationTypePrice(consultationTitles[0]);
        console.log('Available Consultations:', consultationTitles);
        console.log('Selected Consultation Price:', consultationPrice);
        await bookConsultationPage.bookConsultation(consultationTitles[0]);

        // Setting the consultation date and time
        const setDateTimePage = new SetConsultationDateTimePage(page);
        await setDateTimePage.validateSetDateTimePage(consultationTitles[0]);
        await setDateTimePage.selectFirstAvailableDateAndTime();
        const selectedDate = await setDateTimePage.getSelectedDate();
        console.log('Selected Consultation Date:', selectedDate);

        // Filling in the consultation details
        const fillDetailsPage = new FillDetailsPage(page);
        await fillDetailsPage.validateFillDetailsPage(selectedDate);
        let user = userData.validUser;
        await fillDetailsPage.fillConsultationDetails(user.name, user.email, user.phone, user.problem);
        await fillDetailsPage.uploadPrescription(user.filePath);
        await fillDetailsPage.clickProceedToPay();

        // Validating the payment page and details
        const paymentPage = new PaymentPage(page);
        await paymentPage.validatePaymentPage();
        await paymentPage.validatePaymentDetails(consultationPrice);
        await paymentPage.validateFilledPhoneNumber(user.phone);
    });
});