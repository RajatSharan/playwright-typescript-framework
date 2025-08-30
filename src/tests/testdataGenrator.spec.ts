import { TestDataGenerator } from '../utils/testDataGenrator'
import {test} from '@playwright/test'

test('generate random test data', () => {
  // Random string
  const randomString = TestDataGenerator.generateRandomString(10);
  console.log('Random String:', randomString);

  // Random alphanumeric string
  const randomAlphanumeric = TestDataGenerator.generateRandomAlphanumeric(12);
  console.log('Random Alphanumeric:', randomAlphanumeric);

  // Random integer between 1 and 100
  const randomInt = TestDataGenerator.generateRandomInteger(1, 100);
  console.log('Random Integer:', randomInt);

  // Random email
  const randomEmail = TestDataGenerator.generateRandomEmail();
  console.log('Random Email:', randomEmail);

  // Random phone number
  const randomPhone = TestDataGenerator.generateRandomPhone();
  console.log('Random Phone:', randomPhone);

  // Random date between Jan 1, 2020 and Dec 31, 2025
  const randomDate = TestDataGenerator.generateRandomDate(new Date('2020-01-01'), new Date('2025-12-31'));
  console.log('Random Date:', randomDate);
});
