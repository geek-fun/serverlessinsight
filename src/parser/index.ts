import { existsSync, readFileSync } from 'node:fs';
import {
  ServerlessIac,
  ServerlessIacRaw,
  Context,
  BackendConfig,
  BackendConfigRaw,
  StateBackendType,
} from '../types';
import { parseFunction } from './functionParser';
import { parseEvent } from './eventParser';
import { parseDatabase } from './databaseParser';
import { parseTag } from './tagParser';
import { parse } from 'yaml';
import { validateYaml } from '../validator';
import { parseBucket } from './bucketParser';
import { parseTable } from './tableParser';
import { calcValue } from '../common';

const validateExistence = (path: string) => {
  if (!existsSync(path)) {
    throw new Error(`File does not exist at path: ${path}`);
  }
};

const parseBackend = (raw: BackendConfigRaw | undefined): BackendConfig | undefined => {
  if (!raw) return undefined;

  const type = raw.type?.toUpperCase();

  if (type === StateBackendType.BUCKET_STORE) {
    if (!raw.bucket || !raw.key) {
      throw new Error('Backend type BUCKET_STORE requires both "bucket" and "key" fields');
    }
    return {
      type: StateBackendType.BUCKET_STORE,
      bucket: raw.bucket,
      key: raw.key,
      region: raw.region,
      accessKeyId: raw.accessKeyId,
      accessKeySecret: raw.accessKeySecret,
      securityToken: raw.securityToken,
    };
  }

  return { type: StateBackendType.LOCAL };
};

const transformYaml = (iacJson: ServerlessIacRaw): ServerlessIac => {
  return {
    service: iacJson.service,
    version: iacJson.version,
    provider: iacJson.provider,
    vars: iacJson.vars,
    stages: iacJson.stages,
    backend: parseBackend(iacJson.backend),
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

const evaluateObject = <T>(obj: T, ctx: Context, iacVars?: Record<string, unknown>): T => {
  if (typeof obj === 'string') {
    return calcValue<string>(obj, ctx, iacVars) as T;
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
