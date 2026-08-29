import {
  SHARED_LOG_PROJECT_KEY,
  buildSharedProjectName,
  ensureSharedSlsProject,
  buildSharedProjectResourceState,
  releaseSharedSlsProjectIfUnused,
  ensureFunctionLogstore,
  ensureGatewayLogstore,
  isSharedProjectOwnedByApp,
} from '../../../../src/stack/aliyunStack/sharedLogProject';
import type { Context, StateFile, ResourceState } from '../../../../src/types';

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

describe('sharedLogProject (aliyun)', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-hangzhou',
    provider: 'aliyun' as Context['provider'],
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockClient = {
    sls: {
      createProject: jest.fn(),
      getProject: jest.fn(),
      getProjectTags: jest.fn(),
      deleteProject: jest.fn(),
      listLogStores: jest.fn(),
      getLogstore: jest.fn(),
      createLogstore: jest.fn(),
      createIndex: jest.fn(),
      waitForLogstore: jest.fn(),
      addTags: jest.fn(),
    },
  };

  const emptyState: StateFile = {
    version: '3.0',
    provider: 'aliyun',
    app: 'test-app',
    service: 'test-service',
    stages: { dev: { resources: {} } },
    resources: {},
  };

  const sharedResourceState: ResourceState = {
    mode: 'managed',
    region: 'cn-hangzhou',
    definition: { projectName: 'test-app-dev-sls', region: 'cn-hangzhou', stage: 'dev' },
    instances: [
      {
        sid: 'si:aliyun:sls_project:dev:test-app-dev-sls',
        type: 'ALIYUN_SLS_PROJECT',
        id: 'test-app-dev-sls',
      },
    ],
    lastUpdated: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient.sls.createProject.mockResolvedValue({ projectName: 'test-app-dev-sls' });
    mockClient.sls.getProject.mockResolvedValue({
      projectName: 'test-app-dev-sls',
      status: 'Normal',
    });
    mockClient.sls.getProjectTags.mockResolvedValue([]);
    mockClient.sls.listLogStores.mockResolvedValue([]);
    mockClient.sls.getLogstore.mockResolvedValue(null);
    mockClient.sls.createLogstore.mockResolvedValue({
      logstoreName: 'test-service-dev-fn-logs',
      projectName: 'test-app-dev-sls',
    });
    mockClient.sls.createIndex.mockResolvedValue({});
    mockClient.sls.waitForLogstore.mockResolvedValue({
      logstoreName: 'test-service-dev-fn-logs',
      projectName: 'test-app-dev-sls',
    });
    mockClient.sls.addTags.mockResolvedValue(undefined);
  });

  describe('ensureSharedSlsProject', () => {
    it('reuses the shared SLS project from stage shared state', async () => {
      const stateWithShared: StateFile = {
        ...emptyState,
        stages: {
          dev: { resources: {}, shared: { [SHARED_LOG_PROJECT_KEY]: sharedResourceState } },
        },
      };
      mockClient.sls.getProjectTags.mockResolvedValue([
        { key: 'si-owned-by', value: 'test-app:shared:logs.project' },
      ]);

      const result = await ensureSharedSlsProject(
        mockContext,
        mockClient as never,
        stateWithShared,
      );

      expect(result).toEqual({ projectName: 'test-app-dev-sls' });
      expect(mockClient.sls.createProject).not.toHaveBeenCalled();
      expect(mockClient.sls.addTags).not.toHaveBeenCalled();
    });

    it('refuses a local shared-state entry when the provider project is not app-owned', async () => {
      const stateWithShared: StateFile = {
        ...emptyState,
        stages: {
          dev: { resources: {}, shared: { [SHARED_LOG_PROJECT_KEY]: sharedResourceState } },
        },
      };
      mockClient.sls.getProjectTags.mockResolvedValue([
        { key: 'si-owned-by', value: 'other-app:shared:logs.project' },
      ]);

      await expect(
        ensureSharedSlsProject(mockContext, mockClient as never, stateWithShared),
      ).rejects.toThrow('SLS_PROJECT_FOREIGN_OWNED');
      expect(mockClient.sls.createProject).not.toHaveBeenCalled();
    });

    it('recreates the shared project when the local entry is stale (project gone from provider)', async () => {
      const stateWithShared: StateFile = {
        ...emptyState,
        stages: {
          dev: { resources: {}, shared: { [SHARED_LOG_PROJECT_KEY]: sharedResourceState } },
        },
      };
      mockClient.sls.getProject.mockResolvedValue(null);

      const result = await ensureSharedSlsProject(
        mockContext,
        mockClient as never,
        stateWithShared,
      );

      expect(result).toEqual({ projectName: 'test-app-dev-sls' });
      expect(mockClient.sls.createProject).toHaveBeenCalledWith('test-app-dev-sls');
      expect(mockClient.sls.addTags).toHaveBeenCalled();
    });

    it('creates and tags a new app-scoped SLS project', async () => {
      mockClient.sls.getProject.mockResolvedValue(null);

      const result = await ensureSharedSlsProject(mockContext, mockClient as never, emptyState);

      expect(result).toEqual({ projectName: 'test-app-dev-sls' });
      expect(mockClient.sls.createProject).toHaveBeenCalledWith('test-app-dev-sls');
      expect(mockClient.sls.addTags).toHaveBeenCalledWith({
        resourceType: 'project',
        resourceId: 'test-app-dev-sls',
        tags: [{ key: 'si-owned-by', value: 'test-app:shared:logs.project' }],
      });
    });

    it('adopts an existing project owned by this app (cross-service convergence)', async () => {
      mockClient.sls.getProject.mockResolvedValue({
        projectName: 'test-app-dev-sls',
        status: 'Normal',
      });
      mockClient.sls.getProjectTags.mockResolvedValue([
        { key: 'si-owned-by', value: 'test-app:shared:logs.project' },
      ]);

      const result = await ensureSharedSlsProject(mockContext, mockClient as never, emptyState);

      expect(result).toEqual({ projectName: 'test-app-dev-sls' });
      expect(mockClient.sls.createProject).not.toHaveBeenCalled();
      expect(mockClient.sls.addTags).not.toHaveBeenCalled();
    });

    it('refuses an existing project that is not owned by this app', async () => {
      mockClient.sls.getProject.mockResolvedValue({
        projectName: 'test-app-dev-sls',
        status: 'Normal',
      });
      mockClient.sls.getProjectTags.mockResolvedValue([
        { key: 'si-owned-by', value: 'other-app:shared:logs.project' },
      ]);

      await expect(
        ensureSharedSlsProject(mockContext, mockClient as never, emptyState),
      ).rejects.toThrow('SLS_PROJECT_FOREIGN_OWNED');
      expect(mockClient.sls.createProject).not.toHaveBeenCalled();
    });

    it('refuses an existing project with no ownership tag', async () => {
      mockClient.sls.getProject.mockResolvedValue({
        projectName: 'test-app-dev-sls',
        status: 'Normal',
      });
      mockClient.sls.getProjectTags.mockResolvedValue([]);

      await expect(
        ensureSharedSlsProject(mockContext, mockClient as never, emptyState),
      ).rejects.toThrow('SLS_PROJECT_FOREIGN_OWNED');
      expect(mockClient.sls.createProject).not.toHaveBeenCalled();
    });
  });

  describe('isSharedProjectOwnedByApp', () => {
    it('returns true when the project carries this app shared-scope tag', async () => {
      mockClient.sls.getProjectTags.mockResolvedValue([
        { key: 'si-owned-by', value: 'test-app:shared:logs.project' },
      ]);

      const result = await isSharedProjectOwnedByApp(
        mockContext,
        mockClient as never,
        'test-app-dev-sls',
      );

      expect(result).toBe(true);
    });

    it('returns false when the project is untagged or foreign-owned', async () => {
      mockClient.sls.getProjectTags.mockResolvedValue([]);

      const untagged = await isSharedProjectOwnedByApp(
        mockContext,
        mockClient as never,
        'test-app-dev-sls',
      );
      expect(untagged).toBe(false);

      mockClient.sls.getProjectTags.mockResolvedValue([
        { key: 'si-owned-by', value: 'other-app:shared:logs.project' },
      ]);
      const foreign = await isSharedProjectOwnedByApp(
        mockContext,
        mockClient as never,
        'test-app-dev-sls',
      );
      expect(foreign).toBe(false);
    });
  });

  describe('buildSharedProjectResourceState', () => {
    it('builds a ResourceState whose single instance is the shared project', () => {
      const result = buildSharedProjectResourceState(mockContext, {
        projectName: 'test-app-dev-sls',
      });

      expect(result).toMatchObject({
        mode: 'managed',
        region: 'cn-hangzhou',
        definition: { projectName: 'test-app-dev-sls', region: 'cn-hangzhou', stage: 'dev' },
        instances: [{ type: 'ALIYUN_SLS_PROJECT', id: 'test-app-dev-sls' }],
      });
    });
  });

  describe('releaseSharedSlsProjectIfUnused', () => {
    it('retains shared SLS project when logstores remain', async () => {
      mockClient.sls.getProjectTags.mockResolvedValue([
        { key: 'si-owned-by', value: 'test-app:shared:logs.project' },
      ]);
      mockClient.sls.listLogStores.mockResolvedValue(['fn-logs', 'apigw-logs']);

      const result = await releaseSharedSlsProjectIfUnused(
        mockContext,
        mockClient as never,
        sharedResourceState,
      );

      expect(result).toBe('retained');
      expect(mockClient.sls.deleteProject).not.toHaveBeenCalled();
    });

    it('deletes shared SLS project only when no logstores remain', async () => {
      mockClient.sls.getProjectTags.mockResolvedValue([
        { key: 'si-owned-by', value: 'test-app:shared:logs.project' },
      ]);

      const result = await releaseSharedSlsProjectIfUnused(
        mockContext,
        mockClient as never,
        sharedResourceState,
      );

      expect(result).toBe('deleted');
      expect(mockClient.sls.listLogStores).toHaveBeenCalledWith('test-app-dev-sls');
      expect(mockClient.sls.deleteProject).toHaveBeenCalledWith('test-app-dev-sls');
    });

    it('retains a foreign or untagged project without deleting it', async () => {
      const result = await releaseSharedSlsProjectIfUnused(
        mockContext,
        mockClient as never,
        sharedResourceState,
      );

      expect(result).toBe('retained');
      expect(mockClient.sls.deleteProject).not.toHaveBeenCalled();
      expect(mockClient.sls.listLogStores).not.toHaveBeenCalled();
    });

    it('returns absent when the project no longer exists in the provider', async () => {
      mockClient.sls.getProject.mockResolvedValue(null);

      const result = await releaseSharedSlsProjectIfUnused(
        mockContext,
        mockClient as never,
        sharedResourceState,
      );

      expect(result).toBe('absent');
      expect(mockClient.sls.deleteProject).not.toHaveBeenCalled();
    });

    it('returns absent when no shared project is tracked in state', async () => {
      const result = await releaseSharedSlsProjectIfUnused(
        mockContext,
        mockClient as never,
        undefined,
      );

      expect(result).toBe('absent');
      expect(mockClient.sls.getProject).not.toHaveBeenCalled();
    });
  });

  describe('ensureFunctionLogstore', () => {
    it('creates a per-function logstore in the shared project', async () => {
      const result = await ensureFunctionLogstore(
        mockContext,
        mockClient as never,
        'test-app-dev-sls',
        'test_fn',
      );

      expect(result).toEqual({ logstoreName: 'test-service-dev-test-fn-fn-logs' });
      expect(mockClient.sls.getLogstore).toHaveBeenCalledWith(
        'test-app-dev-sls',
        'test-service-dev-test-fn-fn-logs',
      );
      expect(mockClient.sls.createLogstore).toHaveBeenCalledWith(
        'test-app-dev-sls',
        'test-service-dev-test-fn-fn-logs',
      );
      expect(mockClient.sls.createIndex).toHaveBeenCalledWith(
        'test-app-dev-sls',
        'test-service-dev-test-fn-fn-logs',
      );
      expect(mockClient.sls.waitForLogstore).toHaveBeenCalledWith(
        'test-app-dev-sls',
        'test-service-dev-test-fn-fn-logs',
      );
    });

    it('reuses an existing function logstore without re-creating it', async () => {
      mockClient.sls.getLogstore.mockResolvedValue({
        logstoreName: 'test-service-dev-test-fn-fn-logs',
        projectName: 'test-app-dev-sls',
      });

      const result = await ensureFunctionLogstore(
        mockContext,
        mockClient as never,
        'test-app-dev-sls',
        'test_fn',
      );

      expect(result).toEqual({ logstoreName: 'test-service-dev-test-fn-fn-logs' });
      expect(mockClient.sls.createLogstore).not.toHaveBeenCalled();
      expect(mockClient.sls.createIndex).not.toHaveBeenCalled();
    });
  });

  describe('ensureGatewayLogstore', () => {
    it('creates service-scoped gateway logstore in shared project', async () => {
      const result = await ensureGatewayLogstore(
        mockContext,
        mockClient as never,
        'test-app-dev-sls',
      );

      expect(result).toEqual({ logstoreName: 'test-service-dev-apigw-logs' });
      expect(mockClient.sls.createLogstore).toHaveBeenCalledWith(
        'test-app-dev-sls',
        'test-service-dev-apigw-logs',
      );
    });
  });

  describe('buildSharedProjectName', () => {
    it('builds the app-scoped shared project name', () => {
      expect(buildSharedProjectName('my-app', 'prod')).toBe('my-app-prod-sls');
    });
  });
});
