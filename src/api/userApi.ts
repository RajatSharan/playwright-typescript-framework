import { APIRequestContext,expect } from "@playwright/test";
import { API_BASE_URL } from "../configuration/apiConfig";
import {commonHeaders} from "../configuration/apiHeaders"
import {getTestData} from "../utils/testdatareader"
import {create_user_payload,update_user_payload} from "../constants/constants"

export class UserApi{
    private request:APIRequestContext
    constructor(request:APIRequestContext){
        this.request=request
    }

    async getUser(){
        const response  = await this.request.get(`${API_BASE_URL}/api/users`,{
        headers: commonHeaders
        })
       
        expect(response.status()).toBe(200)
        return response
    }

    async getUserwithPagination(id:number){

        const response  = await this.request.get(`${API_BASE_URL}/api/users?page=${id}`,{
        headers: commonHeaders
        })
        expect(response.status()).toBe(200)
        return response

    }
     async getSingleUser(id:number){

        const response  = await this.request.get(`${API_BASE_URL}/api/users/${id}`,{
        headers: commonHeaders
        })
        expect(response.status()).toBe(200)
        return response

    }
         async createNewUser(){

        const name=getTestData("name",create_user_payload)
        const job=getTestData("job",create_user_payload)
        const response  = await this.request.post(`${API_BASE_URL}/api/users`,{
        headers: commonHeaders,
        data:{
                name: name,
                job: job
        }
        })
        expect(response.status()).toBe(201)
        return response

    }

      async updateUser(id:number){
        const name=getTestData("name",update_user_payload)
        const job=getTestData("job",update_user_payload)
        const response  = await this.request.put(`${API_BASE_URL}/api/users/${id}`,{
        headers: commonHeaders,
        data:{
                name: name,
                job: job
        }
        })
        expect(response.status()).toBe(200)
        return response
    }

     async deleteUser(users:number){

        const response  = await this.request.delete(`${API_BASE_URL}/api/users/${users}`,{
        headers: commonHeaders
        })
       
        return response

    }
}
