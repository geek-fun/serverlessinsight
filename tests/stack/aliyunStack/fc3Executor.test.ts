import { executeFunctionPlan } from '../../../src/stack/aliyunStack/fc3Executor';
import * as fc3Resource from '../../../src/stack/aliyunStack/fc3Resource';
import { ProviderEnum } from '../../../src/common';
import { getResource } from '../../../src/common/stateManager';
import { logger } from '../../../src/common/logger';
import {
  Context,
  CURRENT_STATE_VERSION,
  PartialResourceError,
  Plan,
  StateFile,
} from '../../../src/types';

// Mock dependencies
jest.mock('../../../src/stack/aliyunStack/fc3Resource');
jest.mock('../../../src/common/stateManager');
jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('Fc3Executor', () => {
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

  const testFunction = {
    key: 'test_fn',
    name: 'test-function',
    code: {
      runtime: 'nodejs20',
      handler: 'index.handler',
      path: 'test.zip',
    },
    memory: 512,
    timeout: 10,
    storage: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('executeFunctionPlan', () => {
    it('should handle noop action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'noop',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
      expect(logger.info).toHaveBeenCalledWith('No changes for functions.test_fn');
    });

    it('should execute create action successfully', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'create',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const newState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { functionName: 'test-function' },
            instances: [{ sid: 'si:test:test:default:test', id: 'test-function' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (fc3Resource.createResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(fc3Resource.createResource).toHaveBeenCalledWith(
        mockContext,
        testFunction,
        initialState,
      );
      expect(logger.info).toHaveBeenCalledWith('Creating function: test-function');
      expect(logger.info).toHaveBeenCalledWith('Successfully created function: test-function');
      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should return partial failure if function not found for create action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.nonexistent',
            action: 'create',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toBe(
        'Function not found for logical ID: functions.nonexistent',
      );
      expect(result.partialFailure?.failedItem.logicalId).toBe('functions.nonexistent');
      expect(result.partialFailure?.successfulItems).toEqual([]);
    });

    it('should execute update action successfully', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'update',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const newState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { functionName: 'test-function' },
            instances: [{ sid: 'si:test:test:default:test', id: 'test-function' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (fc3Resource.updateResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(fc3Resource.updateResource).toHaveBeenCalledWith(
        mockContext,
        testFunction,
        initialState,
      );
      expect(logger.info).toHaveBeenCalledWith('Updating function: test-function');
      expect(logger.info).toHaveBeenCalledWith('Successfully updated function: test-function');
      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute delete action successfully', async () => {
      const stateWithFunction: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: {
              functionName: 'test-function',
              runtime: 'nodejs20',
              handler: 'index.handler',
              memorySize: 512,
              timeout: 10,
              environment: {},
              codeHash: 'abc123',
            },
            instances: [
              {
                sid: 'si:aliyun:fc3:default:test-function',
                id: 'test-function',
                functionName: 'test-function',
              },
            ],
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'delete',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);
      (fc3Resource.deleteResource as jest.Mock).mockResolvedValue(initialState);

      const result = await executeFunctionPlan(mockContext, plan, [], stateWithFunction);

      expect(getResource).toHaveBeenCalledWith(stateWithFunction, 'functions.test_fn');
      expect(fc3Resource.deleteResource).toHaveBeenCalledWith(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithFunction,
      );
      expect(logger.info).toHaveBeenCalledWith('Deleting function: test-function');
      expect(logger.info).toHaveBeenCalledWith('Successfully deleted function: test-function');
      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should skip delete if state not found', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'delete',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      (getResource as jest.Mock).mockReturnValue(undefined);

      const result = await executeFunctionPlan(mockContext, plan, [], initialState);

      expect(logger.warn).toHaveBeenCalledWith(
        'State not found for functions.test_fn, skipping deletion',
      );
      expect(fc3Resource.deleteResource).not.toHaveBeenCalled();
      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle unknown action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            action: 'unknown' as any,
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(logger.warn).toHaveBeenCalledWith('Unknown action: unknown for functions.test_fn');
      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle empty plan', async () => {
      const plan: Plan = { items: [] };

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should return partial failure from resource operations', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'create',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const error = new Error('Test error');
      (fc3Resource.createResource as jest.Mock).mockRejectedValue(error);

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toBe('Test error');
      expect(result.partialFailure?.failedItem.logicalId).toBe('functions.test_fn');
      expect(result.partialFailure?.successfulItems).toEqual([]);
    });

    it('should call onStateChange callback after successful operation', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'create',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const newState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { functionName: 'test-function' },
            instances: [{ sid: 'si:test:test:default:test', id: 'test-function' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (fc3Resource.createResource as jest.Mock).mockResolvedValue(newState);
      const onStateChange = jest.fn();

      await executeFunctionPlan(mockContext, plan, [testFunction], initialState, onStateChange);

      expect(onStateChange).toHaveBeenCalledWith(newState);
    });

    it('should track successful items on partial failure', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn1',
            action: 'create',
            resourceType: 'ALIYUN_FC3',
          },
          {
            logicalId: 'functions.test_fn2',
            action: 'create',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const testFunction1 = { ...testFunction, key: 'test_fn1', name: 'test-function-1' };
      const testFunction2 = { ...testFunction, key: 'test_fn2', name: 'test-function-2' };

      const stateAfterFirst = {
        ...initialState,
        resources: {
          'functions.test_fn1': {
            mode: 'managed',
            region: 'cn-hangzhou',
            definition: { functionName: 'test-function-1' },
            instances: [{ sid: 'si:test:test:default:test', id: 'test-function-1' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (fc3Resource.createResource as jest.Mock)
        .mockResolvedValueOnce(stateAfterFirst)
        .mockRejectedValueOnce(new Error('Second function failed'));

      const result = await executeFunctionPlan(
        mockContext,
        plan,
        [testFunction1, testFunction2],
        initialState,
      );

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.successfulItems).toHaveLength(1);
      expect(result.partialFailure?.successfulItems[0].logicalId).toBe('functions.test_fn1');
      expect(result.partialFailure?.failedItem.logicalId).toBe('functions.test_fn2');
      expect(result.state).toEqual(stateAfterFirst);
    });

    it('should use PartialResourceError.updatedState and call onStateChange when createResource throws PartialResourceError', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'create',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const taintedState = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed' as const,
            region: 'cn-hangzhou',
            definition: { functionName: 'test-function' },
            instances: [
              {
                sid: 'si:aliyun:ram:default:test-role',
                roleArn: 'acs:ram::123456789012:role/test-role',
                id: 'test-role',
                type: 'ALIYUN_RAM_ROLE',
              },
            ],
            lastUpdated: new Date().toISOString(),
            status: 'tainted' as const,
          },
        },
      };

      const causeError = new Error('FC function creation failed');
      const partialError = new PartialResourceError(taintedState, causeError);
      (fc3Resource.createResource as jest.Mock).mockRejectedValue(partialError);

      const onStateChange = jest.fn();
      const result = await executeFunctionPlan(
        mockContext,
        plan,
        [testFunction],
        initialState,
        onStateChange,
      );

      expect(onStateChange).toHaveBeenCalledWith(taintedState);
      expect(result.state).toEqual(taintedState);
      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(causeError);
      expect(result.partialFailure?.failedItem.logicalId).toBe('functions.test_fn');
    });

    it('should NOT call onStateChange and use currentState when a plain error is thrown', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'create',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      const plainError = new Error('Plain error');
      (fc3Resource.createResource as jest.Mock).mockRejectedValue(plainError);

      const onStateChange = jest.fn();
      const result = await executeFunctionPlan(
        mockContext,
        plan,
        [testFunction],
        initialState,
        onStateChange,
      );

      expect(onStateChange).not.toHaveBeenCalled();
      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(plainError);
    });
  });
});
