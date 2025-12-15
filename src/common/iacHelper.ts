import path from 'node:path';
import fs from 'node:fs';
import * as ros from '@alicloud/ros-cdk-core';
import { Context, FunctionDomain, ServerlessIac } from '../types';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import crypto from 'node:crypto';
import { get } from 'lodash';
import { parseYaml } from '../parser';

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

export const calcRefs = <T>(rawValue: T, ctx: Context): T => {
  if (typeof rawValue === 'string') {
    const containsStage = rawValue.match(/\$\{ctx.\w+}/);
    const matchVar = rawValue.match(/^\$\{vars\.(\w+)}$/);
    const containsVar = rawValue.match(/\$\{vars\.(\w+)}/);
    const matchMap = rawValue.match(/^\$\{stages\.(\w+)}$/);
    const containsMap = rawValue.match(/\$\{stages\.(\w+)}/);
    const matchFn = rawValue.match(/^\$\{functions\.(\w+(\.\w+)?)}$/);
    let value = rawValue as string;
    if (containsStage) {
      value = value.replace(/\$\{ctx.stage}/g, ctx.stage);
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

    if (containsMap?.length || containsVar?.length) {
      value = ros.Fn.sub(
        rawValue.replace(/\$\{stages\.(\w+)}/g, '${$1}').replace(/\$\{vars\.(\w+)}/g, '${$1}'),
      );
    }

    return value as T;
  }

  if (Array.isArray(rawValue)) {
    return rawValue.map((item) => calcRefs(item, ctx)) as T;
  }

  if (typeof rawValue === 'object' && rawValue !== null) {
    return Object.fromEntries(
      Object.entries(rawValue).map(([key, val]) => [key, calcRefs(val, ctx)]),
    ) as T;
  }

  return rawValue;
};

const getParam = (key: string, records?: Array<{ key: string; value: string }>) => {
  return records?.find((param) => param.key === key)?.value as string;
};

export const calcValue = <T>(rawValue: string, ctx: Context): T => {
  const containsStage = rawValue.match(/\$\{ctx.stage}/);
  const containsVar = rawValue.match(/\$\{vars.\w+}/);
  const containsMap = rawValue.match(/\$\{stages\.(\w+)}/);

  let value = rawValue;

  if (containsStage?.length) {
    value = rawValue.replace(/\$\{ctx.stage}/g, ctx.stage);
  }

  if (containsVar?.length) {
    const { vars: iacVars } = parseYaml(ctx.iacLocation);

    const mergedParams = Object.entries(iacVars ?? {}).reduce(
      (map, [key, value]) => map.set(key, String(value)),
      new Map<string, string>(),
    );

    (ctx.parameters ?? []).forEach(({ key, value }) => mergedParams.set(key, value));
  }

  if (containsVar?.length) {
    const { vars: iacVars } = parseYaml(ctx.iacLocation);

    const mergedParams = Array.from(
      new Map<string, string>(
        [
          ...Object.entries(iacVars ?? {}).map(([key, value]) => [key, value]),
          ...(ctx.parameters ?? []).map(({ key, value }) => [key, value]),
        ].filter(([, v]) => v !== undefined) as Array<[string, string]>,
      ).entries(),
    ).map(([key, value]) => ({ key, value }));

    value = value.replace(/\$\{vars\.(\w+)}/g, (_, key) => getParam(key, mergedParams));
  }

  if (containsMap?.length) {
    value = value.replace(/\$\{stages\.(\w+)}/g, (_, key) =>
      getParam(key, get(ctx.stages, `${ctx.stage}`)),
    );
  }

  return value as T;
};

export const getIacDefinition = (
  iac: ServerlessIac,
  rawValue: string,
): FunctionDomain | undefined => {
  const matchFn = rawValue.match(/^\$\{functions\.(\w+(\.\w+)?)}$/);
  if (matchFn?.length) {
    return iac.functions?.find((fc) => fc.key === matchFn[1]);
  }
};

export const formatRosId = (id: string): string => {
  // Insert underscore before uppercase letters, but only when they follow a lowercase letter
  let result = id.replace(/([a-z])([A-Z])/g, '$1_$2');

  // Convert to lowercase
  result = result.toLowerCase();

  // Replace special characters with underscores
  result = result.replace(/[/*,/#,-]/g, '_');

  // Remove any number of underscores to single one
  result = result.replace(/_+/g, '_');

  // Remove leading underscores
  result = result.replace(/^_/, '');

  return result;
};

export const splitDomain = (domain: string) => {
  const parts = domain.split('.');
  const rr = parts.length > 2 ? parts[0] : '@';
  const domainName = parts.length > 2 ? parts.slice(1).join('.') : domain;

  return { rr, domainName };
};
