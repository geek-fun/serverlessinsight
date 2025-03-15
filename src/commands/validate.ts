import { getContext, logger, setContext } from '../common';
import { parseYaml } from '../parser';

export const validate = (
  stackName: string,
  options: { location: string | undefined; stage: string | undefined },
) => {
  setContext({ stackName, ...options });
  const context = getContext();
  parseYaml(context.iacLocation);
  logger.info('Yaml is valid! 🎉');
};
