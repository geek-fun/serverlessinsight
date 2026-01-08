import { ServerlessIac } from '../../types';
import { getContext, logger, loadState, saveState } from '../../common';
import { lang } from '../../lang';
import { generateFunctionPlan } from './scfPlanner';
import { executeFunctionPlan } from './scfExecutor';
import { generateBucketPlan } from './cosPlanner';
import { executeBucketPlan } from './cosExecutor';
import { generateDatabasePlan } from './tdsqlcPlanner';
import { executeDatabasePlan } from './tdsqlcExecutor';

export const deployTencentStack = async (iac: ServerlessIac): Promise<void> => {
  const context = getContext();
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));

  // Load current state
  let state = loadState(iac.provider.name, process.cwd());

  // Generate plan for functions
  logger.info(lang.__('GENERATING_PLAN'));
  const functionPlan = await generateFunctionPlan(context, state, iac.functions);

  // Generate plan for buckets
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);

  // Generate plan for databases
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);

  // Combine plans
  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items],
  };

  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  combinedPlan.items.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

  logger.info(lang.__('EXECUTING_PLAN'));
  state = await executeFunctionPlan(context, functionPlan, iac.functions, state);

  state = await executeBucketPlan(context, bucketPlan, iac.buckets, state);

  state = await executeDatabasePlan(context, databasePlan, iac.databases, state);

  saveState(state, process.cwd());

  logger.info(lang.__('STACK_DEPLOYED'));
};
