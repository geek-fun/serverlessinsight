import { getIacLocation, logger, setContext, setIac, ProviderEnum, getContext } from '../common';
import { createStateBackend } from '../common/stateBackend';
import { parseYaml, revalYaml } from '../parser';
import { generateTencentPlan, displayPlan } from '../stack/scfStack';
import { generateAliyunPlan } from '../stack/aliyunStack';
import { lang } from '../lang';

export const plan = async (options: {
  location: string;
  parameters?: { [key: string]: string };
  stage?: string;
  region?: string;
  provider?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
}) => {
  logger.info(lang.__('VALIDATING_YAML'));
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  logger.info(lang.__('YAML_VALID'));

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

  const providerDisplayName =
    iac.provider.name === ProviderEnum.ALIYUN
      ? lang.__('PROVIDER_ALIYUN')
      : lang.__('PROVIDER_TENCENT');
  logger.info(lang.__('GENERATING_PLAN_FOR_PROVIDER', { provider: providerDisplayName }));

  const backend = createStateBackend(iac.backend, context);
  let planResult;

  if (iac.provider.name === ProviderEnum.TENCENT) {
    planResult = await generateTencentPlan(iac, backend);
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    planResult = await generateAliyunPlan(iac, backend);
  } else {
    logger.error(lang.__('PLAN_COMMAND_NOT_SUPPORTED'));
    throw new Error(lang.__('PLAN_COMMAND_NOT_SUPPORTED'));
  }

  displayPlan(planResult);
};
