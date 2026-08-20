import { ServerlessIac } from '../../types';
import { getContext, logger } from '../../common';
import { StateBackend } from '../../common/stateBackend';
import { lang } from '../../lang';
import { generateFunctionPlan } from './vefaasPlanner';
import { executeFunctionPlan } from './vefaasExecutor';
import { generateBucketPlan } from './tosPlanner';
import { executeBucketPlan } from './tosExecutor';
import { generateApigwPlan } from './apigwPlanner';
import { executeApigwPlan } from './apigwExecutor';

// Volcengine error responses can echo large request payloads (e.g. the base64
// function code) in Error.Message — cap what reaches the user.
const truncateMessage = (message: string | undefined, max = 2000): string => {
  if (!message) return '';
  return message.length > max
    ? `${message.slice(0, max)}… (truncated ${message.length} chars)`
    : message;
};

// Enrich cloud API errors with the action name + RequestId so users can open a
// support ticket / debug against the console. The message itself is truncated
// to avoid dumping base64 payloads, but the actionable bits are always shown.
const formatApiError = (error: Error): string => {
  const err = error as Error & { action?: string; requestId?: string };
  const parts = [truncateMessage(error.message)];
  if (err.action && !err.message.includes(err.action)) {
    parts.unshift(`Action: ${err.action}`);
  }
  if (err.requestId) {
    parts.push(`RequestId: ${err.requestId}`);
  }
  return parts.join(' | ');
};

export const deployVolcengineStack = async (iac: ServerlessIac, backend: StateBackend) => {
  const context = getContext();
  logger.info(lang.__('DEPLOYING_STACK'));

  let state = await backend.loadState('volcengine', iac.app, iac.service, context.stage);

  const onStateChange = async (newState: typeof state) => {
    state = newState;
    await backend.saveState(state, iac.app, iac.service, context.stage);
  };

  logger.info(lang.__('GENERATING_PLAN'));

  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);
  const apigwPlan = await generateApigwPlan(context, state, iac.events, iac.service);

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
      `${lang.__('FAILED_TO_EXECUTE_ACTION', {
        action: bucketResult.partialFailure.failedItem.action,
        logicalId: bucketResult.partialFailure.failedItem.logicalId,
        error: formatApiError(error),
      })}\n\n${lang.__('PARTIAL_DEPLOYMENT_FAILURE', {
        successCount: String(bucketResult.partialFailure.successfulItems.length),
        failedResource: bucketResult.partialFailure.failedItem.logicalId,
      })}`,
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
      `${lang.__('FAILED_TO_EXECUTE_ACTION', {
        action: functionResult.partialFailure.failedItem.action,
        logicalId: functionResult.partialFailure.failedItem.logicalId,
        error: formatApiError(error),
      })}\n\n${lang.__('PARTIAL_DEPLOYMENT_FAILURE', {
        successCount: String(functionResult.partialFailure.successfulItems.length),
        failedResource: functionResult.partialFailure.failedItem.logicalId,
      })}`,
    );
    throw error;
  }

  state = functionResult.state;

  const apigwResult = await executeApigwPlan(
    context,
    apigwPlan,
    iac.events,
    iac.service,
    state,
    onStateChange,
  );

  if (apigwResult.partialFailure) {
    const error = apigwResult.partialFailure.error as Error & { isPartialFailure?: boolean };
    error.isPartialFailure = true;
    logger.error(
      `${lang.__('FAILED_TO_EXECUTE_ACTION', {
        action: apigwResult.partialFailure.failedItem.action,
        logicalId: apigwResult.partialFailure.failedItem.logicalId,
        error: formatApiError(error),
      })}\n\n${lang.__('PARTIAL_DEPLOYMENT_FAILURE', {
        successCount: String(apigwResult.partialFailure.successfulItems.length),
        failedResource: apigwResult.partialFailure.failedItem.logicalId,
      })}`,
    );
    throw error;
  }

  await backend.saveState(apigwResult.state, iac.app, iac.service, context.stage);

  logger.info(lang.__('STACK_DEPLOYED'));
};
