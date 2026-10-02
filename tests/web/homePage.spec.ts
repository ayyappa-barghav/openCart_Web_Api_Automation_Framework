import {expect, test} from 'playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';

let loginPage: LoginPage
let homePage: HomePage

test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page)
    await loginPage.goToLoginPage();
    await loginPage.doLogin('user1@test.in', 'pw123')
    homePage = new HomePage(page);
})

test('home page title test', async()=>{
    let homePageTitle = await homePage.getHomePageTitle();
    console.log('Title of Home page is ', homePageTitle);
})

test('logout link exist', async()=>{
    await homePage.isLogOutLinkExist();
})

test('get Home Page Headers', async()=>{
    let headers = await homePage.getHomePageHeaders()
    console.log(headers);
    expect(headers).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])

})