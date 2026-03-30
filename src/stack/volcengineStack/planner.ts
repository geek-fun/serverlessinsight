import { ServerlessIac, PlanItem } from '../../types';
import { getContext, getDependencyInfo, toDotFormat } from '../../common';
import { StateBackend } from '../../common/stateBackend';
import { lang } from '../../lang';

export const generateVolcenginePlan = async (_iac: ServerlessIac, backend: StateBackend) => {
  const context = getContext();
  const _state = await backend.loadState('volcengine', context.app, context.service, context.stage);

  const allItems: PlanItem[] = [];

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
