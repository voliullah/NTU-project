import { test,expect  ,chromium} from '@playwright/test';
import dotenv from 'dotenv';
import { testData } from './data/testData';


import { generateWord } from './data/wordgenerator';
import { locator } from './data/locator';
generateWord;


const generatedWord: string = generateWord();
console.log(generatedWord);


test(" TC-002 Go to NTU URL and check if it's working and also find out if the title has been given correctly ", async ({ page }) => {
  await page.goto(locator.BaseURL); 
  console.log(await page.title())
  expect (await page.title()).toBe('Ntu')
  await page.waitForTimeout(2000)
});

test.beforeEach(async ({ page }) => {

  await page.goto(locator.BaseURL);

  // Wait for the login form to appear
  await page.waitForSelector(locator.email); // Enter username and password
  await page.fill(locator.email,testData.Login.username);
  await page.fill(locator.password, testData.Login.password);

  // Click the login button
  await page.click(locator.loginButton);

  // Wait for navigation to complete
  await page.waitForNavigation();
});

test('TC-003 go to the page and retrieve all the projects added ', async ({ page }) => { // Wait for the locator to appear
  await page.waitForSelector(locator.AddedProjectsArray);

  // Get all the elements matching the locator
  const elements = await page.$$(locator.AddedProjectsArray);

  // Log the text content of each element
  for (const element of elements) {
    const text = await element.textContent();
    console.log(text);
  }

  // Perform assertions if needed
  expect(elements.length).toBeGreaterThan(0);
});

  test('TC-011 Go to system and add project details ', async ({page}) => {
    await page.waitForNavigation

    // see if the placeholder of 'Project name " has been given the right name 
    const projectNametext=await page.locator(locator.LabelProjectName).textContent()
    expect(projectNametext).toBe('Project name')

    // see if the project name's placeholder is enabled 
    expect(await page.locator(locator.LabelProjectName)).toBeEnabled()

    // enter something project name 
    await page.click(locator.inputProjectName)
    await page.type(locator.LabelProjectName,generatedWord,{delay : 100})

    // now see that 'client's name' 's placeholder has been given the corrent name 
    expect (await page.locator(locator.lableClientName).textContent()).toBeTruthy()
    expect (await page.locator(locator.lableClientName).textContent()).toBe("Client's name")

    // choose a client name 
    await page.locator(locator.selectClient).click()
    const dropdownElement = await page.waitForSelector(locator.selectClient)
    await page.locator(locator.selectClient).selectOption({label : 'NTU'})

    //see if the Starting date's spelling is correct 
    expect (await page.locator(locator.labelStartingDate).textContent()).toBe('Starting date')

     
    // pick a starting date for the project 
    await page.locator(locator.selectStartingDate).fill('2023-05-24')

    //check if the given date has been choosen
    const dateAdded = await page.locator(locator.date);
    const dateValue = await dateAdded.inputValue();  
    const expectedDate = '2023-05-24'; 
      if (dateValue === expectedDate) {
        console.log('Date has been chosen correctly.');
      } else {
        console.log('Date has not been chosen or does not match the expected value.');
      }
    // check if the consoritum partner's spelling is written correct 
    const textAtConsortiumPartner = await page.locator('locator.lableConsortiumPartner')
    await textAtConsortiumPartner.textContent()
    expect (await textAtConsortiumPartner.textContent()).toBe('Consortium partners')

    // choose a consortium partner 
    await page.locator(locator.SelectConsortiumPartner).selectOption({label : 'NTU'})


    // the 'create project' button should be enabled
    const  createProjectBtn= await page.locator(locator.lableConsortiumPartner)
    expect(createProjectBtn).toBeEnabled()

    // the create project button have spelling " 'Create Project' "
     expect (await createProjectBtn.textContent()).toBe('Create Project')

         // Click the button
         await createProjectBtn.click();
     
         // Wait for the custom alert to appear
         await page.waitForSelector(locator.AlertProjectSaved);
     
         // Retrieve the alert message
         const alertElement = await page.waitForSelector(locator.AlertProjectSaved);
         const alertMessage = await alertElement.textContent();
        console.log(alertMessage)
         // Verify the alert message
         expect(alertMessage).toContain('The project has been successfully');
     
    // check if the project has been added successfully 
    const automatedProject1= await page.locator(locator.AutomatedProject1)
    await automatedProject1.textContent()
    expect (automatedProject1).toBeEnabled()
    expect(await automatedProject1.textContent()).toBe('Automated Project 1')

    //console the project name 
    console.log(await automatedProject1.textContent())
    await page.waitForTimeout(3000)
  })
    test('TC-004 go the added project and see if the spelling at the section are given correctly  ',async ({page}) => {
      await page.waitForLoadState()

      //click on the already added project 
      const automatedProject1= await page.locator(locator.AutomatedProject1)
      await automatedProject1.click()
      await page.waitForLoadState()
  
      // see if the  "Expert Categories" spelling is correct 
      const expertCategoriesText =await page.locator(locator.labelExpertCategories).textContent()
      expect(expertCategoriesText).toBeDefined()
      expect(expertCategoriesText).toBe('Expert Categories')
      console.log(expertCategoriesText)

      //see if the  "category Name " is written  grammatically correct
      const categoryNameText  =await page.locator(locator.labelCategoryName).textContent()
      expect(categoryNameText).toBeDefined()
      expect(categoryNameText).toBe('Category Name')
      console.log(categoryNameText)
      //see if the  "Working Days " is written  grammatically correct
      const workingDaysText  =await page.locator(locator.labelworkingDays).textContent()
      expect(workingDaysText).toBeDefined()
      expect(workingDaysText).toBe('Working Days')
      console.log(workingDaysText)

      //see if the  "Fee rate EUR  " is written  grammatically correct
      const feeRateEURText  =await page.locator(locator.labelFeerateEUR).textContent()
      expect(feeRateEURText).toBeDefined()
      expect(feeRateEURText).toBe('Fee Rate (EUR)')
      console.log(feeRateEURText)

      //see if the  "create category button  " is written  grammatically correct
      const createCategoryBtntext  = await page.locator(locator.CreateCategoryBtn).textContent()
      const buttonCreatecategory =await page.locator(locator.CreateCategoryBtn)
      await buttonCreatecategory.click()
      expect(createCategoryBtntext).toBeDefined

      expect(createCategoryBtntext).toBe('Create Category')
      console.log(createCategoryBtntext)
    })
    test('TC--005 go the already added project and add an expert name under expect category to the system ', async ({page}) => {
      await page.waitForLoadState()

      //click on the already added project 
      const automatedProject1= await page.locator(locator.AutomatedProject1)
      await automatedProject1.click()
      await page.waitForLoadState() 

      // Find the input field using XPath for category na me 
        const inputField = await page.waitForSelector(locator.inputCategoryName);
      
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
   const automatedProject1= await page.locator(locator.AutomatedProject1)
   await automatedProject1.click()
   await page.waitForLoadState() 

  // Find the input field using XPath
    const inputField = await page.waitForSelector(locator.inputWorkingDays);
  
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
   const automatedProject1= await page.locator(locator.AutomatedProject1)
   await automatedProject1.click()
   await page.waitForLoadState() 

  // Find the input field using XPath
    const inputField = await page.waitForSelector(locator.inputFeerateEUR);
  
  // Enter a value into the input field
    const inputValue = '200';
    await inputField.type(inputValue,{delay:100});
  
  // Retrieve the entered value from the input field
    const retrievedValue = await inputField.evaluate((el: HTMLInputElement) => el.value);

  
    // Validate the retrieved value
    expect(retrievedValue).toBe(inputValue);
    await page.waitForTimeout(3000)
 })
 test('TC-008 go the already added project and add value to expert name , working days , fee rate eur and add it to the system ', async ({page}) => {
  await page.waitForLoadState()

  //click on the already added project 
  const automatedProject1= await page.locator(locator.AutomatedProject1)
  await automatedProject1.click()
  await page.waitForLoadState() 

  // Find the input field using XPath for category name 
    const inputField = await page.waitForSelector(locator.inputCategoryName);
  
    // Enter a value into the input field
    const inputValue = 'Category 1';
    await inputField.type(inputValue,{delay:100});
  
    // Retrieve the entered value from the input field
    const retrievedValue = await inputField.evaluate((el: HTMLInputElement) => el.value);

    // Validate the retrieved value
    expect(retrievedValue).toBe(inputValue);
    console.log('Category Name added :',retrievedValue )


// Find the input field using XPath for Working days 
const workingDaysinput= await page.waitForSelector(locator.inputWorkingDays);

// Enter a value into the input field
 const value = '300';
 await workingDaysinput.type(value,{delay:100});

// Retrieve the entered value from the input field
 const retrievedValueWDs = await workingDaysinput.evaluate((el: HTMLInputElement) => el.value);

 console.log('WDS added:',retrievedValueWDs)
// Validate the retrieved value
 expect(retrievedValueWDs).toBe(value);


// Find the input field using XPath for fee rate EUR
 const inputFieldFeeRate = await page.waitForSelector(locator.inputFeerateEUR);

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
 const createCategoryBtn= await page.locator(locator.CreateCategoryBtn)
 await createCategoryBtn.click()
 await page.locator(locator.CreateCategoryBtn).click
 await page.waitForTimeout(2000)

//add working days for NTU client 
 const workingdaysForNTU = await page.locator(locator.WDSforNTu_client)
 await workingdaysForNTU.type('100')


//now check if the total working days at prompt are written correctly 
 const totalworkingDaysPrompt=await page.locator(locator.labeltotalworkingdayInPromtAlert)
 const totalWDsCount= await totalworkingDaysPrompt.textContent()
 console.log ('totalWDs at Prompt  for NTU : ',totalWDsCount)
 if (totalworkingDaysPrompt && totalWDsCount !== '300') {
  throw new Error('Error : WDs at promt couldnt be validated!.');
}

 //now save the changes and put some validation on the "save" button at prompt 

  await page.click(locator.SaveBtnPromt);


 // Get the text content of the button
  const SavebuttonPrompt = await page.textContent(locator.SaveBtnPromt);

 // Assert that the button text content is "save"
  expect(SavebuttonPrompt).toBe('Save loading...');


  // Wait for the saved object to appear
   await page.waitForSelector(locator.SavedCategory);

  // Get the text content of the saved object
   const savedCategoryText = await page.textContent(locator.SavedCategory);

  // Assert that the saved object text content is as expected
   expect(savedCategoryText).toBe('Category 1');
   console.log('saved category is :',savedCategoryText)

  // now check if the project has been added 
    const CreatedByJens= await page.locator(locator.createdByjens)
    const jenstextatProjectDetail =await CreatedByJens.textContent()
    expect (jenstextatProjectDetail).toBe('jens')


})
test('TC-009 check the button "create category" and make sure its working',async ({page}) => {
  await page.waitForLoadState()

  //click on the already added project 
  const automatedProject1= await page.locator(locator.AutomatedProject1)
  await automatedProject1.click()
  await page.waitForLoadState() 

  //put some assertions on the button
  const createCategoryBtn= await page.locator(locator.CreateCategoryBtn)
  expect(await createCategoryBtn.textContent()).toBe('Create Category')
  expect(await createCategoryBtn).toBeEnabled
  expect(createCategoryBtn).toBeTruthy
  await createCategoryBtn.click 
})
test('TC-010 check the button "create category" and make sure its working',async ({page}) => {
  await page.waitForLoadState()

  //click on the already added project 
  const automatedProject1= await page.locator(locator.AutomatedProject1)
  await automatedProject1.click()
  await page.waitForLoadState() 

  //check if the 'create category" button is enabled
  const createCategoryBtn = await page.locator(locator.CreateCategoryBtn)
  expect (createCategoryBtn).toBeTruthy
  expect(createCategoryBtn).toBeEnabled
  // Enable dialog event handling
    await page.on('dialog', async (dialog) => {
      // Assert that the alert is displayed
      expect(dialog.type()).toBe('alert');
      console.log(dialog.message())
      await dialog.accept();
    });

  
  // Click on the button that triggers the popup alert
    await createCategoryBtn.click()

    await page.waitForLoadState()
});



    






  