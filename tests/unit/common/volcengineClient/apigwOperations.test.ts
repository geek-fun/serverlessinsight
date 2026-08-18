import { createApigwOperations } from '../../../../src/common/volcengineClient/apigwOperations';
import type {
  ApigwGatewayConfig,
  ApigwServiceConfig,
  ApigwUpstreamConfig,
  ApigwRouteConfig,
  ApigwDomainConfig,
} from '../../../../src/common/volcengineClient/types';

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, string>) => {
      if (params) return key.replace(/\{\{(\w+)\}\}/g, (_, k) => params[k] || '');
      return key;
    },
  },
}));

const mockFetchOpenAPI = jest.fn();

jest.mock('@volcengine/openapi', () => ({
  Service: jest.fn().mockImplementation(() => ({ fetchOpenAPI: mockFetchOpenAPI })),
}));

const mockResponse = (result: Record<string, unknown>) => ({
  ResponseMetadata: { RequestId: 'r', Service: 'apig', Region: 'cn-beijing' },
  Result: result,
});

describe('apigwOperations', () => {
  const operations = createApigwOperations({ fetchOpenAPI: mockFetchOpenAPI } as never);

  beforeEach(() => {
    mockFetchOpenAPI.mockReset();
  });

  it('createGateway sends serverless type + network and returns the Id', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(mockResponse({ Id: 'gw-1' }));
    const config: ApigwGatewayConfig = {
      gatewayName: 'test-apigw',
      type: 'serverless',
      network: { vpcId: 'vpc-1', subnetIds: ['subnet-a', 'subnet-b'] },
      Tags: [{ Key: 'si-owned-by', Value: 'v' }],
    };
    const info = await operations.createGateway(config);
    expect(info.gatewayId).toBe('gw-1');
    expect(mockFetchOpenAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        Action: 'CreateGateway',
        data: expect.objectContaining({
          Name: 'test-apigw',
          Type: 'serverless',
          NetworkSpec: { VpcId: 'vpc-1', SubnetIds: ['subnet-a', 'subnet-b'] },
        }),
      }),
    );
  });

  it('findServerlessGateway filters by Type via Filter object and reads Id', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({
        Items: [
          { Id: 'gw-std', Name: 'std', Type: 'standard' },
          { Id: 'gw-sls', Name: 'sls', Type: 'serverless' },
        ],
      }),
    );
    const info = await operations.findServerlessGateway();
    expect(info?.gatewayId).toBe('gw-sls');
    expect(mockFetchOpenAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        Action: 'ListGateways',
        data: expect.objectContaining({ Filter: { Type: 'serverless' } }),
      }),
    );
  });

  it('findGatewayByName matches by name', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({ Items: [{ Id: 'gw-1', Name: 'test-apigw', Type: 'serverless' }] }),
    );
    const info = await operations.findGatewayByName('test-apigw');
    expect(info?.gatewayId).toBe('gw-1');
    expect(info?.type).toBe('serverless');
  });

  it('createService sends gateway id + service name + protocol + auth spec', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(mockResponse({ Id: 'svc-1' }));
    const config: ApigwServiceConfig = {
      gatewayId: 'gw-1',
      serviceName: 'svc',
      protocol: ['HTTP'],
    };
    const id = await operations.createService(config);
    expect(id).toBe('svc-1');
    expect(mockFetchOpenAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        Action: 'CreateGatewayService',
        data: expect.objectContaining({
          GatewayId: 'gw-1',
          ServiceName: 'svc',
          Protocol: ['HTTP'],
          AuthSpec: { Enable: false },
        }),
      }),
    );
  });

  it('findServiceByName matches by service name and reads Id', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(mockResponse({ Items: [{ Id: 'svc-1', Name: 'svc' }] }));
    const info = await operations.findServiceByName('gw-1', 'svc');
    expect(info?.serviceId).toBe('svc-1');
  });

  it('createUpstream sends VeFaas single object source type + function id', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(mockResponse({ Id: 'up-1' }));
    const config: ApigwUpstreamConfig = {
      gatewayId: 'gw-1',
      upstreamName: 'up',
      sourceType: 'VeFaas',
      functionId: 'fn-abc',
    };
    const id = await operations.createUpstream(config);
    expect(id).toBe('up-1');
    expect(mockFetchOpenAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        Action: 'CreateUpstream',
        data: expect.objectContaining({
          SourceType: 'VeFaas',
          UpstreamSpec: { VeFaas: { FunctionId: 'fn-abc' } },
        }),
      }),
    );
  });

  it('findUpstreamByName matches by name and reads Id', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(mockResponse({ Items: [{ Id: 'up-1', Name: 'up' }] }));
    const info = await operations.findUpstreamByName('gw-1', 'up');
    expect(info?.upstreamId).toBe('up-1');
  });

  it('createRoute sends match rule + upstream list with route version 2022-11-12', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(mockResponse({ Id: 'route-1' }));
    const config: ApigwRouteConfig = {
      serviceId: 'svc-1',
      routeName: 'route',
      method: 'POST',
      path: '/graphql',
      upstreamId: 'up-1',
    };
    const id = await operations.createRoute(config);
    expect(id).toBe('route-1');
    expect(mockFetchOpenAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        Action: 'CreateRoute',
        Version: '2022-11-12',
        data: expect.objectContaining({
          ServiceId: 'svc-1',
          MatchRule: {
            Path: { MatchType: 'Exact', MatchContent: '/graphql' },
            Method: ['POST'],
          },
          UpstreamList: [{ UpstreamId: 'up-1', Weight: 100 }],
        }),
      }),
    );
  });

  it('listRoutesByService returns route ids and reads Id', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({ Items: [{ Id: 'route-1', Name: 'r1' }] }),
    );
    const routes = await operations.listRoutesByService('svc-1');
    expect(routes).toHaveLength(1);
    expect(routes[0].routeId).toBe('route-1');
  });

  it('createCustomDomain sends gateway id + domain and returns the domain id', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(mockResponse({ Id: 'domain-1' }));
    const config: ApigwDomainConfig = { serviceId: 'svc-1', domainName: 'api.example.com' };
    const domainId = await operations.createCustomDomain(config);
    expect(domainId).toBe('domain-1');
    expect(mockFetchOpenAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        Action: 'CreateCustomDomain',
        data: expect.objectContaining({ ServiceId: 'svc-1', Domain: 'api.example.com' }),
      }),
    );
  });

  it('parseGateway retains the full gateway detail set and reads Comments', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({
        Items: [
          {
            Id: 'gw-1',
            Name: 'full-gw',
            Region: 'cn-beijing',
            Status: 'Running',
            Message: 'ok',
            Type: 'serverless',
            Comments: 'my gateway description',
            Version: 'v1.0',
            CreateTime: '2026-01-01T00:00:00Z',
            ProjectName: 'default',
            Tags: [{ Key: 'si-owned-by', Value: 'v' }],
            NetworkSpec: { VpcId: 'vpc-1', SubnetIds: ['subnet-a', 'subnet-b'] },
            BackendSpec: { IsVkeWithFlannelCNISupported: false, VkePodCidr: '10.0.0.0/16' },
            MonitorSpec: { Enable: true, WorkspaceId: 'ws-1' },
            LogSpec: { Enable: true, ProjectId: 'proj-1', TopicId: 'topic-1' },
            ResourceSpec: {
              Replicas: 2,
              InstanceSpecCode: 'small',
              ClbSpecCode: 'clb-small',
              PublicNetworkBillingType: 'traffic',
              PublicNetworkBandwidth: 5,
              NetworkType: { EnablePublicNetwork: true, EnablePrivateNetwork: false },
            },
          },
        ],
      }),
    );

    const info = await operations.findGatewayByName('full-gw');

    expect(info).toEqual(
      expect.objectContaining({
        gatewayId: 'gw-1',
        gatewayName: 'full-gw',
        type: 'serverless',
        status: 'Running',
        // The provider returns the description under `Comments` — the old read
        // of `data.Description` left this always undefined.
        description: 'my gateway description',
        message: 'ok',
        region: 'cn-beijing',
        version: 'v1.0',
        projectName: 'default',
        tags: [{ Key: 'si-owned-by', Value: 'v' }],
        networkSpec: { vpcId: 'vpc-1', subnetIds: ['subnet-a', 'subnet-b'] },
        backendSpec: { isVkeWithFlannelCniSupported: false, vkePodCidr: '10.0.0.0/16' },
        monitorSpec: { enable: true, workspaceId: 'ws-1' },
        logSpec: { enable: true, projectId: 'proj-1', topicId: 'topic-1' },
        resourceSpec: {
          replicas: 2,
          instanceSpecCode: 'small',
          clbSpecCode: 'clb-small',
          publicNetworkBillingType: 'traffic',
          publicNetworkBandwidth: 5,
          networkType: { enablePublicNetwork: true, enablePrivateNetwork: false },
        },
      }),
    );
  });

  it('getService retains the full service detail set', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({
        GatewayService: {
          Id: 'svc-1',
          Name: 'svc',
          GatewayId: 'gw-1',
          GatewayName: 'full-gw',
          Status: 'Running',
          Protocol: ['HTTP'],
          CreateTime: '2026-01-01T00:00:00Z',
          Message: 'ok',
          Comments: 'service desc',
          AuthSpec: { Enable: false },
          Domains: [{ Domain: 'api.example.com', Type: 'public' }],
          CustomDomains: [{ Id: 'cd-1', Domain: 'custom.example.com' }],
        },
      }),
    );

    const info = await operations.getService('svc-1');

    expect(info).toEqual(
      expect.objectContaining({
        serviceId: 'svc-1',
        serviceName: 'svc',
        gatewayId: 'gw-1',
        status: 'Running',
        protocol: ['HTTP'],
        createdTime: '2026-01-01T00:00:00Z',
        gatewayName: 'full-gw',
        message: 'ok',
        comments: 'service desc',
        authSpec: { enable: false },
        domains: [{ domain: 'api.example.com', type: 'public' }],
        customDomains: [{ id: 'cd-1', domain: 'custom.example.com' }],
      }),
    );
  });

  it('findServiceByName returns status, protocol and createdTime', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({
        Items: [
          {
            Id: 'svc-1',
            Name: 'svc',
            GatewayId: 'gw-1',
            Status: 'Running',
            Protocol: ['HTTP'],
            CreateTime: '2026-01-01T00:00:00Z',
          },
        ],
      }),
    );

    const info = await operations.findServiceByName('gw-1', 'svc');

    expect(info).toEqual(
      expect.objectContaining({
        serviceId: 'svc-1',
        status: 'Running',
        protocol: ['HTTP'],
        createdTime: '2026-01-01T00:00:00Z',
      }),
    );
  });

  it('getUpstream retains the full upstream detail set', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({
        Items: [
          {
            Id: 'up-1',
            Name: 'up',
            GatewayId: 'gw-1',
            Status: 'Available',
            SourceType: 'VeFaas',
            Protocol: 'HTTP',
            UpstreamSpec: { VeFaas: { FunctionId: 'fn-abc' } },
            CreateTime: '2026-01-01T00:00:00Z',
            Comments: 'upstream comments',
            ResourceType: 'vefaas',
            UpdateTime: '2026-01-02T00:00:00Z',
            BackendTargetList: [{ Ip: '10.0.0.1', Port: 8080, HealthStatus: 'healthy' }],
          },
        ],
      }),
    );

    const info = await operations.getUpstream('up-1');

    expect(info).toEqual(
      expect.objectContaining({
        upstreamId: 'up-1',
        upstreamName: 'up',
        gatewayId: 'gw-1',
        status: 'Available',
        sourceType: 'VeFaas',
        protocol: 'HTTP',
        functionId: 'fn-abc',
        createdTime: '2026-01-01T00:00:00Z',
        comments: 'upstream comments',
        resourceType: 'vefaas',
        updateTime: '2026-01-02T00:00:00Z',
        backendTargetList: [{ ip: '10.0.0.1', port: 8080, healthStatus: 'healthy' }],
      }),
    );
  });

  it('findUpstreamByName returns createdTime', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({
        Items: [
          {
            Id: 'up-1',
            Name: 'up',
            GatewayId: 'gw-1',
            SourceType: 'VeFaas',
            Protocol: 'HTTP',
            Status: 'Available',
            CreateTime: '2026-01-01T00:00:00Z',
            UpstreamSpec: { VeFaas: { FunctionId: 'fn-abc' } },
          },
        ],
      }),
    );

    const info = await operations.findUpstreamByName('gw-1', 'up');

    expect(info).toEqual(
      expect.objectContaining({
        upstreamId: 'up-1',
        status: 'Available',
        createdTime: '2026-01-01T00:00:00Z',
      }),
    );
  });

  it('getRoute retains the full route detail set', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({
        Route: {
          Id: 'route-1',
          Name: 'route',
          ServiceId: 'svc-1',
          Status: 'Active',
          Enable: true,
          Priority: 0,
          MatchRule: {
            Method: ['POST'],
            Path: { MatchType: 'Exact', MatchContent: '/graphql' },
          },
          UpstreamList: [{ UpstreamId: 'up-1', Version: 'v1', Weight: 100 }],
        },
      }),
    );

    const info = await operations.getRoute('route-1');

    expect(info).toEqual(
      expect.objectContaining({
        routeId: 'route-1',
        routeName: 'route',
        serviceId: 'svc-1',
        status: 'Active',
        enable: true,
        priority: 0,
        method: 'POST',
        path: '/graphql',
        upstreamIds: ['up-1'],
        matchRule: {
          method: ['POST'],
          path: { matchType: 'Exact', matchContent: '/graphql' },
        },
        upstreamList: [{ upstreamId: 'up-1', version: 'v1', weight: 100 }],
      }),
    );
  });

  it('findRouteByName returns method, path and upstreamIds', async () => {
    mockFetchOpenAPI.mockResolvedValueOnce(
      mockResponse({
        Items: [
          {
            Id: 'route-1',
            Name: 'r1',
            ServiceId: 'svc-1',
            Status: 'Active',
            Enable: true,
            Priority: 0,
            MatchRule: {
              Method: ['GET'],
              Path: { MatchType: 'Exact', MatchContent: '/health' },
            },
            UpstreamList: [{ UpstreamId: 'up-1', Weight: 100 }],
          },
        ],
      }),
    );

    const info = await operations.findRouteByName('svc-1', 'r1');

    expect(info).toEqual(
      expect.objectContaining({
        routeId: 'route-1',
        status: 'Active',
        enable: true,
        priority: 0,
        method: 'GET',
        path: '/health',
        upstreamIds: ['up-1'],
      }),
    );
  });
});
