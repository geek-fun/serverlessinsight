import { ServerlessIac } from '../../types';
import { getContext, logger, loadState, saveState } from '../../common';
import { lang } from '../../lang';
import { generateFunctionPlan } from './fc3Planner';
import { executeFunctionPlan } from './fc3Executor';
import { generateBucketPlan } from './ossPlanner';
import { executeBucketPlan } from './ossExecutor';
import { generateDatabasePlan } from './databasePlanner';
import { executeDatabasePlan } from './databaseExecutor';
import { generateTablePlan } from './tablestorePlanner';
import { executeTablePlan } from './tablestoreExecutor';

export const deployAliyunStack = async (iac: ServerlessIac): Promise<void> => {
  const context = getContext();
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));

  let state = loadState(iac.provider.name, process.cwd());

  logger.info(lang.__('GENERATING_PLAN'));
  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);
  const tablePlan = await generateTablePlan(context, state, iac.tables);

  // Combine plans
  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items, ...tablePlan.items],
  };

  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  combinedPlan.items.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

  logger.info(lang.__('EXECUTING_PLAN'));
  state = await executeFunctionPlan(context, functionPlan, iac.functions, state);
  state = await executeBucketPlan(context, bucketPlan, iac.buckets, state);
  state = await executeDatabasePlan(context, databasePlan, iac.databases, state);
  state = await executeTablePlan(context, tablePlan, iac.tables, state);

  saveState(state, process.cwd());

  logger.info(lang.__('STACK_DEPLOYED'));
};
