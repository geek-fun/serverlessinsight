import {
  getIacLocation,
  logger,
  setContext,
  StateManager,
  ProviderEnum,
  getContext,
} from '../common';
import { parseYaml } from '../parser';
import { ScfPlanner } from '../stack/scfStack';
import { lang } from '../lang';

export const plan = async (
  stackName: string,
  options: {
    location: string;
    parameters?: { [key: string]: string };
    stage?: string;
    region?: string;
    provider?: string;
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
  },
) => {
  logger.info(lang.__('VALIDATING_YAML'));
  const iac = parseYaml(getIacLocation(options.location));
  logger.info(lang.__('YAML_VALID'));

  await setContext({ ...options, stackName, iacProvider: iac.provider }, true);
  const context = getContext();

  if (iac.provider.name !== ProviderEnum.TENCENT) {
    logger.error('Plan command is currently only supported for Tencent provider');
    throw new Error('Plan command is currently only supported for Tencent provider');
  }

  logger.info('Generating plan for Tencent SCF resources...');

  const stateManager = new StateManager(iac.provider.name, process.cwd());
  const planner = new ScfPlanner(context, stateManager);

  const planResult = await planner.generatePlan(iac.functions);

  // Display plan
  logger.info('========================================');
  logger.info('DEPLOYMENT PLAN');
  logger.info('========================================');

  if (planResult.items.length === 0) {
    logger.info('No changes. Infrastructure is up-to-date.');
    return;
  }

  const createActions = planResult.items.filter((item) => item.action === 'create');
  const updateActions = planResult.items.filter((item) => item.action === 'update');
  const deleteActions = planResult.items.filter((item) => item.action === 'delete');
  const noopActions = planResult.items.filter((item) => item.action === 'noop');

  if (createActions.length > 0) {
    logger.info('\n[CREATE] Resources to be created:');
    for (const item of createActions) {
      logger.info(`  + ${item.logicalId} (${item.resourceType})`);
      if (item.changes?.after) {
        logger.info(
          `    ${JSON.stringify(item.changes.after, null, 2).split('\n').join('\n    ')}`,
        );
      }
    }
  }

  if (updateActions.length > 0) {
    logger.info('\n[UPDATE] Resources to be updated:');
    for (const item of updateActions) {
      logger.info(`  ~ ${item.logicalId} (${item.resourceType})`);
      if (item.drifted) {
        logger.info('    [DRIFTED] Remote configuration differs from state');
      }
      if (item.changes) {
        logger.info(
          `    Changes: ${JSON.stringify(item.changes, null, 2).split('\n').join('\n    ')}`,
        );
      }
    }
  }

  if (deleteActions.length > 0) {
    logger.info('\n[DELETE] Resources to be deleted:');
    for (const item of deleteActions) {
      logger.info(`  - ${item.logicalId} (${item.resourceType})`);
      if (item.changes?.before) {
        logger.info(
          `    ${JSON.stringify(item.changes.before, null, 2).split('\n').join('\n    ')}`,
        );
      }
    }
  }

  if (noopActions.length > 0) {
    logger.info('\n[NO CHANGE] Resources unchanged:');
    for (const item of noopActions) {
      logger.info(`  = ${item.logicalId} (${item.resourceType})`);
    }
  }

  logger.info('\n========================================');
  logger.info(
    `Plan: ${createActions.length} to create, ${updateActions.length} to update, ${deleteActions.length} to delete, ${noopActions.length} unchanged`,
  );
  logger.info('========================================');
};
