import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from '../../../../src/stack/volcengineStack/vefaasResource';
import { createVolcengineClient } from '../../../../src/common/volcengineClient';
import {
  setResource,
  removeResource,
  getResource,
  setSharedResource,
  removeSharedResource,
  attributesEqual,
} from '../../../../src/common';
import type { FunctionDomain, Context, StateFile } from '../../../../src/types';
import { PartialResourceError } from '../../../../src/types';

jest.mock('../../../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(),
}));

jest.mock('../../../../src/common', () => {
  const constrainedName = ({
    parts,
    maxLength,
    charset,
  }: {
    parts: string[];
    maxLength: number;
    charset: string;
  }) => {
    const separator = charset === 'underscore' ? '_' : '-';
    const invalid = charset === 'underscore' ? /[^A-Za-z0-9_]/g : /[^A-Za-z0-9-]/g;
    const joined = parts
      .map((part) => part.replace(invalid, separator))
      .filter((part) => part.length > 0)
      .join(separator);
    return joined.length <= maxLength ? joined : joined.slice(0, maxLength);
  };

  return {
    setResource: jest.fn((state, logicalId, resourceState) => ({
      ...state,
      resources: { ...state.resources, [logicalId]: resourceState },
    })),
    removeResource: jest.fn((state, logicalId) => ({
      ...state,
      resources: Object.fromEntries(
        Object.entries(state.resources).filter(([key]) => key !== logicalId),
      ),
    })),
    getResource: jest.fn(),
    getAllResources: jest.fn(
      (state?: { resources?: Record<string, unknown> }) => state?.resources ?? {},
    ),
    setSharedResource: jest.fn((state, stage, key, resourceState) => ({
      ...state,
      stages: {
        ...state.stages,
        [stage]: {
          ...state.stages?.[stage],
          resources: state.stages?.[stage]?.resources ?? {},
          shared: { ...state.stages?.[stage]?.shared, [key]: resourceState },
        },
      },
    })),
    getSharedResource: jest.fn((state, stage, key) => state.stages?.[stage]?.shared?.[key]),
    removeSharedResource: jest.fn((state, stage, key) => ({
      ...state,
      stages: {
        ...state.stages,
        [stage]: {
          ...state.stages?.[stage],
          shared: Object.fromEntries(
            Object.entries(state.stages?.[stage]?.shared ?? {}).filter(([k]) => k !== key),
          ),
        },
      },
    })),
    computeZipContentHash: jest.fn().mockResolvedValue('test-hash-123'),
    buildSid: jest.fn(
      (provider, service, stage, name) => `${provider}-${service}-${stage}-${name}`,
    ),
    attributesEqual: jest.fn((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    buildConstrainedName: jest.fn(constrainedName),
    buildFunctionRoleName: jest.fn((serviceName: string, stage: string, fnKey: string) =>
      constrainedName({
        parts: [serviceName, stage, fnKey, 'role'],
        maxLength: 64,
        charset: 'hyphen',
      }),
    ),
  };
});

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

jest.mock('node:fs', () => ({
  readFileSync: jest.fn(() => Buffer.from('test code content')),
}));

describe('vefaasResource', () => {
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

  const mockVefaasClient = {
    vefaas: {
      createFunction: jest.fn(),
      getFunction: jest.fn(),
      getFunctionById: jest.fn(),
      updateFunctionConfiguration: jest.fn(),
      updateFunctionCode: jest.fn(),
      deleteFunction: jest.fn(),
    },
    iam: {
      createRole: jest.fn(),
      getRole: jest.fn(),
      updateRoleTrustPolicy: jest.fn(),
      deleteRole: jest.fn(),
      attachRolePolicy: jest.fn(),
      detachRolePolicy: jest.fn(),
      updateRolePolicy: jest.fn(),
      updateManagedPolicies: jest.fn(),
      listAttachedRolePolicies: jest.fn(),
    },
    tls: {
      createProject: jest.fn(),
      getProject: jest.fn(),
      getProjectTags: jest.fn(),
      deleteProject: jest.fn(),
      createTopic: jest.fn(),
      getTopic: jest.fn(),
      deleteTopic: jest.fn(),
      createIndex: jest.fn(),
      deleteIndex: jest.fn(),
      waitForProject: jest.fn(),
      waitForTopic: jest.fn(),
      addTags: jest.fn(),
      removeTags: jest.fn(),
      listTopics: jest.fn(),
    },
  };

  beforeEach(() => {
    // mockReset (not clearAllMocks) also drains any unconsumed mockResolvedValueOnce
    // queues left over from the previous test — clearAllMocks leaves them behind,
    // leaking across tests and causing spurious failures.
    Object.values(mockVefaasClient).forEach((group) => {
      Object.values(group).forEach((fn) => {
        if (typeof fn === 'function' && 'mockReset' in fn) {
          fn.mockReset();
        }
      });
    });
    jest.clearAllMocks();
    (getResource as jest.Mock).mockReset();
    (createVolcengineClient as jest.Mock).mockReturnValue(mockVefaasClient);
    mockVefaasClient.vefaas.getFunctionById.mockResolvedValue({
      functionName: 'test-function',
      functionId: 'func-123',
      runtime: 'nodejs18',
      handler: 'index.handler',
      memoryMb: 128,
      requestTimeout: 30,
      status: 'Active',
    });
    mockVefaasClient.vefaas.getFunction.mockResolvedValue({
      functionName: 'test-function',
      functionId: 'func-123',
      runtime: 'nodejs18',
      handler: 'index.handler',
      memoryMb: 128,
      requestTimeout: 30,
      status: 'Active',
    });
    mockVefaasClient.iam.createRole.mockResolvedValue({
      roleName: 'test-app-test-service-dev-role',
      trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
    });
    mockVefaasClient.tls.createProject.mockResolvedValue({
      projectName: 'test-project',
    });
    mockVefaasClient.tls.getProject.mockResolvedValue({
      projectId: 'proj-1',
      projectName: 'test-project',
      status: 'Active',
    });
    mockVefaasClient.tls.getProjectTags.mockResolvedValue([]);
    mockVefaasClient.tls.createTopic.mockResolvedValue({
      topicName: 'test-topic',
    });
    mockVefaasClient.tls.waitForProject.mockResolvedValue(undefined);
    mockVefaasClient.tls.waitForTopic.mockResolvedValue(undefined);
  });

  describe('createResource', () => {
    it('should create function successfully', async () => {
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunction, mockState);

      expect(mockVefaasClient.vefaas.createFunction).toHaveBeenCalled();
      expect(mockVefaasClient.iam.createRole).toHaveBeenCalled();
      expect(setResource).toHaveBeenCalled();
    });

    it('should stamp ownership tag into the createFunction config', async () => {
      mockVefaasClient.vefaas.createFunction.mockReset();
      mockVefaasClient.vefaas.getFunction.mockReset();
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunction, mockState);

      expect(mockVefaasClient.vefaas.createFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
        }),
        expect.any(String),
      );
    });

    it('should idempotently adopt an existing function that carries our ownership tag', async () => {
      mockVefaasClient.vefaas.createFunction.mockReset();
      mockVefaasClient.vefaas.getFunction.mockReset();
      const existsError = Object.assign(new Error('Function already exists'), { code: 'Conflict' });
      mockVefaasClient.vefaas.createFunction.mockRejectedValueOnce(existsError);
      mockVefaasClient.vefaas.getFunction
        .mockResolvedValueOnce({
          functionName: 'test-function',
          functionId: 'func-123',
          runtime: 'nodejs16',
          handler: 'index.handler',
          memoryMb: 128,
          requestTimeout: 30,
          Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
        })
        .mockResolvedValueOnce({
          functionName: 'test-function',
          functionId: 'func-123',
          runtime: 'nodejs16',
          handler: 'index.handler',
          memoryMb: 128,
          requestTimeout: 30,
        });

      const result = await createResource(mockContext, mockFunction, mockState);

      expect(mockVefaasClient.vefaas.createFunction).toHaveBeenCalledTimes(1);
      expect(mockVefaasClient.vefaas.getFunction).toHaveBeenCalled();
      expect(setResource).toHaveBeenCalledWith(
        expect.anything(),
        'functions.test_fn',
        expect.objectContaining({ status: 'ready' }),
      );
      expect(result).toBeDefined();
    });

    it('should refuse adoption when existing function lacks our ownership tag', async () => {
      mockVefaasClient.vefaas.createFunction.mockReset();
      mockVefaasClient.vefaas.getFunction.mockReset();
      const existsError = Object.assign(new Error('Function already exists'), { code: 'Conflict' });
      mockVefaasClient.vefaas.createFunction.mockRejectedValueOnce(existsError);
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
        Tags: [{ Key: 'other-project-tag', Value: 'someone-else' }],
      });

      await expect(createResource(mockContext, mockFunction, mockState)).rejects.toMatchObject({
        name: 'PartialResourceError',
        cause: { message: expect.stringContaining('not owned by this stack') },
      });
    });

    it('should create function with TLS logging enabled', async () => {
      const mockFunctionWithLog: FunctionDomain = {
        ...mockFunction,
        log: true,
      };

      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunctionWithLog, mockState);

      expect(mockVefaasClient.tls.createProject).toHaveBeenCalled();
      expect(mockVefaasClient.tls.createTopic).toHaveBeenCalled();
      expect(mockVefaasClient.tls.createIndex).toHaveBeenCalled();
      expect(mockVefaasClient.tls.waitForProject).toHaveBeenCalled();
      expect(mockVefaasClient.tls.waitForTopic).toHaveBeenCalled();
      expect(mockVefaasClient.vefaas.createFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          logConfig: expect.objectContaining({
            project: expect.any(String),
            topic: expect.any(String),
          }),
        }),
        expect.any(String),
      );
    });

    it('should reuse existing TLS resources when present', async () => {
      const mockFunctionWithLog: FunctionDomain = {
        ...mockFunction,
        log: true,
      };

      const stateWithTls: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [
              {
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 'sid-tls-project',
                id: 'existing-project',
                attributes: {},
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 'sid-tls-topic',
                id: 'existing-project/existing-topic',
                attributes: {},
              },
              {
                type: 'VOLCENGINE_TLS_INDEX',
                sid: 'sid-tls-index',
                id: 'existing-project/existing-topic/index',
                attributes: {},
              },
            ],
            status: 'ready',
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithTls.resources['functions.test_fn']);

      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunctionWithLog, stateWithTls);

      expect(mockVefaasClient.tls.createProject).not.toHaveBeenCalled();
    });

    it('creates function topic under the shared project with canonical name', async () => {
      const mockFunctionWithLog: FunctionDomain = {
        ...mockFunction,
        log: true,
      };

      mockVefaasClient.tls.createProject.mockResolvedValue({
        projectId: 'proj-1',
        projectName: 'test-app-dev-tls',
        created: true,
      });
      mockVefaasClient.tls.createTopic.mockResolvedValue({
        topicId: 'topic-1',
        topicName: 'test-service-dev-test_fn-fn-logs',
      });
      mockVefaasClient.tls.getTopic.mockResolvedValue(null);
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      const result = await createResource(mockContext, mockFunctionWithLog, mockState);

      expect(mockVefaasClient.tls.createProject).toHaveBeenCalledWith(
        expect.objectContaining({ projectName: 'test-app-dev-tls' }),
      );
      expect(mockVefaasClient.tls.createTopic).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'test-app-dev-tls',
          topicName: 'test-service-dev-test_fn-fn-logs',
        }),
      );
      expect(mockVefaasClient.tls.addTags).toHaveBeenCalledWith(
        expect.objectContaining({
          resourceType: 'project',
          resourcesList: ['proj-1'],
          tags: [{ key: 'si-owned-by', value: 'test-app:shared:logs.project' }],
        }),
      );
      // The shared project is persisted into the stage shared slot, not the function.
      expect(setSharedResource).toHaveBeenCalledWith(
        expect.anything(),
        'dev',
        'logs.project',
        expect.objectContaining({
          definition: { projectName: 'test-app-dev-tls', region: 'cn-beijing', stage: 'dev' },
          instances: [
            expect.objectContaining({
              type: 'VOLCENGINE_TLS_PROJECT',
              id: 'test-app-dev-tls',
              projectId: 'proj-1',
            }),
          ],
        }),
      );
      const saved = result.resources['functions.test_fn'];
      expect(saved.instances.some((i) => i.type === 'VOLCENGINE_TLS_PROJECT')).toBe(false);
      expect(saved.instances.some((i) => i.type === 'VOLCENGINE_TLS_TOPIC')).toBe(true);
      expect(mockVefaasClient.vefaas.createFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          logConfig: { project: 'test-app-dev-tls', topic: 'test-service-dev-test_fn-fn-logs' },
        }),
        expect.any(String),
      );
    });

    it('preserves legacy TLS project and topic instances on redeploy', async () => {
      const mockFunctionWithLog: FunctionDomain = {
        ...mockFunction,
        log: true,
      };

      const stateWithLegacyTls: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [
              {
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 'sid-tls-project',
                id: 'legacy-project',
                attributes: {},
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 'sid-tls-topic',
                id: 'legacy-project/legacy-topic',
                attributes: {},
              },
              {
                type: 'VOLCENGINE_TLS_INDEX',
                sid: 'sid-tls-index',
                id: 'legacy-project/legacy-topic/index',
                attributes: {},
              },
            ],
            status: 'ready',
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithLegacyTls.resources['functions.test_fn']);
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      const result = await createResource(mockContext, mockFunctionWithLog, stateWithLegacyTls);

      expect(mockVefaasClient.tls.createProject).not.toHaveBeenCalled();
      expect(mockVefaasClient.tls.createTopic).not.toHaveBeenCalled();
      expect(setSharedResource).not.toHaveBeenCalled();
      const saved = result.resources['functions.test_fn'];
      expect(saved.instances).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'VOLCENGINE_TLS_PROJECT', id: 'legacy-project' }),
          expect.objectContaining({
            type: 'VOLCENGINE_TLS_TOPIC',
            id: 'legacy-project/legacy-topic',
          }),
          expect.objectContaining({
            type: 'VOLCENGINE_TLS_INDEX',
            id: 'legacy-project/legacy-topic/index',
          }),
        ]),
      );
    });

    it('does not duplicate a shared project across two functions', async () => {
      const fnA: FunctionDomain = {
        ...mockFunction,
        key: 'test_fn',
        name: 'test-function',
        log: true,
      };
      const fnB: FunctionDomain = {
        ...mockFunction,
        key: 'test_fn2',
        name: 'test-function-2',
        log: true,
      };

      mockVefaasClient.tls.createProject.mockResolvedValue({
        projectId: 'proj-1',
        projectName: 'test-app-dev-tls',
        created: true,
      });
      mockVefaasClient.tls.createTopic.mockResolvedValue({
        topicId: 'topic-1',
        topicName: 'test-service-dev-fn-logs',
      });
      mockVefaasClient.tls.getTopic.mockResolvedValue(null);
      mockVefaasClient.vefaas.createFunction.mockResolvedValue({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValue({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });
      (getResource as jest.Mock).mockReturnValue(undefined);

      const stateAfterA = await createResource(mockContext, fnA, mockState);

      // Second function reuses the shared project slot (app-owned) and adopts
      // the shared topic.
      mockVefaasClient.tls.getProjectTags.mockResolvedValue([
        { Key: 'si-owned-by', Value: 'test-app:shared:logs.project' },
      ]);
      mockVefaasClient.tls.getTopic.mockResolvedValue({
        topicName: 'test-service-dev-fn-logs',
        topicId: 'topic-1',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
      });
      (getResource as jest.Mock).mockReturnValue(undefined);
      await createResource(mockContext, fnB, stateAfterA);

      expect(mockVefaasClient.tls.createProject).toHaveBeenCalledTimes(1);
      expect(mockVefaasClient.tls.createTopic).toHaveBeenCalledTimes(1);
      expect(mockVefaasClient.tls.addTags).toHaveBeenCalledTimes(2);
    });

    it('should reuse existing IAM role and call updateRoleTrustPolicy when hasIamRole=true', async () => {
      const stateWithIamRole: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
                attributes: {},
              },
            ],
            status: 'ready',
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithIamRole.resources['functions.test_fn']);

      mockVefaasClient.iam.updateRoleTrustPolicy.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunction, stateWithIamRole);

      expect(mockVefaasClient.iam.updateRoleTrustPolicy).toHaveBeenCalled();
      expect(mockVefaasClient.iam.createRole).not.toHaveBeenCalled();
    });

    it('should create function with VPC config', async () => {
      const mockFunctionWithVpc: FunctionDomain = {
        ...mockFunction,
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['subnet-1', 'subnet-2'],
          security_group: {
            name: 'test-sg',
            ingress: [],
            egress: [],
          },
        },
      };

      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunctionWithVpc, mockState);

      expect(mockVefaasClient.vefaas.createFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          vpcConfig: {
            vpcId: 'vpc-123',
            subnetIds: ['subnet-1', 'subnet-2'],
            securityGroupIds: ['test-sg'],
          },
        }),
        expect.any(String),
      );
    });

    it('should handle recoverable timeout error', async () => {
      const timeoutError = new Error('readtimeout') as Error & { code: string };
      timeoutError.code = 'ReadTimeout';

      mockVefaasClient.vefaas.createFunction.mockRejectedValueOnce(timeoutError);
      mockVefaasClient.vefaas.getFunction
        .mockResolvedValueOnce({
          functionName: 'test-function',
          functionId: 'func-123',
        })
        .mockResolvedValueOnce({
          functionName: 'test-function',
          functionId: 'func-123',
          runtime: 'nodejs16',
        });

      await createResource(mockContext, mockFunction, mockState);

      expect(mockVefaasClient.vefaas.getFunction).toHaveBeenCalledWith('test-function');
    });

    it('should throw PartialResourceError for non-recoverable error', async () => {
      const error = new Error('Access denied') as Error & { code: string };
      error.code = 'AccessDenied';

      mockVefaasClient.vefaas.createFunction.mockRejectedValueOnce(error);

      await expect(createResource(mockContext, mockFunction, mockState)).rejects.toThrow(
        PartialResourceError,
      );
    });

    it('should throw PartialResourceError when function not found after recoverable error', async () => {
      const timeoutError = new Error('timeout') as Error & { code: string };
      timeoutError.code = 'timeout';

      mockVefaasClient.vefaas.createFunction.mockRejectedValueOnce(timeoutError);
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce(null);

      await expect(createResource(mockContext, mockFunction, mockState)).rejects.toThrow(
        PartialResourceError,
      );
    });

    it('should throw error when function not found after creation', async () => {
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunctionById.mockResolvedValueOnce(null);

      await expect(createResource(mockContext, mockFunction, mockState)).rejects.toThrow();
    });

    it('should persist the full GetFunction detail set into state instances', async () => {
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunctionById.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
        status: 'Active',
        maxConcurrency: 100,
        exclusiveMode: false,
        cpuStrategy: 'always',
        enableApmplus: false,
        triggersCount: 2,
        instanceType: 'nvidia-tesla-l4',
        projectName: 'default',
        functionType: 'sandbox',
        cell: '2',
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
        vpcConfig: {
          vpcId: 'vpc-123',
          subnetIds: ['subnet-1'],
          securityGroupIds: ['sg-1'],
          enableVpc: true,
          enableSharedInternetAccess: true,
        },
        logConfig: {
          project: 'proj-1',
          topic: 'topic-1',
          enableLog: true,
        },
        asyncTaskConfig: {
          enableAsyncTask: true,
          maxRetry: 3,
        },
      });

      await createResource(mockContext, mockFunction, mockState);

      expect(setResource).toHaveBeenLastCalledWith(
        expect.anything(),
        'functions.test_fn',
        expect.objectContaining({
          instances: expect.arrayContaining([
            expect.objectContaining({
              type: 'VOLCENGINE_VEFAAS_FUNCTION',
              maxConcurrency: 100,
              exclusiveMode: false,
              cpuStrategy: 'always',
              enableApmplus: false,
              triggersCount: 2,
              instanceType: 'nvidia-tesla-l4',
              projectName: 'default',
              functionType: 'sandbox',
              cell: '2',
              Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
              vpcConfig: expect.objectContaining({
                enableVpc: true,
                enableSharedInternetAccess: true,
              }),
              logConfig: expect.objectContaining({ enableLog: true }),
              asyncTaskConfig: expect.objectContaining({
                enableAsyncTask: true,
                maxRetry: 3,
              }),
            }),
          ]),
        }),
      );
    });

    it('should skip createFunction when tainted state has existing function on provider', async () => {
      const taintedState: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [],
            status: 'tainted',
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(taintedState.resources['functions.test_fn']);

      mockVefaasClient.vefaas.getFunction
        .mockResolvedValueOnce({
          functionName: 'test-function',
          functionId: 'func-123',
          runtime: 'nodejs16',
          handler: 'index.handler',
          memoryMb: 128,
          requestTimeout: 30,
        })
        .mockResolvedValueOnce({
          functionName: 'test-function',
          functionId: 'func-123',
          runtime: 'nodejs16',
          handler: 'index.handler',
          memoryMb: 128,
          requestTimeout: 30,
        });

      await createResource(mockContext, mockFunction, taintedState);

      expect(mockVefaasClient.vefaas.createFunction).not.toHaveBeenCalled();
      expect(mockVefaasClient.vefaas.getFunction).toHaveBeenCalledWith('test-function');
    });

    it('should throw error when IAM role TRN is missing and accountId is not available', async () => {
      const contextWithoutAccountId: Context = {
        ...mockContext,
        accountId: undefined,
      };

      mockVefaasClient.iam.createRole.mockResolvedValueOnce({
        roleName: 'test-app-test-service-dev-role',
        trn: undefined,
      });

      await expect(
        createResource(contextWithoutAccountId, mockFunction, mockState),
      ).rejects.toThrow();
    });

    it('should use external role TRN when iam.role is a string', async () => {
      const mockFunctionWithExternalRole: FunctionDomain = {
        ...mockFunction,
        iam: {
          role: 'trn:iam::123456:role/existing-role',
        },
      };

      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunctionWithExternalRole, mockState);

      expect(mockVefaasClient.iam.createRole).not.toHaveBeenCalled();
      expect(setResource).toHaveBeenCalled();
      expect(mockVefaasClient.vefaas.createFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'trn:iam::123456:role/existing-role',
        }),
        expect.any(String),
      );
    });

    it('retains TLS instances and the sharedInstance with an external IAM role', async () => {
      const mockFunctionWithExternalRoleAndLog: FunctionDomain = {
        ...mockFunction,
        log: true,
        iam: {
          role: 'trn:iam::123456:role/existing-role',
        },
      };

      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });
      mockVefaasClient.tls.createTopic.mockResolvedValue({
        topicId: 'topic-1',
        topicName: 'test-service-dev-fn-logs',
      });
      mockVefaasClient.tls.getTopic.mockResolvedValue(null);

      await createResource(mockContext, mockFunctionWithExternalRoleAndLog, mockState);

      expect(mockVefaasClient.iam.createRole).not.toHaveBeenCalled();
      // TLS topic/index created and retained despite the external role.
      expect(mockVefaasClient.tls.createTopic).toHaveBeenCalled();
      expect(mockVefaasClient.tls.createIndex).toHaveBeenCalled();
      const saved = (setResource as jest.Mock).mock.calls.find(
        ([, logicalId]) => logicalId === 'functions.test_fn',
      )?.[2] as { instances: Array<{ type: string }> };
      expect(saved.instances.some((i) => i.type === 'VOLCENGINE_TLS_TOPIC')).toBe(true);
      expect(saved.instances.some((i) => i.type === 'VOLCENGINE_TLS_INDEX')).toBe(true);
      // Shared project tracked in the stage shared slot.
      expect(setSharedResource).toHaveBeenCalledWith(
        expect.anything(),
        'dev',
        'logs.project',
        expect.objectContaining({
          instances: [expect.objectContaining({ type: 'VOLCENGINE_TLS_PROJECT' })],
        }),
      );
    });

    it('should use custom role name when iam.role is an object with name', async () => {
      const mockFunctionWithCustomRole: FunctionDomain = {
        ...mockFunction,
        iam: {
          role: {
            name: 'my-custom-role-name',
            statements: [
              {
                effect: 'Allow',
                action: ['ecs:DescribeInstances'],
                resource: ['*'],
              },
            ],
          },
        },
      };

      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunctionWithCustomRole, mockState);

      expect(mockVefaasClient.iam.createRole).toHaveBeenCalledWith(
        expect.objectContaining({
          roleName: 'my-custom-role-name',
          customStatements: [
            {
              effect: 'Allow',
              action: ['ecs:DescribeInstances'],
              resource: ['*'],
            },
          ],
        }),
      );
    });

    it('should pass managed_policies to createRole', async () => {
      const mockFunctionWithManagedPolicies: FunctionDomain = {
        ...mockFunction,
        iam: {
          role: {
            managed_policies: ['AdministratorAccess', 'ReadOnlyAccess'],
          },
        },
      };

      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunctionWithManagedPolicies, mockState);

      expect(mockVefaasClient.iam.createRole).toHaveBeenCalledWith(
        expect.objectContaining({
          roleName: 'test-app-test-service-dev-test-fn-role',
          managedPolicies: ['AdministratorAccess', 'ReadOnlyAccess'],
        }),
      );
    });

    it('creates a per-function role name including fn.key for new deployments', async () => {
      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, mockFunction, mockState);

      expect(mockVefaasClient.iam.createRole).toHaveBeenCalledWith(
        expect.objectContaining({ roleName: 'test-app-test-service-dev-test-fn-role' }),
      );
    });

    it('passes the derived execution baseline to createRole', async () => {
      const fnWithNetwork: FunctionDomain = {
        ...mockFunction,
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['subnet-1'],
          security_group: { name: 'sg-1', ingress: [], egress: [] },
        },
      };

      mockVefaasClient.vefaas.createFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await createResource(mockContext, fnWithNetwork, mockState);

      expect(mockVefaasClient.iam.createRole).toHaveBeenCalledWith(
        expect.objectContaining({
          roleName: 'test-app-test-service-dev-test-fn-role',
          executionStatements: expect.arrayContaining([
            expect.objectContaining({
              action: ['vpc:DescribeVpcs', 'vpc:DescribeSubnets', 'vpc:DescribeSecurityGroups'],
            }),
          ]),
        }),
      );
    });
  });

  describe('readResource', () => {
    it('should read function from provider', async () => {
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      const result = await readResource(mockContext, 'test-function');

      expect(mockVefaasClient.vefaas.getFunction).toHaveBeenCalledWith('test-function');
      expect(result).toEqual({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });
    });
  });

  describe('updateResource', () => {
    const stateWithFunction: StateFile = {
      ...mockState,
      resources: {
        'functions.test_fn': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: {
            functionName: 'test-function',
            codeHash: 'old-hash',
            runtime: 'nodejs16',
            handler: 'index.handler',
            memorySize: 128,
            timeout: 30,
          },
          instances: [
            {
              type: 'VOLCENGINE_VEFAAS_FUNCTION',
              sid: 'volcengine-test-service-dev-test-function',
              id: 'test-function',
              functionName: 'test-function',
              functionId: 'func-123',
            },
            {
              type: 'VOLCENGINE_IAM_ROLE',
              sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
              id: 'test-app-test-service-dev-role',
              trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
            },
          ],
          lastUpdated: '2024-01-01T00:00:00Z',
        },
      },
    };

    it('should update function when config changed', async () => {
      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(false);

      mockVefaasClient.vefaas.updateFunctionConfiguration.mockResolvedValueOnce('rel-config-1');
      mockVefaasClient.vefaas.updateFunctionCode.mockResolvedValueOnce({
        releaseRecordId: 'rel-1',
      });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs18',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, mockFunction, stateWithFunction);

      expect(mockVefaasClient.vefaas.updateFunctionConfiguration).toHaveBeenCalled();
    });

    it('should update function code when code changed', async () => {
      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.updateFunctionCode.mockResolvedValueOnce({
        releaseRecordId: 'rel-1',
      });
      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, mockFunction, stateWithFunction);

      expect(mockVefaasClient.vefaas.updateFunctionCode).toHaveBeenCalled();
    });

    it('should throw error when state not found', async () => {
      (getResource as jest.Mock).mockReturnValue(undefined);

      await expect(updateResource(mockContext, mockFunction, mockState)).rejects.toThrow();
    });

    it('should throw error when instance not found', async () => {
      (getResource as jest.Mock).mockReturnValue({
        ...stateWithFunction.resources['functions.test_fn'],
        instances: [],
      });

      await expect(updateResource(mockContext, mockFunction, stateWithFunction)).rejects.toThrow();
    });

    it('should throw error when function not found after update', async () => {
      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunctionById.mockReset();
      mockVefaasClient.vefaas.getFunctionById.mockResolvedValueOnce(null);

      await expect(updateResource(mockContext, mockFunction, stateWithFunction)).rejects.toThrow();
    });

    it('should throw error when IAM role TRN is missing in updateResource', async () => {
      const contextWithoutAccountId: Context = {
        ...mockContext,
        accountId: undefined,
      };

      const stateWithRoleNoTrn: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'old-hash',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: undefined,
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithRoleNoTrn.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await expect(
        updateResource(contextWithoutAccountId, mockFunction, stateWithRoleNoTrn),
      ).rejects.toThrow();
    });

    it('should create TLS resources when log enabled but no existing TLS', async () => {
      const mockFunctionWithLog: FunctionDomain = {
        ...mockFunction,
        log: true,
      };

      const stateWithoutTls: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithoutTls.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, mockFunctionWithLog, stateWithoutTls);

      expect(mockVefaasClient.tls.createProject).toHaveBeenCalled();
      expect(mockVefaasClient.tls.createTopic).toHaveBeenCalled();
    });

    it('should throw PartialResourceError with tainted state when TLS dependent creation fails partially', async () => {
      const mockFunctionWithLog: FunctionDomain = {
        ...mockFunction,
        log: true,
      };

      const stateWithoutTls: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithoutTls.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(true);

      // Project created in cloud, topic creation fails -> partial failure.
      mockVefaasClient.tls.createProject.mockResolvedValue({ projectName: 'test-project' });
      mockVefaasClient.tls.createTopic.mockRejectedValue(new Error('topic creation failed'));

      const error = await updateResource(mockContext, mockFunctionWithLog, stateWithoutTls).catch(
        (e: unknown) => e,
      );

      expect(error).toBeInstanceOf(PartialResourceError);
      const partialError = error as PartialResourceError;
      expect(partialError.updatedState.resources['functions.test_fn']).toMatchObject({
        status: 'tainted',
      });
      expect(partialError.cause.message).toBe('topic creation failed');
    });

    it('should delete TLS index/topic and drop them from state when log is disabled', async () => {
      const stateWithTls: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 'volcengine-tls_topic-dev-test-topic',
                id: 'test-app-dev-tls/test-service-dev-fn-logs',
                topicId: 'topic-1',
              },
              {
                type: 'VOLCENGINE_TLS_INDEX',
                sid: 'volcengine-tls_index-dev-test-index',
                id: 'test-app-dev-tls/test-service-dev-fn-logs/index',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithTls.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(false);
      mockVefaasClient.vefaas.getFunctionById.mockResolvedValue({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      const result = await updateResource(mockContext, mockFunction, stateWithTls);

      // Index deleted before topic.
      expect(mockVefaasClient.tls.deleteIndex).toHaveBeenCalledWith(
        'test-app-dev-tls',
        'test-service-dev-fn-logs',
      );
      expect(mockVefaasClient.tls.deleteTopic).toHaveBeenCalledWith(
        'test-app-dev-tls',
        'test-service-dev-fn-logs',
      );
      // The shared project is destroyer-owned — never deleted per resource.
      expect(mockVefaasClient.tls.deleteProject).not.toHaveBeenCalled();
      const saved = result.resources['functions.test_fn'];
      expect(saved.instances.some((i) => (i.type as string).startsWith('VOLCENGINE_TLS_'))).toBe(
        false,
      );
      expect(saved.instances.some((i) => i.type === 'VOLCENGINE_IAM_ROLE')).toBe(true);
    });

    it('removes the shared project slot when disabling log empties the shared project', async () => {
      const stateWithSharedTls: StateFile = {
        ...mockState,
        stages: {
          dev: {
            resources: {},
            shared: {
              'logs.project': {
                mode: 'managed',
                region: 'cn-beijing',
                definition: { projectName: 'test-app-dev-tls' },
                instances: [
                  {
                    sid: 'si:volcengine:tls:dev:test-app-dev-tls',
                    type: 'VOLCENGINE_TLS_PROJECT',
                    id: 'test-app-dev-tls',
                    projectId: 'proj-1',
                  },
                ],
                lastUpdated: '2024-01-01T00:00:00Z',
              },
            },
          },
        },
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function', codeHash: 'test-hash-123' },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 'volcengine-tls_topic-dev-test-topic',
                id: 'test-app-dev-tls/test-service-dev-fn-logs',
                topicId: 'topic-1',
              },
              {
                type: 'VOLCENGINE_TLS_INDEX',
                sid: 'volcengine-tls_index-dev-test-index',
                id: 'test-app-dev-tls/test-service-dev-fn-logs/index',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithSharedTls.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(false);
      mockVefaasClient.vefaas.getFunctionById.mockResolvedValue({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });
      mockVefaasClient.tls.getProjectTags.mockResolvedValue([
        { Key: 'si-owned-by', Value: 'test-app:shared:logs.project' },
      ]);
      mockVefaasClient.tls.listTopics.mockResolvedValue([]);
      mockVefaasClient.tls.deleteProject.mockResolvedValue(undefined);

      const result = await updateResource(mockContext, mockFunction, stateWithSharedTls);

      expect(mockVefaasClient.tls.deleteProject).toHaveBeenCalledWith('test-app-dev-tls');
      expect(removeSharedResource).toHaveBeenCalledWith(expect.anything(), 'dev', 'logs.project');
      expect(result.stages.dev.shared?.['logs.project']).toBeUndefined();
    });

    it('retains the shared project slot when disabling log and other topics remain', async () => {
      const stateWithSharedTls: StateFile = {
        ...mockState,
        stages: {
          dev: {
            resources: {},
            shared: {
              'logs.project': {
                mode: 'managed',
                region: 'cn-beijing',
                definition: { projectName: 'test-app-dev-tls' },
                instances: [
                  {
                    sid: 'si:volcengine:tls:dev:test-app-dev-tls',
                    type: 'VOLCENGINE_TLS_PROJECT',
                    id: 'test-app-dev-tls',
                    projectId: 'proj-1',
                  },
                ],
                lastUpdated: '2024-01-01T00:00:00Z',
              },
            },
          },
        },
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function', codeHash: 'test-hash-123' },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 'volcengine-tls_topic-dev-test-topic',
                id: 'test-app-dev-tls/test-service-dev-fn-logs',
                topicId: 'topic-1',
              },
              {
                type: 'VOLCENGINE_TLS_INDEX',
                sid: 'volcengine-tls_index-dev-test-index',
                id: 'test-app-dev-tls/test-service-dev-fn-logs/index',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithSharedTls.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(false);
      mockVefaasClient.vefaas.getFunctionById.mockResolvedValue({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });
      mockVefaasClient.tls.getProjectTags.mockResolvedValue([
        { Key: 'si-owned-by', Value: 'test-app:shared:logs.project' },
      ]);
      mockVefaasClient.tls.listTopics.mockResolvedValue([{ topicId: 't2', topicName: 'other' }]);

      const result = await updateResource(mockContext, mockFunction, stateWithSharedTls);

      expect(mockVefaasClient.tls.deleteProject).not.toHaveBeenCalled();
      expect(removeSharedResource).not.toHaveBeenCalled();
      expect(result.stages.dev.shared?.['logs.project']).toBeDefined();
    });

    it('should create IAM role when not present in state', async () => {
      const stateWithoutIamRole: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(
        stateWithoutIamRole.resources['functions.test_fn'],
      );
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, mockFunction, stateWithoutIamRole);

      expect(mockVefaasClient.iam.createRole).toHaveBeenCalled();
    });

    it('should reuse existing TLS resources when present', async () => {
      const mockFunctionWithLog: FunctionDomain = {
        ...mockFunction,
        log: true,
      };

      const stateWithTls: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
              },
              {
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 'volcengine-tls_project-dev-test-project',
                id: 'test-project',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 'volcengine-tls_topic-dev-test-topic',
                id: 'test-project/test-topic',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithTls.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, mockFunctionWithLog, stateWithTls);

      expect(mockVefaasClient.tls.createProject).not.toHaveBeenCalled();
      expect(setResource).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          definition: expect.objectContaining({
            logConfig: { project: 'test-project', topic: 'test-topic' },
          }),
        }),
      );
    });

    it('should update managed policies when they change', async () => {
      const stateWithManagedPolicies: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
              iam: {
                role: {
                  managed_policies: ['AdministratorAccess'],
                  statements: [],
                },
              },
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const mockFunctionUpdatedPolicies: FunctionDomain = {
        ...mockFunction,
        iam: {
          role: {
            managed_policies: ['AdministratorAccess', 'ReadOnlyAccess'],
            statements: [],
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(
        stateWithManagedPolicies.resources['functions.test_fn'],
      );
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, mockFunctionUpdatedPolicies, stateWithManagedPolicies);

      expect(mockVefaasClient.iam.updateManagedPolicies).toHaveBeenCalledWith(
        'test-app-test-service-dev-role',
        ['AdministratorAccess', 'ReadOnlyAccess'],
      );
    });

    it('should skip role management for external role (string TRN)', async () => {
      const stateWithExternalRole: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
              iam: {
                role: 'trn:iam::123456:role/external-role',
              },
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const mockFunctionWithExternalRole: FunctionDomain = {
        ...mockFunction,
        iam: {
          role: 'trn:iam::123456:role/external-role',
        },
      };

      (getResource as jest.Mock).mockReturnValue(
        stateWithExternalRole.resources['functions.test_fn'],
      );
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunction.mockResolvedValueOnce({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, mockFunctionWithExternalRole, stateWithExternalRole);

      expect(mockVefaasClient.iam.updateRoleTrustPolicy).not.toHaveBeenCalled();
      expect(mockVefaasClient.iam.updateRolePolicy).not.toHaveBeenCalled();
      expect(mockVefaasClient.iam.updateManagedPolicies).not.toHaveBeenCalled();
      expect(mockVefaasClient.iam.createRole).not.toHaveBeenCalled();
    });

    it('skips updateRolePolicy when neither derived inputs nor custom statements changed', async () => {
      const stateWithRole: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithRole.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunctionById.mockResolvedValue({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, mockFunction, stateWithRole);

      expect(mockVefaasClient.iam.updateRolePolicy).not.toHaveBeenCalled();
    });

    it('unions trust and baseline across functions sharing a legacy role (issue #229 review)', async () => {
      const peerFn: FunctionDomain = {
        ...mockFunction,
        key: 'other_fn',
        name: 'other-function',
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['subnet-1', 'subnet-2'],
          security_group: { name: 'sg-1', ingress: [], egress: [] },
        },
      };
      const contextWithIac = {
        ...mockContext,
        iac: {
          functions: [mockFunction, peerFn],
          events: [
            {
              key: 'gateway_event',
              triggers: [{ backend: '${functions.other_fn}' }],
            },
          ],
        },
      } as unknown as Context;

      const legacyRoleInstances = [
        {
          type: 'VOLCENGINE_VEFAAS_FUNCTION',
          sid: 'volcengine-test-service-dev-test-function',
          id: 'test-function',
          functionName: 'test-function',
          functionId: 'func-123',
        },
        {
          type: 'VOLCENGINE_IAM_ROLE',
          sid: 'volcengine-iam_role-dev-role',
          id: 'test-app-test-service-dev-role',
          trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
        },
      ];
      const sharedRoleState: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function', codeHash: 'test-hash-123' },
            instances: legacyRoleInstances,
            lastUpdated: '2024-01-01T00:00:00Z',
          },
          'functions.other_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'other-function', codeHash: 'test-hash-123' },
            instances: legacyRoleInstances,
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(sharedRoleState.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunctionById.mockResolvedValue({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(contextWithIac, mockFunction, sharedRoleState);

      expect(mockVefaasClient.iam.updateRoleTrustPolicy).toHaveBeenCalledWith(
        'test-app-test-service-dev-role',
        expect.objectContaining({
          Statement: [
            expect.objectContaining({
              Principal: { Service: ['vefaas', 'apigateway'] },
            }),
          ],
        }),
      );
      expect(mockVefaasClient.iam.updateRolePolicy).toHaveBeenCalledWith(
        'test-app-test-service-dev-role',
        expect.arrayContaining([
          expect.objectContaining({ action: expect.arrayContaining(['vpc:DescribeVpcs']) }),
        ]),
        undefined,
      );
    });

    it('calls updateRolePolicy with the derived baseline when network is added', async () => {
      const fnWithNetwork: FunctionDomain = {
        ...mockFunction,
        network: {
          vpc_id: 'vpc-123',
          subnet_ids: ['subnet-1'],
          security_group: { name: 'sg-1', ingress: [], egress: [] },
        },
      };

      const stateWithoutVpc: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithoutVpc.resources['functions.test_fn']);
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunctionById.mockResolvedValue({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, fnWithNetwork, stateWithoutVpc);

      expect(mockVefaasClient.iam.updateRolePolicy).toHaveBeenCalledWith(
        'test-app-test-service-dev-role',
        expect.arrayContaining([
          expect.objectContaining({
            action: ['vpc:DescribeVpcs', 'vpc:DescribeSubnets', 'vpc:DescribeSecurityGroups'],
          }),
        ]),
        undefined,
      );
    });

    it('calls updateRolePolicy when custom statements change', async () => {
      const fnWithCustomStatements: FunctionDomain = {
        ...mockFunction,
        iam: {
          role: {
            statements: [
              { effect: 'Allow', action: ['ecs:DescribeInstances'], resource: ['*'] },
              { effect: 'Allow', action: ['oss:ListBuckets'], resource: ['*'] },
            ],
          },
        },
      };

      const stateWithOldStatements: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'test-hash-123',
              runtime: 'nodejs16',
              handler: 'index.handler',
              memorySize: 128,
              timeout: 30,
              iam: {
                role: {
                  statements: [
                    { effect: 'Allow', action: ['ecs:DescribeInstances'], resource: ['*'] },
                  ],
                },
              },
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-role',
                id: 'test-app-test-service-dev-role',
                trn: 'trn:iam::123456:role/test-app-test-service-dev-role',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(
        stateWithOldStatements.resources['functions.test_fn'],
      );
      (attributesEqual as jest.Mock).mockReturnValue(true);

      mockVefaasClient.vefaas.getFunctionById.mockResolvedValue({
        functionName: 'test-function',
        functionId: 'func-123',
        runtime: 'nodejs16',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
      });

      await updateResource(mockContext, fnWithCustomStatements, stateWithOldStatements);

      expect(mockVefaasClient.iam.updateRolePolicy).toHaveBeenCalledWith(
        'test-app-test-service-dev-role',
        expect.arrayContaining([expect.objectContaining({ action: ['vefaas:*'] })]),
        [
          { effect: 'Allow', action: ['ecs:DescribeInstances'], resource: ['*'] },
          { effect: 'Allow', action: ['oss:ListBuckets'], resource: ['*'] },
        ],
      );
    });
  });

  describe('deleteResource', () => {
    const stateWithFunction: StateFile = {
      ...mockState,
      resources: {
        'functions.test_fn': {
          mode: 'managed',
          region: 'cn-beijing',
          definition: {
            functionName: 'test-function',
            codeHash: 'old-hash',
          },
          instances: [
            {
              type: 'VOLCENGINE_VEFAAS_FUNCTION',
              sid: 'volcengine-test-service-dev-test-function',
              id: 'test-function',
              functionName: 'test-function',
              functionId: 'func-123',
            },
            {
              type: 'VOLCENGINE_IAM_ROLE',
              sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
              id: 'test-app-test-service-dev-role',
            },
          ],
          lastUpdated: '2024-01-01T00:00:00Z',
        },
      },
    };

    it('should delete function successfully', async () => {
      mockVefaasClient.vefaas.deleteFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithFunction);

      expect(mockVefaasClient.vefaas.deleteFunction).toHaveBeenCalledWith('func-123');
      expect(mockVefaasClient.iam.deleteRole).toHaveBeenCalled();
      expect(removeResource).toHaveBeenCalled();
    });

    it('should delete function with TLS resources', async () => {
      const stateWithTls: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {
              functionName: 'test-function',
              codeHash: 'old-hash',
            },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-test-app-test-service-dev-role',
                id: 'test-app-test-service-dev-role',
              },
              {
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 'volcengine-tls_project-dev-test-project',
                id: 'test-project',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 'volcengine-tls_topic-dev-test-topic',
                id: 'test-project/test-topic',
              },
              {
                type: 'VOLCENGINE_TLS_INDEX',
                sid: 'volcengine-tls_index-dev-test-index',
                id: 'test-project/test-topic/index',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.vefaas.deleteFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.tls.deleteIndex.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.tls.deleteTopic.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.tls.deleteProject.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.iam.deleteRole.mockResolvedValueOnce({ functionId: 'func-123' });
      (getResource as jest.Mock).mockReturnValue(stateWithTls.resources['functions.test_fn']);

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithTls);

      expect(mockVefaasClient.vefaas.deleteFunction).toHaveBeenCalledWith('func-123');
      expect(mockVefaasClient.tls.deleteIndex).toHaveBeenCalled();
      expect(mockVefaasClient.tls.deleteTopic).toHaveBeenCalled();
      // Legacy per-resource own-projects are deleted after their children.
      expect(mockVefaasClient.tls.deleteProject).toHaveBeenCalledWith('test-project');
      expect(mockVefaasClient.iam.deleteRole).toHaveBeenCalled();
    });

    it('does not delete the stage-shared project from per-resource cleanup', async () => {
      const stateWithSharedProject: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function', codeHash: 'old-hash' },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_TLS_PROJECT',
                sid: 'volcengine-tls_project-dev-test-app-dev-tls',
                id: 'test-app-dev-tls',
              },
              {
                type: 'VOLCENGINE_TLS_TOPIC',
                sid: 'volcengine-tls_topic-dev-test-topic',
                id: 'test-app-dev-tls/test-topic',
              },
              {
                type: 'VOLCENGINE_TLS_INDEX',
                sid: 'volcengine-tls_index-dev-test-index',
                id: 'test-app-dev-tls/test-topic/index',
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.vefaas.deleteFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.tls.deleteIndex.mockResolvedValueOnce({ functionId: 'func-123' });
      mockVefaasClient.tls.deleteTopic.mockResolvedValueOnce({ functionId: 'func-123' });
      (getResource as jest.Mock).mockReturnValue(
        stateWithSharedProject.resources['functions.test_fn'],
      );

      await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithSharedProject,
      );

      expect(mockVefaasClient.tls.deleteIndex).toHaveBeenCalledWith(
        'test-app-dev-tls',
        'test-topic',
      );
      expect(mockVefaasClient.tls.deleteTopic).toHaveBeenCalledWith(
        'test-app-dev-tls',
        'test-topic',
      );
      // The stage-shared project is destroyer-owned and never deleted per resource.
      expect(mockVefaasClient.tls.deleteProject).not.toHaveBeenCalled();
    });

    it('should handle FunctionNotFound error', async () => {
      const error = new Error('Not found') as Error & { code: string };
      error.code = 'FunctionNotFound';

      mockVefaasClient.vefaas.deleteFunction.mockRejectedValueOnce(error);
      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithFunction);

      expect(removeResource).toHaveBeenCalled();
    });

    it('should warn on unknown dependent resource type and continue', async () => {
      const stateWithUnknown: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function', codeHash: 'old-hash' },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                attributes: {},
              },
              {
                type: 'VOLCENGINE_UNKNOWN_TYPE',
                sid: 'volcengine-unknown-dev-something',
                id: 'something',
                attributes: {},
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      (getResource as jest.Mock).mockReturnValue(stateWithUnknown.resources['functions.test_fn']);

      const { logger } = jest.requireMock('../../../../src/common/logger');

      await deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithUnknown);

      expect(logger.warn).toHaveBeenCalled();
      expect(removeResource).toHaveBeenCalled();
    });

    it('should propagate error when dependent resource delete fails and keep resource in state', async () => {
      const stateWithIamRole: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function', codeHash: 'old-hash' },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                attributes: {},
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-role',
                id: 'test-app-test-service-dev-role',
                attributes: {},
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.iam.deleteRole.mockRejectedValueOnce(new Error('IAM delete failed'));
      (getResource as jest.Mock).mockReturnValue(stateWithIamRole.resources['functions.test_fn']);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithIamRole),
      ).rejects.toThrow('IAM delete failed');
      expect(removeResource).not.toHaveBeenCalled();
    });

    it('should throw other errors', async () => {
      const error = new Error('Access denied') as Error & { code: string };
      error.code = 'AccessDenied';

      mockVefaasClient.vefaas.deleteFunction.mockRejectedValueOnce(error);
      (getResource as jest.Mock).mockReturnValue(stateWithFunction.resources['functions.test_fn']);

      await expect(
        deleteResource(mockContext, 'test-function', 'functions.test_fn', stateWithFunction),
      ).rejects.toThrow('Access denied');
    });

    it('should skip deletion for external IAM role with external=true attribute', async () => {
      const stateWithExternalRole: StateFile = {
        ...mockState,
        resources: {
          'functions.test_fn': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: { functionName: 'test-function', codeHash: 'old-hash' },
            instances: [
              {
                type: 'VOLCENGINE_VEFAAS_FUNCTION',
                sid: 'volcengine-test-service-dev-test-function',
                id: 'test-function',
                functionName: 'test-function',
                functionId: 'func-123',
              },
              {
                type: 'VOLCENGINE_IAM_ROLE',
                sid: 'volcengine-iam_role-dev-role',
                id: 'external-role-trn',
                attributes: { external: true },
              },
            ],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      mockVefaasClient.vefaas.deleteFunction.mockResolvedValueOnce({ functionId: 'func-123' });
      (getResource as jest.Mock).mockReturnValue(
        stateWithExternalRole.resources['functions.test_fn'],
      );

      const { logger } = jest.requireMock('../../../../src/common/logger');

      await deleteResource(
        mockContext,
        'test-function',
        'functions.test_fn',
        stateWithExternalRole,
      );

      expect(mockVefaasClient.iam.deleteRole).not.toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith(
        expect.stringContaining('Skipping deletion of external IAM role'),
      );
    });
  });
});
