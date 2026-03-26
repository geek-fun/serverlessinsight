import { ProviderEnum } from '../../../../src/common';
import { logger } from '../../../../src/common/logger';
import { getResource } from '../../../../src/common/stateManager';
import { executeApigwPlan } from '../../../../src/stack/aliyunStack/apigwExecutor';
import * as apigwResource from '../../../../src/stack/aliyunStack/apigwResource';
import { Context, CURRENT_STATE_VERSION, EventTypes, Plan, StateFile } from '../../../../src/types';

// Mock dependencies
jest.mock('../../../../src/stack/aliyunStack/apigwResource');
jest.mock('../../../../src/common/stateManager');
jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('ApigwExecutor', () => {
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

  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'aliyun',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const testEvent = {
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

  const serviceName = 'test-service';
  const roleArn = 'acs:ram::123456789012:role/test-role';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('executeApigwPlan', () => {
    it('should handle noop action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'events.test_api',
            action: 'noop',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [testEvent],
        serviceName,
        roleArn,
        initialState,
      );

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
      expect(logger.info).toHaveBeenCalledWith('No changes for events.test_api');
    });

    it('should execute create action successfully', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'events.test_api',
            action: 'create',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      const newState = {
        ...initialState,
        resources: {
          'events.test_api': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { groupName: 'test-service-default-agw-group' },
            instances: [{ sid: 'si:test:test:default:test', id: 'test-group' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (apigwResource.createApigwResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [testEvent],
        serviceName,
        roleArn,
        initialState,
      );

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(apigwResource.createApigwResource).toHaveBeenCalledWith(
        mockContext,
        testEvent,
        serviceName,
        roleArn,
        initialState,
      );
      expect(logger.info).toHaveBeenCalledWith('Creating API Gateway resources: Test API Gateway');
      expect(logger.info).toHaveBeenCalledWith(
        'Successfully created API Gateway resources: Test API Gateway',
      );
    });

    it('should execute update action successfully', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'events.test_api',
            action: 'update',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      const newState = {
        ...initialState,
        resources: {
          'events.test_api': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { groupName: 'test-service-default-agw-group' },
            instances: [{ sid: 'si:test:test:default:test', id: 'test-group' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (apigwResource.updateApigwResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [testEvent],
        serviceName,
        roleArn,
        initialState,
      );

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(apigwResource.updateApigwResource).toHaveBeenCalledWith(
        mockContext,
        testEvent,
        serviceName,
        roleArn,
        initialState,
      );
      expect(logger.info).toHaveBeenCalledWith('Updating API Gateway resources: Test API Gateway');
      expect(logger.info).toHaveBeenCalledWith(
        'Successfully updated API Gateway resources: Test API Gateway',
      );
    });

    it('should execute delete action successfully', async () => {
      const stateWithResource: StateFile = {
        ...initialState,
        resources: {
          'events.test_api': {
            mode: 'managed' as const,
            region: 'cn-hangzhou',
            definition: { groupName: 'test-service-default-agw-group' },
            instances: [{ sid: 'si:test:test:default:test', id: 'test-group' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'events.test_api',
            action: 'delete',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      const newState = { ...initialState };

      (getResource as jest.Mock).mockReturnValue(stateWithResource.resources['events.test_api']);
      (apigwResource.deleteApigwResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeApigwPlan(
        mockContext,
        plan,
        undefined,
        serviceName,
        roleArn,
        stateWithResource,
      );

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(apigwResource.deleteApigwResource).toHaveBeenCalledWith(
        mockContext,
        'events.test_api',
        stateWithResource,
      );
      expect(logger.info).toHaveBeenCalledWith('Deleting API Gateway resources: events.test_api');
      expect(logger.info).toHaveBeenCalledWith(
        'Successfully deleted API Gateway resources: events.test_api',
      );
    });

    it('should skip deletion if state not found', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'events.test_api',
            action: 'delete',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      (getResource as jest.Mock).mockReturnValue(null);

      const result = await executeApigwPlan(
        mockContext,
        plan,
        undefined,
        serviceName,
        roleArn,
        initialState,
      );

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
      expect(apigwResource.deleteApigwResource).not.toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(
        'State not found for events.test_api, skipping deletion',
      );
    });

    it('should return partial failure if event not found for create', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'events.nonexistent',
            action: 'create',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [testEvent],
        serviceName,
        roleArn,
        initialState,
      );

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toBe(
        'Event not found for logical ID: events.nonexistent',
      );
    });

    it('should return partial failure if event not found for update', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'events.nonexistent',
            action: 'update',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [testEvent],
        serviceName,
        roleArn,
        initialState,
      );

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toBe(
        'Event not found for logical ID: events.nonexistent',
      );
    });

    it('should return partial failure on error', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'events.test_api',
            action: 'create',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      const error = new Error('API Gateway creation failed');
      (apigwResource.createApigwResource as jest.Mock).mockRejectedValue(error);

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [testEvent],
        serviceName,
        roleArn,
        initialState,
      );

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.failedItem.logicalId).toBe('events.test_api');
      expect(result.partialFailure?.error).toBe(error);
      expect(result.partialFailure?.successfulItems).toEqual([]);
    });

    it('should save state after each successful operation', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'events.test_api',
            action: 'create',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      const newState = {
        ...initialState,
        resources: {
          'events.test_api': {
            mode: 'managed' as const,
            region: 'cn-hangzhou',
            definition: { groupName: 'test-service-default-agw-group' },
            instances: [{ sid: 'si:test:test:default:test', id: 'test-group' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const onStateChange = jest.fn();
      (apigwResource.createApigwResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [testEvent],
        serviceName,
        roleArn,
        initialState,
        onStateChange,
      );

      expect(result.state).toEqual(newState);
      expect(onStateChange).toHaveBeenCalledWith(newState);
    });

    it('should handle multiple actions in sequence', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'events.test_api',
            action: 'create',
            resourceType: 'ALIYUN_APIGW',
          },
          {
            logicalId: 'events.test_api2',
            action: 'noop',
            resourceType: 'ALIYUN_APIGW',
          },
        ],
      };

      const testEvent2 = { ...testEvent, key: 'test_api2', name: 'Test API Gateway 2' };
      const newState = {
        ...initialState,
        resources: {
          'events.test_api': {
            mode: 'managed' as const,
            region: 'cn-hangzhou',
            definition: { groupName: 'test-service-default-agw-group' },
            instances: [{ sid: 'si:test:test:default:test', id: 'test-group' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (apigwResource.createApigwResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [testEvent, testEvent2],
        serviceName,
        roleArn,
        initialState,
      );

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(apigwResource.createApigwResource).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith('No changes for events.test_api2');
    });
  });
});
