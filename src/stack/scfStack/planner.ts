import { ServerlessIac } from '../../types';
import { getContext, logger, getDependencyInfo, toDotFormat } from '../../common';
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

export const displayPlan = (planResult: {
  items: Array<{
    action: string;
    logicalId: string;
    resourceType: string;
    changes?: unknown;
    drifted?: boolean;
  }>;
}) => {
  const separator = '========================================';

  if (planResult.items.length === 0) {
    logger.info(
      `${separator}\n${lang.__('DEPLOYMENT_PLAN')}\n${separator}\n${lang.__('NO_CHANGES_INFRASTRUCTURE_UP_TO_DATE')}`,
    );
    return;
  }

  const createActions = planResult.items.filter((item) => item.action === 'create');
  const updateActions = planResult.items.filter((item) => item.action === 'update');
  const deleteActions = planResult.items.filter((item) => item.action === 'delete');
  const noopActions = planResult.items.filter((item) => item.action === 'noop');

  const sections: string[] = [];

  if (createActions.length > 0) {
    const createLines = [`[${lang.__('CREATE')}]:`];
    for (const item of createActions) {
      createLines.push(`  + ${item.logicalId} (${item.resourceType})`);
      if ((item.changes as { after?: unknown })?.after) {
        const jsonStr = JSON.stringify((item.changes as { after?: unknown }).after, null, 2);
        createLines.push(`    ${jsonStr.split('\n').join('\n    ')}`);
      }
    }
    sections.push(createLines.join('\n'));
  }

  if (updateActions.length > 0) {
    const updateLines = [`[${lang.__('UPDATE')}]:`];
    for (const item of updateActions) {
      updateLines.push(`  ~ ${item.logicalId} (${item.resourceType})`);
      if (item.drifted) {
        updateLines.push(`    [${lang.__('DRIFTED')}] ${lang.__('REMOTE_CONFIG_DIFFERS')}`);
      }
      if (item.changes) {
        const jsonStr = JSON.stringify(item.changes, null, 2);
        updateLines.push(`    ${lang.__('CHANGES')}: ${jsonStr.split('\n').join('\n    ')}`);
      }
    }
    sections.push(updateLines.join('\n'));
  }

  if (deleteActions.length > 0) {
    const deleteLines = [`[${lang.__('DELETE')}]:`];
    for (const item of deleteActions) {
      deleteLines.push(`  - ${item.logicalId} (${item.resourceType})`);
      if ((item.changes as { before?: unknown })?.before) {
        const jsonStr = JSON.stringify((item.changes as { before?: unknown }).before, null, 2);
        deleteLines.push(`    ${jsonStr.split('\n').join('\n    ')}`);
      }
    }
    sections.push(deleteLines.join('\n'));
  }

  if (noopActions.length > 0) {
    const noopLines = [`[${lang.__('NO_CHANGE')}]:`];
    for (const item of noopActions) {
      noopLines.push(`  = ${item.logicalId} (${item.resourceType})`);
    }
    sections.push(noopLines.join('\n'));
  }

  logger.info(
    `\n${separator}\n${lang.__('DEPLOYMENT_PLAN')}\n${separator}\n${sections.join('\n\n')}\n\n${separator}\n${lang.__('PLAN')}: ${createActions.length} ${lang.__('TO_CREATE')}, ${updateActions.length} ${lang.__('TO_UPDATE')}, ${deleteActions.length} ${lang.__('TO_DELETE')}, ${noopActions.length} ${lang.__('UNCHANGED')}\n${separator}`,
  );
};
