import { deployStack } from '../stack';
import { printer } from '../common';
import { parseYaml } from '../iac';

export const deploy = (location?: string) => {
  printer.info('Validating yaml...');
  const iac = parseYaml(location);
  printer.success('Yaml is valid! 🎉');

  printer.info('Deploying stack...');
  deployStack(iac);
  printer.success('Stack deployed! 🎉');
};
