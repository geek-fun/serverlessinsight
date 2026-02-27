import {
  ServerlessIac,
  ExecutionResult,
  PartialFailureError,
  PlanItem,
  StateFile,
} from '../../types';
import {
  getContext,
  logger,
  loadState,
  saveState,
  getRoleArnFromState,
  setIac,
  getDependencyInfo,
  toDotFormat,
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

const createSaveStateFn = (baseDir: string) => (state: StateFile) => {
  saveState(state, baseDir);
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

const logDependencyGraph = (orderedItems: Array<PlanItem>, dotGraph: string): void => {
  logger.info(lang.__('DEPENDENCY_GRAPH_GENERATED'));
  logger.info(`  ${lang.__('EXECUTION_ORDER')}:`);
  orderedItems.forEach((item, index) => {
    logger.info(`    ${index + 1}. ${item.logicalId} (${item.resourceType}) - ${item.action}`);
  });
  logger.debug(`${lang.__('DOT_GRAPH_OUTPUT')}:\n${dotGraph}`);
};

export const deployAliyunStack = async (iac: ServerlessIac): Promise<void> => {
  const context = getContext();
  const baseDir = process.cwd();
  // Cache IAC for access throughout the deployment
  setIac(iac);
  logger.info(lang.__('DEPLOYING_STACK_PUBLISHING_ASSETS'));

  let state = loadState(iac.provider.name, baseDir);
  const onStateChange = createSaveStateFn(baseDir);

  logger.info(lang.__('GENERATING_PLAN'));
  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);
  const tablePlan = await generateTablePlan(context, state, iac.tables);
  const eventPlan = await generateApigwPlan(context, state, iac.events, iac.service);

  const allItems = [
    ...functionPlan.items,
    ...bucketPlan.items,
    ...databasePlan.items,
    ...tablePlan.items,
    ...eventPlan.items,
  ];

  // Build dependency graph for validation (e.g. cycle detection) and logging
  const dependencyInfo = getDependencyInfo(allItems);

  if (dependencyInfo.cycleError) {
    throw new Error(
      `${lang.__('CYCLE_DETECTED')}: ${dependencyInfo.cycleError.cycle.join(' -> ')}`,
    );
  }

  const orderedItems = dependencyInfo.order;
  const dotGraph = toDotFormat(dependencyInfo.graph);

  logDependencyGraph(orderedItems, dotGraph);

  // NOTE: The dependency graph is currently used only for validation (e.g. cycle detection).
  // Plan execution below still follows the fixed per-resource ordering.
  logger.info(`${lang.__('PLAN_GENERATED')}: ${allItems.length} ${lang.__('ACTIONS')}`);
  allItems.forEach((item) => {
    logger.info(`  - ${item.action.toUpperCase()}: ${item.logicalId} (${item.resourceType})`);
  });

  logger.info(lang.__('EXECUTING_PLAN'));

  // Execute plans per resource type in a fixed order.
  // The dependency graph above does not yet drive the execution sequence.
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

  // Execute event plan after functions are created (events depend on functions)
  const roleArn = getRoleArnFromState(state);
  const eventResult = await executeApigwPlan(
    context,
    eventPlan,
    iac.events,
    iac.service,
    roleArn,
    state,
    onStateChange,
  );
  state = eventResult.state;
  if (eventResult.partialFailure) {
    handlePartialFailure({
      ...eventResult.partialFailure,
      successfulItems: [
        ...collectSuccessfulItems([functionResult, bucketResult, databaseResult, tableResult]),
        ...eventResult.partialFailure.successfulItems,
      ],
    });
  }

  saveState(state, baseDir);

  logger.info(lang.__('STACK_DEPLOYED'));
};
