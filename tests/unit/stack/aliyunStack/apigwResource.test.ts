import { ProviderEnum } from '../../../../src/common';
import {
  createApigwResource,
  readApigwResource,
  readApigwResourceByName,
  updateApigwResource,
  deleteApigwResource,
} from '../../../../src/stack/aliyunStack/apigwResource';
import {
  Context,
  CURRENT_STATE_VERSION,
  PartialResourceError,
  StateFile,
  EventDomain,
} from '../../../../src/types';
import { extractMainDomain, extractHostRecord } from '../../../../src/common/domainUtils';

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
  listApisByGroup: jest.fn(),
  deleteApiGroup: jest.fn(),
  bindCustomDomain: jest.fn(),
  unbindCustomDomain: jest.fn(),
};

const mockedCasOperations = {
  getCertificate: jest.fn(),
};

const mockedCdnOperations = {
  addCdnDomain: jest.fn(),
  describeCdnDomainDetail: jest.fn(),
  deleteCdnDomain: jest.fn(),
  modifyCdnDomain: jest.fn(),
  setDomainServerCertificate: jest.fn(),
  applyCacheConfig: jest.fn(),
  applyProtocolConfig: jest.fn(),
  applyCompression: jest.fn(),
  applyHttpsRedirect: jest.fn(),
};

const mockedDnsOperations = {
  deleteDomainRecord: jest.fn(),
  addDomainRecord: jest.fn(),
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
  ...jest.requireActual('../../../../src/common/aliyunClient'),
  createAliyunClient: () => ({
    apigw: mockedApigwOperations,
    cas: mockedCasOperations,
    dns: mockedDnsOperations,
    cdn: mockedCdnOperations,
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
  ...jest.requireActual('../../../../src/common/domainUtils'),
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
      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
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

    it('should reuse existing API group owned by this stack', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'existing-group',
        groupName: 'test-api-group',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.api_gateway' }],
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

    it('should write ownership tag into groupConfig before create', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
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

      expect(mockedApigwOperations.createApiGroup).toHaveBeenCalledWith(
        expect.objectContaining({
          groupName: 'test-api-group',
          tags: [{ key: 'si-owned-by', value: 'test-app-test-service:events.api_gateway' }],
        }),
      );
    });

    it('should refuse to reuse an existing group without our ownership tag', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'existing-group',
        groupName: 'test-api-group',
      });
      mockedStateManager.setResource.mockImplementation(
        (state: StateFile, logicalId: string, resourceState: unknown) => ({
          ...state,
          resources: { ...state.resources, [logicalId]: resourceState },
        }),
      );

      const error = await createApigwResource(
        mockContext,
        testEvent,
        'test-service',
        undefined,
        initialState,
      ).catch((e: unknown) => e);

      expect(error).toBeInstanceOf(PartialResourceError);
      const partialError = error as PartialResourceError;
      expect(partialError.cause.message).toContain('not owned by this stack');
      expect(partialError.cause.message).toContain('si-owned-by');
      expect(mockedApigwOperations.createApiGroup).not.toHaveBeenCalled();
      expect(mockedApigwOperations.createApi).not.toHaveBeenCalled();
    });

    it('should fail loudly when the group probe errors instead of blind-creating', async () => {
      mockedApigwOperations.findApiGroupByName.mockRejectedValue(new Error('probe failed'));
      mockedStateManager.setResource.mockImplementation(
        (state: StateFile, logicalId: string, resourceState: unknown) => ({
          ...state,
          resources: { ...state.resources, [logicalId]: resourceState },
        }),
      );

      const error = await createApigwResource(
        mockContext,
        testEvent,
        'test-service',
        undefined,
        initialState,
      ).catch((e: unknown) => e);

      expect(error).toBeInstanceOf(PartialResourceError);
      const partialError = error as PartialResourceError;
      expect(partialError.cause.message).toBe('probe failed');
      expect(mockedApigwOperations.createApiGroup).not.toHaveBeenCalled();
    });

    it('should adopt idempotently when createApiGroup hits an already-exists error and the group is owned', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValueOnce(null).mockResolvedValueOnce({
        groupId: 'group-123',
        groupName: 'test-api-group',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.api_gateway' }],
      });
      mockedApigwOperations.createApiGroup.mockRejectedValue(
        Object.assign(new Error('API group already exists'), { code: 'RepeatedCommit' }),
      );
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
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

      expect(mockedApigwOperations.createApiGroup).toHaveBeenCalledTimes(1);
      expect(mockedApigwOperations.createApi).toHaveBeenCalled();
    });

    it('should throw error when group info retrieval fails', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue(null);
      mockedStateManager.setResource.mockImplementation(
        (state: StateFile, logicalId: string, resourceState: unknown) => ({
          ...state,
          resources: { ...state.resources, [logicalId]: resourceState },
        }),
      );

      const error = await createApigwResource(
        mockContext,
        testEvent,
        'test-service',
        undefined,
        initialState,
      ).catch((e: unknown) => e);

      expect(error).toBeInstanceOf(PartialResourceError);
      const partialError = error as PartialResourceError;
      expect(partialError.cause.message).toContain('Failed to get API group info after creation');
      expect(partialError.updatedState.resources['events.api_gateway']).toMatchObject({
        status: 'tainted',
      });
    });

    it('should throw PartialResourceError with tainted state when getApiGroup fails after group creation', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockRejectedValue(new Error('group fetch failed'));
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedStateManager.setResource.mockImplementation(
        (state: StateFile, logicalId: string, resourceState: unknown) => ({
          ...state,
          resources: { ...state.resources, [logicalId]: resourceState },
        }),
      );

      const error = await createApigwResource(
        mockContext,
        testEvent,
        'test-service',
        undefined,
        initialState,
      ).catch((e: unknown) => e);

      expect(error).toBeInstanceOf(PartialResourceError);
      const partialError = error as PartialResourceError;
      expect(partialError.updatedState.resources['events.api_gateway']).toMatchObject({
        status: 'tainted',
      });
      expect(partialError.cause.message).toBe('group fetch failed');
    });

    it('should throw PartialResourceError with tainted state when createApi fails after group creation', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
      });
      mockedApigwOperations.createApi.mockRejectedValue(new Error('Create failed'));
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({
        apiName: 'test-api',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedStateManager.setResource.mockImplementation(
        (state: StateFile, logicalId: string, resourceState: unknown) => ({
          ...state,
          resources: { ...state.resources, [logicalId]: resourceState },
        }),
      );

      const error = await createApigwResource(
        mockContext,
        testEvent,
        'test-service',
        undefined,
        initialState,
      ).catch((e: unknown) => e);

      expect(error).toBeInstanceOf(PartialResourceError);
      const partialError = error as PartialResourceError;
      expect(partialError.updatedState.resources['events.api_gateway']).toMatchObject({
        status: 'tainted',
      });
      expect(partialError.cause.message).toBe('Create failed');
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

      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
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

    it('should retain max-detail group and api fields in the state instances', async () => {
      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
        regionId: 'cn-hangzhou',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.api_gateway' }],
      });
      mockedApigwOperations.createApi.mockResolvedValue('api-456');
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-456',
        apiName: 'test-api',
        groupId: 'group-123',
        resultSample: '{"ok":true}',
        deployedInfos: [
          { stageName: 'RELEASE', deployedStatus: 'DEPLOYED', effectiveVersion: '1' },
        ],
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

      let savedResourceState: unknown;
      mockedStateManager.setResource.mockImplementation(
        (state: StateFile, _logicalId: string, resourceState: unknown) => {
          savedResourceState = resourceState;
          return { ...state };
        },
      );

      await createApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      const resourceState = savedResourceState as {
        instances?: Array<Record<string, unknown>>;
      };
      const groupInstance = resourceState.instances?.find((i) => i.type === 'ALIYUN_APIGW_GROUP');
      const apiInstance = resourceState.instances?.find((i) => i.type === 'ALIYUN_APIGW_API');

      expect(groupInstance).toMatchObject({
        regionId: 'cn-hangzhou',
        tags: [{ key: 'si-owned-by', value: 'test-app-test-service:events.api_gateway' }],
      });
      expect(apiInstance).toMatchObject({
        resultSample: '{"ok":true}',
        deployedInfos: [
          { stageName: 'RELEASE', deployedStatus: 'DEPLOYED', effectiveVersion: '1' },
        ],
      });
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
      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
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

    it('should recover from drift when no state but group exists in cloud', async () => {
      mockedStateManager.getResource.mockReturnValue(null);
      mockedApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'group-drift',
        groupName: 'test-api-group',
        subDomain: 'group-drift.apigw.aliyuncs.com',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.api_gateway' }],
      });
      mockedApigwOperations.listApisByGroup.mockResolvedValue([
        { apiId: 'api-match', apiName: 'test-api' },
      ]);
      mockedApigwOperations.updateApiGroup.mockResolvedValue(undefined);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-drift',
        groupName: 'test-api-group',
        subDomain: 'group-drift.apigw.aliyuncs.com',
      });
      mockedApigwOperations.getApi.mockResolvedValue({
        apiId: 'api-match',
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
      mockedApigwTypes.generateApiKey.mockReturnValue('GET_api_hello');
      mockedApigwTypes.inferProtocolConfig.mockReturnValue({
        requestProtocol: 'HTTPS',
        isHttpRedirectToHttps: true,
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await updateApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.findApiGroupByName).toHaveBeenCalled();
      expect(mockedApigwOperations.listApisByGroup).toHaveBeenCalledWith('group-drift');
      expect(mockedApigwOperations.updateApi).toHaveBeenCalled();
      expect(mockedApigwOperations.createApi).not.toHaveBeenCalled();
    });

    it('should skip non-matching cloud APIs during drift recovery', async () => {
      mockedStateManager.getResource.mockReturnValue(null);
      mockedApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'group-drift',
        groupName: 'test-api-group',
        subDomain: 'group-drift.apigw.aliyuncs.com',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.api_gateway' }],
      });
      // Cloud has 2 APIs: one matching, one not
      mockedApigwOperations.listApisByGroup.mockResolvedValue([
        { apiId: 'api-match', apiName: 'test-api' },
        { apiId: 'api-orphan', apiName: 'manual-api' },
      ]);
      mockedApigwOperations.updateApiGroup.mockResolvedValue(undefined);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-drift',
        groupName: 'test-api-group',
        subDomain: 'group-drift.apigw.aliyuncs.com',
      });
      mockedApigwOperations.getApi.mockImplementation((groupId: string, apiId: string) => {
        if (apiId === 'api-match') {
          return Promise.resolve({ apiId: 'api-match', apiName: 'test-api' });
        }
        return Promise.resolve({ apiId: apiId, apiName: 'manual-api' });
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
      mockedApigwTypes.generateApiKey.mockReturnValue('GET_api_hello');
      mockedApigwTypes.inferProtocolConfig.mockReturnValue({
        requestProtocol: 'HTTPS',
        isHttpRedirectToHttps: true,
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await updateApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      // Only the matching API should be updated; the orphan is left untouched
      expect(mockedApigwOperations.updateApi).toHaveBeenCalledWith('api-match', expect.any(Object));
      // The orphan API should NOT be deleted
      expect(mockedApigwOperations.abolishApi).not.toHaveBeenCalled();
      expect(mockedApigwOperations.deleteApi).not.toHaveBeenCalled();
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

    it('should propagate API delete failure and keep resource in state', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.deleteApi.mockRejectedValue(new Error('API delete failed'));

      await expect(
        deleteApigwResource(mockContext, 'events.api_gateway', initialState),
      ).rejects.toThrow('API delete failed');
      expect(mockedStateManager.removeResource).not.toHaveBeenCalledWith(
        expect.anything(),
        'events.api_gateway',
      );
      expect(mockedApigwOperations.deleteApiGroup).not.toHaveBeenCalled();
    });

    it('should propagate deleteApiGroup failure and keep resource in state', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.deleteApi.mockResolvedValue(undefined);
      mockedApigwOperations.deleteApiGroup.mockRejectedValue(new Error('Group delete failed'));

      await expect(
        deleteApigwResource(mockContext, 'events.api_gateway', initialState),
      ).rejects.toThrow('Group delete failed');
      expect(mockedStateManager.removeResource).not.toHaveBeenCalledWith(
        expect.anything(),
        'events.api_gateway',
      );
    });

    it('should tolerate NOT-FOUND deleteApi errors during deletion', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.deleteApi.mockRejectedValue({ code: 'NotFoundApi' });
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedApigwOperations.deleteApiGroup).toHaveBeenCalled();
      expect(mockedStateManager.removeResource).toHaveBeenCalled();
    });

    it('should tolerate NOT-FOUND abolishApi and deleteApiGroup errors during deletion', async () => {
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
      mockedApigwOperations.abolishApi.mockRejectedValue({ code: 'NotFoundDeployment' });
      mockedApigwOperations.deleteApi.mockRejectedValue({ code: 'InvalidApiId.NotFound' });
      mockedApigwOperations.deleteApiGroup.mockRejectedValue({ code: 'NotFoundApiGroup' });

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedStateManager.removeResource).toHaveBeenCalled();
    });

    it('should keep resource in state when delete fails mid-sequence after a successful sub-delete', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456' },
        ],
        definition: {
          domain: { domainName: 'example.com', wwwBindApex: false },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.unbindCustomDomain.mockResolvedValue(undefined);
      mockedApigwOperations.deleteApi.mockRejectedValue(new Error('auth failed'));

      await expect(
        deleteApigwResource(mockContext, 'events.api_gateway', initialState),
      ).rejects.toThrow('auth failed');
      expect(mockedStateManager.removeResource).not.toHaveBeenCalledWith(
        expect.anything(),
        'events.api_gateway',
      );
    });

    it('should delete CDN resources during deletion for CDN-backed domain', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_CDN_DISTRIBUTION', id: 'example.com', domainName: 'example.com' },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'dns-record-123',
            domain: 'example.com',
            dnsRecordId: 'dns-record-123',
          },
        ],
        definition: {
          domain: {
            domainName: 'example.com',
            cdnEnabled: true,
            wwwBindApex: false,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedCdnOperations.deleteCdnDomain.mockResolvedValue(undefined);
      mockedDnsOperations.deleteDomainRecord.mockResolvedValue(undefined);
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedCdnOperations.deleteCdnDomain).toHaveBeenCalledWith('example.com');
      expect(mockedDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('dns-record-123');
      expect(mockedApigwOperations.unbindCustomDomain).not.toHaveBeenCalled();
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

    it('should propagate primary domain unbind failure during deletion', async () => {
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

      await expect(
        deleteApigwResource(mockContext, 'events.api_gateway', initialState),
      ).rejects.toThrow('unbind failed');
      expect(mockedStateManager.removeResource).not.toHaveBeenCalledWith(
        expect.anything(),
        'events.api_gateway',
      );
    });

    it('should propagate www domain unbind failure during deletion', async () => {
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

      await expect(
        deleteApigwResource(mockContext, 'events.api_gateway', initialState),
      ).rejects.toThrow('www unbind failed');
      expect(mockedStateManager.removeResource).not.toHaveBeenCalledWith(
        expect.anything(),
        'events.api_gateway',
      );
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
      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
      mockedApigwOperations.createApiGroup.mockResolvedValue('group-123');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
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

    const setupCdnMocks = (cname = 'api.example.com.cdn.aliyuncs.com') => {
      mockedCdnOperations.addCdnDomain.mockResolvedValue(undefined);
      mockedCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'example.com',
        cname,
      });
      mockedCdnOperations.setDomainServerCertificate.mockResolvedValue(undefined);
      mockedCdnOperations.applyCacheConfig.mockResolvedValue(undefined);
      mockedCdnOperations.applyProtocolConfig.mockResolvedValue(undefined);
      mockedCdnOperations.applyCompression.mockResolvedValue(undefined);
      mockedCdnOperations.applyHttpsRedirect.mockResolvedValue(undefined);
      mockedDnsOperations.addDomainRecord.mockResolvedValue('dns-record-123');
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

    it('should throw PartialResourceError when certificate_id references non-existent cert', async () => {
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

      await expect(
        createApigwResource(mockContext, eventWithDomain, 'test-service', undefined, initialState),
      ).rejects.toBeInstanceOf(PartialResourceError);
      expect(mockedLogger.error).toHaveBeenCalled();
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

    it('should create CDN distribution when domain.cdn is enabled', async () => {
      setupBasicCreateMocks();
      setupCdnMocks();
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
      });
      mockedCasOperations.getCertificate.mockResolvedValue({
        cert: 'cert-body',
        key: 'cert-key',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_id: 'cert-id-123',
          www_bind_apex: false,
          cdn: true,
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.addCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          cdnType: 'web',
          sources: [expect.objectContaining({ content: 'group-123.apigw.aliyuncs.com' })],
        }),
      );
      expect(mockedDnsOperations.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: extractMainDomain('example.com'),
          rr: extractHostRecord('example.com', extractMainDomain('example.com')),
          type: 'CNAME',
          value: 'api.example.com.cdn.aliyuncs.com',
        }),
      );
      expect(mockedCdnOperations.setDomainServerCertificate).toHaveBeenCalledWith(
        'example.com',
        expect.objectContaining({
          serverCertificate: 'cert-body',
          privateKey: 'cert-key',
        }),
      );
      expect(mockedApigwOperations.bindCustomDomain).not.toHaveBeenCalled();
      expect(mockedStateManager.setResource).toHaveBeenCalled();
    });

    it('should create CDN distributions for primary and www domains', async () => {
      setupBasicCreateMocks();
      setupCdnMocks('cdn-target.aliyuncs.com');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        wwwBindApex: true,
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: true,
          cdn: {
            enabled: true,
            cache_ttl: 60,
            ignore_query_string: false,
          },
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.addCdnDomain).toHaveBeenCalledTimes(2);
      expect(mockedDnsOperations.addDomainRecord).toHaveBeenCalledTimes(2);
      expect(mockedDnsOperations.addDomainRecord).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          domainName: extractMainDomain('example.com'),
          rr: extractHostRecord('example.com', extractMainDomain('example.com')),
          type: 'CNAME',
          value: 'cdn-target.aliyuncs.com',
        }),
      );
      expect(mockedDnsOperations.addDomainRecord).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          domainName: extractMainDomain('www.example.com'),
          rr: extractHostRecord('www.example.com', extractMainDomain('www.example.com')),
          type: 'CNAME',
          value: 'cdn-target.aliyuncs.com',
        }),
      );
      expect(mockedCdnOperations.applyCacheConfig).toHaveBeenCalledWith('example.com', 60, false);
      expect(mockedCdnOperations.applyCacheConfig).toHaveBeenCalledWith(
        'www.example.com',
        60,
        false,
      );
    });

    it('should apply advanced CDN settings and skip DNS record when CDN cname is unavailable', async () => {
      setupBasicCreateMocks();
      mockedCdnOperations.addCdnDomain.mockResolvedValue(undefined);
      mockedCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'example.com',
      });
      mockedCdnOperations.applyProtocolConfig.mockResolvedValue(undefined);
      mockedCdnOperations.applyCompression.mockResolvedValue(undefined);
      mockedCdnOperations.applyHttpsRedirect.mockResolvedValue(undefined);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          www_bind_apex: false,
          cdn: {
            enabled: true,
            cdn_type: 'download',
            scope: 'domestic',
            origin_protocol: 'https',
            compression: true,
            force_redirect_https: true,
          },
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.addCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          cdnType: 'download',
          scope: 'domestic',
          sources: [
            expect.objectContaining({
              content: 'group-123.apigw.aliyuncs.com',
              port: 443,
            }),
          ],
        }),
      );
      expect(mockedCdnOperations.applyProtocolConfig).toHaveBeenCalledWith('example.com', 'https');
      expect(mockedCdnOperations.applyCompression).toHaveBeenCalledWith('example.com', true);
      expect(mockedCdnOperations.applyHttpsRedirect).toHaveBeenCalledWith('example.com', true);
      expect(mockedDnsOperations.addDomainRecord).not.toHaveBeenCalled();
    });

    it('should track CDN instances with domain fallback id during create', async () => {
      setupBasicCreateMocks();
      mockedCdnOperations.addCdnDomain.mockResolvedValue(undefined);
      mockedCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'example.com',
        cname: 'fallback-cdn.aliyuncs.com',
      });
      mockedCdnOperations.applyCacheConfig.mockResolvedValue(undefined);
      mockedDnsOperations.addDomainRecord.mockResolvedValue('');
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          www_bind_apex: false,
          cdn: {
            enabled: true,
            ignore_query_string: true,
          },
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.applyCacheConfig).toHaveBeenCalledWith(
        'example.com',
        undefined,
        true,
      );
      expect(mockedStateManager.setResource).toHaveBeenLastCalledWith(
        expect.anything(),
        'events.api_gateway',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              type: 'ALIYUN_CDN_DISTRIBUTION',
              id: 'example.com',
              domainName: 'example.com',
              cname: 'fallback-cdn.aliyuncs.com',
            }),
            expect.objectContaining({
              type: 'ALIYUN_CDN_DNS_CNAME',
              id: 'example.com',
              domain: 'example.com',
              cname: 'fallback-cdn.aliyuncs.com',
              dnsRecordId: undefined,
            }),
          ]),
        }),
      );
    });

    it('should throw PartialResourceError when origin subDomain is missing during create', async () => {
      setupBasicCreateMocks();
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
      });
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

      await expect(
        createApigwResource(mockContext, eventWithDomain, 'test-service', undefined, initialState),
      ).rejects.toBeInstanceOf(PartialResourceError);
      expect(mockedLogger.error).toHaveBeenCalled();
      expect(mockedApigwOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should bind directly when domain.cdn is false', async () => {
      setupBasicCreateMocks();
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
          cdn: false,
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'example.com' }),
        expect.anything(),
        expect.anything(),
      );
    });

    it('should create CDN distribution without certificate upload when no certificate is provided', async () => {
      setupBasicCreateMocks();
      setupCdnMocks('no-cert-cdn.aliyuncs.com');
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          www_bind_apex: false,
          cdn: true,
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.addCdnDomain).toHaveBeenCalled();
      expect(mockedCdnOperations.setDomainServerCertificate).not.toHaveBeenCalled();
      expect(mockedDnsOperations.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: extractMainDomain('example.com'),
          rr: extractHostRecord('example.com', extractMainDomain('example.com')),
          value: 'no-cert-cdn.aliyuncs.com',
        }),
      );
    });

    it('should fall back to direct binding when domain.cdn is an unsupported string', async () => {
      setupBasicCreateMocks();
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
          cdn: 'enabled' as never,
        },
      };

      await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'example.com' }),
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

    it('should throw PartialResourceError when domain binding fails', async () => {
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

      await expect(
        createApigwResource(mockContext, eventWithDomain, 'test-service', undefined, initialState),
      ).rejects.toBeInstanceOf(PartialResourceError);
      expect(mockedLogger.error).toHaveBeenCalled();
      expect(mockedLogger.info).toHaveBeenCalled();
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

    const setupCdnMocks = (cname = 'api.example.com.cdn.aliyuncs.com') => {
      mockedCdnOperations.addCdnDomain.mockResolvedValue(undefined);
      mockedCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'example.com',
        cname,
      });
      mockedCdnOperations.setDomainServerCertificate.mockResolvedValue(undefined);
      mockedCdnOperations.applyCacheConfig.mockResolvedValue(undefined);
      mockedCdnOperations.applyProtocolConfig.mockResolvedValue(undefined);
      mockedCdnOperations.applyCompression.mockResolvedValue(undefined);
      mockedCdnOperations.applyHttpsRedirect.mockResolvedValue(undefined);
      mockedDnsOperations.addDomainRecord.mockResolvedValue('dns-record-123');
    };

    it('should fallback to create when no group instance exists in state', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' }],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      // Setup create mocks for fallback
      mockedApigwOperations.findApiGroupByName.mockResolvedValue(null);
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

    it('should create CDN distribution during update when cdn is enabled', async () => {
      setupBasicUpdateMocks();
      setupCdnMocks('api-cdn.aliyuncs.com');
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: false,
          cdn: true,
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.addCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          sources: [expect.objectContaining({ content: 'group-123.apigw.aliyuncs.com' })],
        }),
      );
      expect(mockedDnsOperations.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: extractMainDomain('example.com'),
          rr: extractHostRecord('example.com', extractMainDomain('example.com')),
          type: 'CNAME',
          value: 'api-cdn.aliyuncs.com',
        }),
      );
      expect(mockedApigwOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should modify existing CDN distribution during update when tracked CDN instances exist', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
          {
            type: 'ALIYUN_CDN_DISTRIBUTION',
            id: 'example.com',
            domainName: 'example.com',
            cname: 'old-cdn.aliyuncs.com',
          },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'dns-record-123',
            domain: 'example.com',
            cname: 'old-cdn.aliyuncs.com',
            dnsRecordId: 'dns-record-123',
          },
        ],
        definition: {
          domain: {
            domainName: 'example.com',
            cdnEnabled: true,
            wwwBindApex: false,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
      });
      mockedCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'example.com',
        cname: 'updated-cdn.aliyuncs.com',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: false,
          cdn: {
            enabled: true,
            cdn_type: 'download',
            scope: 'domestic',
            cache_ttl: 30,
            ignore_query_string: true,
            origin_protocol: 'https',
            compression: true,
            force_redirect_https: true,
          },
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.modifyCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: 'example.com',
          cdnType: 'download',
          scope: 'domestic',
          sources: [
            expect.objectContaining({
              content: 'group-123.apigw.aliyuncs.com',
              port: 443,
            }),
          ],
        }),
      );
      expect(mockedCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockedCdnOperations.applyCacheConfig).toHaveBeenCalledWith('example.com', 30, true);
      expect(mockedCdnOperations.applyProtocolConfig).toHaveBeenCalledWith('example.com', 'https');
      expect(mockedCdnOperations.applyCompression).toHaveBeenCalledWith('example.com', true);
      expect(mockedCdnOperations.applyHttpsRedirect).toHaveBeenCalledWith('example.com', true);
      expect(mockedCdnOperations.setDomainServerCertificate).toHaveBeenCalledWith(
        'example.com',
        expect.objectContaining({
          serverCertificate: 'cert-body',
          privateKey: 'cert-key',
        }),
      );
      expect(mockedDnsOperations.addDomainRecord).not.toHaveBeenCalled();
      expect(mockedStateManager.setResource).toHaveBeenLastCalledWith(
        expect.anything(),
        'events.api_gateway',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              type: 'ALIYUN_CDN_DISTRIBUTION',
              domainName: 'example.com',
              cname: 'updated-cdn.aliyuncs.com',
            }),
            expect.objectContaining({
              type: 'ALIYUN_CDN_DNS_CNAME',
              domain: 'example.com',
              cname: 'updated-cdn.aliyuncs.com',
              dnsRecordId: 'dns-record-123',
            }),
          ]),
        }),
      );
      expect(mockedApigwOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should create missing www CDN distribution and modify primary during update', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
          {
            type: 'ALIYUN_CDN_DISTRIBUTION',
            id: 'example.com',
            domainName: 'example.com',
            cname: 'primary-cdn.aliyuncs.com',
          },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'dns-record-123',
            domain: 'example.com',
            cname: 'primary-cdn.aliyuncs.com',
            dnsRecordId: 'dns-record-123',
          },
        ],
        definition: {
          domain: {
            domainName: 'example.com',
            cdnEnabled: true,
            wwwBindApex: false,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
      });
      mockedCdnOperations.describeCdnDomainDetail
        .mockResolvedValueOnce({
          domainName: 'example.com',
          cname: 'primary-cdn.aliyuncs.com',
        })
        .mockResolvedValueOnce({
          domainName: 'www.example.com',
          cname: 'www-cdn.aliyuncs.com',
        });
      mockedDnsOperations.addDomainRecord.mockResolvedValue('dns-record-www');
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
        wwwBindApex: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: true,
          cdn: true,
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.modifyCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'example.com' }),
      );
      expect(mockedCdnOperations.addCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'www.example.com' }),
      );
      expect(mockedDnsOperations.addDomainRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          domainName: extractMainDomain('www.example.com'),
          rr: extractHostRecord('www.example.com', extractMainDomain('www.example.com')),
          type: 'CNAME',
          value: 'www-cdn.aliyuncs.com',
        }),
      );
      expect(mockedApigwOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should delete removed www CDN distribution during update when www_bind_apex is disabled', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
          {
            type: 'ALIYUN_CDN_DISTRIBUTION',
            id: 'example.com',
            domainName: 'example.com',
            cname: 'primary-cdn.aliyuncs.com',
          },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'dns-record-123',
            domain: 'example.com',
            cname: 'primary-cdn.aliyuncs.com',
            dnsRecordId: 'dns-record-123',
          },
          {
            type: 'ALIYUN_CDN_DISTRIBUTION',
            id: 'www.example.com',
            domainName: 'www.example.com',
            cname: 'www-cdn.aliyuncs.com',
          },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'dns-record-www',
            domain: 'www.example.com',
            cname: 'www-cdn.aliyuncs.com',
            dnsRecordId: 'dns-record-www',
          },
        ],
        definition: {
          domain: {
            domainName: 'example.com',
            cdnEnabled: true,
            wwwBindApex: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
      });
      mockedCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'example.com',
        cname: 'primary-cdn.aliyuncs.com',
      });
      mockedCdnOperations.deleteCdnDomain.mockResolvedValue(undefined);
      mockedDnsOperations.deleteDomainRecord.mockResolvedValue(undefined);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
        wwwBindApex: false,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: false,
          cdn: true,
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.modifyCdnDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'example.com' }),
      );
      expect(mockedCdnOperations.deleteCdnDomain).toHaveBeenCalledWith('www.example.com');
      expect(mockedDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('dns-record-www');
      expect(mockedCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockedApigwOperations.bindCustomDomain).not.toHaveBeenCalled();
    });

    it('should track CDN instances with domain fallback id during update', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedCdnOperations.addCdnDomain.mockResolvedValue(undefined);
      mockedCdnOperations.describeCdnDomainDetail.mockResolvedValue({
        domainName: 'example.com',
        cname: 'update-fallback-cdn.aliyuncs.com',
      });
      mockedCdnOperations.applyCacheConfig.mockResolvedValue(undefined);
      mockedDnsOperations.addDomainRecord.mockResolvedValue('');
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          www_bind_apex: false,
          cdn: {
            enabled: true,
            ignore_query_string: false,
          },
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.applyCacheConfig).toHaveBeenCalledWith(
        'example.com',
        undefined,
        false,
      );
      expect(mockedStateManager.setResource).toHaveBeenLastCalledWith(
        expect.anything(),
        'events.api_gateway',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              type: 'ALIYUN_CDN_DISTRIBUTION',
              id: 'example.com',
              domainName: 'example.com',
              cname: 'update-fallback-cdn.aliyuncs.com',
            }),
            expect.objectContaining({
              type: 'ALIYUN_CDN_DNS_CNAME',
              id: 'example.com',
              domain: 'example.com',
              cname: 'update-fallback-cdn.aliyuncs.com',
              dnsRecordId: undefined,
            }),
          ]),
        }),
      );
    });

    it('should delete CDN resources when removing CDN-backed domain', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
          { type: 'ALIYUN_CDN_DISTRIBUTION', id: 'example.com', domainName: 'example.com' },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'dns-record-123',
            domain: 'example.com',
            dnsRecordId: 'dns-record-123',
          },
        ],
        definition: {
          domain: {
            domainName: 'example.com',
            cdnEnabled: true,
            wwwBindApex: false,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);
      mockedCdnOperations.deleteCdnDomain.mockResolvedValue(undefined);
      mockedDnsOperations.deleteDomainRecord.mockResolvedValue(undefined);

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

      expect(mockedCdnOperations.deleteCdnDomain).toHaveBeenCalledWith('example.com');
      expect(mockedDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('dns-record-123');
      expect(mockedApigwOperations.unbindCustomDomain).not.toHaveBeenCalled();
    });

    it('should create primary and www CDN distributions with advanced settings during update', async () => {
      setupBasicUpdateMocks();
      setupCdnMocks('multi-cdn.aliyuncs.com');
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
        subDomain: 'group-123.apigw.aliyuncs.com',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        wwwBindApex: true,
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          certificate_body: 'cert-body',
          certificate_private_key: 'cert-key',
          www_bind_apex: true,
          cdn: {
            enabled: true,
            cdn_type: 'video',
            scope: 'overseas',
            cache_ttl: 120,
            ignore_query_string: true,
            origin_protocol: 'follow',
            compression: false,
            force_redirect_https: false,
          },
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.addCdnDomain).toHaveBeenCalledTimes(2);
      expect(mockedCdnOperations.addCdnDomain).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          domainName: 'example.com',
          cdnType: 'video',
          scope: 'overseas',
        }),
      );
      expect(mockedCdnOperations.addCdnDomain).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          domainName: 'www.example.com',
          cdnType: 'video',
          scope: 'overseas',
        }),
      );
      expect(mockedCdnOperations.applyProtocolConfig).toHaveBeenCalledWith('example.com', 'follow');
      expect(mockedCdnOperations.applyProtocolConfig).toHaveBeenCalledWith(
        'www.example.com',
        'follow',
      );
      expect(mockedCdnOperations.applyCompression).toHaveBeenCalledWith('example.com', false);
      expect(mockedCdnOperations.applyCompression).toHaveBeenCalledWith('www.example.com', false);
      expect(mockedCdnOperations.applyHttpsRedirect).toHaveBeenCalledWith('example.com', false);
      expect(mockedCdnOperations.applyHttpsRedirect).toHaveBeenCalledWith('www.example.com', false);
      expect(mockedDnsOperations.addDomainRecord).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          domainName: extractMainDomain('example.com'),
          rr: extractHostRecord('example.com', extractMainDomain('example.com')),
          type: 'CNAME',
          value: 'multi-cdn.aliyuncs.com',
        }),
      );
      expect(mockedDnsOperations.addDomainRecord).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          domainName: extractMainDomain('www.example.com'),
          rr: extractHostRecord('www.example.com', extractMainDomain('www.example.com')),
          type: 'CNAME',
          value: 'multi-cdn.aliyuncs.com',
        }),
      );
    });

    it('should clean up only matching previous CDN resources when switching to direct binding', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
          { type: 'ALIYUN_CDN_DISTRIBUTION', id: 'example.com', domainName: 'example.com' },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'dns-record-1',
            domain: 'example.com',
            cname: 'cdn.example.com',
            dnsRecordId: 'dns-record-1',
          },
          { type: 'ALIYUN_CDN_DISTRIBUTION', id: 'www.example.com', domainName: 'www.example.com' },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'dns-record-2',
            domain: 'www.example.com',
            cname: 'cdn.example.com',
            dnsRecordId: 'dns-record-2',
          },
          { type: 'ALIYUN_CDN_DISTRIBUTION', id: 'other.com', domainName: 'other.com' },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'dns-record-other',
            domain: 'other.com',
            cname: 'cdn.other.com',
            dnsRecordId: 'dns-record-other',
          },
        ],
        definition: {
          domain: {
            domainName: 'example.com',
            wwwBindApex: true,
            cdnEnabled: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedCdnOperations.deleteCdnDomain.mockResolvedValue(undefined);
      mockedDnsOperations.deleteDomainRecord.mockResolvedValue(undefined);
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        wwwBindApex: false,
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

      expect(mockedCdnOperations.deleteCdnDomain).toHaveBeenCalledWith('example.com');
      expect(mockedCdnOperations.deleteCdnDomain).toHaveBeenCalledWith('www.example.com');
      expect(mockedCdnOperations.deleteCdnDomain).not.toHaveBeenCalledWith('other.com');
      expect(mockedDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('dns-record-1');
      expect(mockedDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('dns-record-2');
      expect(mockedDnsOperations.deleteDomainRecord).not.toHaveBeenCalledWith('dns-record-other');
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'example.com' }),
        expect.anything(),
        expect.anything(),
      );
      expect(mockedApigwOperations.unbindCustomDomain).not.toHaveBeenCalled();
    });

    it('should propagate CDN deletion failure during update', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
          { type: 'ALIYUN_CDN_DISTRIBUTION', id: 'example.com', domainName: 'example.com' },
          {
            type: 'ALIYUN_CDN_DNS_CNAME',
            id: 'example.com',
            domain: 'example.com',
            cname: 'cdn.example.com',
          },
        ],
        definition: {
          domain: {
            domainName: 'example.com',
            wwwBindApex: false,
            cdnEnabled: true,
          },
        },
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedCdnOperations.deleteCdnDomain.mockRejectedValue(new Error('cdn delete failed'));
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

      await expect(
        updateApigwResource(mockContext, eventWithDomain, 'test-service', undefined, initialState),
      ).rejects.toThrow('cdn delete failed');
      expect(mockedStateManager.setResource).not.toHaveBeenLastCalledWith(
        expect.anything(),
        'events.api_gateway',
        expect.objectContaining({ instances: expect.anything() }),
      );
    });

    it('should throw when CDN is enabled and group has no subDomain during update', async () => {
      setupBasicUpdateMocks();
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' },
        ],
        definition: {},
      };

      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-api-group',
      });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue({
        domainName: 'example.com',
        cdnEnabled: true,
      });

      const eventWithDomain: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'example.com',
          www_bind_apex: false,
          cdn: true,
        },
      };

      await expect(
        updateApigwResource(mockContext, eventWithDomain, 'test-service', undefined, initialState),
      ).rejects.toThrow('API Gateway group group-123 has no subDomain for CDN origin');
    });

    it('should bind directly during update when domain.cdn.enabled is false', async () => {
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
          cdn: {
            enabled: false,
          },
        },
      };

      await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        undefined,
        initialState,
      );

      expect(mockedCdnOperations.addCdnDomain).not.toHaveBeenCalled();
      expect(mockedApigwOperations.bindCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ domainName: 'example.com' }),
        expect.anything(),
        expect.anything(),
      );
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

    it('should propagate previous www domain unbind failure during update', async () => {
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

      await expect(
        updateApigwResource(mockContext, eventWithDomain, 'test-service', undefined, initialState),
      ).rejects.toThrow('unbind failed');
      expect(mockedStateManager.setResource).not.toHaveBeenCalled();
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

    it('should propagate unbind failure when removing old domain', async () => {
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

      await expect(
        updateApigwResource(mockContext, eventNoDomain, 'test-service', undefined, initialState),
      ).rejects.toThrow('unbind err');
      expect(mockedStateManager.setResource).not.toHaveBeenCalled();
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

    it('should propagate www domain unbind failure during domain removal', async () => {
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

      await expect(
        updateApigwResource(mockContext, eventNoDomain, 'test-service', undefined, initialState),
      ).rejects.toThrow('www unbind failed');
      expect(mockedStateManager.setResource).not.toHaveBeenCalled();
    });

    it('should tolerate NOT-FOUND unbind error when removing old domain', async () => {
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
      mockedApigwOperations.unbindCustomDomain.mockRejectedValue({ code: 'NotFoundDomain' });

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

      expect(mockedStateManager.setResource).toHaveBeenCalled();
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

  describe('additional branch coverage', () => {
    it('should reject an already-existing unowned group after create conflict', async () => {
      mockedApigwOperations.findApiGroupByName
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ groupId: 'group-foreign', groupName: 'test-api-group', tags: [] });
      mockedApigwOperations.createApiGroup.mockRejectedValue(
        Object.assign(new Error('already exists'), { code: 'RepeatedCommit' }),
      );
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({ groupName: 'test-api-group' });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({ apiName: 'test-api' });
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await expect(
        createApigwResource(mockContext, testEvent, 'test-service', undefined, initialState),
      ).rejects.toBeInstanceOf(PartialResourceError);
      expect(mockedApigwOperations.createApi).not.toHaveBeenCalled();
    });

    it('should recover an existing state without a group instance from the cloud', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_API', id: 'api-456', apiName: 'test-api' }],
        definition: {},
      };
      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'group-cloud',
        groupName: 'test-api-group',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.api_gateway' }],
      });
      mockedApigwOperations.listApisByGroup.mockResolvedValue([
        { apiId: 'api-cloud', apiName: 'test-api' },
      ]);
      mockedApigwOperations.updateApiGroup.mockResolvedValue(undefined);
      mockedApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-cloud',
        groupName: 'test-api-group',
      });
      mockedApigwOperations.getApi.mockResolvedValue({ apiId: 'api-cloud', apiName: 'test-api' });
      mockedApigwOperations.updateApi.mockResolvedValue(undefined);
      mockedApigwOperations.deployApi.mockResolvedValue(undefined);
      mockedApigwTypes.eventToApigwGroupConfig.mockReturnValue({ groupName: 'test-api-group' });
      mockedApigwTypes.extractApigwGroupDefinition.mockReturnValue({});
      mockedApigwTypes.triggerToApigwApiConfig.mockReturnValue({ apiName: 'test-api' });
      mockedApigwTypes.generateApiKey.mockReturnValue('GET_/api/hello');
      mockedApigwTypes.extractEventDomainDefinition.mockReturnValue(null);

      await updateApigwResource(mockContext, testEvent, 'test-service', undefined, initialState);

      expect(mockedApigwOperations.listApisByGroup).toHaveBeenCalledWith('group-cloud');
      expect(mockedStateManager.setResource).toHaveBeenCalled();
    });

    it('should propagate a non-not-found CDN DNS cleanup failure', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          { type: 'ALIYUN_CDN_DNS_CNAME', id: 'dns-123', dnsRecordId: 'dns-123' },
        ],
        definition: { domain: { domainName: 'example.com', cdnEnabled: true } },
      };
      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedCdnOperations.deleteCdnDomain.mockResolvedValue(undefined);
      mockedDnsOperations.deleteDomainRecord.mockRejectedValue(new Error('DNS access denied'));

      await expect(
        deleteApigwResource(mockContext, 'events.api_gateway', initialState),
      ).rejects.toThrow('DNS access denied');
    });

    it('should tolerate not-found domain and deployment cleanup errors', async () => {
      const existingState = {
        instances: [
          { type: 'ALIYUN_APIGW_GROUP', id: 'group-123' },
          {
            type: 'ALIYUN_APIGW_DEPLOYMENT',
            groupId: 'group-123',
            apiId: 'api-456',
            stageName: 'RELEASE',
          },
        ],
        definition: {
          domain: { domainName: 'example.com', wwwBindApex: true },
        },
      };
      mockedStateManager.getResource.mockReturnValue(existingState);
      mockedApigwOperations.unbindCustomDomain.mockRejectedValue({ code: 'NotFoundDomain' });
      mockedApigwOperations.abolishApi.mockRejectedValue({ code: 'NotFoundDeployment' });
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', initialState);

      expect(mockedStateManager.removeResource).toHaveBeenCalled();
    });

    it('should delete additional domain-specific DNS state keys', async () => {
      const existingState = {
        instances: [{ type: 'ALIYUN_APIGW_GROUP', id: 'group-123' }],
        definition: {},
      };
      mockedStateManager.getResource
        .mockReturnValueOnce(existingState)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce({ instances: [{ id: 'dns-extra' }], definition: {} });
      mockedDnsOperations.deleteDomainRecord.mockResolvedValue(undefined);
      mockedApigwOperations.deleteApiGroup.mockResolvedValue(undefined);

      await deleteApigwResource(mockContext, 'events.api_gateway', {
        ...initialState,
        resources: {
          'events.api_gateway.dns_custom.example.com': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {},
            instances: [{ id: 'dns-extra', sid: 'dns-extra' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      });

      expect(mockedDnsOperations.deleteDomainRecord).toHaveBeenCalledWith('dns-extra');
    });
  });
});
