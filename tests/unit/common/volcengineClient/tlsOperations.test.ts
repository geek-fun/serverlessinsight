import { createTlsOperations } from '../../../../src/common/volcengineClient/tlsOperations';

type MockFetchOpenAPI = jest.Mock;

const createMockClient = () => ({
  fetchOpenAPI: jest.fn() as MockFetchOpenAPI,
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
      mockClient.fetchOpenAPI.mockResolvedValueOnce({
        Result: {
          ProjectId: 'project-123',
          ProjectName: 'test-project',
          Status: 'Active',
        },
      });

      const result = await operations.createProject({
        projectName: 'test-project',
        description: 'Test project',
        region: 'cn-beijing',
      });

      expect(result.projectName).toBe('test-project');
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'CreateProject',
        }),
      );
    });

    it('should tolerate ProjectAlreadyExists and adopt the existing project', async () => {
      const alreadyExistsError = new Error('Already exists') as Error & { code: string };
      alreadyExistsError.code = 'ProjectAlreadyExists';

      mockClient.fetchOpenAPI
        .mockRejectedValueOnce(alreadyExistsError) // CreateProject collides
        .mockResolvedValueOnce({
          Result: {
            ProjectId: 'existing-project-id',
            ProjectName: 'test-project',
            Status: 'Active',
          },
        }); // GetProject adoption

      const result = await operations.createProject({
        projectName: 'test-project',
        description: 'Test project',
        region: 'cn-beijing',
      });

      expect(result.projectName).toBe('test-project');
      expect(result.projectId).toBe('existing-project-id');
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(2);
    });

    it('should tolerate ResourceAlreadyExists on createProject', async () => {
      const alreadyExistsError = new Error('Already exists') as Error & { code: string };
      alreadyExistsError.code = 'ResourceAlreadyExists';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(alreadyExistsError).mockResolvedValueOnce({
        Result: {
          ProjectId: 'existing-project-id',
          ProjectName: 'test-project',
          Status: 'Active',
        },
      });

      const result = await operations.createProject({
        projectName: 'test-project',
        description: 'Test project',
        region: 'cn-beijing',
      });

      expect(result.projectId).toBe('existing-project-id');
    });
  });

  describe('getProject', () => {
    it('should return project info when found', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({
        Result: {
          ProjectId: 'project-123',
          ProjectName: 'test-project',
          Description: 'Test project',
          Region: 'cn-beijing',
          Status: 'Active',
        },
      });

      const result = await operations.getProject('test-project');

      expect(result?.projectName).toBe('test-project');
    });

    it('should return null when project not found', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'ProjectNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      const result = await operations.getProject('non-existent-project');

      expect(result).toBeNull();
    });

    it('should return null for ResourceNotFound error code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'ResourceNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      const result = await operations.getProject('non-existent-project');

      expect(result).toBeNull();
    });
  });

  describe('deleteProject', () => {
    it('should delete project successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.deleteProject('test-project');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'DeleteProject',
        }),
      );
    });

    it('should handle project not found gracefully', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'ProjectNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      await operations.deleteProject('non-existent-project');
    });

    it('should handle ResourceNotFound error code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'ResourceNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      await operations.deleteProject('non-existent-project');
    });
  });

  describe('createTopic', () => {
    it('should create topic successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({
        Result: {
          TopicId: 'topic-123',
          TopicName: 'test-topic',
          ProjectName: 'test-project',
        },
      });

      const result = await operations.createTopic({
        projectName: 'test-project',
        topicName: 'test-topic',
        description: 'Test topic',
        ttl: 30,
      });

      expect(result.topicName).toBe('test-topic');
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'CreateTopic',
        }),
      );
    });

    it('should tolerate TopicAlreadyExists and adopt the existing topic', async () => {
      const alreadyExistsError = new Error('Already exists') as Error & { code: string };
      alreadyExistsError.code = 'TopicAlreadyExists';

      mockClient.fetchOpenAPI
        .mockRejectedValueOnce(alreadyExistsError) // CreateTopic collides
        .mockResolvedValueOnce({
          Result: {
            TopicId: 'existing-topic-id',
            TopicName: 'test-topic',
            ProjectName: 'test-project',
            Status: 'Active',
          },
        }); // GetTopic adoption

      const result = await operations.createTopic({
        projectName: 'test-project',
        topicName: 'test-topic',
        description: 'Test topic',
        ttl: 30,
      });

      expect(result.topicName).toBe('test-topic');
      expect(result.topicId).toBe('existing-topic-id');
      expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(2);
    });
  });

  describe('getTopic', () => {
    it('should return topic info when found', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({
        Result: {
          TopicId: 'topic-123',
          TopicName: 'test-topic',
          ProjectName: 'test-project',
          TTL: 30,
          Status: 'Active',
        },
      });

      const result = await operations.getTopic('test-project', 'test-topic');

      expect(result?.topicName).toBe('test-topic');
    });

    it('should return null when topic not found', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'TopicNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      const result = await operations.getTopic('test-project', 'non-existent-topic');

      expect(result).toBeNull();
    });

    it('should return null for ResourceNotFound error code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'ResourceNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      const result = await operations.getTopic('test-project', 'non-existent-topic');

      expect(result).toBeNull();
    });
  });

  describe('deleteTopic', () => {
    it('should delete topic successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.deleteTopic('test-project', 'test-topic');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'DeleteTopic',
        }),
      );
    });

    it('should handle topic not found gracefully', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'TopicNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      await operations.deleteTopic('test-project', 'non-existent-topic');
    });

    it('should handle ResourceNotFound error code', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'ResourceNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      await operations.deleteTopic('test-project', 'non-existent-topic');
    });
  });

  describe('createIndex', () => {
    it('should create index successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.createIndex({
        projectName: 'test-project',
        topicName: 'test-topic',
        fullTextIndex: {
          delimiter: ' ,.?',
          caseSensitive: false,
        },
      });

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'CreateIndex',
        }),
      );
    });

    it('should create index without fullTextIndex', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.createIndex({
        projectName: 'test-project',
        topicName: 'test-topic',
      });

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'CreateIndex',
        }),
      );
    });

    it('should tolerate IndexAlreadyExists on createIndex', async () => {
      const alreadyExistsError = new Error('Already exists') as Error & { code: string };
      alreadyExistsError.code = 'IndexAlreadyExists';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(alreadyExistsError);

      await expect(
        operations.createIndex({
          projectName: 'test-project',
          topicName: 'test-topic',
          fullTextIndex: {
            delimiter: ' ,.?',
            caseSensitive: false,
          },
        }),
      ).resolves.toBeUndefined();
    });
  });

  describe('deleteIndex', () => {
    it('should delete index successfully', async () => {
      mockClient.fetchOpenAPI.mockResolvedValueOnce({});

      await operations.deleteIndex('test-project', 'test-topic');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledWith(
        expect.objectContaining({
          Action: 'DeleteIndex',
        }),
      );
    });

    it('should handle index not found gracefully', async () => {
      const notFoundError = new Error('Not found') as Error & { code: string };
      notFoundError.code = 'IndexNotFound';

      mockClient.fetchOpenAPI.mockRejectedValueOnce(notFoundError);

      await operations.deleteIndex('test-project', 'test-topic');
    });
  });

  describe('waitForProject', () => {
    it('should return when project is active', async () => {
      mockClient.fetchOpenAPI.mockResolvedValue({
        Result: {
          ProjectName: 'test-project',
          Status: 'Active',
        },
      });

      await operations.waitForProject('test-project');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalled();
    });

    it('should wait until project is active', async () => {
      mockClient.fetchOpenAPI
        .mockResolvedValueOnce({
          Result: {
            ProjectName: 'test-project',
            Status: 'Creating',
          },
        })
        .mockResolvedValueOnce({
          Result: {
            ProjectName: 'test-project',
            Status: 'Active',
          },
        });

      await operations.waitForProject('test-project');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalledTimes(2);
    });

    it('should throw when project fails', async () => {
      mockClient.fetchOpenAPI.mockResolvedValue({
        Result: {
          ProjectName: 'test-project',
          Status: 'Failed',
        },
      });

      await expect(operations.waitForProject('test-project')).rejects.toThrow();
    });

    it('should throw when project has error status', async () => {
      mockClient.fetchOpenAPI.mockResolvedValue({
        Result: {
          ProjectName: 'test-project',
          Status: 'Error',
        },
      });

      await expect(operations.waitForProject('test-project')).rejects.toThrow();
    });
  });

  describe('waitForTopic', () => {
    it('should return when topic is active', async () => {
      mockClient.fetchOpenAPI.mockResolvedValue({
        Result: {
          TopicName: 'test-topic',
          Status: 'Active',
        },
      });

      await operations.waitForTopic('test-project', 'test-topic');

      expect(mockClient.fetchOpenAPI).toHaveBeenCalled();
    });

    it('should throw when topic fails', async () => {
      mockClient.fetchOpenAPI.mockResolvedValue({
        Result: {
          TopicName: 'test-topic',
          Status: 'Failed',
        },
      });

      await expect(operations.waitForTopic('test-project', 'test-topic')).rejects.toThrow();
    });

    it('should throw when topic has error status', async () => {
      mockClient.fetchOpenAPI.mockResolvedValue({
        Result: {
          TopicName: 'test-topic',
          Status: 'Error',
        },
      });

      await expect(operations.waitForTopic('test-project', 'test-topic')).rejects.toThrow();
    });
  });
});
