import { executeFunctionPlan } from '../../../src/stack/scfStack/scfExecutor';
import * as scfResource from '../../../src/stack/scfStack/scfResource';
import { ProviderEnum } from '../../../src/common';
import { getResource } from '../../../src/common/stateManager';
import { logger } from '../../../src/common/logger';
import { Context, Plan, StateFile, CURRENT_STATE_VERSION } from '../../../src/types';

// Mock dependencies
jest.mock('../../../src/stack/scfStack/scfResource');
jest.mock('../../../src/common/stateManager');
jest.mock('../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ScfExecutor', () => {
  const mockContext: Context = {
    stage: 'default',
    stackName: 'test-stack',
    provider: ProviderEnum.TENCENT,
    region: 'ap-guangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'tencent',
    resources: {},
  };

  const testFunction = {
    key: 'test_fn',
    name: 'test-function',
    code: {
      runtime: 'nodejs18',
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
            resourceType: 'SCF',
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
            resourceType: 'SCF',
          },
        ],
      };

      const newState = {
        ...initialState,
        resources: { 'functions.test_fn': { type: 'SCF', physicalId: 'test-function' } },
      };

      (scfResource.createResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(scfResource.createResource).toHaveBeenCalledWith(
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
            resourceType: 'SCF',
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
            resourceType: 'SCF',
          },
        ],
      };

      const newState = {
        ...initialState,
        resources: { 'functions.test_fn': { type: 'SCF', physicalId: 'test-function' } },
      };

      (scfResource.updateResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(scfResource.updateResource).toHaveBeenCalledWith(
        mockContext,
        testFunction,
        initialState,
      );
      expect(logger.info).toHaveBeenCalledWith('Updating function: test-function');
      expect(logger.info).toHaveBeenCalledWith('Successfully updated function: test-function');
      expect(result).toEqual(newState);
    });

    it('should throw error if function not found for update action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.nonexistent',
            action: 'update',
            resourceType: 'SCF',
          },
        ],
      };

      await expect(
        executeFunctionPlan(mockContext, plan, [testFunction], initialState),
      ).rejects.toThrow('Function not found for logical ID: functions.nonexistent');

      expect(logger.error).toHaveBeenCalled();
    });

    it('should execute delete action successfully', async () => {
      const stateWithFunction: StateFile = {
        ...initialState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-function',
            region: 'ap-guangzhou',
            attributes: {
              functionName: 'test-function',
              runtime: 'Nodejs18.15',
              handler: 'index.handler',
              memorySize: 512,
              timeout: 10,
              environment: null,
            },
            lastUpdated: '2025-01-01T00:00:00Z',
          },
        },
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'delete',
            resourceType: 'SCF',
          },
        ],
      };

      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);
      (scfResource.deleteResource as jest.Mock).mockResolvedValue(initialState);

      const result = await executeFunctionPlan(mockContext, plan, [], stateWithFunction);

      expect(getResource).toHaveBeenCalledWith(stateWithFunction, 'functions.test_fn');
      expect(scfResource.deleteResource).toHaveBeenCalledWith(
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
            resourceType: 'SCF',
          },
        ],
      };

      (getResource as jest.Mock).mockReturnValue(undefined);

      const result = await executeFunctionPlan(mockContext, plan, [], initialState);

      expect(logger.warn).toHaveBeenCalledWith(
        'State not found for functions.test_fn, skipping deletion',
      );
      expect(scfResource.deleteResource).not.toHaveBeenCalled();
      expect(result).toEqual(initialState);
    });

    it('should handle unknown action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            action: 'unknown' as any,
            resourceType: 'SCF',
          },
        ],
      };

      const result = await executeFunctionPlan(mockContext, plan, [testFunction], initialState);

      expect(logger.warn).toHaveBeenCalledWith('Unknown action: unknown for functions.test_fn');
      expect(result).toEqual(initialState);
    });

    it('should handle multiple actions in sequence', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn1',
            action: 'create',
            resourceType: 'SCF',
          },
          {
            logicalId: 'functions.test_fn2',
            action: 'noop',
            resourceType: 'SCF',
          },
        ],
      };

      const testFunction1 = { ...testFunction, key: 'test_fn1', name: 'test-function-1' };
      const testFunction2 = { ...testFunction, key: 'test_fn2', name: 'test-function-2' };

      const newState = {
        ...initialState,
        resources: { 'functions.test_fn1': { type: 'SCF', physicalId: 'test-function-1' } },
      };

      (scfResource.createResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeFunctionPlan(
        mockContext,
        plan,
        [testFunction1, testFunction2],
        initialState,
      );

      expect(scfResource.createResource).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith('No changes for functions.test_fn2');
      expect(result).toEqual(newState);
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
            resourceType: 'SCF',
          },
        ],
      };

      const error = new Error('Test error');
      (scfResource.createResource as jest.Mock).mockRejectedValue(error);

      await expect(
        executeFunctionPlan(mockContext, plan, [testFunction], initialState),
      ).rejects.toThrow('Test error');

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to execute create for functions.test_fn'),
      );
    });
  });
});
