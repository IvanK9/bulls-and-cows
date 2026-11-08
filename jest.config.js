import { createDefaultPreset } from 'ts-jest';

const defaultPreset = createDefaultPreset();

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'],

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    ...defaultPreset.transform,
  },

  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [],
      },
    },
  },

  clearMocks: true,
};
