import { Context } from '../../src/types';
import { ProviderEnum } from '../../src/common';

export const context: Context = {
  stage: 'test',
  stackName: 'testStack',
  provider: ProviderEnum.ALIYUN,
  region: 'cn-hangzhou',
  accessKeyId: 'testAccessKeyId',
  accessKeySecret: 'testAccessKeySecret',
  iacLocation: 'path/to/iac/location',
  parameters: [
    { key: 'testVar', value: 'testVarValue' },
    { key: 'newTestVar', value: 'newTestVarValue' },
    { key: 'handler', value: 'index.handler' },
  ],
  stages: {
    default: [{ key: 'testVar', value: 'testVarValue' }],
    test: [
      { key: 'testVar', value: 'testVarValue' },
      { key: 'testStage', value: 'testStageValue' },
    ],
  },
  tags: [{ key: 'owner', value: 'geekfun' }],
};

export const defaultContext = {
  accessKeyId: 'access key id',
  accessKeySecret: 'access key secret',
  iacLocation: expect.stringContaining('tests/fixtures/serverless-insight.yml'),
  parameters: [],
  region: 'cn-hangzhou',
  provider: ProviderEnum.ALIYUN,
  securityToken: 'account id',
  stackName: 'my-demo-stack',
  stage: 'default',
};
