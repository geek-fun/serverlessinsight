import { parse } from 'yaml';
import { existsSync, readFileSync } from 'node:fs';
import { Event, IacFunction, RawServerlessIac, ServerlessIac } from '../types';
import { validateYaml } from './iacSchema';

const mapToArr = (obj: Record<string, Record<string, unknown> | string>) => {
  return Object.entries(obj).map(([key, value]) =>
    typeof value === 'string' ? { [key]: value } : { id: key, ...value },
  );
};

const validateExistence = (path: string) => {
  if (!existsSync(path)) {
    throw new Error(`File does not exist at path: ${path}`);
  }
};

const transformYaml = (iacJson: RawServerlessIac): ServerlessIac => {
  return {
    service: iacJson.service,
    version: iacJson.version,
    provider: iacJson.provider,
    vars: iacJson.vars,
    stages: iacJson.stages,
    functions: mapToArr(iacJson.functions) as unknown as Array<IacFunction>,
    events: mapToArr(iacJson.events) as unknown as Array<Event>,
    tags: mapToArr(iacJson.tags) as unknown as Array<string>,
  };
};

export const parseYaml = (yamlPath: string): ServerlessIac => {
  validateExistence(yamlPath);

  const yamlContent = readFileSync(yamlPath, 'utf8');
  const iacJson = parse(yamlContent) as RawServerlessIac;

  validateYaml(iacJson);

  return transformYaml(iacJson);
};
