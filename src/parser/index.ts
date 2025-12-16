import { existsSync, readFileSync } from 'node:fs';
import { ServerlessIac, ServerlessIacRaw, Context } from '../types';
import { parseFunction } from './functionParser';
import { parseEvent } from './eventParser';
import { parseDatabase } from './databaseParser';
import { parseTag } from './tagParser';
import { parse } from 'yaml';
import { validateYaml } from '../validator';
import { parseBucket } from './bucketParser';
import { parseTable } from './tableParser';
import { get } from 'lodash';

const validateExistence = (path: string) => {
  if (!existsSync(path)) {
    throw new Error(`File does not exist at path: ${path}`);
  }
};

const transformYaml = (iacJson: ServerlessIacRaw): ServerlessIac => {
  return {
    service: iacJson.service,
    version: iacJson.version,
    provider: iacJson.provider,
    vars: iacJson.vars,
    stages: iacJson.stages,
    functions: parseFunction(iacJson.functions),
    events: parseEvent(iacJson.events),
    databases: parseDatabase(iacJson.databases),
    tables: parseTable(iacJson.tables),
    tags: parseTag(iacJson.tags),
    buckets: parseBucket(iacJson.buckets),
  };
};

export const parseYaml = (iacLocation: string): ServerlessIac => {
  validateExistence(iacLocation);

  const yamlContent = readFileSync(iacLocation, 'utf8');
  const iacJson = parse(yamlContent) as ServerlessIacRaw;

  validateYaml(iacJson);

  return transformYaml(iacJson);
};

const getParam = (key: string, records?: Array<{ key: string; value: string }>) => {
  return records?.find((param) => param.key === key)?.value as string;
};

const evaluateValue = (
  rawValue: string,
  ctx: Context,
  iacVars?: Record<string, unknown>,
): string => {
  let value = rawValue;

  // Replace ${ctx.stage}
  if (value.includes('${ctx.stage}')) {
    value = value.replace(/\$\{ctx\.stage\}/g, ctx.stage);
  }

  // Replace ${vars.xxx}
  if (value.includes('${vars.')) {
    const mergedParams = Array.from(
      new Map<string, string>(
        [
          ...Object.entries(iacVars ?? {}).map(([key, value]) => [key, String(value)]),
          ...(ctx.parameters ?? []).map(({ key, value }) => [key, value]),
        ].filter(([, v]) => v !== undefined) as Array<[string, string]>,
      ).entries(),
    ).map(([key, value]) => ({ key, value }));

    value = value.replace(/\$\{vars\.(\w+)\}/g, (_, key) => getParam(key, mergedParams) || '');
  }

  // Replace ${stages.xxx}
  if (value.includes('${stages.')) {
    value = value.replace(
      /\$\{stages\.(\w+)\}/g,
      (_, key) => getParam(key, get(ctx.stages, `${ctx.stage}`)) || '',
    );
  }

  // Replace ${functions.xxx} with just the function key
  // This is used in events to reference functions
  if (value.includes('${functions.')) {
    value = value.replace(/\$\{functions\.(\w+(?:\.\w+)?)\}/g, '$1');
  }

  return value;
};

const evaluateObject = <T>(obj: T, ctx: Context, iacVars?: Record<string, unknown>): T => {
  if (typeof obj === 'string') {
    return evaluateValue(obj, ctx, iacVars) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => evaluateObject(item, ctx, iacVars)) as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [key, evaluateObject(val, ctx, iacVars)]),
    ) as T;
  }

  return obj;
};

export const revalYaml = (iacLocation: string, ctx: Context): ServerlessIac => {
  validateExistence(iacLocation);

  const yamlContent = readFileSync(iacLocation, 'utf8');
  const iacJson = parse(yamlContent) as ServerlessIacRaw;

  validateYaml(iacJson);

  // Evaluate all template variables in the raw JSON before transformation
  const evaluatedIacJson = evaluateObject(iacJson, ctx, iacJson.vars);

  const iac = transformYaml(evaluatedIacJson);

  // Set default values for optional fields in functions
  if (iac.functions) {
    iac.functions = iac.functions.map((fn) => ({
      ...fn,
      memory: fn.memory || 128,
      timeout: fn.timeout || 3,
    }));
  }

  return iac;
};
