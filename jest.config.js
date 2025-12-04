/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/test.setup.js"],
  moduleFileExtensions: ['ts', 'js'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  testPathIgnorePatterns: [
    "<rootDir>/wishcloud-angular/",
  ],
};

