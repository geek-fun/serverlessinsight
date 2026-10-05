import path from 'node:path';
import fs from 'node:fs/promises';
import { deploy } from '../../src/commands/deploy';
import { loadState } from '../../src/common/stateManager';
import { createMockAliyunClient, type MockAliyunClient } from './mockCloudClient';
import type { StateFile } from '../../src/types';

jest.mock('../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn(),
}));

jest.mock('../../src/common/imsClient', () => ({
  getIamInfo: jest.fn().mockResolvedValue({
    accountId: '123456789012',
    displayName: 'Test User',
    userId: 'test-user-id',
  }),
}));

jest.mock('../../src/common/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../../src/lang', () => ({
  lang: {
    __: (key: string) => key,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockCreateAliyunClient = require('../../src/common/aliyunClient')
  .createAliyunClient as jest.Mock;

/**
 * Timer trigger deploy flow (issue #258): schema → validate → plan → execute
 * → state, with a stateful fake of the FC3 trigger surface so redeploys and
 * console drift behave like the real provider.
 */
describe('Timer Trigger Flow Service Test', () => {
  const fixturesDir = path.join(__dirname, '../fixtures');
  const fixture = path.join(fixturesDir, 'serverless-insight-timer.yml');
  const stateFilePath = path.join(
    process.cwd(),
    '.serverlessinsight',
    'state-insight-poc-timer-app-insight-poc-timer.json',
  );
  let mockClient: MockAliyunClient;
  let timerStore: Array<Record<string, unknown>>;

  const wireTriggerStore = (): void => {
    timerStore = [];
    mockClient.fc3.listTriggers.mockImplementation(async () => timerStore);
    mockClient.fc3.createTrigger.mockImplementation(
      async (
        _functionName: string,
        triggerName: string,
        triggerType: string,
        triggerConfig: Record<string, unknown>,
      ) => {
        if (triggerType === 'timer') {
          timerStore.push({
            triggerName,
            triggerType,
            triggerConfig: { ...triggerConfig },
          });
        }
        return { body: { triggerName } };
      },
    );
    mockClient.fc3.deleteTrigger.mockImplementation(
      async (_functionName: string, triggerName: string) => {
        timerStore = timerStore.filter((trigger) => trigger.triggerName !== triggerName);
        mockClient.fc3.listTriggers.mockImplementation(async () => timerStore);
      },
    );
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);
    wireTriggerStore();

    await fs.rm(stateFilePath, { force: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(stateFilePath, { force: true }).catch(() => {});
  });

  const loadStateFile = (): StateFile =>
    loadState('aliyun', 'insight-poc-timer-app', 'insight-poc-timer', 'dev');

  it('should deploy named timer triggers with the translated dialect and register them in state', async () => {
    await deploy({
      location: fixture,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    const createCalls = mockClient.fc3.createTrigger.mock.calls.filter(
      (call) => call[2] === 'timer',
    );
    expect(createCalls).toHaveLength(2);

    // si-cron '0 23 3 * * *' (03:23 UTC) → aliyun 6-field UTC+8 (11:23)
    expect(createCalls[0].slice(0, 4)).toEqual([
      'insight-poc-timer-fn',
      'billing-run',
      'timer',
      {
        payload: '{"job":"billing-run"}',
        cronExpression: '0 23 11 * * *',
        enable: true,
        description: 'daily billing run',
      },
    ]);
    // '@every 1h' → hourly step, disabled
    expect(createCalls[1].slice(0, 4)).toEqual([
      'insight-poc-timer-fn',
      'report-hourly',
      'timer',
      { payload: '', cronExpression: '0 0 * * * *', enable: false },
    ]);

    const state = await loadStateFile();
    const fnState = state.resources['functions.insight_poc_fn'];
    const timerInstances = (fnState.instances ?? []).filter(
      (instance) => instance.type === 'ALIYUN_FC3_TIMER_TRIGGER',
    );
    expect(timerInstanceNames(timerInstances).sort()).toEqual(['billing-run', 'report-hourly']);
    expect(timerInstances[0]).toMatchObject({
      attributes: expect.objectContaining({ cron: '0 23 3 * * *' }),
    });
  });

  it('should be idempotent — a second deploy recreates nothing', async () => {
    await deploy({
      location: fixture,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });
    const callsAfterFirst = mockClient.fc3.createTrigger.mock.calls.length;

    await deploy({
      location: fixture,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    expect(mockClient.fc3.createTrigger.mock.calls.length).toBe(callsAfterFirst);
    expect(mockClient.fc3.deleteTrigger).not.toHaveBeenCalled();
  });

  it('should detect and repair console-side timer drift on redeploy', async () => {
    await deploy({
      location: fixture,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });
    const callsAfterFirst = mockClient.fc3.createTrigger.mock.calls.length;

    // simulate a console edit of the billing-run cron
    const drifted = timerStore.find((trigger) => trigger.triggerName === 'billing-run');
    (drifted!.triggerConfig as Record<string, unknown>).cronExpression = '0 23 12 * * *';

    await deploy({
      location: fixture,
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    });

    // the drifted trigger was recreated with the config's translation
    expect(mockClient.fc3.createTrigger.mock.calls.length).toBeGreaterThan(callsAfterFirst);
    const repaired = timerStore.find((trigger) => trigger.triggerName === 'billing-run');
    expect((repaired!.triggerConfig as Record<string, unknown>).cronExpression).toBe(
      '0 23 11 * * *',
    );
  });
});

const timerInstanceNames = (instances: Array<{ id?: string }>): Array<string> =>
  instances.map((instance) => instance.id ?? '');
