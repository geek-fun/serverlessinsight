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
});
