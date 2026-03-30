import { getContext, logger, ProviderEnum } from '../../common';
import { StateBackend } from '../../common/stateBackend';
import { getAllResources } from '../../common/stateManager';
import { lang } from '../../lang';
import { deleteResource } from './tosResource';
import { deleteResource as deleteFunctionResource } from './vefaasResource';

export const destroyVolcengineStack = async (backend: StateBackend) => {
  const context = getContext();
  const providerName = ProviderEnum.VOLCENGINE;

  logger.info(
    lang.__('DESTROYING_STACK', {
      provider: context.provider,
      region: context.region,
    }),
  );

  let state = await backend.loadState(providerName, context.app, context.service, context.stage);
  const allResources = getAllResources(state);

  const bucketEntries = Object.entries(allResources).filter(
    ([logicalId, resourceState]) =>
      logicalId.startsWith('buckets.') &&
      resourceState.instances?.some((i) => i.type === 'VOLCENGINE_TOS_BUCKET'),
  );

  for (const [logicalId, resourceState] of bucketEntries) {
    const bucketName = resourceState.definition.bucketName as string;
    if (bucketName) {
      try {
        logger.info(lang.__('DELETING_RESOURCE', { resourceType: 'bucket', name: bucketName }));
        state = await deleteResource(context, bucketName, logicalId, state);
        logger.info(lang.__('RESOURCE_DELETED', { resourceType: 'bucket', name: bucketName }));
      } catch (error) {
        logger.error(
          lang.__('VOLCENGINE_BUCKET_DELETE_FAILED', {
            bucketName,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      }
    }
  }

  const functionEntries = Object.entries(allResources).filter(
    ([logicalId, resourceState]) =>
      logicalId.startsWith('functions.') &&
      resourceState.instances?.some((i) => i.type === 'VOLCENGINE_VEFAAS_FUNCTION'),
  );

  for (const [logicalId, resourceState] of functionEntries) {
    const functionName = resourceState.definition.functionName as string;
    if (functionName) {
      try {
        logger.info(lang.__('DELETING_RESOURCE', { resourceType: 'function', name: functionName }));
        state = await deleteFunctionResource(context, functionName, logicalId, state);
        logger.info(lang.__('RESOURCE_DELETED', { resourceType: 'function', name: functionName }));
      } catch (error) {
        logger.error(
          lang.__('VOLCENGINE_FUNCTION_DELETE_FAILED', {
            functionName,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
      }
    }
  }

  await backend.saveState(state, context.app, context.service, context.stage);
};
