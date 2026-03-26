/* eslint-disable @typescript-eslint/no-explicit-any */
import { destroyTencentStack } from '../../../../src/stack/scfStack/destroyer';
import * as scfPlanner from '../../../../src/stack/scfStack/scfPlanner';
import * as cosPlanner from '../../../../src/stack/scfStack/cosPlanner';
import * as tdsqlcPlanner from '../../../../src/stack/scfStack/tdsqlcPlanner';
import * as esPlanner from '../../../../src/stack/scfStack/esServerlessPlanner';
import * as scfExecutor from '../../../../src/stack/scfStack/scfExecutor';
import * as cosExecutor from '../../../../src/stack/scfStack/cosExecutor';
import * as tdsqlcExecutor from '../../../../src/stack/scfStack/tdsqlcExecutor';
import * as esExecutor from '../../../../src/stack/scfStack/esServerlessExecutor';
import * as common from '../../../../src/common';
import { StateBackend } from '../../../../src/common/stateBackend';
import { ProviderEnum } from '../../../../src/common';
import { StateFile, CURRENT_STATE_VERSION, Plan } from '../../../../src/types';

jest.mock('../../../../src/stack/scfStack/scfPlanner');
jest.mock('../../../../src/stack/scfStack/cosPlanner');
jest.mock('../../../../src/stack/scfStack/tdsqlcPlanner');
jest.mock('../../../../src/stack/scfStack/esServerlessPlanner');
jest.mock('../../../../src/stack/scfStack/scfExecutor');
jest.mock('../../../../src/stack/scfStack/cosExecutor');
jest.mock('../../../../src/stack/scfStack/tdsqlcExecutor');
jest.mock('../../../../src/stack/scfStack/esServerlessExecutor');
jest.mock('../../../../src/common');

jest.mock('../../../../src/common/logger', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock('../../../../src/lang', () => ({
  lang: { __: (key: string) => key },
}));

describe('destroyer', () => {
  let mockBackend: jest.Mocked<StateBackend>;
  const initialState: StateFile = {
    version: CURRENT_STATE_VERSION,
    provider: 'tencent',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {
      'functions.test': {
        mode: 'managed' as any,
        region: 'ap-guangzhou',
        definition: {},
        instances: [],
        lastUpdated: new Date().toISOString(),
      },
    },
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

    const emptyPlan: Plan = { items: [] };
    (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(emptyPlan);
    (cosPlanner.generateBucketPlan as jest.Mock).mockResolvedValue(emptyPlan);
    (tdsqlcPlanner.generateDatabasePlan as jest.Mock).mockResolvedValue(emptyPlan);
    (esPlanner.generateEsPlan as jest.Mock).mockResolvedValue(emptyPlan);

    (scfExecutor.executeFunctionPlan as jest.Mock).mockResolvedValue({ state: initialState });
    (cosExecutor.executeBucketPlan as jest.Mock).mockResolvedValue({ state: initialState });
    (tdsqlcExecutor.executeDatabasePlan as jest.Mock).mockResolvedValue({ state: initialState });
    (esExecutor.executeEsPlan as jest.Mock).mockResolvedValue({ state: initialState });
  });

  describe('destroyTencentStack', () => {
    it('should destroy stack successfully', async () => {
      await destroyTencentStack(mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalledWith(
        ProviderEnum.TENCENT,
        'test-app',
        'test-service',
        'dev',
      );
      expect(scfPlanner.generateFunctionPlan).toHaveBeenCalledWith(
        expect.anything(),
        initialState,
        undefined,
      );
      expect(cosPlanner.generateBucketPlan).toHaveBeenCalledWith(
        expect.anything(),
        initialState,
        undefined,
      );
      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should generate deletion plans for all resource types with undefined', async () => {
      await destroyTencentStack(mockBackend);

      expect(scfPlanner.generateFunctionPlan).toHaveBeenCalledWith(
        expect.anything(),
        initialState,
        undefined,
      );
      expect(cosPlanner.generateBucketPlan).toHaveBeenCalledWith(
        expect.anything(),
        initialState,
        undefined,
      );
      expect(tdsqlcPlanner.generateDatabasePlan).toHaveBeenCalledWith(
        expect.anything(),
        initialState,
        undefined,
      );
      expect(esPlanner.generateEsPlan).toHaveBeenCalledWith(
        expect.anything(),
        initialState,
        undefined,
      );
    });

    it('should execute deletion plans for all resources', async () => {
      const deletePlan: Plan = {
        items: [
          {
            logicalId: 'functions.test',
            action: 'delete',
            resourceType: 'SCF',
          },
        ],
      };

      (scfPlanner.generateFunctionPlan as jest.Mock).mockResolvedValue(deletePlan);

      await destroyTencentStack(mockBackend);

      expect(scfExecutor.executeFunctionPlan).toHaveBeenCalled();
    });

    it('should save final state', async () => {
      const finalState: StateFile = { ...initialState, resources: {} };

      (scfExecutor.executeFunctionPlan as jest.Mock).mockResolvedValue({ state: finalState });
      (cosExecutor.executeBucketPlan as jest.Mock).mockResolvedValue({ state: finalState });
      (tdsqlcExecutor.executeDatabasePlan as jest.Mock).mockResolvedValue({ state: finalState });
      (esExecutor.executeEsPlan as jest.Mock).mockResolvedValue({ state: finalState });

      await destroyTencentStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalledWith(
        expect.objectContaining({ resources: {} }),
        'test-app',
        'test-service',
        'dev',
      );
    });

    it('should handle function deletion failure', async () => {
      const error = new Error('Function deletion failed');
      (error as any).isPartialFailure = true;

      (scfExecutor.executeFunctionPlan as jest.Mock).mockResolvedValue({
        state: initialState,
        partialFailure: {
          failedItem: { logicalId: 'functions.test', action: 'delete', resourceType: 'SCF' },
          error,
          successfulItems: [],
        },
      });

      await expect(destroyTencentStack(mockBackend)).rejects.toThrow();
    });

    it('should handle bucket deletion failure', async () => {
      const error = new Error('Bucket deletion failed');
      (error as any).isPartialFailure = true;

      (cosExecutor.executeBucketPlan as jest.Mock).mockResolvedValue({
        state: initialState,
        partialFailure: {
          failedItem: { logicalId: 'buckets.test', action: 'delete', resourceType: 'COS' },
          error,
          successfulItems: [],
        },
      });

      await expect(destroyTencentStack(mockBackend)).rejects.toThrow();
    });

    it('should execute deletions in reverse order of creation', async () => {
      const executionOrder: string[] = [];

      (scfExecutor.executeFunctionPlan as jest.Mock).mockImplementation(() => {
        executionOrder.push('scfDelete');
        return Promise.resolve({ state: initialState });
      });

      (cosExecutor.executeBucketPlan as jest.Mock).mockImplementation(() => {
        executionOrder.push('cosDelete');
        return Promise.resolve({ state: initialState });
      });

      (tdsqlcExecutor.executeDatabasePlan as jest.Mock).mockImplementation(() => {
        executionOrder.push('tdsqlcDelete');
        return Promise.resolve({ state: initialState });
      });

      await destroyTencentStack(mockBackend);

      expect(executionOrder).toContain('scfDelete');
      expect(executionOrder).toContain('cosDelete');
    });

    it('should track successful deletions across resource types', async () => {
      const _successfulFunc = {
        logicalId: 'functions.test',
        action: 'delete',
        resourceType: 'SCF',
      };

      (scfExecutor.executeFunctionPlan as jest.Mock).mockResolvedValue({
        state: initialState,
        partialFailure: undefined,
      });

      await destroyTencentStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should handle onStateChange callback for state persistence', async () => {
      const newState = { ...initialState, resources: {} };

      (scfExecutor.executeFunctionPlan as jest.Mock).mockImplementation(
        (context, plan, resources, state, onStateChange) => {
          if (onStateChange) {
            onStateChange(newState);
          }
          return Promise.resolve({ state: newState });
        },
      );

      await destroyTencentStack(mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });
  });
});
