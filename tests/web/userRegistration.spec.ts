import {test} from '../../src/fixtures/pageFixtures'; 

test('@smoke check user registation', async({loginPage,registrationPage})=>{
        await loginPage.goToLoginPage();
        await registrationPage.doUserRegistration()

})