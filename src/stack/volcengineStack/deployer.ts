import { ServerlessIac } from '../../types';
import { getContext, logger } from '../../common';
import { StateBackend } from '../../common/stateBackend';
import { lang } from '../../lang';
import { generateFunctionPlan } from './vefaasPlanner';
import { executeFunctionPlan } from './vefaasExecutor';
import { generateBucketPlan } from './tosPlanner';
import { executeBucketPlan } from './tosExecutor';

export const deployVolcengineStack = async (iac: ServerlessIac, backend: StateBackend) => {
  const context = getContext();
  logger.info(lang.__('DEPLOYING_STACK'));

  let state = await backend.loadState('volcengine', iac.app, iac.service, context.stage);

  const onStateChange = (newState: typeof state) => {
    state = newState;
    backend.saveState(state, iac.app, iac.service, context.stage);
  };

  logger.info(lang.__('GENERATING_PLAN'));

  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);

  const bucketResult = await executeBucketPlan(
    context,
    bucketPlan,
    iac.buckets,
    state,
    onStateChange,
  );

  if (bucketResult.partialFailure) {
    const error = bucketResult.partialFailure.error as Error & { isPartialFailure?: boolean };
    error.isPartialFailure = true;
    logger.error(
      lang.__('PARTIAL_DEPLOYMENT_FAILURE', {
        resourceType: 'Bucket',
        name: bucketResult.partialFailure.failedItem.logicalId,
      }),
    );
    throw error;
  }

  state = bucketResult.state;

  const functionResult = await executeFunctionPlan(
    context,
    functionPlan,
    iac.functions,
    state,
    onStateChange,
  );

  if (functionResult.partialFailure) {
    const error = functionResult.partialFailure.error as Error & { isPartialFailure?: boolean };
    error.isPartialFailure = true;
    logger.error(
      lang.__('PARTIAL_DEPLOYMENT_FAILURE', {
        resourceType: 'Function',
        name: functionResult.partialFailure.failedItem.logicalId,
      }),
    );
    throw error;
  }

  await backend.saveState(functionResult.state, iac.app, iac.service, context.stage);

  logger.info(lang.__('STACK_DEPLOYED'));
};
