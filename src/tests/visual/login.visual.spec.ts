import {test,expect} from '@playwright/test'
import { getTestData} from '../../utils/testdatareader';
import {LOGIN_DATA_PATH} from '../../constants/constants';
import { LoginPage } from '../../pages/login.page';

test("To verify the visual testing",async({page})=>{

    const pageUrl = getTestData("sauce-url", LOGIN_DATA_PATH);
   await page.goto(pageUrl)
    await expect(page).toHaveScreenshot()

})

test.only("To verify the visual testing for dashboard screen",async({page})=>{

    const loginPage = new LoginPage(page);
    const pageUrl = getTestData("sauce-url", LOGIN_DATA_PATH);
    await page.goto(pageUrl)
    await loginPage.login('standard_user','secret_sauce')
    await loginPage.clickonLoginButton()
    await expect(page).toHaveScreenshot()

})

test.only("To verify the visual testing for perticular field",async({page})=>{

    const pageUrl = getTestData("sauce-url", LOGIN_DATA_PATH);
    await page.goto(pageUrl)
    const mainSection = page.locator(".login_wrapper-inner")
    const button = page.locator('#login-button')
    await button.evaluate((element)=>{
        element.style.visibility ='hidden'
    })
    await page.waitForLoadState('networkidle')
    await mainSection.waitFor({state:'visible'})
    expect(await mainSection.screenshot()).toMatchSnapshot()

})