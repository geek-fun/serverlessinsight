import { deployStack, parseYaml } from '../stack';
import { printer, constructActionContext } from '../common';

export const deploy = async (
  stackName: string,
  options: { location: string; parameters: { [key: string]: string } },
) => {
  const context = constructActionContext(options);
  printer.info('Validating yaml...');
  const iac = parseYaml(context.iacLocation);
  printer.success('Yaml is valid! 🎉');

  printer.info('Deploying stack...');
  await deployStack(stackName, iac, context);

  printer.success('Stack deployed! 🎉');
};
