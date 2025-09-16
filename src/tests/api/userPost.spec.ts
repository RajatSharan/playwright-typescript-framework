import { UserApi } from '../../api/userApi';
import { test,expect } from '@playwright/test';

test.describe("POST API CALLS",()=>{

    test("Create a new user",async({request})=>{

        const userApi= new UserApi(request)
         const response = await userApi.createNewUser()
         const responseBody= await response.json()
         expect(responseBody.name).toBe("TIM MARK")
        expect(responseBody.job).toBe("Developer")

    })
})