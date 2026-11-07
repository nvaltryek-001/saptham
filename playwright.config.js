import { defineConfig, devices } from '@playwright/test';

// Set CHROMIUM_PATH only if you must use a custom Chromium binary; otherwise run `npx playwright install chromium`.
const custom = process.env.CHROMIUM_PATH;
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  expect: { timeout: 7000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
    launchOptions: custom ? { executablePath: custom, args: ['--no-sandbox', '--disable-gpu'] } : {},
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
