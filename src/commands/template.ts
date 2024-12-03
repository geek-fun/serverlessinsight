import { TemplateFormat } from '../types';
import yaml from 'yaml';
import { generateStackTemplate } from '../stack/deploy';
import { constructActionContext, logger } from '../common';
import { parseYaml } from '../stack';

export const template = (
  stackName: string,
  options: { format: TemplateFormat; location: string; stage: string | undefined },
) => {
  const context = constructActionContext({ ...options, stackName });
  const iac = parseYaml(context.iacLocation);
  const { template } = generateStackTemplate(stackName, iac, context);

  const output =
    options.format === TemplateFormat.JSON
      ? JSON.stringify(template, null, 2)
      : yaml.stringify(template);

  logger.info(`\n${output}`);
};
