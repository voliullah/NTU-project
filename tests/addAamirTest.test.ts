import { test,expect  ,chromium} from '@playwright/test';
import dotenv from 'dotenv';
import { testData } from './data/testData';


import { generateWord } from './data/wordgenerator';
import { locator } from './data/locator';
generateWord;


const generatedWord: string = generateWord();
console.log(generatedWord);

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
test('TC-011 Go to system and add project with the name of "TestAamir"', async ({page}) => {
    await page.reload()
    await page.waitForLoadState()
    await page.waitForNavigation

    // enter something project name 
    await page.click(locator.inputProjectName)
    await page.type(locator.LabelProjectName,'TestAamir',{delay : 100})



    // choose a client name 
    await page.locator(locator.selectClient).click()
    const dropdownElement = await page.waitForSelector(locator.selectClient)
    await page.locator(locator.selectClient).selectOption({label : 'Noah'})



     
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


    // choose a consortium partner 
    await page.locator(locator.SelectConsortiumPartner).selectOption({label : 'K2x'})
    await page.type(locator.inputProjectID,generateWord())






         // Click the button
         const  createProjectBtn= await page.locator(locator.createProjectBtn)
         await createProjectBtn.click();
     
         // Wait for the custom alert to appear
         await page.waitForSelector(locator.AlertProjectSaved);
     
         // Retrieve the alert message
         const alertElement = await page.waitForSelector(locator.AlertProjectSaved);
         const alertMessage = await alertElement.textContent();
        
         // Verify the alert message
         expect(alertMessage).toContain('The project has been successfully');
     
    // check if the project has been added successfully 
    const automatedProject1= await page.locator(locator.AutomatedProject1)
    await automatedProject1.textContent()
    expect (automatedProject1).toBeEnabled()
    expect(await automatedProject1.textContent()).toBe('TestAamir')

    //console the project name 
    console.log(await automatedProject1.textContent())
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


test ( ' add expert positions and check spell mistakes ',async ({page}) => {
    await page.goto(locator.BaseURL)
    await page.click(locator.AutomatedProject1)
    await page.click(locator.labeleaddnewExpertPosition)
    await page.click(locator.inputExpertPosition)
    await page.type(locator.inputExpertPosition,'Expert Position 1')
    await page.click(locator.saveEcpertPosition)
  })
  test('add the details to the expert area and see if the expert has been added',async ({page}) => {
    await page.goto(locator.BaseURL)
    await page.click(locator.AutomatedProject1)
    await page.type(locator.inputExpertName,'Expert 1')
    await page.click(locator.selectCategory)
    await page.locator(locator.selectCategory).selectOption('Category 1')
    await page.locator(locator.selectPosition).selectOption('Expert Position 1')
    await page.locator(locator.selectPartners).selectOption('K2x')
    await page.locator(locator.inputWorkingDaysAllocated).type('300')
    await page.locator(locator.SelectROA).selectOption('1')
    await page.locator(locator.saveExpert).click()
    await page.waitForTimeout(3000) 
  })
  test( 'Add a whole project with the name 0f "random "',async ({page}) => {
    
    await page.reload()
    await page.waitForLoadState()
    await page.waitForNavigation

    // enter something project name 
    await page.click(locator.inputProjectName)
    await page.type(locator.LabelProjectName,generatedWord,{delay : 100})



    // choose a client name 
    await page.locator(locator.selectClient).click()
    const dropdownElement = await page.waitForSelector(locator.selectClient)
    await page.locator(locator.selectClient).selectOption({label : 'Noah'})



     
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


    // choose a consortium partner 
    await page.locator(locator.SelectConsortiumPartner).selectOption({label : 'K2x'})
    await page.type(locator.inputProjectID,generateWord())






         // Click the button
         const  createProjectBtn= await page.locator(locator.createProjectBtn)
         await createProjectBtn.click();
     
         // Wait for the custom alert to appear
         await page.waitForSelector(locator.AlertProjectSaved);
     
         // Retrieve the alert message
         const alertElement = await page.waitForSelector(locator.AlertProjectSaved);
         const alertMessage = await alertElement.textContent();
        
         // Verify the alert message
         expect(alertMessage).toContain('The project has been successfully');
         
     
    // check if the project has been added successfully 
    const automatedProject1= await page.locator(locator.AutomatedProject1)
    await automatedProject1.textContent()
    expect (automatedProject1).toBeEnabled()
    expect(await automatedProject1.textContent()).toBe('TestAamir')

    //console the project name 
    console.log(await automatedProject1.textContent())
    await page.waitForTimeout(3000)
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


    await page.click(locator.labeleaddnewExpertPosition)
    await page.click(locator.inputExpertPosition)
    await page.type(locator.inputExpertPosition,'Expert Position 1')
    await page.click(locator.saveEcpertPosition)
    

    await page.type(locator.inputExpertName,'Expert 1')
    await page.click(locator.selectCategory)
    await page.locator(locator.selectCategory).selectOption('Category 1')
    await page.locator(locator.selectPosition).selectOption('Expert Position 1')
    await page.locator(locator.selectPartners).selectOption('K2x')
    await page.locator(locator.inputWorkingDaysAllocated).type('300')
    await page.locator(locator.SelectROA).selectOption('1')
    await page.locator(locator.saveExpert).click()
    await page.waitForTimeout(5000) 

    const valueFeeBudget = await page.textContent(locator.FeeBudgetValue)
    expect (valueFeeBudget).toBe('60000')

  const entry100= '100'
      await page.click(locator.InputOfficeadministratorcontractedbyleadpartner)
      await page.fill(locator.InputOfficeadministratorcontractedbyleadpartner,entry100)
      await page.click(locator.InputOfficeEquipment)
      await page.fill(locator.InputOfficeEquipment,entry100)
      await page.click(locator.InputOfficeRunningCost)
      await page.fill(locator.InputOfficeRunningCost,entry100)
      await page.click(locator.InputTelecommunicationInternet)
      await page.fill(locator.InputTelecommunicationInternet,entry100)
      await page.click(locator.InputCarLocalTransportCosts)
      await page.fill(locator.InputCarLocalTransportCosts,entry100)
      await page.click(locator.InputCarLocalTransportCostDriver)
      await page.fill(locator.InputCarLocalTransportCostDriver,entry100)
      await page.click(locator.InputTranslationandInterpretationServices)
      await page.fill(locator.InputTranslationandInterpretationServices,entry100)
      await page.click(locator.InputOfficeRent)
      await page.fill(locator.InputOfficeRent,entry100)
      await page.click(locator.InputLeadersMF)
      await page.fill(locator.InputLeadersMF,entry100)
      await page.click(locator.InputContingency)
      await page.fill(locator.InputContingency,entry100)
      await page.waitForTimeout(3000)
  })
