export const locator = {
BaseURL: 'http://54.154.82.253:3001/',
MemberLoginText: '[class="head-center"]',
logo :'alt',
email : 'input[type=email]',
password : 'input[type=password]' ,
loginButton : 'button[type=submit]',
LoginWithMicrosoftButton: "//div[text()='Log in with Microsoft']",
HomePageHeader: "//h5[text()='NTU Project Management']",
NTULogoHomepage:'//img[@alt="Ntu-Logo"]',
jensAndSuperAdminText:'//div[@class="pt-1 col-md-8"]',
JensText:'//div[@class="pt-1 col-md-8"]//ul//li',
SUperAdminText:'(//div[@class="pt-1 col-md-8"]//ul//li)[2]',
Administration:'//button[@class="w-100 p-2 btn btn-primary"]',
NewProject:'//button[@class="btn btn-primary"][1]',
SignOut:'//button[@class="btn btn-primary"][2]',
AddedProjectsArray:'//ul//li//b[@class="text-capitalize px-3"]',
MonthlyExpenses:'//div[@class="p-1 div-col-link2 col"]//a[@href="/"]',
MarginCalculator:'//div[@class="p-1 me-2 div-col-link2 col"]//a[@href="/"]',
LabelProjectName:'(//div[@class="yes col-md-3"]//div//label[@class="form-label"])[1]',
inputProjectName:'//input[@name="project_name"]',
lableClientName:'(//div[@class="col-md-3"]//label[@class="form-label"])[1]',
selectClient:'(//select[@class="select_select__iHQgC form-select"])[1]',
ChooseClient:'(//div[@class="mt-5 row"]//div[@class="col-md-3"]//select[@class="select_select__iHQgC form-select"]//option[@value="1"])[1]',
labelStartingDate :'//div[@class="col-md-3 offset-md-0"]//label',
date: '//div[@class="col-md-3 offset-md-0"]//input[@type="date"]',
selectStartingDate:'(//input[@type="date"])[1]',
lableConsortiumPartner:'(//div[@class="col-md-3"]//label[@class="form-label"])[2]',
SelectConsortiumPartner:'(//select[@class="select_select__iHQgC form-select"])[2]',
inputProjectID :'[name="jobno"]',
chooseConsortiumPartner:"(//select[@class='select_select__iHQgC form-select'])[2]//option[@value='1']",
createProjectBtn:'//div[@class="col-md-2"]//button[@class="w-100 buttonCreate btn btn-primary"]',
ManageRolesBtn:'//button[@class="buttonAsign w-100 btn btn-outline-info"]',
labelExpertCategories:'(//div[@class="row"]//div[@class="mt-4 row"]//h5)[1]',
labelExpertName:'(//div[@class="yes mt-2  col-md-3"]//label[@class="form-label"])[2]',
labelCategoryName:'//div[@class="yes mt-2 col-md-3"]//label[@class="form-label"]',
inputCategoryName :'//div[@class="yes mt-2 col-md-3"]//input[@class="form-control"]',
labelworkingDays:'(//div[@class="mt-2 yes col-md-3"]//label[@class="form-label"])[1]',
inputWorkingDays:'(//div[@class="mt-2 yes col-md-3"]//input[@type="number"])[1]',
labeExpert:'(//div[@class="row"]//div[@class="mt-4 row"]//h5)[2]',
labelFeerateEUR:'(//div[@class="yes mt-2  col-md-3"]//label[@class="form-label"])[1]',
inputFeerateEUR:'//div[@class="yes mt-2  col-md-3"]//input[@type="number"]',
CreateCategoryBtn:'//div[@class="d-flex align-items-center mt-4 col-md-2 offset-md-1"]//button[@class="w-100 buttonCreate btn btn-primary"]',
labelExpertPosition:'(//div[@class="container-fluid"]//div[@class="mt-4  row"]//h5)[1]',
labeleaddnewExpertPosition:'//div[@class="container-fluid"]//div[@class="mt-4  row"]//h5[@class="px-1"]',
inputExpertPosition:'//div[@class="client_enterField__Kl0gu"]//input',
AutomatedProject1:'//li[@class=" d-flex justify-content-between align-items-center"]//b[@class="text-capitalize px-3"][text()="TestAamir"]',
WDSforNTu_client:'//div[@class="mt-2 row"]//div[@class="col-md-7"]//input[@type="number"]',
labeltotalworkingdayInPromtAlert:'(//div[@class="modal-body"]//b)[1]',
SaveBtnPromt:'//button[@class="buttonCreate w-25 btn btn-primary"]',
SavedCategory:'//span[@class="text-capitalize"]',
createdByjens:'//div[@class="d-flex align-items-center pt-3 col-md-3"]//b[@class="text-capitalize"]',
AlertProjectSaved:'.swal2-toast-shown',
alertLoginPage: '//div[@class="swal2-container swal2-top swal2-backdrop-show"]',
saveEcpertPosition : '.client_enterField__Kl0gu > div > svg',
labelExpert : '(//div[@class="mt-4 row"]//h5)[2]',
labelCategory : '//div[@class="mt-2 col-md-3"]//label[@class="form-label"]',
labelPosition : '(//div[@class="mt-2  col-md-3"]//label[@class="form-label"])[1]',
labelPartners : '//div[@class=" mt-2  col-md-3"]//label[@class="form-label"]',
labelworkingDaysAllocated:'(//div[@class="mt-2 yes col-md-3"]//label[@class="form-label"])[2]',
labelROA : '(//div[@class="mt-2  col-md-3"]//label[@class="form-label"])[2]',
inputExpertName : '//div[@class="yes mt-2  col-md-3"]//input[@class="form-control"]',
selectCategory : '//div[@class="mt-2 col-md-3"]//select[@class="select_select__iHQgC form-select"]',
selectPosition : '(//div[@class="mt-2  col-md-3"]//select[@class="select_select__iHQgC form-select"])[1]',
SelectROA : '(//div[@class="mt-2  col-md-3"]//select[@class="select_select__iHQgC form-select"])[2]',
selectPartners : '//div[@class=" mt-2  col-md-3"]//select[@class="select_select__iHQgC form-select"]',
inputWorkingDaysAllocated:'(//div[@class="mt-2 yes col-md-3"]//input[@type="number"])[2]',
saveExpert :'//div[@class="d-flex align-items-center mt-4 col-md-2"]//button[@class="w-100 buttonCreate btn btn-primary"]',

locatorzohaib : '//div[@class="col"]//h5',
FeeBudgetValue :'//div[@class="col-md-12"]//table[@class="table_project"]//tr[@class="body-border"]//td//div[@class="text-row"]//h5[text()="60000"]',


}
//button[text()="Save "]      or    