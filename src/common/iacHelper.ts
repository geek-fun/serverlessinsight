import path from 'node:path';
import fs from 'node:fs';
import * as ros from '@alicloud/ros-cdk-core';
import { ActionContext } from '../types';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import crypto from 'node:crypto';

export const resolveCode = (location: string): string => {
  const filePath = path.resolve(process.cwd(), location);
  const fileContent = fs.readFileSync(filePath);

  return fileContent.toString('base64');
};
export const readCodeSize = (location: string): number => {
  const filePath = path.resolve(process.cwd(), location);
  const stats = fs.statSync(filePath);
  return stats.size;
};

export const getFileSource = (
  fcName: string,
  location: string,
): { source: ossDeployment.ISource; objectKey: string } => {
  const filePath = path.resolve(process.cwd(), location);
  if (fs.lstatSync(filePath).isDirectory()) {
    throw new Error('The provided path is a directory, not a file.');
  }

  const hash = crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('hex');

  const objectKey = `${fcName}/${hash}-${filePath.split('/').pop()}`;
  const source = ossDeployment.Source.asset(filePath, { deployTime: true }, `${fcName}/${hash}-`);

  return { source, objectKey };
};

const evalCtx = (value: string, ctx: ActionContext): string => {
  const containsStage = value.match(/\$\{ctx.\w+}/);

  return containsStage ? value.replace(/\$\{ctx.stage}/g, ctx.stage) : value;
};

export const replaceReference = <T>(value: T, ctx: ActionContext): T => {
  if (typeof value === 'string') {
    const matchVar = value.match(/^\$\{vars\.(\w+)}$/);
    const containsVar = value.match(/\$\{vars\.(\w+)}/);
    const matchMap = value.match(/^\$\{stages\.(\w+)}$/);
    const containsMap = value.match(/\$\{stages\.(\w+)}/);
    const matchFn = value.match(/^\$\{functions\.(\w+(\.\w+)?)}$/);
    if (value.match(/\$\{ctx.\w+}/)) {
      return evalCtx(value, ctx) as T;
    }

    if (matchVar?.length) {
      return ros.Fn.ref(matchVar[1]) as T;
    }
    if (matchMap?.length) {
      return ros.Fn.findInMap('stages', ctx.stage, matchMap[1]) as T;
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
    return value.map((item) => replaceReference(item, ctx)) as T;
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, replaceReference(val, ctx)]),
    ) as T;
  }

  return value;
};
