import { generateEsPlan } from '../../../../src/stack/scfStack/esServerlessPlanner';
import * as esTypes from '../../../../src/stack/scfStack/esServerlessTypes';
import * as stateManager from '../../../../src/common/stateManager';
import * as hashUtils from '../../../../src/common/hashUtils';
import { ProviderEnum } from '../../../../src/common';
import {
  Context,
  StateFile,
  CURRENT_STATE_VERSION,
  DatabaseDomain,
  DatabaseEnum,
  DatabaseVersionEnum,
  ResourceMode,
} from '../../../../src/types';

const mockEsOperations = {
  getSpace: jest.fn(),
  createSpace: jest.fn(),
  updateSpace: jest.fn(),
  deleteSpace: jest.fn(),
};

jest.mock('../../../../src/stack/scfStack/esServerlessTypes');
jest.mock('../../../../src/common/stateManager');
jest.mock('../../../../src/common/hashUtils');

jest.mock('../../../../src/common/tencentClient', () => ({
  createTencentClient: () => ({
    es: mockEsOperations,
  }),
}));

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('esServerlessPlanner', () => {
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

  const testDatabase: DatabaseDomain = {
    key: 'test_db',
    name: 'test-db',
    type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
    version: DatabaseVersionEnum['ES_SEARCH_7.10'],
    security: { basicAuth: { password: 'test-password' } },
    network: { type: 'PRIVATE', ingressRules: [], vpcId: 'vpc-123', subnetId: 'subnet-123' },
    cu: { min: 2, max: 2 },
    storage: { min: 20 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (esTypes.databaseToTencentEsConfig as jest.Mock).mockReturnValue({
      SpaceName: 'test-db',
    });
    (esTypes.extractTencentEsDefinition as jest.Mock).mockReturnValue({
      name: 'test-db',
    });
    (hashUtils.attributesEqual as jest.Mock).mockReturnValue(true);
  });

  describe('generateEsPlan', () => {
    it('should return empty plan when no databases and no state', async () => {
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});

      const plan = await generateEsPlan(mockContext, initialState, undefined);

      expect(plan.items).toEqual([]);
    });

    it('should return empty plan when no ES databases in undefined list', async () => {
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});

      const otherDatabases = [
        {
          ...testDatabase,
          key: 'tdsql_db',
          type: DatabaseEnum.TDSQL_C_SERVERLESS,
        },
      ];

      const plan = await generateEsPlan(mockContext, initialState, otherDatabases);

      expect(plan.items).toEqual([]);
    });

    it('should plan deletion of ES databases not in desired state', async () => {
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          'databases.old_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'old-db' },
            instances: [{ sid: 'si:tencent:es', id: 'space-123' }],
            lastUpdated: new Date().toISOString(),
            metadata: { resourceType: 'TENCENT_ES_SERVERLESS' },
          },
        },
      };

      (stateManager.getAllResources as jest.Mock).mockReturnValue({
        'databases.old_db': {
          definition: { name: 'old-db' },
          metadata: { resourceType: 'TENCENT_ES_SERVERLESS' },
        },
      });

      const plan = await generateEsPlan(mockContext, stateWithDb, [testDatabase]);

      expect(plan.items.length).toBeGreaterThanOrEqual(1);
      expect(plan.items.find((i) => i.action === 'delete')).toBeDefined();
    });

    it('should plan creation when ES database does not exist in state', async () => {
      (stateManager.getResource as jest.Mock).mockReturnValue(null);
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});

      const plan = await generateEsPlan(mockContext, initialState, [testDatabase]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('create');
      expect(plan.items[0].logicalId).toBe('databases.test_db');
      expect(plan.items[0].resourceType).toBe('TENCENT_ES_SERVERLESS');
    });

    it('should plan creation when ES database exists in state but not in cloud', async () => {
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          'databases.test_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'test-db' },
            instances: [{ sid: 'si:tencent:es', id: 'space-123' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        instances: [{ sid: 'si:tencent:es', id: 'space-123' }],
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockEsOperations.getSpace as jest.Mock).mockResolvedValue(null);

      const plan = await generateEsPlan(mockContext, stateWithDb, [testDatabase]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('create');
      expect(plan.items[0].drifted).toBe(true);
    });

    it('should plan update when ES definition has changed', async () => {
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          'databases.test_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'test-db', version: '7.10' },
            instances: [{ sid: 'si:tencent:es', id: 'space-123' }],
            lastUpdated: new Date().toISOString(),
            metadata: { spaceId: 'space-123' },
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db', version: '7.10' },
        metadata: { spaceId: 'space-123' },
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockEsOperations.getSpace as jest.Mock).mockResolvedValue({
        SpaceName: 'test-db',
      });
      (hashUtils.attributesEqual as jest.Mock).mockReturnValue(false);

      const plan = await generateEsPlan(mockContext, stateWithDb, [testDatabase]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('update');
      expect(plan.items[0].drifted).toBe(true);
    });

    it('should plan noop when ES database exists and definition unchanged', async () => {
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          'databases.test_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'test-db' },
            instances: [{ sid: 'si:tencent:es', id: 'space-123' }],
            lastUpdated: new Date().toISOString(),
            metadata: { spaceId: 'space-123' },
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        metadata: { spaceId: 'space-123' },
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockEsOperations.getSpace as jest.Mock).mockResolvedValue({
        SpaceName: 'test-db',
      });
      (hashUtils.attributesEqual as jest.Mock).mockReturnValue(true);

      const plan = await generateEsPlan(mockContext, stateWithDb, [testDatabase]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('noop');
    });

    it('should handle error when getting ES space from cloud', async () => {
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          'databases.test_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'test-db' },
            instances: [{ sid: 'si:tencent:es', id: 'space-123' }],
            lastUpdated: new Date().toISOString(),
            metadata: { spaceId: 'space-123' },
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        metadata: { spaceId: 'space-123' },
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockEsOperations.getSpace as jest.Mock).mockRejectedValue(new Error('Network error'));

      const plan = await generateEsPlan(mockContext, stateWithDb, [testDatabase]);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('create');
    });

    it('should get spaceId from metadata', async () => {
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          'databases.test_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'test-db' },
            instances: [],
            lastUpdated: new Date().toISOString(),
            metadata: { spaceId: 'space-123' },
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        metadata: { spaceId: 'space-123' },
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockEsOperations.getSpace as jest.Mock).mockResolvedValue({
        SpaceName: 'test-db',
      });

      const plan = await generateEsPlan(mockContext, stateWithDb, [testDatabase]);

      expect(mockEsOperations.getSpace).toHaveBeenCalledWith('space-123');
      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('noop');
    });

    it('should get spaceId from instances if metadata not available', async () => {
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          'databases.test_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'test-db' },
            instances: [{ sid: 'si:tencent:es', id: 'space-456' }],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        instances: [{ sid: 'si:tencent:es', id: 'space-456' }],
      });
      (stateManager.getAllResources as jest.Mock).mockReturnValue({});
      (mockEsOperations.getSpace as jest.Mock).mockResolvedValue({
        SpaceName: 'test-db',
      });

      const plan = await generateEsPlan(mockContext, stateWithDb, [testDatabase]);

      expect(mockEsOperations.getSpace).toHaveBeenCalledWith('space-456');
      expect(plan.items).toHaveLength(1);
    });

    it('should handle empty buckets array', async () => {
      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          'databases.test_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'test-db' },
            instances: [{ sid: 'si:tencent:es', id: 'space-123' }],
            lastUpdated: new Date().toISOString(),
            metadata: { resourceType: 'TENCENT_ES_SERVERLESS' },
          },
        },
      };

      (stateManager.getAllResources as jest.Mock).mockReturnValue({
        'databases.test_db': {
          definition: { name: 'test-db' },
          metadata: { resourceType: 'TENCENT_ES_SERVERLESS' },
        },
      });

      const plan = await generateEsPlan(mockContext, stateWithDb, []);

      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].action).toBe('delete');
    });

    it('should handle multiple ES databases with mixed actions', async () => {
      const db2: DatabaseDomain = {
        key: 'test_db2',
        name: 'test-db2',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_TIME_SERIES_7.10'],
        security: { basicAuth: { password: 'test-password' } },
        network: { type: 'PUBLIC', ingressRules: [] },
        cu: { min: 2, max: 2 },
        storage: { min: 20 },
      };

      const stateWithDb: StateFile = {
        ...initialState,
        resources: {
          'databases.test_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'test-db' },
            instances: [{ sid: 'si:tencent:es', id: 'space-123' }],
            lastUpdated: new Date().toISOString(),
            metadata: { spaceId: 'space-123', resourceType: 'TENCENT_ES_SERVERLESS' },
          },
          'databases.old_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'old-db' },
            instances: [{ sid: 'si:tencent:es', id: 'space-456' }],
            lastUpdated: new Date().toISOString(),
            metadata: { resourceType: 'TENCENT_ES_SERVERLESS' },
          },
        },
      };

      (stateManager.getResource as jest.Mock)
        .mockReturnValueOnce({
          definition: { name: 'test-db' },
          metadata: { spaceId: 'space-123', resourceType: 'TENCENT_ES_SERVERLESS' },
        })
        .mockReturnValueOnce(null);
      (stateManager.getAllResources as jest.Mock).mockReturnValue({
        'databases.test_db': {
          definition: { name: 'test-db' },
          metadata: { resourceType: 'TENCENT_ES_SERVERLESS' },
        },
        'databases.old_db': {
          definition: { name: 'old-db' },
          metadata: { resourceType: 'TENCENT_ES_SERVERLESS' },
        },
      });
      (mockEsOperations.getSpace as jest.Mock)
        .mockResolvedValueOnce({ SpaceName: 'test-db' })
        .mockResolvedValueOnce(null);

      const plan = await generateEsPlan(mockContext, stateWithDb, [testDatabase, db2]);

      expect(plan.items.length).toBeGreaterThanOrEqual(2);
      expect(plan.items.filter((i) => i.action === 'noop')).toHaveLength(1);
      expect(plan.items.filter((i) => i.action === 'delete')).toHaveLength(1);
    });
  });
});
