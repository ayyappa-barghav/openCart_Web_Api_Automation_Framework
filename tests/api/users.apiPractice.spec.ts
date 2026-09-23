
import {test, expect, APIResponse} from '@playwright/test'
import { json } from 'node:stream/consumers'

let authenticationToken = {
    Authorization: "Bearer 53d7d01bee5b4bfe6f4bfcffd4b35fb53cc8feeae0773c65e168d34ef7e31011"
}

test('get all users api test', async({request})=>{
    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users', {
        headers: authenticationToken
    })

    //console.log(response);
    let jsonBody = await response.json()
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(200)

})

test('create a user api test', async({request})=>{

    let userData = {
        name: 'growing person pw api',
        status: 'active',
        gender: 'male',
        email: `email_${Date.now()}@open.com`
    }

    // JS Object - JSON -> Serialization

    let response: APIResponse = await request.post('https://gorest.co.in/public/v2/users', {
        headers: authenticationToken,
        data: userData
    })

    let jsonBody = await response.json()
    console.log(jsonBody);
    console.log(response.status(), response.statusText());
    expect(response.status()).toBe(201)
})

test('update user', async({request})=>{

    let userData = {
  name: 'pw api created',
  email: 'email.grow@playwright.com',
  gender: 'male',
  status: 'active'
    }
    
    let response: APIResponse = await request.put('https://gorest.co.in/public/v2/users/8629698', {
        headers: authenticationToken,
        data: userData
    })

    console.log(await response.json());
    console.log(response.status(), response.statusText());
})