    import { test,expect } from '@playwright/test';
    import {create_user_payload,update_user_payload } from '../../constants/constants'
    import { getTestData } from '../../utils/testdatareader';
    import { UserApi } from '../../api/userApi';

    test.describe('API Chaining',()=>{

        test("Create, Get, and Delete a new user",async({request})=>{

            const userApi = new UserApi(request);
            const postResponse = await userApi.createNewUser();
            const postResponseBody = await postResponse.json();
            const expectedName = getTestData("name", create_user_payload);
            const expectedJob = getTestData("job", create_user_payload);
            expect(postResponse.status()).toBe(201);
            expect(postResponseBody.name).toBe(expectedName);
            expect(postResponseBody.job).toBe(expectedJob);

            // GET THE USER

            const knownUserId = 2;
            const getResponse = await userApi.getSingleUser(knownUserId)
            const getResponseBody = await getResponse.json();
            expect(getResponseBody.data.id).toBe(knownUserId);
            expect(getResponseBody.data.first_name).toBe("Janet");
            expect(getResponseBody.data.last_name).toBe("Weaver");


            //UPDATE THE USER

            const id = postResponseBody.id;
            const Updateresponse = await userApi.updateUser(id)
            const responseBody= await Updateresponse.json()
            const expectedupdatedName = getTestData("name", update_user_payload)
            const expectedupdatedJob = getTestData("job", update_user_payload)
            expect(responseBody.name).toBe(expectedupdatedName)
            expect(responseBody.job).toBe(expectedupdatedJob)



            //DELETE THE USER

            const deleteResponse = await userApi.deleteUser(id);
            expect(deleteResponse.status()).toBe(204);

        })



    })