import {
  createApigwResource,
  updateApigwResource,
  deleteApigwResource,
} from '../../../../src/stack/volcengineStack/apigwResource';
import { ProviderEnum } from '../../../../src/common';
import type { Context, EventDomain, StateFile } from '../../../../src/types';
import { setResource, getResource, removeResource } from '../../../../src/common/stateManager';

jest.mock('../../../../src/common', () => {
  const actual = jest.requireActual('../../../../src/common');
  return {
    ...actual,
    buildSid: jest.fn((provider, resource, stage, id) => `${provider}-${resource}-${stage}-${id}`),
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
    createIndex: jest.fn(),
    waitForProject: jest.fn(),
    waitForTopic: jest.fn(),
    deleteTopic: jest.fn(),
    deleteProject: jest.fn(),
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
        projectName: 'test-service-dev-apigw-tls',
      });
      mockClient.tls.createTopic.mockResolvedValue({
        topicId: 'topic-1',
        topicName: 'test-service-dev-apigw-logs',
      });

      const eventWithLog: EventDomain = { ...mockEvent, log: true };
      const result = await createApigwResource(
        mockContext,
        eventWithLog,
        'test-service',
        stateWithFunction,
      );

      expect(mockClient.tls.createProject).toHaveBeenCalledWith(
        expect.objectContaining({ projectName: 'test-service-dev-apigw-tls' }),
      );
      expect(mockClient.tls.createTopic).toHaveBeenCalledWith(
        expect.objectContaining({ topicName: 'test-service-dev-apigw-logs' }),
      );
      expect(mockClient.apigw.updateGatewayLog).toHaveBeenCalledWith('gw-1', {
        enable: true,
        projectId: 'proj-1',
        topicId: 'topic-1',
      });

      const saved = result.resources['events.api_gateway'];
      expect(saved.instances.some((i) => (i.type as string) === 'VOLCENGINE_TLS_PROJECT')).toBe(
        true,
      );
      expect(saved.instances.some((i) => (i.type as string) === 'VOLCENGINE_TLS_TOPIC')).toBe(true);
    });

    it('does not create TLS resources when log is not set', async () => {
      await createApigwResource(mockContext, mockEvent, 'test-service', stateWithFunction);
      expect(mockClient.tls.createProject).not.toHaveBeenCalled();
      expect(mockClient.apigw.updateGatewayLog).not.toHaveBeenCalled();
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

    it('disables access log and deletes TLS resources on delete', async () => {
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
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 's',
                id: 'test-service-dev-apigw-tls',
                projectId: 'proj-1',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 's',
                id: 'test-service-dev-apigw-tls/test-service-dev-apigw-logs',
                topicId: 'topic-1',
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
      expect(mockClient.tls.deleteTopic).toHaveBeenCalledWith(
        'test-service-dev-apigw-tls',
        'test-service-dev-apigw-logs',
      );
      expect(mockClient.tls.deleteProject).toHaveBeenCalledWith('test-service-dev-apigw-tls');
      expect(removeResource).toHaveBeenCalled();
    });
  });
});
