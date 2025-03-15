import { getContext, getIacLocation, logger, rosStackDelete, setContext } from '../common';
import { parseYaml } from '../parser';

export const destroyStack = async (
  stackName: string,
  options: {
    location: string;
    region?: string;
    provider?: string;
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
  },
) => {
  const iac = parseYaml(getIacLocation(options.location));
  setContext({ stackName, ...options, iacProvider: iac.provider });
  const context = getContext();
  logger.info(
    `Destroying stack: ${stackName}, provider: ${context.provider}, region: ${context.region}...`,
  );
  await rosStackDelete(context);
};
