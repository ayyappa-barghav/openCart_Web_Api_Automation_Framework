
import { log, meta, testData } from "reporting-labs";
import { test, expect } from "../../src/fixtures/pageFixtures";
import {CsvHelper} from '../../src/utils/csvHelper'
import {ExcelHelper} from '../../src/utils/excelHelper';
import {JsonHelper} from '../../src/utils/jsonHelper'

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage()
})

test('@smoke title test', async({loginPage})=>{

    meta({priority: 'P1', severity: 'LOW', owner:'Ayyappa',feature:'Login',story:'US101'})

   let loginPageTitle = await loginPage.getPageTitle();
   console.log('login page title is', loginPageTitle);
   await log('login page title is', loginPageTitle)
   expect(loginPageTitle).toBe('Account Login')
})

test('@smoke login test', async({loginPage, homePage})=>{
    meta({priority: 'P1', severity: 'critical', owner:'Ayyappa',feature:'Login',story:'US102'})
    testData({username:process.env.USERNAME, password:process.env.PASSWORD},'loginData')
    await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD)
    let homePageTitle = await homePage.getHomePageTitle();
    await log('home page title is', homePageTitle)

    console.log('home page Title is ', homePageTitle);
})

//Data Driven approach - 1 using csv file and read data from csv file and loop the test method row wise

//light weight, very easy to maintain, individual csv files, test data is separated, 3rd party library also present, flat files, good for large set of test data
let testRowData: Record<string, string>[]= CsvHelper.readCsv('src/testData/loginData.csv')
for(let row of testRowData){
     test(`@regression login to app with creds - ${row.username} - ${row.password}`, async({loginPage})=>{
        meta({priority: 'P2', severity: 'HIGH', owner:'Ayyappa',feature:'Login',story:'US102'})
        await testData(testRowData, 'invalid login data')
        await loginPage.doLogin(row.username, row.password)
        expect(await loginPage.isInvalidLoginMessageDisplayed()).toBeTruthy();
     })
}


//DD -2 - Excel
//Cons
//1. Maintenance - 5 Automation engineers example
//2. Licensed version
let testExcelData = ExcelHelper.readExcel('src/testData/opencarttestdata.xlsx', 'login')
for (let row of testExcelData){

    test(`@regression validate login to app with invalid creds - ${row.username} - ${row.password}`, async({loginPage})=>{
        meta({priority: 'P2', severity: 'HIGH', owner:'Ayyappa',feature:'Login',story:'US102'})
        await testData(testExcelData, 'invalid login data')
        await loginPage.doLogin(row.username, row.password)
        expect(await loginPage.isInvalidLoginMessageDisplayed()).toBeTruthy();
    })
}

//DD-3 - JSON
//inbuit method - parse, lightweight, smaller data source
let jsonData = JsonHelper.readJson('src/testData/loginData.json')
for(let data of jsonData){
    test(`@regression valid login to the app with invalid creds - ${data.username} - ${data.password}`, async({loginPage})=>{
        await loginPage.doLogin(data.username, data.password)
        expect(await loginPage.isInvalidLoginMessageDisplayed()).toBeTruthy()
    })
}

//common features test:

test('@smoke app logo exits on page', async({basePage})=>{
    
    expect(await basePage.isLogoVisible()).toBeTruthy();
})

test('@smoke search box exists on page', async({basePage})=>{

    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
})

test('@smoke cart exists on page', async({basePage})=>{

    expect(await basePage.isCartButtonVisible()).toBeTruthy();
})

test('@smoke Footers exists on page', async({basePage})=>{

    expect(await basePage.getPageFootersCount()).toBeTruthy();
})