import { printer, constructActionContext } from '../common';
import { parseYaml } from '../stack';

export const validate = (location?: string) => {
  const context = constructActionContext({ location });
  parseYaml(context.iacLocation);
  printer.success('Yaml is valid! 🎉');
};
