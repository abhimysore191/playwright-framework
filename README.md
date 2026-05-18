# Playwright Test Suite

test suite for [practicesoftwaretesting.com](https://practicesoftwaretesting.com) using the **Page Object Model (POM)** pattern.


---

## Quick Start

### 1 · Install dependencies

```bash
npm install
```

### 2 · Install browser binaries

```bash
npx playwright install --with-deps
```

### 3 · Run all tests

```bash
# Headless (default)
npm test

# Headed (watch the browser)
npm run test --headed


# Debug mode (step through)
npm run test --debug
```

### 4 · View HTML report

```bash
npm run test:report
```

---

## Librarys used 
log4js
prettier
dotenv

## Environment Setup

### Create a .env file in the root directory:

BASE_URL=https://practicesoftwaretesting.com

Switch to buggy environment

To run tests against the buggy version:

BASE_URL=https://with-bugs.practicesoftwaretesting.com


## Framework Structure

### This project follows Page Object Model (POM):

pages/        → Page classes (UI actions & locators)
tests/        → Test specs
api/          → API helpers 
utils/        → Utilities (logger, helpers,)
