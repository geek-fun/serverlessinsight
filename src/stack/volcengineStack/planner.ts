import { ServerlessIac, PlanItem } from '../../types';
import { getContext, getDependencyInfo, toDotFormat } from '../../common';
import { StateBackend } from '../../common/stateBackend';
import { lang } from '../../lang';
import { generateFunctionPlan } from './vefaasPlanner';
import { generateBucketPlan } from './tosPlanner';
import { generateApigwPlan } from './apigwPlanner';

export const generateVolcenginePlan = async (iac: ServerlessIac, backend: StateBackend) => {
  const context = getContext();
  const state = await backend.loadState('volcengine', context.app, context.service, context.stage);

  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);
  const apigwPlan = await generateApigwPlan(context, state, iac.events, iac.service);

  const allItems: PlanItem[] = [...functionPlan.items, ...bucketPlan.items, ...apigwPlan.items];

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
