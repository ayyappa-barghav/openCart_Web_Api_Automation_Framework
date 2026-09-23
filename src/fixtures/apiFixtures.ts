import {test as baseTest} from 'playwright/test';
import { apiHelper } from '../api/apiHelper';
import process from 'node:process';

type apiFixtures = {
    apiFixture: apiHelper
}

export let test = baseTest.extend<apiFixtures>({
    apiFixture: async ({request}, use) => {
            let apiFixture = new apiHelper(request, process.env.API_BASE_URL)
            await use(apiFixture)
    }
})

export {expect} from '@playwright/test'