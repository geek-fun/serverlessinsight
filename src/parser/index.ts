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
import { isStringTemplateField } from './templateValues';
import { calcValue } from '../common';
import { lang } from '../lang';

const validateExistence = (path: string) => {
  if (!existsSync(path)) {
    throw new Error(lang.__('IAC_FILE_NOT_FOUND', { path }));
  }
};

const parseBackend = (raw: BackendConfigRaw | undefined): BackendConfig | undefined => {
  // No backend config → default to SAAS
  if (!raw || !raw.state_manager) {
    return { type: StateBackendType.SAAS };
  }

  const stateManager = raw.state_manager;
  const type = stateManager.type?.toUpperCase();

  if (type === StateBackendType.BUCKET_STORE) {
    if (!stateManager.bucket || !stateManager.key) {
      throw new Error(lang.__('PARSE_BACKEND_BUCKET_STORE_FIELDS_REQUIRED'));
    }
    return {
      type: StateBackendType.BUCKET_STORE,
      bucket: stateManager.bucket,
      key: stateManager.key,

      ...(stateManager.storageRegion ? { storageRegion: stateManager.storageRegion } : {}),
      ...(stateManager.storageProvider ? { storageProvider: stateManager.storageProvider } : {}),
    };
  }

  if (type === StateBackendType.SAAS) {
    return { type: StateBackendType.SAAS };
  }

  return { type: StateBackendType.LOCAL };
};

const transformYaml = (iacJson: ServerlessIacRaw, stage?: string): ServerlessIac => {
  return {
    app: iacJson.app,
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
    tags: parseTag(iacJson.tags, iacJson.app, iacJson.service, stage),
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

const evaluateObject = <T>(
  obj: T,
  ctx: Context,
  iacVars?: Record<string, unknown>,
  path: Array<string | number> = [],
): T => {
  if (typeof obj === 'string') {
    return calcValue<string>(obj, ctx, iacVars, !isStringTemplateField(path)) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item, index) => evaluateObject(item, ctx, iacVars, [...path, index])) as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        evaluateObject(val, ctx, iacVars, [...path, key]),
      ]),
    ) as T;
  }

  return obj;
};

const assertProviderOverrideResources = (iac: ServerlessIacRaw): void => {
  const provider = iac.provider.name;
  const unsupportedSections =
    provider === 'tencent'
      ? (['events', 'tables'] as const)
      : provider === 'volcengine'
        ? (['databases', 'tables'] as const)
        : [];
  const unsupportedSection = unsupportedSections.find(
    (section) => Object.keys(iac[section] ?? {}).length > 0,
  );
  const unsupportedDatabase = Object.entries(iac.databases ?? {}).find(([, database]) =>
    provider === 'aliyun'
      ? database.type === 'TDSQL_C_SERVERLESS'
      : provider === 'tencent'
        ? !['TDSQL_C_SERVERLESS', 'ELASTICSEARCH_SERVERLESS'].includes(database.type)
        : false,
  );
  const resource =
    unsupportedSection ?? (unsupportedDatabase ? `databases.${unsupportedDatabase[0]}` : undefined);
  if (resource)
    throw new Error(lang.__('EFFECTIVE_CONFIG_RESOURCE_UNSUPPORTED', { provider, resource }));
};

export const revalYaml = (iacLocation: string, ctx: Context): ServerlessIac => {
  validateExistence(iacLocation);

  const yamlContent = readFileSync(iacLocation, 'utf8');
  const iacJson = parse(yamlContent) as ServerlessIacRaw;

  validateYaml(iacJson);

  const staticFields = {
    app: iacJson.app,
    service: iacJson.service,
    version: iacJson.version,
    provider: { ...iacJson.provider, name: ctx.provider, region: ctx.region },
  };

  const evaluatedIacJson = evaluateObject({ ...iacJson, ...staticFields }, ctx, iacJson.vars);
  const resolved = { ...evaluatedIacJson, ...staticFields };
  validateYaml(resolved);
  if (iacJson.provider.name !== ctx.provider) assertProviderOverrideResources(resolved);
  const iac = transformYaml(resolved, ctx.stage);

  if (iac.functions) {
    iac.functions = iac.functions.map((fn) => ({
      ...fn,
      memory: fn.memory || 128,
      timeout: fn.timeout || 3,
    }));
  }

  return iac;
};
