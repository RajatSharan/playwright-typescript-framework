import test from "@playwright/test";
import { getJsonArray, getJsonObject, getTestData } from '../utils/testdatareader';
import {TEST_DATA_PATH} from '../constants/constants'


test("get started the link",async({page})=>{

    const url = getTestData("base_url",TEST_DATA_PATH)
    await page.goto(url)

})


test("Fatch data from the testdata",async({page})=>{

    const user=getJsonObject("user",TEST_DATA_PATH)
    console.log(user.name)
    console.log(user.role)

    const ids=getJsonArray("ids",TEST_DATA_PATH)
    console.log(ids[2])

})




