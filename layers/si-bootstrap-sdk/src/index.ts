type CustomResourceRequest = {
  requestType: 'Create' | 'Update' | 'Delete';
  requestId: string;
  responseURL: string;
  innerResponseURL: string;
  resourceType: string;
  logicalResourceId: string;
  stackId: string;
  stackName: string;
  resourceOwnerId: string;
  callerId: string;
  regionId: string;
  resourceProperties: {
    [key: string]: unknown;
  };
};

export const bootstrapHandler = async (event: CustomResourceRequest) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  if (event.requestType === 'Create' || event.requestType === 'Update') {
    const responseData = {
      message: 'Custom resource created or updated successfully.',
    };
    console.log('Response data:', responseData);
    return {
      Status: 'SUCCESS',
      Reason: 'Custom resource created successfully.',
      PhysicalResourceId: event.logicalResourceId,
      StackId: event.stackId,
      RequestId: event.requestId,
      Data: responseData,
    };
  } else if (event.requestType === 'Delete') {
    console.log('Custom resource deleted.');
    return {
      Status: 'SUCCESS',
      Reason: 'Custom resource deleted successfully.',
      PhysicalResourceId: event.logicalResourceId,
      StackId: event.stackId,
      RequestId: event.requestId,
    };
  }

  throw new Error(`Unsupported request type: ${event.requestType}`);
};
