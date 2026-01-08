import { getContext, getIacLocation, logger, setContext, ProviderEnum } from '../common';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';
import { destroyTencentStack } from '../stack/scfStack';
import { destroyAliyunStack } from '../stack/aliyunStack';

export const destroyStack = async (
  stackName: string,
  options: {
    location: string;
    region?: string;
    provider?: string;
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
    stage?: string;
  },
) => {
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  await setContext(
    { stackName, ...options, iacProvider: rawIac.provider, stages: rawIac.stages },
    true,
  );
  const context = getContext();
  const iac = revalYaml(iacLocation, context);

  logger.info(
    lang.__('DESTROYING_STACK', {
      stackName,
      provider: context.provider,
      region: context.region,
    }),
  );

  if (iac.provider.name === ProviderEnum.TENCENT) {
    await destroyTencentStack();
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    await destroyAliyunStack();
  } else {
    throw new Error(`Unsupported provider: ${iac.provider.name}`);
  }
};
