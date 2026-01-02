import { TemplateFormat } from '../types';
import yaml from 'yaml';
import { generateStackTemplate } from '../stack/deploy';
import { getIacLocation, logger, setContext, getCredentials, hasCredentials } from '../common';
import { parseYaml } from '../parser';

export const template = async (
  stackName: string,
  options: { format: TemplateFormat; location: string; stage: string | undefined },
) => {
  const iac = parseYaml(getIacLocation(options.location));

  const credentials = getCredentials(undefined, iac.provider.name);
  const shouldFetchIamInfo = hasCredentials(credentials);

  await setContext({ ...options, stackName, provider: iac.provider.name }, shouldFetchIamInfo);
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
