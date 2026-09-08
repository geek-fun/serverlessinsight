import path from 'node:path';
import fs from 'node:fs/promises';
import { deploy } from '../../src/commands/deploy';
import { createMockVolcengineClient, type MockVolcengineClient } from './mockCloudClient';

jest.mock('../../src/common/volcengineClient', () => ({
  createVolcengineClient: jest.fn(),
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
const mockCreateVolcengineClient = require('../../src/common/volcengineClient')
  .createVolcengineClient as jest.Mock;

const STATE_FILE_PATH = path.join(
  process.cwd(),
  '.serverlessinsight',
  'state-insight-volc-app-insight-volc.json',
);

describe('Volcengine TOS live-drift deploy flow (issue #234 phase 2)', () => {
  const fixtureFile = path.join(__dirname, '../fixtures/serverless-insight-volcengine-tos.yml');
  const deployOptions = {
    location: fixtureFile,
    stage: 'default',
    autoApprove: true,
    region: 'cn-beijing',
    provider: 'volcengine',
  };
  let mockClient: MockVolcengineClient;

  const OWNERSHIP_TAGS = [
    { Key: 'si-owned-by', Value: 'insight-volc-app-insight-volc:buckets.static_site' },
  ];

  const remoteBucket = (acl: string, tagged = false) => ({
    name: 'insight-volc-static-bucket',
    acl,
    Tags: tagged ? OWNERSHIP_TAGS : [],
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    mockClient = createMockVolcengineClient();
    mockCreateVolcengineClient.mockReturnValue(mockClient);
    await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
  });

  afterEach(async () => {
    await fs.rm(STATE_FILE_PATH, { force: true }).catch(() => {});
  });

  it('deploys, reconciles a console acl edit on the second deploy, then stays noop', async () => {
    // First deploy: nothing remote yet → create. The planner probe reads null;
    // the executor's post-create state refresh reads the created bucket, which
    // now carries the ownership tag the executor wrote.
    mockClient.tos.getBucket
      .mockResolvedValueOnce(null)
      .mockResolvedValue(remoteBucket('public-read', true));
    await deploy(deployOptions);
    expect(mockClient.tos.createBucket).toHaveBeenCalledTimes(1);
    expect(mockClient.tos.updateBucketAcl).not.toHaveBeenCalled();

    // Second deploy: the console flipped the acl to private while config still
    // declares public-read — live drift must surface and the executor push the
    // configured acl back.
    mockClient.tos.getBucket.mockResolvedValue(remoteBucket('private'));
    await deploy(deployOptions);
    expect(mockClient.tos.updateBucketAcl).toHaveBeenCalledWith(
      'insight-volc-static-bucket',
      'public-read',
    );

    // Third deploy: cloud matches config again → noop, no acl re-push.
    const updateCalls = mockClient.tos.updateBucketAcl.mock.calls.length;
    mockClient.tos.getBucket.mockResolvedValue(remoteBucket('public-read'));
    await deploy(deployOptions);
    expect(mockClient.tos.updateBucketAcl).toHaveBeenCalledTimes(updateCalls);
  });
});
