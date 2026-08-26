import {
  ensureSharedLogProject,
  buildSharedProjectResourceState,
  releaseSharedLogProjectIfUnused,
  ensureOwnedTopic,
} from '../../../../src/stack/volcengineStack/sharedLogProject';
import type { Context, StateFile, ResourceState } from '../../../../src/types';
import type { VolcengineClient } from '../../../../src/common/volcengineClient/types';

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

describe('sharedLogProject', () => {
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

  const mockClient = {
    tls: {
      createProject: jest.fn(),
      getProject: jest.fn(),
      deleteProject: jest.fn(),
      listTopics: jest.fn(),
      createTopic: jest.fn(),
      getTopic: jest.fn(),
      createIndex: jest.fn(),
      waitForProject: jest.fn(),
      waitForTopic: jest.fn(),
      addTags: jest.fn(),
      removeTags: jest.fn(),
    },
  };

  const emptyState: StateFile = {
    version: '3.0',
    provider: 'volcengine',
    app: 'test-app',
    service: 'test-service',
    stages: { dev: { resources: {} } },
    resources: {},
  };

  const sharedResourceState: ResourceState = {
    mode: 'managed',
    region: 'cn-beijing',
    definition: { projectName: 'test-app-dev-tls', region: 'cn-beijing', stage: 'dev' },
    instances: [
      {
        sid: 'si:volcengine:tls:dev:test-app-dev-tls',
        type: 'VOLCENGINE_TLS_PROJECT',
        id: 'test-app-dev-tls',
        projectId: 'proj-1',
      },
    ],
    lastUpdated: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient.tls.createProject.mockResolvedValue({
      projectId: 'proj-1',
      projectName: 'test-app-dev-tls',
    });
    mockClient.tls.getProject.mockResolvedValue({
      projectId: 'proj-1',
      projectName: 'test-app-dev-tls',
      status: 'Active',
    });
    mockClient.tls.listTopics.mockResolvedValue([]);
    mockClient.tls.waitForProject.mockResolvedValue(undefined);
    mockClient.tls.createTopic.mockResolvedValue({
      topicId: 'topic-1',
      topicName: 'test-service-dev-fn-logs',
    });
    mockClient.tls.getTopic.mockResolvedValue(null);
    mockClient.tls.createIndex.mockResolvedValue(undefined);
    mockClient.tls.waitForTopic.mockResolvedValue(undefined);
  });

  describe('ensureSharedLogProject', () => {
    it('reuses the shared TLS project from stage shared state', async () => {
      const stateWithShared: StateFile = {
        ...emptyState,
        stages: {
          dev: { resources: {}, shared: { 'logs.project': sharedResourceState } },
        },
      };

      const result = await ensureSharedLogProject(
        mockContext,
        mockClient as unknown as VolcengineClient,
        stateWithShared,
      );

      expect(result).toEqual({ projectName: 'test-app-dev-tls', projectId: 'proj-1' });
      expect(mockClient.tls.createProject).not.toHaveBeenCalled();
      expect(mockClient.tls.addTags).not.toHaveBeenCalled();
    });

    it('falls back to the stored projectId on the shared resource attributes', async () => {
      const stateWithShared: StateFile = {
        ...emptyState,
        stages: {
          dev: {
            resources: {},
            shared: {
              'logs.project': {
                ...sharedResourceState,
                instances: [
                  {
                    sid: 'si:volcengine:tls:dev:test-app-dev-tls',
                    type: 'VOLCENGINE_TLS_PROJECT',
                    id: 'test-app-dev-tls',
                    attributes: { projectId: 'proj-attr' },
                  },
                ],
              },
            },
          },
        },
      };

      const result = await ensureSharedLogProject(
        mockContext,
        mockClient as unknown as VolcengineClient,
        stateWithShared,
      );

      expect(result).toEqual({ projectName: 'test-app-dev-tls', projectId: 'proj-attr' });
    });

    it('creates and tags a new app-scoped TLS project', async () => {
      const result = await ensureSharedLogProject(
        mockContext,
        mockClient as unknown as VolcengineClient,
        emptyState,
      );

      expect(result).toEqual({ projectName: 'test-app-dev-tls', projectId: 'proj-1' });
      expect(mockClient.tls.createProject).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'test-app-dev-tls',
          region: 'cn-beijing',
        }),
      );
      expect(mockClient.tls.waitForProject).toHaveBeenCalledWith('test-app-dev-tls');
      expect(mockClient.tls.addTags).toHaveBeenCalledWith({
        resourceType: 'project',
        resourcesList: ['proj-1'],
        tags: [{ key: 'si-owned-by', value: 'test-app:shared:logs.project' }],
      });
    });
  });

  describe('buildSharedProjectResourceState', () => {
    it('builds a ResourceState for the shared project', () => {
      const result = buildSharedProjectResourceState(mockContext, {
        projectName: 'test-app-dev-tls',
        projectId: 'proj-1',
      });

      expect(result).toMatchObject({
        mode: 'managed',
        region: 'cn-beijing',
        definition: { projectName: 'test-app-dev-tls', region: 'cn-beijing', stage: 'dev' },
        instances: [
          {
            type: 'VOLCENGINE_TLS_PROJECT',
            id: 'test-app-dev-tls',
            projectId: 'proj-1',
          },
        ],
      });
      expect(typeof result.lastUpdated).toBe('string');
    });
  });

  describe('releaseSharedLogProjectIfUnused', () => {
    it('retains shared TLS project when topics remain', async () => {
      mockClient.tls.listTopics.mockResolvedValue([
        { topicId: 't1', topicName: 'fn-logs' },
        { topicId: 't2', topicName: 'apigw-logs' },
      ]);

      const result = await releaseSharedLogProjectIfUnused(
        mockContext,
        mockClient as unknown as VolcengineClient,
        sharedResourceState,
      );

      expect(result).toBe('retained');
      expect(mockClient.tls.deleteProject).not.toHaveBeenCalled();
    });

    it('deletes shared TLS project only when no topics remain', async () => {
      mockClient.tls.listTopics.mockResolvedValue([]);

      const result = await releaseSharedLogProjectIfUnused(
        mockContext,
        mockClient as unknown as VolcengineClient,
        sharedResourceState,
      );

      expect(result).toBe('deleted');
      expect(mockClient.tls.listTopics).toHaveBeenCalledWith('test-app-dev-tls');
      expect(mockClient.tls.deleteProject).toHaveBeenCalledWith('test-app-dev-tls');
    });

    it('returns absent when the project no longer exists in the provider', async () => {
      mockClient.tls.getProject.mockResolvedValue(null);

      const result = await releaseSharedLogProjectIfUnused(
        mockContext,
        mockClient as unknown as VolcengineClient,
        sharedResourceState,
      );

      expect(result).toBe('absent');
      expect(mockClient.tls.deleteProject).not.toHaveBeenCalled();
    });

    it('returns absent when no shared project is tracked in state', async () => {
      const result = await releaseSharedLogProjectIfUnused(
        mockContext,
        mockClient as unknown as VolcengineClient,
        undefined,
      );

      expect(result).toBe('absent');
      expect(mockClient.tls.getProject).not.toHaveBeenCalled();
    });
  });

  describe('ensureOwnedTopic', () => {
    it('adopts an existing topic owned by the same stack', async () => {
      mockClient.tls.getTopic.mockResolvedValue({
        topicId: 'topic-1',
        topicName: 'test-service-dev-fn-logs',
        tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
      });

      const result = await ensureOwnedTopic(
        mockContext,
        mockClient as unknown as VolcengineClient,
        {
          projectName: 'test-app-dev-tls',
          topicName: 'test-service-dev-fn-logs',
          logicalId: 'functions.test_fn',
        },
      );

      expect(result).toEqual({ topicName: 'test-service-dev-fn-logs', topicId: 'topic-1' });
      expect(mockClient.tls.createTopic).not.toHaveBeenCalled();
    });

    it('creates, tags, indexes and waits for a new topic', async () => {
      const result = await ensureOwnedTopic(
        mockContext,
        mockClient as unknown as VolcengineClient,
        {
          projectName: 'test-app-dev-tls',
          topicName: 'test-service-dev-fn-logs',
          logicalId: 'functions.test_fn',
        },
      );

      expect(result).toEqual({ topicName: 'test-service-dev-fn-logs', topicId: 'topic-1' });
      expect(mockClient.tls.createTopic).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'test-app-dev-tls',
          topicName: 'test-service-dev-fn-logs',
          ttl: 30,
        }),
      );
      expect(mockClient.tls.addTags).toHaveBeenCalledWith({
        resourceType: 'topic',
        resourcesList: ['topic-1'],
        tags: [{ key: 'si-owned-by', value: 'test-app-test-service:functions.test_fn' }],
      });
      expect(mockClient.tls.createIndex).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'test-app-dev-tls',
          topicName: 'test-service-dev-fn-logs',
        }),
      );
      expect(mockClient.tls.waitForTopic).toHaveBeenCalledWith(
        'test-app-dev-tls',
        'test-service-dev-fn-logs',
      );
    });

    it('refuses to adopt a topic owned by a foreign stack', async () => {
      mockClient.tls.getTopic.mockResolvedValue({
        topicId: 'topic-foreign',
        topicName: 'test-service-dev-fn-logs',
        tags: [{ Key: 'si-owned-by', Value: 'another-app-another-service:functions.other' }],
      });

      await expect(
        ensureOwnedTopic(mockContext, mockClient as unknown as VolcengineClient, {
          projectName: 'test-app-dev-tls',
          topicName: 'test-service-dev-fn-logs',
          logicalId: 'functions.test_fn',
        }),
      ).rejects.toThrow('TLS_TOPIC_FOREIGN_OWNED');
      expect(mockClient.tls.createTopic).not.toHaveBeenCalled();
    });
  });
});
