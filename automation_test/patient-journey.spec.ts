import { test, expect } from '@playwright/test';

test('patient journey', async ({ page }) => {
    // Login first
    await page.goto('https://login.salesforce.com/');
    await page.fill('input[name="username"]', 'YOUR_USERNAME');
    await page.fill('input[name="pw"]', 'YOUR_PASSWORD');
    await page.click('input[type="submit"]');
    
    // Example patient journey steps
    await page.click('text=Patients');
    await page.click('text=New Patient');
    await page.fill('input[name="FirstName"]', 'John');
    await page.fill('input[name="LastName"]', 'Doe');
    await page.click('button:has-text("Save")');

    // Verify patient created
    await expect(page.locator('text=John Doe')).toBeVisible();
});