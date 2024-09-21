import { deployStack } from '../stack';
import { printer } from '../common';
import { parseYaml } from '../iac';
import { constructActionContext } from '../common/actionContext';

export const deploy = async (stackName: string, options: { location: string }) => {
  const context = constructActionContext({ location: options.location });
  printer.info(`Deploying stack context: ${JSON.stringify(context)}...`);
  printer.info('Validating yaml...');
  const iac = parseYaml(context.iacLocation);
  printer.success('Yaml is valid! 🎉');

  printer.info('Deploying stack...');
  await deployStack(stackName, iac, context);

  printer.success('Stack deployed! 🎉');
};
