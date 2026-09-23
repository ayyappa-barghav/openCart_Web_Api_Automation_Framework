
import { Locator, Page } from "playwright";
import {BasePage} from "./BasePage";

export class LoginPage extends BasePage{

    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginButton: Locator;
    private readonly forgottenPasswordLink: Locator
    private readonly loginErrorMessage: Locator

    constructor(page: Page){
        super(page)
        this.emailId = page.getByRole('textbox',{name:'E-Mail Address'})
        this.password = page.getByRole('textbox',{name:'Password'})
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first()
        this.loginErrorMessage = page.locator('div#account-login div.alert')
    }

    async goToLoginPage(): Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login')
    }

    async isForgottenPasswordLinkExist(): Promise<boolean> {
         return await this.forgottenPasswordLink.isVisible();
    }

    async doLogin(username: string , password: string):Promise<void>{

        console.log(`username is ${username} and password is ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();

    }

    async isInvalidLoginMessageDisplayed(): Promise<boolean>{
        return await this.loginErrorMessage.isVisible();
    }

    
}