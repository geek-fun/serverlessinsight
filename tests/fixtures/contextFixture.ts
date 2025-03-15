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
