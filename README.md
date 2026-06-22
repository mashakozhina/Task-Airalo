# Airalo QA Automation Framework

Automated test suite for Airalo using Cypress (UI) and Jest + Axios (API).

## Project structure

```
cypress-tests/
  pages/               # Page Object Models
  fixtures/            # Test data and constants
  integration/         # Test specs organised by feature
  support/             # Custom commands and global setup

api-tests/
  fixtures/            # Base URL, credentials, package config
  src/
    controllers/       # One class per API resource
    interfaces/        # Response type definitions
    utils/             # HTTP client wrapper
    context/           # Reads cached token and order from /tmp
    globalSetup.ts     # Runs once before all tests: fetches OAuth2 token
  test/
    auth/              # POST /v2/token
    orders/            # POST /v2/orders
    esims/             # GET /v2/sims/:iccid
```

## Setup

1. **Install UI test dependencies**

```bash
cd cypress-tests && npm install && cd ..
```

2. **Install API test dependencies**

```bash
cd api-tests && npm install && cd ..
```

3. **Create `.env` files**

For UI tests, create `cypress-tests/.env` (copy from `cypress-tests/.env.template`):

```bash
cp cypress-tests/.env.template cypress-tests/.env
```

The UI `.env` supports the following variables:

```
BASE_URL=
```

For API tests, create `api-tests/.env` (copy from `api-tests/.env.template`):

```bash
cp api-tests/.env.template api-tests/.env
```

The API `.env` supports the following variables:

```
API_BASE_URL=    # Airalo Partner API base URL
CLIENT_ID=       # OAuth2 client ID
CLIENT_SECRET=   # OAuth2 client secret
```

## Run tests

**Run UI tests (interactive):**

```bash
cd cypress-tests && npm run cy:open
```

**Run UI tests (headless):**

```bash
cd cypress-tests && npm run cy:run
```

**Run all API tests:**

```bash
cd api-tests && npm test
```

**Run a single API suite:**

```bash
cd api-tests && npm run test:auth
cd api-tests && npm run test:orders
cd api-tests && npm run test:esims
```

## UI test specs

| Test           | Description                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------- |
| EsimPackage.js | Search for Japan → select Unlimited type → select 7-day plan → verify price matches Total |

## API test specs

| Spec                | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| getToken.test.ts    | OAuth2 token — status 200, access_token present, token_type is Bearer |
| submitOrder.test.ts | Submit order for 6 eSIMs — status, message, iccid and qrcode per eSIM |
| getEsim.test.ts     | eSIM details for each iccid — status 200, iccid match, qrcode and lpa |

## Reports

**API tests** — an HTML report is generated in `api-tests/test-results/` after every run:

```bash
cd api-tests && npm test
# opens: api-tests/test-results/report-<timestamp>.html
```

**UI tests** — a Mochawesome HTML report is generated in `cypress-tests/mochawesome-report/` after every headless run:

```bash
cd cypress-tests && npm run cy:run
# opens: cypress-tests/mochawesome-report/report.html
```

## Notes

- API tests use a `globalSetup` that runs once before the full suite: it fetches the OAuth2 token, submits one order, and retrieves eSIM details for all 6 iccids. All test files read from this shared cache to avoid redundant requests and rate limiting
- UI test selectors are based on the live Airalo website DOM — if the site is updated, selectors in `cypress/pages/` may need updating
- The Airalo Partner API token endpoint requires `application/x-www-form-urlencoded` content type (not JSON)
