import path from 'node:path';
import fs from 'node:fs/promises';
import { deploy } from '../../src/commands/deploy';
import {
  createMockAliyunClient,
  createMockVolcengineClient,
  type MockAliyunClient,
  type MockVolcengineClient,
} from './mockCloudClient';

jest.mock('../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn(),
}));

jest.mock('../../src/common/tencentClient', () => ({
  createTencentClient: jest.fn(),
}));

jest.mock('../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(),
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
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockCreateTencentClient = require('../../src/common/tencentClient')
  .createTencentClient as jest.Mock;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockCreateVolcengineClient = require('../../src/common/volcengineClient')
  .createVolcengineClient as jest.Mock;

const stateFilePathFor = (app: string, service: string): string =>
  path.join(process.cwd(), '.serverlessinsight', `state-${app}-${service}.json`);

const NESTED_STATE_FILE = stateFilePathFor('nested-drift-app', 'nested-drift-service');
const TENCENT_LOG_STATE_FILE = stateFilePathFor('insight-poc-app-log', 'insight-poc-tencent-log');
const VOLC_LOG_STATE_FILE = stateFilePathFor('insight-volc-app', 'insight-volc');

// Healthy live SG rule echo: the exact canonical tuples si's create writes
// (issue #234 M2). Single ports appear in Aliyun wire format `n/n`.
const healthySecurityGroupRules = (): {
  ingressRules: Array<{
    ipProtocol: string;
    portRange: string;
    sourceCidrIp?: string;
    destCidrIp?: string;
  }>;
  egressRules: Array<{ ipProtocol: string; portRange: string; destCidrIp?: string }>;
} => ({
  ingressRules: [{ ipProtocol: 'TCP', portRange: '8080/8080', sourceCidrIp: '0.0.0.0/0' }],
  egressRules: [{ ipProtocol: 'TCP', portRange: '443/443', destCidrIp: '0.0.0.0/0' }],
});

const MOUNT_TARGET_DOMAIN = 'fs-123.cn-hangzhou.nas.aliyuncs.com';
const REPAIRED_MOUNT_TARGET_DOMAIN = 'fs-123.repaired.cn-hangzhou.nas.aliyuncs.com';

describe('Nested drift repair deploy flows (issue #234 M2-M5)', () => {
  describe('aliyun FC3 security-group rules and NAS mount target (M2 + M4)', () => {
    const deployOptions = {
      location: path.join(__dirname, '../fixtures/serverless-insight-aliyun-nested.yml'),
      stage: 'dev',
      autoApprove: true,
      region: 'cn-hangzhou',
      provider: 'aliyun',
    };
    let mockClient: MockAliyunClient;

    beforeEach(async () => {
      jest.clearAllMocks();
      mockClient = createMockAliyunClient();
      // Operation-shaped overrides: the generic SDK-shaped defaults above don't
      // match what the executor reads back (issue #234 M2/M4 flows).
      mockClient.ecs.createSecurityGroup.mockResolvedValue({
        securityGroupId: 'sg-123',
        securityGroupName: 'nested-drift-sg',
      });
      mockClient.nas.createFileSystem.mockResolvedValue({ fileSystemId: 'fs-123' });
      mockClient.nas.createMountTarget.mockResolvedValue({
        mountTargetDomain: MOUNT_TARGET_DOMAIN,
      });
      mockClient.nas.listMountTargets.mockResolvedValue([
        { mountTargetDomain: MOUNT_TARGET_DOMAIN },
      ]);
      mockClient.ecs.getSecurityGroupRules.mockResolvedValue(healthySecurityGroupRules());
      mockCreateAliyunClient.mockReturnValue(mockClient);
      await fs.rm(NESTED_STATE_FILE, { force: true }).catch(() => {});
    });

    afterEach(async () => {
      await fs.rm(NESTED_STATE_FILE, { force: true }).catch(() => {});
    });

    it('repairs drifted security-group rules on the next deploy (issue #234 M2)', async () => {
      await deploy(deployOptions);
      expect(mockClient.ecs.createSecurityGroup).toHaveBeenCalledTimes(1);

      // Console drift: the desired ingress rule was revoked and an extra
      // out-of-band rule appeared.
      const tampered = healthySecurityGroupRules();
      tampered.ingressRules = [
        { ipProtocol: 'TCP', portRange: '22/22', sourceCidrIp: '0.0.0.0/0' },
      ];
      mockClient.ecs.getSecurityGroupRules.mockResolvedValue(tampered);
      mockClient.ecs.authorizeSecurityGroupRules.mockClear();
      mockClient.ecs.revokeSecurityGroupRules.mockClear();

      await deploy(deployOptions);

      expect(mockClient.ecs.authorizeSecurityGroupRules).toHaveBeenCalledWith(
        'sg-123',
        'ingress',
        expect.arrayContaining([expect.objectContaining({ cidr: '0.0.0.0/0', portRange: '8080' })]),
      );
      expect(mockClient.ecs.revokeSecurityGroupRules).toHaveBeenCalledWith(
        'sg-123',
        'ingress',
        expect.arrayContaining([expect.objectContaining({ portRange: '22/22' })]),
      );

      // Healthy again → noop (no further repair writes).
      mockClient.ecs.getSecurityGroupRules.mockResolvedValue(healthySecurityGroupRules());
      mockClient.ecs.authorizeSecurityGroupRules.mockClear();
      mockClient.ecs.revokeSecurityGroupRules.mockClear();

      await deploy(deployOptions);

      expect(mockClient.ecs.authorizeSecurityGroupRules).not.toHaveBeenCalled();
      expect(mockClient.ecs.revokeSecurityGroupRules).not.toHaveBeenCalled();
    });

    it('recreates a console-deleted NAS mount target on the next deploy (issue #234 M4)', async () => {
      await deploy(deployOptions);
      expect(mockClient.nas.createMountTarget).toHaveBeenCalledTimes(1);

      // Console drift: the mount target was deleted out-of-band. The provider
      // assigns a NEW domain to the recreated target.
      mockClient.nas.listMountTargets.mockResolvedValue([]);
      mockClient.nas.createMountTarget.mockResolvedValue({
        mountTargetDomain: REPAIRED_MOUNT_TARGET_DOMAIN,
      });
      mockClient.nas.createMountTarget.mockClear();

      await deploy(deployOptions);

      expect(mockClient.nas.createMountTarget).toHaveBeenCalledWith(
        'fs-123',
        'nested-drift-fn-dev-nas-access-mnt-data',
        'vpc-123',
        'vsw-123',
      );

      // The function mounts the recreated target, not the stale recorded one.
      expect(mockClient.fc3.updateFunctionConfiguration).toHaveBeenCalledWith(
        expect.objectContaining({
          nasConfig: {
            userId: -1,
            groupId: -1,
            mountPoints: [
              { serverAddr: `${REPAIRED_MOUNT_TARGET_DOMAIN}:/`, mountDir: '/mnt/data' },
            ],
          },
        }),
      );

      // The recreated target replaces the stale instance in state, so later
      // deploys and destroy track the target that actually exists.
      const savedState = JSON.parse(await fs.readFile(NESTED_STATE_FILE, 'utf-8')) as {
        stages: Record<
          string,
          { resources: Record<string, { instances: Array<{ type: string; id: string }> }> }
        >;
      };
      const mountTargetInstance = savedState.stages.dev.resources[
        'functions.nested_fn'
      ].instances.find((i) => i.type === 'ALIYUN_NAS_MOUNT_TARGET');
      expect(mountTargetInstance?.id).toBe(`fs-123/${REPAIRED_MOUNT_TARGET_DOMAIN}`);

      // Healthy again (the repaired target exists) → no repair writes. The
      // planner may still force a config push (unrelated probes flag drift in
      // this mock environment), but it must converge on the repaired domain —
      // never reverting to the stale deleted one.
      mockClient.nas.listMountTargets.mockResolvedValue([
        { mountTargetDomain: REPAIRED_MOUNT_TARGET_DOMAIN },
      ]);
      mockClient.nas.createMountTarget.mockClear();
      mockClient.fc3.updateFunctionConfiguration.mockClear();

      await deploy(deployOptions);

      expect(mockClient.nas.createMountTarget).not.toHaveBeenCalled();
      const healthyConfigCalls = mockClient.fc3.updateFunctionConfiguration.mock.calls as Array<
        Array<{ nasConfig?: { mountPoints?: Array<{ serverAddr?: string }> } }>
      >;
      for (const [config] of healthyConfigCalls) {
        expect(config.nasConfig?.mountPoints?.[0]?.serverAddr).toBe(
          `${REPAIRED_MOUNT_TARGET_DOMAIN}:/`,
        );
      }
    });
  });

  describe('tencent SCF CLS topic attributes (M3)', () => {
    const deployOptions = {
      location: path.join(__dirname, '../fixtures/serverless-insight-tencent-log.yml'),
      stage: 'default',
      autoApprove: true,
      region: 'ap-guangzhou',
      provider: 'tencent',
    };

    // Operation-shaped tencent mock with a stateful shared logset/topic, so
    // repeated deploys see a realistic cloud (create → reuse → reconcile).
    // The shared logset only exists after createLogset writes it — including
    // the ownership tag the ensure flow verifies on later deploys.
    const buildTencentClient = () => {
      let logset: {
        LogsetId: string;
        LogsetName: string;
        Tags: Array<{ Key: string; Value: string }>;
      } | null = null;
      let topic: Record<string, unknown> | null = null;
      // Echo contract: GetFunction returns the created function only after
      // CreateFunction — the planner probe (pre-create) and the executor's
      // post-create state refresh observe different worlds, like the real API.
      let remoteFn: Record<string, unknown> | null = null;
      return {
        scf: {
          createFunction: jest.fn().mockImplementation(async () => {
            remoteFn = {
              FunctionName: 'test-log-fn',
              Runtime: 'Nodejs18.15',
              Handler: 'index.handler',
              MemorySize: 512,
              Timeout: 10,
              Status: 'Active',
              Environment: { Variables: [] },
              Tags: [],
            };
            return { FunctionName: 'test-log-fn' };
          }),
          getFunction: jest.fn().mockImplementation(async () => remoteFn),
          updateFunctionConfiguration: jest.fn().mockResolvedValue({}),
          updateFunctionCode: jest.fn().mockResolvedValue({}),
          deleteFunction: jest.fn().mockResolvedValue({}),
          createTrigger: jest.fn().mockResolvedValue({}),
          deleteTrigger: jest.fn().mockResolvedValue({}),
          createCustomDomain: jest.fn().mockResolvedValue({}),
          getCustomDomain: jest.fn().mockResolvedValue(null),
          deleteCustomDomain: jest.fn().mockResolvedValue({}),
        },
        cls: {
          getLogsetByName: jest.fn().mockImplementation(async () => logset),
          getLogsetNameById: jest.fn().mockResolvedValue('insight-poc-app-log-default-tls'),
          listTopicsByLogset: jest.fn().mockResolvedValue([]),
          getTopicByName: jest.fn().mockImplementation(async () => topic),
          getTopicById: jest.fn().mockImplementation(async () => topic),
          createLogset: jest.fn().mockImplementation(async (logsetName: string, tags) => {
            logset = {
              LogsetId: 'logset-1',
              LogsetName: logsetName,
              Tags: (tags ?? []).map((t: { key: string; value: string }) => ({
                Key: t.key,
                Value: t.value,
              })),
            };
            return { logsetId: 'logset-1' };
          }),
          createTopic: jest
            .fn()
            .mockImplementation(
              async (
                _logsetId: string,
                topicName: string,
                opts?: { tags?: Array<{ key: string; value: string }> },
              ) => {
                topic = {
                  TopicId: 'topic-1',
                  TopicName: topicName,
                  StorageType: 'hot',
                  Period: 30,
                  // The real CreateTopic persists the ownership tags the ensure
                  // flow verifies on later deploys.
                  Tags: (opts?.tags ?? []).map((t) => ({ Key: t.key, Value: t.value })),
                };
                return { topicId: 'topic-1' };
              },
            ),
          modifyTopic: jest
            .fn()
            .mockImplementation(
              async (_topicId: string, attrs: { period?: number; storageType?: string }) => {
                topic = { ...topic, Period: attrs.period, StorageType: attrs.storageType };
                return undefined;
              },
            ),
          createFulltextIndex: jest.fn().mockResolvedValue(undefined),
          waitForTopic: jest.fn().mockResolvedValue(undefined),
          deleteTopic: jest.fn().mockResolvedValue(undefined),
          deleteLogset: jest.fn().mockResolvedValue(undefined),
          deleteIndex: jest.fn().mockResolvedValue(undefined),
        },
      };
    };

    type TencentLogClient = ReturnType<typeof buildTencentClient>;
    let client: TencentLogClient;

    beforeEach(async () => {
      jest.clearAllMocks();
      client = buildTencentClient();
      mockCreateTencentClient.mockReturnValue(client);
      await fs.rm(TENCENT_LOG_STATE_FILE, { force: true }).catch(() => {});
    });

    afterEach(async () => {
      await fs.rm(TENCENT_LOG_STATE_FILE, { force: true }).catch(() => {});
    });

    it('repairs drifted CLS topic attributes on the next deploy (issue #234 M3)', async () => {
      await deploy(deployOptions);
      expect(client.cls.createTopic).toHaveBeenCalledTimes(1);

      // Console drift: the topic switched to cold storage with a 1-day period.
      client.cls.getTopicById.mockResolvedValue({
        TopicId: 'topic-1',
        StorageType: 'cold',
        Period: 1,
      });
      client.cls.modifyTopic.mockClear();

      await deploy(deployOptions);

      expect(client.cls.modifyTopic).toHaveBeenCalledWith('topic-1', {
        period: 30,
        storageType: 'hot',
      });

      // Healthy again → noop (no further repair writes).
      client.cls.getTopicById.mockResolvedValue({
        TopicId: 'topic-1',
        StorageType: 'hot',
        Period: 30,
      });
      client.cls.modifyTopic.mockClear();

      await deploy(deployOptions);

      expect(client.cls.modifyTopic).not.toHaveBeenCalled();
    });
  });

  describe('volcengine veFaaS TLS topic ttl (M5)', () => {
    const deployOptions = {
      location: path.join(__dirname, '../fixtures/serverless-insight-volcengine-log.yml'),
      stage: 'dev',
      autoApprove: true,
      region: 'cn-beijing',
      provider: 'volcengine',
    };
    let mockClient: MockVolcengineClient;

    const healthyTopic = (): Record<string, unknown> => ({
      topicId: 'topic-123',
      topicName: 'insight-volc-dev-insight_poc_fn-fn-logs',
      status: 'Running',
      ttl: 30,
    });

    beforeEach(async () => {
      jest.clearAllMocks();
      mockClient = createMockVolcengineClient();
      mockCreateVolcengineClient.mockReturnValue(mockClient);
      await fs.rm(VOLC_LOG_STATE_FILE, { force: true }).catch(() => {});
    });

    afterEach(async () => {
      await fs.rm(VOLC_LOG_STATE_FILE, { force: true }).catch(() => {});
    });

    it('repairs a drifted TLS topic ttl on the next deploy (issue #234 M5)', async () => {
      // First deploy: nothing remote yet → create.
      mockClient.vefaas.getFunction.mockResolvedValue(null);
      mockClient.tls.getTopic.mockResolvedValue(null);
      await deploy(deployOptions);
      expect(mockClient.tls.createTopic).toHaveBeenCalledTimes(1);

      // Console drift: the topic ttl was shrunk out-of-band.
      mockClient.vefaas.getFunction.mockResolvedValue({
        functionId: 'func-123',
        functionName: 'insight-poc-fn',
        runtime: 'node20/v1',
        handler: 'index.handler',
        memoryMb: 128,
        requestTimeout: 30,
        status: 'Active',
      });
      mockClient.tls.getTopic.mockResolvedValue({ ...healthyTopic(), ttl: 1 });
      mockClient.tls.modifyTopic.mockClear();

      await deploy(deployOptions);

      expect(mockClient.tls.modifyTopic).toHaveBeenCalledWith('topic-123', 30);

      // Healthy again → noop (no further repair writes).
      mockClient.tls.getTopic.mockResolvedValue(healthyTopic());
      mockClient.tls.modifyTopic.mockClear();

      await deploy(deployOptions);

      expect(mockClient.tls.modifyTopic).not.toHaveBeenCalled();
    });
  });
});
