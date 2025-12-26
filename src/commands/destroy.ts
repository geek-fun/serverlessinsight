import { getContext, getIacLocation, logger, rosStackDelete, setContext } from '../common';
import { parseYaml } from '../parser';
import { lang } from '../lang';

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
  await setContext({ stackName, ...options, iacProvider: iac.provider }, true);
  const context = getContext();
  logger.info(
    lang.__('DESTROYING_STACK', {
      stackName,
      provider: context.provider,
      region: context.region,
    }),
  );
  await rosStackDelete(context);
};
