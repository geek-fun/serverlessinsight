import { deployStack, parseYaml } from '../stack';
import { constructActionContext, logger } from '../common';

export const deploy = async (
  stackName: string,
  options: { location: string; parameters: { [key: string]: string } },
) => {
  const context = constructActionContext({ ...options, stackName });
  logger.info('Validating yaml...');
  const iac = parseYaml(context.iacLocation);
  logger.info('Yaml is valid! 🎉');

  logger.info('Deploying stack...');
  await deployStack(stackName, iac, context);

  logger.info('Stack deployed! 🎉');
};
