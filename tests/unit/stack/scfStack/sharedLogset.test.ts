import {
  SHARED_LOGSET_KEY,
  buildSharedLogsetName,
  buildFunctionTopicName,
  ensureSharedLogset,
  buildSharedLogsetResourceState,
  releaseSharedLogsetIfUnused,
  ensureFunctionTopic,
} from '../../../../src/stack/scfStack/sharedLogset';
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

describe('sharedLogset', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'ap-guangzhou',
    provider: 'tencent' as unknown as Context['provider'],
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockClsOperations = {
    createLogset: jest.fn(),
    getLogsetByName: jest.fn(),
    listTopicsByLogset: jest.fn(),
    getTopicByName: jest.fn(),
    createTopic: jest.fn(),
    deleteTopic: jest.fn(),
    deleteLogset: jest.fn(),
    createFulltextIndex: jest.fn(),
    deleteIndex: jest.fn(),
    waitForTopic: jest.fn(),
  };

  const mockClient = { cls: mockClsOperations };

  const emptyState: StateFile = {
    version: '3.0',
    provider: 'tencent',
    app: 'test-app',
    service: 'test-service',
    stages: { dev: { resources: {} } },
    resources: {},
  };

  const sharedResourceState: ResourceState = {
    mode: 'managed',
    region: 'ap-guangzhou',
    definition: { logsetName: 'test-app-dev-cls', region: 'ap-guangzhou', stage: 'dev' },
    instances: [
      {
        sid: 'si:tencent:cls-logset:dev:test-app-dev-cls',
        type: 'TENCENT_CLS_LOGSET',
        id: 'test-app-dev-cls',
        logsetId: 'logset-1',
      },
    ],
    lastUpdated: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockClsOperations.createLogset.mockResolvedValue({ logsetId: 'logset-1' });
    // No same-named provider logset by default → ensureSharedLogset creates one.
    mockClsOperations.getLogsetByName.mockResolvedValue(null);
    mockClsOperations.listTopicsByLogset.mockResolvedValue([]);
    mockClsOperations.getTopicByName.mockResolvedValue(null);
    mockClsOperations.createTopic.mockResolvedValue({ topicId: 'topic-1' });
    mockClsOperations.createFulltextIndex.mockResolvedValue(undefined);
    mockClsOperations.deleteLogset.mockResolvedValue(undefined);
    mockClsOperations.deleteTopic.mockResolvedValue(undefined);
  });

  describe('buildSharedLogsetName', () => {
    it('builds the canonical app-stage logset name', () => {
      expect(buildSharedLogsetName('test-app', 'dev')).toBe('test-app-dev-cls');
    });
  });

  describe('buildFunctionTopicName', () => {
    it('builds the canonical per-function topic name', () => {
      expect(buildFunctionTopicName(mockContext, 'test_fn')).toBe(
        'test-service-dev-test_fn-fn-logs',
      );
    });

    it('builds the legacy service-scoped shape when no function key is given', () => {
      expect(buildFunctionTopicName(mockContext)).toBe('test-service-dev-fn-logs');
    });
  });

  describe('ensureSharedLogset', () => {
    it('reuses the shared CLS logset from stage shared state', async () => {
      const stateWithShared: StateFile = {
        ...emptyState,
        stages: {
          dev: { resources: {}, shared: { [SHARED_LOGSET_KEY]: sharedResourceState } },
        },
      };

      const result = await ensureSharedLogset(mockContext, mockClient as never, stateWithShared);

      expect(result).toEqual({ logsetName: 'test-app-dev-cls', logsetId: 'logset-1' });
      expect(mockClsOperations.createLogset).not.toHaveBeenCalled();
    });

    it('creates and tags a new app-scoped CLS logset', async () => {
      const result = await ensureSharedLogset(mockContext, mockClient as never, emptyState);

      expect(result).toEqual({ logsetName: 'test-app-dev-cls', logsetId: 'logset-1' });
      expect(mockClsOperations.createLogset).toHaveBeenCalledWith('test-app-dev-cls', [
        { key: 'si-owned-by', value: 'test-app:shared:logs.project' },
      ]);
    });

    it('creates a new logset when no state is provided', async () => {
      const result = await ensureSharedLogset(mockContext, mockClient as never, undefined);

      expect(result).toEqual({ logsetName: 'test-app-dev-cls', logsetId: 'logset-1' });
      expect(mockClsOperations.createLogset).toHaveBeenCalled();
    });

    it('creates a new logset when the shared entry has no resolvable name', async () => {
      const stateWithEmptyShared: StateFile = {
        ...emptyState,
        stages: {
          dev: {
            resources: {},
            shared: {
              [SHARED_LOGSET_KEY]: {
                ...sharedResourceState,
                instances: [],
                definition: {},
              },
            },
          },
        },
      };

      const result = await ensureSharedLogset(
        mockContext,
        mockClient as never,
        stateWithEmptyShared,
      );

      expect(result).toEqual({ logsetName: 'test-app-dev-cls', logsetId: 'logset-1' });
      expect(mockClsOperations.createLogset).toHaveBeenCalled();
    });

    it('falls back to attributes for the shared logset id', async () => {
      const stateWithShared: StateFile = {
        ...emptyState,
        stages: {
          dev: {
            resources: {},
            shared: {
              [SHARED_LOGSET_KEY]: {
                ...sharedResourceState,
                instances: [
                  {
                    sid: 'si:tencent:cls-logset:dev:test-app-dev-cls',
                    type: 'TENCENT_CLS_LOGSET',
                    id: 'test-app-dev-cls',
                    attributes: { logsetId: 'logset-attr' },
                  },
                ],
              },
            },
          },
        },
      };

      const result = await ensureSharedLogset(mockContext, mockClient as never, stateWithShared);

      expect(result).toEqual({ logsetName: 'test-app-dev-cls', logsetId: 'logset-attr' });
      expect(mockClsOperations.createLogset).not.toHaveBeenCalled();
    });

    it('adopts a same-named provider logset owned by this app when local state is absent', async () => {
      mockClsOperations.getLogsetByName.mockResolvedValue({
        LogsetId: 'logset-1',
        LogsetName: 'test-app-dev-cls',
        Tags: [{ Key: 'si-owned-by', Value: 'test-app:shared:logs.project' }],
      });

      const result = await ensureSharedLogset(mockContext, mockClient as never, emptyState);

      expect(result).toEqual({ logsetName: 'test-app-dev-cls', logsetId: 'logset-1' });
      expect(mockClsOperations.getLogsetByName).toHaveBeenCalledWith('test-app-dev-cls');
      expect(mockClsOperations.createLogset).not.toHaveBeenCalled();
    });

    it('refuses a same-named provider logset owned by a foreign app', async () => {
      mockClsOperations.getLogsetByName.mockResolvedValue({
        LogsetId: 'logset-foreign',
        LogsetName: 'test-app-dev-cls',
        Tags: [{ Key: 'si-owned-by', Value: 'other-app:shared:logs.project' }],
      });

      await expect(
        ensureSharedLogset(mockContext, mockClient as never, emptyState),
      ).rejects.toThrow('CLS_LOGSET_FOREIGN_OWNED');
      expect(mockClsOperations.createLogset).not.toHaveBeenCalled();
    });

    it('refuses a same-named provider logset that is untagged', async () => {
      mockClsOperations.getLogsetByName.mockResolvedValue({
        LogsetId: 'logset-foreign',
        LogsetName: 'test-app-dev-cls',
        Tags: [],
      });

      await expect(
        ensureSharedLogset(mockContext, mockClient as never, emptyState),
      ).rejects.toThrow('CLS_LOGSET_FOREIGN_OWNED');
      expect(mockClsOperations.createLogset).not.toHaveBeenCalled();
    });

    it('creates a new logset when no same-named provider logset exists', async () => {
      mockClsOperations.getLogsetByName.mockResolvedValue(null);

      const result = await ensureSharedLogset(mockContext, mockClient as never, emptyState);

      expect(result).toEqual({ logsetName: 'test-app-dev-cls', logsetId: 'logset-1' });
      expect(mockClsOperations.getLogsetByName).toHaveBeenCalledWith('test-app-dev-cls');
      expect(mockClsOperations.createLogset).toHaveBeenCalledWith('test-app-dev-cls', [
        { key: 'si-owned-by', value: 'test-app:shared:logs.project' },
      ]);
    });
  });

  describe('buildSharedLogsetResourceState', () => {
    it('builds a ResourceState for the shared logset', () => {
      const result = buildSharedLogsetResourceState(mockContext, {
        logsetName: 'test-app-dev-cls',
        logsetId: 'logset-1',
      });

      expect(result).toMatchObject({
        mode: 'managed',
        region: 'ap-guangzhou',
        definition: { logsetName: 'test-app-dev-cls', region: 'ap-guangzhou', stage: 'dev' },
        instances: [
          {
            type: 'TENCENT_CLS_LOGSET',
            id: 'test-app-dev-cls',
            logsetId: 'logset-1',
          },
        ],
      });
      expect(typeof result.lastUpdated).toBe('string');
    });
  });

  describe('releaseSharedLogsetIfUnused', () => {
    it('retains shared CLS logset when topics remain', async () => {
      mockClsOperations.getLogsetByName.mockResolvedValue({
        LogsetId: 'logset-1',
        LogsetName: 'test-app-dev-cls',
      });
      mockClsOperations.listTopicsByLogset.mockResolvedValue([
        { TopicId: 't1', TopicName: 'fn-logs' },
      ]);

      const result = await releaseSharedLogsetIfUnused(
        mockContext,
        mockClient as never,
        sharedResourceState,
      );

      expect(result).toBe('retained');
      expect(mockClsOperations.deleteLogset).not.toHaveBeenCalled();
    });

    it('deletes shared CLS logset only when no topics remain', async () => {
      mockClsOperations.getLogsetByName.mockResolvedValue({
        LogsetId: 'logset-1',
        LogsetName: 'test-app-dev-cls',
      });
      mockClsOperations.listTopicsByLogset.mockResolvedValue([]);

      const result = await releaseSharedLogsetIfUnused(
        mockContext,
        mockClient as never,
        sharedResourceState,
      );

      expect(result).toBe('deleted');
      expect(mockClsOperations.listTopicsByLogset).toHaveBeenCalledWith('logset-1');
      expect(mockClsOperations.deleteLogset).toHaveBeenCalledWith('logset-1');
    });

    it('returns absent when the logset no longer exists in the provider', async () => {
      mockClsOperations.getLogsetByName.mockResolvedValue(null);

      const result = await releaseSharedLogsetIfUnused(
        mockContext,
        mockClient as never,
        sharedResourceState,
      );

      expect(result).toBe('absent');
      expect(mockClsOperations.deleteLogset).not.toHaveBeenCalled();
    });

    it('returns absent when the provider logset has no id', async () => {
      mockClsOperations.getLogsetByName.mockResolvedValue({ LogsetName: 'test-app-dev-cls' });

      const result = await releaseSharedLogsetIfUnused(
        mockContext,
        mockClient as never,
        sharedResourceState,
      );

      expect(result).toBe('absent');
      expect(mockClsOperations.deleteLogset).not.toHaveBeenCalled();
    });

    it('returns absent when no shared logset is tracked in state', async () => {
      const result = await releaseSharedLogsetIfUnused(mockContext, mockClient as never, undefined);

      expect(result).toBe('absent');
      expect(mockClsOperations.getLogsetByName).not.toHaveBeenCalled();
    });

    it('returns absent when the shared state has no resolvable logset name', async () => {
      const result = await releaseSharedLogsetIfUnused(mockContext, mockClient as never, {
        ...sharedResourceState,
        instances: [],
        definition: {},
      });

      expect(result).toBe('absent');
      expect(mockClsOperations.getLogsetByName).not.toHaveBeenCalled();
    });
  });

  describe('ensureFunctionTopic', () => {
    it('creates function topic under the shared logset with canonical name', async () => {
      const result = await ensureFunctionTopic(mockContext, mockClient as never, {
        logsetId: 'logset-1',
        logsetName: 'test-app-dev-cls',
        topicName: 'test-service-dev-fn-logs',
        logicalId: 'functions.test_fn',
      });

      expect(result).toEqual({ topicName: 'test-service-dev-fn-logs', topicId: 'topic-1' });
      expect(mockClsOperations.createTopic).toHaveBeenCalledWith(
        'logset-1',
        'test-service-dev-fn-logs',
        {
          period: 30,
          storageType: 'hot',
          tags: [{ key: 'si-owned-by', value: 'test-app-test-service:functions.test_fn' }],
        },
      );
      expect(mockClsOperations.createFulltextIndex).toHaveBeenCalledWith('topic-1');
    });

    it('adopts an existing topic owned by the same stack', async () => {
      mockClsOperations.getTopicByName.mockResolvedValue({
        TopicId: 'topic-1',
        TopicName: 'test-service-dev-fn-logs',
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
      });

      const result = await ensureFunctionTopic(mockContext, mockClient as never, {
        logsetId: 'logset-1',
        logsetName: 'test-app-dev-cls',
        topicName: 'test-service-dev-fn-logs',
        logicalId: 'functions.test_fn',
      });

      expect(result).toEqual({ topicName: 'test-service-dev-fn-logs', topicId: 'topic-1' });
      expect(mockClsOperations.createTopic).not.toHaveBeenCalled();
      expect(mockClsOperations.createFulltextIndex).not.toHaveBeenCalled();
    });

    it('adopts an existing topic that lacks name and id fields', async () => {
      mockClsOperations.getTopicByName.mockResolvedValue({
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
      });

      const result = await ensureFunctionTopic(mockContext, mockClient as never, {
        logsetId: 'logset-1',
        logsetName: 'test-app-dev-cls',
        topicName: 'test-service-dev-fn-logs',
        logicalId: 'functions.test_fn',
      });

      expect(result).toEqual({
        topicName: 'test-service-dev-fn-logs',
        topicId: '',
      });
      expect(mockClsOperations.createTopic).not.toHaveBeenCalled();
    });

    it('refuses to adopt an untagged topic', async () => {
      mockClsOperations.getTopicByName.mockResolvedValue({
        TopicId: 'topic-foreign',
        TopicName: 'test-service-dev-fn-logs',
        Tags: [],
      });

      await expect(
        ensureFunctionTopic(mockContext, mockClient as never, {
          logsetId: 'logset-1',
          logsetName: 'test-app-dev-cls',
          topicName: 'test-service-dev-fn-logs',
          logicalId: 'functions.test_fn',
        }),
      ).rejects.toThrow('CLS_TOPIC_FOREIGN_OWNED');
      expect(mockClsOperations.createTopic).not.toHaveBeenCalled();
    });

    it('refuses to adopt a topic owned by a foreign stack', async () => {
      mockClsOperations.getTopicByName.mockResolvedValue({
        TopicId: 'topic-foreign',
        TopicName: 'test-service-dev-fn-logs',
        Tags: [{ Key: 'si-owned-by', Value: 'another-app-another-service:functions.other' }],
      });

      await expect(
        ensureFunctionTopic(mockContext, mockClient as never, {
          logsetId: 'logset-1',
          logsetName: 'test-app-dev-cls',
          topicName: 'test-service-dev-fn-logs',
          logicalId: 'functions.test_fn',
        }),
      ).rejects.toThrow('CLS_TOPIC_FOREIGN_OWNED');
      expect(mockClsOperations.createTopic).not.toHaveBeenCalled();
    });
  });
});
