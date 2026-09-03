import { ProviderEnum, buildFunctionRoleName, setResource } from '../../../../src/common';
import { createRefreshCache } from '../../../../src/common/refreshCache';
import { generateFunctionPlan } from '../../../../src/stack/aliyunStack/fc3Planner';
import { Context, CURRENT_STATE_VERSION, FunctionDomain } from '../../../../src/types';

const initalState = {
  version: CURRENT_STATE_VERSION,
  provider: 'aliyun',
  app: 'test-app',
  service: 'test-service',
  stages: {},
  resources: {},
};

const mockFc3Operations = {
  createFunction: jest.fn(),
  getFunction: jest.fn(),
  updateFunctionConfiguration: jest.fn(),
  updateFunctionCode: jest.fn(),
  deleteFunction: jest.fn(),
};
const mockEcsOperations = {
  getSecurityGroupByName: jest.fn(),
};
const mockRamOperations = {
  getRole: jest.fn(),
};

jest.mock('../../../../src/common/aliyunClient', () => ({
  createAliyunClient: () => ({
    fc3: mockFc3Operations,
    ecs: mockEcsOperations,
    ram: mockRamOperations,
  }),
}));
jest.mock('../../../../src/common/hashUtils', () => ({
  ...jest.requireActual('../../../../src/common/hashUtils'),
  computeZipContentHash: jest.fn().mockResolvedValue('mock-code-hash'),
}));

describe('FC3 Planner', () => {
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
    jest.clearAllMocks();
  });

  describe('generateFunctionPlan', () => {
    it('should resolve a named security group before planning', async () => {
      mockEcsOperations.getSecurityGroupByName.mockResolvedValue({
        securityGroupId: 'sg-resolved',
      });
      mockFc3Operations.getFunction.mockResolvedValue(null);

      const functionWithNamedSecurityGroup: FunctionDomain = {
        ...testFunction,
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['vsw-123'],
          security_group: { name: 'app-sg', ingress: [], egress: [] },
        },
      };

      const plan = await generateFunctionPlan(mockContext, initalState, [
        functionWithNamedSecurityGroup,
      ]);

      expect(mockEcsOperations.getSecurityGroupByName).toHaveBeenCalledWith('app-sg', 'vpc-123');
      expect(plan.items[0]?.changes?.after).toEqual(
        expect.objectContaining({
          vpcConfig: expect.objectContaining({ securityGroupId: 'sg-resolved' }),
        }),
      );
    });

    it('should fail when a named security group cannot be resolved', async () => {
      mockEcsOperations.getSecurityGroupByName.mockResolvedValue(null);

      const functionWithNamedSecurityGroup: FunctionDomain = {
        ...testFunction,
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['vsw-123'],
          security_group: { name: 'missing-sg', ingress: [], egress: [] },
        },
      };

      await expect(
        generateFunctionPlan(mockContext, initalState, [functionWithNamedSecurityGroup]),
      ).rejects.toThrow('not found');
    });

    it('should plan to create a new function when state is empty', async () => {
      mockFc3Operations.getFunction.mockResolvedValue(null);

      const state = initalState;

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'create',
        resourceType: 'ALIYUN_FC3',
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should fail fast when state is empty but remote function exists untagged', async () => {
      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        tags: [{ Key: 'env', Value: 'prod' }],
      });

      await expect(generateFunctionPlan(mockContext, initalState, [testFunction])).rejects.toThrow(
        'not owned by this stack',
      );
    });

    it('should plan create when state is empty but remote exists with our tag', async () => {
      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
      });

      const plan = await generateFunctionPlan(mockContext, initalState, [testFunction]);

      expect(plan.items[0]).toMatchObject({ logicalId: 'functions.test_fn', action: 'create' });
    });

    it('should fail fast when state is tainted and remote exists untagged', async () => {
      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        tags: [],
      });

      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
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
      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
      });
      const state = setResource(initalState, 'functions.test_fn', {
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
          nasConfig: null,
          logConfig: null,
          codeHash: 'mock-code-hash',
        },
        instances: [
          {
            sid: 'si:aliyun:fc3:default:test-function',
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
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('should plan to update when definition changes', async () => {
      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 256,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
      });

      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'nodejs20',
          handler: 'index.handler',
          memorySize: 256,
          timeout: 10,
          diskSize: null,
          environment: { NODE_ENV: 'production' },
          vpcConfig: null,
          gpuConfig: null,
          customContainerConfig: null,
          nasConfig: null,
          logConfig: null,
          codeHash: 'mock-code-hash',
        },
        instances: [
          {
            sid: 'si:aliyun:fc3:default:test-function',
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
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('should plan to delete function when removed from config', async () => {
      mockFc3Operations.getFunction.mockResolvedValue(null);

      const state = setResource(initalState, 'functions.old_fn', {
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
          nasConfig: null,
          logConfig: null,
          codeHash: 'old-hash',
        },
        instances: [
          {
            sid: 'si:aliyun:fc3:default:old-function',
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
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('should plan to recreate function when state exists but remote is missing', async () => {
      mockFc3Operations.getFunction.mockResolvedValue(null);

      const state = setResource(initalState, 'functions.test_fn', {
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
          nasConfig: null,
          logConfig: null,
          codeHash: 'old-code-hash',
        },
        instances: [
          {
            sid: 'si:aliyun:fc3:default:test-function',
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
        resourceType: 'ALIYUN_FC3',
        drifted: true,
      });
      expect(plan.items[0].changes?.after).toBeDefined();
    });

    it('should plan no changes when logConfig has provider-managed fields in state', async () => {
      const testFunctionWithLog: FunctionDomain = {
        ...testFunction,
        log: true,
      };

      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
        logConfig: {
          project: 'test-project-sls',
          logstore: 'test-project-sls-logstore',
          enableRequestMetrics: true,
          enableInstanceMetrics: true,
        },
      });

      const state = setResource(initalState, 'functions.test_fn', {
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
          nasConfig: null,
          logConfig: {
            project: 'test-project-sls',
            logstore: 'test-project-sls-logstore',
            enableRequestMetrics: true,
            enableInstanceMetrics: true,
            logBeginRule: 'None',
          },
          codeHash: 'mock-code-hash',
        },
        instances: [
          {
            sid: 'si:aliyun:fc3:default:test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunctionWithLog]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'noop',
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('should plan to update when logConfig user-configurable fields change', async () => {
      const testFunctionWithLog: FunctionDomain = {
        ...testFunction,
        log: true,
      };

      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
        logConfig: {
          project: 'test-project-sls',
          logstore: 'test-project-sls-logstore',
          enableRequestMetrics: false,
          enableInstanceMetrics: false,
        },
      });

      const state = setResource(initalState, 'functions.test_fn', {
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
          nasConfig: null,
          logConfig: {
            project: 'test-project-sls',
            logstore: 'test-project-sls-logstore',
            enableRequestMetrics: false,
            enableInstanceMetrics: false,
          },
          codeHash: 'mock-code-hash',
        },
        instances: [
          {
            sid: 'si:aliyun:fc3:default:test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunctionWithLog]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('should reuse cached provider reads across plan passes within one command lifecycle', async () => {
      const cachedContext: Context = { ...mockContext, refreshCache: createRefreshCache() };
      mockFc3Operations.getFunction.mockResolvedValue(null);

      const firstPlan = await generateFunctionPlan(cachedContext, initalState, [testFunction]);
      const secondPlan = await generateFunctionPlan(cachedContext, initalState, [testFunction]);

      expect(firstPlan.items[0]).toMatchObject({ action: 'create' });
      expect(secondPlan.items[0]).toMatchObject({ action: 'create' });
      expect(mockFc3Operations.getFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe('managed role reconciliation (issue #234)', () => {
    const remoteFunctionExists = {
      functionName: 'test-function',
      runtime: 'nodejs20',
      handler: 'index.handler',
      memorySize: 512,
      timeout: 10,
      environmentVariables: { NODE_ENV: 'production' },
      tags: [{ key: 'si:owner', value: 'test-app:test-service:functions.test_fn' }],
    };

    const stateWithDefinition = (definition: Record<string, unknown>): unknown =>
      setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition,
        instances: [],
        lastUpdated: new Date().toISOString(),
      });

    const remoteFc3Instance = {
      sid: 'si:aliyun:fc3:default:test-function',
      id: 'test-function',
      functionName: 'test-function',
    };

    it('plans update when iam.role is declared, no instance recorded, and the role is absent in the provider', async () => {
      const statements = [{ effect: 'Allow' as const, action: ['oss:PutObject'], resource: ['*'] }];
      const fnWithIam: FunctionDomain = { ...testFunction, iam: { role: { statements } } };
      const state = stateWithDefinition({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environment: { NODE_ENV: 'production' },
        codeHash: 'mock-code-hash',
        iam: { role: { statements } },
      });
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionExists);
      mockRamOperations.getRole.mockResolvedValue(null);

      const plan = await generateFunctionPlan(mockContext, state as never, [fnWithIam]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        drifted: true,
      });
      expect(mockRamOperations.getRole).toHaveBeenCalledWith(
        buildFunctionRoleName('test-app-test-service', 'default', 'test_fn'),
      );
    });

    it('plans update when the recorded role instance is gone from the provider', async () => {
      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'nodejs20',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environment: { NODE_ENV: 'production' },
          codeHash: 'mock-code-hash',
        },
        instances: [
          remoteFc3Instance,
          {
            sid: 'si:aliyun:ram:default:legacy-role',
            id: 'legacy-role',
            type: 'ALIYUN_RAM_ROLE',
            roleArn: 'acs:ram::123456789012:role/legacy-role',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionExists);
      mockRamOperations.getRole.mockResolvedValue(null);

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        drifted: true,
      });
      expect(mockRamOperations.getRole).toHaveBeenCalledWith('legacy-role');
    });

    it('stays noop when the recorded role still exists in the provider', async () => {
      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'nodejs20',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environment: { NODE_ENV: 'production' },
          codeHash: 'mock-code-hash',
        },
        instances: [
          remoteFc3Instance,
          {
            sid: 'si:aliyun:ram:default:legacy-role',
            id: 'legacy-role',
            type: 'ALIYUN_RAM_ROLE',
            roleArn: 'acs:ram::123456789012:role/legacy-role',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionExists);
      mockRamOperations.getRole.mockResolvedValue({
        roleName: 'legacy-role',
        arn: 'acs:ram::123456789012:role/legacy-role',
      });

      const plan = await generateFunctionPlan(mockContext, state, [testFunction]);

      expect(plan.items[0]).toMatchObject({ action: 'noop' });
    });

    it('skips the role probe for external (string) roles', async () => {
      const externalRoleArn = 'acs:ram::123456789012:role/someone-elses-role';
      const state = setResource(initalState, 'functions.test_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          functionName: 'test-function',
          runtime: 'nodejs20',
          handler: 'index.handler',
          memorySize: 512,
          timeout: 10,
          environment: { NODE_ENV: 'production' },
          codeHash: 'mock-code-hash',
          iam: { role: externalRoleArn },
        },
        instances: [remoteFc3Instance],
        lastUpdated: new Date().toISOString(),
      });
      const fnWithExternalRole: FunctionDomain = {
        ...testFunction,
        iam: { role: externalRoleArn },
      };
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionExists);

      const plan = await generateFunctionPlan(mockContext, state, [fnWithExternalRole]);

      expect(plan.items[0]).toMatchObject({ action: 'noop' });
      expect(mockRamOperations.getRole).not.toHaveBeenCalled();
    });
  });
});
