import {
  getContext,
  logger,
  loadState,
  saveState,
  ProviderEnum,
  getRoleArnFromState,
} from '../../common';
import { lang } from '../../lang';
import { generateFunctionPlan } from './fc3Planner';
import { executeFunctionPlan } from './fc3Executor';
import { generateBucketPlan } from './ossPlanner';
import { executeBucketPlan } from './ossExecutor';
import { generateDatabasePlan } from './databasePlanner';
import { executeDatabasePlan } from './databaseExecutor';
import { generateTablePlan } from './tablestorePlanner';
import { executeTablePlan } from './tablestoreExecutor';
import { generateApigwPlan } from './apigwPlanner';
import { executeApigwPlan } from './apigwExecutor';
import { ExecutionResult, PartialFailureError, PlanItem, StateFile } from '../../types';

const createSaveStateFn = (baseDir: string) => (state: StateFile) => {
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

export const destroyAliyunStack = async (): Promise<void> => {
  const context = getContext();
  const baseDir = process.cwd();
  const providerName = ProviderEnum.ALIYUN;
  let state = loadState(providerName, baseDir);
  const onStateChange = createSaveStateFn(baseDir);

  const functionPlan = await generateFunctionPlan(context, state, undefined);
  const bucketPlan = await generateBucketPlan(context, state, undefined);
  const databasePlan = await generateDatabasePlan(context, state, undefined);
  const tablePlan = await generateTablePlan(context, state, undefined);
  // For destroy, service name is not used (deletion uses state only)
  const eventPlan = await generateApigwPlan(context, state, undefined, '');

  const combinedPlan = {
    items: [
      ...functionPlan.items,
      ...bucketPlan.items,
      ...databasePlan.items,
      ...tablePlan.items,
      ...eventPlan.items,
    ],
  };

  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  combinedPlan.items.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

  // Delete events before functions (events depend on functions)
  const roleArn = getRoleArnFromState(state);
  const eventResult = await executeApigwPlan(
    context,
    eventPlan,
    undefined,
    '', // service name not needed for deletion
    roleArn,
    state,
  );
  state = eventResult;
  // Note: executeApigwPlan doesn't return ExecutionResult yet, so no partial failure handling

  const functionResult = await executeFunctionPlan(
    context,
    functionPlan,
    undefined,
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
    undefined,
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
    undefined,
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

  const tableResult = await executeTablePlan(context, tablePlan, undefined, state, onStateChange);
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
};
