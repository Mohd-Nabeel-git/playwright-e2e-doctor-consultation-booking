![Playwright Tests](https://github.com/Mohd-Nabeel-git/playwright-e2e-doctor-consultation-booking/actions/workflows/playwright.yml/badge.svg)

# Playwright E2E Doctor Consultation Booking

Production-ready end-to-end test automation framework built with Playwright and TypeScript to validate a doctor consultation booking SPA, including edge-case coverage and CI integration.

## Features

- End-to-end automation for complete booking workflow
- Page Object Model (POM) structure for maintainability
- Data-driven testing using JSON fixtures
- Edge-case validation for date/time and form details
- File upload validation checks
- UI-based assertions for SPA behavior
- GitHub Actions CI integration
- HTML reports with trace viewer support

## Tech Stack

- Automation: Playwright
- Language: TypeScript
- Runtime: Node.js
- Pattern: Page Object Model (POM)
- CI/CD: GitHub Actions

## Project Structure

```text
.
|-- pages/
|   |-- BookConsultation.ts
|   |-- FillDetailsPage.ts
|   |-- PaymentPage.ts
|   `-- SetConsultationDateTimePage.ts
|-- tests/
|   |-- E2E/
|   |   `-- e2e.spec.ts
|   |-- edge-cases/
|   |   |-- date-time.spec.ts
|   |   `-- fill-details.spec.ts
|   `-- fixtures/
|       |-- negativeTestData.json
|       |-- positiveTestData.json
|       `-- sample.pdf
|-- screenshots/
|   |-- ci-success.png
|   |-- form-validation.png
|   |-- test-results.png
|   `-- trace-view.png
|-- playwright.config.ts
|-- package.json
`-- tsconfig.json
```

## Test Coverage

### End-to-End Flow

Validates the complete booking journey:

1. Select consultation
2. Choose date and time slot
3. Fill user details with validation
4. Proceed to payment page

### Edge Cases

#### Date and Time Selection

- Prevent continuing without selecting a slot
- Allow continuing with a valid slot

#### Fill Details Validation

- Empty name
- Name with only spaces
- Invalid email format
- Email without domain extension
- Empty phone number
- Short phone number

#### Optional Fields

- Optional email handling
- Prescription upload validation

## Special Challenges Handled

### SPA Navigation Behavior

- Application is a single page app (SPA)
- URL does not change across steps
- Tests use UI-state assertions instead of URL assertions

### Payment Gateway Limitation

- Uses third-party Cashfree payment gateway
- Payment step is triggered and partially validated
- Strict payment completion assertions are avoided in CI due to external dependency behavior

## Run Tests Locally

```bash
# install dependencies
npm install

# install Playwright browsers
npx playwright install

# run all tests
npx playwright test

# open HTML report
npx playwright show-report
```

## CI/CD Integration

- Integrated with GitHub Actions
- Runs tests on push events
- Publishes HTML report artifacts
- Designed for stable CI execution

Workflow: `.github/workflows/playwright.yml`

## Screenshots

### Test Execution Report

![Test Results](./screenshots/test-results.png)

### Trace Viewer

![Trace Viewer](./screenshots/trace-view.png)

### Fill Details Validation

![Form Validation](./screenshots/form-validation.png)

### GitHub Actions CI Success

![CI Pipeline](./screenshots/ci-success.png)

## Key Highlights

- Real-world SPA automation scenario
- Complex UI flow validation without URL dependency
- Data-driven and negative testing strategy
- Scalable page object architecture
- CI/CD pipeline integration
- Modular and reusable test design

## Author

Mohd Nabeel

- GitHub: https://github.com/Mohd-Nabeel-git
- LinkedIn: https://www.linkedin.com/in/mohd-nabeel-18231a319/