# DevSphere E2E Automation

End-to-End Playwright Automation testing suite for **DevSphere** - a development platform deployed at [dev-sphere-phi.vercel.app](https://dev-sphere-phi.vercel.app).

## 📋 Project Overview

This repository contains comprehensive Playwright automation tests covering multiple areas of the DevSphere application including:
- **Homepage** - Landing page and navigation tests
- **Authentication** - Login/registration and session management
- **Compiler** - Code compilation and execution features
- **Smoke Tests** - Critical path validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
cd devsphere-automation
npm install
```
```run
npx playwright test tests/03-compiler.spec.js --headed
```

### Configuration

The project uses `playwright.config.js` with the following defaults:
- **Base URL**: https://dev-sphere-phi.vercel.app
- **Headless Mode**: Disabled (runs in headed mode for visibility)
- **Screenshots**: Captured on test failure
- **Videos**: Retained on failure for debugging
- **Traces**: Recorded on first retry for detailed debugging

## 📁 Project Structure

```
devsphere-automation/
├── tests/                  # Test specifications
│   ├── 01-homepage.spec.js
│   ├── 02-auth.spec.js
│   └── 03-compiler.spec.js
├── pages/                  # Page Object Models
│   ├── HomePage.js
│   ├── AuthPage.js
│   └── CompilerPage.js
├── data/                   # Test data
│   └── testData.json
├── utils/                  # Utility functions
├── screenshots/            # Test failure screenshots
│   ├── auth/
│   ├── compiler/
│   └── smoke/
├── test-results/           # Test execution reports
├── package.json
└── playwright.config.js    # Playwright configuration
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run specific test suites
```bash
npm run test:smoke       # Smoke tests only
npm run test:auth        # Authentication tests
npm run test:compiler    # Compiler feature tests
npm run test:e2e         # End-to-end tests
npm run test:homepage    # Homepage tests
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

## 🏗️ Page Object Model

The tests use the Page Object Model pattern for maintainability:

- **HomePage.js** - Homepage elements and interactions
- **AuthPage.js** - Login/registration page elements
- **CompilerPage.js** - Code editor and compiler features

## 📊 Test Results

Test results including HTML reports are generated in the `test-results/` directory after each test run.

## 📸 Screenshots & Videos

- **Screenshots**: Automatically captured on test failures in `screenshots/` directory
- **Videos**: Retained on failure for detailed debugging
- **Traces**: Generated on first retry for advanced debugging

## 🔧 Technologies Used

- **Playwright** - Browser automation framework
- **JavaScript** - Test implementation language
- **Node.js** - Runtime environment

## 📝 Test Tags

Tests are organized using tags for selective execution:
- `@smoke` - Critical path tests
- `@auth` - Authentication tests
- `@compiler` - Compiler feature tests
- `@e2e` - Full end-to-end scenarios

## 📦 Dependencies

- `@playwright/test` (^1.52.0) - Playwright testing framework

## 🤝 Contributing

When adding new tests:
1. Follow the existing Page Object Model pattern
2. Add descriptive test tags
3. Place new tests in the appropriate spec file
4. Update this README if adding new test categories

## 📝 License

ISC

## 👤 Author

QA Automation Team
