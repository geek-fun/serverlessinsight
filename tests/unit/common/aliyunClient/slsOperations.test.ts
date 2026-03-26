import { createSlsOperations } from '../../../../src/common/aliyunClient/slsOperations';

const mockCreateProject = jest.fn();
const mockGetProject = jest.fn();
const mockDeleteProject = jest.fn();
const mockCreateLogStore = jest.fn();
const mockGetLogStore = jest.fn();
const mockDeleteLogStore = jest.fn();
const mockCreateIndex = jest.fn();
const mockGetIndex = jest.fn();
const mockDeleteIndex = jest.fn();

const mockSlsClient = {
  createProject: mockCreateProject,
  getProject: mockGetProject,
  deleteProject: mockDeleteProject,
  createLogStore: mockCreateLogStore,
  getLogStore: mockGetLogStore,
  deleteLogStore: mockDeleteLogStore,
  createIndex: mockCreateIndex,
  getIndex: mockGetIndex,
  deleteIndex: mockDeleteIndex,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

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
    __: (key: string, params?: Record<string, string>) => {
      if (params) return `${key}:${JSON.stringify(params)}`;
      return key;
    },
  },
}));

describe('slsOperations', () => {
  let operations: ReturnType<typeof createSlsOperations>;

  beforeEach(() => {
    jest.clearAllMocks();
    operations = createSlsOperations(mockSlsClient);
  });

  describe('getProject', () => {
    it('should get project info', async () => {
      mockGetProject.mockResolvedValue({
        body: {
          name: 'test-project',
          status: 'Normal',
          description: 'Test project',
        },
      });

      const result = await operations.getProject('test-project');

      expect(result).toBeDefined();
      expect(result?.projectName).toBe('test-project');
      expect(result?.status).toBe('Normal');
    });

    it('should return null when project not found', async () => {
      const error = new Error('ProjectNotExist');
      Object.assign(error, { code: 'ProjectNotExist' });
      mockGetProject.mockRejectedValue(error);

      const result = await operations.getProject('non-existent');

      expect(result).toBeNull();
    });

    it('should throw on unexpected errors', async () => {
      mockGetProject.mockRejectedValue(new Error('AccessDenied'));

      await expect(operations.getProject('test-project')).rejects.toThrow('AccessDenied');
    });

    it('should return null when response body is empty', async () => {
      mockGetProject.mockResolvedValue({});

      const result = await operations.getProject('test-project');

      expect(result).toBeNull();
    });
  });

  describe('deleteProject', () => {
    it('should call deleteProject SDK method', async () => {
      mockDeleteProject.mockResolvedValue({});

      await operations.deleteProject('test-project');

      expect(mockDeleteProject).toHaveBeenCalledWith('test-project', expect.anything());
    });
  });

  describe('getLogstore', () => {
    it('should get logstore info', async () => {
      mockGetLogStore.mockResolvedValue({
        body: {
          logstoreName: 'test-logstore',
          ttl: 30,
        },
      });

      const result = await operations.getLogstore('test-project', 'test-logstore');

      expect(result).toBeDefined();
      expect(result?.logstoreName).toBe('test-logstore');
    });

    it('should return null when logstore not found', async () => {
      const error = new Error('LogStoreNotExist');
      Object.assign(error, { code: 'LogStoreNotExist' });
      mockGetLogStore.mockRejectedValue(error);

      const result = await operations.getLogstore('test-project', 'non-existent');

      expect(result).toBeNull();
    });
  });

  describe('deleteLogstore', () => {
    it('should call deleteLogStore SDK method', async () => {
      mockDeleteLogStore.mockResolvedValue({});

      await operations.deleteLogstore('test-project', 'test-logstore');

      expect(mockDeleteLogStore).toHaveBeenCalledWith('test-project', 'test-logstore');
    });
  });

  describe('getIndex', () => {
    it('should get index info', async () => {
      mockGetIndex.mockResolvedValue({
        body: {
          indexMode: 'v2',
        },
      });

      const result = await operations.getIndex('test-project', 'test-logstore');

      expect(result).toBeDefined();
      expect(result?.projectName).toBe('test-project');
    });

    it('should return null when index not found', async () => {
      const error = new Error('IndexConfigNotExist');
      Object.assign(error, { code: 'IndexConfigNotExist' });
      mockGetIndex.mockRejectedValue(error);

      const result = await operations.getIndex('test-project', 'test-logstore');

      expect(result).toBeNull();
    });
  });

  describe('deleteIndex', () => {
    it('should call deleteIndex SDK method', async () => {
      mockDeleteIndex.mockResolvedValue({});

      await operations.deleteIndex('test-project', 'test-logstore');

      expect(mockDeleteIndex).toHaveBeenCalledWith('test-project', 'test-logstore');
    });
  });

  describe('createProject', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should create project with custom description', async () => {
      mockCreateProject.mockResolvedValue({});
      mockGetProject.mockResolvedValue({
        body: {
          name: 'test-project',
          status: 'Normal',
          description: 'Custom description',
        },
      });

      const promise = operations.createProject('test-project', 'Custom description');
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(mockCreateProject).toHaveBeenCalled();
      expect(result.projectName).toBe('test-project');
      expect(result.status).toBe('Normal');
    });

    it('should create project with default description', async () => {
      mockCreateProject.mockResolvedValue({});
      mockGetProject.mockResolvedValue({
        body: {
          name: 'auto-project',
          status: 'Normal',
        },
      });

      const promise = operations.createProject('auto-project');
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(mockCreateProject).toHaveBeenCalledWith(
        expect.objectContaining({
          projectName: 'auto-project',
          description: expect.stringContaining('ServerlessInsight'),
        }),
      );
      expect(result.projectName).toBe('auto-project');
    });

    it('should retry when project status is not Normal', async () => {
      mockCreateProject.mockResolvedValue({});
      mockGetProject
        .mockResolvedValueOnce({
          body: { name: 'test-project', status: 'Creating' },
        })
        .mockResolvedValueOnce({
          body: { name: 'test-project', status: 'Creating' },
        })
        .mockResolvedValueOnce({
          body: { name: 'test-project', status: 'Normal' },
        });

      const promise = operations.createProject('test-project');
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(mockGetProject).toHaveBeenCalledTimes(3);
      expect(result.status).toBe('Normal');
    });

    it('should retry when getProject throws error', async () => {
      mockCreateProject.mockResolvedValue({});
      mockGetProject
        .mockRejectedValueOnce(new Error('Not ready'))
        .mockRejectedValueOnce(new Error('Not ready'))
        .mockResolvedValueOnce({
          body: { name: 'test-project', status: 'Normal' },
        });

      const promise = operations.createProject('test-project');
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(mockGetProject).toHaveBeenCalledTimes(3);
      expect(result.projectName).toBe('test-project');
    });

    it('should timeout after 30 retries and return partial info', async () => {
      mockCreateProject.mockResolvedValue({});
      mockGetProject.mockRejectedValue(new Error('Still not ready'));

      const promise = operations.createProject('slow-project');
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(mockGetProject).toHaveBeenCalledTimes(30);
      expect(result).toEqual({ projectName: 'slow-project' });
    });
  });

  describe('createLogstore', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should create logstore with custom ttl', async () => {
      mockCreateLogStore.mockResolvedValue({});
      mockGetLogStore.mockResolvedValue({
        body: {
          logstoreName: 'test-logstore',
          ttl: 30,
          shardCount: 2,
        },
      });

      const promise = operations.createLogstore('test-project', 'test-logstore', 30);
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(mockCreateLogStore).toHaveBeenCalledWith(
        'test-project',
        expect.objectContaining({
          logstoreName: 'test-logstore',
          ttl: 30,
          shardCount: 2,
        }),
      );
      expect(result.logstoreName).toBe('test-logstore');
      expect(result.ttl).toBe(30);
    });

    it('should create logstore with default ttl of 7', async () => {
      mockCreateLogStore.mockResolvedValue({});
      mockGetLogStore.mockResolvedValue({
        body: {
          logstoreName: 'default-logstore',
          ttl: 7,
        },
      });

      const promise = operations.createLogstore('test-project', 'default-logstore');
      await jest.runAllTimersAsync();
      const _result = await promise;

      expect(mockCreateLogStore).toHaveBeenCalledWith(
        'test-project',
        expect.objectContaining({
          ttl: 7,
        }),
      );
    });

    it('should retry when logstore is not ready', async () => {
      mockCreateLogStore.mockResolvedValue({});
      mockGetLogStore
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({
          body: {
            logstoreName: 'test-logstore',
            ttl: 7,
          },
        });

      const promise = operations.createLogstore('test-project', 'test-logstore');
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(mockGetLogStore).toHaveBeenCalledTimes(3);
      expect(result.logstoreName).toBe('test-logstore');
    });

    it('should retry when getLogStore throws error', async () => {
      mockCreateLogStore.mockResolvedValue({});
      mockGetLogStore.mockRejectedValueOnce(new Error('Not ready')).mockResolvedValueOnce({
        body: {
          logstoreName: 'test-logstore',
          ttl: 7,
        },
      });

      const promise = operations.createLogstore('test-project', 'test-logstore');
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(result.logstoreName).toBe('test-logstore');
    });

    it('should timeout after 30 retries and return partial info', async () => {
      mockCreateLogStore.mockResolvedValue({});
      mockGetLogStore.mockRejectedValue(new Error('Still not ready'));

      const promise = operations.createLogstore('test-project', 'slow-logstore', 15);
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(mockGetLogStore).toHaveBeenCalledTimes(30);
      expect(result).toEqual({
        logstoreName: 'slow-logstore',
        projectName: 'test-project',
        ttl: 15,
      });
    });
  });

  describe('createIndex', () => {
    it('should create index with default token configuration', async () => {
      mockCreateIndex.mockResolvedValue({});

      const result = await operations.createIndex('test-project', 'test-logstore');

      expect(mockCreateIndex).toHaveBeenCalledWith(
        'test-project',
        'test-logstore',
        expect.objectContaining({
          body: expect.any(Object),
        }),
      );
      expect(result).toEqual({
        projectName: 'test-project',
        logstoreName: 'test-logstore',
      });
    });

    it('should handle createIndex SDK call', async () => {
      mockCreateIndex.mockResolvedValue({});

      await operations.createIndex('prod-project', 'app-logstore');

      expect(mockCreateIndex).toHaveBeenCalledWith(
        'prod-project',
        'app-logstore',
        expect.any(Object),
      );
    });
  });

  describe('waitForProject', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should wait for project to be ready', async () => {
      mockGetProject
        .mockResolvedValueOnce({
          body: { name: 'test-project', status: 'Creating' },
        })
        .mockResolvedValueOnce({
          body: { name: 'test-project', status: 'Normal' },
        });

      const promise = operations.waitForProject('test-project');
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(result.status).toBe('Normal');
    });
  });

  describe('waitForLogstore', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should wait for logstore to be ready with custom ttl', async () => {
      mockGetLogStore.mockResolvedValueOnce(null).mockResolvedValueOnce({
        body: {
          logstoreName: 'test-logstore',
          ttl: 30,
        },
      });

      const promise = operations.waitForLogstore('test-project', 'test-logstore', 30);
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(result.logstoreName).toBe('test-logstore');
      expect(result.ttl).toBe(30);
    });

    it('should wait for logstore with default ttl of 7', async () => {
      mockGetLogStore.mockResolvedValue({
        body: {
          logstoreName: 'test-logstore',
          ttl: 7,
        },
      });

      const promise = operations.waitForLogstore('test-project', 'test-logstore');
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(result.ttl).toBe(7);
    });
  });
});
