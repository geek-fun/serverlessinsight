import { constructActionContext, logger } from '../common';
import { parseYaml } from '../parser';

export const validate = (location: string | undefined, stage: string | undefined) => {
  const context = constructActionContext({ location, stage });
  parseYaml(context.iacLocation);
  logger.info('Yaml is valid! 🎉');
  logger.debug('Yaml is valid! debug🎉');
};
