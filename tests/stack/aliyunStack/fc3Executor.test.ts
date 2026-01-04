import { executeFunctionPlan } from '../../../src/stack/aliyunStack/fc3Executor';
import * as fc3Resource from '../../../src/stack/aliyunStack/fc3Resource';
import { ProviderEnum } from '../../../src/common';
import { getResource } from '../../../src/common/stateManager';
import { logger } from '../../../src/common/logger';
import { Context, Plan, StateFile, CURRENT_STATE_VERSION } from '../../../src/types';

// Mock dependencies
jest.mock('../../../src/stack/aliyunStack/fc3Resource');
jest.mock('../../../src/common/stateManager');
jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Fc3Executor', () => {
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

  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'aliyun',
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

      expect(result).toEqual(initialState);
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
            instances: [{ arn: 'arn:test', id: 'test-function' }],
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
      expect(result).toEqual(newState);
    });

    it('should throw error if function not found for create action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.nonexistent',
            action: 'create',
            resourceType: 'ALIYUN_FC3',
          },
        ],
      };

      await expect(
        executeFunctionPlan(mockContext, plan, [testFunction], initialState),
      ).rejects.toThrow('Function not found for logical ID: functions.nonexistent');

      expect(logger.error).toHaveBeenCalled();
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
            instances: [{ arn: 'arn:test', id: 'test-function' }],
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
      expect(result).toEqual(newState);
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
                arn: 'arn:acs:fc:cn-hangzhou:123456789012:function/test-function',
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
      expect(result).toEqual(initialState);
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
      expect(result).toEqual(initialState);
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
      expect(result).toEqual(initialState);
    });

    it('should handle empty plan', async () => {
      const plan: Plan = { items: [] };

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(result).toEqual(initialState);
    });

    it('should propagate errors from resource operations', async () => {
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

      await expect(
        executeFunctionPlan(mockContext, plan, [testFunction], initialState),
      ).rejects.toThrow('Test error');

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to execute create for functions.test_fn'),
      );
    });
  });
});
