import { getContext, logger, loadState, saveState, ProviderEnum } from '../../common';
import { lang } from '../../lang';
import { generateFunctionPlan } from './scfPlanner';
import { executeFunctionPlan } from './scfExecutor';
import { generateBucketPlan } from './cosPlanner';
import { executeBucketPlan } from './cosExecutor';
import { generateDatabasePlan } from './tdsqlcPlanner';
import { executeDatabasePlan } from './tdsqlcExecutor';

export const destroyTencentStack = async (): Promise<void> => {
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
