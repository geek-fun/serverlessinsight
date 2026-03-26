/* eslint-disable @typescript-eslint/no-unused-vars */
import { generateTencentPlan, displayPlan } from '../../../../src/stack/scfStack/planner';
import * as scfPlanner from '../../../../src/stack/scfStack/scfPlanner';
import * as cosPlanner from '../../../../src/stack/scfStack/cosPlanner';
import * as tdsqlcPlanner from '../../../../src/stack/scfStack/tdsqlcPlanner';
import * as esPlanner from '../../../../src/stack/scfStack/esServerlessPlanner';
import * as common from '../../../../src/common';
import { StateBackend } from '../../../../src/common/stateBackend';
import { ProviderEnum } from '../../../../src/common';
import {
  ServerlessIac,
  StateFile,
  CURRENT_STATE_VERSION,
  Plan,
  PlanItem,
} from '../../../../src/types';

jest.mock('../../../../src/stack/scfStack/scfPlanner');
jest.mock('../../../../src/stack/scfStack/cosPlanner');
jest.mock('../../../../src/stack/scfStack/tdsqlcPlanner');
jest.mock('../../../../src/stack/scfStack/esServerlessPlanner');
jest.mock('../../../../src/common');

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('planner', () => {
  let mockBackend: jest.Mocked<StateBackend>;
  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'tencent',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const testIac: ServerlessIac = {
    version: '0.0.1',
    provider: { name: ProviderEnum.TENCENT, region: 'ap-guangzhou' },
    app: 'test-app',
    service: 'test-service',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockBackend = {
      loadState: jest.fn().mockResolvedValue(initialState),
      saveState: jest.fn(),
    } as unknown as Context;

    (common.getContext as jest.Mock).mockReturnValue({
      stage: 'dev',
      app: 'test-app',
      service: 'test-service',
      provider: ProviderEnum.TENCENT,
      region: 'ap-guangzhou',
    });

    (common.getDependencyInfo as jest.Mock).mockReturnValue({
      order: [],
      levels: {},
      graph: {},
      cycleError: null,
    });

    (common.toDotFormat as jest.Mock).mockReturnValue('digraph {}');
  });

  describe('generateTencentPlan', () => {
    it('should generate combined plan from all resource types', async () => {
      const functionPlan: Plan = {
        items: [
          {
            logicalId: 'functions.test',
            action: 'create',
            resourceType: 'SCF',
          },
        ],
      };

      const bucketPlan: Plan = {
        items: [
          {
            logicalId: 'buckets.test',
            action: 'create',
            resourceType: 'COS_BUCKET',
          },
        ],
      };

      const emptyPlan: Plan = { items: [] };

      (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(functionPlan);
      (cosPlanner.generateBucketPlan as jest.Mock).mockResolvedValue(bucketPlan);
      (tdsqlcPlanner.generateDatabasePlan as jest.Mock).mockResolvedValue(emptyPlan);
      (esPlanner.generateEsPlan as jest.Mock).mockResolvedValue(emptyPlan);

      (common.getDependencyInfo as jest.Mock).mockReturnValue({
        order: [
          { logicalId: 'functions.test', action: 'create', resourceType: 'SCF' },
          { logicalId: 'buckets.test', action: 'create', resourceType: 'COS_BUCKET' },
        ],
        levels: {},
        graph: {},
        cycleError: null,
      });

      const result = await generateTencentPlan(testIac, mockBackend);

      expect(result.items).toHaveLength(2);
      expect(result.items[0].logicalId).toBe('functions.test');
      expect(result.items[1].logicalId).toBe('buckets.test');
    });

    it('should load state from backend', async () => {
      const emptyPlan: Plan = { items: [] };
      (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (cosPlanner.generateBucketPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (tdsqlcPlanner.generateDatabasePlan as jest.Mock).mockResolvedValue(emptyPlan);
      (esPlanner.generateEsPlan as jest.Mock).mockResolvedValue(emptyPlan);

      await generateTencentPlan(testIac, mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalledWith(
        ProviderEnum.TENCENT,
        'test-app',
        'test-service',
        'dev',
      );
    });

    it('should generate plans for all resource types', async () => {
      const emptyPlan: Plan = { items: [] };
      (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (cosPlanner.generateBucketPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (tdsqlcPlanner.generateDatabasePlan as jest.Mock).mockResolvedValue(emptyPlan);
      (esPlanner.generateEsPlan as jest.Mock).mockResolvedValue(emptyPlan);

      await generateTencentPlan(testIac, mockBackend);

      expect(scfPlanner.generateFunctionPlan).toHaveBeenCalled();
      expect(cosPlanner.generateBucketPlan).toHaveBeenCalled();
      expect(tdsqlcPlanner.generateDatabasePlan).toHaveBeenCalled();
      expect(esPlanner.generateEsPlan).toHaveBeenCalled();
    });

    it('should call getDependencyInfo with combined items', async () => {
      const functionPlan: Plan = {
        items: [
          {
            logicalId: 'functions.test',
            action: 'create',
            resourceType: 'SCF',
          },
        ],
      };

      const bucketPlan: Plan = {
        items: [
          {
            logicalId: 'buckets.test',
            action: 'create',
            resourceType: 'COS_BUCKET',
          },
        ],
      };

      (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(functionPlan);
      (cosPlanner.generateBucketPlan as jest.Mock).mockResolvedValue(bucketPlan);
      (tdsqlcPlanner.generateDatabasePlan as jest.Mock).mockResolvedValue({ items: [] });
      (esPlanner.generateEsPlan as jest.Mock).mockResolvedValue({ items: [] });

      await generateTencentPlan(testIac, mockBackend);

      expect(common.getDependencyInfo).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ logicalId: 'functions.test' }),
          expect.objectContaining({ logicalId: 'buckets.test' }),
        ]),
      );
    });

    it('should throw error when cycle detected', async () => {
      const emptyPlan: Plan = { items: [] };
      (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (cosPlanner.generateBucketPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (tdsqlcPlanner.generateDatabasePlan as jest.Mock).mockResolvedValue(emptyPlan);
      (esPlanner.generateEsPlan as jest.Mock).mockResolvedValue(emptyPlan);

      (common.getDependencyInfo as jest.Mock).mockReturnValue({
        order: [],
        levels: {},
        graph: {},
        cycleError: {
          cycle: ['functions.test', 'buckets.test', 'functions.test'],
        },
      });

      await expect(generateTencentPlan(testIac, mockBackend)).rejects.toThrow('CYCLE_DETECTED');
    });

    it('should return ordered items and dependency information', async () => {
      const functionPlan: Plan = {
        items: [
          {
            logicalId: 'functions.test',
            action: 'create',
            resourceType: 'SCF',
          },
        ],
      };

      (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(functionPlan);
      (cosPlanner.generateBucketPlan as jest.Mock).mockResolvedValue({ items: [] });
      (tdsqlcPlanner.generateDatabasePlan as jest.Mock).mockResolvedValue({ items: [] });
      (esPlanner.generateEsPlan as jest.Mock).mockResolvedValue({ items: [] });

      const mockOrder = [{ logicalId: 'functions.test', action: 'create', resourceType: 'SCF' }];
      const mockLevels = { 0: ['functions.test'] };
      const mockGraph = { 'functions.test': [] };

      (common.getDependencyInfo as jest.Mock).mockReturnValue({
        order: mockOrder,
        levels: mockLevels,
        graph: mockGraph,
        cycleError: null,
      });

      const result = await generateTencentPlan(testIac, mockBackend);

      expect(result.items).toEqual(mockOrder);
      expect(result.levels).toEqual(mockLevels);
      expect(result.graph).toEqual(mockGraph);
      expect(result.dotGraph).toBeDefined();
    });

    it('should convert dependency graph to dot format', async () => {
      const emptyPlan: Plan = { items: [] };
      (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (cosPlanner.generateBucketPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (tdsqlcPlanner.generateDatabasePlan as jest.Mock).mockResolvedValue(emptyPlan);
      (esPlanner.generateEsPlan as jest.Mock).mockResolvedValue(emptyPlan);

      const mockGraph = { 'functions.test': ['buckets.test'] };
      (common.getDependencyInfo as jest.Mock).mockReturnValue({
        order: [],
        levels: {},
        graph: mockGraph,
        cycleError: null,
      });

      const result = await generateTencentPlan(testIac, mockBackend);

      expect(common.toDotFormat).toHaveBeenCalledWith(mockGraph);
      expect(result.dotGraph).toBe('digraph {}');
    });

    it('should handle empty plans from all resources', async () => {
      const emptyPlan: Plan = { items: [] };
      (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (cosPlanner.generateBucketPlan as jest.Mock).mockResolvedValue(emptyPlan);
      (tdsqlcPlanner.generateDatabasePlan as jest.Mock).mockResolvedValue(emptyPlan);
      (esPlanner.generateEsPlan as jest.Mock).mockResolvedValue(emptyPlan);

      const result = await generateTencentPlan(testIac, mockBackend);

      expect(result.items).toEqual([]);
    });

    it('should export displayPlan function', () => {
      expect(typeof displayPlan).toBeDefined();
    });
  });
});
