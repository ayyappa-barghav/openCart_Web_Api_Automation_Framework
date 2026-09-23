
import { Locator, Page } from "playwright";
import {BasePage} from './BasePage';
import {LoginPage} from './LoginPage';

export class RegistrationPage extends BasePage{

    private readonly registrationLink: Locator
    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly eMail: Locator
    private readonly telephone: Locator
    private readonly password: Locator
    private readonly confirmPassword: Locator
    private readonly privacyCheckBox: Locator
    private readonly continueButton: Locator


    constructor(page: Page){
        super(page)
        this.registrationLink = page.getByRole('link', {name:'Register'}).last();
        this.firstName = page.getByRole('textbox', { name: '* First Name' });
        this.lastName = page.getByRole('textbox', { name: '* Last Name' });
        this.eMail = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephone = page.getByRole('textbox', { name: '* Telephone' });
        this.password = page.getByLabel('* Password');
        this.confirmPassword = page.getByLabel('* Password Confirm');
        this.privacyCheckBox = page.getByRole('checkbox');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async doUserRegistration(){
       let loginPage = new LoginPage(this.page)
       await loginPage.goToLoginPage();
       await this.registrationLink.click();
       await this.page.pause()
    }

}