import { getContext, getIacLocation, logger, setContext } from '../common';
import { parseYaml } from '../parser';
import { lang } from '../lang';

export const validate = async (options: {
  location: string | undefined;
  stage: string | undefined;
}) => {
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  await setContext({ app: rawIac.app, service: rawIac.service, ...options });
  const context = getContext();
  parseYaml(context.iacLocation);
  logger.info(lang.__('YAML_VALID'));
};
