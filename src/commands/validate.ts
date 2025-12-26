import { getContext, logger, setContext } from '../common';
import { parseYaml } from '../parser';
import { lang } from '../lang';

export const validate = async (
  stackName: string,
  options: { location: string | undefined; stage: string | undefined },
) => {
  await setContext({ stackName, ...options });
  const context = getContext();
  parseYaml(context.iacLocation);
  logger.info(lang.__('YAML_VALID'));
};
