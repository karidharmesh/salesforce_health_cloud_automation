import { test, expect } from '@playwright/test';

test('login to Salesforce', async ({ page }) => {
    await page.goto('https://dfn00000cdypjeav.my.salesforce.com');
    await page.fill('input[name="username"]', 'YOUR_USERNAME');
    await page.fill('input[name="pw"]', 'YOUR_PASSWORD');
    await page.click('input[type="submit"]');
    await expect(page).toHaveURL(/home/);
});