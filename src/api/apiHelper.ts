
import { APIRequestContext, APIResponse } from "playwright";

export class apiHelper{

    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string){
        this.request = request,
        this.baseURL = baseURL;
    }

    //helper methods

    //GET
    async get(endPoint: string, headers?: Record<string, string>){
       let response: APIResponse =  await this.request.get(`${this.baseURL}${endPoint}`, {
            headers: headers
        })
        
        return {
             body: await response.json(),
             status: response.status(),
             statusText: response.statusText()
        }
    }

    // POST
    async post(endPoint: string, data:object, headers?: Record<string, string>){
       let response: APIResponse =  await this.request.post(`${this.baseURL}${endPoint}`, {
            headers: headers,
            data: data
        })

        return {
             body: await response.json(),
             status: response.status(),
             statusText: response.statusText()
        }
    }

    //PUT
    async put(endPoint: string, data:object, headers?: Record<string, string>){
       let response: APIResponse =  await this.request.put(`${this.baseURL}${endPoint}`, {
            headers: headers,
            data: data
        })

        return {
             body: await response.json(),
             status: response.status(),
             statusText: response.statusText()
        }
    }

    //DELETE
     async delete(endPoint: string,headers?: Record<string, string>){
       let response: APIResponse =  await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers,
        })

        return {
             status: response.status(),
             statusText: response.statusText()
        }
    }


}