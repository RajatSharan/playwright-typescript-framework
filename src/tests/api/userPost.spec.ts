import { UserApi } from '../../api/userApi';
import { test,expect } from '@playwright/test';
import {create_user_payload} from '../../constants/constants'
import {getTestData} from '../../utils/testdatareader'

test.describe("POST API CALLS",()=>{

    test("Create a new user",async({request})=>{

        const userApi= new UserApi(request)
         const response = await userApi.createNewUser()
         const responseBody= await response.json()
         const expectedName = getTestData("name", create_user_payload)
        const expectedJob = getTestData("job", create_user_payload)
         expect(responseBody.name).toBe(expectedName)
        expect(responseBody.job).toBe(expectedJob)

    })
})