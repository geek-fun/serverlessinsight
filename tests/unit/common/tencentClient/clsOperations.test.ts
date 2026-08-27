import { createClsOperations } from '../../../../src/common/tencentClient/clsOperations';

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string, params?: Record<string, unknown>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

const mockClsClient = {
  CreateLogset: jest.fn(),
  DescribeLogsets: jest.fn(),
  DeleteLogset: jest.fn(),
  CreateTopic: jest.fn(),
  DescribeTopics: jest.fn(),
  ModifyTopic: jest.fn(),
  DeleteTopic: jest.fn(),
  CreateIndex: jest.fn(),
  DeleteIndex: jest.fn(),
};

describe('clsOperations', () => {
  let operations: ReturnType<typeof createClsOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operations = createClsOperations(mockClsClient as any);
  });

  describe('createLogset', () => {
    it('creates a tagged CLS logset', async () => {
      mockClsClient.CreateLogset.mockResolvedValue({ LogsetId: 'logset-1', RequestId: 'r1' });

      const result = await operations.createLogset('test-app-dev-cls', [
        { key: 'si-owned-by', value: 'test-app:shared:logs.project' },
      ]);

      expect(mockClsClient.CreateLogset).toHaveBeenCalledWith({
        LogsetName: 'test-app-dev-cls',
        Tags: [{ Key: 'si-owned-by', Value: 'test-app:shared:logs.project' }],
      });
      expect(result).toEqual({ logsetId: 'logset-1' });
    });

    it('returns an empty logset id when the response lacks one', async () => {
      mockClsClient.CreateLogset.mockResolvedValue({});

      const result = await operations.createLogset('test-app-dev-cls', []);

      expect(result).toEqual({ logsetId: '' });
    });
  });

  describe('getLogsetByName', () => {
    it('finds a CLS logset using the installed filter model', async () => {
      mockClsClient.DescribeLogsets.mockResolvedValue({
        Logsets: [{ LogsetId: 'logset-1', LogsetName: 'test-app-dev-cls' }],
        TotalCount: 1,
      });

      const result = await operations.getLogsetByName('test-app-dev-cls');

      expect(mockClsClient.DescribeLogsets).toHaveBeenCalledWith({
        Filters: [{ Key: 'logsetName', Values: ['test-app-dev-cls'] }],
      });
      expect(result).toEqual({ LogsetId: 'logset-1', LogsetName: 'test-app-dev-cls' });
    });

    it('returns null when no logset matches', async () => {
      mockClsClient.DescribeLogsets.mockResolvedValue({ Logsets: [], TotalCount: 0 });

      const result = await operations.getLogsetByName('missing-logset');

      expect(result).toBeNull();
    });

    it('preserves the provider tags for ownership verification', async () => {
      mockClsClient.DescribeLogsets.mockResolvedValue({
        Logsets: [
          {
            LogsetId: 'logset-1',
            LogsetName: 'test-app-dev-cls',
            Tags: [{ Key: 'si-owned-by', Value: 'test-app:shared:logs.project' }],
          },
        ],
        TotalCount: 1,
      });

      const result = await operations.getLogsetByName('test-app-dev-cls');

      expect(result).toEqual({
        LogsetId: 'logset-1',
        LogsetName: 'test-app-dev-cls',
        Tags: [{ Key: 'si-owned-by', Value: 'test-app:shared:logs.project' }],
      });
    });
  });

  describe('listTopicsByLogset', () => {
    it('lists topics scoped to the logset with a large page limit', async () => {
      mockClsClient.DescribeTopics.mockResolvedValue({
        Topics: [{ TopicId: 'topic-1', TopicName: 'fn-logs' }],
        TotalCount: 1,
      });

      const result = await operations.listTopicsByLogset('logset-1');

      expect(mockClsClient.DescribeTopics).toHaveBeenCalledWith({
        Filters: [{ Key: 'logsetId', Values: ['logset-1'] }],
        Limit: 500,
      });
      expect(result).toHaveLength(1);
    });

    it('returns an empty list when the response lacks topics', async () => {
      mockClsClient.DescribeTopics.mockResolvedValue({});

      const result = await operations.listTopicsByLogset('logset-1');

      expect(result).toEqual([]);
    });
  });

  describe('getTopicByName', () => {
    it('finds a topic with precise search', async () => {
      mockClsClient.DescribeTopics.mockResolvedValue({
        Topics: [
          { TopicId: 'topic-1', TopicName: 'test-service-dev-fn-logs', LogsetId: 'logset-1' },
        ],
        TotalCount: 1,
      });

      const result = await operations.getTopicByName('logset-1', 'test-service-dev-fn-logs');

      expect(mockClsClient.DescribeTopics).toHaveBeenCalledWith({
        Filters: [
          { Key: 'topicName', Values: ['test-service-dev-fn-logs'] },
          { Key: 'logsetId', Values: ['logset-1'] },
        ],
        PreciseSearch: 3,
      });
      expect(result).toEqual({
        TopicId: 'topic-1',
        TopicName: 'test-service-dev-fn-logs',
        LogsetId: 'logset-1',
      });
    });

    it('returns null when no topic matches', async () => {
      mockClsClient.DescribeTopics.mockResolvedValue({ Topics: [], TotalCount: 0 });

      const result = await operations.getTopicByName('logset-1', 'missing-topic');

      expect(result).toBeNull();
    });
  });

  describe('createTopic', () => {
    it('creates a hot topic with thirty-day retention and ownership tags', async () => {
      mockClsClient.CreateTopic.mockResolvedValue({ TopicId: 'topic-1', RequestId: 'r1' });
      // CreateTopic is async — poll until the topic becomes visible.
      mockClsClient.DescribeTopics.mockResolvedValue({
        Topics: [
          { TopicId: 'topic-1', TopicName: 'test-service-dev-fn-logs', LogsetId: 'logset-1' },
        ],
        TotalCount: 1,
      });
      jest.spyOn(global, 'setTimeout').mockImplementation(((cb: () => void) => {
        cb();
        return 0 as unknown as ReturnType<typeof setTimeout>;
      }) as typeof setTimeout);

      const result = await operations.createTopic('logset-1', 'test-service-dev-fn-logs', {
        period: 30,
        storageType: 'hot',
        tags: [{ key: 'si-owned-by', value: 'test-app-test-service:functions.test_fn' }],
      });

      expect(mockClsClient.CreateTopic).toHaveBeenCalledWith({
        LogsetId: 'logset-1',
        TopicName: 'test-service-dev-fn-logs',
        StorageType: 'hot',
        Period: 30,
        Tags: [{ Key: 'si-owned-by', Value: 'test-app-test-service:functions.test_fn' }],
      });
      expect(mockClsClient.DescribeTopics).toHaveBeenCalled();
      expect(result).toEqual({ topicId: 'topic-1' });
    });

    it('uses default storage type and period when omitted', async () => {
      mockClsClient.CreateTopic.mockResolvedValue({ TopicId: 'topic-1' });
      mockClsClient.DescribeTopics.mockResolvedValue({
        Topics: [{ TopicId: 'topic-1', TopicName: 't' }],
        TotalCount: 1,
      });
      jest.spyOn(global, 'setTimeout').mockImplementation(((cb: () => void) => {
        cb();
        return 0 as unknown as ReturnType<typeof setTimeout>;
      }) as typeof setTimeout);

      await operations.createTopic('logset-1', 't', { tags: [] });

      expect(mockClsClient.CreateTopic).toHaveBeenCalledWith(
        expect.objectContaining({ StorageType: 'hot', Period: 30 }),
      );
    });

    it('returns an empty topic id when the visible topic lacks an id', async () => {
      mockClsClient.CreateTopic.mockResolvedValue({});
      mockClsClient.DescribeTopics.mockResolvedValue({
        Topics: [{ TopicName: 't' }],
        TotalCount: 1,
      });
      jest.spyOn(global, 'setTimeout').mockImplementation(((cb: () => void) => {
        cb();
        return 0 as unknown as ReturnType<typeof setTimeout>;
      }) as typeof setTimeout);

      const result = await operations.createTopic('logset-1', 't', { tags: [] });

      expect(result).toEqual({ topicId: '' });
    });
  });

  describe('deleteTopic', () => {
    it('deletes an unbound CLS topic idempotently', async () => {
      mockClsClient.DeleteTopic.mockResolvedValue({});

      await operations.deleteTopic('topic-1');

      expect(mockClsClient.DeleteTopic).toHaveBeenCalledWith({ TopicId: 'topic-1' });
    });

    it('swallows ResourceNotFound.TopicNotExist during delete', async () => {
      mockClsClient.DeleteTopic.mockRejectedValue(
        Object.assign(new Error('topic not found'), { code: 'ResourceNotFound.TopicNotExist' }),
      );

      await expect(operations.deleteTopic('topic-1')).resolves.toBeUndefined();
    });

    it('rethrows non-not-found errors during topic delete', async () => {
      mockClsClient.DeleteTopic.mockRejectedValue(new Error('delete failed'));

      await expect(operations.deleteTopic('topic-1')).rejects.toThrow('delete failed');
    });

    it('treats a delete error with a non-string code as unexpected', async () => {
      mockClsClient.DeleteTopic.mockRejectedValue({ code: 500 });

      await expect(operations.deleteTopic('topic-1')).rejects.toMatchObject({ code: 500 });
    });
  });

  describe('deleteLogset', () => {
    it('deletes a CLS logset', async () => {
      mockClsClient.DeleteLogset.mockResolvedValue({});

      await operations.deleteLogset('logset-1');

      expect(mockClsClient.DeleteLogset).toHaveBeenCalledWith({ LogsetId: 'logset-1' });
    });

    it('swallows ResourceNotFound.LogsetNotExist during delete', async () => {
      mockClsClient.DeleteLogset.mockRejectedValue(
        Object.assign(new Error('logset not found'), { code: 'ResourceNotFound.LogsetNotExist' }),
      );

      await expect(operations.deleteLogset('logset-1')).resolves.toBeUndefined();
    });

    it('rethrows non-not-found errors during logset delete', async () => {
      mockClsClient.DeleteLogset.mockRejectedValue(new Error('delete failed'));

      await expect(operations.deleteLogset('logset-1')).rejects.toThrow('delete failed');
    });
  });

  describe('createFulltextIndex', () => {
    it('creates a full-text index for the topic', async () => {
      mockClsClient.CreateIndex.mockResolvedValue({});

      await operations.createFulltextIndex('topic-1');

      expect(mockClsClient.CreateIndex).toHaveBeenCalledWith({
        TopicId: 'topic-1',
        Rule: { FullText: { CaseSensitive: false, Tokenizer: ' ,.?;!\n\t' } },
      });
    });

    it('ignores already-exists style errors idempotently', async () => {
      mockClsClient.CreateIndex.mockRejectedValue(
        Object.assign(new Error('index already exists'), {
          code: 'FailedOperation.IndexAlreadyExists',
        }),
      );

      await expect(operations.createFulltextIndex('topic-1')).resolves.toBeUndefined();
    });

    it('ignores already-exists style errors reported via message', async () => {
      mockClsClient.CreateIndex.mockRejectedValue({
        code: 500,
        message: 'index already exist',
      });

      await expect(operations.createFulltextIndex('topic-1')).resolves.toBeUndefined();
    });

    it('rethrows unexpected errors during index creation', async () => {
      mockClsClient.CreateIndex.mockRejectedValue(new Error('create failed'));

      await expect(operations.createFulltextIndex('topic-1')).rejects.toThrow('create failed');
    });

    it('treats a non-object index error as unexpected', async () => {
      mockClsClient.CreateIndex.mockRejectedValue('boom');

      await expect(operations.createFulltextIndex('topic-1')).rejects.toBe('boom');
    });

    it('rethrows when an already-exists error has no recognizable message', async () => {
      mockClsClient.CreateIndex.mockRejectedValue({ code: 500, message: 123 });

      await expect(operations.createFulltextIndex('topic-1')).rejects.toMatchObject({ code: 500 });
    });
  });

  describe('deleteIndex', () => {
    it('deletes the index for a topic', async () => {
      mockClsClient.DeleteIndex.mockResolvedValue({});

      await operations.deleteIndex('topic-1');

      expect(mockClsClient.DeleteIndex).toHaveBeenCalledWith({ TopicId: 'topic-1' });
    });

    it('swallows ResourceNotFound.IndexNotExist during delete', async () => {
      mockClsClient.DeleteIndex.mockRejectedValue(
        Object.assign(new Error('index not found'), { code: 'ResourceNotFound.IndexNotExist' }),
      );

      await expect(operations.deleteIndex('topic-1')).resolves.toBeUndefined();
    });

    it('rethrows non-not-found errors during index delete', async () => {
      mockClsClient.DeleteIndex.mockRejectedValue(new Error('delete failed'));

      await expect(operations.deleteIndex('topic-1')).rejects.toThrow('delete failed');
    });
  });
});
