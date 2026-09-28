import { getIacLocation, logger, setContext, setIac, ProviderEnum, getContext } from '../common';
import { createStateBackend } from '../common/stateBackend';
import { buildPlanJson, buildPlanSummary, writeJson } from '../common/jsonOutput';
import { isNoColorEnabled } from '../common/noColor';
import { parseYaml, revalYaml } from '../parser';
import { generateTencentPlan, displayPlan } from '../stack/scfStack';
import { generateAliyunPlan } from '../stack/aliyunStack';
import { lang } from '../lang';
import { PlanDisplayConfig } from '../types';

export const plan = async (options: {
  location: string;
  parameters?: { [key: string]: string };
  stage?: string;
  region?: string;
  provider?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  refresh?: boolean;
  json?: boolean;
  noColor?: boolean;
}): Promise<{ hasChanges: boolean }> => {
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
      refresh: options.refresh ?? true,
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

  // Read-only command: a migrated state only warns here (window-period
  // reconciliation still needs plan against the legacy copy).
  const backend = createStateBackend(iac.backend, {
    ...context,
    declaredOrg: iac.org,
    migrationMarker: 'warn',
  });
  let planResult;

  if (iac.provider.name === ProviderEnum.TENCENT) {
    planResult = await generateTencentPlan(iac, backend);
  } else if (iac.provider.name === ProviderEnum.ALIYUN) {
    planResult = await generateAliyunPlan(iac, backend);
  } else {
    logger.error(lang.__('PLAN_COMMAND_NOT_SUPPORTED'));
    throw new Error(lang.__('PLAN_COMMAND_NOT_SUPPORTED'));
  }

  if (options.json) {
    writeJson(
      buildPlanJson(planResult, {
        provider: iac.provider.name,
        app: iac.app,
        service: iac.service,
        stage: context.stage,
      }),
    );
  } else {
    const displayConfig: PlanDisplayConfig = {
      colorize: !(options.noColor ?? false) && !isNoColorEnabled(),
      indentSize: 4,
      keyAlignWidth: 12,
    };
    displayPlan(planResult, displayConfig);
  }

  const summary = buildPlanSummary(planResult.items ?? []);
  const changeCount = summary.create + summary.update + summary.destroy + summary.recreate;
  return { hasChanges: changeCount > 0 };
};
