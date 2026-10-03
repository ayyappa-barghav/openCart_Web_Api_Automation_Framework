
import { Locator, Page } from "playwright";
import {BasePage} from "./BasePage"

export class ProductInfoPage extends BasePage{

    //private readonly header: Locator
    private readonly productImages: Locator
    private readonly productMetaData: Locator
    private readonly productPricing: Locator
    private productMap: Map<string , string | number>

    constructor(page: Page){
        super(page)
        this.productImages = page.locator('.thumbnails img')
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li')
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li')
        this.productMap = new Map<string, string | number>();
    }

    async getProductImagesCount(): Promise<number>{
        
        let imageCount = await this.productImages.count();
        return imageCount
    }

    async getProductData(){
        //await this.getProductImagesCount();
        await this.getProductMetaData();
        await this.getProductPricing();
        return this.productMap;

    }

    private async getProductMetaData(): Promise<void> {
        let metaData: string[] = await this.productMetaData.allInnerTexts();
        for(let data of metaData){
            let meta = data.split(':')
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.productMap.set(metaKey, metaValue)
        }
        
    }

    private async getProductPricing(): Promise<void> {
        await this.page.waitForTimeout(1000)
        let priceData: string[] = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let productTax = priceData[1].split(':')[1].trim();
        this.productMap.set('productPrice', productPrice)
        this.productMap.set('productTax', productTax)
    }
}