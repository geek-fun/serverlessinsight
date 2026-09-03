import { generateApigwPlan } from '../../../../src/stack/aliyunStack/apigwPlanner';
import { loadState, setResource } from '../../../../src/common/stateManager';
import { Context, EventDomain, EventTypes } from '../../../../src/types';
import { ProviderEnum, buildAliyunApigwApiName, generateApiKey } from '../../../../src/common';
import fs from 'node:fs';

// Create mock apigw operations
const mockApigwOperations = {
  findApiGroupByName: jest.fn(),
  getApiGroup: jest.fn(),
  listApisByGroup: jest.fn(),
  createApiGroup: jest.fn(),
  updateApiGroup: jest.fn(),
  deleteApiGroup: jest.fn(),
  createApi: jest.fn(),
  getApi: jest.fn(),
  updateApi: jest.fn(),
  deleteApi: jest.fn(),
  deployApi: jest.fn(),
  abolishApi: jest.fn(),
  bindCustomDomain: jest.fn(),
  unbindCustomDomain: jest.fn(),
};

// Mock the AliyunClient module
jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    apigw: mockApigwOperations,
  }),
}));

describe('Apigw Planner', () => {
  const testDir = '/tmp/test-apigw-planner';

  const mockContext: Context = {
    stage: 'default',
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
    key: 'test_api',
    name: 'Test API Gateway',
    type: EventTypes.API_GATEWAY,
    triggers: [
      {
        method: 'GET',
        path: '/users',
        backend: 'userFunction',
      },
    ],
  };

  const derivedApiName = (method: string, path: string): string =>
    buildAliyunApigwApiName('Test API Gateway', 'default', generateApiKey(method, path));

  const matchingGroup = {
    groupId: 'group-123',
    groupName: 'test-service-default-test-api-agw-group',
    description: 'API Gateway group for test-service',
    basePath: null,
  };

  const cloudApiDetail = (
    overrides: { apiName?: string; method?: string; path?: string; backend?: string } = {},
  ) => ({
    apiId: 'api-1',
    apiName: overrides.apiName ?? derivedApiName('GET', '/users'),
    groupId: 'group-123',
    requestConfig: {
      requestProtocol: 'HTTP',
      requestHttpMethod: overrides.method ?? 'GET',
      requestPath: overrides.path ?? '/users',
      requestMode: 'PASSTHROUGH',
    },
    serviceConfig: {
      serviceProtocol: 'FunctionCompute',
      functionComputeConfig: {
        fcRegionId: 'cn-hangzhou',
        functionName: overrides.backend ?? 'userFunction',
        fcVersion: '3.0',
        method: 'GET',
      },
    },
  });

  const buildMatchingState = () => {
    let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
    state = setResource(state, 'events.test_api', {
      mode: 'managed',
      region: 'cn-hangzhou',
      definition: {
        groupName: 'test-service-default-test-api-agw-group',
        description: 'API Gateway group for test-service',
        basePath: null,
        triggers: [{ method: 'GET', path: '/users', backend: 'userFunction' }],
        domain: null,
      },
      instances: [
        {
          type: 'ALIYUN_APIGW_GROUP',
          sid: 'si:aliyun:apigateway:default:group-123',
          id: 'group-123',
          groupName: 'test-service-default-test-api-agw-group',
        },
      ],
      lastUpdated: new Date().toISOString(),
    });
    return state;
  };

  const mockMatchingApis = () => {
    mockApigwOperations.listApisByGroup.mockResolvedValue([
      { apiId: 'api-1', apiName: derivedApiName('GET', '/users') },
    ]);
    mockApigwOperations.getApi.mockResolvedValue(cloudApiDetail());
  };

  beforeEach(() => {
    // Clean up
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('generateApigwPlan', () => {
    it('should plan to create a new event when state is empty', async () => {
      // Mock findApiGroupByName to return null (group does not exist)
      mockApigwOperations.findApiGroupByName.mockResolvedValue(null);

      const state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'create',
        resourceType: 'ALIYUN_APIGW',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should plan to create when existing state is tainted and no remote group exists', async () => {
      let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-default-test-api-agw-group',
          description: 'API Gateway group for test-service',
          basePath: null,
          triggers: [{ method: 'GET', path: '/users', backend: 'userFunction' }],
          domain: null,
        },
        instances: [
          {
            type: 'ALIYUN_APIGW_GROUP',
            sid: 'si:aliyun:apigateway:default:group-123',
            id: 'group-123',
            groupName: 'test-service-default-test-api-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
        status: 'tainted',
      });
      mockApigwOperations.findApiGroupByName.mockResolvedValue(null);

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'create',
        resourceType: 'ALIYUN_APIGW',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
      expect(mockApigwOperations.findApiGroupByName).toHaveBeenCalled();
    });

    it('should plan to create when state is tainted and remote group carries our ownership tag', async () => {
      let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-default-test-api-agw-group',
          description: 'API Gateway group for test-service',
          basePath: null,
          triggers: [{ method: 'GET', path: '/users', backend: 'userFunction' }],
          domain: null,
        },
        instances: [],
        lastUpdated: new Date().toISOString(),
        status: 'tainted',
      });
      mockApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-default-test-api-agw-group',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.test_api' }],
      });

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'create',
        resourceType: 'ALIYUN_APIGW',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should fail fast when state is tainted and remote group lacks our ownership tag', async () => {
      let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-default-test-api-agw-group',
          description: 'API Gateway group for test-service',
          basePath: null,
          triggers: [{ method: 'GET', path: '/users', backend: 'userFunction' }],
          domain: null,
        },
        instances: [],
        lastUpdated: new Date().toISOString(),
        status: 'tainted',
      });
      mockApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-default-test-api-agw-group',
        tags: [{ Key: 'env', Value: 'prod' }],
      });

      await expect(
        generateApigwPlan(mockContext, state, [testEvent], 'test-service'),
      ).rejects.toThrow('not owned by this stack');
    });

    it('should fail fast when state is missing but remote group exists untagged', async () => {
      const state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      mockApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-default-test-api-agw-group',
      });

      await expect(
        generateApigwPlan(mockContext, state, [testEvent], 'test-service'),
      ).rejects.toThrow('not owned by this stack');
    });

    it('should plan to import drift when state is missing but remote group carries our ownership tag', async () => {
      const state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      mockApigwOperations.findApiGroupByName.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-default-test-api-agw-group',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:events.test_api' }],
      });

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'update',
        resourceType: 'ALIYUN_APIGW',
        drifted: true,
      });
    });

    it('should plan no changes when event exists and matches state', async () => {
      // Add event to state with matching definition
      let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-default-test-api-agw-group',
          description: 'API Gateway group for test-service',
          basePath: null,
          triggers: [
            {
              method: 'GET',
              path: '/users',
              backend: 'userFunction',
            },
          ],
          domain: null,
        },
        instances: [
          {
            type: 'ALIYUN_APIGW_GROUP',
            sid: 'si:aliyun:apigateway:default:group-123',
            id: 'group-123',
            groupName: 'test-service-default-test-api-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getApiGroup to return matching group
      mockApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-default-test-api-agw-group',
        description: 'API Gateway group for test-service',
      });
      mockMatchingApis();

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'noop',
        resourceType: 'ALIYUN_APIGW',
      });
    });

    it('should plan to update when definition changes', async () => {
      // Add event to state with different definition
      let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-default-test-api-agw-group',
          description: 'API Gateway group for test-service',
          basePath: null,
          triggers: [
            {
              method: 'POST', // Different from testEvent
              path: '/users',
              backend: 'userFunction',
            },
          ],
          domain: null,
        },
        instances: [
          {
            type: 'ALIYUN_APIGW_GROUP',
            sid: 'si:aliyun:apigateway:default:group-123',
            id: 'group-123',
            groupName: 'test-service-default-test-api-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getApiGroup to return existing group
      mockApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-default-test-api-agw-group',
      });

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'update',
        resourceType: 'ALIYUN_APIGW',
      });
    });

    it('should plan to delete event when removed from config', async () => {
      // Add event to state
      let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'events.old_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'old-service-agw-group',
          description: 'Old API Gateway group',
          basePath: null,
          triggers: [],
          domain: null,
        },
        instances: [
          {
            type: 'ALIYUN_APIGW_GROUP',
            sid: 'si:aliyun:apigateway:default:old-group',
            id: 'old-group',
            groupName: 'old-service-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Pass empty array (no events)
      const plan = await generateApigwPlan(mockContext, state, [], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.old_api',
        action: 'delete',
        resourceType: 'ALIYUN_APIGW',
      });
    });

    it('should plan noop when domain protocol is unchanged', async () => {
      const eventWithHttps: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'api.example.com',
          protocol: 'HTTPS',
          certificate_id: '12345',
        },
      };

      let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-default-test-api-agw-group',
          description: 'API Gateway group for test-service',
          basePath: null,
          triggers: [{ method: 'GET', path: '/users', backend: 'userFunction' }],
          domain: {
            domainName: 'api.example.com',
            wwwBindApex: false,
            certificateId: '12345',
            certificateBody: null,
            certificatePrivateKey: null,
            protocol: 'HTTPS',
          },
        },
        instances: [
          {
            type: 'ALIYUN_APIGW_GROUP',
            sid: 'si:aliyun:apigateway:default:group-123',
            id: 'group-123',
            groupName: 'test-service-default-test-api-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      mockApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-default-test-api-agw-group',
        description: 'API Gateway group for test-service',
      });
      mockMatchingApis();

      const plan = await generateApigwPlan(mockContext, state, [eventWithHttps], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'noop',
        resourceType: 'ALIYUN_APIGW',
      });
    });

    it('should plan to update when domain protocol changes from HTTP to HTTPS', async () => {
      const eventWithHttps: EventDomain = {
        ...testEvent,
        domain: {
          domain_name: 'api.example.com',
          protocol: 'HTTPS',
          certificate_id: '12345',
        },
      };

      let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-default-test-api-agw-group',
          description: 'API Gateway group for test-service',
          basePath: null,
          triggers: [{ method: 'GET', path: '/users', backend: 'userFunction' }],
          domain: {
            domainName: 'api.example.com',
            certificateId: '12345',
            certificateBody: null,
            certificatePrivateKey: null,
            protocol: 'HTTP',
          },
        },
        instances: [
          {
            type: 'ALIYUN_APIGW_GROUP',
            sid: 'si:aliyun:apigateway:default:group-123',
            id: 'group-123',
            groupName: 'test-service-default-test-api-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      mockApigwOperations.getApiGroup.mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-default-test-api-agw-group',
      });

      const plan = await generateApigwPlan(mockContext, state, [eventWithHttps], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'update',
        resourceType: 'ALIYUN_APIGW',
      });
      expect(plan.items[0].changes?.before).toMatchObject({ domain: { protocol: 'HTTP' } });
      expect(plan.items[0].changes?.after).toMatchObject({ domain: { protocol: 'HTTPS' } });
    });

    it('should plan to recreate event when state exists but remote is missing', async () => {
      // Add event to state
      let state = loadState('aliyun', 'test-app', 'test-service', 'default', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-default-test-api-agw-group',
          description: 'API Gateway group for test-service',
          basePath: null,
          triggers: [
            {
              method: 'GET',
              path: '/users',
              backend: 'userFunction',
            },
          ],
          domain: null,
        },
        instances: [
          {
            type: 'ALIYUN_APIGW_GROUP',
            sid: 'si:aliyun:apigateway:default:group-123',
            id: 'group-123',
            groupName: 'test-service-default-test-api-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getApiGroup to return null (group does not exist remotely)
      mockApigwOperations.getApiGroup.mockResolvedValue(null);

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'create',
        resourceType: 'ALIYUN_APIGW',
        drifted: true,
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should plan update+drifted when the live group description drifted from the config', async () => {
      const state = buildMatchingState();
      mockApigwOperations.getApiGroup.mockResolvedValue({
        ...matchingGroup,
        description: 'Edited in the console',
      });
      mockMatchingApis();

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'update',
        resourceType: 'ALIYUN_APIGW',
        drifted: true,
      });
    });

    it('should plan update+drifted when the live group name drifted from the config', async () => {
      const state = buildMatchingState();
      mockApigwOperations.getApiGroup.mockResolvedValue({
        ...matchingGroup,
        groupName: 'renamed-in-console-group',
      });
      mockMatchingApis();

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items[0]).toMatchObject({ action: 'update', drifted: true });
    });

    it.each([
      ['method', { method: 'POST' }],
      ['path', { path: '/admin' }],
      ['backend', { backend: 'another-function' }],
    ] as const)(
      'should plan update+drifted when the cloud trigger %s drifted from the config',
      async (_field, overrides) => {
        const state = buildMatchingState();
        mockApigwOperations.getApiGroup.mockResolvedValue(matchingGroup);
        mockApigwOperations.listApisByGroup.mockResolvedValue([
          { apiId: 'api-1', apiName: derivedApiName('GET', '/users') },
        ]);
        mockApigwOperations.getApi.mockResolvedValue(cloudApiDetail(overrides));

        const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

        expect(plan.items[0]).toMatchObject({ action: 'update', drifted: true });
      },
    );

    it('should plan update+drifted when a desired trigger has no matching cloud API', async () => {
      const state = buildMatchingState();
      mockApigwOperations.getApiGroup.mockResolvedValue(matchingGroup);
      mockApigwOperations.listApisByGroup.mockResolvedValue([]);

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items[0]).toMatchObject({ action: 'update', drifted: true });
    });

    it('should plan noop when an extra foreign cloud API exists (executor never deletes it)', async () => {
      const state = buildMatchingState();
      mockApigwOperations.getApiGroup.mockResolvedValue(matchingGroup);
      mockApigwOperations.listApisByGroup.mockResolvedValue([
        { apiId: 'api-1', apiName: derivedApiName('GET', '/users') },
        { apiId: 'foreign-9', apiName: 'console_created_api' },
      ]);
      mockApigwOperations.getApi.mockResolvedValue(cloudApiDetail());

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items[0]).toMatchObject({ action: 'noop', resourceType: 'ALIYUN_APIGW' });
      expect(mockApigwOperations.getApi).toHaveBeenCalledTimes(1);
    });

    it('should plan noop when group and triggers match despite cloud noise', async () => {
      const state = buildMatchingState();
      mockApigwOperations.getApiGroup.mockResolvedValue({
        ...matchingGroup,
        tags: [
          { Key: 'si-owned-by', Value: 'test-app-test-service:events.test_api' },
          { Key: 'env', Value: 'prod' },
        ],
        customDomains: [{ domainName: 'api.example.com', certificateId: 'cert-1' }],
        stageItems: [{ stageName: 'RELEASE' }],
      });
      mockApigwOperations.listApisByGroup.mockResolvedValue([
        { apiId: 'api-1', apiName: derivedApiName('GET', '/users') },
        { apiId: 'foreign-7', apiName: 'console_only_api' },
      ]);
      mockApigwOperations.getApi.mockResolvedValue(cloudApiDetail());

      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items[0]).toMatchObject({ action: 'noop', resourceType: 'ALIYUN_APIGW' });
    });

    it('should plan update with drifted:true on a local definition change', async () => {
      const changedEvent: EventDomain = {
        ...testEvent,
        triggers: [{ method: 'GET', path: '/v2/users', backend: 'userFunction' }],
      };
      const state = buildMatchingState();
      mockApigwOperations.getApiGroup.mockResolvedValue(matchingGroup);
      mockApigwOperations.listApisByGroup.mockResolvedValue([
        { apiId: 'api-1', apiName: derivedApiName('GET', '/v2/users') },
      ]);
      mockApigwOperations.getApi.mockResolvedValue(
        cloudApiDetail({ apiName: derivedApiName('GET', '/v2/users'), path: '/v2/users' }),
      );

      const plan = await generateApigwPlan(mockContext, state, [changedEvent], 'test-service');

      expect(plan.items[0]).toMatchObject({ action: 'update', drifted: true });
    });
  });
});
