/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',

  // Run our setup file after Jest's environment is ready
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  // Look for Angular spec files
  testMatch: ['<rootDir>/src/app/**/*.spec.ts'],

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        useESM: true,
      },
    ],
  },

  // Let Jest transform Angular's ESM packages
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs|tslib/)'],
};