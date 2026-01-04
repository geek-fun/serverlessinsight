import { generateApigwPlan } from '../../../src/stack/aliyunStack/apigwPlanner';
import { loadState, setResource } from '../../../src/common/stateManager';
import { Context, EventDomain, EventTypes } from '../../../src/types';
import { ProviderEnum } from '../../../src/common';
import * as apigwProvider from '../../../src/stack/aliyunStack/apigwProvider';
import fs from 'node:fs';

// Mock the ApigwProvider module
jest.mock('../../../src/stack/aliyunStack/apigwProvider');

describe('Apigw Planner', () => {
  const testDir = '/tmp/test-apigw-planner';

  const mockContext: Context = {
    stage: 'default',
    stackName: 'test-stack',
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
      // Mock findApiGroupByName to return null (group doesn\'t exist)
      jest.spyOn(apigwProvider, 'findApiGroupByName').mockResolvedValue(null);

      const state = loadState('aliyun', testDir);
      const plan = await generateApigwPlan(mockContext, state, [testEvent], 'test-service');

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'events.test_api',
        action: 'create',
        resourceType: 'ALIYUN_APIGW',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should plan no changes when event exists and matches state', async () => {
      // Add event to state with matching definition
      let state = loadState('aliyun', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-agw-group',
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
            arn: 'arn:acs:apigateway:cn-hangzhou:group/group-123',
            id: 'group-123',
            groupName: 'test-service-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getApiGroup to return matching group
      jest.spyOn(apigwProvider, 'getApiGroup').mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-agw-group',
        description: 'API Gateway group for test-service',
      });

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
      let state = loadState('aliyun', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-agw-group',
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
            arn: 'arn:acs:apigateway:cn-hangzhou:group/group-123',
            id: 'group-123',
            groupName: 'test-service-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getApiGroup to return existing group
      jest.spyOn(apigwProvider, 'getApiGroup').mockResolvedValue({
        groupId: 'group-123',
        groupName: 'test-service-agw-group',
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
      let state = loadState('aliyun', testDir);
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
            arn: 'arn:acs:apigateway:cn-hangzhou:group/old-group',
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

    it('should plan to recreate event when state exists but remote is missing', async () => {
      // Add event to state
      let state = loadState('aliyun', testDir);
      state = setResource(state, 'events.test_api', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          groupName: 'test-service-agw-group',
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
            arn: 'arn:acs:apigateway:cn-hangzhou:group/group-123',
            id: 'group-123',
            groupName: 'test-service-agw-group',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getApiGroup to return null (group doesn\'t exist remotely)
      jest.spyOn(apigwProvider, 'getApiGroup').mockResolvedValue(null);

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
  });
});
