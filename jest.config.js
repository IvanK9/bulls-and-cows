import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'], // Чтобы Jest искал тесты только в папке src
  transform: {
    ...tsJestTransformCfg,
  },
  clearMocks: true,
};