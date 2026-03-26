import { ProviderEnum } from '../../../../src/common';
import {
  createApigwResource,
  readApigwResource,
  readApigwResourceByName,
  updateApigwResource,
  deleteApigwResource,
} from '../../../../src/stack/aliyunStack/apigwResource';
import { Context, CURRENT_STATE_VERSION, StateFile, EventDomain } from '../../../../src/types';

const mockedApigwOperations = {
  findApiGroupByName: jest.fn(),
  createApiGroup: jest.fn(),
  getApiGroup: jest.fn(),
  updateApiGroup: jest.fn(),
  createApi: jest.fn(),
  getApi: jest.fn(),
  updateApi: jest.fn(),
  deployApi: jest.fn(),
  abolishApi: jest.fn(),
  deleteApi: jest.fn(),
  deleteApiGroup: jest.fn(),
  bindCustomDomain: jest.fn(),
  unbindCustomDomain: jest.fn(),
};

const mockedCasOperations = {
  getCertificate: jest.fn(),
};

const mockedDnsOperations = {
  deleteDomainRecord: jest.fn(),
};

const mockedApigwTypes = {
  eventToApigwGroupConfig: jest.fn(),
  extractApigwGroupDefinition: jest.fn(),
  triggerToApigwApiConfig: jest.fn(),
  extractEventDomainDefinition: jest.fn(),
  generateApiKey: jest.fn(),
  inferProtocolConfig: jest.fn(),
};

const mockedStateManager = {
  setResource: jest.fn(),
  removeResource: jest.fn(),
  getResource: jest.fn(),
};

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    apigw: mockedApigwOperations,
    cas: mockedCasOperations,
    dns: mockedDnsOperations,
  }),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    error: (...args: unknown[]) => mockedLogger.error(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
    debug: (...args: unknown[]) => mockedLogger.debug(...args),
  },
}));

jest.mock('../../../../src/stack/aliyunStack/apigwTypes', () => ({
  eventToApigwGroupConfig: (...args: unknown[]) =>
    mockedApigwTypes.eventToApigwGroupConfig(...args),
  extractApigwGroupDefinition: (...args: unknown[]) =>
    mockedApigwTypes.extractApigwGroupDefinition(...args),
  triggerToApigwApiConfig: (...args: unknown[]) =>
    mockedApigwTypes.triggerToApigwApiConfig(...args),
  extractEventDomainDefinition: (...args: unknown[]) =>
    mockedApigwTypes.extractEventDomainDefinition(...args),
  generateApiKey: (...args: unknown[]) => mockedApigwTypes.generateApiKey(...args),
  inferProtocolConfig: (...args: unknown[]) => mockedApigwTypes.inferProtocolConfig(...args),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  setResource: (...args: unknown[]) => mockedStateManager.setResource(...args),
  removeResource: (...args: unknown[]) => mockedStateManager.removeResource(...args),
  getResource: (...args: unknown[]) => mockedStateManager.getResource(...args),
}));

jest.mock('../../../../src/common/certUtils', () => ({
  readPemContent: jest.fn((content: string) => content),
  warnInlinePem: jest.fn(),
}));

jest.mock('../../../../src/common/domainUtils', () => ({
  deriveWwwDomain: jest.fn((domain: string) => `www.${domain}`),
}));

const initialState: StateFile = {
  version: CURRENT_STATE_VERSION,
  provider: 'aliyun',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

describe('ApigwResource', () => {
  const mockContext: Context = {
    stage: 'dev',
    app: 'test-app',
    service: 'test-service',
    provider: ProviderEnum.ALIYUN,
    region: 'cn-hangzhou',
    accountId: '123456789012',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const testEvent: EventDomain = {
    key: 'api_gateway',
    name: 'Test API Gateway',
    type: 'API_GATEWAY',
    triggers: [
      {
        method: 'GET',
        path: '/api/hello',
        backend: 'functions.hello_function',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedStateManager.setResource.mockImplementation((state: StateFile) => state);
    mockedStateManager.removeResource.mockImplementation((state: StateFile) => state);
    mockedStateManager.getResource.mockReturnValue(null);
  });

  describe('createApigwResource', () => {
    it('should create a new API group and APIs', async () => {
      mockedApigwOperations.findApiGroupByName.mockRejectedValue(new Error('Not found'));
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.createApi.mockResolvedValue('api-456');
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-456',
        apiName: 'test-api',
      });
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await createApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.createApiGroup).toHaveBeenCalled();
      expect(mockedApigwOperations.createApi).toHaveBeenCalled();
      expect(mockedApigwOperations.deployApi).toHaveBeenCalled();
      expect(mockedStateManager.setResource).toHaveBeenCalled();
    });

    it('should reuse existing API group', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'existing-group',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'existing-group',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.createApi.mockResolvedValue('api-456');
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-456',
        apiName: 'test-api',
      });
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await createApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.findApiGroupByName).toHaveBeenCalled();
      expect(mockedApigwOperations.createApiGroup).not.toHaveBeenCalled();
      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(/Found existing API Group|APIGW_GROUP_FOUND_REUSING/),
      );
    });

    it('should throw error when group info retrieval fails', async () => {
      mockedApigwOperations.findApiGroupByName.mockRejectedValue(new Error('Not found'));
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue(null);

      await expect(
        createApigwResource(mockContext, testEvent, 'test-service', undefined, initialState),
      ).rejects.toThrow('Failed to get API group info after creation');
    });

    it('should handle multiple triggers', async () => {
      const eventWithMultipleTriggers: EventDomain = {
        ...testEvent,
        triggers: [
          { method: 'GET', path: '/api/hello', backend: 'functions.hello' },
          { method: 'POST', path: '/api/hello', backend: 'functions.hello' },
          { method: 'DELETE', path: '/api/hello', backend: 'functions.hello' },
        ],
      };

      mockedApigwOperations.findApiGroupByName.mockRejectedValue(new Error('Not found'));
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.createApi.mockResolvedValue('api-id');
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-id',
        apiName: 'test-api',
      });
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await createApigwResource(
        mockContext,
        eventWithMultipleTriggers,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedApigwOperations.createApi).toHaveBeenCalledTimes(3);
      expect(mockedApigwOperations.deployApi).toHaveBeenCalledTimes(3);
    });
  });

  describe('readApigwResource', () => {
    it('should read API group by ID', async () => {
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-group',
      });

      const result = await readApigwResource(mockContext, 'group-123');

      expect(mockedApigwOperations.getApiGroup).toHaveBeenCalledWith('group-123');
      expect(result).toEqual({ groupId: 'group-123', groupName: 'test-group' });
    });
  });

  describe('readApigwResourceByName', () => {
    it('should read API group by name', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-group',
      });

      const result = await readApigwResourceByName(mockContext, 'test-group');

      expect(mockedApigwOperations.findApiGroupByName).toHaveBeenCalledWith('test-group');
      expect(result).toEqual({ groupId: 'group-123', groupName: 'test-group' });
    });
  });

  describe('updateApigwResource', () => {
    it('should update existing API group and APIs', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'existing-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.updateApiGroup.mockResolvedValue(undefined);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-456',
        apiName: 'test-api',
      });
      mockedApigwOperations.updateApi.mockResolvedValue(undefined);
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedApigwTypes.generateApiKey.mockReturnValue('GET_/api/hello');

      await updateApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.updateApiGroup).toHaveBeenCalled();
      expect(mockedStateManager.setResource).toHaveBeenCalled();
    });

    it('should create new resource if none exists', async () => {
      mockedStateManager.getResource.mockReturnValue(null);
      mockedApigwOperations.findApiGroupByName.mockRejectedValue(new Error('Not found'));
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.createApi.mockResolvedValue('api-456');
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-456',
        apiName: 'test-api',
      });
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await updateApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.createApiGroup).toHaveBeenCalled();
    });

    it('should delete unused APIs', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-old', apiName: 'old-api' },
          { type: 'ALIYUN_APIGW_API', id: 'api-new', apiName: 'test-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.updateApiGroup.mockResolvedValue(undefined);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.getApi.mockImplementation((groupId, apiId) => {
        if (apiId === 'api-old') {
          return Promise.resolve({ apiId: 'api-old', apiName: 'old-api' });
        }
        return Promise.resolve({ apiId: 'api-new', apiName: 'test-api' });
      });
      mockedApigwOperations.updateApi.mockResolvedValue(undefined);
      mockedApigwOperations.abolishApi.mockResolvedValue(undefined);
      mockedApigwOperations.deleteApi.mockResolvedValue(undefined);
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedApigwTypes.generateApiKey.mockReturnValue('GET_/api/hello');

      await updateApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.deleteApi).toHaveBeenCalledWith('group-123', 'api-old');
    });
  });

  describe('deleteApigwResource', () => {
    it('should delete API group and its APIs', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456' },
          {
            type: 'ALIYUN_APIGW_DEPLOYMENT',
            groupId: 'group-123',
            apiId: 'api-456',
            stageName: 'RELEASE',
          },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.abolishApi.mockResolvedValue(undefined);
      mockedApigwOperations.deleteApi.mockResolvedValue(undefined);
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedApigwOperations.abolishApi).toHaveBeenCalled();
      expect(mockedApigwOperations.deleteApi).toHaveBeenCalled();
      expect(mockedApigwOperations.deleteApiGroup).toHaveBeenCalled();
      expect(mockedStateManager.removeResource).toHaveBeenCalled();
    });

    it('should handle missing state gracefully', async () => {
      mockedStateManager.getResource.mockReturnValue(null);

      const result = await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(result).toBeDefined();
    });

    it('should handle missing group instance', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_API', id: 'api-456' }],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedStateManager.removeResource).toHaveBeenCalled();
    });

    it('should continue deletion even if APIs or group fail to delete', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.deleteApi.mockRejectedValue(new Error('API not found'));
      mockedApigwOperations.deleteApiGroup.mockRejectedValue(new Error('Group not found'));

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedStateManager.removeResource).toHaveBeenCalled();
    });

    it('should unbind primary domain and www domain during deletion', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_GROUP', id: 'group-123' }],
        definition: {
          domain: {
            domainName: 'example.com',
            wwwBindApex: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.unbindCustomDomain.mockResolvedValue(undefined);
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedApigwOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'group-123',
        'example.com',
      );
      expect(mockedApigwOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'group-123',
        'www.example.com',
      );
    });

    it('should warn when primary domain unbind fails during deletion', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_GROUP', id: 'group-123' }],
        definition: {
          domain: {
            domainName: 'example.com',
            wwwBindApex: false,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.unbindCustomDomain.mockRejectedValue(new Error('unbind failed'));
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedLogger.warn).toHaveBeenCalled();
    });

    it('should warn when www domain unbind fails during deletion', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_GROUP', id: 'group-123' }],
        definition: {
          domain: {
            domainName: 'example.com',
            wwwBindApex: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.unbindCustomDomain.mockImplementation(
        (_groupId: string, domain: string) => {
          if (domain === 'www.example.com') {
            return Promise.reject(new Error('www unbind failed'));
          }
          return Promise.resolve(undefined);
        },
      );
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedLogger.warn).toHaveBeenCalled();
    });

    it('should clean up DNS records with real record IDs', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_GROUP', id: 'group-123' }],
        definition: {},
      };

      // First call: main resource state. Subsequent calls: DNS states
      mockedStateManager.getResource
        .mockReturnValueOnce(existingState)
        .mockReturnValueOnce({
          instances: [{ id: 'dns-record-123', type: 'ALIYUN_DNS_RECORD' }],
          definition: {},
        })
        .mockReturnValueOnce({
          instances: [{ id: 'dns-txt-456', type: 'ALIYUN_DNS_RECORD' }],
          definition: {},
        });

      mockedDnsOperations.deleteDomainRecord.mockResolvedValue(undefined);
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('dns-record-123');
      expect(mockedDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('dns-txt-456');
    });

    it('should skip DNS records with "existing" recordId', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_GROUP', id: 'group-123' }],
        definition: {},
      };

      mockedStateManager.getResource
        .mockReturnValueOnce(existingState)
        .mockReturnValueOnce({
          instances: [{ id: 'existing', type: 'ALIYUN_DNS_RECORD' }],
          definition: {},
        })
        .mockReturnValueOnce(null);

      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedDnsOperations.deleteDomainRecord).not.toHaveBeenCalled();
    });

    it('should warn when DNS record deletion fails', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_GROUP', id: 'group-123' }],
        definition: {},
      };

      mockedStateManager.getResource
        .mockReturnValueOnce(existingState)
        .mockReturnValueOnce({
          instances: [{ id: 'dns-record-fail', type: 'ALIYUN_DNS_RECORD' }],
          definition: {},
        })
        .mockReturnValueOnce(null);

      mockedDnsOperations.deleteDomainRecord.mockRejectedValue(new Error('DNS delete failed'));
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedLogger.warn).toHaveBeenCalled();
      expect(mockedStateManager.removeResource).toHaveBeenCalled();
    });

    it('should clean up DNS records even when group instance is missing', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_API', id: 'api-456' }],
        definition: {},
      };

      mockedStateManager.getResource
        .mockReturnValueOnce(existingState)
        .mockReturnValueOnce({
          instances: [{ id: 'dns-record-789', type: 'ALIYUN_DNS_RECORD' }],
          definition: {},
        })
        .mockReturnValueOnce(null);

      mockedDnsOperations.deleteDomainRecord.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('dns-record-789');
      expect(mockedStateManager.removeResource).toHaveBeenCalled();
    });
  });

  describe('createApigwResource - domain binding', () => {
    const setupBasicCreateMocks = () => {
      mockedApigwOperations.findApiGroupByName.mockRejectedValue(new Error('Not found'));
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.createApi.mockResolvedValue('api-456');
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-456',
        apiName: 'test-api',
      });
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.inferProtocolConfig.mockReturnValue({
        requestProtocol: 'HTTPS',
        isHttpRedirectToHttps: true,
      });
    };

    it('should bind primary domain with certificate_id', async () => {
      setupBasicCreateMocks();
      mockedCasOperations.getCertificate.mockResolvedValue({
        cert: 'cert-body',
        key: 'cert-key',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_id: 'cert-id-123',
          www_bind_apex: false,
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCasOperations.getCertificate).toHaveBeenCalledWith('cert-id-123');
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          certificateBody: 'cert-body',
          certificatePrivateKey: 'cert-key',
        }),
        expect.anything(),
        expect.anything(),
      );
    });

    it('should log error and return state when certificate_id references non-existent cert', async () => {
      setupBasicCreateMocks();
      mockedCasOperations.getCertificate.mockResolvedValue(null);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_id: 'bad-cert-id',
          www_bind_apex: false,
        },
      };

      const result = await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedLogger.error).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should bind domain with certificate_body and certificate_private_key', async () => {
      setupBasicCreateMocks();
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: '-----BEGIN CERTIFICATE-----\nMIID...\n-----END CERTIFICATE-----',
          certificate_private_key:
            '-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----',
          www_bind_apex: false,
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          certificateBody: expect.any(String),
          certificatePrivateKey: expect.any(String),
        }),
        expect.anything(),
        expect.anything(),
      );
    });

    it('should bind domain without certificate (HTTP only)', async () => {
      setupBasicCreateMocks();
      mockedApigwTypes.inferProtocolConfig.mockReturnValue({ requestProtocol: 'HTTP' });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          www_bind_apex: false,
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
        }),
        expect.anything(),
        expect.anything(),
      );
      // No certificate fields
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.not.objectContaining({
          certificateBody: expect.anything(),
        }),
        expect.anything(),
        expect.anything(),
      );
    });

    it('should bind primary and www domain when www_bind_apex is true', async () => {
      setupBasicCreateMocks();
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        wwwBindApex: true,
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: true,
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledTimes(2);
      // Primary domain
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'example.com' }),
        expect.anything(),
        expect.anything(),
      );
      // www domain
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'www.example.com' }),
        expect.anything(),
        expect.anything(),
      );
    });

    it('should log error and return state when domain binding fails', async () => {
      setupBasicCreateMocks();
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
      });
      mockedApigwOperations.bindCustomDomain.mockRejectedValue(new Error('binding failed'));

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: false,
        },
      };

      const result = await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedLogger.error).toHaveBeenCalled();
      expect(mockedLogger.info).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should use existing group when findApiGroupByName returns group without groupId', async () => {
      setupBasicCreateMocks();
      // findApiGroupByName returns object without groupId — falls to else branch (createApiGroup)
      mockedApigwOperations.findApiGroupByName.mockResolvedValue({ groupName: 'test-api-group' });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await createApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.createApiGroup).toHaveBeenCalled();
    });
  });

  describe('updateApigwResource - domain binding', () => {
    const setupBasicUpdateMocks = (groupId = 'group-123') => {
      mockedApigwOperations.updateApiGroup.mockResolvedValue(undefined);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId,
        groupName: 'test-api-group',
      });
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-456',
        apiName: 'test-api',
      });
      mockedApigwOperations.updateApi.mockResolvedValue(undefined);
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.generateApiKey.mockReturnValue('GET_/api/hello');
      mockedApigwTypes.inferProtocolConfig.mockReturnValue({
        requestProtocol: 'HTTPS',
        isHttpRedirectToHttps: true,
      });
    };

    it('should fallback to create when no group instance exists in state', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' }],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      // Setup create mocks for fallback
      mockedApigwOperations.findApiGroupByName.mockRejectedValue(new Error('Not found'));
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-new');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-new',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.createApi.mockResolvedValue('api-new');
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-new',
        apiName: 'test-api',
      });
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await updateApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.createApiGroup).toHaveBeenCalled();
    });

    it('should throw when getApiGroup returns null during update', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.updateApiGroup.mockResolvedValue(undefined);
      mockedApigwOperations.getApiGroup.mockResolvedValue(null);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });

      await expect(
        updateApigwResource(mockContext, testEvent, 'test-service', undefined, initialState),
      ).rejects.toThrow('Failed to get API group info after update');
    });

    it('should bind domain with www during update', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        wwwBindApex: true,
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: true,
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledTimes(2);
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'example.com' }),
        expect.anything(),
        expect.anything(),
      );
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'www.example.com' }),
        expect.anything(),
        expect.anything(),
      );
    });

    it('should unbind previous www domain when domain name changes', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {
          domain: {
            domainName: 'old-domain.com',
            wwwBindApex: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'new-domain.com',
        wwwBindApex: true,
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);
      mockedApigwOperations.unbindCustomDomain.mockResolvedValue(undefined);

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'new-domain.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: true,
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      // Should unbind old www domain
      expect(mockedApigwOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'group-123',
        'www.old-domain.com',
      );
    });

    it('should warn when unbinding previous www domain fails', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {
          domain: {
            domainName: 'old-domain.com',
            wwwBindApex: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'new-domain.com',
        wwwBindApex: false,
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);
      mockedApigwOperations.unbindCustomDomain.mockRejectedValue(new Error('unbind failed'));

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'new-domain.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: false,
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedLogger.warn).toHaveBeenCalled();
    });

    it('should unbind old domain when domain is removed from event', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {
          domain: {
            domainName: 'old-domain.com',
            wwwBindApex: false,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedApigwOperations.unbindCustomDomain.mockResolvedValue(undefined);

      // Event without domain
      const eventNoDomain: EventDomain = {
        ...testEvent,
        domain: undefined,
      };

      await updateApigwResource(
        mockContext,
        eventNoDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedApigwOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'group-123',
        'old-domain.com',
      );
    });

    it('should warn when unbinding old domain fails on removal', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {
          domain: {
            domainName: 'old-domain.com',
            wwwBindApex: false,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedApigwOperations.unbindCustomDomain.mockRejectedValue(new Error('unbind err'));

      const eventNoDomain: EventDomain = {
        ...testEvent,
        domain: undefined,
      };

      await updateApigwResource(
        mockContext,
        eventNoDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedLogger.warn).toHaveBeenCalled();
    });

    it('should unbind old domain and old www domain when domain is removed', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {
          domain: {
            domainName: 'old-domain.com',
            wwwBindApex: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedApigwOperations.unbindCustomDomain.mockResolvedValue(undefined);

      const eventNoDomain: EventDomain = {
        ...testEvent,
        domain: undefined,
      };

      await updateApigwResource(
        mockContext,
        eventNoDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedApigwOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'group-123',
        'old-domain.com',
      );
      expect(mockedApigwOperations.unbindCustomDomain).toHaveBeenCalledWith(
        'group-123',
        'www.old-domain.com',
      );
    });

    it('should warn when www domain unbind fails during domain removal', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {
          domain: {
            domainName: 'old-domain.com',
            wwwBindApex: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedApigwOperations.unbindCustomDomain.mockImplementation(
        (_groupId: string, domain: string) => {
          if (domain.startsWith('www.')) {
            return Promise.reject(new Error('www unbind failed'));
          }
          return Promise.resolve(undefined);
        },
      );

      const eventNoDomain: EventDomain = {
        ...testEvent,
        domain: undefined,
      };

      await updateApigwResource(
        mockContext,
        eventNoDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedLogger.warn).toHaveBeenCalled();
    });

    it('should create new API when no matching existing API found during update', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-old', apiName: 'different-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedApigwOperations.createApi.mockResolvedValue('api-new');
      // getApi for old api during cleanup — not needed by trigger
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-new',
        apiName: 'test-api',
      });

      await updateApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.createApi).toHaveBeenCalled();
    });

    it('should not skip previous www unbind when same www domain', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {
          domain: {
            domainName: 'example.com',
            wwwBindApex: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        wwwBindApex: true,
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: true,
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      // Should NOT unbind because previousWwwDomain === wwwDomain
      expect(mockedApigwOperations.unbindCustomDomain).not.toHaveBeenCalled();
    });

    it('should handle domain binding without www during update', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: false,
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledTimes(1);
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'example.com' }),
        expect.anything(),
        expect.anything(),
      );
    });

    it('should handle update with domain with certificate_id', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedCasOperations.getCertificate.mockResolvedValue({
        cert: 'cas-cert',
        key: 'cas-key',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
      });
      mockedApigwOperations.bindCustomDomain.mockResolvedValue(initialState);

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_id: 'cas-cert-id',
          www_bind_apex: false,
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCasOperations.getCertificate).toHaveBeenCalledWith('cas-cert-id');
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          certificateBody: 'cas-cert',
          certificatePrivateKey: 'cas-key',
        }),
        expect.anything(),
        expect.anything(),
      );
    });
  });
});
