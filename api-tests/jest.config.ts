import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.ts'],
  moduleNameMapper: {
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@fixtures/(.*)$': '<rootDir>/fixtures/$1',
    '^@app-types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@context$': '<rootDir>/src/context/context',
    '^@interfaces$': '<rootDir>/src/interfaces/index',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
  },
  globalSetup: './src/globalSetup.ts',
  testTimeout: 30000,
  verbose: true,
  reporters: [
    'default',
    ['jest-html-reporters', { publicPath: 'test-results', filename: `report-${new Date().toISOString().replace(/[:.]/g, '-')}.html`, openReport: false }],
  ],
}

export default config
