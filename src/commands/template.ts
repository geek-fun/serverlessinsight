import { TemplateFormat } from '../types';
import yaml from 'yaml';
import { generateStackTemplate } from '../stack/deploy';
import { constructActionContext, getIacLocation, logger } from '../common';
import { parseYaml } from '../parser';

export const template = (
  stackName: string,
  options: { format: TemplateFormat; location: string; stage: string | undefined },
) => {
  const iac = parseYaml(getIacLocation(options.location));

  const context = constructActionContext({ ...options, stackName, provider: iac.provider.name });

  const { template } = generateStackTemplate(stackName, iac, context);
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
