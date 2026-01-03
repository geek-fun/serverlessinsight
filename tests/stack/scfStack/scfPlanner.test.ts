import { generateFunctionPlan } from '../../../src/stack/scfStack/scfPlanner';
import { loadState, setResource } from '../../../src/common/stateManager';
import { Context, FunctionDomain } from '../../../src/types';
import { ProviderEnum } from '../../../src/common';
import * as scfProvider from '../../../src/stack/scfStack/scfProvider';
import fs from 'node:fs';

// Mock the ScfProvider module
jest.mock('../../../src/stack/scfStack/scfProvider');
// Mock hashUtils to avoid file system dependencies
jest.mock('../../../src/common/hashUtils', () => ({
  ...jest.requireActual('../../../src/common/hashUtils'),
  computeFileHash: jest.fn().mockReturnValue('mock-code-hash'),
}));

describe('SCF Planner', () => {
  const testDir = '/tmp/test-scf-planner';

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

  describe('generateFunctionPlan', () => {
    it('should plan to create a new function when state is empty', async () => {
      // Mock getScfFunction to return null (function doesn't exist)
      jest.spyOn(scfProvider, 'getScfFunction').mockResolvedValue(null);

      const state = loadState('tencent', testDir);
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
      // Add function to state with matching definition
      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.test_fn', {
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

      // Mock getScfFunction to return matching function
      jest.spyOn(scfProvider, 'getScfFunction').mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'Nodejs18.15',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
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
      // Add function to state with different definition
      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.test_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'Nodejs18.15',
          handler: 'index.handler',
          memorySize: 256, // Different from testFunction
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

      // Mock getScfFunction to return existing function
      jest.spyOn(scfProvider, 'getScfFunction').mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'Nodejs18.15',
        Handler: 'index.handler',
        MemorySize: 256,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
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
      // Add function to state
      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.old_fn', {
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

      // Mock getScfFunction
      jest.spyOn(scfProvider, 'getScfFunction').mockResolvedValue(null);

      // Pass empty array (no functions)
      const plan = await generateFunctionPlan(mockContext, state, []);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.old_fn',
        action: 'delete',
        resourceType: 'SCF',
      });
    });

    it('should plan to recreate function when state exists but remote is missing', async () => {
      // Add function to state
      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.test_fn', {
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

      // Mock getScfFunction to return null (function doesn't exist remotely)
      jest.spyOn(scfProvider, 'getScfFunction').mockResolvedValue(null);

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
      // Add function to state with different code hash
      let state = loadState('tencent', testDir);
      state = setResource(state, 'functions.test_fn', {
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'Nodejs18.15',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environment: { NODE_ENV: 'production' },
          codeHash: 'old-code-hash', // Different from mock return value
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

      // Mock getScfFunction to return existing function
      jest.spyOn(scfProvider, 'getScfFunction').mockResolvedValue({
        FunctionName: 'test-function',
        Runtime: 'Nodejs18.15',
        Handler: 'index.handler',
        MemorySize: 512,
        Timeout: 10,
        Environment: {
          Variables: [{ Key: 'NODE_ENV', Value: 'production' }],
        },
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
