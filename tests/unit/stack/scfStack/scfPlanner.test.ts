import { ProviderEnum, setResource } from '../../../../src/common';
import { generateFunctionPlan } from '../../../../src/stack/scfStack/scfPlanner';
import { Context, FunctionDomain } from '../../../../src/types';

const initalState = {
  version: '1.0.0',
  provider: 'tencent',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

const mockScfOperations = {
  createFunction: jest.fn(),
  getFunction: jest.fn(),
  updateFunctionConfiguration: jest.fn(),
  updateFunctionCode: jest.fn(),
  deleteFunction: jest.fn(),
};

jest.mock('../../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    scf: mockScfOperations,
    cos: {},
    tdsqlc: {},
  }),
}));

jest.mock('../../../../src/common/hashUtils', () => ({
  ...jest.requireActual('../../../../src/common/hashUtils'),
  computeZipContentHash: jest.fn().mockResolvedValue('mock-code-hash'),
}));

describe('SCF Planner', () => {
  const mockContext: Context = {
    stage: 'default',
    app: 'test-app',
    service: 'test-service',
    provider: ProviderEnum.TENCENT,
    region: 'ap-guangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const testFunction: FunctionDomain = {
    key: 'test_fn',
    name: 'test-function',
    code: {
      runtime: 'nodejs18',
      handler: 'index.handler',
      path: 'test.zip',
    },
    memory: 512,
    timeout: 10,
    environment: {
      NODE_ENV: 'production',
    },
    storage: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateFunctionPlan', () => {
    it('should plan to create a new function when state is empty', async () => {
      mockScfOperations.getFunction.mockResolvedValue(null);

      const state = initalState;
      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'create',
        resourceType: 'SCF',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should plan create when state status is tainted', async () => {
      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        status: 'tainted',
        definition: {
          functionName: 'test-function',
          runtime: 'Nodejs18.15',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environment: {},
          codeHash: 'old-code-hash',
          vpcConfig: null,
          diskSize: null,
          cfsConfig: null,
          useGpu: null,
          imageConfig: null,
        },
        instances: [
          {
            sid: 'si:tencent:scf:default:test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'create',
        resourceType: 'SCF',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
      expect(plan.items[0].changes?.before).toBeUndefined();
    });

    it('should fail fast when state is empty but remote function exists untagged', async () => {
      mockScfOperations.getFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Tags: [{ Key: 'env', Value: 'prod' }],
      });

      await expect(generateFunctionPlan(mockContext, initalState, [testFunction])).rejects.toThrow(
        'not owned by this stack',
      );
    });

    it('should plan create when state is empty but remote exists with our tag', async () => {
      mockScfOperations.getFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
      });

      const plan = await generateFunctionPlan(mockContext, initalState, [testFunction]);

      expect(plan.items[0]).toMatchObject({ logicalId: 'functions.test_fn', action: 'create' });
    });

    it('should fail fast when state is tainted and remote exists untagged', async () => {
      mockScfOperations.getFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'nodejs18',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Tags: [],
      });

      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        status: 'tainted',
        definition: { functionName: 'test-function' },
        instances: [],
        lastUpdated: new Date().toISOString(),
      });

      await expect(generateFunctionPlan(mockContext, state, [testFunction])).rejects.toThrow(
        'not owned by this stack',
      );
    });

    it('should plan no changes when function exists and matches state', async () => {
      mockScfOperations.getFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'Nodejs18.15',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
      });

      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'Nodejs18.15',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environment: { NODE_ENV: 'production' },
          codeHash: 'mock-code-hash',
          vpcConfig: null,
          diskSize: null,
          cfsConfig: null,
          useGpu: null,
          imageConfig: null,
        },
        instances: [
          {
            sid: 'si:tencent:scf:default:test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'noop',
        resourceType: 'SCF',
      });
    });

    it('should plan to update when definition changes', async () => {
      mockScfOperations.getFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'Nodejs18.15',
        Handler: 'index.handler',
        MemorySize: 256,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
      });

      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'Nodejs18.15',
          handler: 'index.handler',
          memorySize: 256,
          timeout: 10,
          environment: { NODE_ENV: 'production' },
          codeHash: 'mock-code-hash',
          vpcConfig: null,
          diskSize: null,
          cfsConfig: null,
          useGpu: null,
          imageConfig: null,
        },
        instances: [
          {
            sid: 'si:tencent:scf:default:test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        resourceType: 'SCF',
      });
    });

    it('treats CLS destination change as configuration drift', async () => {
      mockScfOperations.getFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'Nodejs18.15',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
      });

      const fnWithLog = { ...testFunction, log: true };

      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'Nodejs18.15',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environment: { NODE_ENV: 'production' },
          codeHash: 'mock-code-hash',
          vpcConfig: null,
          diskSize: null,
          cfsConfig: null,
          useGpu: null,
          imageConfig: null,
          logConfig: { logset: 'old-logset', topic: 'old-topic' },
        },
        instances: [
          {
            sid: 'si:tencent:scf:default:test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateFunctionPlan(mockContext, state, [fnWithLog]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        resourceType: 'SCF',
        drifted: true,
      });
      expect(plan.items[0].changes?.after).toEqual(
        expect.objectContaining({
          logConfig: {
            logset: 'test-app-default-cls',
            topic: 'test-service-default-test_fn-fn-logs',
          },
        }),
      );
    });

    it('should plan to delete function when removed from config', async () => {
      mockScfOperations.getFunction.mockResolvedValue(null);

      const state = setResource(initalState, 'functions.old_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'old-function',
          runtime: 'Nodejs18.15',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 3,
          environment: {},
          codeHash: 'old-hash',
          vpcConfig: null,
          diskSize: null,
          cfsConfig: null,
          useGpu: null,
          imageConfig: null,
        },
        instances: [
          {
            sid: 'si:tencent:scf:default:old-function',
            id: 'old-function',
            functionName: 'old-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateFunctionPlan(mockContext, state, []);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.old_fn',
        action: 'delete',
        resourceType: 'SCF',
      });
    });

    it('should plan to recreate function when state exists but remote is missing', async () => {
      mockScfOperations.getFunction.mockResolvedValue(null);

      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'Nodejs18.15',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environment: {},
          codeHash: 'old-code-hash',
          vpcConfig: null,
          diskSize: null,
          cfsConfig: null,
          useGpu: null,
          imageConfig: null,
        },
        instances: [
          {
            sid: 'si:tencent:scf:default:test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'create',
        resourceType: 'SCF',
        drifted: true,
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should detect code hash changes', async () => {
      mockScfOperations.getFunction.mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'Nodejs18.15',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
      });

      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'Nodejs18.15',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environment: { NODE_ENV: 'production' },
          codeHash: 'old-code-hash',
          vpcConfig: null,
          diskSize: null,
          cfsConfig: null,
          useGpu: null,
          imageConfig: null,
        },
        instances: [
          {
            sid: 'si:tencent:scf:default:test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        resourceType: 'SCF',
      });
    });
  });
});
