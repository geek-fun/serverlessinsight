import { ProviderEnum, buildFunctionRoleName, setResource } from '../../../../src/common';
import { computeZipContentHash } from '../../../../src/common/hashUtils';
import { createRefreshCache } from '../../../../src/common/refreshCache';
import { generateFunctionPlan } from '../../../../src/stack/aliyunStack/fc3Planner';
import { extractFunctionDomainDefinition } from '../../../../src/stack/aliyunStack/fc3Types';
import {
  Context,
  CURRENT_STATE_VERSION,
  FunctionDomain,
  NasStorageClassEnum,
  ResourceInstance,
  StateFile,
} from '../../../../src/types';

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
  getExecutionPolicyDocument: jest.fn(),
  listAttachedRolePolicies: jest.fn(),
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

  describe('live attribute & role-policy drift (issue #234 phase 1)', () => {
    const remoteFunctionMatch = {
      functionName: 'test-function',
      runtime: 'nodejs20',
      handler: 'index.handler',
      memorySize: 512,
      timeout: 10,
      environmentVariables: { NODE_ENV: 'production' },
    };

    const fc3Instance = {
      sid: 'si:aliyun:fc3:default:test-function',
      id: 'test-function',
      functionName: 'test-function',
    };

    const roleInstance = {
      sid: 'si:aliyun:ram:default:test-managed-role',
      id: 'test-managed-role',
      type: 'ALIYUN_RAM_ROLE',
      roleArn: 'acs:ram::123456789012:role/test-managed-role',
    };

    // Docs mirroring what the executor writes for a plain fn (no network/nas,
    // logConfig undefined): the planner compares parsed JSON against these.
    const FC_TRUST_FC_ONLY = JSON.stringify({
      Version: '1',
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: { Service: ['fc.aliyuncs.com'] },
        },
      ],
    });
    const FC_TRUST_WITH_APIGATEWAY = JSON.stringify({
      Version: '1',
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: { Service: ['fc.aliyuncs.com', 'apigateway.aliyuncs.com'] },
        },
      ],
    });
    const buildExecDoc = (extraStatements: Array<Record<string, unknown>> = []): string =>
      JSON.stringify({
        Statement: [
          {
            Effect: 'Allow',
            Action: ['fc:InvokeFunction'],
            Resource: ['acs:fc:cn-hangzhou:123456789012:functions/test-function'],
          },
          {
            Effect: 'Allow',
            Action: [
              'log:PostLogStoreLogs',
              'log:CreateLogStore',
              'log:GetLogStore',
              'log:ListShards',
              'log:GetCursorOrData',
            ],
            Resource: ['*'],
          },
          ...extraStatements,
        ],
        Version: '1',
      });
    const EXEC_BASELINE_DOC = buildExecDoc();

    const definitionFor = (fn: FunctionDomain): Record<string, unknown> => ({
      functionName: fn.name,
      runtime: 'nodejs20',
      handler: 'index.handler',
      memorySize: fn.memory ?? 512,
      timeout: fn.timeout ?? 10,
      diskSize: null,
      environment: fn.environment ?? {},
      vpcConfig: null,
      gpuConfig: null,
      customContainerConfig: null,
      nasConfig: null,
      logConfig: fn.log ? { enableRequestMetrics: true, enableInstanceMetrics: true } : null,
      codeHash: 'mock-code-hash',
      ...(fn.iam ? { iam: fn.iam } : {}),
    });

    const buildState = (fn: FunctionDomain, instances: ResourceInstance[]): StateFile =>
      setResource(initalState, `functions.${fn.key}`, {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: definitionFor(fn),
        instances,
        lastUpdated: new Date().toISOString(),
      });

    it('flags update+drifted when the live memorySize drifted from the stored definition', async () => {
      const fn = testFunction;
      const state = buildState(fn, [fc3Instance]);
      mockFc3Operations.getFunction.mockResolvedValue({ ...remoteFunctionMatch, memorySize: 256 });

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        resourceType: 'ALIYUN_FC3',
        drifted: true,
      });
    });

    it('flags update+drifted when the live timeout/environment drifted', async () => {
      const fn = testFunction;
      const state = buildState(fn, [fc3Instance]);
      mockFc3Operations.getFunction.mockResolvedValue({
        ...remoteFunctionMatch,
        timeout: 30,
        environmentVariables: { NODE_ENV: 'production', LOG_LEVEL: 'debug' },
      });

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        drifted: true,
      });
    });

    it('stays noop when a richer matching remote returns cloud-only fields', async () => {
      const fn = testFunction;
      const state = buildState(fn, [fc3Instance]);
      mockFc3Operations.getFunction.mockResolvedValue({
        ...remoteFunctionMatch,
        cpu: 0.35,
        codeChecksum: 'checksum-abc',
        codeSize: 1024,
        state: 'Running',
        createdTime: '2025-01-01T00:00:00Z',
        lastModifiedTime: '2025-02-01T00:00:00Z',
        instanceConcurrency: 10,
        idleTimeout: 60,
        layers: [],
        customDNS: { nameServers: ['100.100.2.136'] },
      });

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'noop',
      });
    });

    it('flags update+drifted when the role trust policy drifted (single owner)', async () => {
      const fn: FunctionDomain = {
        ...testFunction,
        iam: { role: { name: 'test-managed-role' } },
      };
      const state = buildState(fn, [fc3Instance, roleInstance]);
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionMatch);
      mockRamOperations.getRole.mockResolvedValue({
        roleName: 'test-managed-role',
        assumeRolePolicyDocument: FC_TRUST_WITH_APIGATEWAY,
      });
      mockRamOperations.getExecutionPolicyDocument.mockResolvedValue(EXEC_BASELINE_DOC);
      mockRamOperations.listAttachedRolePolicies.mockResolvedValue([]);

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        drifted: true,
      });
      expect(mockRamOperations.getRole).toHaveBeenCalledWith('test-managed-role');
      // trust drift short-circuits before the execution-policy/managed reads.
      expect(mockRamOperations.getExecutionPolicyDocument).not.toHaveBeenCalled();
    });

    it('flags update+drifted when the execution/custom policy drifted', async () => {
      const fn: FunctionDomain = {
        ...testFunction,
        iam: {
          role: {
            name: 'test-managed-role',
            statements: [{ effect: 'Allow' as const, action: ['oss:GetObject'], resource: ['*'] }],
          },
        },
      };
      const state = buildState(fn, [fc3Instance, roleInstance]);
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionMatch);
      mockRamOperations.getRole.mockResolvedValue({
        roleName: 'test-managed-role',
        assumeRolePolicyDocument: FC_TRUST_FC_ONLY,
      });
      // Cloud policy is missing the custom statement the config declares.
      mockRamOperations.getExecutionPolicyDocument.mockResolvedValue(EXEC_BASELINE_DOC);
      mockRamOperations.listAttachedRolePolicies.mockResolvedValue([]);

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        drifted: true,
      });
    });

    it('flags update+drifted when the attached managed policies drifted', async () => {
      const fn: FunctionDomain = {
        ...testFunction,
        iam: {
          role: {
            name: 'test-managed-role',
            managed_policies: ['acs:ram::123456789012:policy/AliyunLogFullAccess'],
          },
        },
      };
      const state = buildState(fn, [fc3Instance, roleInstance]);
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionMatch);
      mockRamOperations.getRole.mockResolvedValue({
        roleName: 'test-managed-role',
        assumeRolePolicyDocument: FC_TRUST_FC_ONLY,
      });
      mockRamOperations.getExecutionPolicyDocument.mockResolvedValue(EXEC_BASELINE_DOC);
      mockRamOperations.listAttachedRolePolicies.mockResolvedValue(['AliyunOSSFullAccess']);

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        drifted: true,
      });
      expect(mockRamOperations.listAttachedRolePolicies).toHaveBeenCalledWith('test-managed-role');
    });

    it('stays noop when trust, execution/custom and managed policies all match', async () => {
      const fn: FunctionDomain = {
        ...testFunction,
        iam: { role: { name: 'test-managed-role' } },
      };
      const state = buildState(fn, [fc3Instance, roleInstance]);
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionMatch);
      mockRamOperations.getRole.mockResolvedValue({
        roleName: 'test-managed-role',
        assumeRolePolicyDocument: FC_TRUST_FC_ONLY,
      });
      mockRamOperations.getExecutionPolicyDocument.mockResolvedValue(EXEC_BASELINE_DOC);
      mockRamOperations.listAttachedRolePolicies.mockResolvedValue([]);

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'noop',
      });
      expect(mockRamOperations.getExecutionPolicyDocument).toHaveBeenCalledWith(
        'test-managed-role',
      );
      expect(mockRamOperations.listAttachedRolePolicies).toHaveBeenCalledWith('test-managed-role');
    });

    it('stays noop (never create) when the role probe read fails transiently', async () => {
      const fn: FunctionDomain = {
        ...testFunction,
        iam: { role: { name: 'test-managed-role' } },
      };
      const state = buildState(fn, [fc3Instance, roleInstance]);
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionMatch);
      mockRamOperations.getRole.mockRejectedValue(new Error('RAM request throttled'));

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'noop',
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('skips role-policy compare when the role is shared across functions (noop)', async () => {
      const fn: FunctionDomain = {
        ...testFunction,
        iam: { role: { name: 'test-managed-role' } },
      };
      let state = buildState(fn, [fc3Instance, roleInstance]);
      state = setResource(state, 'functions.other_fn', {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: {
          functionName: 'other-function',
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
          codeHash: 'other-hash',
        },
        instances: [
          {
            sid: 'si:aliyun:fc3:default:other-function',
            id: 'other-function',
            type: 'ALIYUN_FC3_FUNCTION',
          },
          roleInstance,
        ],
        lastUpdated: new Date().toISOString(),
      });
      mockFc3Operations.getFunction.mockResolvedValue(remoteFunctionMatch);
      mockRamOperations.getRole.mockResolvedValue({
        roleName: 'test-managed-role',
        assumeRolePolicyDocument: FC_TRUST_WITH_APIGATEWAY,
      });

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      const fnItem = plan.items.find((item) => item.logicalId === 'functions.test_fn');
      expect(fnItem).toMatchObject({ action: 'noop' });
      expect(mockRamOperations.getExecutionPolicyDocument).not.toHaveBeenCalled();
      expect(mockRamOperations.listAttachedRolePolicies).not.toHaveBeenCalled();
    });

    it('skips role-policy compare when logConfig is not derivable from state (noop)', async () => {
      const fn: FunctionDomain = {
        ...testFunction,
        log: true,
        iam: { role: { name: 'test-managed-role' } },
      };
      // Logging enabled but NO recorded SLS logstore instance: the executor
      // would create one during update, so the planner cannot derive logConfig.
      const state = buildState(fn, [fc3Instance, roleInstance]);
      mockFc3Operations.getFunction.mockResolvedValue({
        ...remoteFunctionMatch,
        logConfig: { enableRequestMetrics: true, enableInstanceMetrics: true },
      });
      mockRamOperations.getRole.mockResolvedValue({
        roleName: 'test-managed-role',
        assumeRolePolicyDocument: FC_TRUST_WITH_APIGATEWAY,
      });

      const plan = await generateFunctionPlan(mockContext, state, [fn]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'noop',
      });
      expect(mockRamOperations.getExecutionPolicyDocument).not.toHaveBeenCalled();
      expect(mockRamOperations.listAttachedRolePolicies).not.toHaveBeenCalled();
    });
  });

  describe('live drift shape parity for container & nas functions (issue #234)', () => {
    // State definitions are built with the same extractor the planner uses, so
    // any shape drift between cloudFc3ToDefinition and the desired definition
    // surfaces here as a failed noop expectation.
    const buildStateFromDefinition = async (fn: FunctionDomain): Promise<StateFile> => {
      const codeHash = fn.code ? await computeZipContentHash(fn.code.path) : null;
      const definition = extractFunctionDomainDefinition(fn, codeHash);
      return setResource(initalState, `functions.${fn.key}`, {
        mode: 'managed',
        region: 'cn-hangzhou',
        definition,
        instances: [
          {
            sid: 'si:aliyun:fc3:default:test-function',
            id: 'test-function',
            functionName: 'test-function',
          },
        ],
        lastUpdated: new Date().toISOString(),
      });
    };

    it('stays noop for a container function without cmd even when the cloud reports image defaults', async () => {
      const containerFn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        container: { image: 'registry.example.com/app:latest', port: 8080 },
        memory: 512,
        timeout: 60,
        storage: {},
      };
      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'custom-container',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 60,
        customContainerConfig: {
          image: 'registry.example.com/app:latest',
          port: 8080,
          entrypoint: ['/bin/sh'],
          accelerationType: 'Default',
        },
      });

      const plan = await generateFunctionPlan(
        mockContext,
        await buildStateFromDefinition(containerFn),
        [containerFn],
      );

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'noop',
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('flags update+drifted for a container function whose image or port changed live', async () => {
      const containerFn: FunctionDomain = {
        key: 'test_fn',
        name: 'test-function',
        container: { image: 'registry.example.com/app:latest', port: 8080 },
        memory: 512,
        timeout: 60,
        storage: {},
      };
      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'custom-container',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 60,
        customContainerConfig: {
          image: 'registry.example.com/app:v2',
          port: 9090,
        },
      });

      const plan = await generateFunctionPlan(
        mockContext,
        await buildStateFromDefinition(containerFn),
        [containerFn],
      );

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        drifted: true,
      });
    });

    it('stays noop for a nas function when the cloud mirrors the declared mount points', async () => {
      const nasFn: FunctionDomain = {
        ...testFunction,
        storage: {
          nas: [
            {
              storage_class: NasStorageClassEnum.STANDARD_CAPACITY,
              mount_path: '/mnt/data',
            },
          ],
        },
      };
      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
        nasConfig: {
          userId: 10003,
          groupId: 10003,
          mountPoints: [
            {
              serverAddr: NasStorageClassEnum.STANDARD_CAPACITY,
              mountDir: '/mnt/data',
              enableTls: false,
            },
          ],
        },
      });

      const plan = await generateFunctionPlan(mockContext, await buildStateFromDefinition(nasFn), [
        nasFn,
      ]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'noop',
        resourceType: 'ALIYUN_FC3',
      });
    });

    it('flags update+drifted for a nas function whose mount points changed live', async () => {
      const nasFn: FunctionDomain = {
        ...testFunction,
        storage: {
          nas: [
            {
              storage_class: NasStorageClassEnum.STANDARD_CAPACITY,
              mount_path: '/mnt/data',
            },
          ],
        },
      };
      mockFc3Operations.getFunction.mockResolvedValue({
        functionName: 'test-function',
        runtime: 'nodejs20',
        handler: 'index.handler',
        memorySize: 512,
        timeout: 10,
        environmentVariables: { NODE_ENV: 'production' },
        nasConfig: {
          userId: 10003,
          groupId: 10003,
          mountPoints: [
            {
              serverAddr: NasStorageClassEnum.STANDARD_CAPACITY,
              mountDir: '/mnt/other',
              enableTls: false,
            },
          ],
        },
      });

      const plan = await generateFunctionPlan(mockContext, await buildStateFromDefinition(nasFn), [
        nasFn,
      ]);

      expect(plan.items[0]).toMatchObject({
        logicalId: 'functions.test_fn',
        action: 'update',
        drifted: true,
      });
    });
  });
});
