import { CustomResourceRequest, ResourceProperties, TableStoreResourceProperties } from './tyes';
import { resources } from './resources';

export const bootstrapHandler = async (event: CustomResourceRequest) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const { resourceType, requestType } = event;

  const action = resources[resourceType][requestType];
  if (!action) {
    throw new Error(
      `Unsupported resource type or request type: ${event.resourceType} - ${event.requestType}`,
    );
  }

  try {
    const resourceProps =
      event.resourceProperties as ResourceProperties<TableStoreResourceProperties>;

    const result = await action(resourceProps, event.credentials, event.regionId);
    console.log('Action result:', result);

    return {
      status: 'SUCCESS',
      reason: 'Custom resource processed successfully.',
      logicalResourceId: event?.logicalResourceId,
      stackId: event.stackId,
      physicalResourceId: result?.physicalResourceId || 'xxx',
      data: result?.data || {},
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      status: 'FAILED',
      reason: error instanceof Error ? error.message : 'Internal Server Error',
      logicalResourceId: event.logicalResourceId,
      stackId: event.stackId,
      physicalResourceId: 'xxx',
    };
  }
};
