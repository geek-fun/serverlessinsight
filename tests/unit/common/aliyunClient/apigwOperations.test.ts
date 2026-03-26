import {
  createApigwOperations,
  isNetworkTimeoutError,
  isDomainAlreadyBoundError,
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

jest.mock('../../../../src/common/aliyunClient/dnsOperations');

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

      jest.doMock('../../../../src/common/aliyunClient/dnsOperations', () => ({
        createDnsOperations: jest.fn(() => ({
          describeDomainRecords: mockDescribeDomainRecords,
          addDomainRecord: mockAddDomainRecord,
        })),
      }));

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

  describe('unbindCustomDomain', () => {
    it('should unbind custom domain', async () => {
      mockDeleteDomain.mockResolvedValue({});

      await operations.unbindCustomDomain('group-123', 'api.example.com');

      expect(mockDeleteDomain).toHaveBeenCalled();
    });
  });
});
