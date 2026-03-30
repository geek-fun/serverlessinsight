import { getContext, getIacLocation, logger, setContext, setIac, ProviderEnum } from '../common';
import { createStateBackend } from '../common/stateBackend';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';
import { destroyTencentStack } from '../stack/scfStack';
import { destroyAliyunStack } from '../stack/aliyunStack';
import { destroyVolcengineStack } from '../stack/volcengineStack';

export const destroyStack = async (options: {
  location: string;
  region?: string;
  provider?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  stage?: string;
}) => {
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  await setContext(
    {
      ...options,
      app: rawIac.app,
      service: rawIac.service,
      iacProvider: rawIac.provider,
      stages: rawIac.stages,
    },
    true,
  );
  const context = getContext();
  const iac = revalYaml(iacLocation, context);

  // Store IAC in context for access by all functions
  setIac(iac);

  logger.info(
    lang.__('DESTROYING_STACK', {
      provider: context.provider,
      region: context.region,
    }),
  );

  const backend = createStateBackend(iac.backend, context);
  await backend.withLock('destroy', async () => {
    if (iac.provider.name === ProviderEnum.TENCENT) {
      await destroyTencentStack(backend);
    } else if (iac.provider.name === ProviderEnum.ALIYUN) {
      await destroyAliyunStack(backend);
    } else if (iac.provider.name === ProviderEnum.VOLCENGINE) {
      await destroyVolcengineStack(backend);
    } else {
      throw new Error(`Unsupported provider: ${iac.provider.name}`);
    }
  });
};
