/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
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
};

process.env.LANG = 'en_US.UTF-8';
process.env.SI_REGION = 'cn-hangzhou';
process.env.ALIYUN_ACCESS_KEY_ID = 'access key id';
process.env.ALIYUN_ACCESS_KEY_SECRET = 'access key secret';
process.env.ALIYUN_SECURITY_TOKEN = 'account id';
