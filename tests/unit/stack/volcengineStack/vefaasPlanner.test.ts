import { generateFunctionPlan } from '../../../../src/stack/volcengineStack/vefaasPlanner';
import { createVolcengineClient } from '../../../../src/common/volcengineClient';
import type { FunctionDomain, Context, StateFile } from '../../../../src/types';
import * as stateManager from '../../../../src/common/stateManager';
import * as hashUtils from '../../../../src/common/hashUtils';

jest.mock('../../../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(),
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

describe('vefaasPlanner', () => {
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

  const mockVefaasClient = {
    vefaas: {
      getFunction: jest.fn(),
    },
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
    (createVolcengineClient as jest.Mock).mockReturnValue(mockVefaasClient);
    jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);
    jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
    jest
      .spyOn(hashUtils, 'attributesEqual')
      .mockImplementation((a, b) => JSON.stringify(a) === JSON.stringify(b));
    jest.spyOn(hashUtils, 'computeZipContentHash').mockResolvedValue('test-hash');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('generateFunctionPlan', () => {
    let mockVefaasClient: { vefaas: { getFunction: jest.Mock } };

    beforeEach(() => {
      mockVefaasClient = {
        vefaas: {
          getFunction: jest.fn(),
        },
      };
      (createVolcengineClient as jest.Mock).mockReturnValue(mockVefaasClient);
      jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue({});
      jest
        .spyOn(hashUtils, 'attributesEqual')
        .mockImplementation((a, b) => JSON.stringify(a) === JSON.stringify(b));
      jest.spyOn(hashUtils, 'computeZipContentHash').mockResolvedValue('test-hash');
    });

    it('should not include non-function resources in delete plan', async () => {
      const stateWithMixed: StateFile = {
        ...mockState,
        resources: {
          'functions.old_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'old-function' },
            instances: [
              { sid: 'test-sid', id: 'old-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { groupName: 'test-gateway' },
            instances: [{ sid: 'event-sid', id: 'gateway-123', type: 'VOLCENGINE_APIGW_GROUP' }],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      jest.spyOn(stateManager, 'getAllResources').mockReturnValue(stateWithMixed.resources);

      const result = await generateFunctionPlan(mockContext, stateWithMixed, []);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].logicalId).toBe('functions.old_fn');
    });

    it('should generate delete plan for functions removed from desired set', async () => {
      const stateWithMultipleFns: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function' },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
          'functions.old_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'old-function' },
            instances: [
              { sid: 'test-sid2', id: 'old-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce(null);
      jest.spyOn(stateManager, 'getAllResources').mockReturnValue(stateWithMultipleFns.resources);
      jest.spyOn(stateManager, 'getResource').mockReturnValue(undefined);

      const result = await generateFunctionPlan(mockContext, stateWithMultipleFns, [mockFunction]);

      const deleteItems = result.items.filter((i) => i.action === 'delete');
      expect(deleteItems).toHaveLength(1);
      expect(deleteItems[0].logicalId).toBe('functions.old_fn');
    });

    it('should return empty plan when functions array is empty', async () => {
      const result = await generateFunctionPlan(mockContext, mockState, []);

      expect(result.items).toEqual([]);
    });

    it('should generate create plan for new function', async () => {
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce(null);

      const result = await generateFunctionPlan(mockContext, mockState, [mockFunction]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('create');
      expect(result.items[0].logicalId).toBe('functions.test_fn');
    });

    it('should fail fast when state is empty but remote function exists untagged', async () => {
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        runtime: 'node20/v1',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
        Tags: [{ Key: 'env', Value: 'prod' }],
      });

      await expect(generateFunctionPlan(mockContext, mockState, [mockFunction])).rejects.toThrow(
        'not owned by this stack',
      );
    });

    it('should plan create when state is empty but remote exists with our tag', async () => {
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        runtime: 'node20/v1',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
      });

      const result = await generateFunctionPlan(mockContext, mockState, [mockFunction]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'create',
      });
    });

    it('should plan create when state is empty and remote function is missing', async () => {
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce(null);

      const result = await generateFunctionPlan(mockContext, mockState, [mockFunction]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'create',
      });
    });

    it('should fail fast when state is tainted and remote function exists untagged', async () => {
      const taintedState: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function' },
            instances: [],
            status: 'tainted',
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(taintedState.resources['functions.test_fn']);
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        runtime: 'node20/v1',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
        Tags: [],
      });

      await expect(generateFunctionPlan(mockContext, taintedState, [mockFunction])).rejects.toThrow(
        'not owned by this stack',
      );
    });

    it('should generate update plan when function exists with changes', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              memorySize: 64,
              codeHash: 'old-hash',
            },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        memoryMb: 64,
      });

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithFunction.resources['functions.test_fn']);

      const result = await generateFunctionPlan(mockContext, stateWithFunction, [mockFunction]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('update');
    });

    it('should generate noop plan when function unchanged', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              memorySize: 128,
              timeout: 30,
              codeHash: 'test-hash',
              runtime: 'nodejs16',
              handler: 'index.handler',
              environment: {},
            },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        memoryMb: 128,
      });

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithFunction.resources['functions.test_fn']);
      jest.spyOn(hashUtils, 'attributesEqual').mockReturnValue(true);

      const result = await generateFunctionPlan(mockContext, stateWithFunction, [mockFunction]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('noop');
    });

    it('should inherit auto-created role trn from state when YAML omits iam', async () => {
      const roleTrn = 'trn:iam::2130755970:role/rest-api-app-rest-api-volcengine-dev-role';
      const stateWithRole: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              memorySize: 128,
              timeout: 30,
              codeHash: 'test-hash',
              runtime: 'nodejs16',
              handler: 'index.handler',
              environment: {},
              role: roleTrn,
            },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
              {
                sid: 'role-sid',
                id: 'rest-api-app-rest-api-volcengine-dev-role',
                type: 'VOLCENGINE_IAM_ROLE',
                trn: roleTrn,
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-1',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
        environmentVariables: {},
        role: roleTrn,
      });

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithRole.resources['functions.test_fn']);

      const result = await generateFunctionPlan(mockContext, stateWithRole, [mockFunction]);

      expect(result.items).toHaveLength(1);
      const after = (result.items[0] as { changes?: { after?: { role?: string } } }).changes?.after;
      expect(after?.role).toBe(roleTrn);
    });

    it('should plan update when the LIVE provider function drifted from desired', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              memorySize: 128,
              timeout: 30,
              codeHash: 'test-hash',
              runtime: 'nodejs16',
              handler: 'index.handler',
              environment: {},
            },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      // Local definition matches desired, but the LIVE function was edited in
      // the console (memory 128 -> 256) — the planner must detect the drift.
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-1',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 256,
        requestTimeout: 30,
        environmentVariables: {},
      });

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithFunction.resources['functions.test_fn']);

      const result = await generateFunctionPlan(mockContext, stateWithFunction, [mockFunction]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('update');
      expect(result.items[0].drifted).toBe(true);
    });

    it('should generate delete plan for removed function', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.old_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'old-function',
            },
            instances: [
              { sid: 'test-sid', id: 'old-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      jest.spyOn(stateManager, 'getAllResources').mockReturnValue(stateWithFunction.resources);

      const result = await generateFunctionPlan(mockContext, stateWithFunction, []);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('delete');
      expect(result.items[0].logicalId).toBe('functions.old_fn');
    });

    it('should generate create plan when function not found in provider', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
            },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce(null);

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithFunction.resources['functions.test_fn']);

      const result = await generateFunctionPlan(mockContext, stateWithFunction, [mockFunction]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('create');
      expect(result.items[0].drifted).toBe(true);
    });

    it('should handle error when checking remote function', async () => {
      const stateWithFunction: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
            },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.vefaas.getFunction.mockRejectedValueOnce(new Error('Network error'));

      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithFunction.resources['functions.test_fn']);

      const result = await generateFunctionPlan(mockContext, stateWithFunction, [mockFunction]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].action).toBe('create');
    });

    it('should reuse TLS topic names from state when function logging is enabled', async () => {
      const functionWithLog: FunctionDomain = { ...mockFunction, log: true };
      const stateWithTlsTopic: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function' },
            instances: [
              { sid: 'test-sid', id: 'test-function', type: 'VOLCENGINE_VEFAAS_FUNCTION' },
              {
                sid: 'topic-sid',
                id: 'existing-project/existing-topic',
                type: 'VOLCENGINE_TLS_TOPIC',
              },
            ],
            status: 'tainted',
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };
      jest
        .spyOn(stateManager, 'getResource')
        .mockReturnValue(stateWithTlsTopic.resources['functions.test_fn']);
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
      });

      const result = await generateFunctionPlan(mockContext, stateWithTlsTopic, [functionWithLog]);

      expect(result.items[0]).toMatchObject({
        action: 'create',
        changes: {
          after: { logConfig: { project: 'existing-project', topic: 'existing-topic' } },
        },
      });
    });

    it('should derive deterministic TLS names when logging is enabled without TLS state', async () => {
      const functionWithLog: FunctionDomain = { ...mockFunction, log: true };
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce(null);

      const result = await generateFunctionPlan(mockContext, mockState, [functionWithLog]);

      expect(result.items[0]).toMatchObject({
        action: 'create',
        changes: {
          after: {
            logConfig: {
              project: 'test-app-test-service-dev-tls',
              topic: 'test-app-test-service-dev-logs',
            },
          },
        },
      });
    });
  });
});
