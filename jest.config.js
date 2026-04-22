/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.preset-mocks.ts', '<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/domain/**/*.ts',
    'src/components/organisms/DoublyLinkedListScreen.tsx',
    '!**/*.d.ts',
  ],
};
