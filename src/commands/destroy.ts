import {
  getContext,
  getIacLocation,
  logger,
  rosStackDelete,
  setContext,
  loadState,
  saveState,
  ProviderEnum,
} from '../common';
import { parseYaml, revalYaml } from '../parser';
import { lang } from '../lang';
import {
  generateFunctionPlan,
  executeFunctionPlan,
  generateBucketPlan,
  executeBucketPlan,
  generateDatabasePlan,
  executeDatabasePlan,
} from '../stack/scfStack';

const destroyTencent = async (): Promise<void> => {
  const context = getContext();
  const providerName = ProviderEnum.TENCENT;
  let state = loadState(providerName, process.cwd());

  const functionPlan = await generateFunctionPlan(context, state, undefined);
  const bucketPlan = await generateBucketPlan(context, state, undefined);
  const databasePlan = await generateDatabasePlan(context, state, undefined);

  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items],
  };

  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  combinedPlan.items.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

  state = await executeFunctionPlan(context, functionPlan, undefined, state);
  state = await executeBucketPlan(context, bucketPlan, undefined, state);
  state = await executeDatabasePlan(context, databasePlan, undefined, state);

  saveState(state, process.cwd());
};

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
    await destroyTencent();
  } else {
    await rosStackDelete(context);
  }
};
