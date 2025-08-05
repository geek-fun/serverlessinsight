type CustomResourceRequest = {
  requestType: 'Create' | 'Update' | 'Delete';
  stackId: string;
  stackName: string;
  resourceOwnerId: string;
  callerId: string;
  resourceProperties: {
    [key: string]: unknown;
  };
  resourceType: string;
  logicalResourceId: string;

  regionId: string;
  requestId: string;
};

export const bootstrapHandler = async (event: CustomResourceRequest) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  if (event.requestType === 'Create' || event.requestType === 'Update') {
    const responseData = {
      message: 'Custom resource created or updated successfully.',
    };
    console.log('Response data:', responseData);

    return {
      status: 'SUCCESS',
      reason: 'Custom resource created successfully.',
      logicalResourceId: event.logicalResourceId,
      stackId: event.stackId,
      physicalResourceId: 'xxx',
      data: responseData,
    };
  } else if (event.requestType === 'Delete') {
    console.log('Custom resource deleted.');
    return {
      status: 'SUCCESS',
      reason: 'Custom resource deleted successfully.',
      stackId: event.stackId,
      physicalResourceId: 'xxx',
      logicalResourceId: event.logicalResourceId,
    };
  }

  throw new Error(`Unsupported request type: ${event.requestType}`);
};
