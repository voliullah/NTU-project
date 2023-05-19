import {test ,expect ,chromium} from '@playwright/test'
const baseURL = 'http://54.154.82.253:3001/';

test('Login in to the page with right credentials and see if its being logged in ', async ({ page }) => {
    // Go to the login page
    await page.goto(baseURL);
  
    // Enter username and password
    await page.fill('input[type=email]', 'jens@gmail.com');
    await page.fill('input[type=password]', '123456');
  
    // Click the login button
    await page.click('button[type=submit]');
  
    // Wait for navigation to complete
    await page.waitForNavigation();
  
    // Check if login was successful
    const loggedInUsername = await page.innerText('//div[@class="pt-1 col-md-8"]//ul//li');
    expect(loggedInUsername).toBe('jens');
})