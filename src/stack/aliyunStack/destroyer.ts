import { getContext, logger, loadState, saveState, ProviderEnum } from '../../common';
import { lang } from '../../lang';
import { generateFunctionPlan } from './fc3Planner';
import { executeFunctionPlan } from './fc3Executor';
import { generateBucketPlan } from './ossPlanner';
import { executeBucketPlan } from './ossExecutor';
import { generateDatabasePlan } from './databasePlanner';
import { executeDatabasePlan } from './databaseExecutor';
import { generateTablePlan } from './tablestorePlanner';
import { executeTablePlan } from './tablestoreExecutor';

export const destroyAliyunStack = async (): Promise<void> => {
  const context = getContext();
  const providerName = ProviderEnum.ALIYUN;
  let state = loadState(providerName, process.cwd());

  const functionPlan = await generateFunctionPlan(context, state, undefined);
  const bucketPlan = await generateBucketPlan(context, state, undefined);
  const databasePlan = await generateDatabasePlan(context, state, undefined);
  const tablePlan = await generateTablePlan(context, state, undefined);

  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items, ...tablePlan.items],
  };

  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  combinedPlan.items.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

  state = await executeFunctionPlan(context, functionPlan, undefined, state);
  state = await executeBucketPlan(context, bucketPlan, undefined, state);
  state = await executeDatabasePlan(context, databasePlan, undefined, state);
  state = await executeTablePlan(context, tablePlan, undefined, state);

  saveState(state, process.cwd());
};
