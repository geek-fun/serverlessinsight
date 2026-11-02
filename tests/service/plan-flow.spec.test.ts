import path from 'node:path';
import os from 'node:os';
import { parse, stringify } from 'yaml';
import type { ServerlessIacRaw } from '../../src/types';
import fs from 'node:fs/promises';
import { plan } from '../../src/commands/plan';
import {
  createMockAliyunClient,
  createMockTencentClient,
  type MockAliyunClient,
  type MockTencentClient,
} from './mockCloudClient';

jest.mock('../../src/common/aliyunClient', () => ({
  createAliyunClient: jest.fn(),
}));

jest.mock('../../src/common/tencentClient', () => ({
  createTencentClient: jest.fn(),
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

const STATE_FILE_PATH = path.join(
  process.cwd(),
  '.serverlessinsight',
  'state-insight-poc-plan-app-insight-poc-plan.json',
);

const EXISTING_STATE = JSON.stringify({
  version: '3.0',
  provider: 'aliyun',
  app: 'insight-poc-plan-app',
  service: 'insight-poc-plan',
  stages: {
    dev: {
      resources: {
        'functions.insight_poc_fn': {
          mode: 'managed',
          region: 'cn-hangzhou',
          definition: {
            functionName: 'insight-poc-fn',
            runtime: 'nodejs18',
            handler: 'index.handler',
            memorySize: 512,
            timeout: 10,
          },
          instances: [],
          lastUpdated: '2024-01-01T00:00:00.000Z',
          status: 'ready',
        },
      },
    },
  },
  resources: {},
});

describe('Plan Flow Service Test', () => {
  const fixturesDir = path.join(__dirname, '../fixtures');
  let mockClient: MockAliyunClient;
  let mockTencentClient: MockTencentClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockClient = createMockAliyunClient();
    mockCreateAliyunClient.mockReturnValue(mockClient);

    mockTencentClient = createMockTencentClient();
    mockCreateTencentClient.mockReturnValue(mockTencentClient);

    await fs.mkdir(path.dirname(STATE_FILE_PATH), { recursive: true }).catch(() => {});
    await fs.writeFile(STATE_FILE_PATH, EXISTING_STATE, 'utf-8');
  });

  afterEach(async () => {
    await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
  });

  describe('Aliyun Plan Generation', () => {
    it('should generate plan for FC3 function', async () => {
      await plan({
        location: path.join(fixturesDir, 'serverless-insight-plan.yml'),
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.getFunction).toHaveBeenCalled();
    });

    it('should mark resources as create when no state exists', async () => {
      mockClient.fc3.getFunction.mockResolvedValueOnce(null);

      await plan({
        location: path.join(fixturesDir, 'serverless-insight-plan.yml'),
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.getFunction).toHaveBeenCalled();
    });
  });

  describe('Plan Comparison', () => {
    it('should detect changes when function configuration differs', async () => {
      mockClient.fc3.getFunction.mockResolvedValue({
        body: {
          functionConfig: {
            functionName: 'hello-fn',
            memorySize: 256,
            timeout: 30,
            runtime: 'nodejs18',
          },
        },
      });

      await plan({
        location: path.join(fixturesDir, 'serverless-insight-plan.yml'),
        stage: 'dev',
        region: 'cn-hangzhou',
        provider: 'aliyun',
      });

      expect(mockClient.fc3.getFunction).toHaveBeenCalled();
    });
  });

  describe('Multi-Provider Support', () => {
    it('should use Tencent planner for Tencent provider', async () => {
      // The seeded state is aliyun-shaped; this test verifies DISPATCH (the
      // effective provider plans the command), so run against a fresh scope.
      await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
      mockTencentClient.scf.GetFunction.mockResolvedValue(null);
      const template = parse(
        await fs.readFile(path.join(fixturesDir, 'serverless-insight-plan.yml'), 'utf-8'),
      ) as ServerlessIacRaw;
      const { events: _events, ...portable } = template;
      const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'si-plan-provider-'));
      try {
        const location = path.join(directory, 'portable.yml');
        await fs.writeFile(location, stringify(portable));
        await plan({ location, stage: 'dev', region: 'ap-guangzhou', provider: 'tencent' });
      } finally {
        await fs.rm(directory, { recursive: true, force: true });
      }
      // Dispatch proof: the TENCENT client was probed for the function (the
      // aliyun mock was not) — effective provider drives planning (issue #280).
      expect(mockTencentClient.scf.getFunction).toHaveBeenCalledWith('insight-poc-fn');
      expect(mockClient.fc3.getFunction).not.toHaveBeenCalled();
    });
  });

  describe('Plan JSON output (issue #250)', () => {
    const captureStdout = async (run: () => Promise<{ hasChanges: boolean }>) => {
      const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
      try {
        const result = await run();
        const text = stdoutSpy.mock.calls.map((call) => call[0] as string).join('');
        return { result, text };
      } finally {
        stdoutSpy.mockRestore();
      }
    };

    it('emits the versioned plan envelope to stdout', async () => {
      mockClient.fc3.getFunction.mockResolvedValueOnce(null);

      const { result, text } = await captureStdout(() =>
        plan({
          location: path.join(fixturesDir, 'serverless-insight-plan.yml'),
          stage: 'dev',
          region: 'cn-hangzhou',
          provider: 'aliyun',
          json: true,
        }),
      );

      const payload = JSON.parse(text);
      expect(payload.planVersion).toBe(2);
      expect(payload.provider).toBe('aliyun');
      expect(payload.app).toBe('insight-poc-plan-app');
      expect(payload.service).toBe('insight-poc-plan');
      expect(payload.stage).toBe('dev');
      expect(payload.summary.create).toBeGreaterThan(0);
      expect(payload.changes.length).toBe(
        payload.summary.create +
          payload.summary.update +
          payload.summary.destroy +
          payload.summary.recreate,
      );
      const created = payload.changes.find(
        (change: { action: string }) => change.action === 'create',
      );
      expect(created).toBeDefined();
      expect(created.type).toBeDefined();
      expect(Array.isArray(created.attributes)).toBe(true);
      expect(result.hasChanges).toBe(true);
    });

    it('reports confirmed absence with create attribute diffs', async () => {
      mockClient.fc3.getFunction.mockResolvedValueOnce(null);

      const { text } = await captureStdout(() =>
        plan({
          location: path.join(fixturesDir, 'serverless-insight-plan.yml'),
          stage: 'dev',
          region: 'cn-hangzhou',
          provider: 'aliyun',
          json: true,
        }),
      );

      const payload = JSON.parse(text);
      const fnChange = payload.changes.find((change: { logicalId: string }) =>
        change.logicalId.includes('insight_poc_fn'),
      );
      expect(fnChange).toBeDefined();
      expect(fnChange.attributes.length).toBeGreaterThan(0);
    });
  });
});
