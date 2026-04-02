import {
  createApigwResource,
  readApigwResource,
  readApigwResourceByName,
  updateApigwResource,
  deleteApigwResource,
} from '../../../../src/stack/volcengineStack/apigwResource';
import { getContext, ProviderEnum } from '../../../../src/common';
import type { Context, EventDomain, StateFile } from '../../../../src/types';

jest.mock('../../../../src/common', () => ({
  getContext: jest.fn(),
  buildSid: (provider: string, service: string, stage: string, id: string) =>
    `${provider}:${service}:${stage}:${id}`,
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
  ProviderEnum: {
    HUAWEI: 'huawei',
    ALIYUN: 'aliyun',
    TENCENT: 'tencent',
    AWS: 'aws',
    VOLCENGINE: 'volcengine',
  },
  getIacDefinition: jest.fn((iac, ref) => {
    if (ref === '${functions.test_function}') {
      return { name: 'test-function' };
    }
    return null;
  }),
  isFunctionDomain: jest.fn((obj) => obj && typeof obj.name === 'string'),
}));

jest.mock('../../../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(() => ({
    apigw: {
      createGateway: jest.fn().mockResolvedValue({
        gatewayId: 'gateway-123',
        gatewayName: 'test-gateway',
      }),
      getGateway: jest.fn().mockResolvedValue({
        gatewayId: 'gateway-123',
        gatewayName: 'test-gateway',
        protocol: 'HTTP',
        status: 'Running',
        createdTime: '2024-01-01T00:00:00Z',
      }),
      findGatewayByName: jest.fn().mockResolvedValue(null),
      updateGateway: jest.fn().mockResolvedValue(undefined),
      deleteGateway: jest.fn().mockResolvedValue(undefined),
      createApi: jest.fn().mockResolvedValue('api-123'),
      getApi: jest.fn().mockResolvedValue({
        apiId: 'api-123',
        apiName: 'test-api',
        gatewayId: 'gateway-123',
        method: 'GET',
        path: '/api/test',
        backendFunctionName: 'test-function',
      }),
      updateApi: jest.fn().mockResolvedValue(undefined),
      deleteApi: jest.fn().mockResolvedValue(undefined),
      deployApi: jest.fn().mockResolvedValue(undefined),
      bindDomain: jest.fn().mockResolvedValue(undefined),
      unbindDomain: jest.fn().mockResolvedValue(undefined),
    },
  })),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  setResource: jest.fn((state, logicalId, resourceState) => ({
    ...state,
    resources: {
      ...state.resources,
      [logicalId]: resourceState,
    },
  })),
  getResource: jest.fn((state, logicalId) => state.resources?.[logicalId] || null),
  removeResource: jest.fn((state, logicalId) => {
    const newResources = { ...state.resources };
    delete newResources[logicalId];
    return { ...state, resources: newResources };
  }),
  getAllResources: jest.fn((state) => state.resources || {}),
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('apigwResource', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: ProviderEnum.VOLCENGINE,
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockEvent: EventDomain = {
    key: 'api_gateway',
    name: 'test-gateway',
    type: 'API_GATEWAY',
    triggers: [
      {
        method: 'GET',
        path: '/api/test',
        backend: '${functions.test_function}',
      },
    ],
  };

  const mockState: StateFile = {
    version: '1.0',
    provider: 'volcengine',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getContext as jest.Mock).mockReturnValue({
      ...mockContext,
      iac: {
        functions: {
          test_function: {
            name: 'test-function',
          },
        },
      },
    });
  });

  describe('createApigwResource', () => {
    it('should create API Gateway resource successfully', async () => {
      const result = await createApigwResource(mockContext, mockEvent, 'test-service', mockState);

      expect(result).toBeDefined();
    });

    it('should create gateway via catch block when findGatewayByName throws', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          findGatewayByName: jest.fn().mockRejectedValue(new Error('Network error')),
          createGateway: jest.fn().mockResolvedValue({ gatewayId: 'new-gateway-456' }),
          getGateway: jest.fn().mockResolvedValue({
            gatewayId: 'new-gateway-456',
            gatewayName: 'test-gateway',
            protocol: 'HTTP',
            status: 'Running',
          }),
          createApi: jest.fn().mockResolvedValue('api-123'),
          getApi: jest
            .fn()
            .mockResolvedValue({ apiId: 'api-123', method: 'GET', path: '/api/test' }),
          deployApi: jest.fn().mockResolvedValue(undefined),
          bindDomain: jest.fn().mockResolvedValue(undefined),
        },
      });

      const result = await createApigwResource(mockContext, mockEvent, 'test-service', mockState);

      expect(result).toBeDefined();
    });

    it('should throw when getGateway returns null after creation', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          findGatewayByName: jest.fn().mockResolvedValue(null),
          createGateway: jest.fn().mockResolvedValue({ gatewayId: 'gateway-123' }),
          getGateway: jest.fn().mockResolvedValue(null),
        },
      });

      await expect(
        createApigwResource(mockContext, mockEvent, 'test-service', mockState),
      ).rejects.toThrow('Failed to get API Gateway info after creation');
    });

    it('should reuse existing gateway if found', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          createGateway: jest.fn().mockResolvedValue({
            gatewayId: 'gateway-123',
          }),
          getGateway: jest.fn().mockResolvedValue({
            gatewayId: 'gateway-123',
            gatewayName: 'test-gateway',
            protocol: 'HTTP',
          }),
          findGatewayByName: jest.fn().mockResolvedValue({
            gatewayId: 'existing-gateway',
            gatewayName: 'test-gateway',
          }),
          createApi: jest.fn().mockResolvedValue('api-123'),
          getApi: jest.fn().mockResolvedValue({
            apiId: 'api-123',
            method: 'GET',
            path: '/api/test',
          }),
          deployApi: jest.fn().mockResolvedValue(undefined),
          bindDomain: jest.fn().mockResolvedValue(undefined),
        },
      });

      const result = await createApigwResource(mockContext, mockEvent, 'test-service', mockState);

      expect(result).toBeDefined();
    });

    it('should handle domain binding', async () => {
      const eventWithDomain: EventDomain = {
        ...mockEvent,
        domain: {
          domain_name: 'api.example.com',
          certificate_id: 'cert-123',
        },
      };

      const result = await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        mockState,
      );

      expect(result).toBeDefined();
    });

    it('should handle domain binding failure gracefully', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          createGateway: jest.fn().mockResolvedValue({ gatewayId: 'gateway-123' }),
          getGateway: jest.fn().mockResolvedValue({
            gatewayId: 'gateway-123',
            gatewayName: 'test-gateway',
          }),
          findGatewayByName: jest.fn().mockResolvedValue(null),
          createApi: jest.fn().mockResolvedValue('api-123'),
          getApi: jest.fn().mockResolvedValue({ apiId: 'api-123' }),
          deployApi: jest.fn().mockResolvedValue(undefined),
          bindDomain: jest.fn().mockRejectedValue(new Error('Domain binding failed')),
        },
      });

      const eventWithDomain: EventDomain = {
        ...mockEvent,
        domain: {
          domain_name: 'api.example.com',
        },
      };

      const result = await createApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        mockState,
      );

      expect(result).toBeDefined();
    });
  });

  describe('readApigwResource', () => {
    it('should read API Gateway resource', async () => {
      const result = await readApigwResource(mockContext, 'gateway-123');
      expect(result).toBeDefined();
    });
  });

  describe('readApigwResourceByName', () => {
    it('should read API Gateway resource by name', async () => {
      const result = await readApigwResourceByName(mockContext, 'test-gateway');
      expect(result).toBeDefined();
    });
  });

  describe('updateApigwResource', () => {
    it('should create resource if state not found', async () => {
      const result = await updateApigwResource(mockContext, mockEvent, 'test-service', mockState);
      expect(result).toBeDefined();
    });

    it('should fall back to createApigwResource when group instance not found in state', async () => {
      const stateWithNoGroupInstance: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_API',
                sid: 'volcengine:apigw:dev:api-123',
                id: 'api-123',
                apiId: 'api-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithNoGroupInstance,
      );
      expect(result).toBeDefined();
    });

    it('should throw when getGateway returns null after update', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          updateGateway: jest.fn().mockResolvedValue(undefined),
          getGateway: jest.fn().mockResolvedValue(null),
        },
      });

      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      await expect(
        updateApigwResource(mockContext, mockEvent, 'test-service', stateWithResource),
      ).rejects.toThrow('Failed to get API Gateway info after update');
    });

    it('should bind domain when event has domain in update', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      const mockBindDomain = jest.fn().mockResolvedValue(undefined);
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          updateGateway: jest.fn().mockResolvedValue(undefined),
          getGateway: jest.fn().mockResolvedValue({
            gatewayId: 'gateway-123',
            gatewayName: 'test-gateway',
          }),
          createApi: jest.fn().mockResolvedValue('api-123'),
          getApi: jest
            .fn()
            .mockResolvedValue({ apiId: 'api-123', method: 'GET', path: '/api/test' }),
          updateApi: jest.fn().mockResolvedValue(undefined),
          deleteApi: jest.fn().mockResolvedValue(undefined),
          deployApi: jest.fn().mockResolvedValue(undefined),
          bindDomain: mockBindDomain,
          unbindDomain: jest.fn().mockResolvedValue(undefined),
        },
      });

      const eventWithDomain: EventDomain = {
        ...mockEvent,
        domain: {
          domain_name: 'api.example.com',
          certificate_id: 'cert-123',
        },
      };

      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await updateApigwResource(
        mockContext,
        eventWithDomain,
        'test-service',
        stateWithResource,
      );
      expect(result).toBeDefined();
      expect(mockBindDomain).toHaveBeenCalled();
    });

    it('should update existing resource', async () => {
      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              groupName: 'test-gateway',
            },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithResource,
      );
      expect(result).toBeDefined();
    });

    it('should update existing API', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          createGateway: jest.fn(),
          getGateway: jest.fn().mockResolvedValue({
            gatewayId: 'gateway-123',
            gatewayName: 'test-gateway',
          }),
          findGatewayByName: jest.fn(),
          updateGateway: jest.fn().mockResolvedValue(undefined),
          createApi: jest.fn().mockResolvedValue('new-api-123'),
          getApi: jest.fn().mockImplementation((gatewayId, apiId) => {
            if (apiId === 'api-123') {
              return Promise.resolve({
                apiId: 'api-123',
                apiName: 'test-service-dev-apigw-api-GET__api__test',
                gatewayId: 'gateway-123',
                method: 'GET',
                path: '/api/test',
                backendFunctionName: 'test-function',
              });
            }
            return Promise.resolve({ apiId, apiName: 'new-api-name' });
          }),
          updateApi: jest.fn().mockResolvedValue(undefined),
          deleteApi: jest.fn().mockResolvedValue(undefined),
          deployApi: jest.fn().mockResolvedValue(undefined),
          bindDomain: jest.fn().mockResolvedValue(undefined),
          unbindDomain: jest.fn().mockResolvedValue(undefined),
        },
      });

      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
              {
                type: 'VOLCENGINE_APIGW_API',
                sid: 'volcengine:apigw:dev:gateway-123/api-123',
                id: 'api-123',
                apiId: 'api-123',
                apiName: 'test-service-dev-apigw-api-GET__api__test',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithResource,
      );
      expect(result).toBeDefined();
    });

    it('should call updateApi when existing API matches trigger', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      const mockUpdateApi = jest.fn().mockResolvedValue(undefined);
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          createGateway: jest.fn(),
          getGateway: jest.fn().mockResolvedValue({
            gatewayId: 'gateway-123',
            gatewayName: 'test-gateway',
          }),
          findGatewayByName: jest.fn(),
          updateGateway: jest.fn().mockResolvedValue(undefined),
          createApi: jest.fn().mockResolvedValue('new-api-123'),
          getApi: jest.fn().mockResolvedValue({
            apiId: 'api-123',
            apiName: 'test-gateway-dev-api-GET-api--test',
            gatewayId: 'gateway-123',
            method: 'GET',
            path: '/api/test',
            backendFunctionName: 'test-function',
          }),
          updateApi: mockUpdateApi,
          deleteApi: jest.fn().mockResolvedValue(undefined),
          deployApi: jest.fn().mockResolvedValue(undefined),
          bindDomain: jest.fn().mockResolvedValue(undefined),
          unbindDomain: jest.fn().mockResolvedValue(undefined),
        },
      });

      const stateWithMatchingApi: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
              {
                type: 'VOLCENGINE_APIGW_API',
                sid: 'volcengine:apigw:dev:gateway-123/api-123',
                id: 'api-123',
                apiId: 'api-123',
                apiName: 'test-gateway-dev-api-GET-api--test',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithMatchingApi,
      );
      expect(result).toBeDefined();
      expect(mockUpdateApi).toHaveBeenCalledWith('api-123', expect.any(Object));
    });

    it('should delete unused APIs during update', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          createGateway: jest.fn(),
          getGateway: jest.fn().mockResolvedValue({
            gatewayId: 'gateway-123',
            gatewayName: 'test-gateway',
          }),
          findGatewayByName: jest.fn(),
          updateGateway: jest.fn().mockResolvedValue(undefined),
          createApi: jest.fn().mockResolvedValue('new-api-123'),
          getApi: jest.fn().mockImplementation((gatewayId, apiId) => {
            if (apiId === 'old-api-123') {
              return Promise.resolve({
                apiId: 'old-api-123',
                apiName: 'old-api-name',
                gatewayId: 'gateway-123',
              });
            }
            return Promise.resolve({ apiId, apiName: 'new-api-name' });
          }),
          updateApi: jest.fn().mockResolvedValue(undefined),
          deleteApi: jest.fn().mockResolvedValue(undefined),
          deployApi: jest.fn().mockResolvedValue(undefined),
          bindDomain: jest.fn().mockResolvedValue(undefined),
          unbindDomain: jest.fn().mockResolvedValue(undefined),
        },
      });

      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
              {
                type: 'VOLCENGINE_APIGW_API',
                sid: 'volcengine:apigw:dev:gateway-123/old-api-123',
                id: 'old-api-123',
                apiId: 'old-api-123',
                apiName: 'old-api-name',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithResource,
      );
      expect(result).toBeDefined();
    });

    it('should unbind domain during update if removed', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          createGateway: jest.fn(),
          getGateway: jest.fn().mockResolvedValue({
            gatewayId: 'gateway-123',
            gatewayName: 'test-gateway',
          }),
          findGatewayByName: jest.fn(),
          updateGateway: jest.fn().mockResolvedValue(undefined),
          createApi: jest.fn().mockResolvedValue('api-123'),
          getApi: jest.fn().mockResolvedValue({ apiId: 'api-123' }),
          updateApi: jest.fn().mockResolvedValue(undefined),
          deleteApi: jest.fn().mockResolvedValue(undefined),
          deployApi: jest.fn().mockResolvedValue(undefined),
          bindDomain: jest.fn().mockResolvedValue(undefined),
          unbindDomain: jest.fn().mockRejectedValue(new Error('Unbind failed')),
        },
      });

      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              groupName: 'test-gateway',
              domain: { domainName: 'old.example.com' },
            },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithResource,
      );
      expect(result).toBeDefined();
    });
  });

  describe('deleteApigwResource', () => {
    it('should remove resource from state when group instance not found', async () => {
      const stateWithNoGroup: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_API',
                sid: 'volcengine:apigw:dev:api-123',
                id: 'api-123',
                apiId: 'api-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await deleteApigwResource(mockContext, 'events.api_gateway', stateWithNoGroup);
      expect(result).toBeDefined();
    });

    it('should return state if resource not found', async () => {
      const result = await deleteApigwResource(mockContext, 'events.non_existent', mockState);
      expect(result).toEqual(mockState);
    });

    it('should delete API Gateway resource', async () => {
      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              groupName: 'test-gateway',
              domain: {
                domainName: 'api.example.com',
              },
            },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
              {
                type: 'VOLCENGINE_APIGW_API',
                sid: 'volcengine:apigw:dev:gateway-123/api-123',
                id: 'api-123',
                apiId: 'api-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await deleteApigwResource(
        mockContext,
        'events.api_gateway',
        stateWithResource,
      );
      expect(result).toBeDefined();
    });

    it('should handle delete with unbind domain failure', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          getGateway: jest.fn().mockResolvedValue({ gatewayId: 'gateway-123' }),
          unbindDomain: jest.fn().mockRejectedValue(new Error('Unbind failed')),
          deleteApi: jest.fn().mockResolvedValue(undefined),
          deleteGateway: jest.fn().mockResolvedValue(undefined),
        },
      });

      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              groupName: 'test-gateway',
              domain: { domainName: 'api.example.com' },
            },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await deleteApigwResource(
        mockContext,
        'events.api_gateway',
        stateWithResource,
      );
      expect(result).toBeDefined();
    });

    it('should handle delete with delete api failure', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          getGateway: jest.fn().mockResolvedValue({ gatewayId: 'gateway-123' }),
          unbindDomain: jest.fn().mockResolvedValue(undefined),
          deleteApi: jest.fn().mockRejectedValue(new Error('Delete API failed')),
          deleteGateway: jest.fn().mockResolvedValue(undefined),
        },
      });

      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
                gatewayId: 'gateway-123',
              },
              {
                type: 'VOLCENGINE_APIGW_API',
                sid: 'volcengine:apigw:dev:gateway-123/api-123',
                id: 'api-123',
                apiId: 'api-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await deleteApigwResource(
        mockContext,
        'events.api_gateway',
        stateWithResource,
      );
      expect(result).toBeDefined();
    });
  });
});
