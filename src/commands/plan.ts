import { getIacLocation, logger, setContext, loadState, ProviderEnum, getContext } from '../common';
import { parseYaml } from '../parser';
import { generatePlan } from '../stack/scfStack';
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
    logger.error(lang.__('PLAN_COMMAND_TENCENT_ONLY'));
    throw new Error(lang.__('PLAN_COMMAND_TENCENT_ONLY'));
  }

  logger.info(lang.__('GENERATING_PLAN_FOR_SCF'));

  const state = loadState(iac.provider.name, process.cwd());
  const planResult = await generatePlan(context, state, iac.functions);

  // Display plan
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
      if (item.changes?.after) {
        logger.info(
          `    ${JSON.stringify(item.changes.after, null, 2).split('\n').join('\n    ')}`,
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
      if (item.changes?.before) {
        logger.info(
          `    ${JSON.stringify(item.changes.before, null, 2).split('\n').join('\n    ')}`,
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
