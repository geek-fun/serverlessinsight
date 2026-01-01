import { FunctionDomain, FunctionGpuEnum, FunctionRaw, NasStorageClassEnum } from '../types';
import { isEmpty } from 'lodash';

// Helper function to convert a Resolvable<boolean> to boolean | undefined
const parseBoolean = (value: boolean | string | undefined): boolean | undefined => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return undefined;
};

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
          port:
            typeof func.container.port === 'number'
              ? func.container.port
              : Number(func.container.port) || 0,
        }
      : undefined,
    memory:
      typeof func.memory === 'number' ? func.memory : func.memory ? Number(func.memory) : undefined,
    gpu: func.gpu as FunctionGpuEnum,
    timeout:
      typeof func.timeout === 'number'
        ? func.timeout
        : func.timeout
          ? Number(func.timeout)
          : undefined,
    environment: func.environment,
    log: parseBoolean(func.log),
    network: func.network,
    storage: {
      disk:
        typeof func.storage?.disk === 'number'
          ? func.storage.disk
          : func.storage?.disk
            ? Number(func.storage.disk)
            : undefined,
      nas: func.storage?.nas?.map((nasItem) => ({
        mount_path: nasItem.mount_path,
        storage_class: nasItem.storage_class as NasStorageClassEnum,
      })),
    },
  }));
};
