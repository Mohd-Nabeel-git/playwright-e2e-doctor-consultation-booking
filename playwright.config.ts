import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 10000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        video: 'retain-on-failure',
      },
    }
  ]
});
