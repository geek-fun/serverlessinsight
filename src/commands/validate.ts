import { constructActionContext, logger } from '../common';
import { parseYaml } from '../parser';

export const validate = (
  stackName: string,
  options: { location: string | undefined; stage: string | undefined },
) => {
  const context = constructActionContext({ stackName, ...options });
  parseYaml(context.iacLocation);
  logger.info('Yaml is valid! 🎉');
};
