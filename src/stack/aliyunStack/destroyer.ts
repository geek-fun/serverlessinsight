import { getContext, logger, ProviderEnum, getRoleArnFromState, setIac } from '../../common';
import { StateBackend } from '../../common/stateBackend';
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

const createSaveStateFn =
  (backend: StateBackend, app: string, service: string, stage: string) => (state: StateFile) => {
    backend.saveState(state, app, service, stage);
  };

const handlePartialFailure = (failure: PartialFailureError): never => {
  const error = failure.error as Error & { isPartialFailure?: boolean };
  error.isPartialFailure = true;
  logger.error(
    `${lang.__('FAILED_TO_EXECUTE_ACTION', {
      action: failure.failedItem.action,
      logicalId: failure.failedItem.logicalId,
      error: error.message,
    })}\n\n${lang.__('PARTIAL_DEPLOYMENT_FAILURE', {
      successCount: String(failure.successfulItems.length),
      failedResource: failure.failedItem.logicalId,
    })}\n${lang.__('PARTIAL_FAILURE_STATE_SAVED')}\n${lang.__('PARTIAL_FAILURE_NEXT_STEPS')}`,
  );
  throw error;
};

const collectSuccessfulItems = (results: Array<ExecutionResult>): Array<PlanItem> =>
  results.flatMap((result) => result.partialFailure?.successfulItems ?? []);

export const destroyAliyunStack = async (backend: StateBackend): Promise<void> => {
  const context = getContext();
  const providerName = ProviderEnum.ALIYUN;
  let state = await backend.loadState(providerName, context.app, context.service, context.stage);
  const onStateChange = createSaveStateFn(backend, context.app, context.service, context.stage);
  // Set minimal IAC for destruction (function resolution not needed)
  setIac({
    version: '1.0',
    app: '',
    service: '',
    provider: { name: providerName, region: context.region },
  });

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
    onStateChange,
  );
  state = eventResult.state;
  if (eventResult.partialFailure) {
    handlePartialFailure(eventResult.partialFailure);
  }

  const functionResult = await executeFunctionPlan(
    context,
    functionPlan,
    undefined,
    state,
    onStateChange,
  );
  state = functionResult.state;
  if (functionResult.partialFailure) {
    handlePartialFailure({
      ...functionResult.partialFailure,
      successfulItems: [
        ...collectSuccessfulItems([eventResult]),
        ...functionResult.partialFailure.successfulItems,
      ],
    });
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

  await backend.saveState(state, context.app, context.service, context.stage);
};
