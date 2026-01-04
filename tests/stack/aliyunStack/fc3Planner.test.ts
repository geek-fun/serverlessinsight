import { generateFunctionPlan } from '../../../src/stack/aliyunStack/fc3Planner';
import { loadState, setResource } from '../../../src/common/stateManager';
import { Context, FunctionDomain } from '../../../src/types';
import { ProviderEnum } from '../../../src/common';
import fs from 'node:fs';

// Mock the aliyunClient module
const mockFc3Operations = {
  createFunction: jest.fn(),
  getFunction: jest.fn(),
  updateFunctionConfiguration: jest.fn(),
  updateFunctionCode: jest.fn(),
  deleteFunction: jest.fn(),
};

jest.mock('../../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn().mockReturnValue({
    fc3: mockFc3Operations,
  }),
}));
// Mock hashUtils to avoid file system dependencies
jest.mock('../../../src/common/hashUtils', () => ({
  computeFileHash: jest.fn().mockReturnValue('mock-code-hash'),
}));

describe('FC3 Planner', () => {
  const testDir = '/tmp/test-fc3-planner';

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

  const testFunction: FunctionDomain = {
    key: 'test_fn',
    name: 'test-function',
    code: {
      runtime: 'nodejs20',
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
      // Mock getFc3Function to return null (function doesn\'t exist)
      jest.spyOn(mockFc3Operations, 'getFunction').mockResolvedValue(null);

      const state = loadState('aliyun', testDir);
      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'create',
        resourceType: 'ALIYUN_FC3',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should plan no changes when function exists and matches state', async () => {
      // Add function to state with matching definition
      let state = loadState('aliyun', testDir);
      state = setResource(state, 'functions.test_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'nodejs20',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          diskSize: null,
          environment: { NODE_ENV: 'production' },
          vpcConfig: null,
          gpuConfig: null,
          customContainerConfig: null,
          codeHash: 'mock-code-hash',
        },
        instances: [
          {
            arn: 'arn:acs:fc:cn-hangzhou:123456789012:function/test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getFc3Function to return matching function
      jest.spyOn(mockFc3Operations, 'getFunction').mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'noop',
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('should plan to update when definition changes', async () => {
      // Add function to state with different definition
      let state = loadState('aliyun', testDir);
      state = setResource(state, 'functions.test_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'nodejs20',
          handler: 'index.handler',
          memorySize: 256, // Different from testFunction
          timeout: 10,
          diskSize: null,
          environment: { NODE_ENV: 'production' },
          vpcConfig: null,
          gpuConfig: null,
          customContainerConfig: null,
          codeHash: 'mock-code-hash',
        },
        instances: [
          {
            arn: 'arn:acs:fc:cn-hangzhou:123456789012:function/test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getFc3Function to return existing function
      jest.spyOn(mockFc3Operations, 'getFunction').mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 256,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('should plan to delete function when removed from config', async () => {
      // Add function to state
      let state = loadState('aliyun', testDir);
      state = setResource(state, 'functions.old_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          functionName: 'old-function',
          runtime: 'nodejs20',
          handler: 'index.handler',
          memorySize: 128,
          timeout: 3,
          diskSize: null,
          environment: {},
          vpcConfig: null,
          gpuConfig: null,
          customContainerConfig: null,
          codeHash: 'old-hash',
        },
        instances: [
          {
            arn: 'arn:acs:fc:cn-hangzhou:123456789012:function/old-function',
            id: 'old-function',
            functionName: 'old-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getFc3Function
      jest.spyOn(mockFc3Operations, 'getFunction').mockResolvedValue(null);

      // Pass empty array (no functions)
      const plan = await generateFunctionPlan(mockContext, state, []);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.old_fn',
        action: 'delete',
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('should plan to recreate function when state exists but remote is missing', async () => {
      // Add function to state
      let state = loadState('aliyun', testDir);
      state = setResource(state, 'functions.test_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'nodejs20',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          diskSize: null,
          environment: {},
          vpcConfig: null,
          gpuConfig: null,
          customContainerConfig: null,
          codeHash: 'old-code-hash',
        },
        instances: [
          {
            arn: 'arn:acs:fc:cn-hangzhou:123456789012:function/test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      // Mock getFc3Function to return null (function doesn\'t exist remotely)
      jest.spyOn(mockFc3Operations, 'getFunction').mockResolvedValue(null);

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'create',
        resourceType: 'ALIYUN_FC3',
        drifted: true,
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });
  });
});
