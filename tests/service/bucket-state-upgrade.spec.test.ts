import { createOssStateBackend } from '../../src/common/stateBackend/ossStateBackend';
import { createCosStateBackend } from '../../src/common/stateBackend/cosStateBackend';
import { createTosStateBackend } from '../../src/common/stateBackend/tosStateBackend';

const mockOssClient = {
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  getBucketVersioning: jest.fn(),
};
const mockCosClient = {
  getObject: jest.fn(),
  putObject: jest.fn(),
  deleteObject: jest.fn(),
  getBucketVersioning: jest.fn(),
};
const mockTosClient = {
  getObjectV2: jest.fn(),
  putObject: jest.fn(),
  deleteObject: jest.fn(),
  getBucketVersioning: jest.fn(),
};

jest.mock('ali-oss', () => jest.fn(() => mockOssClient));
jest.mock('cos-nodejs-sdk-v5', () => jest.fn(() => mockCosClient));
jest.mock('@volcengine/tos-sdk', () => ({
  TosClient: jest.fn(() => mockTosClient),
  TosServerCode: {
    NoSuchBucket: 'NoSuchBucket',
    NoSuchKey: 'NoSuchKey',
    AccessDenied: 'AccessDenied',
  },
}));

const stateKey = 'infra/state.json';
const scope = {
  app: 'example',
  service: 'api',
  stage: 'prod',
  provider: 'aliyun',
  region: 'cn-hangzhou',
};
const mockObjects = new Map<string, string>();

beforeEach(() => {
  jest.clearAllMocks();
  mockObjects.clear();
  mockOssClient.get.mockImplementation(async (key: string) => {
    const content = mockObjects.get(key);
    if (content === undefined) throw { code: 'NoSuchKey' };
    return { content: Buffer.from(content) };
  });
  mockOssClient.put.mockImplementation(async (key: string, content: Buffer) => {
    mockObjects.set(key, content.toString('utf-8'));
  });
  mockOssClient.delete.mockImplementation(async (key: string) => {
    mockObjects.delete(key);
  });
  mockCosClient.getObject.mockImplementation((params, callback) => {
    const content = mockObjects.get(params.Key);
    if (content === undefined) callback({ statusCode: 404, code: 'NoSuchKey' });
    else callback(null, { Body: Buffer.from(content) });
  });
  mockCosClient.putObject.mockImplementation((params, callback) => {
    mockObjects.set(params.Key, params.Body);
    callback(null, {});
  });
  mockCosClient.deleteObject.mockImplementation((params, callback) => {
    mockObjects.delete(params.Key);
    callback(null, {});
  });
  mockTosClient.getObjectV2.mockImplementation(async ({ key }: { key: string }) => {
    const content = mockObjects.get(key);
    if (content === undefined) throw { code: 'NoSuchKey', statusCode: 404 };
    return { data: { content: Buffer.from(content) } };
  });
  mockTosClient.putObject.mockImplementation(
    async ({ key, body }: { key: string; body: Buffer }) => {
      mockObjects.set(key, Buffer.from(body).toString('utf-8'));
      return {};
    },
  );
  mockTosClient.deleteObject.mockImplementation(async ({ key }: { key: string }) => {
    if (!mockObjects.has(key)) throw { code: 'NoSuchKey', statusCode: 404 };
    mockObjects.delete(key);
    return {};
  });
});

describe.each([
  ['OSS', createOssStateBackend, 'cn-hangzhou'],
  ['COS', createCosStateBackend, 'ap-guangzhou'],
  ['TOS', createTosStateBackend, 'cn-beijing'],
] as const)('%s Bucket state compatibility', (_provider, createBackend, storageRegion) => {
  it.each(['Disabled', 'Enabled', 'Suspended'])(
    'upgrades and writes the original state key with versioning %s',
    async (versionStatus) => {
      mockOssClient.getBucketVersioning.mockResolvedValue({ versionStatus });
      mockCosClient.getBucketVersioning.mockImplementation((_params, callback) => {
        callback(null, {
          VersioningConfiguration: { Status: versionStatus === 'Disabled' ? '' : versionStatus },
        });
      });
      mockTosClient.getBucketVersioning.mockResolvedValue({ Status: versionStatus });
      const resource = {
        mode: 'managed',
        region: scope.region,
        definition: {},
        instances: [{ id: 'original-id', sid: 'original-sid' }],
        lastUpdated: '',
      };
      mockObjects.set(
        stateKey,
        JSON.stringify({
          version: '3.0',
          app: scope.app,
          service: scope.service,
          provider: scope.provider,
          stages: { prod: { resources: { handler: resource } } },
        }),
      );
      const backend = createBackend({
        scope,
        bucket: 'example-state',
        key: stateKey,
        region: storageRegion,
        accessKeyId: 'test-key',
        accessKeySecret: 'test-secret',
      });

      await backend.upgradeLegacyState!();
      const state = await backend.loadState();
      expect(state.resources.handler).toEqual(resource);
      await backend.withLock('deploy', async () => {
        expect((await backend.readLock())?.operation).toBe('deploy');
        await backend.saveState(state);
      });
      await backend.patchPersisted!({ managedBy: 'saas' });

      const persisted = JSON.parse(mockObjects.get(stateKey)!);
      const partition = persisted.stages.prod.providers.aliyun.regions['cn-hangzhou'];
      expect(persisted.version).toBe('4.0');
      expect(partition.resources.handler).toEqual(resource);
      expect(partition.managedBy).toBe('saas');
      expect(await backend.readLock()).toBeNull();
      expect(backend.capabilities.conditionalCreate).toBe(false);
      expect(mockOssClient.getBucketVersioning).not.toHaveBeenCalled();
      expect(mockCosClient.getBucketVersioning).not.toHaveBeenCalled();
      expect(mockTosClient.getBucketVersioning).not.toHaveBeenCalled();
      mockOssClient.put.mock.calls.forEach((call) => expect(call).toHaveLength(2));
      mockCosClient.putObject.mock.calls.forEach(([params]) => {
        expect(params).not.toHaveProperty('Headers');
      });
      mockTosClient.putObject.mock.calls.forEach(([params]) => {
        expect(params).not.toHaveProperty('Headers');
        expect(params).not.toHaveProperty('headers');
        expect(params).not.toHaveProperty('forbidOverwrite');
      });
    },
  );
});
