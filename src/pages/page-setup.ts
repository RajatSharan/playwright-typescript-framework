/**
* page-setup.ts: This module is responsible for setting up the initial state of a page before each test.
* It includes a hook that runs before each test, setting the page context. By centralizing these setup operations,
* it ensures a consistent starting point for each test, improving test reliability. It also exports a base test object
* with a beforeEach hook already set up. This can be used to define tests with the page context set up.
*/
import { Page, test as baseTest } from '@playwright/test';
// import { setPage } from './pageUtils';
// import { Logger } from '../logger/customLogger';


/**
* A hook that runs before each test, setting the page context.
* @param {Page} page - The page context provided by Playwright.
*/
baseTest.beforeEach(({ page }: { page: Page }) => {
//  Logger.debug('Setting up page for test');
//  setPage(page);
});

baseTest.afterEach(({ page }: { page: Page }) => {
//  Logger.debug('Setting up page for test');
//  setPage(page);
});


/**
* The base test object with a beforeEach hook already set up.
* This can be used to define tests with the page context set up.
*/
export const test = baseTest;