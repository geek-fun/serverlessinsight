import { parseYaml } from '../iac';
import { printer } from '../common';
import { constructActionContext } from '../common/actionContext';

export const validate = (location?: string) => {
  const context = constructActionContext({ location });
  parseYaml(context.iacLocation);
  printer.success('Yaml is valid! 🎉');
};
