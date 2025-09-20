import { UserApi } from '../../api/userApi';
import { test,expect } from '@playwright/test';
import { update_user_payload } from '../../constants/constants';
import {getTestData} from '../../utils/testdatareader'

test.describe("PUT API CALLS",()=>{

    test("Update the existing user",async({request})=>{

        const userApi= new UserApi(request)
        const response = await userApi.updateUser(1)
        const responseBody= await response.json()
        const expectedName = getTestData("name", update_user_payload)
        const expectedJob = getTestData("job", update_user_payload)
        expect(responseBody.name).toBe(expectedName)
        expect(responseBody.job).toBe(expectedJob)

    })
})
