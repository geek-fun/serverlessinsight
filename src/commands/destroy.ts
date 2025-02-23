import { constructActionContext, getIacLocation, logger, rosStackDelete } from '../common';
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
  const context = constructActionContext({ stackName, ...options, iacProvider: iac.provider });
  logger.info(
    `Destroying stack: ${stackName}, provider: ${context.provider}, region: ${context.region}...`,
  );
  await rosStackDelete(context);
};
