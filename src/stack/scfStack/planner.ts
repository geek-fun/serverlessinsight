import { ServerlessIac } from '../../types';
import { getContext, getDependencyInfo, toDotFormat, displayPlan } from '../../common';
import { StateBackend } from '../../common/stateBackend';
import { lang } from '../../lang';
import { generateFunctionPlan } from './scfPlanner';
import { generateBucketPlan } from './cosPlanner';
import { generateDatabasePlan } from './tdsqlcPlanner';
import { generateEsPlan } from './esServerlessPlanner';

export const generateTencentPlan = async (iac: ServerlessIac, backend: StateBackend) => {
  const context = getContext();
  const state = await backend.loadState(iac.provider.name, iac.app, iac.service, context.stage);

  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);
  const esPlan = await generateEsPlan(context, state, iac.databases);

  const allItems = [
    ...functionPlan.items,
    ...bucketPlan.items,
    ...databasePlan.items,
    ...esPlan.items,
  ];

  const dependencyInfo = getDependencyInfo(allItems);

  if (dependencyInfo.cycleError) {
    throw new Error(
      `${lang.__('CYCLE_DETECTED')}: ${dependencyInfo.cycleError.cycle.join(' -> ')}`,
    );
  }

  return {
    items: dependencyInfo.order,
    levels: dependencyInfo.levels,
    graph: dependencyInfo.graph,
    dotGraph: toDotFormat(dependencyInfo.graph),
  };
};

export { displayPlan };
