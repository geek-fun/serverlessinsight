import { ServerlessIac } from '../../types';
import { getContext, logger, loadState } from '../../common';
import { lang } from '../../lang';
import { generateFunctionPlan } from './scfPlanner';
import { generateBucketPlan } from './cosPlanner';
import { generateDatabasePlan } from './tdsqlcPlanner';

export const generateTencentPlan = async (iac: ServerlessIac) => {
  const context = getContext();
  const state = loadState(iac.provider.name, process.cwd());

  const functionPlan = await generateFunctionPlan(context, state, iac.functions);
  const bucketPlan = await generateBucketPlan(context, state, iac.buckets);
  const databasePlan = await generateDatabasePlan(context, state, iac.databases);

  return {
    items: [...functionPlan.items, ...bucketPlan.items, ...databasePlan.items],
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
  logger.info('========================================');
  logger.info(lang.__('DEPLOYMENT_PLAN'));
  logger.info('========================================');

  if (planResult.items.length === 0) {
    logger.info(lang.__('NO_CHANGES_INFRASTRUCTURE_UP_TO_DATE'));
    return;
  }

  const createActions = planResult.items.filter((item) => item.action === 'create');
  const updateActions = planResult.items.filter((item) => item.action === 'update');
  const deleteActions = planResult.items.filter((item) => item.action === 'delete');
  const noopActions = planResult.items.filter((item) => item.action === 'noop');

  if (createActions.length > 0) {
    logger.info(`\n[${lang.__('CREATE')}] ${lang.__('RESOURCES_TO_BE_CREATED')}:`);
    for (const item of createActions) {
      logger.info(`  + ${item.logicalId} (${item.resourceType})`);
      if ((item.changes as { after?: unknown })?.after) {
        logger.info(
          `    ${JSON.stringify((item.changes as { after?: unknown }).after, null, 2)
            .split('\n')
            .join('\n    ')}`,
        );
      }
    }
  }

  if (updateActions.length > 0) {
    logger.info(`\n[${lang.__('UPDATE')}] ${lang.__('RESOURCES_TO_BE_UPDATED')}:`);
    for (const item of updateActions) {
      logger.info(`  ~ ${item.logicalId} (${item.resourceType})`);
      if (item.drifted) {
        logger.info(`    [${lang.__('DRIFTED')}] ${lang.__('REMOTE_CONFIG_DIFFERS')}`);
      }
      if (item.changes) {
        logger.info(
          `    ${lang.__('CHANGES')}: ${JSON.stringify(item.changes, null, 2).split('\n').join('\n    ')}`,
        );
      }
    }
  }

  if (deleteActions.length > 0) {
    logger.info(`\n[${lang.__('DELETE')}] ${lang.__('RESOURCES_TO_BE_DELETED')}:`);
    for (const item of deleteActions) {
      logger.info(`  - ${item.logicalId} (${item.resourceType})`);
      if ((item.changes as { before?: unknown })?.before) {
        logger.info(
          `    ${JSON.stringify((item.changes as { before?: unknown }).before, null, 2)
            .split('\n')
            .join('\n    ')}`,
        );
      }
    }
  }

  if (noopActions.length > 0) {
    logger.info(`\n[${lang.__('NO_CHANGE')}] ${lang.__('RESOURCES_UNCHANGED')}:`);
    for (const item of noopActions) {
      logger.info(`  = ${item.logicalId} (${item.resourceType})`);
    }
  }

  logger.info('\n========================================');
  logger.info(
    `${lang.__('PLAN')}: ${createActions.length} ${lang.__('TO_CREATE')}, ${updateActions.length} ${lang.__('TO_UPDATE')}, ${deleteActions.length} ${lang.__('TO_DELETE')}, ${noopActions.length} ${lang.__('UNCHANGED')}`,
  );
  logger.info('========================================');
};
