// https://docs.expo.dev/guides/using-eslint/
const { defineConfig, globalIgnores } = require('eslint/config');
const expoFlat = require('eslint-config-expo/flat');

module.exports = defineConfig([
  globalIgnores(['dist/**', '.expo/**', 'node_modules/**', 'coverage/**', 'web-build/**']),
  ...expoFlat,
  {
    rules: {
      // Explicit `import React from 'react'` in every JSX module (team convention).
      'react/react-in-jsx-scope': 'error',
    },
  },
  {
    // Jest mock setup relies on `require` inside the factory (factory runs before ESM).
    files: ['jest.preset-mocks.ts', 'jest.setup.ts', 'jest.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]);
