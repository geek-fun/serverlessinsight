/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { executeEsPlan } from '../../../../src/stack/scfStack/esServerlessExecutor';
import * as esResource from '../../../../src/stack/scfStack/esServerlessResource';
import * as stateManager from '../../../../src/common/stateManager';
import { ProviderEnum } from '../../../../src/common';
import {
  Context,
  StateFile,
  CURRENT_STATE_VERSION,
  Plan,
  PlanItem,
  DatabaseDomain,
  DatabaseEnum,
  DatabaseVersionEnum,
  ResourceMode,
  ResourceInstance,
} from '../../../../src/types';

jest.mock('../../../../src/stack/scfStack/esServerlessResource');
jest.mock('../../../../src/common/stateManager');

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn(), debug: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('esServerlessExecutor', () => {
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
  });

  describe('executeEsPlan', () => {
    it('should handle empty plan', async () => {
      const plan: Plan = { items: [] };
      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute create action successfully', async () => {
      const newState: StateFile = {
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

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'create',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { after: {} },
          },
        ],
      };

      (esResource.createEsResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(esResource.createEsResource).toHaveBeenCalledWith(
        mockContext,
        testDatabase,
        initialState,
      );
    });

    it('should execute update action successfully', async () => {
      const newState: StateFile = {
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

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'update',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { before: {}, after: {} },
          },
        ],
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        metadata: { spaceId: 'space-123' },
      });
      (esResource.updateEsResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeEsPlan(mockContext, plan, [testDatabase], stateWithDb);

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(esResource.updateEsResource).toHaveBeenCalledWith(
        mockContext,
        testDatabase,
        'space-123',
        stateWithDb,
      );
    });

    it('should execute delete action successfully', async () => {
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

      const newState: StateFile = {
        ...initialState,
        resources: {},
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'delete',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { before: {} },
          },
        ],
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        metadata: { spaceId: 'space-123' },
      });
      (esResource.deleteEsResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeEsPlan(mockContext, plan, [testDatabase], stateWithDb);

      expect(result.state).toEqual(newState);
      expect(result.partialFailure).toBeUndefined();
      expect(esResource.deleteEsResource).toHaveBeenCalledWith(
        mockContext,
        'space-123',
        'databases.test_db',
        stateWithDb,
      );
    });

    it('should handle noop action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'noop',
            resourceType: 'TENCENT_ES_SERVERLESS',
          },
        ],
      };

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should skip non-TENCENT_ES_SERVERLESS resource types', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'create',
            resourceType: 'OTHER_TYPE',
            changes: { after: {} },
          },
        ],
      };

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle unknown action', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'unknown' as any,
            resourceType: 'TENCENT_ES_SERVERLESS',
          },
        ],
      };

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle missing database not found for create', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.missing',
            action: 'create',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { after: {} },
          },
        ],
      };

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Database not found for logical ID');
    });

    it('should handle missing database for update', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.missing',
            action: 'update',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { before: {}, after: {} },
          },
        ],
      };

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Database not found for logical ID');
    });

    it('should handle state not found for update', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'update',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { before: {}, after: {} },
          },
        ],
      };

      (stateManager.getResource as jest.Mock).mockReturnValue(null);

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('State not found');
    });

    it('should handle missing spaceId for update', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'update',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { before: {}, after: {} },
          },
        ],
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        metadata: {},
        instances: [],
      });

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Space ID not found');
    });

    it('should handle state not found for delete', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.missing',
            action: 'delete',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { before: {} },
          },
        ],
      };

      (stateManager.getResource as jest.Mock).mockReturnValue(null);

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.state).toEqual(initialState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle missing spaceId for delete', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'delete',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { before: {} },
          },
        ],
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        metadata: {},
        instances: [],
      });

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Space ID not found');
    });

    it('should get spaceId from instances when metadata missing', async () => {
      const newState: StateFile = {
        ...initialState,
        resources: {
          'databases.test_db': {
            mode: 'managed' as ResourceMode,
            region: 'ap-guangzhou',
            definition: { name: 'test-db' },
            instances: [],
            lastUpdated: new Date().toISOString(),
          },
        },
      };

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

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'update',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { before: {}, after: {} },
          },
        ],
      };

      (stateManager.getResource as jest.Mock).mockReturnValue({
        definition: { name: 'test-db' },
        instances: [{ sid: 'si:tencent:es', id: 'space-456' }],
      });
      (esResource.updateEsResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeEsPlan(mockContext, plan, [testDatabase], stateWithDb);

      expect(result.partialFailure).toBeUndefined();
      expect(esResource.updateEsResource).toHaveBeenCalledWith(
        mockContext,
        testDatabase,
        'space-456',
        stateWithDb,
      );
    });

    it('should save state on successful action with onStateChange callback', async () => {
      const newState: StateFile = {
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

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'create',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { after: {} },
          },
        ],
      };

      const mockSaveState = jest.fn();

      (esResource.createEsResource as jest.Mock).mockResolvedValue(newState);

      const result = await executeEsPlan(
        mockContext,
        plan,
        [testDatabase],
        initialState,
        mockSaveState,
      );

      expect(result.state).toEqual(newState);
      expect(mockSaveState).toHaveBeenCalledWith(newState);
    });

    it('should return partial failure on create action error', async () => {
      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'create',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { after: {} },
          },
        ],
      };

      const error = new Error('Create failed');
      (esResource.createEsResource as jest.Mock).mockRejectedValue(error);

      const result = await executeEsPlan(mockContext, plan, [testDatabase], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error).toEqual(error);
      expect(result.partialFailure?.failedItem).toEqual(plan.items[0]);
      expect(result.partialFailure?.successfulItems).toEqual([]);
      expect(result.state).toEqual(initialState);
    });

    it('should handle multiple plan items and stop on first error', async () => {
      const newState: StateFile = {
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

      const db2: DatabaseDomain = {
        key: 'test_db2',
        name: 'test-db2',
        type: DatabaseEnum.ELASTICSEARCH_SERVERLESS,
        version: DatabaseVersionEnum['ES_SEARCH_7.10'],
        security: { basicAuth: { password: 'test-password' } },
        network: { type: 'PRIVATE', ingressRules: [], vpcId: 'vpc-123', subnetId: 'subnet-123' },
        cu: { min: 2, max: 2 },
        storage: { min: 20 },
      };

      const plan: Plan = {
        items: [
          {
            logicalId: 'databases.test_db',
            action: 'create',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { after: {} },
          },
          {
            logicalId: 'databases.test_db2',
            action: 'create',
            resourceType: 'TENCENT_ES_SERVERLESS',
            changes: { after: {} },
          },
        ],
      };

      (esResource.createEsResource as jest.Mock)
        .mockResolvedValueOnce(newState)
        .mockRejectedValueOnce(new Error('Second DB creation failed'));

      const result = await executeEsPlan(mockContext, plan, [testDatabase, db2], initialState);

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.successfulItems).toHaveLength(1);
      expect(result.partialFailure?.failedItem.logicalId).toBe('databases.test_db2');
    });
  });
});
