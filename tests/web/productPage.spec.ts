
import {test} from '../../src/fixtures/pageFixtures'

test.beforeEach(async ({loginPage, homePage, searchResultsPage, page})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD)
    await homePage.doProductSearch('macbook')
    //await searchResultsPage.getProductResultCount();
    await searchResultsPage.selectProduct('MacBook Pro')
    //await page.waitForTimeout(1000) 
    //await page.pause();

})

test('get product image count', async ({productInfoPage})=>{
    let imageCount = await productInfoPage.getProductImagesCount();
    console.log('product images count is ', imageCount);
})

test('get product data', async({productInfoPage})=>{
    let actualProductInfo = await productInfoPage.getProductData()
    console.log(actualProductInfo);

})