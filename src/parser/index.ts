import { existsSync, readFileSync } from 'node:fs';
import { ServerlessIac, ServerlessIacRaw } from '../types';
import { parseFunction } from './functionParser';
import { parseEvent } from './eventParser';
import { parseDatabase } from './databaseParser';
import { parseTag } from './tagParser';
import { parse } from 'yaml';
import { validateYaml } from '../validator';
import { parseBucket } from './bucketParser';

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
