import {test,expect} from '@playwright/test'
import { getJsonArray,getTestData} from '../utils/testdatareader';
import {LOGIN_DATA_PATH} from '../constants/constants'
import { customLogger } from '../loggers/customLogger';
import { LoginPage } from '../pages/login.page';

const loginData = getJsonArray("loginData", LOGIN_DATA_PATH);
const pageUrl = getTestData("sauce-url", LOGIN_DATA_PATH);
const logger =new customLogger()

test.describe("Login Tests with Data Provider", () => {
    for (const data of loginData) {
        test(`Login test with username: ${data.username},password: ${data.password}`,async({page}) => {

            const loginPage = new LoginPage(page);
            logger.info('Navigating to the login page')
            await loginPage.navigateTo(pageUrl) ;

            logger.info('Filling username and password')
            await loginPage.login(data.username,data.password)

            logger.info('Clicking login button')
            await loginPage.clickonLoginButton()

            if (data.username === 'standard_user' && data.password === 'secret_sauce') {

                logger.info("Checking the inventory page")
                await expect(page).toHaveURL(/inventory.html/);
                logger.info("Login Successfull")
            } else {
                await expect(page.locator('[data-test="error"]')).toBeVisible();
                logger.warn(`Login failed as expected for username: ${data.username}`);
            } 
        });
    }
});