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
      mockClient.DescribeProjects.mockRejectedValueOnce(createError('ProjectNotFound'));

      await expect(operations.waitForProject('missing-project')).rejects.toThrow(
        'TLS_PROJECT_NOT_FOUND',
      );
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
});
