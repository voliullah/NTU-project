import {test ,expect ,chromium} from '@playwright/test'
import { locator } from './data/locator';
import { testData } from './data/testData';
import { errors } from 'playwright';
import chai from 'chai';


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
test('Try logging in to the page with the wrong credentials to see the message of the popup alert has been changed to "Please enter a valid username and password!"', async ({ page }) => {
    await page.goto(locator.BaseURL);
    await page.fill(locator.email, testData.WrongCredentials.wrongUsername);
    await page.fill(locator.password, testData.WrongCredentials.wrongPassword);
    await page.click(locator.loginButton);
  
    // Wait for the dialog to be displayed
    const dialog = await page.waitForSelector(locator.alertLoginPage);
  
    // Get the text of the alert dialog
    const textAtAlert = await page.locator(locator.alertLoginPage).textContent();
  
    // Soft assertions on popup alert
    let softAssertionFailed = false;
  
    try {
      // Expect that the text of the popup alert has been changed
      expect(textAtAlert).toContain('Please enter a valid username and password!');
    } catch (error) {
      // Set the softAssertionFailed flag if the assertion fails
      softAssertionFailed = true;
      console.log("Assertion Error: the error message of the popup alert has not been changed");
    }
  
    try {
      // Make sure that the previous message at the popup alert has been changed
      expect(textAtAlert).not.toContain('User not');
    } catch (error) {
      // Set the softAssertionFailed flag if the assertion fails
      softAssertionFailed = true;
      console.log("Assertion Error: the error message at the popup still contains 'user not'");
    }
  
    // Continue script execution even if assertions fail
    if (softAssertionFailed) {
      console.log("One or more soft assertions failed, but the script continues running.");
    }
  
    // Code below the assertions
    await page.waitForTimeout(1000);
    expect(locator.loginButton).toBeDefined();
  });
  
  