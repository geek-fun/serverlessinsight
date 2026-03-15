import {
  ServerlessIac,
  ExecutionResult,
  PartialFailureError,
  PlanItem,
  StateFile,
} from '../../types';
import { getContext, logger } from '../../common';
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

const createSaveStateFn = (backend: StateBackend) => (state: StateFile) => {
  backend.saveState(state);
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

export const deployTencentStack = async (
  iac: ServerlessIac,
  backend: StateBackend,
): Promise<void> => {
  const context = getContext();
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));

  let state = await backend.loadState(iac.provider.name);
  const onStateChange = createSaveStateFn(backend);

  logger.info(lang.__('GENERATING_PLAN'));
  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);
  const esPlan = await generateEsPlan(context, state, iac.databases);

  const combinedPlan = {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items, ...esPlan.items],
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

  const esResult = await executeEsPlan(context, esPlan, iac.databases, state, onStateChange);
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

  await backend.saveState(state);

  logger.info(lang.__('STACK_DEPLOYED'));
};
