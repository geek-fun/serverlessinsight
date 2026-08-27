import { createTlsOperations } from '../../../../src/common/volcengineClient/tlsOperations';

type MockFn = jest.Mock;

const createError = (code: string) => {
  const error = new Error(`TLS ${code}`) as Error & { code?: string };
  error.code = code;
  return error;
};

const createMockClient = () => ({
  CreateProject: jest.fn() as MockFn,
  DescribeProjects: jest.fn() as MockFn,
  DeleteProject: jest.fn() as MockFn,
  CreateTopic: jest.fn() as MockFn,
  DescribeTopics: jest.fn() as MockFn,
  DeleteTopic: jest.fn() as MockFn,
  CreateIndex: jest.fn() as MockFn,
  DescribeIndex: jest.fn() as MockFn,
  DeleteIndex: jest.fn() as MockFn,
  AddTagsToResource: jest.fn() as MockFn,
  RemoveTagsFromResource: jest.fn() as MockFn,
  ListTagsForResources: jest.fn() as MockFn,
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

describe('tlsOperations', () => {
  let operations: ReturnType<typeof createTlsOperations>;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    operations = createTlsOperations(
      mockClient as unknown as Parameters<typeof createTlsOperations>[0],
    );
    jest.clearAllMocks();
    mockClient.ListTagsForResources.mockResolvedValue({ ResourceTags: [], NextToken: '' });
  });

  describe('createProject', () => {
    it('should create project successfully', async () => {
      mockClient.CreateProject.mockResolvedValueOnce({ ProjectId: 'project-123' });

      const result = await operations.createProject({
        projectName: 'test-project',
        description: 'Test project',
        region: 'cn-beijing',
      });

      expect(result.projectName).toBe('test-project');
      expect(result.projectId).toBe('project-123');
      expect(result.created).toBe(true);
      expect(mockClient.CreateProject).toHaveBeenCalledWith({
        ProjectName: 'test-project',
        Description: 'Test project',
        Region: 'cn-beijing',
      });
    });

    it('should tolerate ProjectAlreadyExists and adopt the existing project', async () => {
      mockClient.CreateProject.mockRejectedValueOnce(createError('ProjectAlreadyExists'));
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });

      const result = await operations.createProject({
        projectName: 'test-project',
        description: 'Test project',
        region: 'cn-beijing',
      });

      expect(result.projectId).toBe('project-123');
      expect(result.created).toBe(false);
    });

    it('should tolerate ResourceAlreadyExists on createProject', async () => {
      mockClient.CreateProject.mockRejectedValueOnce(createError('ResourceAlreadyExists'));
      mockClient.DescribeProjects.mockResolvedValueOnce({ Projects: [], Total: 0 });

      const result = await operations.createProject({
        projectName: 'test-project',
        description: 'Test project',
        region: 'cn-beijing',
      });

      expect(result.projectName).toBe('test-project');
      expect(result.status).toBe('Active');
      expect(result.created).toBe(false);
    });

    it('should rethrow unexpected create errors', async () => {
      const error = createError('AccessDenied');
      mockClient.CreateProject.mockRejectedValueOnce(error);

      await expect(operations.createProject({ projectName: 'test-project' })).rejects.toBe(error);
    });
  });

  describe('getProject', () => {
    it('should return project info when found', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '2024-01-01T00:00:00Z',
            Description: 'Test project',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });

      const result = await operations.getProject('test-project');

      expect(result?.projectId).toBe('project-123');
      expect(result?.projectName).toBe('test-project');
    });

    it('should return null when project not found', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({ Projects: [], Total: 0 });

      const result = await operations.getProject('missing-project');

      expect(result).toBeNull();
    });

    it('should return null for ResourceNotFound error code', async () => {
      mockClient.DescribeProjects.mockRejectedValueOnce(createError('ResourceNotFound'));

      const result = await operations.getProject('missing-project');

      expect(result).toBeNull();
    });

    it('should rethrow unexpected get errors', async () => {
      const error = createError('AccessDenied');
      mockClient.DescribeProjects.mockRejectedValueOnce(error);

      await expect(operations.getProject('test-project')).rejects.toBe(error);
    });
  });

  describe('getProjectTags', () => {
    it('should return the tags of an existing project', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [{ ProjectId: 'project-123', ProjectName: 'test-project' }],
        Total: 1,
      });
      mockClient.ListTagsForResources.mockResolvedValueOnce({
        ResourceTags: [
          { TagKey: 'si-owned-by', TagValue: 'test-app:shared:logs.project' },
          { TagKey: 'env', TagValue: 'dev' },
        ],
        NextToken: '',
      });

      const result = await operations.getProjectTags('test-project');

      expect(result).toEqual([
        { Key: 'si-owned-by', Value: 'test-app:shared:logs.project' },
        { Key: 'env', Value: 'dev' },
      ]);
      expect(mockClient.ListTagsForResources).toHaveBeenCalledWith({
        ResourceType: 'project',
        ResourcesIds: ['project-123'],
        MaxResults: 50,
      });
    });

    it('should return an empty list when the project does not exist', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({ Projects: [], Total: 0 });

      const result = await operations.getProjectTags('missing-project');

      expect(result).toEqual([]);
      expect(mockClient.ListTagsForResources).not.toHaveBeenCalled();
    });
  });

  describe('deleteProject', () => {
    it('should delete project successfully', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DeleteProject.mockResolvedValueOnce({});

      await operations.deleteProject('test-project');

      expect(mockClient.DeleteProject).toHaveBeenCalledWith({ ProjectId: 'project-123' });
    });

    it('should handle project not found gracefully', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({ Projects: [], Total: 0 });

      await expect(operations.deleteProject('missing-project')).resolves.toBeUndefined();
      expect(mockClient.DeleteProject).not.toHaveBeenCalled();
    });

    it('should handle ResourceNotFound error code', async () => {
      mockClient.DescribeProjects.mockRejectedValueOnce(createError('ResourceNotFound'));

      await expect(operations.deleteProject('missing-project')).resolves.toBeUndefined();
    });

    it('should tolerate a not-found response from DeleteProject', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [{ ProjectId: 'project-123', ProjectName: 'test-project' }],
      });
      mockClient.DeleteProject.mockRejectedValueOnce(createError('ProjectNotFound'));

      await expect(operations.deleteProject('test-project')).resolves.toBeUndefined();
    });
  });

  describe('createTopic', () => {
    it('should create topic successfully', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.CreateTopic.mockResolvedValueOnce({ TopicId: 'topic-123' });

      const result = await operations.createTopic({
        projectName: 'test-project',
        topicName: 'test-topic',
        description: 'Test topic',
        ttl: 30,
      });

      expect(result.topicId).toBe('topic-123');
      expect(result.topicName).toBe('test-topic');
      expect(mockClient.CreateTopic).toHaveBeenCalledWith({
        ProjectId: 'project-123',
        TopicName: 'test-topic',
        Description: 'Test topic',
        Ttl: 30,
        ShardCount: 1,
      });
    });

    it('should throw when the project does not exist', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({ Projects: [], Total: 0 });

      await expect(
        operations.createTopic({
          projectName: 'missing-project',
          topicName: 'test-topic',
        }),
      ).rejects.toThrow('TLS_PROJECT_NOT_FOUND');
    });

    it('should tolerate TopicAlreadyExists and adopt the existing topic', async () => {
      mockClient.DescribeProjects.mockResolvedValue({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.CreateTopic.mockRejectedValueOnce(createError('TopicAlreadyExists'));
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [
          {
            TopicId: 'topic-123',
            TopicName: 'test-topic',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 1,
      });

      const result = await operations.createTopic({
        projectName: 'test-project',
        topicName: 'test-topic',
        ttl: 30,
      });

      expect(result.topicId).toBe('topic-123');
    });

    it('should tolerate TopicAlreadyExists when the topic is already absent', async () => {
      mockClient.DescribeProjects.mockResolvedValue({
        Projects: [{ ProjectId: 'project-123', ProjectName: 'test-project' }],
      });
      mockClient.CreateTopic.mockRejectedValueOnce(createError('TopicAlreadyExists'));
      mockClient.DescribeTopics.mockResolvedValueOnce({ Topics: [] });

      const result = await operations.createTopic({
        projectName: 'test-project',
        topicName: 'test-topic',
      });

      expect(result.topicId).toBeUndefined();
      expect(result.status).toBe('Active');
    });
  });

  describe('getTopic', () => {
    it('should return topic info when found', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [
          {
            TopicId: 'topic-123',
            TopicName: 'test-topic',
            ProjectId: 'project-123',
            CreateTime: '2024-01-01T00:00:00Z',
            Description: 'Test topic',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 1,
      });

      const result = await operations.getTopic('test-project', 'test-topic');

      expect(result?.topicId).toBe('topic-123');
      expect(result?.topicName).toBe('test-topic');
    });

    it('should return null when topic not found', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({ Topics: [], Total: 0 });

      const result = await operations.getTopic('test-project', 'missing-topic');

      expect(result).toBeNull();
    });

    it('should return null for ResourceNotFound error code', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockRejectedValueOnce(createError('ResourceNotFound'));

      const result = await operations.getTopic('test-project', 'test-topic');

      expect(result).toBeNull();
    });

    it('should return null when the project is missing', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({ Projects: [] });

      await expect(operations.getTopic('missing-project', 'test-topic')).resolves.toBeNull();
      expect(mockClient.DescribeTopics).not.toHaveBeenCalled();
    });

    it('should return topic ownership tags when present', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [
          {
            TopicId: 'topic-123',
            TopicName: 'test-topic',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 1,
      });
      mockClient.ListTagsForResources.mockResolvedValueOnce({
        ResourceTags: [
          {
            ResourceType: 'topic',
            ResourceId: 'topic-123',
            TagKey: 'si-owned-by',
            TagValue: 'app-service:functions.test_fn',
          },
        ],
        NextToken: '',
      });

      const result = await operations.getTopic('test-project', 'test-topic');

      expect(result?.tags).toEqual([
        { Key: 'si-owned-by', Value: 'app-service:functions.test_fn' },
      ]);
      expect(mockClient.ListTagsForResources).toHaveBeenCalledWith({
        ResourceType: 'topic',
        ResourcesIds: ['topic-123'],
        MaxResults: 50,
      });
    });
  });

  describe('listTopics', () => {
    it('lists topics for a shared TLS project', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [
          {
            TopicId: 'topic-1',
            TopicName: 'fn-logs',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
          {
            TopicId: 'topic-2',
            TopicName: 'apigw-logs',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 2,
      });

      const result = await operations.listTopics('test-project');

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ topicId: 'topic-1', topicName: 'fn-logs' });
      expect(result[1]).toMatchObject({ topicId: 'topic-2', topicName: 'apigw-logs' });
      expect(mockClient.DescribeTopics).toHaveBeenCalledWith({ ProjectId: 'project-123' });
    });

    it('returns an empty array when the shared TLS project is missing', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({ Projects: [], Total: 0 });

      const result = await operations.listTopics('missing-project');

      expect(result).toEqual([]);
      expect(mockClient.DescribeTopics).not.toHaveBeenCalled();
    });

    it('returns an empty array when project listing fails with ResourceNotFound', async () => {
      mockClient.DescribeProjects.mockRejectedValueOnce(createError('ResourceNotFound'));

      const result = await operations.listTopics('missing-project');

      expect(result).toEqual([]);
    });
  });

  describe('deleteTopic', () => {
    it('should delete topic successfully', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [
          {
            TopicId: 'topic-123',
            TopicName: 'test-topic',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 1,
      });
      mockClient.DeleteTopic.mockResolvedValueOnce({});

      await operations.deleteTopic('test-project', 'test-topic');

      expect(mockClient.DeleteTopic).toHaveBeenCalledWith({ TopicId: 'topic-123' });
    });

    it('should handle topic not found gracefully', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({ Topics: [], Total: 0 });

      await expect(
        operations.deleteTopic('test-project', 'missing-topic'),
      ).resolves.toBeUndefined();
      expect(mockClient.DeleteTopic).not.toHaveBeenCalled();
    });

    it('should handle ResourceNotFound error code', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockRejectedValueOnce(createError('ResourceNotFound'));

      await expect(operations.deleteTopic('test-project', 'test-topic')).resolves.toBeUndefined();
    });

    it('should tolerate a not-found response from DeleteTopic', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [{ ProjectId: 'project-123', ProjectName: 'test-project' }],
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [{ TopicId: 'topic-123', TopicName: 'test-topic' }],
      });
      mockClient.DeleteTopic.mockRejectedValueOnce(createError('TopicNotFound'));

      await expect(operations.deleteTopic('test-project', 'test-topic')).resolves.toBeUndefined();
    });
  });

  describe('createIndex', () => {
    it('should create index successfully', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [
          {
            TopicId: 'topic-123',
            TopicName: 'test-topic',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 1,
      });
      mockClient.CreateIndex.mockResolvedValueOnce({ TopicId: 'topic-123' });

      await operations.createIndex({
        projectName: 'test-project',
        topicName: 'test-topic',
        fullTextIndex: { delimiter: ' ,.?;!\n\t', caseSensitive: false },
      });

      expect(mockClient.CreateIndex).toHaveBeenCalledWith(
        expect.objectContaining({
          TopicId: 'topic-123',
          FullText: { Delimiter: ' ,.?;!\n\t', CaseSensitive: false },
        }),
      );
    });

    it('should create index without fullTextIndex', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [
          {
            TopicId: 'topic-123',
            TopicName: 'test-topic',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 1,
      });
      mockClient.CreateIndex.mockResolvedValueOnce({ TopicId: 'topic-123' });

      await operations.createIndex({
        projectName: 'test-project',
        topicName: 'test-topic',
      });

      expect(mockClient.CreateIndex).toHaveBeenCalledWith(
        expect.objectContaining({ TopicId: 'topic-123', FullText: undefined }),
      );
    });

    it('should tolerate IndexAlreadyExists on createIndex', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [
          {
            TopicId: 'topic-123',
            TopicName: 'test-topic',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 1,
      });
      mockClient.CreateIndex.mockRejectedValueOnce(createError('IndexAlreadyExists'));

      await expect(
        operations.createIndex({
          projectName: 'test-project',
          topicName: 'test-topic',
        }),
      ).resolves.toBeUndefined();
    });

    it('should throw when the topic does not exist', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [{ ProjectId: 'project-123', ProjectName: 'test-project' }],
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({ Topics: [] });

      await expect(
        operations.createIndex({ projectName: 'test-project', topicName: 'missing-topic' }),
      ).rejects.toThrow('TLS_TOPIC_NOT_FOUND');
    });

    it('should rethrow unexpected createIndex errors', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [{ ProjectId: 'project-123', ProjectName: 'test-project' }],
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [{ TopicId: 'topic-123', TopicName: 'test-topic' }],
      });
      const error = createError('AccessDenied');
      mockClient.CreateIndex.mockRejectedValueOnce(error);

      await expect(
        operations.createIndex({ projectName: 'test-project', topicName: 'test-topic' }),
      ).rejects.toBe(error);
    });
  });

  describe('deleteIndex', () => {
    it('should delete index successfully', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [
          {
            TopicId: 'topic-123',
            TopicName: 'test-topic',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 1,
      });
      mockClient.DeleteIndex.mockResolvedValueOnce({});

      await operations.deleteIndex('test-project', 'test-topic');

      expect(mockClient.DeleteIndex).toHaveBeenCalledWith({ TopicId: 'topic-123' });
    });

    it('should handle index not found gracefully', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({ Topics: [], Total: 0 });

      await expect(
        operations.deleteIndex('test-project', 'missing-topic'),
      ).resolves.toBeUndefined();
      expect(mockClient.DeleteIndex).not.toHaveBeenCalled();
    });

    it('should tolerate a not-found response from DeleteIndex', async () => {
      mockClient.DescribeProjects.mockResolvedValueOnce({
        Projects: [{ ProjectId: 'project-123', ProjectName: 'test-project' }],
      });
      mockClient.DescribeTopics.mockResolvedValueOnce({
        Topics: [{ TopicId: 'topic-123', TopicName: 'test-topic' }],
      });
      mockClient.DeleteIndex.mockRejectedValueOnce(createError('IndexNotFound'));

      await expect(operations.deleteIndex('test-project', 'test-topic')).resolves.toBeUndefined();
    });
  });

  describe('waitForProject', () => {
    it('should return when project is active', async () => {
      mockClient.DescribeProjects.mockResolvedValue({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });

      await expect(operations.waitForProject('test-project')).resolves.toBeUndefined();
    });

    it('should throw when project is not found', async () => {
      mockClient.DescribeProjects.mockResolvedValue({ Projects: [], Total: 0 });

      await expect(operations.waitForProject('missing-project')).rejects.toThrow(
        'TLS_PROJECT_NOT_FOUND',
      );
    });

    it('should throw when project fails', async () => {
      jest.spyOn(operations, 'getProject').mockResolvedValueOnce({
        projectName: 'test-project',
        status: 'Failed',
      });

      await expect(operations.waitForProject('test-project')).rejects.toThrow('TLS_PROJECT_FAILED');
    });
  });

  describe('waitForTopic', () => {
    it('should return when topic is active', async () => {
      mockClient.DescribeProjects.mockResolvedValue({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValue({
        Topics: [
          {
            TopicId: 'topic-123',
            TopicName: 'test-topic',
            ProjectId: 'project-123',
            CreateTime: '',
            Description: '',
            ModifyTime: '',
            ShardCount: 1,
            Ttl: 30,
          },
        ],
        Total: 1,
      });

      await expect(operations.waitForTopic('test-project', 'test-topic')).resolves.toBeUndefined();
    });

    it('should throw when topic not found', async () => {
      mockClient.DescribeProjects.mockResolvedValue({
        Projects: [
          {
            ProjectId: 'project-123',
            ProjectName: 'test-project',
            CreateTime: '',
            Description: '',
            TopicCount: 0,
          },
        ],
        Total: 1,
      });
      mockClient.DescribeTopics.mockResolvedValue({ Topics: [], Total: 0 });

      await expect(operations.waitForTopic('test-project', 'missing-topic')).rejects.toThrow(
        'TLS_TOPIC_NOT_FOUND',
      );
    });
  });

  describe('addTags', () => {
    it('adds ownership tags to TLS project resources', async () => {
      mockClient.AddTagsToResource.mockResolvedValueOnce({});

      await operations.addTags({
        resourceType: 'project',
        resourcesList: ['p1'],
        tags: [{ key: 'si-owned-by', value: 'v' }],
      });

      expect(mockClient.AddTagsToResource).toHaveBeenCalledWith({
        ResourceType: 'project',
        ResourcesList: ['p1'],
        Tags: [{ Key: 'si-owned-by', Value: 'v' }],
      });
    });

    it('ignores missing TLS resources during tagging', async () => {
      mockClient.AddTagsToResource.mockRejectedValueOnce(createError('ResourceNotFound'));
      const { logger } = jest.requireMock('../../../../src/common/logger');

      await expect(
        operations.addTags({
          resourceType: 'topic',
          resourcesList: ['missing'],
          tags: [{ key: 'si-owned-by', value: 'v' }],
        }),
      ).resolves.toBeUndefined();

      expect(logger.warn).toHaveBeenCalledWith('TLS_TAG_TARGET_NOT_FOUND');
    });

    it('rethrows unexpected TLS tagging failures', async () => {
      const error = createError('InternalError');
      mockClient.AddTagsToResource.mockRejectedValueOnce(error);

      await expect(
        operations.addTags({
          resourceType: 'topic',
          resourcesList: ['t1'],
          tags: [{ key: 'si-owned-by', value: 'v' }],
        }),
      ).rejects.toBe(error);
    });
  });

  describe('removeTags', () => {
    it('removes ownership tags from TLS resources', async () => {
      mockClient.RemoveTagsFromResource.mockResolvedValueOnce({});

      await operations.removeTags({
        resourceType: 'topic',
        resourcesList: ['t1'],
        tagKeys: ['si-owned-by'],
      });

      expect(mockClient.RemoveTagsFromResource).toHaveBeenCalledWith({
        ResourceType: 'topic',
        ResourcesList: ['t1'],
        TagKeyList: ['si-owned-by'],
      });
    });

    it('ignores missing TLS resources during tag removal', async () => {
      mockClient.RemoveTagsFromResource.mockRejectedValueOnce(createError('TopicNotFound'));
      const { logger } = jest.requireMock('../../../../src/common/logger');

      await expect(
        operations.removeTags({
          resourceType: 'topic',
          resourcesList: ['missing'],
          tagKeys: ['si-owned-by'],
        }),
      ).resolves.toBeUndefined();

      expect(logger.warn).toHaveBeenCalledWith('TLS_TAG_TARGET_NOT_FOUND');
    });

    it('rethrows unexpected TLS tag removal failures', async () => {
      const error = createError('InternalError');
      mockClient.RemoveTagsFromResource.mockRejectedValueOnce(error);

      await expect(
        operations.removeTags({
          resourceType: 'topic',
          resourcesList: ['t1'],
          tagKeys: ['si-owned-by'],
        }),
      ).rejects.toBe(error);
    });
  });
});
