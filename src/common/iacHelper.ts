import path from 'node:path';
import fs from 'node:fs';
import * as ros from '@alicloud/ros-cdk-core';

export const resolveCode = (location: string): string => {
  const filePath = path.resolve(process.cwd(), location);
  const fileContent = fs.readFileSync(filePath);

  return fileContent.toString('base64');
};

export const replaceReference = <T>(value: T, stage: string): T => {
  if (typeof value === 'string') {
    const matchVar = value.match(/^\$\{vars\.(\w+)}$/);
    const containsVar = value.match(/\$\{vars\.(\w+)}/);
    const matchMap = value.match(/^\$\{stages\.(\w+)}$/);
    const containsMap = value.match(/\$\{stages\.(\w+)}/);
    const matchFn = value.match(/^\$\{functions\.(\w+(\.\w+)?)}$/);

    if (matchVar?.length) {
      return ros.Fn.ref(matchVar[1]) as T;
    }
    if (matchMap?.length) {
      return ros.Fn.findInMap('stages', '', matchMap[1]) as T;
    }

    if (matchFn?.length) {
      return ros.Fn.getAtt(matchFn[1], 'FunctionName') as T;
    }
    if (containsMap?.length && containsVar?.length) {
      return ros.Fn.sub(
        value.replace(/\$\{stages\.(\w+)}/g, '${$1}').replace(/\$\{vars\.(\w+)}/g, '${$1}'),
      ) as T;
    }
    if (containsVar?.length) {
      return ros.Fn.sub(value.replace(/\$\{vars\.(\w+)}/g, '${$1}')) as T;
    }
    if (containsMap?.length) {
      return ros.Fn.sub(value.replace(/\$\{stages\.(\w+)}/g, '${$1}')) as T;
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceReference(item, stage)) as T;
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, replaceReference(val, stage)]),
    ) as T;
  }

  return value;
};
