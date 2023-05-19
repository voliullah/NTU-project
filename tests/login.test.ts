import {test ,expect ,chromium} from '@playwright/test'
import { locator } from './data/locator';
import { testData } from './data/testData';


test('Login in to the page with right credentials and see if its being logged in ', async ({ page }) => {
    // Go to the login page
    await page.goto(locator.BaseURL);
  
    // Enter username and password
    await page.fill(locator.email, testData.Login.username);
    await page.fill(locator.password, testData.Login.password);
  
    // Click the login button
    await page.click(locator.loginButton);
  
    // Wait for navigation to complete
    await page.waitForNavigation();
  
    // Check if login was successful
    const loggedInUsername = await page.innerText(locator.jensAndSuperAdminText);
    expect(loggedInUsername).toContain('jens');
})
