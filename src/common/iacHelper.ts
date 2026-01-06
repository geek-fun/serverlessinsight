import path from 'node:path';
import fs from 'node:fs';
import * as ros from '@alicloud/ros-cdk-core';
import { Context, FunctionDomain, ServerlessIac, Vars } from '../types';
import * as ossDeployment from '@alicloud/ros-cdk-ossdeployment';
import crypto from 'node:crypto';
import { get } from 'lodash';
import { parseYaml } from '../parser';
import { logger } from './logger';
import { lang } from '../lang';

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

  const fileName = path.basename(location);
  const objectKey = `${fcName}/${hash}-${fileName}`;

  const normalizedFilePath = filePath.replace(/\\/g, '/');
  const source = ossDeployment.Source.asset(
    normalizedFilePath,
    { deployTime: true },
    `${fcName}/${hash}-`,
  );

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

// Attempt to infer the type of the value if it was a template reference
const inferType = <T>(value: string, wasTemplateRef: boolean): T => {
  if (!wasTemplateRef) {
    return value as T;
  }

  // Try to parse as number
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value) as T;
  }

  // Try to parse as boolean
  if (value === 'true') {
    return true as T;
  }
  if (value === 'false') {
    return false as T;
  }

  return value as T;
};

export const calcValue = <T>(rawValue: string, ctx: Context, iacVars?: Vars): T => {
  const containsStage = rawValue.match(/\$\{ctx.stage}/);
  const containsVar = rawValue.match(/\$\{vars.\w+}/);
  const containsMap = rawValue.match(/\$\{stages\.(\w+)}/);

  // Check if the entire value is a single template reference (for type inference)
  const isExactTemplateRef = /^\$\{(vars|stages|ctx)\.[^}]+\}$/.test(rawValue);

  let value = rawValue;

  if (containsStage?.length) {
    value = rawValue.replace(/\$\{ctx.stage}/g, ctx.stage);
  }

  if (containsVar?.length) {
    // Use provided iacVars or parse from file
    const vars = iacVars ?? parseYaml(ctx.iacLocation).vars;

    const mergedParams = Array.from(
      new Map<string, string>(
        [
          ...Object.entries(vars ?? {}).map(([key, value]) => [key, String(value)]),
          ...(ctx.parameters ?? []).map(({ key, value }) => [key, value]),
        ].filter(([, v]) => v !== undefined) as Array<[string, string]>,
      ).entries(),
    ).map(([key, value]) => ({ key, value }));

    value = value.replace(/\$\{vars\.(\w+)}/g, (_, key) => {
      const paramValue = getParam(key, mergedParams);
      if (!paramValue) {
        logger.warn(lang.__('VARIABLE_NOT_FOUND', { key }));
      }
      return paramValue || '';
    });
  }

  if (containsMap?.length) {
    value = value.replace(/\$\{stages\.(\w+)}/g, (_, key) => {
      const stageValue = getParam(key, get(ctx.stages, `${ctx.stage}`));
      if (!stageValue) {
        logger.warn(
          lang.__('STAGE_VARIABLE_NOT_FOUND', {
            key,
            stage: ctx.stage,
          }),
        );
      }
      return stageValue || '';
    });
  }

  return inferType<T>(value, isExactTemplateRef);
};

export const getIacDefinition = (
  iac: ServerlessIac,
  rawValue: string,
): FunctionDomain | undefined => {
  const matchFn = rawValue.match(/^\$\{functions\.(\w+(\.\w+)?)}$/);
  if (matchFn?.length) {
    return iac.functions?.find((fc) => fc.key === matchFn[1]);
  }

  return iac.functions?.find((fc) => fc.key === rawValue);
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
