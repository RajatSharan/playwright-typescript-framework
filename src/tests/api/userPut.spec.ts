import { UserApi } from '../../api/userApi';
import { test,expect } from '@playwright/test';

test.describe("PUT API CALLS",()=>{

    test("Update the existing user",async({request})=>{

        const userApi= new UserApi(request)
         const response = await userApi.updateUser(1)
         const responseBody= await response.json()
         expect(responseBody.name).toBe("TIM MARK")
        expect(responseBody.job).toBe("QA")

    })
})