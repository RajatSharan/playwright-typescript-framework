# Playwright TypeScript Test Automation Framework

A scalable and maintainable test automation framework built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/). This repository serves as a comprehensive learning resource for building professional-grade test automation solutions.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
  - [Page Object Model](#page-object-model)
  - [Fixtures](#fixtures)
  - [Test Data Management](#test-data-management)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [Contributing](#contributing)
- [Learning Resources](#learning-resources)

## ✨ Features

- **Page Object Model (POM)**: Organized and maintainable test structure
- **TypeScript Support**: Full type safety and IntelliSense for better development experience
- **Fixtures**: Custom fixtures for test setup and teardown
- **Test Data Management**: Centralized test data handling
- **Cross-browser Testing**: Run tests on Chromium, Firefox, and WebKit
- **Parallel Execution**: Execute tests concurrently for faster feedback
- **Screenshots & Videos**: Automatic capture on test failures
- **CI/CD Ready**: Pre-configured for GitHub Actions, Jenkins, and other CI/CD platforms
- **Comprehensive Reporting**: Detailed HTML reports with test results

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | Latest | End-to-end testing framework |
| **TypeScript** | 5.x+ | Type-safe JavaScript |
| **Node.js** | 16.x+ | JavaScript runtime |
| **Jest/Mocha** | Latest | Test runner (if configured) |

**Language Composition**:
- TypeScript: 57.1%
- JavaScript: 38.5%
- HTML: 3.3%
- CSS: 1.1%

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: v16.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Package managers
- **Git**: Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/RajatSharan/playwright-typescript-framework.git
   cd playwright-typescript-framework
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Verify installation**

   ```bash
   npm run test:help
   ```

### Project Structure

```
playwright-typescript-framework/
├── src/
│   ├── pages/                 # Page Object Model classes
│   │   ├── basePage.ts
│   │   ├── loginPage.ts
│   │   └── dashboardPage.ts
│   ├── fixtures/              # Custom Playwright fixtures
│   │   └── fixtures.ts
│   ├── utils/                 # Utility functions
│   │   ├── logger.ts
│   │   └── helpers.ts
│   └── config/                # Configuration files
│       └── testConfig.ts
├── tests/
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   ├── e2e/                   # End-to-end tests
│   └── data/                  # Test data
├── reports/                   # Test execution reports
├── .github/
│   └── workflows/            # CI/CD configurations
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 🎯 Core Concepts

### Page Object Model

The Page Object Model pattern encapsulates page elements and interactions into separate classes, making tests more maintainable and readable.

**Example Page Class**:

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button:has-text("Login")');
  }

  async navigateTo() {
    await this.page.goto('https://example.com/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

**Example Test**:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('User can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo();
  await loginPage.login('user@example.com', 'password123');
  
  expect(page.url()).toContain('/dashboard');
});
```

### Fixtures

Custom fixtures provide reusable setup and teardown logic for tests.

**Example Fixture**:

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

type TestFixtures = {
  authenticatedPage: void;
  loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  authenticatedPage: async ({ page, loginPage }, use) => {
    await loginPage.navigateTo();
    await loginPage.login('user@example.com', 'password123');
    await use();
  },
});
```

### Test Data Management

Centralize your test data for better maintainability.

**Example Data File** (`tests/data/testData.ts`):

```typescript
export const testData = {
  users: {
    admin: {
      email: 'admin@example.com',
      password: 'AdminPassword123',
    },
    user: {
      email: 'user@example.com',
      password: 'UserPassword123',
    },
  },
  urls: {
    login: 'https://example.com/login',
    dashboard: 'https://example.com/dashboard',
  },
};
```

## 🏃 Running Tests

### Run all tests

```bash
npm run test
```

### Run tests in a specific file

```bash
npm run test -- tests/e2e/login.spec.ts
```

### Run tests with a specific tag

```bash
npm run test -- --grep @smoke
```

### Run tests in headed mode (visible browser)

```bash
npm run test:headed
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Generate HTML report

```bash
npm run test:report
```

### View latest report

```bash
npm run test:show-report
```

## 📚 Best Practices

### 1. **Use Explicit Waits**
   ```typescript
   await page.waitForSelector('button:text("Next")');
   ```

### 2. **Avoid Hard Waits**
   ```typescript
   // ❌ Don't do this
   await page.waitForTimeout(5000);
   
   // ✅ Do this instead
   await page.waitForLoadState('networkidle');
   ```

### 3. **Use Meaningful Locators**
   ```typescript
   // ❌ Avoid
   const button = page.locator('button:nth-of-type(3)');
   
   // ✅ Use
   const submitButton = page.locator('button[aria-label="Submit Form"]');
   ```

### 4. **Keep Tests Independent**
   - Each test should be able to run in isolation
   - Don't depend on the order of test execution
   - Use fixtures for setup and teardown

### 5. **Use Descriptive Test Names**
   ```typescript
   test('User can successfully log in with valid credentials', async ({ page }) => {
     // test code
   });
   ```

### 6. **Organize Tests by Feature**
   ```
   tests/
   ├── auth/
   ├── checkout/
   └── profile/
   ```

## 🔄 CI/CD Integration

### GitHub Actions

Sample workflow file (`.github/workflows/tests.yml`):

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run tests
        run: npm run test
      
      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## 📖 Learning Resources

- [Playwright Official Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices for E2E Testing](https://testingjavascript.com/)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support & Questions

If you have questions or need help:

- Open an [issue](https://github.com/RajatSharan/playwright-typescript-framework/issues)
- Check existing [discussions](https://github.com/RajatSharan/playwright-typescript-framework/discussions)
- Review the documentation and examples in this repository

---

**Happy Testing! 🎭**

Made with ❤️ for the test automation community.
