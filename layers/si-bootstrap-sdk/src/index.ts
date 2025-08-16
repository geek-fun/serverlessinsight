import { CustomResourceRequest, ResourceProperties, TableStoreResourceProperties } from './tyes';
import { resources } from './resources';
import { logger } from './common';

export const bootstrapHandler = async (event: CustomResourceRequest) => {
  logger.info(event, 'bootstrapHandler received event');

  const { resourceType, requestType } = event;

  const action = resources[resourceType][requestType];
  if (!action) {
    logger.error(
      { resourceType, requestType },
      'Unsupported resource type or request type provided',
    );

    return {
      status: 'FAILED',
      reason: `Unsupported resource type or request type: ${resourceType} - ${requestType}`,
      stackId: event.stackId,
      logicalResourceId: event?.logicalResourceId,
      physicalResourceId: event?.physicalResourceId,
    };
  }

  try {
    const resourceProps =
      event.resourceProperties as ResourceProperties<TableStoreResourceProperties>;

    const result = await action(resourceProps, event.credentials, event.regionId);

    logger.info(result, 'Action completed successfully');

    return {
      status: 'SUCCESS',
      reason: 'Custom resource processed successfully.',
      logicalResourceId: event?.logicalResourceId,
      stackId: event.stackId,
      physicalResourceId: result?.physicalResourceId || 'xxx',
      data: result?.data || {},
    };
  } catch (error) {
    logger.error(error, 'Error processing request');

    return {
      status: 'FAILED',
      reason: error instanceof Error ? error.message : 'Internal Server Error',
      logicalResourceId: event.logicalResourceId,
      stackId: event.stackId,
      physicalResourceId: 'xxx',
    };
  }
};
