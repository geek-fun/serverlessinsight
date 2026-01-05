import { ProviderEnum, setResource } from '../../../src/common';
import { generateFunctionPlan } from '../../../src/stack/scfStack/scfPlanner';
import { Context, FunctionDomain } from '../../../src/types';

const initalState = { version: '1.0.0', provider: 'tencent', resources: {} };

const mockScfOperations = {
  createFunction: jest.fn(),
  getFunction: jest.fn(),
  updateFunctionConfiguration: jest.fn(),
  updateFunctionCode: jest.fn(),
  deleteFunction: jest.fn(),
};

jest.mock('../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    scf: mockScfOperations,
    cos: {},
    tdsqlc: {},
  }),
}));

jest.mock('../../../src/common/hashUtils', () => ({
  ...jest.requireActual('../../../src/common/hashUtils'),
  computeFileHash: jest.fn().mockReturnValue('mock-code-hash'),
}));

describe('SCF Planner', () => {
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
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-function',
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
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-function',
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
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:old-function',
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
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-function',
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
        },
        instances: [
          {
            arn: 'arn:tencent:scf:ap-guangzhou::function:test-function',
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
