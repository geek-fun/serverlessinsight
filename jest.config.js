/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

process.env.ROS_REGION_ID = 'cn-hangzhou';
process.env.ALIYUN_ACCESS_KEY_ID = 'access key id';
process.env.ALIYUN_ACCESS_KEY_SECRET = 'access key secret';
process.env.ALIYUN_SECURITY_TOKEN = 'account id';
