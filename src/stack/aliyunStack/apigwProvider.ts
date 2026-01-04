import { Context } from '../../types';
import {
  ApigwGroupConfig,
  ApigwGroupInfo,
  ApigwApiConfig,
  ApigwApiInfo,
  ApigwDeploymentConfig,
  ApigwCustomDomainConfig,
} from './apigwTypes';
import { createAliyunClient } from '../../common/aliyunClient';
import * as cloudapi from '@alicloud/cloudapi20160714';

/**
 * Remove undefined values from an object
 * This helps avoid issues with API calls that may not handle undefined correctly
 */
const removeUndefined = <T extends Record<string, unknown>>(obj: T): T => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as T;
};

/**
 * Create an API Gateway group
 */
export const createApiGroup = async (
  context: Context,
  config: ApigwGroupConfig,
): Promise<string> => {
  const client = createAliyunClient(context);

  const request = new cloudapi.CreateApiGroupRequest({
    groupName: config.groupName,
    description: config.description,
    basePath: config.basePath,
    instanceId: config.instanceId,
    tag: config.tags?.map(
      (t) => new cloudapi.CreateApiGroupRequestTag({ key: t.key, value: t.value }),
    ),
  });

  const response = await client.apigw.createApiGroup(request);

  if (!response.body?.groupId) {
    throw new Error('Failed to create API Gateway group: no groupId returned');
  }

  return response.body.groupId;
};

/**
 * Get API Gateway group by group ID
 */
export const getApiGroup = async (
  context: Context,
  groupId: string,
): Promise<ApigwGroupInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const request = new cloudapi.DescribeApiGroupRequest({
      groupId,
    });

    const response = await client.apigw.describeApiGroup(request);

    if (!response.body) {
      return null;
    }

    return {
      groupId: response.body.groupId,
      groupName: response.body.groupName,
      description: response.body.description,
      basePath: response.body.basePath,
      subDomain: response.body.subDomain,
      instanceId: response.body.instanceId,
      instanceType: response.body.instanceType,
      regionId: response.body.regionId,
      status: response.body.status,
      createdTime: response.body.createdTime,
      modifiedTime: response.body.modifiedTime,
      billingStatus: response.body.billingStatus,
      illegalStatus: response.body.illegalStatus,
      trafficLimit: response.body.trafficLimit,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error.code === 'NotFoundApiGroup' || error.code === 'InvalidGroupId.NotFound')
    ) {
      return null;
    }
    throw error;
  }
};

/**
 * Find API Gateway group by name
 */
export const findApiGroupByName = async (
  context: Context,
  groupName: string,
): Promise<ApigwGroupInfo | null> => {
  const client = createAliyunClient(context);

  const request = new cloudapi.DescribeApiGroupsRequest({
    groupName,
    pageSize: 10,
    pageNumber: 1,
  });

  const response = await client.apigw.describeApiGroups(request);

  if (!response.body?.apiGroupAttributes?.apiGroupAttribute?.length) {
    return null;
  }

  // Find exact match
  const group = response.body.apiGroupAttributes.apiGroupAttribute.find(
    (g) => g.groupName === groupName,
  );

  if (!group) {
    return null;
  }

  return {
    groupId: group.groupId,
    groupName: group.groupName,
    description: group.description,
    basePath: group.basePath,
    subDomain: group.subDomain,
    instanceId: group.instanceId,
    instanceType: group.instanceType,
    regionId: group.regionId,
    billingStatus: group.billingStatus,
    illegalStatus: group.illegalStatus,
    trafficLimit: group.trafficLimit,
  };
};

/**
 * Update API Gateway group
 */
export const updateApiGroup = async (
  context: Context,
  groupId: string,
  config: Partial<ApigwGroupConfig>,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new cloudapi.ModifyApiGroupRequest({
    groupId,
    groupName: config.groupName,
    description: config.description,
    basePath: config.basePath,
  });

  await client.apigw.modifyApiGroup(request);
};

/**
 * Delete API Gateway group
 */
export const deleteApiGroup = async (context: Context, groupId: string): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new cloudapi.DeleteApiGroupRequest({
    groupId,
  });

  await client.apigw.deleteApiGroup(request);
};

/**
 * Create an API in API Gateway
 */
export const createApi = async (context: Context, config: ApigwApiConfig): Promise<string> => {
  const client = createAliyunClient(context);

  const requestConfig = JSON.stringify(
    removeUndefined({
      RequestProtocol: config.requestConfig.requestProtocol,
      RequestHttpMethod: config.requestConfig.requestHttpMethod,
      RequestPath: config.requestConfig.requestPath,
      RequestMode: config.requestConfig.requestMode,
      BodyFormat: config.requestConfig.bodyFormat,
    }),
  );

  const serviceConfigObj: Record<string, unknown> = {
    ServiceProtocol: config.serviceConfig.serviceProtocol,
    ServiceAddress: config.serviceConfig.serviceAddress,
    ServiceHttpMethod: config.serviceConfig.serviceHttpMethod,
    ServicePath: config.serviceConfig.servicePath,
    ServiceTimeout: config.serviceConfig.serviceTimeout || 10000,
    MockResult: config.serviceConfig.mockResult,
  };

  if (config.serviceConfig.functionComputeConfig) {
    serviceConfigObj.FunctionComputeConfig = removeUndefined({
      FcRegionId: config.serviceConfig.functionComputeConfig.fcRegionId,
      FunctionName: config.serviceConfig.functionComputeConfig.functionName,
      RoleArn: config.serviceConfig.functionComputeConfig.roleArn,
      FcVersion: config.serviceConfig.functionComputeConfig.fcVersion || '3.0',
      Method: config.serviceConfig.functionComputeConfig.method,
    });
  }

  if (config.serviceConfig.vpcConfig) {
    serviceConfigObj.VpcConfig = {
      VpcId: config.serviceConfig.vpcConfig.vpcId,
      InstanceId: config.serviceConfig.vpcConfig.instanceId,
      Port: config.serviceConfig.vpcConfig.port,
    };
  }

  const serviceConfig = JSON.stringify(removeUndefined(serviceConfigObj));

  const request = new cloudapi.CreateApiRequest({
    groupId: config.groupId,
    apiName: config.apiName,
    description: config.description,
    visibility: config.visibility,
    authType: config.authType,
    requestConfig,
    serviceConfig,
    resultType: config.resultType,
    resultSample: config.resultSample,
    failResultSample: config.failResultSample,
    tag: config.tags?.map((t) => new cloudapi.CreateApiRequestTag({ key: t.key, value: t.value })),
  });

  const response = await client.apigw.createApi(request);

  if (!response.body?.apiId) {
    throw new Error('Failed to create API: no apiId returned');
  }

  return response.body.apiId;
};

/**
 * Get API by API ID
 */
export const getApi = async (
  context: Context,
  groupId: string,
  apiId: string,
): Promise<ApigwApiInfo | null> => {
  const client = createAliyunClient(context);

  try {
    const request = new cloudapi.DescribeApiRequest({
      groupId,
      apiId,
    });

    const response = await client.apigw.describeApi(request);

    if (!response.body) {
      return null;
    }

    const body = response.body;

    return {
      apiId: body.apiId,
      apiName: body.apiName,
      groupId: body.groupId,
      groupName: body.groupName,
      description: body.description,
      visibility: body.visibility,
      authType: body.authType,
      requestConfig: body.requestConfig
        ? {
            requestProtocol: body.requestConfig.requestProtocol,
            requestHttpMethod: body.requestConfig.requestHttpMethod,
            requestPath: body.requestConfig.requestPath,
            requestMode: body.requestConfig.requestMode,
            bodyFormat: body.requestConfig.bodyFormat,
          }
        : undefined,
      serviceConfig: body.serviceConfig
        ? {
            serviceProtocol: body.serviceConfig.serviceProtocol,
            serviceAddress: body.serviceConfig.serviceAddress,
            serviceHttpMethod: body.serviceConfig.serviceHttpMethod,
            servicePath: body.serviceConfig.servicePath,
            serviceTimeout: body.serviceConfig.serviceTimeout,
            functionComputeConfig: body.serviceConfig.functionComputeConfig
              ? {
                  fcRegionId: body.serviceConfig.functionComputeConfig.fcRegionId,
                  functionName: body.serviceConfig.functionComputeConfig.functionName,
                  roleArn: body.serviceConfig.functionComputeConfig.roleArn,
                  fcVersion: body.serviceConfig.functionComputeConfig.fcVersion,
                  method: body.serviceConfig.functionComputeConfig.method,
                }
              : undefined,
            mockResult: body.serviceConfig.mockResult,
          }
        : undefined,
      resultType: body.resultType,
      resultSample: body.resultSample,
      createdTime: body.createdTime,
      modifiedTime: body.modifiedTime,
      deployedInfos: body.deployedInfos?.deployedInfo?.map((info) => ({
        stageName: info.stageName,
        deployedStatus: info.deployedStatus,
        effectiveVersion: info.effectiveVersion,
      })),
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error.code === 'NotFoundApi' || error.code === 'InvalidApiId.NotFound')
    ) {
      return null;
    }
    throw error;
  }
};

/**
 * Update API
 */
export const updateApi = async (
  context: Context,
  apiId: string,
  config: ApigwApiConfig,
): Promise<void> => {
  const client = createAliyunClient(context);

  const requestConfig = JSON.stringify(
    removeUndefined({
      RequestProtocol: config.requestConfig.requestProtocol,
      RequestHttpMethod: config.requestConfig.requestHttpMethod,
      RequestPath: config.requestConfig.requestPath,
      RequestMode: config.requestConfig.requestMode,
      BodyFormat: config.requestConfig.bodyFormat,
    }),
  );

  const serviceConfigObj: Record<string, unknown> = {
    ServiceProtocol: config.serviceConfig.serviceProtocol,
    ServiceAddress: config.serviceConfig.serviceAddress,
    ServiceHttpMethod: config.serviceConfig.serviceHttpMethod,
    ServicePath: config.serviceConfig.servicePath,
    ServiceTimeout: config.serviceConfig.serviceTimeout || 10000,
    MockResult: config.serviceConfig.mockResult,
  };

  if (config.serviceConfig.functionComputeConfig) {
    serviceConfigObj.FunctionComputeConfig = removeUndefined({
      FcRegionId: config.serviceConfig.functionComputeConfig.fcRegionId,
      FunctionName: config.serviceConfig.functionComputeConfig.functionName,
      RoleArn: config.serviceConfig.functionComputeConfig.roleArn,
      FcVersion: config.serviceConfig.functionComputeConfig.fcVersion || '3.0',
      Method: config.serviceConfig.functionComputeConfig.method,
    });
  }

  const serviceConfig = JSON.stringify(removeUndefined(serviceConfigObj));

  const request = new cloudapi.ModifyApiRequest({
    groupId: config.groupId,
    apiId,
    apiName: config.apiName,
    description: config.description,
    visibility: config.visibility,
    authType: config.authType,
    requestConfig,
    serviceConfig,
    resultType: config.resultType,
    resultSample: config.resultSample,
    failResultSample: config.failResultSample,
  });

  await client.apigw.modifyApi(request);
};

/**
 * Delete API
 */
export const deleteApi = async (
  context: Context,
  groupId: string,
  apiId: string,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new cloudapi.DeleteApiRequest({
    groupId,
    apiId,
  });

  await client.apigw.deleteApi(request);
};

/**
 * Deploy API to a stage
 */
export const deployApi = async (context: Context, config: ApigwDeploymentConfig): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new cloudapi.DeployApiRequest({
    groupId: config.groupId,
    apiId: config.apiId,
    stageName: config.stageName,
    description: config.description,
  });

  await client.apigw.deployApi(request);
};

/**
 * Abolish (undeploy) API from a stage
 */
export const abolishApi = async (
  context: Context,
  groupId: string,
  apiId: string,
  stageName: string,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new cloudapi.AbolishApiRequest({
    groupId,
    apiId,
    stageName,
  });

  await client.apigw.abolishApi(request);
};

/**
 * Bind custom domain to API group
 */
export const bindCustomDomain = async (
  context: Context,
  config: ApigwCustomDomainConfig,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new cloudapi.SetDomainRequest({
    groupId: config.groupId,
    domainName: config.domainName,
    bindStageName: config.bindStageName,
    customDomainType: config.customDomainType,
    isHttpRedirectToHttps: config.isHttpRedirectToHttps,
  });

  await client.apigw.setDomain(request);

  // Set certificate if provided
  if (config.certificateName && config.certificateBody && config.certificatePrivateKey) {
    const certRequest = new cloudapi.SetDomainCertificateRequest({
      groupId: config.groupId,
      domainName: config.domainName,
      certificateName: config.certificateName,
      certificateBody: config.certificateBody,
      certificatePrivateKey: config.certificatePrivateKey,
    });

    await client.apigw.setDomainCertificate(certRequest);
  }
};

/**
 * Unbind custom domain from API group
 */
export const unbindCustomDomain = async (
  context: Context,
  groupId: string,
  domainName: string,
): Promise<void> => {
  const client = createAliyunClient(context);

  const request = new cloudapi.DeleteDomainRequest({
    groupId,
    domainName,
  });

  await client.apigw.deleteDomain(request);
};
