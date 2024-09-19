import { parseYaml } from '../iac';
import path from 'node:path';
import { printer } from '../common';

export const validate = (location?: string) => {
  const projectRoot = path.resolve(process.cwd());
  const yamlPath = location
    ? path.resolve(projectRoot, location)
    : path.resolve(projectRoot, 'serverless-insight.yml');

  parseYaml(yamlPath);
  printer.success('Yaml is valid! 🎉');
};
