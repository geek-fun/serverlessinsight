import { ServerlessIac } from '../../../src/types';
import { oneFcIac, oneFcRos } from './oneFc';

export const oneFcWithGpuIac = {
  ...oneFcIac,
  functions: [
    {
      ...((oneFcIac.functions && oneFcIac.functions[0]) ?? {}),
      gpu: 'TESLA_8',
    },
  ],
} as ServerlessIac;
export const oneFcWithGpuRos = {
  ...oneFcRos,
  Resources: {
    ...oneFcRos.Resources,
    hello_fn: {
      ...oneFcRos.Resources.hello_fn,
      Properties: {
        ...oneFcRos.Resources.hello_fn.Properties,
        GpuConfig: {
          GpuMemorySize: 8192,
          GpuType: 'fc.gpu.tesla.1',
        },
      },
    },
  },
};
