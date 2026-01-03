import { deployStack } from '../stack';
import { getContext, getIacLocation, logger, setContext } from '../common';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';

export const deploy = async (
  stackName: string,
  options: {
    location: string;
    parameters?: { [key: string]: string };
    stage?: string;
    region?: string;
    provider?: string;
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
  },
) => {
  logger.info(lang.__('VALIDATING_YAML'));
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  logger.info(lang.__('YAML_VALID'));

  await setContext(
    { ...options, stackName, iacProvider: rawIac.provider, stages: rawIac.stages },
    true,
  );

  const context = getContext();
  const iac = revalYaml(iacLocation, context);

  logger.info(lang.__('DEPLOYING_STACK'));
  await deployStack(stackName, iac);

  logger.info(lang.__('STACK_DEPLOYED'));
};
