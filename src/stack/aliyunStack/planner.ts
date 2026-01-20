import { ServerlessIac } from '../../types';
import { getContext, loadState, getDependencyInfo, toDotFormat } from '../../common';
import { generateFunctionPlan } from './fc3Planner';
import { generateBucketPlan } from './ossPlanner';
import { generateDatabasePlan } from './databasePlanner';
import { generateTablePlan } from './tablestorePlanner';
import { generateApigwPlan } from './apigwPlanner';

export const generateAliyunPlan = async (iac: ServerlessIac) => {
  const context = getContext();
  const state = loadState(iac.provider.name, process.cwd());

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

  const dependencyInfo = getDependencyInfo(allItems);

  if (dependencyInfo.cycleError) {
    throw new Error(dependencyInfo.cycleError.message);
  }

  return {
    items: dependencyInfo.order,
    levels: dependencyInfo.levels,
    graph: dependencyInfo.graph,
    dotGraph: toDotFormat(dependencyInfo.graph),
  };
};
