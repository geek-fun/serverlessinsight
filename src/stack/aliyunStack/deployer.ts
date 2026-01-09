import { ServerlessIac, ExecutionResult, PartialFailureError, PlanItem } from '../../types';
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

const createSaveStateFn =
  (baseDir: string) =>
  (state: typeof loadState extends (...args: never[]) => infer R ? R : never) => {
    saveState(state, baseDir);
  };

const handlePartialFailure = (failure: PartialFailureError): never => {
  logger.error(
    lang.__('PARTIAL_DEPLOYMENT_FAILURE', {
      successCount: String(failure.successfulItems.length),
      failedResource: failure.failedItem.logicalId,
    }),
  );
  logger.info(lang.__('PARTIAL_FAILURE_STATE_SAVED'));
  logger.info(lang.__('PARTIAL_FAILURE_NEXT_STEPS'));
  throw failure.error;
};

const collectSuccessfulItems = (results: Array<ExecutionResult>): Array<PlanItem> =>
  results.flatMap((result) => result.partialFailure?.successfulItems ?? []);

export const deployAliyunStack = async (iac: ServerlessIac): Promise<void> => {
  const context = getContext();
  const baseDir = process.cwd();
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));

  let state = loadState(iac.provider.name, baseDir);
  const onStateChange = createSaveStateFn(baseDir);

  logger.info(lang.__('GENERATING_PLAN'));
  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);
  const tablePlan = await generateTablePlan(context, state, iac.tables);

  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items, ...tablePlan.items],
  };

  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  combinedPlan.items.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

  logger.info(lang.__('EXECUTING_PLAN'));

  const functionResult = await executeFunctionPlan(
    context,
    functionPlan,
    iac.functions,
    state,
    onStateChange,
  );
  state = functionResult.state;
  if (functionResult.partialFailure) {
    handlePartialFailure(functionResult.partialFailure);
  }

  const bucketResult = await executeBucketPlan(
    context,
    bucketPlan,
    iac.buckets,
    state,
    onStateChange,
  );
  state = bucketResult.state;
  if (bucketResult.partialFailure) {
    handlePartialFailure({
      ...bucketResult.partialFailure,
      successfulItems: [
        ...collectSuccessfulItems([functionResult]),
        ...bucketResult.partialFailure.successfulItems,
      ],
    });
  }

  const databaseResult = await executeDatabasePlan(
    context,
    databasePlan,
    iac.databases,
    state,
    onStateChange,
  );
  state = databaseResult.state;
  if (databaseResult.partialFailure) {
    handlePartialFailure({
      ...databaseResult.partialFailure,
      successfulItems: [
        ...collectSuccessfulItems([functionResult, bucketResult]),
        ...databaseResult.partialFailure.successfulItems,
      ],
    });
  }

  const tableResult = await executeTablePlan(context, tablePlan, iac.tables, state, onStateChange);
  state = tableResult.state;
  if (tableResult.partialFailure) {
    handlePartialFailure({
      ...tableResult.partialFailure,
      successfulItems: [
        ...collectSuccessfulItems([functionResult, bucketResult, databaseResult]),
        ...tableResult.partialFailure.successfulItems,
      ],
    });
  }

  saveState(state, baseDir);

  logger.info(lang.__('STACK_DEPLOYED'));
};
