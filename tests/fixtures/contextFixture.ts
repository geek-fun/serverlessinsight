import { ActionContext } from '../../src/types';

export const context: ActionContext = {
  stage: 'test',
  stackName: 'testStack',
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
