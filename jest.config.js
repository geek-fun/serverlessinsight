/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: process.env.TEST_TYPE === 'service' ? 60000 : 30000,
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/dist/'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/types/**/*.ts', '!src/**/index.ts'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/tests/'],
  testMatch: ['**/tests/unit/**/*.test.ts', '**/tests/service/**/*.spec.test.ts'],
  moduleDirectories: ['node_modules', 'src'],
  coverageReporters: ['json-summary', 'text', 'html', 'lcov'],
};

process.env.LANG = 'en_US.UTF-8';
process.env.SI_REGION = 'cn-hangzhou';
process.env.ALIYUN_ACCESS_KEY_ID = 'access key id';
process.env.ALIYUN_ACCESS_KEY_SECRET = 'access key secret';
process.env.ALIYUN_SECURITY_TOKEN = 'account id';
