import { getContext, logger, loadState, saveState, ProviderEnum } from '../../common';
import { lang } from '../../lang';
import { generateFunctionPlan } from './scfPlanner';
import { executeFunctionPlan } from './scfExecutor';
import { generateBucketPlan } from './cosPlanner';
import { executeBucketPlan } from './cosExecutor';
import { generateDatabasePlan } from './tdsqlcPlanner';
import { executeDatabasePlan } from './tdsqlcExecutor';
import { ExecutionResult, PartialFailureError, PlanItem } from '../../types';

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

export const destroyTencentStack = async (): Promise<void> => {
  const context = getContext();
  const baseDir = process.cwd();
  const providerName = ProviderEnum.TENCENT;
  let state = loadState(providerName, baseDir);
  const onStateChange = createSaveStateFn(baseDir);

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

  saveState(state, baseDir);
};
