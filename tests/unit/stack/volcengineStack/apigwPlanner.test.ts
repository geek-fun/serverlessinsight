import { generateApigwPlan } from '../../../../src/stack/volcengineStack/apigwPlanner';
import { getContext } from '../../../../src/common';
import type { Context, EventDomain, StateFile } from '../../../../src/types';

jest.mock('../../../../src/common', () => ({
  getContext: jest.fn(),
  buildSid: (provider: string, service: string, stage: string, id: string) =>
    `${provider}:${service}:${stage}:${id}`,
}));

jest.mock('../../../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(() => ({
    apigw: {
      createGateway: jest.fn(),
      getGateway: jest.fn().mockResolvedValue({
        gatewayId: 'gateway-123',
        gatewayName: 'test-gateway',
        protocol: 'HTTP',
        status: 'Running',
      }),
      findGatewayByName: jest.fn().mockResolvedValue(null),
      updateGateway: jest.fn(),
      deleteGateway: jest.fn(),
    },
  })),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getResource: jest.fn((state, logicalId) => state.resources?.[logicalId] || null),
  getAllResources: jest.fn((state) => state.resources || {}),
}));

jest.mock('../../../../src/common/hashUtils', () => ({
  attributesEqual: jest.fn(() => false),
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('apigwPlanner', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: 'volcengine' as Context['provider'],
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
    (getContext as jest.Mock).mockReturnValue(mockContext);
  });

  describe('generateApigwPlan', () => {
    it('should return empty plan when no events', async () => {
      const result = await generateApigwPlan(mockContext, mockState, [], 'test-service');
      expect(result.items).toEqual([]);
    });

    it('should return empty plan when events is undefined', async () => {
      const result = await generateApigwPlan(mockContext, mockState, undefined, 'test-service');
      expect(result.items).toEqual([]);
    });

    it('should generate create plan for new event', async () => {
      const result = await generateApigwPlan(mockContext, mockState, [mockEvent], 'test-service');

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('create');
      expect(result.items[0].resourceType).toBe('VOLCENGINE_APIGW');
    });

    it('should generate update plan for drifted resource', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          getGateway: jest.fn().mockResolvedValue({
            gatewayId: 'gateway-123',
            gatewayName: 'test-gateway',
          }),
          findGatewayByName: jest.fn().mockResolvedValue({
            gatewayId: 'existing-gateway',
            gatewayName: 'test-service-dev-apigw',
          }),
        },
      });

      const result = await generateApigwPlan(mockContext, mockState, [mockEvent], 'test-service');

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('update');
      expect(result.items[0].drifted).toBe(true);
    });

    it('should generate delete plan for removed events', async () => {
      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.old_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              groupName: 'old-gateway',
            },
            instances: [],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await generateApigwPlan(
        mockContext,
        stateWithResource,
        [mockEvent],
        'test-service',
      );

      expect(result.items).toHaveLength(2);
      const deleteItem = result.items.find((item) => item.action === 'delete');
      expect(deleteItem).toBeDefined();
      expect(deleteItem?.logicalId).toBe('events.old_gateway');
    });

    it('should generate noop plan when no changes', async () => {
      const { attributesEqual } = jest.requireMock('../../../../src/common/hashUtils');
      attributesEqual.mockReturnValue(true);

      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              groupName: 'test-gateway',
              triggers: [
                { method: 'GET', path: '/api/test', backend: '${functions.test_function}' },
              ],
            },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await generateApigwPlan(
        mockContext,
        stateWithResource,
        [mockEvent],
        'test-service',
      );

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('noop');
    });

    it('should handle remote gateway not found', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          getGateway: jest.fn().mockResolvedValue(null),
          findGatewayByName: jest.fn().mockResolvedValue(null),
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
            },
            instances: [
              {
                type: 'VOLCENGINE_APIGW_GROUP',
                sid: 'volcengine:apigw:dev:gateway-123',
                id: 'gateway-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const result = await generateApigwPlan(
        mockContext,
        stateWithResource,
        [mockEvent],
        'test-service',
      );

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('create');
      expect(result.items[0].drifted).toBe(true);
    });

    it('should handle error when checking remote', async () => {
      const { createVolcengineClient } = jest.requireMock(
        '../../../../src/common/volcengineClient',
      );
      createVolcengineClient.mockReturnValueOnce({
        apigw: {
          findGatewayByName: jest.fn().mockRejectedValue(new Error('Network error')),
        },
      });

      const result = await generateApigwPlan(mockContext, mockState, [mockEvent], 'test-service');

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('create');
    });
  });
});
