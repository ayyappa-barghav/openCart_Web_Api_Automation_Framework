
import { Locator, Page} from "playwright";
import {BasePage} from './BasePage'

export class SearchResultsPage extends BasePage{

    private readonly searchResults: Locator
    private readonly addToCart: Locator

    constructor(page: Page){
        super(page)
        this.searchResults = page.locator('.product-grid')
        this.addToCart = page.getByRole('button', { name: 'Add to Cart' });
    }

    async getProductResultCount(): Promise<number>{
        return await this.searchResults.count();
    }

    async selectProduct(productName: string): Promise<void>{
        await this.page.getByRole('link', { name: productName , exact:true}).first().click();

    }
}