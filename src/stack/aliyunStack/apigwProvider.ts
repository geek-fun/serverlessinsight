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

/**
 * Create an API Gateway group
 */
export const createApiGroup = async (
  context: Context,
  config: ApigwGroupConfig,
): Promise<string> => {
  const client = createAliyunClient(context);
  return client.apigw.createApiGroup(config);
};

/**
 * Get API Gateway group by group ID
 */
export const getApiGroup = async (
  context: Context,
  groupId: string,
): Promise<ApigwGroupInfo | null> => {
  const client = createAliyunClient(context);
  return client.apigw.getApiGroup(groupId);
};

/**
 * Find API Gateway group by name
 */
export const findApiGroupByName = async (
  context: Context,
  groupName: string,
): Promise<ApigwGroupInfo | null> => {
  const client = createAliyunClient(context);
  return client.apigw.findApiGroupByName(groupName);
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
  return client.apigw.updateApiGroup(groupId, config);
};

/**
 * Delete API Gateway group
 */
export const deleteApiGroup = async (context: Context, groupId: string): Promise<void> => {
  const client = createAliyunClient(context);
  return client.apigw.deleteApiGroup(groupId);
};

/**
 * Create an API in API Gateway
 */
export const createApi = async (context: Context, config: ApigwApiConfig): Promise<string> => {
  const client = createAliyunClient(context);
  return client.apigw.createApi(config);
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
  return client.apigw.getApi(groupId, apiId);
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
  return client.apigw.updateApi(apiId, config);
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
  return client.apigw.deleteApi(groupId, apiId);
};

/**
 * Deploy API to a stage
 */
export const deployApi = async (context: Context, config: ApigwDeploymentConfig): Promise<void> => {
  const client = createAliyunClient(context);
  return client.apigw.deployApi(config);
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
  return client.apigw.abolishApi(groupId, apiId, stageName);
};

/**
 * Bind custom domain to API group
 */
export const bindCustomDomain = async (
  context: Context,
  config: ApigwCustomDomainConfig,
): Promise<void> => {
  const client = createAliyunClient(context);
  return client.apigw.bindCustomDomain(config);
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
  return client.apigw.unbindCustomDomain(groupId, domainName);
};
