import { parse } from 'yaml';
import { existsSync, readFileSync } from 'node:fs';
import {
  DatabaseDomain,
  DatabaseEnum,
  DatabaseRaw,
  EventDomain,
  FunctionDomain,
  ServerlessIac,
  ServerlessIacRaw,
} from '../types';
import { validateYaml } from './iacSchema';
import { get, isEmpty } from 'lodash';

const mapToArr = (obj: Record<string, Record<string, unknown> | string | null | undefined>) => {
  if (!obj) {
    return [];
  }
  return Object.entries(obj)?.map(([key, value]) =>
    typeof value === 'string' ? { [key]: value } : { key, ...value },
  );
};

const mapToKvArr = (obj: Record<string, string> | null | undefined) => {
  if (!obj) {
    return [];
  }
  return Object.entries(obj)?.map(([key, value]) => ({ key, value }));
};

const validateExistence = (path: string) => {
  if (!existsSync(path)) {
    throw new Error(`File does not exist at path: ${path}`);
  }
};
const transformDatabase = (databases?: {
  [key: string]: DatabaseRaw;
}): Array<DatabaseDomain> | undefined => {
  if (isEmpty(databases)) {
    return undefined;
  }
  return Object.entries(databases)?.map(([key, database]) => ({
    key: key,
    name: database.name,
    type: database.type as DatabaseEnum,
    version: database.version,
    engineMode: database.engine_mode,
    security: {
      basicAuth: {
        password: get(database, 'security.basic_auth.password'),
      },
    },
    cu: database.cu,
    storageSize: database.storage_size,
    network: database.network && {
      public: database.network?.public as boolean,
    },
  }));
};
const transformYaml = (iacJson: ServerlessIacRaw): ServerlessIac => {
  return {
    service: iacJson.service,
    version: iacJson.version,
    provider: iacJson.provider,
    vars: iacJson.vars,
    stages: iacJson.stages,
    functions: mapToArr(iacJson.functions) as unknown as Array<FunctionDomain>,
    events: mapToArr(iacJson.events) as unknown as Array<EventDomain>,
    tags: [
      { key: 'iac-provider', value: 'ServerlessInsight' },
      ...mapToKvArr(iacJson.tags),
    ] as unknown as Array<{ key: string; value: string }>,
    databases: transformDatabase(iacJson.databases),
  };
};

export const parseYaml = (yamlPath: string): ServerlessIac => {
  validateExistence(yamlPath);

  const yamlContent = readFileSync(yamlPath, 'utf8');
  const iacJson = parse(yamlContent) as ServerlessIacRaw;

  validateYaml(iacJson);

  return transformYaml(iacJson);
};
