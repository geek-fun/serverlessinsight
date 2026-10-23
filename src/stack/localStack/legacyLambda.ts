import { FunctionDomain, ServerlessIac } from '../../types';

/**
 * The generic execution context shared by providers without a native local HTTP
 * simulation (AWS, Huawei). It is an AWS Lambda-shaped context kept only for
 * backward compatibility: it is not a provider-native contract for either
 * provider, and local provider-native parity is not claimed for them.
 */
export const createLegacyContext = (
  iac: ServerlessIac,
  fn: FunctionDomain,
  requestId: string,
): Record<string, unknown> => ({
  functionName: fn.name,
  functionVersion: '$LATEST',
  memoryLimitInMB: fn.memory,
  logGroupName: `/aws/lambda/${fn.name}`,
  logStreamName: `${new Date().toISOString().split('T')[0]}/[$LATEST]${requestId}`,
  invokedFunctionArn: `arn:aws:lambda:${iac.provider.region}:000000000000:function:${fn.name}`,
  awsRequestId: requestId,
});

export const createLegacyEnv = (
  iac: ServerlessIac,
  fn: FunctionDomain,
): Record<string, string> => ({
  AWS_REGION: iac.provider.region || 'us-east-1',
  FUNCTION_NAME: fn.name,
  FUNCTION_MEMORY_SIZE: String(fn.memory),
  FUNCTION_TIMEOUT: String(fn.timeout),
});
