import { UserApi } from '../../api/userApi';
import { test,expect } from '@playwright/test';

test.describe("Delete API CALL",()=>{

    test("Delete the existing user",async({request})=>{

        const userApi= new UserApi(request)
        const response = await userApi.deleteUser(1)
        expect(response.status()).toBe(204)
    })
})