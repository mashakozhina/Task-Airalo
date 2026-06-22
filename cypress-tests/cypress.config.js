const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  viewportWidth: 1450,
  viewportHeight: 900,
  chromeWebSecurity: false,
  scrollBehavior: 'center',
  retries: {
    runMode: 1,
    openMode: 0,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: process.env.BASE_URL || '',
    specPattern: 'integration/**/*.{js,jsx}',
    supportFile: 'support/e2e.js',
  },
})
