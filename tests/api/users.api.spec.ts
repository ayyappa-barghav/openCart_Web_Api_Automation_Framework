
import {test,expect} from '../../src/fixtures/apiFixtures'

const TOKEN = process.env.API_TOKEN

let authHeader = {
    Authorization: `Bearer ${TOKEN}`
}

let userId: number

test.describe.serial('execute all api in serial mode', ()=>{

    test('@smoke get the user details', async({apiFixture})=>{
       let response = await apiFixture.get('/public/v2/users', authHeader)
       expect(response.status).toBe(200)
    })

    test('@smoke post the user details', async({apiFixture})=>{
        let userData = {
            name: `fixtureAPI_${Date.now()}`,
            email: `fixtureapi_${Date.now()}@gmail.com`,
            status: 'active',
            gender: 'female'
        }
        let response = apiFixture.post('/public/v2/users', userData, authHeader)
        userId = (await response).body.id;
        console.log('Created user is', userId);
    })

    test('@smoke Put call - Update API', async({apiFixture})=>{
        console.log(userId);
        let userData = {
            name:'update from fixture',
            status:'inactive'
        };
        let response = await apiFixture.put(`/public/v2/users/${userId}`, userData, authHeader)
        expect((response).status).toBe(200)
    })

    test('@smoke delete call', async({apiFixture})=>{
        let response = await apiFixture.delete(`/public/v2/users/${userId}`, authHeader)
        expect(response.status).toBe(204)
    })
})