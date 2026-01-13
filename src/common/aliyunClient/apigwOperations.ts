import CloudApiClient from '@alicloud/cloudapi20160714';
import * as cloudapi from '@alicloud/cloudapi20160714';
import DnsClient from '@alicloud/alidns20150109';
import { Context } from '../../types';
import { createDnsOperations } from './dnsOperations';
import { logger } from '../logger';

type ApigwSdkClient = CloudApiClient;
type DnsSdkClient = DnsClient;

/**
 * API Group types
 */
export type ApigwGroupConfig = {
  groupName: string;
  description?: string;
  basePath?: string;
  instanceId?: string;
  tags?: Array<{ key: string; value: string }>;
};

export type ApigwGroupInfo = {
  groupId?: string;
  groupName?: string;
  description?: string;
  basePath?: string;
  subDomain?: string;
  instanceId?: string;
  instanceType?: string;
  regionId?: string;
  status?: string;
  createdTime?: string;
  modifiedTime?: string;
  billingStatus?: string;
  illegalStatus?: string;
  trafficLimit?: number;
};

/**
 * API types
 */
export type ApigwApiConfig = {
  groupId: string;
  apiName: string;
  description?: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  authType: 'APP' | 'ANONYMOUS' | 'APPOPENID' | 'OPENID';
  requestConfig: {
    requestProtocol: 'HTTP' | 'HTTPS' | 'HTTP,HTTPS';
    requestHttpMethod: string;
    requestPath: string;
    requestMode: 'MAPPING' | 'PASSTHROUGH';
    bodyFormat?: 'FORM' | 'STREAM';
  };
  serviceConfig: {
    serviceProtocol: 'HTTP' | 'HTTPS' | 'FunctionCompute' | 'MOCK' | 'VPC';
    serviceAddress?: string;
    serviceHttpMethod?: string;
    servicePath?: string;
    serviceTimeout?: number;
    functionComputeConfig?: {
      fcRegionId: string;
      functionName: string;
      roleArn?: string;
      fcVersion?: string;
      method?: string;
    };
    mockResult?: string;
    vpcConfig?: {
      vpcId: string;
      instanceId: string;
      port: number;
    };
  };
  resultType?: 'JSON' | 'TEXT' | 'BINARY' | 'XML' | 'HTML' | 'PASSTHROUGH';
  resultSample?: string;
  failResultSample?: string;
  tags?: Array<{ key: string; value: string }>;
};

export type ApigwApiInfo = {
  apiId?: string;
  apiName?: string;
  groupId?: string;
  groupName?: string;
  description?: string;
  visibility?: string;
  authType?: string;
  requestConfig?: {
    requestProtocol?: string;
    requestHttpMethod?: string;
    requestPath?: string;
    requestMode?: string;
    bodyFormat?: string;
  };
  serviceConfig?: {
    serviceProtocol?: string;
    serviceAddress?: string;
    serviceHttpMethod?: string;
    servicePath?: string;
    serviceTimeout?: number;
    functionComputeConfig?: {
      fcRegionId?: string;
      functionName?: string;
      roleArn?: string;
      fcVersion?: string;
      method?: string;
    };
    mockResult?: string;
  };
  resultType?: string;
  resultSample?: string;
  createdTime?: string;
  modifiedTime?: string;
  deployedInfos?: Array<{
    stageName?: string;
    deployedStatus?: string;
    effectiveVersion?: string;
  }>;
};

/**
 * Deployment types
 */
export type ApigwDeploymentConfig = {
  groupId: string;
  apiId: string;
  stageName: 'RELEASE' | 'PRE' | 'TEST';
  description?: string;
};

/**
 * Custom domain types
 */
export type ApigwCustomDomainConfig = {
  groupId: string;
  domainName: string;
  bindStageName?: string;
  customDomainType?: 'INTERNET' | 'INTRANET';
  isHttpRedirectToHttps?: boolean;
  certificateName?: string;
  certificateBody?: string;
  certificatePrivateKey?: string;
};

/**
 * Remove undefined values from an object
 * This helps avoid issues with API calls that may not handle undefined correctly
 */
const removeUndefined = <T extends Record<string, unknown>>(obj: T): T => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as T;
};

/**
 * Sleep utility for waiting
 */
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Extract main domain from subdomain
 * e.g., "api.example.com" -> "example.com"
 */
const extractMainDomain = (domainName: string): string => {
  const parts = domainName.split('.');
  if (parts.length <= 2) {
    return domainName;
  }
  return parts.slice(-2).join('.');
};

export const createApigwOperations = (
  apigwClient: ApigwSdkClient,
  dnsClient: DnsSdkClient,
  _context: Context,
) => {
  const dnsOps = createDnsOperations(dnsClient);

  /**
   * Check if domain is verified for API Gateway
   */
  const checkDomainVerification = async (domainName: string): Promise<boolean> => {
    try {
      const request = new cloudapi.DescribeDomainRequest({
        domainName,
        groupId: '', // Can be empty for domain check
      });
      const response = await apigwClient.describeDomain(request);
      // If domain exists and can be described, consider it verified
      return response.body?.domainName === domainName;
    } catch (error: unknown) {
      const err = error as { code?: string };
      if (err.code === 'NotFoundDomain' || err.code === 'DomainNotExists') {
        return false;
      }
      // For other errors, log and return false
      logger.warn(`Unable to check domain verification for ${domainName}: ${error}`);
      return false;
    }
  };

  /**
   * Add DNS verification record for domain
   */
  const addDomainVerificationRecord = async (domainName: string): Promise<void> => {
    logger.info(`Adding DNS verification record for domain: ${domainName}`);

    const mainDomain = extractMainDomain(domainName);
    const verificationHost = `_aliyundomainverify`;
    const verificationValue = `apigateway_${domainName.replace(/\./g, '_')}`;

    try {
      // Check if record already exists
      const existingRecords = await dnsOps.describeDomainRecords(mainDomain, verificationHost);
      const recordExists = existingRecords.some(
        (record) => record.rr === verificationHost && record.value === verificationValue,
      );

      if (recordExists) {
        logger.info(`DNS verification record already exists for ${domainName}`);
        return;
      }

      // Add the verification record
      await dnsOps.addDomainRecord({
        domainName: mainDomain,
        rr: verificationHost,
        type: 'TXT',
        value: verificationValue,
        ttl: 600,
      });

      logger.info(`DNS verification record added for ${domainName}`);
      logger.info('Waiting for DNS propagation (60 seconds)...');
      await sleep(60000); // Wait 1 minute for DNS propagation
    } catch (error) {
      logger.error(`Failed to add DNS verification record for ${domainName}: ${error}`);
      throw error;
    }
  };

  return {
    /**
     * Create an API Gateway group
     */
    createApiGroup: async (config: ApigwGroupConfig): Promise<string> => {
      const request = new cloudapi.CreateApiGroupRequest({
        groupName: config.groupName,
        description: config.description,
        basePath: config.basePath,
        instanceId: config.instanceId,
        tag: config.tags?.map(
          (t) => new cloudapi.CreateApiGroupRequestTag({ key: t.key, value: t.value }),
        ),
      });

      const response = await apigwClient.createApiGroup(request);

      if (!response.body?.groupId) {
        throw new Error('Failed to create API Gateway group: no groupId returned');
      }

      return response.body.groupId;
    },

    /**
     * Get API Gateway group by group ID
     */
    getApiGroup: async (groupId: string): Promise<ApigwGroupInfo | null> => {
      try {
        const request = new cloudapi.DescribeApiGroupRequest({
          groupId,
        });

        const response = await apigwClient.describeApiGroup(request);

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
    },

    /**
     * Find API Gateway group by name
     */
    findApiGroupByName: async (groupName: string): Promise<ApigwGroupInfo | null> => {
      const request = new cloudapi.DescribeApiGroupsRequest({
        groupName,
        pageSize: 10,
        pageNumber: 1,
      });

      const response = await apigwClient.describeApiGroups(request);

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
    },

    /**
     * Update API Gateway group
     */
    updateApiGroup: async (groupId: string, config: Partial<ApigwGroupConfig>): Promise<void> => {
      const request = new cloudapi.ModifyApiGroupRequest({
        groupId,
        groupName: config.groupName,
        description: config.description,
        basePath: config.basePath,
      });

      await apigwClient.modifyApiGroup(request);
    },

    /**
     * Delete API Gateway group
     */
    deleteApiGroup: async (groupId: string): Promise<void> => {
      const request = new cloudapi.DeleteApiGroupRequest({
        groupId,
      });

      await apigwClient.deleteApiGroup(request);
    },

    /**
     * Create an API in API Gateway
     */
    createApi: async (config: ApigwApiConfig): Promise<string> => {
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
        tag: config.tags?.map(
          (t) => new cloudapi.CreateApiRequestTag({ key: t.key, value: t.value }),
        ),
      });

      const response = await apigwClient.createApi(request);

      if (!response.body?.apiId) {
        throw new Error('Failed to create API: no apiId returned');
      }

      return response.body.apiId;
    },

    /**
     * Get API by API ID
     */
    getApi: async (groupId: string, apiId: string): Promise<ApigwApiInfo | null> => {
      try {
        const request = new cloudapi.DescribeApiRequest({
          groupId,
          apiId,
        });

        const response = await apigwClient.describeApi(request);

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
    },

    /**
     * Update API
     */
    updateApi: async (apiId: string, config: ApigwApiConfig): Promise<void> => {
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

      await apigwClient.modifyApi(request);
    },

    /**
     * Delete API
     */
    deleteApi: async (groupId: string, apiId: string): Promise<void> => {
      const request = new cloudapi.DeleteApiRequest({
        groupId,
        apiId,
      });

      await apigwClient.deleteApi(request);
    },

    /**
     * Deploy API to a stage
     */
    deployApi: async (config: ApigwDeploymentConfig): Promise<void> => {
      const request = new cloudapi.DeployApiRequest({
        groupId: config.groupId,
        apiId: config.apiId,
        stageName: config.stageName,
        description: config.description,
      });

      await apigwClient.deployApi(request);
    },

    /**
     * Abolish (undeploy) API from a stage
     */
    abolishApi: async (groupId: string, apiId: string, stageName: string): Promise<void> => {
      const request = new cloudapi.AbolishApiRequest({
        groupId,
        apiId,
        stageName,
      });

      await apigwClient.abolishApi(request);
    },

    /**
     * Bind custom domain to API group with automatic verification
     */
    bindCustomDomain: async (config: ApigwCustomDomainConfig): Promise<void> => {
      logger.info(`Binding custom domain: ${config.domainName}`);

      // Check if domain needs verification
      const isVerified = await checkDomainVerification(config.domainName);

      if (!isVerified) {
        logger.info(`Domain ${config.domainName} requires verification`);
        try {
          await addDomainVerificationRecord(config.domainName);
        } catch (error) {
          logger.warn(`DNS verification setup failed, attempting to bind domain anyway: ${error}`);
        }
      }

      // Proceed with domain binding
      const request = new cloudapi.SetDomainRequest({
        groupId: config.groupId,
        domainName: config.domainName,
        bindStageName: config.bindStageName,
        customDomainType: config.customDomainType,
        isHttpRedirectToHttps: config.isHttpRedirectToHttps,
      });

      await apigwClient.setDomain(request);

      // Set certificate if provided
      if (config.certificateName && config.certificateBody && config.certificatePrivateKey) {
        const certRequest = new cloudapi.SetDomainCertificateRequest({
          groupId: config.groupId,
          domainName: config.domainName,
          certificateName: config.certificateName,
          certificateBody: config.certificateBody,
          certificatePrivateKey: config.certificatePrivateKey,
        });

        await apigwClient.setDomainCertificate(certRequest);
      }
    },

    /**
     * Unbind custom domain from API group
     */
    unbindCustomDomain: async (groupId: string, domainName: string): Promise<void> => {
      const request = new cloudapi.DeleteDomainRequest({
        groupId,
        domainName,
      });

      await apigwClient.deleteDomain(request);
    },
  };
};
