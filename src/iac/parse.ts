import { parse } from 'yaml';
import { readFileSync } from 'node:fs';
import { RawServerlessIac } from '../types';

const mapToArr = (obj: Record<string, Record<string, unknown> | string>) => {
  return Object.entries(obj).map(([key, value]) =>
    typeof value === 'string' ? { [key]: value } : { id: key, ...value },
  );
};

const transformYaml = (iacJson: RawServerlessIac) => {
  return {
    service: iacJson.service,
    version: iacJson.version,
    provider: iacJson.provider,
    vars: iacJson.vars,
    stages: iacJson.stages,
    functions: mapToArr(iacJson.functions),
    events: mapToArr(iacJson.events),
    tags: mapToArr(iacJson.tags),
  };
};

export const parseYaml = (path: string) => {
  // read yaml from path
  const yamlContent = readFileSync(path, 'utf8');
  const iacJson = parse(yamlContent) as RawServerlessIac;

  return transformYaml(iacJson);
};
