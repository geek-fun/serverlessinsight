import {
  createApigwResource,
  updateApigwResource,
  deleteApigwResource,
} from '../../../../src/stack/volcengineStack/apigwResource';
import { ProviderEnum } from '../../../../src/common';
import type { Context, EventDomain, StateFile } from '../../../../src/types';
import {
  setResource,
  getResource,
  removeResource,
  setSharedResource,
} from '../../../../src/common/stateManager';

jest.mock('../../../../src/common', () => {
  const actual = jest.requireActual('../../../../src/common');
  return {
    ...actual,
    buildSid: jest.fn((provider, resource, stage, id) => `${provider}-${resource}-${stage}-${id}`),
    getContext: jest.fn(() => ({
      app: 'test-app',
      service: 'test-service',
      stage: 'dev',
    })),
  };
});

const mockClient = {
  apigw: {
    createGateway: jest.fn(),
    getGateway: jest.fn(),
    findGatewayByName: jest.fn(),
    findServerlessGateway: jest.fn(),
    waitForGatewayRunning: jest.fn((_id: string) =>
      Promise.resolve({ gatewayId: _id, gatewayName: 'gw', type: 'serverless', status: 'Running' }),
    ),
    updateGateway: jest.fn(),
    deleteGateway: jest.fn(),
    createService: jest.fn(),
    getService: jest.fn(),
    findServiceByName: jest.fn(),
    deleteService: jest.fn(),
    createUpstream: jest.fn(),
    getUpstream: jest.fn(),
    findUpstreamByName: jest.fn(),
    deleteUpstream: jest.fn(),
    createRoute: jest.fn(),
    getRoute: jest.fn(),
    findRouteByName: jest.fn(),
    listRoutesByService: jest.fn(),
    deleteRoute: jest.fn(),
    createCustomDomain: jest.fn(),
    deleteCustomDomain: jest.fn(),
    updateGatewayLog: jest.fn(),
  },
  tls: {
    createProject: jest.fn(),
    createTopic: jest.fn(),
    getTopic: jest.fn(),
    createIndex: jest.fn(),
    waitForProject: jest.fn(),
    waitForTopic: jest.fn(),
    deleteTopic: jest.fn(),
    deleteIndex: jest.fn(),
    deleteProject: jest.fn(),
    addTags: jest.fn(),
    removeTags: jest.fn(),
    listTopics: jest.fn(),
  },
};

jest.mock('../../../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(() => mockClient),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  setResource: jest.fn((state, logicalId, resourceState) => ({
    ...state,
    resources: { ...state.resources, [logicalId]: resourceState },
  })),
  getResource: jest.fn((state, logicalId) => state.resources?.[logicalId] || null),
  removeResource: jest.fn((state, logicalId) => {
    const newResources = { ...state.resources };
    delete newResources[logicalId];
    return { ...state, resources: newResources };
  }),
  getAllResources: jest.fn((state) => state.resources || {}),
  setSharedResource: jest.fn((state, stage, key, resourceState) => ({
    ...state,
    stages: {
      ...state.stages,
      [stage]: {
        ...state.stages?.[stage],
        resources: state.stages?.[stage]?.resources ?? {},
        shared: { ...state.stages?.[stage]?.shared, [key]: resourceState },
      },
    },
  })),
  getSharedResource: jest.fn((state, stage, key) => state.stages?.[stage]?.shared?.[key]),
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
  network: { vpc_id: 'vpc-1', subnet_ids: ['subnet-a', 'subnet-b'] },
  triggers: [
    { method: 'POST', path: '/graphql', backend: '${functions.api_function}' },
    { method: 'GET', path: '/health', backend: '${functions.api_function}' },
  ],
};

// State that already has the deployed veFaaS function (functionId in state).
const stateWithFunction: StateFile = {
  version: '3.0',
  provider: 'volcengine',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {
    'functions.api_function': {
      mode: 'managed',
      region: 'cn-beijing',
      definition: { functionName: 'test-fn' },
      instances: [
        {
          type: 'VOLCENGINE_VEFAAS_FUNCTION',
          sid: 's',
          id: 'fn-abc',
          functionId: 'fn-abc',
          functionName: 'test-fn',
        },
      ],
      lastUpdated: '2024-01-01T00:00:00Z',
      status: 'ready',
    },
  },
};

describe('apigwResource', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (setResource as jest.Mock).mockClear();
    (getResource as jest.Mock).mockClear();
    (removeResource as jest.Mock).mockClear();
    // default happy path
    mockClient.apigw.findServerlessGateway.mockResolvedValue(null);
    mockClient.apigw.findGatewayByName.mockResolvedValue(null);
    mockClient.apigw.createGateway.mockResolvedValue({
      gatewayId: 'gw-1',
      gatewayName: 'test-gw-dev-apigw',
      type: 'serverless',
    });
    mockClient.apigw.findServiceByName.mockResolvedValue(null);
    mockClient.apigw.createService.mockResolvedValue('svc-1');
    mockClient.apigw.getService.mockResolvedValue({
      serviceId: 'svc-1',
      serviceName: 'test-gw-dev-service',
      gatewayId: 'gw-1',
      status: 'Running',
      protocol: ['HTTP'],
      createdTime: '2026-01-01T00:00:00Z',
    });
    mockClient.apigw.findUpstreamByName.mockResolvedValue(null);
    mockClient.apigw.createUpstream.mockResolvedValue('up-1');
    mockClient.apigw.getUpstream.mockResolvedValue({
      upstreamId: 'up-1',
      upstreamName: 'u',
      gatewayId: 'gw-1',
      status: 'Available',
      sourceType: 'VeFaas',
      protocol: 'HTTP',
      functionId: 'fn-abc',
      createdTime: '2026-01-01T00:00:00Z',
    });
    mockClient.apigw.createRoute.mockResolvedValue('route-1');
  });

  describe('createApigwResource', () => {
    it('creates a serverless gateway, service, upstream and routes', async () => {
      const result = await createApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithFunction,
      );

      expect(mockClient.apigw.createGateway).toHaveBeenCalledWith(
        expect.objectContaining({
          gatewayName: 'test-service-dev-apigw',
          type: 'serverless',
          network: { vpcId: 'vpc-1', subnetIds: ['subnet-a', 'subnet-b'] },
        }),
      );
      expect(mockClient.apigw.createService).toHaveBeenCalledWith(
        expect.objectContaining({ gatewayId: 'gw-1', serviceName: 'test-gw-dev-service' }),
      );
      expect(mockClient.apigw.createUpstream).toHaveBeenCalledWith(
        expect.objectContaining({
          gatewayId: 'gw-1',
          sourceType: 'VeFaas',
          functionId: 'fn-abc',
        }),
      );
      // one upstream for the shared function + two routes
      expect(mockClient.apigw.createUpstream).toHaveBeenCalledTimes(1);
      expect(mockClient.apigw.createRoute).toHaveBeenCalledTimes(2);

      const saved = result.resources['events.api_gateway'];
      expect(saved.status).toBe('ready');
      const types = saved.instances.map((i) => (i as unknown as { type: string }).type);
      expect(types).toContain('VOLCENGINE_APIGW_GATEWAY');
      expect(types).toContain('VOLCENGINE_APIGW_SERVICE');
      expect(types).toContain('VOLCENGINE_APIGW_UPSTREAM');
      expect(types).toContain('VOLCENGINE_APIGW_ROUTE');
    });

    it('retains the full provider detail set on gateway/service/upstream/route instances', async () => {
      (mockClient.apigw.waitForGatewayRunning as jest.Mock).mockResolvedValue({
        gatewayId: 'gw-1',
        gatewayName: 'test-gw-dev-apigw',
        type: 'serverless',
        status: 'Running',
        createdTime: '2026-01-01T00:00:00Z',
        description: 'gateway comments',
        message: 'ok',
        region: 'cn-beijing',
        tags: [{ Key: 'si-owned-by', Value: 'v' }],
        networkSpec: { vpcId: 'vpc-1', subnetIds: ['subnet-a', 'subnet-b'] },
        resourceSpec: {
          replicas: 1,
          instanceSpecCode: 'small',
          clbSpecCode: 'clb',
          publicNetworkBillingType: 'traffic',
          publicNetworkBandwidth: 5,
          networkType: { enablePublicNetwork: true, enablePrivateNetwork: false },
        },
      });

      const result = await createApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithFunction,
      );
      const saved = result.resources['events.api_gateway'];

      const gateway = saved.instances.find((i) => i.type === 'VOLCENGINE_APIGW_GATEWAY');
      expect(gateway).toEqual(
        expect.objectContaining({
          gatewayType: 'serverless',
          status: 'Running',
          createdTime: '2026-01-01T00:00:00Z',
          description: 'gateway comments',
          message: 'ok',
          region: 'cn-beijing',
          tags: [{ Key: 'si-owned-by', Value: 'v' }],
          networkSpec: { vpcId: 'vpc-1', subnetIds: ['subnet-a', 'subnet-b'] },
          resourceSpec: {
            replicas: 1,
            instanceSpecCode: 'small',
            clbSpecCode: 'clb',
            publicNetworkBillingType: 'traffic',
            publicNetworkBandwidth: 5,
            networkType: { enablePublicNetwork: true, enablePrivateNetwork: false },
          },
        }),
      );

      const service = saved.instances.find((i) => i.type === 'VOLCENGINE_APIGW_SERVICE');
      expect(service).toEqual(
        expect.objectContaining({
          serviceId: 'svc-1',
          status: 'Running',
          protocol: ['HTTP'],
          createdTime: '2026-01-01T00:00:00Z',
        }),
      );
      // The full service record is refreshed after create/adopt.
      expect(mockClient.apigw.getService).toHaveBeenCalledWith('svc-1');

      const upstream = saved.instances.find((i) => i.type === 'VOLCENGINE_APIGW_UPSTREAM');
      expect(upstream).toEqual(
        expect.objectContaining({
          upstreamId: 'up-1',
          status: 'Available',
          sourceType: 'VeFaas',
          protocol: 'HTTP',
          createdTime: '2026-01-01T00:00:00Z',
        }),
      );
      expect(mockClient.apigw.getUpstream).toHaveBeenCalledWith('up-1');

      const routes = saved.instances.filter((i) => i.type === 'VOLCENGINE_APIGW_ROUTE');
      expect(routes).toHaveLength(2);
      for (const route of routes) {
        expect(route).toEqual(
          expect.objectContaining({
            method: expect.any(String),
            path: expect.any(String),
            upstreamIds: ['up-1'],
          }),
        );
      }
    });

    it('reuses an existing serverless gateway instead of creating one', async () => {
      mockClient.apigw.findServerlessGateway.mockResolvedValue({
        gatewayId: 'gw-existing',
        gatewayName: 'existing',
        type: 'serverless',
      });

      const result = await createApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithFunction,
      );

      expect(mockClient.apigw.createGateway).not.toHaveBeenCalled();
      expect(mockClient.apigw.createService).toHaveBeenCalledWith(
        expect.objectContaining({ gatewayId: 'gw-existing' }),
      );
      expect(result.resources['events.api_gateway'].status).toBe('ready');
    });

    it('throws when creating the gateway without network config', async () => {
      const eventNoNetwork = { ...mockEvent, network: undefined };
      await expect(
        createApigwResource(mockContext, eventNoNetwork, 'test-service', stateWithFunction),
      ).rejects.toThrow('network');
    });

    it('throws when the backend function is not deployed yet', async () => {
      await expect(
        createApigwResource(mockContext, mockEvent, 'test-service', {
          ...stateWithFunction,
          resources: {},
        }),
      ).rejects.toThrow('functionId');
    });

    it('binds the custom domain when configured', async () => {
      const eventWithDomain: EventDomain = {
        ...mockEvent,
        domain: { domain_name: 'api.example.com' },
      };
      await createApigwResource(mockContext, eventWithDomain, 'test-service', stateWithFunction);
      expect(mockClient.apigw.createCustomDomain).toHaveBeenCalledWith(
        expect.objectContaining({ serviceId: 'svc-1', domainName: 'api.example.com' }),
      );
    });

    it('creates TLS resources and enables access log when log is true', async () => {
      mockClient.tls.createProject.mockResolvedValue({
        projectId: 'proj-1',
        projectName: 'test-app-dev-tls',
      });
      mockClient.tls.createTopic.mockResolvedValue({
        topicId: 'topic-1',
        topicName: 'test-service-dev-apigw-logs',
      });
      mockClient.tls.getTopic.mockResolvedValue(null);

      const eventWithLog: EventDomain = { ...mockEvent, log: true };
      const result = await createApigwResource(
        mockContext,
        eventWithLog,
        'test-service',
        stateWithFunction,
      );

      expect(mockClient.tls.createProject).toHaveBeenCalledWith(
        expect.objectContaining({ projectName: 'test-app-dev-tls' }),
      );
      expect(mockClient.tls.createTopic).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'test-app-dev-tls',
          topicName: 'test-service-dev-apigw-logs',
        }),
      );
      expect(mockClient.apigw.updateGatewayLog).toHaveBeenCalledWith('gw-1', {
        enable: true,
        projectId: 'proj-1',
        topicId: 'topic-1',
      });
      // The shared project is tracked in the stage shared slot, not the event.
      expect(setSharedResource).toHaveBeenCalledWith(
        expect.anything(),
        'dev',
        'logs.project',
        expect.objectContaining({
          instances: [
            expect.objectContaining({
              type: 'VOLCENGINE_TLS_PROJECT',
              id: 'test-app-dev-tls',
              projectId: 'proj-1',
            }),
          ],
        }),
      );

      const saved = result.resources['events.api_gateway'];
      expect(saved.instances.some((i) => (i.type as string) === 'VOLCENGINE_TLS_TOPIC')).toBe(true);
      expect(saved.instances.some((i) => (i.type as string) === 'VOLCENGINE_TLS_PROJECT')).toBe(
        false,
      );
    });

    it('does not create TLS resources when log is not set', async () => {
      await createApigwResource(mockContext, mockEvent, 'test-service', stateWithFunction);
      expect(mockClient.tls.createProject).not.toHaveBeenCalled();
      expect(mockClient.apigw.updateGatewayLog).not.toHaveBeenCalled();
    });

    it('passes existing gateway log instances into ensure on create', async () => {
      const eventWithLog: EventDomain = { ...mockEvent, log: true };
      const stateWithExistingLogs: StateFile = {
        ...stateWithFunction,
        resources: {
          ...stateWithFunction.resources,
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [
              {
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 's',
                id: 'legacy-project',
                projectId: 'proj-legacy',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 's',
                id: 'legacy-project/legacy-topic',
                topicId: 'topic-legacy',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
            status: 'ready',
          },
        },
      };

      mockClient.tls.createProject.mockResolvedValue({
        projectId: 'proj-1',
        projectName: 'test-app-dev-tls',
      });
      mockClient.tls.createTopic.mockResolvedValue({
        topicId: 'topic-1',
        topicName: 'test-service-dev-apigw-logs',
      });

      await createApigwResource(mockContext, eventWithLog, 'test-service', stateWithExistingLogs);

      expect(mockClient.tls.createProject).not.toHaveBeenCalled();
      expect(mockClient.tls.createTopic).not.toHaveBeenCalled();
      expect(setSharedResource).not.toHaveBeenCalled();
      expect(mockClient.apigw.updateGatewayLog).toHaveBeenCalledWith('gw-1', {
        enable: true,
        projectId: 'proj-legacy',
        topicId: 'topic-legacy',
      });
    });

    it('creates gateway topic under the shared project', async () => {
      mockClient.tls.createProject.mockResolvedValue({
        projectId: 'proj-1',
        projectName: 'test-app-dev-tls',
      });
      mockClient.tls.createTopic.mockResolvedValue({
        topicId: 'topic-1',
        topicName: 'test-service-dev-apigw-logs',
      });
      mockClient.tls.getTopic.mockResolvedValue(null);

      const eventWithLog: EventDomain = { ...mockEvent, log: true };
      const result = await createApigwResource(
        mockContext,
        eventWithLog,
        'test-service',
        stateWithFunction,
      );

      expect(mockClient.tls.createTopic).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'test-app-dev-tls',
          topicName: 'test-service-dev-apigw-logs',
        }),
      );
      expect(mockClient.tls.addTags).toHaveBeenCalledWith(
        expect.objectContaining({
          resourceType: 'topic',
          resourcesList: ['topic-1'],
          tags: [{ key: 'si-owned-by', value: 'test-app-test-service:events.api_gateway' }],
        }),
      );
      const saved = result.resources['events.api_gateway'];
      const topic = saved.instances.find((i) => (i.type as string) === 'VOLCENGINE_TLS_TOPIC');
      expect(topic).toMatchObject({
        id: 'test-app-dev-tls/test-service-dev-apigw-logs',
        topicId: 'topic-1',
        projectId: 'proj-1',
      });
    });

    it('adopts an owned gateway after an already-exists create conflict', async () => {
      mockClient.apigw.createGateway.mockRejectedValue(new Error('gateway already exists'));
      mockClient.apigw.findGatewayByName.mockResolvedValueOnce(null).mockResolvedValueOnce({
        gatewayId: 'gw-owned',
        gatewayName: 'test-service-dev-apigw',
        type: 'serverless',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.api_gateway' }],
      });

      const result = await createApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithFunction,
      );

      expect(mockClient.apigw.waitForGatewayRunning).toHaveBeenCalledWith('gw-owned');
      expect(mockClient.apigw.createService).toHaveBeenCalledWith(
        expect.objectContaining({ gatewayId: 'gw-owned' }),
      );
      expect(result.resources['events.api_gateway'].status).toBe('ready');
    });

    it('refuses to adopt a foreign gateway after an already-exists create conflict', async () => {
      mockClient.apigw.createGateway.mockRejectedValue(new Error('gateway already exists'));
      mockClient.apigw.findGatewayByName.mockResolvedValueOnce(null).mockResolvedValueOnce({
        gatewayId: 'gw-foreign',
        gatewayName: 'test-service-dev-apigw',
        type: 'serverless',
        tags: [],
      });

      await expect(
        createApigwResource(mockContext, mockEvent, 'test-service', stateWithFunction),
      ).rejects.toThrow('not owned by this stack');
      expect(mockClient.apigw.waitForGatewayRunning).not.toHaveBeenCalled();
    });

    it('propagates non-conflict gateway creation failures', async () => {
      mockClient.apigw.createGateway.mockRejectedValue(new Error('network unavailable'));

      await expect(
        createApigwResource(mockContext, mockEvent, 'test-service', stateWithFunction),
      ).rejects.toThrow('network unavailable');
      expect(mockClient.apigw.findGatewayByName).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateApigwResource', () => {
    const stateWithEvent: StateFile = {
      ...stateWithFunction,
      resources: {
        ...stateWithFunction.resources,
        'events.api_gateway': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: {
            gatewayName: 'test-gw',
            triggers: [{ method: 'POST', path: '/graphql', backend: '${functions.api_function}' }],
          },
          instances: [
            { type: 'VOLCENGINE_APIGW_GATEWAY', sid: 's', id: 'gw-1', gatewayId: 'gw-1' },
            {
              type: 'VOLCENGINE_APIGW_SERVICE',
              sid: 's',
              id: 'svc-1',
              serviceId: 'svc-1',
              gatewayId: 'gw-1',
            },
            {
              type: 'VOLCENGINE_APIGW_UPSTREAM',
              sid: 's',
              id: 'up-1',
              upstreamId: 'up-1',
              functionId: 'fn-abc',
            },
            { type: 'VOLCENGINE_APIGW_ROUTE', sid: 's', id: 'route-1', routeId: 'route-1' },
          ],
          lastUpdated: '2024-01-01T00:00:00Z',
          status: 'ready',
        },
      },
    };

    it('reconciles routes to the desired triggers', async () => {
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );
      mockClient.apigw.findUpstreamByName.mockResolvedValue({
        upstreamId: 'up-1',
        upstreamName: 'u',
      });
      mockClient.apigw.createRoute.mockResolvedValue('route-2');

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithEvent,
      );

      // existing upstream reused, 2 new routes created (existing deleted)
      expect(mockClient.apigw.createRoute).toHaveBeenCalledTimes(2);
      expect(mockClient.apigw.deleteRoute).toHaveBeenCalledWith('route-1');
      expect(result.resources['events.api_gateway'].instances).toHaveLength(5);
    });

    it('reuses existing remote routes by name instead of re-creating them', async () => {
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );
      mockClient.apigw.findUpstreamByName.mockResolvedValue({
        upstreamId: 'up-1',
        upstreamName: 'u',
      });
      mockClient.apigw.createRoute.mockResolvedValue('route-2');
      // Both desired routes already exist on the provider → adopt, do not create.
      mockClient.apigw.findRouteByName.mockResolvedValue({ routeId: 'route-9', routeName: 'r' });

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithEvent,
      );

      expect(mockClient.apigw.createRoute).not.toHaveBeenCalled();
      expect(mockClient.apigw.findRouteByName).toHaveBeenCalled();
      expect(result.resources['events.api_gateway'].instances).toHaveLength(5);
    });

    it('creates the resource when local event state is missing', async () => {
      (getResource as jest.Mock).mockImplementation((state: StateFile, logicalId: string) =>
        logicalId === 'events.api_gateway' ? null : state.resources?.[logicalId] || null,
      );

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithFunction,
      );

      expect(mockClient.apigw.createGateway).toHaveBeenCalled();
      expect(result.resources['events.api_gateway'].status).toBe('ready');
    });

    it('creates the resource when local event state has no service instance', async () => {
      const stateWithoutService: StateFile = {
        ...stateWithEvent,
        resources: {
          ...stateWithEvent.resources,
          'events.api_gateway': {
            ...stateWithEvent.resources['events.api_gateway'],
            instances: [
              { type: 'VOLCENGINE_APIGW_GATEWAY', sid: 's', id: 'gw-1', gatewayId: 'gw-1' },
            ],
          },
        },
      };
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithoutService,
      );

      expect(mockClient.apigw.createGateway).toHaveBeenCalled();
      expect(result.resources['events.api_gateway'].status).toBe('ready');
    });

    it('reuses existing TLS resources when logs remain enabled', async () => {
      const eventWithLog: EventDomain = { ...mockEvent, log: true };
      const stateWithLogs: StateFile = {
        ...stateWithEvent,
        resources: {
          ...stateWithEvent.resources,
          'events.api_gateway': {
            ...stateWithEvent.resources['events.api_gateway'],
            instances: [
              ...stateWithEvent.resources['events.api_gateway'].instances,
              {
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 's',
                id: 'test-service-dev-apigw-tls',
                projectId: 'proj-existing',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 's',
                id: 'test-service-dev-apigw-tls/test-service-dev-apigw-logs',
                topicId: 'topic-existing',
              },
            ],
          },
        },
      };
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );
      mockClient.apigw.findUpstreamByName.mockResolvedValue({
        upstreamId: 'up-1',
        upstreamName: 'u',
      });
      mockClient.apigw.findRouteByName.mockResolvedValue({ routeId: 'route-1', routeName: 'r' });

      const result = await updateApigwResource(
        mockContext,
        eventWithLog,
        'test-service',
        stateWithLogs,
      );

      expect(mockClient.tls.createProject).not.toHaveBeenCalled();
      expect(mockClient.apigw.updateGatewayLog).toHaveBeenCalledWith('gw-1', {
        enable: true,
        projectId: 'proj-existing',
        topicId: 'topic-existing',
      });
      expect(result.resources['events.api_gateway'].instances).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'VOLCENGINE_TLS_PROJECT', projectId: 'proj-existing' }),
          expect.objectContaining({ type: 'VOLCENGINE_TLS_TOPIC', topicId: 'topic-existing' }),
        ]),
      );
    });

    it('disables gateway logging when TLS resources remain in state but log is removed', async () => {
      const stateWithLogs: StateFile = {
        ...stateWithEvent,
        resources: {
          ...stateWithEvent.resources,
          'events.api_gateway': {
            ...stateWithEvent.resources['events.api_gateway'],
            instances: [
              ...stateWithEvent.resources['events.api_gateway'].instances,
              {
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 's',
                id: 'test-service-dev-apigw-tls',
                projectId: 'proj-existing',
              },
            ],
          },
        },
      };
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );
      mockClient.apigw.findUpstreamByName.mockResolvedValue({
        upstreamId: 'up-1',
        upstreamName: 'u',
      });
      mockClient.apigw.findRouteByName.mockResolvedValue({ routeId: 'route-1', routeName: 'r' });

      await updateApigwResource(mockContext, mockEvent, 'test-service', stateWithLogs);

      expect(mockClient.apigw.updateGatewayLog).toHaveBeenCalledWith('gw-1', {
        enable: false,
        projectId: '',
        topicId: '',
      });
    });

    it('adopts a remote upstream and creates routes for it', async () => {
      const stateWithoutUpstream: StateFile = {
        ...stateWithEvent,
        resources: {
          ...stateWithEvent.resources,
          'events.api_gateway': {
            ...stateWithEvent.resources['events.api_gateway'],
            instances: stateWithEvent.resources['events.api_gateway'].instances.filter(
              (instance) => instance.type !== 'VOLCENGINE_APIGW_UPSTREAM',
            ),
          },
        },
      };
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );
      mockClient.apigw.findUpstreamByName.mockResolvedValue({
        upstreamId: 'up-adopted',
        upstreamName: 'test-gw-dev-upstream-api-function',
      });
      mockClient.apigw.findRouteByName.mockResolvedValue(null);
      mockClient.apigw.createRoute
        .mockResolvedValueOnce('route-2')
        .mockResolvedValueOnce('route-3');

      const result = await updateApigwResource(
        mockContext,
        mockEvent,
        'test-service',
        stateWithoutUpstream,
      );

      expect(mockClient.apigw.createUpstream).not.toHaveBeenCalled();
      expect(mockClient.apigw.createRoute).toHaveBeenCalledWith(
        expect.objectContaining({ upstreamId: 'up-adopted' }),
      );
      expect(result.resources['events.api_gateway'].instances).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'VOLCENGINE_APIGW_ROUTE', routeId: 'route-2' }),
        ]),
      );
    });
  });

  describe('deleteApigwResource', () => {
    it('deletes routes, upstreams and service but leaves the serverless gateway', async () => {
      const stateWithEvent: StateFile = {
        ...stateWithFunction,
        resources: {
          ...stateWithFunction.resources,
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [
              { type: 'VOLCENGINE_APIGW_GATEWAY', sid: 's', id: 'gw-1', gatewayId: 'gw-1' },
              {
                type: 'VOLCENGINE_APIGW_SERVICE',
                sid: 's',
                id: 'svc-1',
                serviceId: 'svc-1',
                gatewayId: 'gw-1',
              },
              { type: 'VOLCENGINE_APIGW_UPSTREAM', sid: 's', id: 'up-1', upstreamId: 'up-1' },
              { type: 'VOLCENGINE_APIGW_ROUTE', sid: 's', id: 'route-1', routeId: 'route-1' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );

      await deleteApigwResource(mockContext, 'events.api_gateway', stateWithEvent);

      expect(mockClient.apigw.deleteRoute).toHaveBeenCalledWith('route-1');
      expect(mockClient.apigw.deleteUpstream).toHaveBeenCalledWith('up-1');
      expect(mockClient.apigw.deleteService).toHaveBeenCalledWith('svc-1');
      expect(mockClient.apigw.deleteGateway).not.toHaveBeenCalled();
      expect(removeResource).toHaveBeenCalled();
    });

    it('disables access log and deletes TLS index/topic but never the project on delete', async () => {
      const stateWithEvent: StateFile = {
        ...stateWithFunction,
        resources: {
          ...stateWithFunction.resources,
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [
              { type: 'VOLCENGINE_APIGW_GATEWAY', sid: 's', id: 'gw-1', gatewayId: 'gw-1' },
              {
                type: 'VOLCENGINE_APIGW_SERVICE',
                sid: 's',
                id: 'svc-1',
                serviceId: 'svc-1',
                gatewayId: 'gw-1',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 's',
                id: 'test-app-dev-tls/test-service-dev-apigw-logs',
                topicId: 'topic-1',
              },
              {
                type: 'VOLCENGINE_TLS_INDEX',
                sid: 's',
                id: 'test-app-dev-tls/test-service-dev-apigw-logs/index',
              },
              {
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 's',
                id: 'test-app-dev-tls',
                projectId: 'proj-1',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );

      await deleteApigwResource(mockContext, 'events.api_gateway', stateWithEvent);

      expect(mockClient.apigw.updateGatewayLog).toHaveBeenCalledWith('gw-1', {
        enable: false,
        projectId: '',
        topicId: '',
      });
      expect(mockClient.tls.deleteIndex).toHaveBeenCalledWith(
        'test-app-dev-tls',
        'test-service-dev-apigw-logs',
      );
      expect(mockClient.tls.deleteTopic).toHaveBeenCalledWith(
        'test-app-dev-tls',
        'test-service-dev-apigw-logs',
      );
      // Never delete projects at resource level — the destroyer releases the
      // shared project once no topics reference it.
      expect(mockClient.tls.deleteProject).not.toHaveBeenCalled();
      expect(removeResource).toHaveBeenCalled();
    });

    it('returns unchanged state when the event resource is already absent', async () => {
      (getResource as jest.Mock).mockReturnValue(null);

      const result = await deleteApigwResource(mockContext, 'events.missing', stateWithFunction);

      expect(result).toBe(stateWithFunction);
      expect(removeResource).not.toHaveBeenCalled();
    });

    it('ignores provider not-found errors while deleting all dependent resources', async () => {
      const stateWithDependents: StateFile = {
        ...stateWithFunction,
        resources: {
          ...stateWithFunction.resources,
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [
              {
                type: 'VOLCENGINE_APIGW_SERVICE',
                sid: 's',
                id: 'svc-1',
                serviceId: 'svc-1',
                gatewayId: 'gw-1',
              },
              { type: 'VOLCENGINE_APIGW_ROUTE', sid: 's', id: 'route-1', routeId: 'route-1' },
              { type: 'VOLCENGINE_APIGW_UPSTREAM', sid: 's', id: 'up-1', upstreamId: 'up-1' },
              { type: 'VOLCENGINE_APIGW_DOMAIN', sid: 's', id: 'domain-1' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );
      mockClient.apigw.deleteRoute.mockRejectedValue({ code: 'RouteNotFound' });
      mockClient.apigw.deleteUpstream.mockRejectedValue({ code: 'UpstreamNotFound' });
      mockClient.apigw.deleteService.mockRejectedValue({ code: 'ServiceNotFound' });
      mockClient.apigw.deleteCustomDomain.mockRejectedValue({ code: 'DomainNotFound' });

      await expect(
        deleteApigwResource(mockContext, 'events.api_gateway', stateWithDependents),
      ).resolves.toEqual(expect.not.objectContaining({ events: expect.anything() }));

      expect(mockClient.apigw.deleteCustomDomain).toHaveBeenCalledWith('domain-1');
      expect(removeResource).toHaveBeenCalled();
    });

    it('propagates unexpected route deletion errors without removing state', async () => {
      const stateWithRoute: StateFile = {
        ...stateWithFunction,
        resources: {
          ...stateWithFunction.resources,
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [
              {
                type: 'VOLCENGINE_APIGW_SERVICE',
                sid: 's',
                id: 'svc-1',
                gatewayId: 'gw-1',
              },
              { type: 'VOLCENGINE_APIGW_ROUTE', sid: 's', id: 'route-1' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      (getResource as jest.Mock).mockImplementation(
        (state: StateFile, logicalId: string) => state.resources?.[logicalId] || null,
      );
      mockClient.apigw.deleteRoute.mockRejectedValue({ code: 'PermissionDenied' });

      await expect(
        deleteApigwResource(mockContext, 'events.api_gateway', stateWithRoute),
      ).rejects.toEqual({ code: 'PermissionDenied' });
      expect(removeResource).not.toHaveBeenCalled();
    });
  });
});
