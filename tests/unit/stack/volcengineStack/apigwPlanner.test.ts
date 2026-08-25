import { generateApigwPlan } from '../../../../src/stack/volcengineStack/apigwPlanner';
import { getContext } from '../../../../src/common';
import type { Context, EventDomain, StateFile } from '../../../../src/types';
import { ProviderEnum } from '../../../../src/common';

jest.mock('../../../../src/common', () => {
  const { ProviderEnum } = jest.requireActual('../../../../src/common/providerEnum');
  return {
    ProviderEnum,
    getContext: jest.fn(),
    buildSid: (provider: string, service: string, stage: string, id: string) =>
      `${provider}:${service}:${stage}:${id}`,
    getIacDefinition: jest.fn(),
    isFunctionDomain: jest.fn(),
    logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
  };
});

const mockClient = {
  apigw: {
    findGatewayByName: jest.fn(),
    findServerlessGateway: jest.fn(),
    getService: jest.fn(),
  },
};

jest.mock('../../../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(() => mockClient),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getResource: jest.fn((state, logicalId) => state.resources?.[logicalId] || null),
  getAllResources: jest.fn((state) => state.resources || {}),
}));

jest.mock('../../../../src/common/hashUtils', () => ({
  attributesEqual: jest.fn(() => false),
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

const mockContext: Context = {
  stage: 'dev',
  app: 'test-app',
  service: 'test-service',
  provider: ProviderEnum.VOLCENGINE,
  region: 'cn-beijing',
  accountId: '123456789012',
  accessKeyId: 'test-key',
  accessKeySecret: 'test-secret',
  iacLocation: 'test.yml',
  parameters: [],
  stages: {},
};

const mockEvent: EventDomain = {
  key: 'api_gateway',
  name: 'test-gw',
  type: 'API_GATEWAY',
  triggers: [
    { method: 'POST', path: '/graphql', backend: '${functions.api_function}' },
    { method: 'GET', path: '/health', backend: '${functions.api_function}' },
  ],
};

const emptyState: StateFile = {
  version: '3.0',
  provider: ProviderEnum.VOLCENGINE,
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

describe('apigwPlanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getContext as jest.Mock).mockReturnValue(mockContext);
    mockClient.apigw.findGatewayByName.mockResolvedValue(null);
    mockClient.apigw.findServerlessGateway.mockResolvedValue(null);
  });

  it('plans create for a new event with no local state', async () => {
    const plan = await generateApigwPlan(mockContext, emptyState, [mockEvent], 'test-service');

    expect(plan.items).toHaveLength(1);
    expect(plan.items[0]).toMatchObject({
      logicalId: 'events.api_gateway',
      action: 'create',
      resourceType: 'VOLCENGINE_APIGW',
    });
  });

  it('refuses to plan create when a foreign same-named gateway exists', async () => {
    mockClient.apigw.findGatewayByName.mockResolvedValue({
      gatewayId: 'gw-foreign',
      gatewayName: 'test-service-dev-apigw',
      tags: [],
    });

    await expect(
      generateApigwPlan(mockContext, emptyState, [mockEvent], 'test-service'),
    ).rejects.toThrow('not owned by this stack');
  });

  it('plans noop when state matches the desired definition', async () => {
    const stateWithEvent: StateFile = {
      ...emptyState,
      resources: {
        'events.api_gateway': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: {
            gatewayName: 'test-gw',
            triggers: [
              { method: 'POST', path: '/graphql', backend: '${functions.api_function}' },
              { method: 'GET', path: '/health', backend: '${functions.api_function}' },
            ],
          },
          instances: [
            {
              type: 'VOLCENGINE_APIGW_SERVICE',
              sid: 's',
              id: 'svc-1',
              serviceId: 'svc-1',
              gatewayId: 'gw-1',
            },
          ],
          lastUpdated: '2024-01-01T00:00:00Z',
          status: 'ready',
        },
      },
    };
    mockClient.apigw.getService.mockResolvedValue({ serviceId: 'svc-1', serviceName: 's' });
    // definition comparison — use the actual equality (triggers match => noop)
    const { attributesEqual } = jest.requireMock('../../../../src/common/hashUtils');
    (attributesEqual as jest.Mock).mockReturnValue(true);

    const plan = await generateApigwPlan(mockContext, stateWithEvent, [mockEvent], 'test-service');

    expect(plan.items[0].action).toBe('noop');
  });

  it('plans deletion for events removed from the config', async () => {
    const stateWithEvent: StateFile = {
      ...emptyState,
      resources: {
        'events.old_event': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: { gatewayName: 'old' },
          instances: [],
          lastUpdated: '2024-01-01T00:00:00Z',
          status: 'ready',
        },
      },
    };

    const plan = await generateApigwPlan(mockContext, stateWithEvent, undefined, 'test-service');

    expect(plan.items).toHaveLength(1);
    expect(plan.items[0]).toMatchObject({
      logicalId: 'events.old_event',
      action: 'delete',
    });
  });

  it('plans a drifted create when the recorded service is missing remotely', async () => {
    const stateWithEvent: StateFile = {
      ...emptyState,
      resources: {
        'events.api_gateway': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: { gatewayName: 'test-gw' },
          instances: [
            {
              type: 'VOLCENGINE_APIGW_SERVICE',
              sid: 's',
              id: 'svc-missing',
              serviceId: 'svc-missing',
              gatewayId: 'gw-1',
            },
          ],
          lastUpdated: '2024-01-01T00:00:00Z',
          status: 'ready',
        },
      },
    };
    mockClient.apigw.getService.mockResolvedValue(null);

    const plan = await generateApigwPlan(mockContext, stateWithEvent, [mockEvent], 'test-service');

    expect(plan.items[0]).toMatchObject({
      logicalId: 'events.api_gateway',
      action: 'create',
      drifted: true,
      changes: { before: { gatewayName: 'test-gw' } },
    });
  });

  it('plans update when the desired event definition changed', async () => {
    const stateWithEvent: StateFile = {
      ...emptyState,
      resources: {
        'events.api_gateway': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: { gatewayName: 'old-gateway' },
          instances: [],
          lastUpdated: '2024-01-01T00:00:00Z',
          status: 'ready',
        },
      },
    };
    const { attributesEqual } = jest.requireMock('../../../../src/common/hashUtils');
    (attributesEqual as jest.Mock).mockReturnValue(false);

    const plan = await generateApigwPlan(mockContext, stateWithEvent, [mockEvent], 'test-service');

    expect(plan.items[0]).toMatchObject({
      logicalId: 'events.api_gateway',
      action: 'update',
      changes: {
        before: { gatewayName: 'old-gateway' },
        after: { gatewayName: 'test-gw' },
      },
    });
  });

  it('deletes stale events while excluding non-event resources', async () => {
    const stateWithMixedResources: StateFile = {
      ...emptyState,
      resources: {
        'events.api_gateway': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: { gatewayName: 'test-gw' },
          instances: [],
          lastUpdated: '2024-01-01T00:00:00Z',
          status: 'ready',
        },
        'events.old_event': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: { gatewayName: 'old-gw' },
          instances: [],
          lastUpdated: '2024-01-01T00:00:00Z',
          status: 'ready',
        },
        'functions.api_function': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: { functionName: 'test-fn' },
          instances: [],
          lastUpdated: '2024-01-01T00:00:00Z',
          status: 'ready',
        },
      },
    };
    const { attributesEqual } = jest.requireMock('../../../../src/common/hashUtils');
    (attributesEqual as jest.Mock).mockReturnValue(true);

    const plan = await generateApigwPlan(
      mockContext,
      stateWithMixedResources,
      [mockEvent],
      'test-service',
    );

    expect(plan.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ logicalId: 'events.api_gateway', action: 'noop' }),
        expect.objectContaining({
          logicalId: 'events.old_event',
          action: 'delete',
          changes: { before: { gatewayName: 'old-gw' } },
        }),
      ]),
    );
    expect(plan.items).toHaveLength(2);
  });
});
