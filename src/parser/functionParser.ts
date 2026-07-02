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
    iam: func.iam
      ? {
          role:
            func.iam.role !== undefined
              ? typeof func.iam.role === 'string'
                ? func.iam.role
                : {
                    ...(func.iam.role.name !== undefined
                      ? { name: String(func.iam.role.name) }
                      : {}),
                    ...(func.iam.role.managed_policies !== undefined
                      ? { managed_policies: func.iam.role.managed_policies.map(String) }
                      : {}),
                    ...(func.iam.role.statements !== undefined
                      ? {
                          statements: func.iam.role.statements.map((s) => ({
                            sid: s.sid as string | undefined,
                            effect: s.effect as 'Allow' | 'Deny',
                            actions: s.actions.map(String),
                            resources: s.resources.map(String),
                          })),
                        }
                      : {}),
                  }
              : undefined,
        }
      : undefined,
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
