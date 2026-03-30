import { executeFunctionPlan } from '../../../../src/stack/volcengineStack/vefaasExecutor';
import {
  createResource,
  updateResource,
  deleteResource,
} from '../../../../src/stack/volcengineStack/vefaasResource';
import { PartialResourceError } from '../../../../src/types';
import type { FunctionDomain, Context, Plan, StateFile } from '../../../../src/types';

jest.mock('../../../../src/stack/volcengineStack/vefaasResource', () => ({
  createResource: jest.fn(),
  updateResource: jest.fn(),
  deleteResource: jest.fn(),
  readResource: jest.fn(),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getResource: jest.fn(),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('vefaasExecutor', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: 'volcengine' as unknown as Context['provider'],
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockState: StateFile = {
    version: '1.0',
    provider: 'volcengine',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const mockFunction: FunctionDomain = {
    key: 'test_fn',
    name: 'test-function',
    code: {
      path: '/test/code.zip',
      handler: 'index.handler',
      runtime: 'nodejs16',
    },
    memory: 128,
    timeout: 30,
    storage: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('executeFunctionPlan', () => {
    it('should execute create action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'create',
            resourceType: 'VOLCENGINE_VEFAAS',
          },
        ],
      };

      const newState = {
        ...mockState,
        resources: { 'functions.test_fn': { mode: 'managed' } },
      };
      (createResource as jest.Mock).mockResolvedValueOnce(newState);

      const result = await executeFunctionPlan(mockContext, plan, [mockFunction], mockState);

      expect(createResource).toHaveBeenCalledWith(mockContext, mockFunction, mockState);
      expect(result.state).toBe(newState);
    });

    it('should execute update action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'update',
            resourceType: 'VOLCENGINE_VEFAAS',
          },
        ],
      };

      (updateResource as jest.Mock).mockResolvedValueOnce({
        ...mockState,
        resources: { 'functions.test_fn': {} },
      });

      await executeFunctionPlan(mockContext, plan, [mockFunction], mockState);

      expect(updateResource).toHaveBeenCalledWith(mockContext, mockFunction, mockState);
    });

    it('should execute delete action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'delete',
            resourceType: 'VOLCENGINE_VEFAAS',
            changes: { before: { functionName: 'test-function' } },
          },
        ],
      };

      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function' },
            instances: [],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const { getResource } = jest.requireMock('../../../../src/common/stateManager');
      getResource.mockReturnValueOnce(stateWithFunction.resources['functions.test_fn']);

      (deleteResource as jest.Mock).mockResolvedValueOnce(mockState);

      await executeFunctionPlan(mockContext, plan, [], stateWithFunction);

      expect(deleteResource).toHaveBeenCalled();
    });

    it('should handle noop action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'noop',
            resourceType: 'VOLCENGINE_VEFAAS',
          },
        ],
      };

      await executeFunctionPlan(mockContext, plan, [mockFunction], mockState);

      expect(createResource).not.toHaveBeenCalled();
      expect(updateResource).not.toHaveBeenCalled();
      expect(deleteResource).not.toHaveBeenCalled();
    });

    it('should return partial failure for missing function on create', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.missing',
            action: 'create',
            resourceType: 'VOLCENGINE_VEFAAS',
          },
        ],
      };

      const result = await executeFunctionPlan(mockContext, plan, [], mockState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Function not found');
    });

    it('should handle partial failure', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'create',
            resourceType: 'VOLCENGINE_VEFAAS',
          },
        ],
      };

      (createResource as jest.Mock).mockRejectedValueOnce(new Error('Creation failed'));

      const result = await executeFunctionPlan(mockContext, plan, [mockFunction], mockState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toBe('Creation failed');
    });

    it('should call onStateChange after each operation', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'create',
            resourceType: 'VOLCENGINE_VEFAAS',
          },
        ],
      };

      const onStateChange = jest.fn();
      const newState = { ...mockState, resources: { 'functions.test_fn': {} } };
      (createResource as jest.Mock).mockResolvedValueOnce(newState);

      await executeFunctionPlan(mockContext, plan, [mockFunction], mockState, onStateChange);

      expect(onStateChange).toHaveBeenCalledWith(newState);
    });

    it('should handle unknown action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'refresh' as unknown as 'create',
            resourceType: 'VOLCENGINE_VEFAAS',
          },
        ],
      };

      await executeFunctionPlan(mockContext, plan, [mockFunction], mockState);

      expect(createResource).not.toHaveBeenCalled();
      expect(updateResource).not.toHaveBeenCalled();
      expect(deleteResource).not.toHaveBeenCalled();
    });

    it('should handle delete with missing state gracefully', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'delete',
            resourceType: 'VOLCENGINE_VEFAAS',
            changes: { before: { functionName: 'test-function' } },
          },
        ],
      };

      const { getResource } = jest.requireMock('../../../../src/common/stateManager');
      getResource.mockReturnValueOnce(undefined);

      await executeFunctionPlan(mockContext, plan, [], mockState);

      expect(deleteResource).not.toHaveBeenCalled();
    });

    it('should return partial failure for missing function on update', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.missing',
            action: 'update',
            resourceType: 'VOLCENGINE_VEFAAS',
          },
        ],
      };

      const result = await executeFunctionPlan(mockContext, plan, [], mockState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Function not found');
    });

    it('should handle PartialResourceError with updatedState', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'functions.test_fn',
            action: 'create',
            resourceType: 'VOLCENGINE_VEFAAS',
          },
        ],
      };

      const updatedState: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function' },
            instances: [
              {
                sid: 'test-sid',
                id: 'test-function',
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                status: 'tainted',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      const causeError = new Error('Bootstrap failed');
      const partialError = new PartialResourceError(updatedState, causeError);

      (createResource as jest.Mock).mockRejectedValueOnce(partialError);

      const onStateChange = jest.fn();
      const result = await executeFunctionPlan(
        mockContext,
        plan,
        [mockFunction],
        mockState,
        onStateChange,
      );

      expect(onStateChange).toHaveBeenCalledWith(updatedState);
      expect(result.state).toBe(updatedState);
      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toBe(causeError);
    });
  });
});
