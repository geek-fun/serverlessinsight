import { FunctionDomain, FunctionGpuEnum, FunctionRaw, NasStorageClassEnum } from '../types';
import { isEmpty } from 'lodash';
import { parseBoolean, parseNumber, parseNumberWithDefault } from './parseUtils';

export const parseFunction = (functions?: {
  [key: string]: FunctionRaw;
}): Array<FunctionDomain> | undefined => {
  if (isEmpty(functions)) {
    return undefined;
  }
  return Object.entries(functions).map(([key, func]) => ({
    key,
    name: func.name,
    code: func.code
      ? {
          runtime: String(func.code.runtime),
          handler: func.code.handler,
          path: func.code.path,
        }
      : undefined,
    container: func.container
      ? {
          image: func.container.image,
          cmd: func.container.cmd,
          port: parseNumberWithDefault(func.container.port, 0),
        }
      : undefined,
    memory: parseNumber(func.memory),
    gpu: func.gpu as FunctionGpuEnum,
    timeout: parseNumber(func.timeout),
    environment: func.environment,
    log: parseBoolean(func.log),
    network: func.network,
    storage: {
      disk: parseNumber(func.storage?.disk),
      nas: func.storage?.nas?.map((nasItem) => ({
        mount_path: nasItem.mount_path,
        storage_class: nasItem.storage_class as NasStorageClassEnum,
      })),
    },
  }));
};
