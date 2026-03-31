import { executeApigwPlan } from '../../../../src/stack/volcengineStack/apigwExecutor';
import { getContext } from '../../../../src/common';
import type { Context, EventDomain, StateFile, Plan, PlanItem } from '../../../../src/types';

jest.mock('../../../../src/common', () => ({
  getContext: jest.fn(),
  buildSid: (provider: string, service: string, stage: string, id: string) =>
    `${provider}:${service}:${stage}:${id}`,
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../../../src/stack/volcengineStack/apigwResource', () => ({
  createApigwResource: jest.fn().mockImplementation((context, event, serviceName, state) =>
    Promise.resolve({
      ...state,
      resources: {
        ...state.resources,
        [`events.${event.key}`]: { mode: 'managed' },
      },
    }),
  ),
  updateApigwResource: jest.fn().mockImplementation((context, event, serviceName, state) =>
    Promise.resolve({
      ...state,
      resources: {
        ...state.resources,
        [`events.${event.key}`]: { mode: 'managed' },
      },
    }),
  ),
  deleteApigwResource: jest
    .fn()
    .mockImplementation((context, logicalId, state) => Promise.resolve(state)),
}));

jest.mock('../../../../src/common/stateManager', () => ({
  getResource: jest.fn((state, logicalId) => state.resources?.[logicalId] || null),
}));

jest.mock('../../../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

describe('apigwExecutor', () => {
  const mockContext: Context = {
    app: 'test-app',
    service: 'test-service',
    stage: 'dev',
    region: 'cn-beijing',
    provider: 'volcengine' as Context['provider'],
    accessKeyId: 'test-ak',
    accessKeySecret: 'test-sk',
    iacLocation: '/test/path',
  };

  const mockEvent: EventDomain = {
    key: 'api_gateway',
    name: 'test-gateway',
    type: 'API_GATEWAY',
    triggers: [
      {
        method: 'GET',
        path: '/api/test',
        backend: '${functions.test_function}',
      },
    ],
  };

  const mockState: StateFile = {
    version: '1.0',
    provider: 'volcengine',
    app: 'test-app',
    service: 'test-service',
    stages: {},
    resources: {},
  };

  const createPlanItem = (action: PlanItem['action'], logicalId: string): PlanItem => ({
    logicalId,
    action,
    resourceType: 'VOLCENGINE_APIGW',
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getContext as jest.Mock).mockReturnValue(mockContext);
  });

  describe('executeApigwPlan', () => {
    it('should return initial state when plan is empty', async () => {
      const plan: Plan = { items: [] };
      const result = await executeApigwPlan(
        mockContext,
        plan,
        undefined,
        'test-service',
        mockState,
      );

      expect(result.state).toEqual(mockState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute create action', async () => {
      const plan: Plan = {
        items: [createPlanItem('create', 'events.api_gateway')],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [mockEvent],
        'test-service',
        mockState,
      );

      expect(result.state).toBeDefined();
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute update action', async () => {
      const plan: Plan = {
        items: [createPlanItem('update', 'events.api_gateway')],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [mockEvent],
        'test-service',
        mockState,
      );

      expect(result.state).toBeDefined();
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute delete action', async () => {
      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const plan: Plan = {
        items: [createPlanItem('delete', 'events.api_gateway')],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [],
        'test-service',
        stateWithResource,
      );

      expect(result.state).toBeDefined();
      expect(result.partialFailure).toBeUndefined();
    });

    it('should execute noop action', async () => {
      const plan: Plan = {
        items: [createPlanItem('noop', 'events.api_gateway')],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [mockEvent],
        'test-service',
        mockState,
      );

      expect(result.state).toEqual(mockState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should return partial failure on create error', async () => {
      const { createApigwResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/apigwResource',
      );
      createApigwResource.mockRejectedValueOnce(new Error('Create failed'));

      const plan: Plan = {
        items: [createPlanItem('create', 'events.api_gateway')],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [mockEvent],
        'test-service',
        mockState,
      );

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.failedItem.action).toBe('create');
      expect(result.partialFailure?.error.message).toBe('Create failed');
    });

    it('should return partial failure on update error', async () => {
      const { updateApigwResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/apigwResource',
      );
      updateApigwResource.mockRejectedValueOnce(new Error('Update failed'));

      const plan: Plan = {
        items: [createPlanItem('update', 'events.api_gateway')],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [mockEvent],
        'test-service',
        mockState,
      );

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.failedItem.action).toBe('update');
    });

    it('should return partial failure on delete error', async () => {
      const { deleteApigwResource } = jest.requireMock(
        '../../../../src/stack/volcengineStack/apigwResource',
      );
      deleteApigwResource.mockRejectedValueOnce(new Error('Delete failed'));

      const stateWithResource: StateFile = {
        ...mockState,
        resources: {
          'events.api_gateway': {
            mode: 'managed',
            region: 'cn-beijing',
            definition: {},
            instances: [],
            lastUpdated: '2024-01-01T00:00:00Z',
          },
        },
      };

      const plan: Plan = {
        items: [createPlanItem('delete', 'events.api_gateway')],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [],
        'test-service',
        stateWithResource,
      );

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.failedItem.action).toBe('delete');
    });

    it('should call onStateChange callback', async () => {
      const onStateChange = jest.fn();
      const plan: Plan = {
        items: [createPlanItem('create', 'events.api_gateway')],
      };

      await executeApigwPlan(
        mockContext,
        plan,
        [mockEvent],
        'test-service',
        mockState,
        onStateChange,
      );

      expect(onStateChange).toHaveBeenCalled();
    });

    it('should throw when event not found for create', async () => {
      const plan: Plan = {
        items: [createPlanItem('create', 'events.non_existent')],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [mockEvent],
        'test-service',
        mockState,
      );

      expect(result.partialFailure).toBeDefined();
      expect(result.partialFailure?.error.message).toContain('Event not found');
    });

    it('should skip delete when state not found', async () => {
      const { getResource } = jest.requireMock('../../../../src/common/stateManager');
      getResource.mockReturnValue(null);

      const plan: Plan = {
        items: [createPlanItem('delete', 'events.api_gateway')],
      };

      const result = await executeApigwPlan(mockContext, plan, [], 'test-service', mockState);

      expect(result.state).toEqual(mockState);
      expect(result.partialFailure).toBeUndefined();
    });

    it('should handle unknown action type', async () => {
      const plan: Plan = {
        items: [
          {
            ...createPlanItem('create', 'events.api_gateway'),
            action: 'unknown' as PlanItem['action'],
          },
        ],
      };

      const result = await executeApigwPlan(
        mockContext,
        plan,
        [mockEvent],
        'test-service',
        mockState,
      );

      expect(result.state).toEqual(mockState);
      expect(result.partialFailure).toBeUndefined();
    });
  });
});
