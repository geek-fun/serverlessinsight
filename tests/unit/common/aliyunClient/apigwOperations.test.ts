import {
  createApigwOperations,
  isNetworkTimeoutError,
  isDomainAlreadyBoundError,
  isApigwNotFoundError,
  type ApigwApiConfig,
} from '../../../../src/common/aliyunClient/apigwOperations';
import type { Context, StateFile } from '../../../../src/types';
import type CloudApiClient from '@alicloud/cloudapi20160714';
import type DnsClient from '@alicloud/alidns20150109';

const mockCreateApiGroup = jest.fn();
const mockDescribeApiGroup = jest.fn();
const mockDescribeApiGroups = jest.fn();
const mockModifyApiGroup = jest.fn();
const mockDeleteApiGroup = jest.fn();
const mockCreateApi = jest.fn();
const mockDescribeApi = jest.fn();
const mockModifyApi = jest.fn();
const mockDeleteApi = jest.fn();
const mockDeployApi = jest.fn();
const mockAbolishApi = jest.fn();
const mockSetDomain = jest.fn();
const mockSetDomainCertificate = jest.fn();
const mockDeleteDomain = jest.fn();
const mockListTagResources = jest.fn();

const mockApigwClient = {
  createApiGroup: mockCreateApiGroup,
  describeApiGroup: mockDescribeApiGroup,
  describeApiGroups: mockDescribeApiGroups,
  modifyApiGroup: mockModifyApiGroup,
  deleteApiGroup: mockDeleteApiGroup,
  createApi: mockCreateApi,
  describeApi: mockDescribeApi,
  modifyApi: mockModifyApi,
  deleteApi: mockDeleteApi,
  deployApi: mockDeployApi,
  abolishApi: mockAbolishApi,
  setDomain: mockSetDomain,
  setDomainCertificate: mockSetDomainCertificate,
  deleteDomain: mockDeleteDomain,
  listTagResources: mockListTagResources,
} as unknown as CloudApiClient;

const mockAddDomainRecord = jest.fn();
const mockDescribeDomainRecords = jest.fn();
const mockDeleteDomainRecord = jest.fn();

const mockDnsClient = {
  addDomainRecord: mockAddDomainRecord,
  describeDomainRecords: mockDescribeDomainRecords,
  deleteDomainRecord: mockDeleteDomainRecord,
} as unknown as DnsClient;

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getResource: jest.fn(),
  setResource: jest.fn((_state, _id, resource) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resources: { ...((_state as any).resources ?? {}), [_id]: resource },
  })),
  removeResource: jest.fn(),
}));

jest.mock('../../../../src/common/sidUtils', () => ({
  buildSid: jest.fn((_provider, _service, _stage, id) => `sid-${id}`),
}));

jest.mock('../../../../src/common/aliyunClient/dnsOperations', () => ({
  createDnsOperations: jest.fn(() => ({
    describeDomainRecords: mockDescribeDomainRecords,
    addDomainRecord: mockAddDomainRecord,
    deleteDomainRecord: mockDeleteDomainRecord,
  })),
}));

jest.mock('../../../../src/common/retryUtils', () => ({
  sleep: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('node:dns', () => ({
  promises: {
    resolveCname: jest.fn(),
  },
}));

describe('isNetworkTimeoutError', () => {
  it('should return true for RequestTimeoutError by name', () => {
    const error = { name: 'RequestTimeoutError' };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for ConnectTimeout by name', () => {
    const error = { name: 'ConnectTimeout' };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for RequestTimeoutError by code', () => {
    const error = { code: 'RequestTimeoutError' };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for ConnectTimeout by code', () => {
    const error = { code: 'ConnectTimeout' };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for error message containing ConnectTimeout', () => {
    const error = {
      message: 'ConnectTimeout: Connect HTTPS://apigateway.aliyuncs.com failed',
    };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return true for error message containing RequestTimeoutError', () => {
    const error = {
      message: 'RequestTimeoutError: Request timed out after 30000ms',
    };
    expect(isNetworkTimeoutError(error)).toBe(true);
  });

  it('should return false for non-timeout errors', () => {
    const error = { code: 'SingleDomainOwnershipCheckFail' };
    expect(isNetworkTimeoutError(error)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isNetworkTimeoutError(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isNetworkTimeoutError(undefined)).toBe(false);
  });

  it('should return false for non-object values', () => {
    expect(isNetworkTimeoutError('timeout error')).toBe(false);
    expect(isNetworkTimeoutError(123)).toBe(false);
  });

  it('should return false for generic errors', () => {
    const error = new Error('Some other error');
    expect(isNetworkTimeoutError(error)).toBe(false);
  });
});

describe('isDomainAlreadyBoundError', () => {
  it('should return true for DomainAlreadyBind error code', () => {
    expect(isDomainAlreadyBoundError({ code: 'DomainAlreadyBind' })).toBe(true);
  });

  it('should return true for RepeatedCommit error code', () => {
    expect(isDomainAlreadyBoundError({ code: 'RepeatedCommit' })).toBe(true);
  });

  it('should return true for message containing bindingExists', () => {
    expect(isDomainAlreadyBoundError({ message: 'The domain bindingExists already' })).toBe(true);
  });

  it('should return true for message containing domain bindedbyother (case insensitive)', () => {
    expect(isDomainAlreadyBoundError({ message: 'Domain BindedByOther group' })).toBe(true);
  });

  it('should return false for timeout errors', () => {
    expect(isDomainAlreadyBoundError({ code: 'RequestTimeoutError' })).toBe(false);
  });

  it('should return false for ownership check errors', () => {
    expect(isDomainAlreadyBoundError({ code: 'SingleDomainOwnershipCheckFail' })).toBe(false);
  });

  it('should return false for null/undefined', () => {
    expect(isDomainAlreadyBoundError(null)).toBe(false);
    expect(isDomainAlreadyBoundError(undefined)).toBe(false);
  });

  it('should return false for non-object values', () => {
    expect(isDomainAlreadyBoundError('DomainAlreadyBind')).toBe(false);
    expect(isDomainAlreadyBoundError(42)).toBe(false);
  });

  it('should return false for generic errors', () => {
    expect(isDomainAlreadyBoundError(new Error('Some other error'))).toBe(false);
  });
});

describe('isApigwNotFoundError', () => {
  it('should return true for NotFoundApi code', () => {
    expect(isApigwNotFoundError({ code: 'NotFoundApi' })).toBe(true);
  });

  it('should return true for NotFoundApiGroup code', () => {
    expect(isApigwNotFoundError({ code: 'NotFoundApiGroup' })).toBe(true);
  });

  it('should return true for NotFoundDeployment code', () => {
    expect(isApigwNotFoundError({ code: 'NotFoundDeployment' })).toBe(true);
  });

  it('should return true for InvalidGroupId.NotFound code', () => {
    expect(isApigwNotFoundError({ code: 'InvalidGroupId.NotFound' })).toBe(true);
  });

  it('should return true for InvalidApiId.NotFound code', () => {
    expect(isApigwNotFoundError({ code: 'InvalidApiId.NotFound' })).toBe(true);
  });

  it('should return true for bare NotFound code', () => {
    expect(isApigwNotFoundError({ code: 'NotFound' })).toBe(true);
  });

  it('should return true for message containing NotFound', () => {
    expect(isApigwNotFoundError({ message: 'The specified Api is NotFound' })).toBe(true);
  });

  it('should return false for real errors', () => {
    expect(isApigwNotFoundError({ code: 'Forbidden', message: 'Access denied' })).toBe(false);
    expect(isApigwNotFoundError({ code: 'Throttling', message: 'Rate limit exceeded' })).toBe(
      false,
    );
  });

  it('should return false for null/undefined/non-objects', () => {
    expect(isApigwNotFoundError(null)).toBe(false);
    expect(isApigwNotFoundError(undefined)).toBe(false);
    expect(isApigwNotFoundError('NotFound')).toBe(false);
    expect(isApigwNotFoundError(42)).toBe(false);
  });

  it('should return false for generic Error objects', () => {
    expect(isApigwNotFoundError(new Error('some other error'))).toBe(false);
  });
});

const mockContext = {
  app: 'test-app',
  stage: 'dev',
  region: 'cn-hangzhou',
} as unknown as Context;

describe('apigwOperations', () => {
  let operations: ReturnType<typeof createApigwOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    operations = createApigwOperations(mockApigwClient, mockDnsClient, mockContext);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('createApiGroup', () => {
    it('should create API group successfully', async () => {
      mockCreateApiGroup.mockResolvedValue({
        body: {
          groupId: 'group-123',
        },
      });

      const result = await operations.createApiGroup({
        groupName: 'my-api-group',
        description: 'Test API Group',
      });

      expect(result).toBe('group-123');
      expect(mockCreateApiGroup).toHaveBeenCalled();
    });

    it('should throw error when groupId is missing', async () => {
      mockCreateApiGroup.mockResolvedValue({
        body: {},
      });

      await expect(
        operations.createApiGroup({
          groupName: 'my-api-group',
        }),
      ).rejects.toThrow('Failed to create API Gateway group');
    });

    it('should create API group with all options', async () => {
      mockCreateApiGroup.mockResolvedValue({
        body: {
          groupId: 'group-123',
        },
      });

      await operations.createApiGroup({
        groupName: 'my-api-group',
        description: 'Test group',
        basePath: '/api/v1',
        instanceId: 'instance-123',
        tags: [
          { key: 'env', value: 'production' },
          { key: 'team', value: 'api' },
        ],
      });

      expect(mockCreateApiGroup).toHaveBeenCalled();
    });
  });

  describe('getApiGroup', () => {
    it('should get API group by ID', async () => {
      mockDescribeApiGroup.mockResolvedValue({
        body: {
          groupId: 'group-123',
          groupName: 'my-group',
          description: 'Test group',
          subDomain: 'mygroup.apigateway.cn-hangzhou.aliyuncs.com',
        },
      });

      const result = await operations.getApiGroup('group-123');

      expect(result).toBeDefined();
      expect(result?.groupId).toBe('group-123');
      expect(result?.subDomain).toBe('mygroup.apigateway.cn-hangzhou.aliyuncs.com');
    });

    it('should return null when group not found', async () => {
      mockDescribeApiGroup.mockRejectedValue({
        code: 'NotFoundApiGroup',
      });

      const result = await operations.getApiGroup('nonexistent');

      expect(result).toBeNull();
    });

    it('should return null for InvalidGroupId.NotFound error', async () => {
      mockDescribeApiGroup.mockRejectedValue({
        code: 'InvalidGroupId.NotFound',
      });

      const result = await operations.getApiGroup('invalid-id');

      expect(result).toBeNull();
    });

    it('should throw other errors', async () => {
      mockDescribeApiGroup.mockRejectedValue(new Error('Permission denied'));

      await expect(operations.getApiGroup('group-123')).rejects.toThrow('Permission denied');
    });
  });

  describe('findApiGroupByName', () => {
    it('should find API group by name', async () => {
      mockDescribeApiGroups.mockResolvedValue({
        body: {
          apiGroupAttributes: {
            apiGroupAttribute: [
              {
                groupId: 'group-123',
                groupName: 'my-group',
                subDomain: 'mygroup.apigateway.cn-hangzhou.aliyuncs.com',
              },
            ],
          },
        },
      });

      const result = await operations.findApiGroupByName('my-group');

      expect(result).toBeDefined();
      expect(result?.groupId).toBe('group-123');
    });

    it('should return null when group not found', async () => {
      mockDescribeApiGroups.mockResolvedValue({
        body: {
          apiGroupAttributes: {
            apiGroupAttribute: [],
          },
        },
      });

      const result = await operations.findApiGroupByName('nonexistent');

      expect(result).toBeNull();
    });

    it('should return null when response is empty', async () => {
      mockDescribeApiGroups.mockResolvedValue({
        body: {},
      });

      const result = await operations.findApiGroupByName('any-group');

      expect(result).toBeNull();
    });
  });

  describe('updateApiGroup', () => {
    it('should update API group', async () => {
      mockModifyApiGroup.mockResolvedValue({});

      await operations.updateApiGroup('group-123', {
        groupName: 'updated-group',
        description: 'Updated description',
      });

      expect(mockModifyApiGroup).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe('deleteApiGroup', () => {
    it('should delete API group', async () => {
      mockDeleteApiGroup.mockResolvedValue({});

      await operations.deleteApiGroup('group-123');

      expect(mockDeleteApiGroup).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe('createApi', () => {
    it('should create API successfully', async () => {
      mockCreateApi.mockResolvedValue({
        body: {
          apiId: 'api-123',
        },
      });

      const config: ApigwApiConfig = {
        groupId: 'group-123',
        apiName: 'test-api',
        visibility: 'PUBLIC',
        authType: 'ANONYMOUS',
        requestConfig: {
          requestProtocol: 'HTTP',
          requestHttpMethod: 'GET',
          requestPath: '/test',
          requestMode: 'MAPPING',
        },
        serviceConfig: {
          serviceProtocol: 'MOCK',
          mockResult: '{"status": "ok"}',
        },
      };

      const result = await operations.createApi(config);

      expect(result).toBe('api-123');
      expect(mockCreateApi).toHaveBeenCalled();
    });

    it('should throw error when apiId is missing', async () => {
      mockCreateApi.mockResolvedValue({
        body: {},
      });

      await expect(
        operations.createApi({
          groupId: 'group-123',
          apiName: 'test-api',
          visibility: 'PUBLIC',
          authType: 'ANONYMOUS',
          requestConfig: {
            requestProtocol: 'HTTP',
            requestHttpMethod: 'GET',
            requestPath: '/test',
            requestMode: 'MAPPING',
          },
          serviceConfig: {
            serviceProtocol: 'MOCK',
          },
        }),
      ).rejects.toThrow('Failed to create API');
    });
  });

  describe('getApi', () => {
    it('should get API by ID', async () => {
      mockDescribeApi.mockResolvedValue({
        body: {
          apiId: 'api-123',
          apiName: 'test-api',
          groupId: 'group-123',
          visibility: 'PUBLIC',
          authType: 'ANONYMOUS',
        },
      });

      const result = await operations.getApi('group-123', 'api-123');

      expect(result).toBeDefined();
      expect(result?.apiId).toBe('api-123');
    });

    it('should return null when API not found', async () => {
      mockDescribeApi.mockRejectedValue({
        code: 'NotFoundApi',
      });

      const result = await operations.getApi('group-123', 'nonexistent');

      expect(result).toBeNull();
    });

    it('should return null for InvalidApiId.NotFound error', async () => {
      mockDescribeApi.mockRejectedValue({
        code: 'InvalidApiId.NotFound',
      });

      const result = await operations.getApi('group-123', 'invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('updateApi', () => {
    it('should update API', async () => {
      mockModifyApi.mockResolvedValue({});

      await operations.updateApi('api-123', {
        groupId: 'group-123',
        apiName: 'updated-api',
        visibility: 'PUBLIC',
        authType: 'ANONYMOUS',
        requestConfig: {
          requestProtocol: 'HTTP',
          requestHttpMethod: 'GET',
          requestPath: '/updated',
          requestMode: 'MAPPING',
        },
        serviceConfig: {
          serviceProtocol: 'MOCK',
        },
      });

      expect(mockModifyApi).toHaveBeenCalled();
    });
  });

  describe('deleteApi', () => {
    it('should delete API', async () => {
      mockDeleteApi.mockResolvedValue({});

      await operations.deleteApi('group-123', 'api-123');

      expect(mockDeleteApi).toHaveBeenCalled();
    });
  });

  describe('deployApi', () => {
    it('should deploy API to stage', async () => {
      mockDeployApi.mockResolvedValue({});

      await operations.deployApi({
        groupId: 'group-123',
        apiId: 'api-123',
        stageName: 'RELEASE',
      });

      expect(mockDeployApi).toHaveBeenCalled();
    });
  });

  describe('abolishApi', () => {
    it('should abolish API from stage', async () => {
      mockAbolishApi.mockResolvedValue({});

      await operations.abolishApi('group-123', 'api-123', 'RELEASE');

      expect(mockAbolishApi).toHaveBeenCalled();
    });
  });

  describe('bindCustomDomain', () => {
    it('should bind custom domain successfully', async () => {
      mockDescribeApiGroup.mockResolvedValue({
        body: {
          groupId: 'group-123',
          subDomain: 'mygroup.apigateway.cn-hangzhou.aliyuncs.com',
          regionId: 'cn-hangzhou',
        },
      });

      mockDescribeDomainRecords.mockResolvedValue([]);
      mockAddDomainRecord.mockResolvedValue('record-123');
      mockSetDomain.mockResolvedValue({});

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockResolvedValue(['mygroup.apigateway.cn-hangzhou.aliyuncs.com']);

      const state: StateFile = {
        version: '0.0.1',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {},
        resources: {},
      };

      const result = await operations.bindCustomDomain(
        {
          groupId: 'group-123',
          domainName: 'api.example.com',
          bindStageName: 'RELEASE',
        },
        state,
        'my-api',
      );

      expect(result).toBeDefined();
      expect(mockSetDomain).toHaveBeenCalled();
    });

    it('should throw error when group has no subdomain', async () => {
      mockDescribeApiGroup.mockResolvedValue({
        body: {
          groupId: 'group-123',
          subDomain: undefined,
        },
      });

      const state: StateFile = {
        version: '0.0.1',
        provider: 'aliyun',
        app: 'test-app',
        service: 'test-service',
        stages: {},
        resources: {},
      };

      await expect(
        operations.bindCustomDomain(
          {
            groupId: 'group-123',
            domainName: 'api.example.com',
          },
          state,
          'my-api',
        ),
      ).rejects.toThrow();
    });
  });

  describe('findApiGroupByName', () => {
    it('should return null when results exist but no exact name match', async () => {
      mockDescribeApiGroups.mockResolvedValue({
        body: {
          apiGroupAttributes: {
            apiGroupAttribute: [
              { groupId: 'group-999', groupName: 'similar-group', subDomain: 'sub.example.com' },
            ],
          },
        },
      });

      const result = await operations.findApiGroupByName('my-exact-group');

      expect(result).toBeNull();
    });
  });

  describe('getApiGroup', () => {
    it('should return null when response body is empty', async () => {
      mockDescribeApiGroup.mockResolvedValue({ body: null });

      const result = await operations.getApiGroup('group-123');

      expect(result).toBeNull();
    });

    it('should retain the full DescribeApiGroup detail set (max-detail state)', async () => {
      mockDescribeApiGroup.mockResolvedValue({
        body: {
          groupId: 'group-999',
          groupName: 'max-detail-group',
          description: 'max detail',
          basePath: '/v1',
          subDomain: 'group-999-cn-hangzhou.alicloudapi.com',
          instanceId: 'apigateway-cn-v6419k43xxxxx',
          instanceType: 'VPC_SHARED',
          regionId: 'cn-hangzhou',
          status: 'NORMAL',
          createdTime: '2025-01-01T00:00:00Z',
          modifiedTime: '2025-01-02T00:00:00Z',
          billingStatus: 'NORMAL',
          illegalStatus: 'NORMAL',
          trafficLimit: 500,
          customDomains: {
            domainItem: [
              {
                domainName: 'api.example.com',
                bindStageName: 'RELEASE',
                certificateId: 'cert-1',
                certificateName: 'api-cert',
                certificateValidEnd: 1773646400,
                certificateValidStart: 1742110400,
                customDomainType: 'INTERNET',
                domainBindingStatus: 'BOUND',
                domainCNAMEStatus: 'RESOLVED',
                domainLegalStatus: 'NORMAL',
                isHttpRedirectToHttps: true,
                sslVerifyDepth: 3,
                wildcardDomainPatterns: 'api.example.com',
              },
            ],
          },
          stageItems: {
            stageInfo: [{ description: 'prod', stageId: 'stage-1', stageName: 'RELEASE' }],
          },
          defaultDomain: 'mkt.api.gaore.com',
          vpcDomain: 'e4****-vpc.alicloudapi.com',
          vpcSlbIntranetDomain:
            '257e9d450e924d00b976b0ecfb7184c2-cn-beijing-intranet.alicloudapi.com',
          httpsPolicy: 'HTTPS2_TLS1_0',
          ipv6Status: 'UNBIND',
          migrationStatus: 'Success',
          migrationError: '',
          passthroughHeaders: 'eagleeye-rpcid',
          userLogConfig: '{"requestBody":true}',
          customTraceConfig: '{"parameterName":"traceId"}',
          customerConfigs: 'removeResponseServerHeader',
          customAppCodeConfig: '{"location":"HEADER"}',
          dedicatedInstanceType: 'normal',
          disableInnerDomain: false,
          cloudMarketCommodity: false,
          cmsMonitorGroup: '217008423',
          compatibleFlags: 'depart:dep1',
        },
      });
      mockListTagResources.mockResolvedValue({
        body: {
          tagResources: {
            tagResource: [
              {
                resourceId: 'group-999',
                resourceType: 'apiGroup',
                tagKey: 'si-owned-by',
                tagValue: 'test-app-test-service:events.my_api',
              },
            ],
          },
        },
      });

      const result = await operations.getApiGroup('group-999');

      expect(result).toEqual(
        expect.objectContaining({
          customDomains: [
            {
              domainName: 'api.example.com',
              bindStageName: 'RELEASE',
              certificateId: 'cert-1',
              certificateName: 'api-cert',
              certificateValidEnd: 1773646400,
              certificateValidStart: 1742110400,
              customDomainType: 'INTERNET',
              domainBindingStatus: 'BOUND',
              domainCNAMEStatus: 'RESOLVED',
              domainLegalStatus: 'NORMAL',
              isHttpRedirectToHttps: true,
              sslVerifyDepth: 3,
              wildcardDomainPatterns: 'api.example.com',
            },
          ],
          stageItems: [{ description: 'prod', stageId: 'stage-1', stageName: 'RELEASE' }],
          defaultDomain: 'mkt.api.gaore.com',
          vpcDomain: 'e4****-vpc.alicloudapi.com',
          vpcSlbIntranetDomain:
            '257e9d450e924d00b976b0ecfb7184c2-cn-beijing-intranet.alicloudapi.com',
          httpsPolicy: 'HTTPS2_TLS1_0',
          ipv6Status: 'UNBIND',
          migrationStatus: 'Success',
          passthroughHeaders: 'eagleeye-rpcid',
          userLogConfig: '{"requestBody":true}',
          customTraceConfig: '{"parameterName":"traceId"}',
          customerConfigs: 'removeResponseServerHeader',
          customAppCodeConfig: '{"location":"HEADER"}',
          dedicatedInstanceType: 'normal',
          disableInnerDomain: false,
          cloudMarketCommodity: false,
          cmsMonitorGroup: '217008423',
          compatibleFlags: 'depart:dep1',
          tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.my_api' }],
        }),
      );
    });
  });

  describe('getApi - additional branches', () => {
    it('should return api with requestConfig and serviceConfig', async () => {
      mockDescribeApi.mockResolvedValue({
        body: {
          apiId: 'api-123',
          apiName: 'test-api',
          groupId: 'group-123',
          requestConfig: {
            requestProtocol: 'HTTP',
            requestHttpMethod: 'GET',
            requestPath: '/test',
            requestMode: 'MAPPING',
            bodyFormat: 'STREAM',
          },
          serviceConfig: {
            serviceProtocol: 'FunctionCompute',
            serviceTimeout: 10000,
            functionComputeConfig: {
              fcRegionId: 'cn-hangzhou',
              functionName: 'test-fn',
              roleArn: 'acs:ram::123:role/fc-role',
              fcVersion: '3.0',
              method: 'GET',
            },
            mockResult: undefined,
          },
          deployedInfos: {
            deployedInfo: [
              { stageName: 'RELEASE', deployedStatus: 'DEPLOYED', effectiveVersion: '1' },
            ],
          },
        },
      });

      const result = await operations.getApi('group-123', 'api-123');

      expect(result?.requestConfig).toEqual({
        requestProtocol: 'HTTP',
        requestHttpMethod: 'GET',
        requestPath: '/test',
        requestMode: 'MAPPING',
        bodyFormat: 'STREAM',
      });
      expect(result?.serviceConfig?.functionComputeConfig).toEqual({
        fcRegionId: 'cn-hangzhou',
        functionName: 'test-fn',
        roleArn: 'acs:ram::123:role/fc-role',
        fcVersion: '3.0',
        method: 'GET',
      });
      expect(result?.deployedInfos).toHaveLength(1);
    });

    it('should return api with serviceConfig but without functionComputeConfig', async () => {
      mockDescribeApi.mockResolvedValue({
        body: {
          apiId: 'api-123',
          serviceConfig: {
            serviceProtocol: 'MOCK',
            mockResult: '{"ok":true}',
          },
        },
      });

      const result = await operations.getApi('group-123', 'api-123');

      expect(result?.serviceConfig?.functionComputeConfig).toBeUndefined();
    });

    it('should return null when body is null', async () => {
      mockDescribeApi.mockResolvedValue({ body: null });

      const result = await operations.getApi('group-123', 'api-123');

      expect(result).toBeNull();
    });

    it('should rethrow non-NotFound errors', async () => {
      mockDescribeApi.mockRejectedValue({ code: 'InternalError', message: 'Server error' });

      await expect(operations.getApi('group-123', 'api-123')).rejects.toEqual({
        code: 'InternalError',
        message: 'Server error',
      });
    });

    it('should retain the full DescribeApi detail set (max-detail state)', async () => {
      mockDescribeApi.mockResolvedValue({
        body: {
          apiId: 'api-999',
          apiName: 'max-detail-api',
          groupId: 'group-999',
          groupName: 'max-detail-group',
          description: 'max detail',
          visibility: 'PRIVATE',
          authType: 'ANONYMOUS',
          regionId: 'cn-hangzhou',
          allowSignatureMethod: 'HmacSHA256',
          appCodeAuthType: 'HEADER',
          backendEnable: true,
          backendConfig: {
            backendId: 'backend-1',
            backendName: 'backend-oss',
            backendType: 'HTTP',
          },
          forceNonceCheck: true,
          disableInternet: false,
          webSocketApiType: 'COMMON',
          failResultSample: '{"code":400}',
          resultSample: '{"code":200}',
          resultType: 'JSON',
          resultBodyModel: '{}',
          requestConfig: {
            requestProtocol: 'HTTP,HTTPS',
            requestHttpMethod: 'POST',
            requestPath: '/api/order',
            requestMode: 'MAPPING',
            bodyFormat: 'STREAM',
            bodyModel: 'https://apigateway.aliyun.com/models/m1',
            escapePathParam: true,
            postBodyDescription: 'order body',
          },
          serviceConfig: {
            serviceProtocol: 'FunctionCompute',
            serviceAddress: 'http://api.a.com:8080',
            serviceHttpMethod: 'POST',
            servicePath: '/order',
            serviceTimeout: 10000,
            serviceVpcEnable: 'TRUE',
            aoneAppName: 'ib-blank',
            contentTypeCatagory: 'DEFAULT',
            contentTypeValue: 'application/json',
            mock: 'FALSE',
            mockStatusCode: 200,
            vpcConfig: {
              vpcId: 'vpc-123',
              instanceId: 'i-bp1h497hkijewv2',
              port: 8080,
              name: 'vpc-auth',
              vpcScheme: 'HTTP',
            },
            functionComputeConfig: {
              fcRegionId: 'cn-hangzhou',
              functionName: 'order-fn',
              roleArn: 'acs:ram::123:role/fc-role',
              fcVersion: '3.0',
              method: 'POST',
              contentTypeCatagory: 'DEFAULT',
              contentTypeValue: 'application/json',
              fcBaseUrl: 'https://1227.fc.aliyuncs.com/2016-08-15/proxy/test',
              fcType: 'HttpTrigger',
              onlyBusinessPath: false,
              path: '/proxy',
              qualifier: 'LATEST',
              regionId: 'cn-hangzhou',
              serviceName: 'order-service',
              triggerName: 'http-trigger',
            },
          },
          openIdConnectConfig: {
            idTokenParamName: 'token',
            openIdApiType: 'IDTOKEN',
            publicKey: 'pub-key',
            publicKeyId: 'pub-key-id',
          },
          requestParameters: {
            requestParameter: [
              {
                apiParameterName: 'orderId',
                location: 'QUERY',
                parameterType: 'String',
                required: 'REQUIRED',
                defaultValue: '1',
                docOrder: 1,
              },
            ],
          },
          serviceParameters: {
            serviceParameter: [
              { location: 'QUERY', parameterType: 'String', serviceParameterName: 'orderId' },
            ],
          },
          serviceParametersMap: {
            serviceParameterMap: [
              { requestParameterName: 'orderId', serviceParameterName: 'orderId' },
            ],
          },
          systemParameters: {
            systemParameter: [
              { parameterName: 'CaClientIp', location: 'HEADER', serviceParameterName: 'ip' },
            ],
          },
          customSystemParameters: {
            customSystemParameter: [
              { parameterName: 'x-custom', location: 'HEADER', serviceParameterName: 'custom' },
            ],
          },
          constantParameters: {
            constantParameter: [
              { constantValue: 'fixed', location: 'HEADER', serviceParameterName: 'const' },
            ],
          },
          errorCodeSamples: {
            errorCodeSample: [
              { code: '400', message: 'bad request', description: 'invalid', model: 'Err' },
            ],
          },
          tagList: {
            tag: [{ tagKey: 'env', tagValue: 'prod' }],
          },
          createdTime: '2025-01-01T00:00:00Z',
          modifiedTime: '2025-01-02T00:00:00Z',
          deployedInfos: {
            deployedInfo: [
              { stageName: 'RELEASE', deployedStatus: 'DEPLOYED', effectiveVersion: '2' },
            ],
          },
        },
      });
      mockListTagResources.mockResolvedValue({
        body: {
          tagResources: {
            tagResource: [
              {
                resourceId: 'api-999',
                resourceType: 'api',
                tagKey: 'si-owned-by',
                tagValue: 'test-app-test-service:events.my_api',
              },
            ],
          },
        },
      });

      const result = await operations.getApi('group-999', 'api-999');

      expect(result).toEqual(
        expect.objectContaining({
          regionId: 'cn-hangzhou',
          allowSignatureMethod: 'HmacSHA256',
          appCodeAuthType: 'HEADER',
          backendEnable: true,
          backendConfig: {
            backendId: 'backend-1',
            backendName: 'backend-oss',
            backendType: 'HTTP',
          },
          forceNonceCheck: true,
          disableInternet: false,
          webSocketApiType: 'COMMON',
          failResultSample: '{"code":400}',
          resultSample: '{"code":200}',
          resultBodyModel: '{}',
          requestConfig: {
            requestProtocol: 'HTTP,HTTPS',
            requestHttpMethod: 'POST',
            requestPath: '/api/order',
            requestMode: 'MAPPING',
            bodyFormat: 'STREAM',
            bodyModel: 'https://apigateway.aliyun.com/models/m1',
            escapePathParam: true,
            postBodyDescription: 'order body',
          },
          serviceConfig: {
            serviceProtocol: 'FunctionCompute',
            serviceAddress: 'http://api.a.com:8080',
            serviceHttpMethod: 'POST',
            servicePath: '/order',
            serviceTimeout: 10000,
            serviceVpcEnable: 'TRUE',
            aoneAppName: 'ib-blank',
            contentTypeCatagory: 'DEFAULT',
            contentTypeValue: 'application/json',
            mock: 'FALSE',
            mockStatusCode: 200,
            vpcConfig: {
              vpcId: 'vpc-123',
              instanceId: 'i-bp1h497hkijewv2',
              port: 8080,
              name: 'vpc-auth',
              vpcScheme: 'HTTP',
            },
            functionComputeConfig: {
              fcRegionId: 'cn-hangzhou',
              functionName: 'order-fn',
              roleArn: 'acs:ram::123:role/fc-role',
              fcVersion: '3.0',
              method: 'POST',
              contentTypeCatagory: 'DEFAULT',
              contentTypeValue: 'application/json',
              fcBaseUrl: 'https://1227.fc.aliyuncs.com/2016-08-15/proxy/test',
              fcType: 'HttpTrigger',
              onlyBusinessPath: false,
              path: '/proxy',
              qualifier: 'LATEST',
              regionId: 'cn-hangzhou',
              serviceName: 'order-service',
              triggerName: 'http-trigger',
            },
          },
          openIdConnectConfig: {
            idTokenParamName: 'token',
            openIdApiType: 'IDTOKEN',
            publicKey: 'pub-key',
            publicKeyId: 'pub-key-id',
          },
          requestParameters: [
            {
              apiParameterName: 'orderId',
              location: 'QUERY',
              parameterType: 'String',
              required: 'REQUIRED',
              defaultValue: '1',
              docOrder: 1,
            },
          ],
          serviceParameters: [
            { location: 'QUERY', parameterType: 'String', serviceParameterName: 'orderId' },
          ],
          serviceParametersMap: [
            { requestParameterName: 'orderId', serviceParameterName: 'orderId' },
          ],
          systemParameters: [
            { parameterName: 'CaClientIp', location: 'HEADER', serviceParameterName: 'ip' },
          ],
          customSystemParameters: [
            { parameterName: 'x-custom', location: 'HEADER', serviceParameterName: 'custom' },
          ],
          constantParameters: [
            { constantValue: 'fixed', location: 'HEADER', serviceParameterName: 'const' },
          ],
          errorCodeSamples: [
            { code: '400', message: 'bad request', description: 'invalid', model: 'Err' },
          ],
          deployedInfos: [
            { stageName: 'RELEASE', deployedStatus: 'DEPLOYED', effectiveVersion: '2' },
          ],
          tagList: [{ tagKey: 'env', tagValue: 'prod' }],
        }),
      );
    });
  });

  describe('createApi - additional branches', () => {
    it('should create API with functionComputeConfig', async () => {
      mockCreateApi.mockResolvedValue({ body: { apiId: 'api-456' } });

      const result = await operations.createApi({
        groupId: 'group-123',
        apiName: 'fc-api',
        visibility: 'PUBLIC',
        authType: 'ANONYMOUS',
        requestConfig: {
          requestProtocol: 'HTTP',
          requestHttpMethod: 'POST',
          requestPath: '/fc',
          requestMode: 'PASSTHROUGH',
        },
        serviceConfig: {
          serviceProtocol: 'FunctionCompute',
          functionComputeConfig: {
            fcRegionId: 'cn-hangzhou',
            functionName: 'my-fn',
            roleArn: 'acs:ram::123:role/fc-role',
          },
        },
        tags: [{ key: 'env', value: 'prod' }],
      });

      expect(result).toBe('api-456');
    });

    it('should create API with vpcConfig', async () => {
      mockCreateApi.mockResolvedValue({ body: { apiId: 'api-789' } });

      const result = await operations.createApi({
        groupId: 'group-123',
        apiName: 'vpc-api',
        visibility: 'PRIVATE',
        authType: 'APP',
        requestConfig: {
          requestProtocol: 'HTTP',
          requestHttpMethod: 'GET',
          requestPath: '/vpc',
          requestMode: 'MAPPING',
        },
        serviceConfig: {
          serviceProtocol: 'VPC',
          vpcConfig: { vpcId: 'vpc-123', instanceId: 'i-123', port: 8080 },
        },
      });

      expect(result).toBe('api-789');
    });
  });

  describe('updateApi - additional branches', () => {
    it('should update API with functionComputeConfig', async () => {
      mockModifyApi.mockResolvedValue({});

      await operations.updateApi('api-123', {
        groupId: 'group-123',
        apiName: 'updated-api',
        visibility: 'PUBLIC',
        authType: 'ANONYMOUS',
        requestConfig: {
          requestProtocol: 'HTTP',
          requestHttpMethod: 'GET',
          requestPath: '/updated',
          requestMode: 'MAPPING',
        },
        serviceConfig: {
          serviceProtocol: 'FunctionCompute',
          functionComputeConfig: {
            fcRegionId: 'cn-hangzhou',
            functionName: 'my-fn',
          },
        },
      });

      expect(mockModifyApi).toHaveBeenCalled();
    });
  });

  describe('bindCustomDomain - additional branches', () => {
    const baseState: StateFile = {
      version: '0.0.1',
      provider: 'aliyun',
      app: 'test-app',
      service: 'test-service',
      stages: {},
      resources: {},
    };

    const setupGroupMock = () => {
      mockDescribeApiGroup.mockResolvedValue({
        body: {
          groupId: 'group-123',
          subDomain: 'mygroup.apigateway.cn-hangzhou.aliyuncs.com',
          regionId: 'cn-hangzhou',
        },
      });
    };

    const setupDnsMocks = () => {
      mockDescribeDomainRecords.mockResolvedValue([]);
      mockAddDomainRecord.mockResolvedValue('record-123');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockResolvedValue(['mygroup.apigateway.cn-hangzhou.aliyuncs.com']);
    };

    it('should set certificate when config has certificate details', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain.mockResolvedValue({});
      mockSetDomainCertificate.mockResolvedValue({});

      await operations.bindCustomDomain(
        {
          groupId: 'group-123',
          domainName: 'api.example.com',
          certificateName: 'test-cert',
          certificateBody: '-----BEGIN CERTIFICATE-----',
          certificatePrivateKey: '-----BEGIN RSA PRIVATE KEY-----',
        },
        baseState,
        'my-api',
      );

      expect(mockSetDomainCertificate).toHaveBeenCalled();
    });

    it('should retry on network timeout and succeed', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain
        .mockRejectedValueOnce({ name: 'RequestTimeoutError' })
        .mockResolvedValueOnce({});

      const result = await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(result).toBeDefined();
      expect(mockSetDomain).toHaveBeenCalledTimes(2);
    });

    it('should handle already-bound error during timeout retry', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain
        .mockRejectedValueOnce({ name: 'RequestTimeoutError' })
        .mockRejectedValueOnce({ code: 'DomainAlreadyBind' });

      const result = await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(result).toBeDefined();
    });

    it('should throw non-timeout error during retry', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain
        .mockRejectedValueOnce({ name: 'RequestTimeoutError' })
        .mockRejectedValueOnce({ code: 'Forbidden', message: 'Access denied' });

      await expect(
        operations.bindCustomDomain(
          { groupId: 'group-123', domainName: 'api.example.com' },
          baseState,
          'my-api',
        ),
      ).rejects.toEqual({ code: 'Forbidden', message: 'Access denied' });
    });

    it('should throw after all timeout retries exhausted', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain.mockRejectedValue({ name: 'RequestTimeoutError' });

      await expect(
        operations.bindCustomDomain(
          { groupId: 'group-123', domainName: 'api.example.com' },
          baseState,
          'my-api',
        ),
      ).rejects.toEqual({ name: 'RequestTimeoutError' });
    });

    it('should throw non-ownership non-timeout error directly', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain.mockRejectedValue({ code: 'Throttling', message: 'Rate limit exceeded' });

      await expect(
        operations.bindCustomDomain(
          { groupId: 'group-123', domainName: 'api.example.com' },
          baseState,
          'my-api',
        ),
      ).rejects.toEqual({ code: 'Throttling', message: 'Rate limit exceeded' });
    });

    it('should fall back to TXT verification on ownership check failure and succeed', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain
        .mockRejectedValueOnce({ code: 'SingleDomainOwnershipCheckFail' })
        .mockResolvedValueOnce({});

      const result = await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(result).toBeDefined();
    });

    it('should fall back to TXT on ownership message and succeed', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain
        .mockRejectedValueOnce({ message: 'ownership verification failed' })
        .mockResolvedValueOnce({});

      const result = await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(result).toBeDefined();
    });

    it('should throw after all ownership retries exhausted', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain.mockRejectedValue({ code: 'SingleDomainOwnershipCheckFail' });

      await expect(
        operations.bindCustomDomain(
          { groupId: 'group-123', domainName: 'api.example.com' },
          baseState,
          'my-api',
        ),
      ).rejects.toEqual({ code: 'SingleDomainOwnershipCheckFail' });
    });

    it('should throw original error when TXT record creation fails', async () => {
      setupGroupMock();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockResolvedValue(['mygroup.apigateway.cn-hangzhou.aliyuncs.com']);
      mockDescribeDomainRecords.mockResolvedValue([]);
      mockAddDomainRecord
        .mockResolvedValueOnce('record-123')
        .mockRejectedValueOnce(new Error('DNS service unavailable'));
      const ownershipError = { code: 'SingleDomainOwnershipCheckFail' };
      mockSetDomain.mockRejectedValue(ownershipError);

      await expect(
        operations.bindCustomDomain(
          { groupId: 'group-123', domainName: 'api.example.com' },
          baseState,
          'my-api',
        ),
      ).rejects.toBe(ownershipError);
    });

    it('should throw non-ownership retryError on last attempt', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain
        .mockRejectedValueOnce({ code: 'SingleDomainOwnershipCheckFail' })
        .mockRejectedValueOnce({ code: 'SingleDomainOwnershipCheckFail' })
        .mockRejectedValueOnce({ code: 'SingleDomainOwnershipCheckFail' })
        .mockRejectedValueOnce({ code: 'SingleDomainOwnershipCheckFail' })
        .mockRejectedValueOnce({ code: 'SingleDomainOwnershipCheckFail' })
        .mockRejectedValueOnce({ code: 'InternalError', message: 'Server error' });

      await expect(
        operations.bindCustomDomain(
          { groupId: 'group-123', domainName: 'api.example.com' },
          baseState,
          'my-api',
        ),
      ).rejects.toEqual({ code: 'InternalError', message: 'Server error' });
    });

    it('should set certificate after ownership retry succeeds', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain
        .mockRejectedValueOnce({ code: 'SingleDomainOwnershipCheckFail' })
        .mockResolvedValueOnce({});
      mockSetDomainCertificate.mockResolvedValue({});

      await operations.bindCustomDomain(
        {
          groupId: 'group-123',
          domainName: 'api.example.com',
          certificateName: 'test-cert',
          certificateBody: '-----BEGIN CERTIFICATE-----',
          certificatePrivateKey: '-----BEGIN RSA PRIVATE KEY-----',
        },
        baseState,
        'my-api',
      );

      expect(mockSetDomainCertificate).toHaveBeenCalled();
    });

    it('should use context region when group regionId is missing', async () => {
      mockDescribeApiGroup.mockResolvedValue({
        body: {
          groupId: 'group-123',
          subDomain: 'mygroup.apigateway.cn-hangzhou.aliyuncs.com',
          regionId: undefined,
        },
      });
      setupDnsMocks();
      mockSetDomain.mockResolvedValue({});

      await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(mockSetDomain).toHaveBeenCalled();
    });

    it('should handle existing DNS record (already in DNS but not state)', async () => {
      setupGroupMock();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockResolvedValue(['mygroup.apigateway.cn-hangzhou.aliyuncs.com']);

      mockDescribeDomainRecords.mockResolvedValue([
        {
          rr: 'api',
          type: 'CNAME',
          value: 'mygroup.apigateway.cn-hangzhou.aliyuncs.com',
          status: 'ENABLE',
        },
      ]);
      mockSetDomain.mockResolvedValue({});

      await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(mockAddDomainRecord).not.toHaveBeenCalled();
    });

    it('should handle existing DNS resource in state within 30 minutes', async () => {
      setupGroupMock();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockResolvedValue(['mygroup.apigateway.cn-hangzhou.aliyuncs.com']);

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const stateManager = require('../../../../src/common/stateManager');
      stateManager.getResource.mockReturnValueOnce({
        lastUpdated: new Date().toISOString(),
        instances: [{ id: 'record-existing' }],
      });
      mockDescribeDomainRecords.mockResolvedValue([
        {
          rr: 'api',
          type: 'CNAME',
          value: 'mygroup.apigateway.cn-hangzhou.aliyuncs.com',
          status: 'ENABLE',
        },
      ]);
      mockSetDomain.mockResolvedValue({});

      await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(mockSetDomain).toHaveBeenCalled();
    });

    it('should handle existing DNS resource in state older than 30 minutes (propagated)', async () => {
      setupGroupMock();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockResolvedValue(['mygroup.apigateway.cn-hangzhou.aliyuncs.com']);

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const stateManager = require('../../../../src/common/stateManager');
      const oldDate = new Date(Date.now() - 35 * 60 * 1000).toISOString();
      stateManager.getResource.mockReturnValueOnce({
        lastUpdated: oldDate,
        instances: [{ id: 'record-existing' }],
      });
      mockDescribeDomainRecords.mockResolvedValue([
        {
          rr: 'api',
          type: 'CNAME',
          value: 'mygroup.apigateway.cn-hangzhou.aliyuncs.com',
          status: 'ENABLE',
        },
      ]);
      mockSetDomain.mockResolvedValue({});

      await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(mockSetDomain).toHaveBeenCalled();
    });

    it('should handle existing DNS resource older than 30 min not propagated', async () => {
      setupGroupMock();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockResolvedValue(['mygroup.apigateway.cn-hangzhou.aliyuncs.com']);

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const stateManager = require('../../../../src/common/stateManager');
      const oldDate = new Date(Date.now() - 35 * 60 * 1000).toISOString();
      stateManager.getResource.mockReturnValueOnce({
        lastUpdated: oldDate,
        instances: [{ id: 'record-existing' }],
      });
      mockDescribeDomainRecords.mockResolvedValue([]);
      mockSetDomain.mockResolvedValue({});

      await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(mockSetDomain).toHaveBeenCalled();
    });

    it('should handle existing TXT record in addTxtVerificationRecord', async () => {
      setupGroupMock();
      setupDnsMocks();
      mockSetDomain.mockRejectedValueOnce({ code: 'SingleDomainOwnershipCheckFail' });

      mockDescribeDomainRecords.mockResolvedValueOnce([]).mockResolvedValueOnce([
        {
          rr: 'group-123.api',
          type: 'TXT',
          value: 'apigateway-domain-verfication=mygroup.apigateway.cn-hangzhou.aliyuncs.com',
        },
      ]);

      mockSetDomain.mockResolvedValueOnce({});

      await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(mockSetDomain).toHaveBeenCalledTimes(2);
    });

    it('should handle DNS record error in addDomainVerificationRecord', async () => {
      setupGroupMock();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockRejectedValue(new Error('DNS resolution failed'));
      mockDescribeDomainRecords.mockRejectedValue(new Error('DNS service error'));

      await expect(
        operations.bindCustomDomain(
          { groupId: 'group-123', domainName: 'api.example.com' },
          baseState,
          'my-api',
        ),
      ).rejects.toThrow('DNS service error');
    });

    it('should handle pollPublicDnsResolution timeout', async () => {
      setupGroupMock();
      mockDescribeDomainRecords.mockResolvedValue([]);
      mockAddDomainRecord.mockResolvedValue('record-123');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockRejectedValue(new Error('ENOTFOUND'));
      mockSetDomain.mockResolvedValue({});

      await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(mockSetDomain).toHaveBeenCalled();
    });

    it('should handle DNS check error in pollDnsPropagation', async () => {
      setupGroupMock();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockResolvedValue(['mygroup.apigateway.cn-hangzhou.aliyuncs.com']);
      mockDescribeDomainRecords
        .mockResolvedValueOnce([])
        .mockRejectedValue(new Error('DNS check failed'));
      mockAddDomainRecord.mockResolvedValue('record-123');
      mockSetDomain.mockResolvedValue({});

      await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'api.example.com' },
        baseState,
        'my-api',
      );

      expect(mockSetDomain).toHaveBeenCalled();
    });

    it('should handle root domain (@ host record) in TXT verification', async () => {
      setupGroupMock();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const dns = require('node:dns');
      dns.promises.resolveCname.mockResolvedValue(['mygroup.apigateway.cn-hangzhou.aliyuncs.com']);
      mockDescribeDomainRecords.mockResolvedValue([]);
      mockAddDomainRecord.mockResolvedValue('record-123');
      mockSetDomain
        .mockRejectedValueOnce({ code: 'SingleDomainOwnershipCheckFail' })
        .mockResolvedValueOnce({});

      await operations.bindCustomDomain(
        { groupId: 'group-123', domainName: 'example.com' },
        baseState,
        'my-api',
      );

      expect(mockSetDomain).toHaveBeenCalledTimes(2);
    });
  });

  describe('unbindCustomDomain', () => {
    it('should unbind custom domain', async () => {
      mockDeleteDomain.mockResolvedValue({});

      await operations.unbindCustomDomain('group-123', 'api.example.com');

      expect(mockDeleteDomain).toHaveBeenCalled();
    });
  });
});
