
import { Page, Locator } from "playwright";
import {BasePage} from "./BasePage"

export class HomePage extends BasePage {

    private readonly logOutLink: Locator;
    private readonly pageHeaders: Locator;
    private readonly searchBox: Locator;
    private readonly searchIcon: Locator;

    constructor(page: Page){
        super(page)
        this.logOutLink = page.getByRole('link', { name: 'Logout' });
        this.pageHeaders = page.getByRole('heading', {level:2})
        this.searchBox = page.getByRole('textbox', { name: 'Search' })
        this.searchIcon = page.locator('#search button')
    }

    async getHomePageTitle(): Promise<string>{
        return await this.page.title();
    }

    async isLogOutLinkExist(): Promise<boolean>{
        return await this.logOutLink.isVisible()
    }

    async getHomePageHeaders(): Promise<string[]>{
        let allHeaders: string[] =  await this.pageHeaders.allInnerTexts();
        return allHeaders;   
    }

    async doProductSearch(productName: string): Promise<void>{
        await this.searchBox.fill(productName);
        await this.searchIcon.click()
    }
}