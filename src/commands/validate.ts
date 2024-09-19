import { parseYaml } from '../iac';
import { printer } from '../common';

export const validate = (location?: string) => {
  parseYaml(location);
  printer.success('Yaml is valid! 🎉');
};
