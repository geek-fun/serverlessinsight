import { TemplateFormat } from '../types';
import yaml from 'yaml';
import { generateStackTemplate } from '../stack/deploy';
import { getIacLocation, logger, setContext } from '../common';
import { parseYaml } from '../parser';

export const template = async (
  stackName: string,
  options: { format: TemplateFormat; location: string; stage: string | undefined },
) => {
  const iac = parseYaml(getIacLocation(options.location));

  await setContext({ ...options, stackName, provider: iac.provider.name }, true);
  const { template } = generateStackTemplate(stackName, iac);
  if (typeof template === 'string') {
    logger.info(`\n${template}`);
  } else {
    const output =
      options.format === TemplateFormat.JSON
        ? JSON.stringify(template, null, 2)
        : yaml.stringify(template);
    logger.info(`\n${output}`);
  }
};
