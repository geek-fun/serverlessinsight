import CloudApiClient from '@alicloud/cloudapi20160714';
import * as cloudapi from '@alicloud/cloudapi20160714';
import DnsClient from '@alicloud/alidns20150109';
import { promises as dnsPromises } from 'node:dns';
import { Context, StateFile, ResourceState } from '../../types';
import { createDnsOperations } from './dnsOperations';
import { logger } from '../logger';
import { lang } from '../../lang';
import { getResource, setResource } from '../stateManager';
import { buildSid } from '../sidUtils';
import { extractMainDomain, extractHostRecord } from '../domainUtils';
import {
  APIGW_DOMAIN_BIND_MAX_RETRIES,
  APIGW_DOMAIN_BIND_RETRY_DELAY_MS,
  APIGW_DNS_PUBLIC_RESOLUTION_MAX_ATTEMPTS,
  APIGW_DNS_PUBLIC_RESOLUTION_DELAY_MS,
} from '../constants';
import { sleep } from '../retryUtils';

type ApigwSdkClient = CloudApiClient;
type DnsSdkClient = DnsClient;

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

export type ApigwDeploymentConfig = {
  groupId: string;
  apiId: string;
  stageName: 'RELEASE' | 'PRE' | 'TEST';
  description?: string;
};

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

const removeUndefined = <T extends Record<string, unknown>>(obj: T): T => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as T;
};

export const isNetworkTimeoutError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false;
  const err = error as { name?: string; message?: string; code?: string };
  return (
    err.name === 'RequestTimeoutError' ||
    err.name === 'ConnectTimeout' ||
    err.code === 'RequestTimeoutError' ||
    err.code === 'ConnectTimeout' ||
    (err.message?.includes('ConnectTimeout') ?? false) ||
    (err.message?.includes('RequestTimeoutError') ?? false)
  );
};

export const isDomainAlreadyBoundError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false;
  const err = error as { code?: string; message?: string };
  return (
    err.code === 'DomainAlreadyBind' ||
    err.code === 'RepeatedCommit' ||
    (err.message?.includes('bindingExists') ?? false) ||
    (err.message?.toLowerCase().includes('domain bindedbyother') ?? false)
  );
};

export const createApigwOperations = (
  apigwClient: ApigwSdkClient,
  dnsClient: DnsSdkClient,
  _context: Context,
) => {
  const dnsOps = createDnsOperations(dnsClient);

  const buildTxtVerificationRecord = (
    groupId: string,
    domainName: string,
    groupSubdomain: string,
    mainDomain: string,
  ): { rr: string; value: string } => {
    const hostRecord = extractHostRecord(domainName, mainDomain);
    const rr = hostRecord === '@' ? groupId : `${groupId}.${hostRecord}`;
    // NOTE: "verfication" is Aliyun's actual typo in their API — must match exactly
    return { rr, value: `apigateway-domain-verfication=${groupSubdomain}` };
  };

  const pollDnsPropagation = async (
    mainDomain: string,
    verificationHost: string,
    verificationValue: string,
    shouldLoop: boolean = true,
  ): Promise<boolean> => {
    const checkPropagation = async (): Promise<boolean> => {
      try {
        const currentRecords = await dnsOps.describeDomainRecords(mainDomain, verificationHost);
        return currentRecords.some(
          (record) =>
            record.rr === verificationHost &&
            record.type === 'CNAME' &&
            record.value === verificationValue &&
            record.status === 'ENABLE',
        );
      } catch (checkError) {
        logger.warn(lang.__('APIGW_DNS_CHECK_FAILED', { attempt: '1', error: String(checkError) }));
        return false;
      }
    };

    if (!shouldLoop) {
      logger.info('Checking DNS record status...');
      return await checkPropagation();
    }

    logger.info(lang.__('APIGW_DNS_PROPAGATION_WAITING'));
    const maxAttempts = 10;
    const delayMs = 60000; // 1 minute

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      logger.info(
        lang.__('APIGW_DNS_PROPAGATION_CHECK', {
          attempt: String(attempt),
          max: String(maxAttempts),
        }),
      );
      await sleep(delayMs);

      const propagated = await checkPropagation();
      if (propagated) {
        logger.info(lang.__('APIGW_DNS_VERIFIED', { minutes: String(attempt) }));
        return true;
      }
    }

    logger.warn(lang.__('APIGW_DNS_PROPAGATION_TIMEOUT'));
    return false;
  };

  const verifyCnameResolution = async (hostname: string): Promise<boolean> => {
    try {
      await dnsPromises.resolveCname(hostname);
      return true;
    } catch {
      return false;
    }
  };

  const pollPublicDnsResolution = async (domainName: string): Promise<boolean> => {
    logger.info(lang.__('APIGW_PUBLIC_DNS_CHECKING', { domain: domainName }));

    for (let attempt = 1; attempt <= APIGW_DNS_PUBLIC_RESOLUTION_MAX_ATTEMPTS; attempt++) {
      logger.info(
        lang.__('APIGW_PUBLIC_DNS_CHECK_ATTEMPT', {
          attempt: String(attempt),
          max: String(APIGW_DNS_PUBLIC_RESOLUTION_MAX_ATTEMPTS),
        }),
      );

      const resolved = await verifyCnameResolution(domainName);
      if (resolved) {
        logger.info(lang.__('APIGW_PUBLIC_DNS_RESOLVED', { domain: domainName }));
        return true;
      }

      if (attempt < APIGW_DNS_PUBLIC_RESOLUTION_MAX_ATTEMPTS) {
        await sleep(APIGW_DNS_PUBLIC_RESOLUTION_DELAY_MS);
      }
    }

    logger.warn(lang.__('APIGW_PUBLIC_DNS_TIMEOUT', { domain: domainName }));
    return false;
  };

  const addDomainVerificationRecord = async (
    domainName: string,
    verificationToken: string,
    groupSubdomain: string,
    region: string,
    state: StateFile,
    eventLogicalId: string,
  ): Promise<StateFile> => {
    logger.info(lang.__('APIGW_DNS_ADDING_RECORD', { domain: domainName }));

    const mainDomain = extractMainDomain(domainName);
    const hostRecord = extractHostRecord(domainName, mainDomain);
    // For CNAME verification: point the domain directly to the group subdomain
    const verificationHost = domainName;
    const verificationValue = groupSubdomain;
    const dnsResourceId = `${eventLogicalId}.dns_verification`;

    try {
      // Check if DNS record is tracked in state
      const existingDnsResource = getResource(state, dnsResourceId);
      const now = new Date();
      const thirtyMinutesMs = 30 * 60 * 1000;

      if (existingDnsResource) {
        const createdAt = new Date(existingDnsResource.lastUpdated);
        const ageMs = now.getTime() - createdAt.getTime();

        if (ageMs < thirtyMinutesMs) {
          // Created within 30 minutes - poll for propagation
          logger.info(
            lang.__('APIGW_DNS_RECORD_EXISTS_POLLING', {
              minutes: String(Math.floor(ageMs / 60000)),
            }),
          );
          await pollDnsPropagation(mainDomain, hostRecord, verificationValue, true);
          return state;
        } else {
          // Created more than 30 minutes ago - just check once
          logger.info(
            lang.__('APIGW_DNS_RECORD_EXISTS_CHECKING', {
              minutes: String(Math.floor(ageMs / 60000)),
            }),
          );
          const propagated = await pollDnsPropagation(
            mainDomain,
            hostRecord,
            verificationValue,
            false,
          );
          if (propagated) {
            logger.info(lang.__('APIGW_DNS_RECORD_ACTIVE'));
          } else {
            logger.warn(lang.__('APIGW_DNS_RECORD_MAY_NOT_PROPAGATED'));
          }
          return state;
        }
      }

      // Check if record already exists in DNS (but not tracked in state)
      const existingRecords = await dnsOps.describeDomainRecords(mainDomain, hostRecord);
      const recordExists = existingRecords.some(
        (record) =>
          record.rr === hostRecord && record.type === 'CNAME' && record.value === verificationValue,
      );

      if (!recordExists) {
        // Add the verification record
        const recordId = await dnsOps.addDomainRecord({
          domainName: mainDomain,
          rr: hostRecord,
          type: 'CNAME',
          value: verificationValue,
          ttl: 600,
        });

        logger.info(
          lang.__('APIGW_DNS_RECORD_ADDED', {
            record: verificationHost,
            type: 'CNAME',
            value: verificationValue,
          }),
        );

        // Track DNS record in state
        const dnsResourceState: ResourceState = {
          mode: 'managed',
          region,
          definition: {
            domainName,
            mainDomain,
            verificationHost,
            verificationValue,
            verificationToken,
            groupSubdomain,
          },
          instances: [
            {
              sid: buildSid('aliyun', 'alidns', _context.stage, recordId),
              id: recordId,
              type: 'CNAME',
              status: 'PENDING',
            },
          ],
          lastUpdated: now.toISOString(),
        };
        state = setResource(state, dnsResourceId, dnsResourceState);
      } else {
        logger.info(lang.__('APIGW_DNS_RECORD_ALREADY_EXISTS', { domain: domainName }));

        // Track existing record in state
        const dnsResourceState: ResourceState = {
          mode: 'managed',
          region,
          definition: {
            domainName,
            mainDomain,
            verificationHost,
            verificationValue,
            verificationToken,
            groupSubdomain,
          },
          instances: [
            {
              sid: buildSid('aliyun', 'alidns', _context.stage, 'existing'),
              id: 'existing',
              type: 'CNAME',
              status: 'EXISTING',
            },
          ],
          lastUpdated: now.toISOString(),
        };
        state = setResource(state, dnsResourceId, dnsResourceState);
      }

      // Poll for DNS propagation
      await pollDnsPropagation(mainDomain, hostRecord, verificationValue, true);

      return state;
    } catch (error) {
      logger.error(
        lang.__('APIGW_DNS_VERIFICATION_FAILED', { domain: domainName, error: String(error) }),
      );
      throw error;
    }
  };

  const addTxtVerificationRecord = async (
    groupId: string,
    domainName: string,
    groupSubdomain: string,
    region: string,
    state: StateFile,
    eventLogicalId: string,
  ): Promise<StateFile> => {
    const mainDomain = extractMainDomain(domainName);
    const txtRecord = buildTxtVerificationRecord(groupId, domainName, groupSubdomain, mainDomain);
    const txtResourceId = `${eventLogicalId}.dns_txt_verification`;

    logger.info(lang.__('APIGW_TXT_ADDING_RECORD', { rr: txtRecord.rr, value: txtRecord.value }));

    try {
      const existingRecords = await dnsOps.describeDomainRecords(mainDomain, txtRecord.rr);
      const existingRecord = existingRecords.find(
        (record) =>
          record.rr === txtRecord.rr && record.type === 'TXT' && record.value === txtRecord.value,
      );

      const now = new Date();

      if (existingRecord) {
        logger.info(lang.__('APIGW_TXT_RECORD_ALREADY_EXISTS', { rr: txtRecord.rr }));

        // Track existing record in state so it can be cleaned up on destroy
        const dnsResourceState: ResourceState = {
          mode: 'managed',
          region,
          definition: {
            domainName,
            mainDomain,
            rr: txtRecord.rr,
            value: txtRecord.value,
            type: 'TXT',
            groupId,
            groupSubdomain,
          },
          instances: [
            {
              sid: buildSid('aliyun', 'alidns', _context.stage, 'existing'),
              id: 'existing',
              type: 'TXT',
              status: 'EXISTING',
            },
          ],
          lastUpdated: now.toISOString(),
        };
        state = setResource(state, txtResourceId, dnsResourceState);

        return state;
      }

      const recordId = await dnsOps.addDomainRecord({
        domainName: mainDomain,
        rr: txtRecord.rr,
        type: 'TXT',
        value: txtRecord.value,
        ttl: 600,
      });

      logger.info(
        lang.__('APIGW_DNS_RECORD_ADDED', {
          record: txtRecord.rr,
          type: 'TXT',
          value: txtRecord.value,
        }),
      );

      // Track DNS record in state
      const dnsResourceState: ResourceState = {
        mode: 'managed',
        region,
        definition: {
          domainName,
          mainDomain,
          rr: txtRecord.rr,
          value: txtRecord.value,
          type: 'TXT',
          groupId,
          groupSubdomain,
        },
        instances: [
          {
            sid: buildSid('aliyun', 'alidns', _context.stage, recordId),
            id: recordId,
            type: 'TXT',
            status: 'CREATED',
          },
        ],
        lastUpdated: now.toISOString(),
      };
      state = setResource(state, txtResourceId, dnsResourceState);

      return state;
    } catch (error) {
      logger.error(lang.__('APIGW_TXT_ADD_FAILED', { error: String(error) }));
      throw error;
    }
  };

  const logVerificationInstructions = (
    domainName: string,
    groupId: string,
    groupSubdomain: string,
  ): void => {
    const mainDomain = extractMainDomain(domainName);
    const txtRecord = buildTxtVerificationRecord(groupId, domainName, groupSubdomain, mainDomain);
    const separator = '='.repeat(80);
    logger.error(
      `\n${separator}\n${lang.__('APIGW_VERIFICATION_HEADER')}\n${separator}\n${lang.__('APIGW_VERIFICATION_DOMAIN', { domain: domainName })}\n\n${lang.__('APIGW_VERIFICATION_INSTRUCTIONS')}\n\n${lang.__('APIGW_VERIFICATION_OPTION1')}\n${lang.__('APIGW_VERIFICATION_RECORD_NAME', { name: domainName })}\n${lang.__('APIGW_VERIFICATION_RECORD_TYPE', { type: 'CNAME' })}\n${lang.__('APIGW_VERIFICATION_RECORD_VALUE', { value: groupSubdomain })}\n\n${lang.__('APIGW_VERIFICATION_OPTION2')}\n${lang.__('APIGW_VERIFICATION_RECORD_NAME', { name: txtRecord.rr })}\n${lang.__('APIGW_VERIFICATION_RECORD_TYPE', { type: 'TXT' })}\n${lang.__('APIGW_VERIFICATION_RECORD_VALUE', { value: txtRecord.value })}`,
    );
    logger.error(
      `\n${separator}\n${lang.__('APIGW_VERIFICATION_NEXT_STEPS')}\n${lang.__('APIGW_VERIFICATION_STEP1')}\n${lang.__('APIGW_VERIFICATION_STEP2')}\n${separator}\n`,
    );
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
     * Per Aliyun docs: CNAME must exist BEFORE calling SetDomain.
     * On SingleDomainOwnershipCheckFail, falls back to TXT verification with retry.
     */
    bindCustomDomain: async (
      config: ApigwCustomDomainConfig,
      state: StateFile,
      eventLogicalId: string,
    ): Promise<StateFile> => {
      logger.info(lang.__('APIGW_BINDING_DOMAIN', { domain: config.domainName }));

      const groupInfo = await apigwClient.describeApiGroup(
        new cloudapi.DescribeApiGroupRequest({ groupId: config.groupId }),
      );
      const region = groupInfo.body?.regionId || _context.region;
      const groupSubdomain = groupInfo.body?.subDomain;
      const groupId = groupInfo.body?.groupId || config.groupId;

      if (!groupSubdomain) {
        throw new Error(
          `API group ${config.groupId} has no subDomain — cannot configure domain binding`,
        );
      }

      logger.info(lang.__('APIGW_ENSURING_CNAME', { domain: config.domainName }));
      state = await addDomainVerificationRecord(
        config.domainName,
        groupId,
        groupSubdomain,
        region,
        state,
        eventLogicalId,
      );

      await pollPublicDnsResolution(config.domainName);

      const setDomainRequest = new cloudapi.SetDomainRequest({
        groupId: config.groupId,
        domainName: config.domainName,
        bindStageName: config.bindStageName || 'RELEASE',
        customDomainType: config.customDomainType,
        isHttpRedirectToHttps: config.isHttpRedirectToHttps,
      });

      const setCertificate = async (): Promise<void> => {
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
      };

      try {
        await apigwClient.setDomain(setDomainRequest);
        await setCertificate();
        logger.info(lang.__('APIGW_DOMAIN_BOUND_SUCCESS', { domain: config.domainName }));
        return state;
      } catch (error: unknown) {
        const err = error as { code?: string; message?: string };

        // Handle network timeout errors with retry
        if (isNetworkTimeoutError(error)) {
          for (let attempt = 1; attempt <= APIGW_DOMAIN_BIND_MAX_RETRIES; attempt++) {
            logger.warn(
              lang.__('APIGW_DOMAIN_BIND_TIMEOUT_RETRY', {
                attempt: String(attempt),
                max: String(APIGW_DOMAIN_BIND_MAX_RETRIES),
              }),
            );
            await sleep(APIGW_DOMAIN_BIND_RETRY_DELAY_MS);

            try {
              await apigwClient.setDomain(setDomainRequest);
              await setCertificate();
              logger.info(lang.__('APIGW_DOMAIN_BOUND_SUCCESS', { domain: config.domainName }));
              return state;
            } catch (retryError: unknown) {
              if (isDomainAlreadyBoundError(retryError)) {
                logger.info(
                  lang.__('APIGW_DOMAIN_BIND_ALREADY_BOUND', { domain: config.domainName }),
                );
                await setCertificate();
                return state;
              }

              if (!isNetworkTimeoutError(retryError)) {
                throw retryError;
              }

              if (attempt === APIGW_DOMAIN_BIND_MAX_RETRIES) {
                logger.error(
                  lang.__('APIGW_DOMAIN_BIND_TIMEOUT_ALL_FAILED', {
                    max: String(APIGW_DOMAIN_BIND_MAX_RETRIES),
                    error: String(retryError),
                  }),
                );
                throw retryError;
              }

              logger.warn(
                lang.__('APIGW_DOMAIN_BIND_TIMEOUT_RETRY_FAILED', {
                  attempt: String(attempt),
                  error: String(retryError),
                }),
              );
            }
          }

          // All timeout retries exhausted (or MAX_RETRIES is 0) — re-throw the original error
          throw error;
        }

        if (err.code !== 'SingleDomainOwnershipCheckFail' && !err.message?.includes('ownership')) {
          throw error;
        }

        logger.warn(lang.__('APIGW_DOMAIN_OWNERSHIP_FAILED', { domain: config.domainName }));
        logger.info(lang.__('APIGW_TXT_FALLBACK', { domain: config.domainName }));

        try {
          state = await addTxtVerificationRecord(
            groupId,
            config.domainName,
            groupSubdomain,
            region,
            state,
            eventLogicalId,
          );
        } catch (txtError) {
          logger.error(lang.__('APIGW_TXT_ADD_FAILED', { error: String(txtError) }));
          logVerificationInstructions(config.domainName, groupId, groupSubdomain);
          throw error;
        }

        for (let attempt = 1; attempt <= APIGW_DOMAIN_BIND_MAX_RETRIES; attempt++) {
          logger.info(
            lang.__('APIGW_DOMAIN_BIND_RETRY', {
              attempt: String(attempt),
              max: String(APIGW_DOMAIN_BIND_MAX_RETRIES),
            }),
          );

          await sleep(APIGW_DOMAIN_BIND_RETRY_DELAY_MS);

          try {
            await apigwClient.setDomain(setDomainRequest);
            await setCertificate();
            logger.info(
              lang.__('APIGW_DOMAIN_BOUND_AFTER_VERIFICATION', { domain: config.domainName }),
            );
            return state;
          } catch (retryError: unknown) {
            const retryErr = retryError as { code?: string };
            if (
              retryErr.code !== 'SingleDomainOwnershipCheckFail' &&
              attempt === APIGW_DOMAIN_BIND_MAX_RETRIES
            ) {
              throw retryError;
            }
            logger.warn(
              lang.__('APIGW_DOMAIN_BIND_RETRY_FAILED', {
                attempt: String(attempt),
                error: String(retryError),
              }),
            );
          }
        }

        logVerificationInstructions(config.domainName, groupId, groupSubdomain);
        throw error;
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
