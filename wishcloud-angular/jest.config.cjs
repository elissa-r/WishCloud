// jest.config.cjs
/** @type {import('jest').Config} */

const { createCjsPreset } = require('jest-preset-angular/presets');

const jestPresetAngular = createCjsPreset();

module.exports = {
  // Start from the Angular Jest preset
  ...jestPresetAngular,

  // Where your Angular specs live
  testMatch: ['<rootDir>/src/app/**/*.spec.ts'],

  // Run our setup after Jest env is ready
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};