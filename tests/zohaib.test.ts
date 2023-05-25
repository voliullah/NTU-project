import {test , expect} from '@playwright/test'
import { locator } from './data/locator'
import { testData } from './data/testData';
test('here we go ahshhahaha',async ({page}) => {
     // Go to the login page
     await page.goto(locator.BaseURL);
  
     // Enter username and passwordx
     await page.fill(locator.email, testData.Login.username);
     await page.fill(locator.password, testData.Login.password);
   
     // Click the login button
     await page.click(locator.loginButton);
     await page.click(locator.Administration)
   const text = await page.locator(locator.locatorzohaib).textContent()
   console.log(text)
   expect(text).toBe('Manage Roles')
   await page.waitForLoadState()
   await page.reload()
   await page.waitForTimeout(3000)

})
test('test one ', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://www.google.com/');
  await page.locator('.SDkEP').click();
  await page.getByRole('combobox', { name: 'Search' }).fill('zohaib');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await page.goto('https://www.facebook.com/');
  await page.waitForTimeout(3000)
});
test.only('test', async ({ page }) => {
    await page.goto('https://app.cmdcntr.io/app/login/');
    await page.getByTestId('username_input_signin').click();
    await page.getByTestId('username_input_signin').fill('zohaib@gmail.com');
    await page.getByTestId('password_input_signin').click();
    await page.getByTestId('password_input_signin').fill('waliullah');
    await page.getByTestId('button_signin').click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(3000)
}); 
