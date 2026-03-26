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

      const _result = await createApigwResource(
        mockContext,
        testEvent,
        'test-service',
        undefined,
        initialState,
      );

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

      const _result = await readApigwResource(mockContext, 'group-123');

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

      const _result = await readApigwResourceByName(mockContext, 'test-group');

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

      const _result = await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

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
  });
});
