
import { apiHelper } from '../../src/api/apiHelper';
import {test,expect} from '../../src/fixtures/apiFixtures'

let TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

//helper - generic function -- create a user (POST CALL):
async function createUser(apiHelper: apiHelper) {
    //User JS Object:
    let userData = {
        name: 'apiautomation',
        email: `apiautomation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    let response = await apiHelper.post('/public/v2/users/',userData,AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}

//Test 1: Create a user test + verify: AAA
//POST ---> userID ---> GET /userID --> verify
test('@regression Create a user test', async ({ apiFixture }) => {
    //create a user:
    let userResponse = await createUser(apiFixture);
    console.log(userResponse);

    //get a user:
    let getResponse = await apiFixture.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');
});



//Test 2: Update a user test + verify: AAA
//POST ---> userID ---> GET /userID --> PUT /userID ---> GET /userID --> verify

test('regression update user', async ({apiFixture})=>{
    let response = await createUser(apiFixture)

    //get a user
    let getResponse = await apiFixture.get(`/public/v2/users/${response.id}`, AUTH_HEADER)
    console.log(getResponse);

    
    //update the user - PUT call

    let userUdpatedData = {
        gender: 'female',
        status: 'inactive'
    };

    let putResponse = await apiFixture.put(`/public/v2/users/${response.id}`,userUdpatedData,AUTH_HEADER);
    console.log(putResponse);
    expect.soft(putResponse.body.gender).toBe(userUdpatedData.gender)
    expect.soft(putResponse.body.status).toBe(userUdpatedData.status)
    expect.soft(putResponse.statusText).toBe('OK')
    expect(putResponse.status).toBe(200)

    //get the user after put call
    //get a user
    getResponse = await apiFixture.get(`/public/v2/users/${response.id}`, AUTH_HEADER)
    console.log(getResponse);

})

//Test 3: Delete a user test + verify: AAA
//POST ---> userID ---> GET /userID --> Delete /userID (204) ---> GET /userID (404) --> verify

test('regression - create, get, delete, get a user test', async({apiFixture})=>{
    
    //create a user
    let response = await createUser(apiFixture)

    //get the user
    let getResponse = await apiFixture.get(`/public/v2/users/${response.id}`,AUTH_HEADER);
    console.log(getResponse);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(response.id)

    //delete the user
    let deleteResponse = await apiFixture.delete(`/public/v2/users/${response.id}`,AUTH_HEADER);
    expect(deleteResponse.status).toBe(204)

    //get the user again
    getResponse = await apiFixture.get(`/public/v2/users/${response.id}`,AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');

})