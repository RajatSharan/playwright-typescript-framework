import {test,expect} from '@playwright/test'
import { getJsonArray,getTestData} from '../utils/testdatareader';
import {LOGIN_DATA_PATH} from '../constants/constants'

const loginData = getJsonArray("loginData", LOGIN_DATA_PATH);
const pageUrl = getTestData("sauce-url", LOGIN_DATA_PATH);


test.describe("Login Tests with Data Provider", () => {
    for (const data of loginData) {
        test(`Login test with username: ${data.username},password: ${data.password}`,async({page}) => {
            await page.goto(pageUrl);
            await page.fill("#user-name", data.username);
            await page.fill('#password', data.password);
            await page.click('#login-button');

            if (data.username === 'standard_user' && data.password === 'secret_sauce') {
                await expect(page).toHaveURL(/inventory.html/);
            } else {
                await expect(page.locator('[data-test="error"]')).toBeVisible();
            } 
        });
    }
});