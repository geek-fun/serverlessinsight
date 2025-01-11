import { FunctionDomain, FunctionRaw } from '../types';
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
  }));
};
