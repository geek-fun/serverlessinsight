import { deployStack } from '../stack';
import { getIacLocation, logger, setContext } from '../common';
import { parseYaml } from '../parser';

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
  logger.info('Validating yaml...');
  const iac = parseYaml(getIacLocation(options.location));
  logger.info('Yaml is valid! 🎉');

  await setContext({ ...options, stackName, iacProvider: iac.provider }, true);

  logger.info('Deploying stack...');
  await deployStack(stackName, iac);

  logger.info('Stack deployed! 🎉');
};
