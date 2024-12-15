import { ActionContext } from '../../src/types';
import { ProviderEnum } from '../../src/common';

export const context: ActionContext = {
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
  ],
  tags: [{ key: 'owner', value: 'geekfun' }],
};
