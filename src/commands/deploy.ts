import { deployStack } from '../stack';
import { constructActionContext, getIacLocation, logger } from '../common';
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

  const context = constructActionContext({ ...options, stackName, iacProvider: iac.provider });

  logger.info('Deploying stack...');
  await deployStack(stackName, iac, context);

  logger.info('Stack deployed! 🎉');
};
