import {test, Page, expect} from "playwright/test";
import { LoginPage } from "../../src/pages/LoginPage";

let loginPage : LoginPage;

test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page)
})

test('loginTest', async()=>{

    //loginPage = new LoginPage(page)
    await loginPage.goToLoginPage();
    await loginPage.doLogin('user1@test.in','pw123')

})

test('forgotten password link visibility', async()=>{
    //loginPage = new LoginPage(page)
   await loginPage.isForgottenPasswordLinkExist()

})

test('get page title', async()=>{
    await loginPage.goToLoginPage();
    let pageTitle = await loginPage.getPageTitle();
    console.log('title of loginPage is', pageTitle);
    expect(pageTitle).toBe('Account Login')
})