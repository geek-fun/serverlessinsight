import { constructActionContext, logger } from '../common';
import { parseYaml } from '../stack';

export const validate = (location?: string) => {
  const context = constructActionContext({ location });
  parseYaml(context.iacLocation);
  logger.info('Yaml is valid! 🎉');
  logger.debug('Yaml is valid! debug🎉');
};
