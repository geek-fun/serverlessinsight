import { getIacLocation, logger, setContext, ProviderEnum, getContext } from '../common';
import { parseYaml, revalYaml } from '../parser';
import { generateTencentPlan, displayPlan } from '../stack/scfStack';
import { generateAliyunPlan } from '../stack/aliyunStack';
import { lang } from '../lang';

export const plan = async (
  stackName: string,
  options: {
    location: string;
    parameters?: { [key: string]: string };
    stage?: string;
    region?: string;
    provider?: string;
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
  },
) => {
  logger.info(lang.__('VALIDATING_YAML'));
  const iacLocation = getIacLocation(options.location);
  const rawIac = parseYaml(iacLocation);
  logger.info(lang.__('YAML_VALID'));

  await setContext(
    { ...options, stackName, iacProvider: rawIac.provider, stages: rawIac.stages },
    true,
  );
  const context = getContext();
  const iac = revalYaml(iacLocation, context);

  logger.info(lang.__('GENERATING_PLAN_FOR_SCF'));

  let planResult;

  if (iac.provider.name === ProviderEnum.TENCENT) {
    planResult = await generateTencentPlan(iac);
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    planResult = await generateAliyunPlan(iac);
  } else {
    logger.error(lang.__('PLAN_COMMAND_NOT_SUPPORTED'));
    throw new Error(lang.__('PLAN_COMMAND_NOT_SUPPORTED'));
  }

  displayPlan(planResult);
};
