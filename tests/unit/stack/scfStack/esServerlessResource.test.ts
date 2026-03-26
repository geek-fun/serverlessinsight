import { ProviderEnum } from '../../../../src/common';
import { deleteEsResource } from '../../../../src/stack/scfStack/esServerlessResource';
import { Context, CURRENT_STATE_VERSION, StateFile } from '../../../../src/types';

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
        expect.stringContaining('ES space es-space-test123 not found in provider'),
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
        expect.stringContaining('ES space es-space-test123 not found in provider'),
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
});
