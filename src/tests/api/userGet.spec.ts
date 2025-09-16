import { UserApi } from '../../api/userApi';
import { test,expect } from '@playwright/test';

test.describe('GET API CALLS', () => {

    test('should get list of user',async({request})=>{

        const userApi= new UserApi(request)
        const response = await userApi.getUser()
        const responseBody= await response.json()
        expect(response.status()).toBe(200);
        expect(responseBody.data.length).toBeGreaterThan(0)
   })
    test('Fetch a list of users with pagination',async({request})=>{

        const userApi= new UserApi(request)
        const response = await userApi.getUserwithPagination(2)
        const responseBody= await response.json()
        expect(response.status()).toBe(200);
        expect(responseBody.total).toBe(12)
   })
   test('Fetch a single user by ID',async({request})=>{

        const userApi= new UserApi(request)
        const response = await userApi.getUserwithPagination(2)
        const responseBody= await response.json()
        expect(response.status()).toBe(200);
        expect(responseBody.total).toBe(12)
   })

})
