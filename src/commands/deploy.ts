import { deployStack } from '../stack';
import { getIacLocation, logger, setContext } from '../common';
import { parseYaml } from '../parser';
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
  const iac = parseYaml(getIacLocation(options.location));
  logger.info(lang.__('YAML_VALID'));

  await setContext({ ...options, stackName, iacProvider: iac.provider }, true);

  logger.info(lang.__('DEPLOYING_STACK'));
  await deployStack(stackName, iac);

  logger.info(lang.__('STACK_DEPLOYED'));
};
