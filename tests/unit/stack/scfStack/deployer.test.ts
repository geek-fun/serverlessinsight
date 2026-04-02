/* eslint-disable @typescript-eslint/no-explicit-any */
import { deployTencentStack } from '../../../../src/stack/scfStack/deployer';
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
import {
  ServerlessIac,
  StateFile,
  CURRENT_STATE_VERSION,
  Plan,
  BucketAccessEnum,
} from '../../../../src/types';

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

describe('deployer', () => {
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
    } as any;

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

  describe('deployTencentStack', () => {
    it('should deploy successfully with empty IAC', async () => {
      await deployTencentStack(testIac, mockBackend);

      expect(mockBackend.loadState).toHaveBeenCalledWith(
        ProviderEnum.TENCENT,
        'test-app',
        'test-service',
        'dev',
      );
      expect(scfPlanner.generateFunctionPlan).toHaveBeenCalled();
      expect(cosPlanner.generateBucketPlan).toHaveBeenCalled();
      expect(mockBackend.saveState).toHaveBeenCalledWith(
        initialState,
        'test-app',
        'test-service',
        'dev',
      );
    });

    it('should generate plans for all resource types', async () => {
      const iacWithResources: ServerlessIac = {
        ...testIac,
        functions: [
          {
            key: 'test_fn',
            name: 'test-function',
            code: { runtime: 'nodejs18', handler: 'index.handler', path: 'src' },
            memory: 512,
            timeout: 10,
            storage: {},
          },
        ],
        buckets: [
          {
            key: 'test_bucket',
            name: 'test-bucket',
            security: { acl: BucketAccessEnum.PUBLIC_READ, force_delete: false },
            storage: { class: 'STANDARD' },
          },
        ],
      };

      await deployTencentStack(iacWithResources, mockBackend);

      expect(scfPlanner.generateFunctionPlan).toHaveBeenCalledWith(
        expect.anything(),
        initialState,
        iacWithResources.functions,
      );
      expect(cosPlanner.generateBucketPlan).toHaveBeenCalledWith(
        expect.anything(),
        initialState,
        iacWithResources.buckets,
      );
    });

    it('should execute plans in correct order', async () => {
      const executionOrder: string[] = [];

      (scfPlanner.generateFunctionPlan as jest.Mock).mockImplementation(() => {
        executionOrder.push('scfPlan');
        return Promise.resolve({ items: [] });
      });

      (cosPlanner.generateBucketPlan as jest.Mock).mockImplementation(() => {
        executionOrder.push('cosPlan');
        return Promise.resolve({ items: [] });
      });

      (scfExecutor.executeFunctionPlan as jest.Mock).mockImplementation(() => {
        executionOrder.push('scfExec');
        return Promise.resolve({ state: initialState });
      });

      (cosExecutor.executeBucketPlan as jest.Mock).mockImplementation(() => {
        executionOrder.push('cosExec');
        return Promise.resolve({ state: initialState });
      });

      await deployTencentStack(testIac, mockBackend);

      expect(executionOrder).toContain('scfPlan');
      expect(executionOrder).toContain('cosPlan');
      expect(executionOrder.indexOf('scfExec')).toBeLessThan(executionOrder.indexOf('cosExec'));
    });

    it('should save state after each successful execution', async () => {
      const newState = { ...initialState, resources: { test: {} as any } };

      (scfExecutor.executeFunctionPlan as jest.Mock).mockResolvedValue({ state: newState });

      await deployTencentStack(testIac, mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should handle function plan partial failure', async () => {
      const error = new Error('Function deploy failed');
      (error as any).isPartialFailure = true;

      (scfExecutor.executeFunctionPlan as jest.Mock).mockResolvedValue({
        state: initialState,
        partialFailure: {
          failedItem: { logicalId: 'functions.test', action: 'create', resourceType: 'SCF' },
          error,
          successfulItems: [],
        },
      });

      await expect(deployTencentStack(testIac, mockBackend)).rejects.toThrow();
    });

    it('should handle bucket plan partial failure', async () => {
      const error = new Error('Bucket deploy failed');
      (error as any).isPartialFailure = true;

      (cosExecutor.executeBucketPlan as jest.Mock).mockResolvedValue({
        state: initialState,
        partialFailure: {
          failedItem: { logicalId: 'buckets.test', action: 'create', resourceType: 'COS' },
          error,
          successfulItems: [],
        },
      });

      await expect(deployTencentStack(testIac, mockBackend)).rejects.toThrow();
    });

    it('should call onStateChange callback', async () => {
      const _saveStateSpy = jest.fn();
      const newState = { ...initialState, resources: { test: {} as any } };

      (scfExecutor.executeFunctionPlan as jest.Mock).mockImplementation(
        (context, plan, functions, state, onStateChange) => {
          if (onStateChange) {
            onStateChange(newState);
          }
          return Promise.resolve({ state: newState });
        },
      );

      await deployTencentStack(testIac, mockBackend);

      expect(mockBackend.saveState).toHaveBeenCalled();
    });

    it('should combine plans from all resource types', async () => {
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

      await deployTencentStack(testIac, mockBackend);

      expect(scfExecutor.executeFunctionPlan).toHaveBeenCalled();
      expect(cosExecutor.executeBucketPlan).toHaveBeenCalled();
    });
    it('should handle database plan partial failure', async () => {
      const error = new Error('Database deploy failed');
      (error as any).isPartialFailure = true;

      (tdsqlcExecutor.executeDatabasePlan as jest.Mock).mockResolvedValue({
        state: initialState,
        partialFailure: {
          failedItem: {
            logicalId: 'databases.test',
            action: 'create',
            resourceType: 'TDSQLC',
          },
          error,
          successfulItems: [],
        },
      });

      await expect(deployTencentStack(testIac, mockBackend)).rejects.toThrow();
    });

    it('should handle es plan partial failure', async () => {
      const error = new Error('ES deploy failed');
      (error as any).isPartialFailure = true;

      (esExecutor.executeEsPlan as jest.Mock).mockResolvedValue({
        state: initialState,
        partialFailure: {
          failedItem: {
            logicalId: 'databases.es_test',
            action: 'create',
            resourceType: 'ES_SERVERLESS',
          },
          error,
          successfulItems: [],
        },
      });

      await expect(deployTencentStack(testIac, mockBackend)).rejects.toThrow();
    });
  });
});
