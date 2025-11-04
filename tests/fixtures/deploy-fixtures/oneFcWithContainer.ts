import { ServerlessIac } from '../../../src/types';
import { oneFcIac, oneFcRos } from './oneFc';

export const oneFcWithContainerIac = {
  ...oneFcIac,
  functions: [
    {
      ...((oneFcIac.functions && oneFcIac.functions[0]) ?? {}),
      code: undefined,
      container: {
        image: 'registry.cn-hangzhou.aliyuncs.com/aliyunfc/abcd:1.6.0',
        cmd: 'npm start',
        port: 9200,
      },
    },
  ],
} as ServerlessIac;

export const oneFcWithContainerRos = {
  ...oneFcRos,
  Resources: {
    ...oneFcRos.Resources,
    hello_fn: {
      ...oneFcRos.Resources.hello_fn,
      Properties: {
        ...oneFcRos.Resources.hello_fn.Properties,
        Code: undefined,
        Runtime: 'custom-container',
        CustomContainerConfig: {
          Command: ['npm', 'start'],
          Image: 'registry.cn-hangzhou.aliyuncs.com/aliyunfc/abcd:1.6.0',
          Port: 9200,
        },
      },
    },
  },
};
