import {test,expect} from '../../src/fixtures/pageFixtures'
import { CsvHelper } from '../../src/utils/csvHelper';


test.beforeEach(async({loginPage, homePage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD);
    
})

let productData = CsvHelper.readCsv('src/testData/productData.csv')

for(let row of productData){
    test(`verify product result count ${row.searchKey} - ${row.productName}`, async({homePage, searchResultsPage, productInfoPage, page})=>{
    await homePage.doProductSearch(row.searchKey)
    let actualResultCount = await searchResultsPage.getProductResultCount();
    expect(actualResultCount).toBe(Number(row.resultCount))
    console.log('number of product results are', actualResultCount);

})

}

for(let row of productData){ 
    test(`verify user is able to land on product page - ${row.searchKey} - ${row.productName}`, async({loginPage, homePage, searchResultsPage, productInfoPage, page})=>{
    await homePage.doProductSearch(row.searchKey)
    await searchResultsPage.selectProduct(row.productName)
    await page.waitForTimeout(1000)
    let productImages = await productInfoPage.getProductImagesCount();
    console.log('images count of product is ', productImages);

   })

}