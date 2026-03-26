import { ProviderEnum } from '../../../../src/common';
import {
  createEsResource,
  readEsResource,
  updateEsResource,
  deleteEsResource,
} from '../../../../src/stack/scfStack/esServerlessResource';
import {
  Context,
  CURRENT_STATE_VERSION,
  StateFile,
  DatabaseDomain,
  DatabaseEnum,
  DatabaseVersionEnum,
} from '../../../../src/types';

const mockEsOperations = {
  createSpace: jest.fn(),
  getSpace: jest.fn(),
  updateSpace: jest.fn(),
  deleteSpace: jest.fn(),
};

const mockedStateManager = {
  setResource: jest.fn(),
  removeResource: jest.fn(),
};

const mockedLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

jest.mock('../../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    es: mockEsOperations,
    scf: {},
    cos: {},
    tdsqlc: {},
  }),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  ...jest.requireActual('../../../../src/common/stateManager'),
  setResource: (...args: unknown[]) => mockedStateManager.setResource(...args),
  removeResource: (...args: unknown[]) => mockedStateManager.removeResource(...args),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: {
    info: (...args: unknown[]) => mockedLogger.info(...args),
    error: (...args: unknown[]) => mockedLogger.error(...args),
    warn: (...args: unknown[]) => mockedLogger.warn(...args),
  },
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('EsServerlessResource', () => {
  const mockContext: Context = {
    stage: 'default',
    app: 'test-app',
    service: 'test-service',
    provider: ProviderEnum.TENCENT,
    region: 'ap-guangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
    iacLocation: 'test.yml',
    parameters: [],
    stages: {},
  };

  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'tencent',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const createTestDatabase = (key: string = 'test_es'): DatabaseDomain => ({
    key,
    name: 'test-es-space',
    type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
    version: DatabaseVersionEnum['ES_SEARCH_7.10'],
    security: {
      basicAuth: {
        password: 'test-password',
      },
    },
    network: {
      type: 'PUBLIC',
      ingressRules: [],
    },
    cu: {
      min: 1,
      max: 2,
    },
    storage: {
      min: 100,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteEsResource', () => {
    it('should delete ES space and remove from state', async () => {
      const spaceId = 'es-space-test123';
      const logicalId = 'databases.test_es';
      const stateWithEs: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      mockEsOperations.deleteSpace.mockResolvedValue(undefined);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteEsResource(mockContext, spaceId, logicalId, stateWithEs);

      expect(mockEsOperations.deleteSpace).toHaveBeenCalledWith(spaceId);
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithEs, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should handle ResourceNotFound gracefully and remove state', async () => {
      const spaceId = 'es-space-test123';
      const logicalId = 'databases.test_es';
      const stateWithEs: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const notFoundError = Object.assign(new Error('not found'), {
        code: 'ResourceNotFound',
      });
      mockEsOperations.deleteSpace.mockRejectedValue(notFoundError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteEsResource(mockContext, spaceId, logicalId, stateWithEs);

      expect(mockEsOperations.deleteSpace).toHaveBeenCalledWith(spaceId);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('RESOURCE_NOT_FOUND_PROVIDER'),
      );
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithEs, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should handle InvalidParameterValue gracefully and remove state', async () => {
      const spaceId = 'es-space-test123';
      const logicalId = 'databases.test_es';
      const stateWithEs: StateFile = {
        ...initialState,
        resources: {
          [logicalId]: {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      const invalidParamError = Object.assign(new Error('invalid param'), {
        code: 'InvalidParameterValue',
      });
      mockEsOperations.deleteSpace.mockRejectedValue(invalidParamError);
      mockedStateManager.removeResource.mockReturnValue(initialState);

      const result = await deleteEsResource(mockContext, spaceId, logicalId, stateWithEs);

      expect(mockEsOperations.deleteSpace).toHaveBeenCalledWith(spaceId);
      expect(mockedLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('RESOURCE_NOT_FOUND_PROVIDER'),
      );
      expect(mockedStateManager.removeResource).toHaveBeenCalledWith(stateWithEs, logicalId);
      expect(result).toEqual(initialState);
    });

    it('should rethrow unexpected errors from deleteSpace', async () => {
      const spaceId = 'es-space-test123';
      const logicalId = 'databases.test_es';
      const error = new Error('Delete failed');

      mockEsOperations.deleteSpace.mockRejectedValue(error);

      await expect(deleteEsResource(mockContext, spaceId, logicalId, initialState)).rejects.toThrow(
        'Delete failed',
      );
    });
  });

  describe('createEsResource', () => {
    it('should create ES space and set resource in state', async () => {
      const database = createTestDatabase('test_es');
      const spaceId = 'es-space-test123';
      const spaceInfo = {
        SpaceId: spaceId,
        SpaceName: 'test-es-space',
        Status: 1,
        CreateTime: '2024-01-01T00:00:00Z',
        IndexCount: 0,
        KibanaUrl: 'https://kibana.example.com',
        KibanaPrivateUrl: 'https://kibana.internal.example.com',
      };

      const expectedState = {
        ...initialState,
        resources: {
          'databases.test_es': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: expect.any(String),
          },
        },
      };

      mockEsOperations.createSpace.mockResolvedValue(spaceId);
      mockEsOperations.getSpace.mockResolvedValue(spaceInfo);
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await createEsResource(mockContext, database, initialState);

      expect(mockEsOperations.createSpace).toHaveBeenCalledWith(
        expect.objectContaining({
          SpaceName: 'test-es-space',
        }),
      );
      expect(mockEsOperations.getSpace).toHaveBeenCalledWith(spaceId);
      expect(mockedStateManager.setResource).toHaveBeenCalledWith(
        initialState,
        'databases.test_es',
        expect.objectContaining({
          mode: 'managed',
          region: 'ap-guangzhou',
        }),
      );
      expect(result).toEqual(expectedState);
    });

    it('should throw error when getSpace returns null after create', async () => {
      const database = createTestDatabase('test_es');
      const spaceId = 'es-space-test123';

      mockEsOperations.createSpace.mockResolvedValue(spaceId);
      mockEsOperations.getSpace.mockResolvedValue(null);

      await expect(createEsResource(mockContext, database, initialState)).rejects.toThrow(
        'Failed to refresh state for ES space: es-space-test123',
      );
    });

    it('should create ES space with VPC configuration', async () => {
      const database: DatabaseDomain = {
        ...createTestDatabase('test_es'),
        network: {
          type: 'PRIVATE',
          ingressRules: [],
          vpcId: 'vpc-123',
          subnetId: 'subnet-456',
        },
      };
      const spaceId = 'es-space-test123';
      const spaceInfo = {
        SpaceId: spaceId,
        SpaceName: 'test-es-space',
        Status: 1,
      };

      mockEsOperations.createSpace.mockResolvedValue(spaceId);
      mockEsOperations.getSpace.mockResolvedValue(spaceInfo);
      mockedStateManager.setResource.mockReturnValue(initialState);

      await createEsResource(mockContext, database, initialState);

      expect(mockEsOperations.createSpace).toHaveBeenCalledWith(
        expect.objectContaining({
          SpaceName: 'test-es-space',
          VpcInfo: [{ VpcId: 'vpc-123', SubnetId: 'subnet-456' }],
        }),
      );
    });
  });

  describe('readEsResource', () => {
    it('should call getSpace and return result', async () => {
      const spaceId = 'es-space-test123';
      const spaceInfo = {
        SpaceId: spaceId,
        SpaceName: 'test-es-space',
        Status: 1,
        CreateTime: '2024-01-01T00:00:00Z',
      };

      mockEsOperations.getSpace.mockResolvedValue(spaceInfo);

      const result = await readEsResource(mockContext, spaceId);

      expect(mockEsOperations.getSpace).toHaveBeenCalledWith(spaceId);
      expect(result).toEqual(spaceInfo);
    });
  });

  describe('updateEsResource', () => {
    it('should update ES space and refresh state', async () => {
      const database = createTestDatabase('test_es');
      const spaceId = 'es-space-test123';
      const spaceInfo = {
        SpaceId: spaceId,
        SpaceName: 'test-es-space',
        Status: 1,
        CreateTime: '2024-01-01T00:00:00Z',
        IndexCount: 5,
        KibanaUrl: 'https://kibana.example.com',
        KibanaPrivateUrl: 'https://kibana.internal.example.com',
      };

      const expectedState = {
        ...initialState,
        resources: {
          'databases.test_es': {
            mode: 'managed',
            region: 'ap-guangzhou',
            definition: {},
            instances: [],
            lastUpdated: expect.any(String),
          },
        },
      };

      mockEsOperations.updateSpace.mockResolvedValue(undefined);
      mockEsOperations.getSpace.mockResolvedValue(spaceInfo);
      mockedStateManager.setResource.mockReturnValue(expectedState);

      const result = await updateEsResource(mockContext, database, spaceId, initialState);

      expect(mockEsOperations.updateSpace).toHaveBeenCalledWith(
        spaceId,
        expect.objectContaining({
          SpaceName: 'test-es-space',
        }),
      );
      expect(mockEsOperations.getSpace).toHaveBeenCalledWith(spaceId);
      expect(mockedStateManager.setResource).toHaveBeenCalledWith(
        initialState,
        'databases.test_es',
        expect.objectContaining({
          mode: 'managed',
          region: 'ap-guangzhou',
        }),
      );
      expect(result).toEqual(expectedState);
    });

    it('should throw error when getSpace returns null after update', async () => {
      const database = createTestDatabase('test_es');
      const spaceId = 'es-space-test123';

      mockEsOperations.updateSpace.mockResolvedValue(undefined);
      mockEsOperations.getSpace.mockResolvedValue(null);

      await expect(updateEsResource(mockContext, database, spaceId, initialState)).rejects.toThrow(
        'Failed to refresh state for ES space: es-space-test123',
      );
    });
  });
});
