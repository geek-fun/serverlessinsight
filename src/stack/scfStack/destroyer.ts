import { getContext, logger, ProviderEnum } from '../../common';
import { StateBackend } from '../../common/stateBackend';
import { lang } from '../../lang';
import { generateFunctionPlan } from './scfPlanner';
import { executeFunctionPlan } from './scfExecutor';
import { generateBucketPlan } from './cosPlanner';
import { executeBucketPlan } from './cosExecutor';
import { generateDatabasePlan } from './tdsqlcPlanner';
import { executeDatabasePlan } from './tdsqlcExecutor';
import { generateEsPlan } from './esServerlessPlanner';
import { executeEsPlan } from './esServerlessExecutor';
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
  throw failure.error;
};

const collectSuccessfulItems = (results: Array<ExecutionResult>): Array<PlanItem> =>
  results.flatMap((result) => result.partialFailure?.successfulItems ?? []);

export const destroyTencentStack = async (backend: StateBackend): Promise<void> => {
  const context = getContext();
  const providerName = ProviderEnum.TENCENT;
  let state = await backend.loadState(providerName, context.app, context.service, context.stage);
  const onStateChange = createSaveStateFn(backend, context.app, context.service, context.stage);

  const functionPlan = await generateFunctionPlan(context, state, undefined);
  const bucketPlan = await generateBucketPlan(context, state, undefined);
  const databasePlan = await generateDatabasePlan(context, state, undefined);
  const esPlan = await generateEsPlan(context, state, undefined);

  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items, ...esPlan.items],
  };

  logger.info(`${lang.__('PLAN_GENERATED')}: ${combinedPlan.items.length} ${lang.__('ACTIONS')}`);
  combinedPlan.items.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

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

  const esResult = await executeEsPlan(context, esPlan, undefined, state, onStateChange);
  state = esResult.state;
  if (esResult.partialFailure) {
    handlePartialFailure({
      ...esResult.partialFailure,
      successfulItems: [
        ...collectSuccessfulItems([functionResult, bucketResult, databaseResult]),
        ...esResult.partialFailure.successfulItems,
      ],
    });
  }

  await backend.saveState(state, context.app, context.service, context.stage);
};
