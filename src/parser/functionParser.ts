import { FunctionDomain, FunctionRaw, NasStorageClassEnum } from '../types';
import { isEmpty } from 'lodash';

export const parseFunction = (functions?: {
  [key: string]: FunctionRaw;
}): Array<FunctionDomain> | undefined => {
  if (isEmpty(functions)) {
    return undefined;
  }
  return Object.entries(functions).map(([key, func]) => ({
    key,
    name: func.name,
    runtime: func.runtime,
    handler: func.handler,
    memory: func.memory,
    timeout: func.timeout,
    environment: func.environment,
    code: func.code,
    log: func.log,
    network: func.network,
    storage: {
      disk: func.storage?.disk,
      nas: func.storage?.nas?.map((nasItem) => ({
        mount_path: nasItem.mount_path,
        storage_class: nasItem.storage_class as NasStorageClassEnum,
        vpc_id: nasItem.vpc_id,
        subnet_id: nasItem.subnet_id,
      })),
    },
  }));
};
