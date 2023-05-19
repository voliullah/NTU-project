import { test,expect  ,chromium} from '@playwright/test';
import dotenv from 'dotenv';
const baseURL = 'http://54.154.82.253:3001/';


import { generateWord } from './wordgenerator';
generateWord;


const generatedWord: string = generateWord();
console.log(generatedWord);


test(" TC-002 Go to NTU URL and check if it's working and also find out if the title has been given correctly ", async ({ page }) => {
  await page.goto(baseURL); 
  console.log(await page.title())
  expect (await page.title()).toBe('Ntu')
  await page.waitForTimeout(2000)
});

test.beforeEach(async ({ page }) => {

  await page.goto(baseURL);

  // Wait for the login form to appear
  await page.waitForSelector('input[type=email]'); // Enter username and password
  await page.fill('input[type=email]', 'jens@gmail.com');
  await page.fill('input[type=password]', '123456');

  // Click the login button
  await page.click('button[type=submit]');

  // Wait for navigation to complete
  await page.waitForNavigation();
});

test('TC-003 go to the page and retrieve all the projects added ', async ({ page }) => { // Wait for the locator to appear
  await page.waitForSelector('//ul//li//b[@class="text-capitalize px-3"]');

  // Get all the elements matching the locator
  const elements = await page.$$('//ul//li//b[@class="text-capitalize px-3"]');

  // Log the text content of each element
  for (const element of elements) {
    const text = await element.textContent();
    console.log(text);
  }

  // Perform assertions if needed
  expect(elements.length).toBeGreaterThan(0);
});

  test.only('TC-011 Go to system and add project details ', async ({page}) => {
    await page.waitForNavigation

    // see if the placeholder of 'Project name " has been given the right name 
    const projectNametext=await page.locator('//div[@class="yes col-md-3"]//div//label[@class="form-label"]').textContent()
    expect(projectNametext).toBe('Project name')

    // see if the project name's placeholder is enabled 
    expect(await page.locator('//input[@name="project_name"]')).toBeEnabled()

    // enter something project name 
    await page.click('//input[@name="project_name"]')
    await page.type('//input[@name="project_name"]',generatedWord,{delay : 100})

    // now see that 'client's name' 's placeholder has been given the corrent name 
    expect (await page.locator('(//div[@class="col-md-3"]//label[@class="form-label"])[1]').textContent()).toBeTruthy()
    expect (await page.locator('(//div[@class="col-md-3"]//label[@class="form-label"])[1]').textContent()).toBe("Client's name")

    // choose a client name 
    await page.locator('(//select[@class="select_select__iHQgC form-select"])[1]').click()
    const dropdownElement = await page.waitForSelector('(//select[@class="select_select__iHQgC form-select"])[1]')
    await page.locator('(//select[@class="select_select__iHQgC form-select"])[1]').selectOption({label : 'NTU'})

    //see if the Starting date's spelling is correct 
    expect (await page.locator('//div[@class="col-md-3 offset-md-0"]//label').textContent()).toBe('Starting date')

     
    // pick a starting date for the project 
    await page.locator('(//input[@type="date"])[1]').fill('2023-05-24')

    //check if the given date has been choosen
    const dateAdded = await page.locator('//div[@class="col-md-3 offset-md-0"]//input[@type="date"]');
    const dateValue = await dateAdded.inputValue();  
    const expectedDate = '2023-05-24'; 
      if (dateValue === expectedDate) {
        console.log('Date has been chosen correctly.');
      } else {
        console.log('Date has not been chosen or does not match the expected value.');
      }
    // check if the consoritum partner's spelling is written correct 
    const textAtConsortiumPartner = await page.locator('(//div[@class="col-md-3"]//label[@class="form-label"])[2]')
    await textAtConsortiumPartner.textContent()
    expect (await textAtConsortiumPartner.textContent()).toBe('Consortium partners')

    // choose a consortium partner 
    await page.locator('(//select[@class="select_select__iHQgC form-select"])[2]').selectOption({label : 'NTU'})


    // the 'create project' button should be enabled
    const  createProjectBtn= await page.locator('//div[@class="col-md-2"]//button[@class="w-100 buttonCreate btn btn-primary"]')
    expect(createProjectBtn).toBeEnabled()

    // the create project button have spelling " 'Create Project' "
     expect (await createProjectBtn.textContent()).toBe('Create Project')
 


         // Find the button using the locator
     
     
         // Click the button
         await createProjectBtn.click();
     
         // Wait for the custom alert to appear
         await page.waitForSelector('.swal2-toast-shown');
     
         // Retrieve the alert message
         const alertElement = await page.waitForSelector('.swal2-toast-shown');
         const alertMessage = await alertElement.textContent();
     
         // Verify the alert message
         expect(alertMessage).toContain('The project has been successfully');


     
    // check if the project has been added successfully 
    const automatedProject1= await page.locator('//li[@class=" d-flex justify-content-between align-items-center"]//b[@class="text-capitalize px-3"][text()="Automated Project 1"]')
    expect (automatedProject1).toBeEnabled()
    expect(await automatedProject1.textContent()).toBe('Automated Project 1')

    //console the project name 
    console.log(await automatedProject1.textContent())
    await page.waitForTimeout(3000)
  })
    test('TC-004 go the added project and see if the spelling at the section are given correctly  ',async ({page}) => {
      await page.waitForLoadState()

      //click on the already added project 
      const automatedProject1= await page.locator('//li[@class=" d-flex justify-content-between align-items-center"]//b[@class="text-capitalize px-3"][text()="Automated Project 1"]')
      await automatedProject1.click()
      await page.waitForLoadState()
  
      // see if the  "Expert Categories" spelling is correct 
      const expertCategoriesText =await page.locator('(//div[@class="row"]//div[@class="mt-4 row"]//h5)[1]').textContent()
      expect(expertCategoriesText).toBeDefined()
      expect(expertCategoriesText).toBe('Expert Categories')
      console.log(expertCategoriesText)

      //see if the  "category Name " is written  grammatically correct
      const categoryNameText  =await page.locator('//div[@class="yes mt-2 col-md-3"]//label[@class="form-label"]').textContent()
      expect(categoryNameText).toBeDefined()
      expect(categoryNameText).toBe('Category Name')
      console.log(categoryNameText)

      //see if the  "Working Days " is written  grammatically correct
      const workingDaysText  =await page.locator('(//div[@class="mt-2 yes col-md-3"]//label[@class="form-label"])[1]').textContent()
      expect(workingDaysText).toBeDefined()
      expect(workingDaysText).toBe('Working Days')
      console.log(workingDaysText)

      //see if the  "Fee rate EUR  " is written  grammatically correct
      const feeRateEURText  =await page.locator('(//div[@class="yes mt-2  col-md-3"]//label[@class="form-label"])[1]').textContent()
      expect(feeRateEURText).toBeDefined()
      expect(feeRateEURText).toBe('Fee Rate (EUR)')
      console.log(feeRateEURText)

      //see if the  "create category button  " is written  grammatically correct
      const createCategoryBtntext  = await page.locator('//div[@class="d-flex align-items-center mt-4 col-md-2 offset-md-1"]//button[@class="w-100 buttonCreate btn btn-primary"]').textContent()
      const buttonCreatecategory =await page.locator('//div[@class="d-flex align-items-center mt-4 col-md-2 offset-md-1"]//button[@class="w-100 buttonCreate btn btn-primary"]')
      await buttonCreatecategory.click()
      expect(createCategoryBtntext).toBeDefined

      expect(createCategoryBtntext).toBe('Create Category')
      console.log(createCategoryBtntext)
    })
    test('TC--005 go the already added project and add an expert name under expect category to the system ', async ({page}) => {
      await page.waitForLoadState()

      //click on the already added project 
      const automatedProject1= await page.locator('//li[@class=" d-flex justify-content-between align-items-center"]//b[@class="text-capitalize px-3"][text()="Automated Project 1"]')
      await automatedProject1.click()
      await page.waitForLoadState() 

      // Find the input field using XPath for category na me 
        const inputField = await page.waitForSelector('//div[@class="yes mt-2 col-md-3"]//input[@class="form-control"]');
      
        // Enter a value into the input field
        const inputValue = 'Category 1';
        await inputField.type(inputValue,{delay:100});
      
        // Retrieve the entered value from the input field
        const retrievedValue = await inputField.evaluate((el: HTMLInputElement) => el.value);

      
        // Validate the retrieved value
        expect(retrievedValue).toBe(inputValue);
        await page.waitForTimeout(3000)
 });
 test('TC--006 go the already added project and add an working days under expect category to the system ', async ({page}) => {
  await page.waitForLoadState()

  //click on the already added project 
   const automatedProject1= await page.locator('//li[@class=" d-flex justify-content-between align-items-center"]//b[@class="text-capitalize px-3"][text()="Automated Project 1"]')
   await automatedProject1.click()
   await page.waitForLoadState() 

  // Find the input field using XPath
    const inputField = await page.waitForSelector('(//div[@class="mt-2 yes col-md-3"]//input[@type="number"])[1]');
  
  // Enter a value into the input field
    const inputValue = '300';
    await inputField.type(inputValue,{delay:100});
  
  // Retrieve the entered value from the input field
    const retrievedValue = await inputField.evaluate((el: HTMLInputElement) => el.value);

  
    // Validate the retrieved value
    expect(retrievedValue).toBe(inputValue);
    await page.waitForTimeout(3000)
 })
 test('TC--007 go the already added project and add Fee rarte EUR under expect category to the system ', async ({page}) => {
  await page.waitForLoadState()

  //click on the already added project 
   const automatedProject1= await page.locator('//li[@class=" d-flex justify-content-between align-items-center"]//b[@class="text-capitalize px-3"][text()="Automated Project 1"]')
   await automatedProject1.click()
   await page.waitForLoadState() 

  // Find the input field using XPath
    const inputField = await page.waitForSelector('//div[@class="yes mt-2  col-md-3"]//input[@type="number"]');
  
  // Enter a value into the input field
    const inputValue = '200';
    await inputField.type(inputValue,{delay:100});
  
  // Retrieve the entered value from the input field
    const retrievedValue = await inputField.evaluate((el: HTMLInputElement) => el.value);

  
    // Validate the retrieved value
    expect(retrievedValue).toBe(inputValue);
    await page.waitForTimeout(3000)
 })
 test.only('TC-008 go the already added project and add value to expert name , working days , fee rate eur and add it to the system ', async ({page}) => {
  await page.waitForLoadState()

  //click on the already added project 
  const automatedProject1= await page.locator('//li[@class=" d-flex justify-content-between align-items-center"]//b[@class="text-capitalize px-3"][text()="Automated Project 1"]')
  await automatedProject1.click()
  await page.waitForLoadState() 

  // Find the input field using XPath for category name 
    const inputField = await page.waitForSelector('//div[@class="yes mt-2 col-md-3"]//input[@class="form-control"]');
  
    // Enter a value into the input field
    const inputValue = 'Category 1';
    await inputField.type(inputValue,{delay:100});
  
    // Retrieve the entered value from the input field
    const retrievedValue = await inputField.evaluate((el: HTMLInputElement) => el.value);

  
    // Validate the retrieved value
    expect(retrievedValue).toBe(inputValue);
    console.log('Category Name added :',retrievedValue )


// Find the input field using XPath for Working days 
const workingDaysinput= await page.waitForSelector('(//div[@class="mt-2 yes col-md-3"]//input[@type="number"])[1]');

// Enter a value into the input field
 const value = '300';
 await workingDaysinput.type(value,{delay:100});

// Retrieve the entered value from the input field
 const retrievedValueWDs = await workingDaysinput.evaluate((el: HTMLInputElement) => el.value);

 console.log('WDS added:',retrievedValueWDs)
// Validate the retrieved value
 expect(retrievedValueWDs).toBe(value);


// Find the input field using XPath for fee rate EUR
 const inputFieldFeeRate = await page.waitForSelector('//div[@class="yes mt-2  col-md-3"]//input[@type="number"]');

// Enter a value into the input field
 const ValueEUR = '200';
 await inputFieldFeeRate.type(ValueEUR,{delay:100});

// Retrieve the entered value from the input field
 const retrievedValueFeeRate = await inputFieldFeeRate.evaluate((el: HTMLInputElement) => el.value);


// Validate the retrieved value
 expect(retrievedValueFeeRate).toBe(ValueEUR);
 await page.waitForTimeout(3000)
 console.log('Fee rate ( EUR ) added :',retrievedValueFeeRate)

//add the details added by clicking the create 'category button'.
 const createCategoryBtn= await page.locator('//div[@class="d-flex align-items-center mt-4 col-md-2 offset-md-1"]//button[@class="w-100 buttonCreate btn btn-primary"]')
 await createCategoryBtn.click()
 await page.locator('//div[@class="d-flex align-items-center mt-4 col-md-2 offset-md-1"]//button[@class="w-100 buttonCreate btn btn-primary"]').click
 await page.waitForTimeout(2000)

//add working days for NTU client 
 const workingdaysForNTU = await page.locator('//div[@class="mt-2 row"]//div[@class="col-md-7"]//input[@type="number"]')
 await workingdaysForNTU.type('100')


//now check if the total working days at prompt are written correctly 
 const totalworkingDaysPrompt=await page.locator('(//div[@class="modal-body"]//b)[1]')
 const totalWDsCount= await totalworkingDaysPrompt.textContent()
 console.log ('totalWDs at Prompt  for NTU : ',totalWDsCount)
 if (totalworkingDaysPrompt && totalWDsCount !== '300') {
  throw new Error('Error : WDs at promt couldnt be validated!.');
}

 //now save the changes and put some validation on the "save" button at prompt 

  await page.click('//button[@class="buttonCreate w-25 btn btn-primary"]');


 // Get the text content of the button
  const SavebuttonPrompt = await page.textContent('//button[@class="buttonCreate w-25 btn btn-primary"]');

 // Assert that the button text content is "save"
  expect(SavebuttonPrompt).toBe('Save loading...');


  // Wait for the saved object to appear
   await page.waitForSelector('//span[@class="text-capitalize"]');

  // Get the text content of the saved object
   const savedCategoryText = await page.textContent('//span[@class="text-capitalize"]');

  // Assert that the saved object text content is as expected
   expect(savedCategoryText).toBe('Category 1');
   console.log('saved category is :',savedCategoryText)

  // now check if the project has been added 
    const CreatedByJens= await page.locator('//div[@class="d-flex align-items-center pt-3 col-md-3"]//b[@class="text-capitalize"]')
    const jenstextatProjectDetail =await CreatedByJens.textContent()
    expect (jenstextatProjectDetail).toBe('jens')


})
test('TC-009 check the button "create category" and make sure its working',async ({page}) => {
  await page.waitForLoadState()

  //click on the already added project 
  const automatedProject1= await page.locator('//li[@class=" d-flex justify-content-between align-items-center"]//b[@class="text-capitalize px-3"][text()="Automated Project 1"]')
  await automatedProject1.click()
  await page.waitForLoadState() 

  //put some assertions on the button
  const createCategoryBtn= await page.locator('//div[@class="d-flex align-items-center mt-4 col-md-2 offset-md-1"]//button[@class="w-100 buttonCreate btn btn-primary"]')
  expect(await createCategoryBtn.textContent()).toBe('Create Category')
  expect(await createCategoryBtn).toBeEnabled
  expect(createCategoryBtn).toBeTruthy
  await createCategoryBtn.click 
})
test ('TC-010 check the button "create category" and make sure its working',async ({page}) => {
  await page.waitForLoadState()

  //click on the already added project 
  const automatedProject1= await page.locator('//li[@class=" d-flex justify-content-between align-items-center"]//b[@class="text-capitalize px-3"][text()="Automated Project 1"]')
  await automatedProject1.click()
  await page.waitForLoadState() 

  //now 
})



    






  