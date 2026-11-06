import { TosClient } from '@volcengine/tos-sdk';

import { createStateBackend, type BackendContext } from '../../src/common/stateBackend';
import { StateBackendType, type BucketStoreBackendConfig } from '../../src/types';

const mockObjects = new Map<string, string>();
const mockTosSdk = {
  getObjectV2: jest.fn(),
  putObject: jest.fn(),
  deleteObject: jest.fn(),
  getBucketVersioning: jest.fn(),
};

jest.mock('@volcengine/tos-sdk', () => ({
  TosClient: jest.fn(() => mockTosSdk),
  TosServerCode: {
    NoSuchBucket: 'NoSuchBucket',
    NoSuchKey: 'NoSuchKey',
    AccessDenied: 'AccessDenied',
  },
}));

const bucketConfig: BucketStoreBackendConfig = {
  type: StateBackendType.BUCKET_STORE,
  bucket: 'example-state',
  key: 'infra/state.json',
};

const stateKey = 'infra/state.json';
const lockKey = 'infra/state.json.si-lock';

/** Original YAML defaults; CLI overrides only change these context fields. */
const baseContext: BackendContext = {
  app: 'example',
  service: 'api',
  stage: 'prod',
  provider: 'volcengine',
  region: 'cn-beijing',
  accessKeyId: 'workload-id',
  accessKeySecret: 'workload-secret',
  securityToken: 'workload-token',
  storage: { provider: 'volcengine', region: 'cn-beijing' },
};

const open = (
  config: BucketStoreBackendConfig = bucketConfig,
  overrides: Partial<BackendContext> = {},
) => createStateBackend(config, { ...baseContext, ...overrides });

const persisted = () => JSON.parse(mockObjects.get(stateKey)!);

describe('TOS Bucket Store state lifecycle (issue #290)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    mockObjects.clear();
    process.env = {
      ...originalEnv,
      VOLCENGINE_ACCESS_KEY_ID: 'tos-env-id',
      VOLCENGINE_SECRET_KEY: 'tos-env-secret',
      VOLCSTACK_SESSION_TOKEN: 'tos-env-token',
    };
    mockTosSdk.getObjectV2.mockImplementation(async ({ key }: { key: string }) => {
      const content = mockObjects.get(key);
      if (content === undefined) throw { code: 'NoSuchKey', statusCode: 404 };
      return { data: { content: Buffer.from(content) } };
    });
    mockTosSdk.putObject.mockImplementation(
      async ({ key, body }: { key: string; body: Buffer }) => {
        mockObjects.set(key, Buffer.from(body).toString('utf-8'));
        return {};
      },
    );
    mockTosSdk.deleteObject.mockImplementation(async ({ key }: { key: string }) => {
      if (!mockObjects.has(key)) throw { code: 'NoSuchKey', statusCode: 404 };
      mockObjects.delete(key);
      return {};
    });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('selects TOS for a volcengine workload and round-trips a V4 aggregate under the exact key', async () => {
    const backend = open();

    expect(TosClient).toHaveBeenCalledWith(
      expect.objectContaining({
        accessKeyId: 'workload-id',
        accessKeySecret: 'workload-secret',
        stsToken: 'workload-token',
        region: 'cn-beijing',
        endpoint: 'tos-cn-beijing.volces.com',
        secure: true,
        requestTimeout: expect.any(Number),
        connectionTimeout: expect.any(Number),
      }),
    );
    expect(backend.scope).toEqual({
      app: 'example',
      service: 'api',
      stage: 'prod',
      provider: 'volcengine',
      region: 'cn-beijing',
    });
    expect(backend.capabilities.conditionalCreate).toBe(false);

    const first = await backend.loadState();
    expect(first.resources).toEqual({});
    await backend.saveState(first);
    expect(persisted().version).toBe('4.0');
    expect(persisted().stages.prod.providers.volcengine.regions['cn-beijing']).toBeDefined();
    expect(mockObjects.has(`${stateKey}.backup`)).toBe(false);

    const second = await backend.loadState();
    expect(second.resources).toEqual({});
    await backend.saveState(second);
    expect(mockObjects.has(`${stateKey}.backup`)).toBe(true);
    expect(persisted().stages.prod.providers.volcengine.regions['cn-beijing'].serial).toBe(2);
  });

  it('honors explicit cross-cloud volcengine storage with temporary STS credentials', () => {
    open(
      { ...bucketConfig, storageProvider: 'volcengine', storageRegion: 'CN-BEIJING' },
      {
        provider: 'aliyun',
        region: 'cn-hangzhou',
        storage: { provider: 'aliyun', region: 'cn-hangzhou' },
      },
    );

    expect(TosClient).toHaveBeenCalledWith(
      expect.objectContaining({
        accessKeyId: 'tos-env-id',
        accessKeySecret: 'tos-env-secret',
        stsToken: 'tos-env-token',
        region: 'cn-beijing',
        secure: true,
      }),
    );
    expect(TosClient).not.toHaveBeenCalledWith(
      expect.objectContaining({ accessKeyId: 'workload-id' }),
    );
  });

  it('keeps the storage location pinned when workload CLI overrides change provider and region', async () => {
    const backend = open(bucketConfig, {
      provider: 'tencent',
      region: 'ap-guangzhou',
      storage: { provider: 'volcengine', region: 'cn-beijing' },
    });

    expect(TosClient).toHaveBeenCalledWith(
      expect.objectContaining({ region: 'cn-beijing', endpoint: 'tos-cn-beijing.volces.com' }),
    );
    expect(backend.scope).toMatchObject({ provider: 'tencent', region: 'ap-guangzhou' });
    await backend.saveState(await backend.loadState());
    expect(persisted().stages.prod.providers.tencent.regions['ap-guangzhou']).toBeDefined();
    expect(persisted().stages.prod.providers.volcengine).toBeUndefined();
  });

  it('fails before mutation when storage credentials are missing', () => {
    process.env = { ...originalEnv };
    delete process.env.VOLCENGINE_ACCESS_KEY_ID;
    delete process.env.VOLCENGINE_SECRET_KEY;
    delete process.env.VOLCENGINE_ACCESS_KEY;
    delete process.env.VOLCSTACK_ACCESS_KEY_ID;

    expect(() =>
      open({ ...bucketConfig, storageProvider: 'volcengine' }, { provider: 'aliyun' }),
    ).toThrow(/State storage needs credentials/);
    expect(mockTosSdk.putObject).not.toHaveBeenCalled();
  });

  it.each([
    [{ code: 'NoSuchBucket', statusCode: 404 }, /does not exist/],
    [{ code: 'AccessDenied', statusCode: 403 }, /denied/],
    [new Error('connection reset'), /connection reset/],
  ])('keeps read failures visible instead of returning empty state', async (error, message) => {
    mockTosSdk.getObjectV2.mockRejectedValue(error);
    const backend = open();

    await expect(backend.loadState()).rejects.toThrow(message);
    expect(mockTosSdk.putObject).not.toHaveBeenCalled();
  });

  it('recovers a corrupt primary from the verified backup', async () => {
    const backend = open();
    await backend.saveState(await backend.loadState());
    const verified = mockObjects.get(stateKey)!;
    await backend.saveState(await backend.loadState());
    mockObjects.set(`${stateKey}.backup`, verified);
    mockObjects.set(stateKey, '{broken JSON');

    const recovered = open();
    expect((await recovered.loadState()).resources).toEqual({});
  });

  it.each(['Disabled', 'Enabled', 'Suspended'])(
    'uses a best-effort shared lock without querying bucket versioning (%s)',
    async () => {
      const backend = open();
      const callback = jest.fn();

      await backend.withLock('deploy', async () => {
        expect((await backend.readLock())?.operation).toBe('deploy');
        await backend.saveState(await backend.loadState());
        callback();
      });

      expect(callback).toHaveBeenCalledTimes(1);
      expect(await backend.readLock()).toBeNull();
      expect(mockObjects.has(lockKey)).toBe(false);
      expect(backend.capabilities.conditionalCreate).toBe(false);
      expect(mockTosSdk.getBucketVersioning).not.toHaveBeenCalled();
      const lockWrites = mockTosSdk.putObject.mock.calls.filter(
        ([params]: [{ key: string }]) => params.key === lockKey,
      );
      expect(lockWrites.length).toBeGreaterThan(0);
      lockWrites.forEach(([params]: [Record<string, unknown>]) => {
        expect(params).not.toHaveProperty('forbidOverwrite');
        expect(params).not.toHaveProperty('headers');
        expect(params).not.toHaveProperty('ifMatch');
      });
    },
  );

  it('supports explicit lock lifecycle, ownership-checked release and force-unlock', async () => {
    const backend = open();
    const lockId = await backend.acquireLock('deploy');
    expect((await backend.readLock())?.id).toBe(lockId);
    await expect(backend.forceUnlock('wrong-id')).rejects.toThrow();

    await backend.releaseLock(lockId);
    expect(await backend.readLock()).toBeNull();

    const nextId = await backend.acquireLock('deploy');
    expect(await backend.forceUnlock(nextId)).toBe(true);
    expect(await backend.forceUnlock(nextId)).toBe(false);
  });

  it('refuses the operation callback when the lock is already held', async () => {
    mockObjects.set(
      lockKey,
      JSON.stringify({
        id: 'other-writer',
        user: 'other@example.com',
        processId: 999999,
        hostname: 'another-host',
        operation: 'deploy',
        acquiredAt: new Date().toISOString(),
        path: `tos://example-state/${stateKey}`,
      }),
    );
    const backend = open();
    const callback = jest.fn();

    await expect(
      backend.withLock('deploy', callback, { timeout: 0, maxRetries: 0, retryDelay: 1 }),
    ).rejects.toThrow();
    expect(callback).not.toHaveBeenCalled();
    expect(mockObjects.has(stateKey)).toBe(false);
  });

  it('propagates ordinary write failures instead of saving a partial state', async () => {
    const backend = open();
    mockTosSdk.putObject.mockImplementation(
      async ({ key, body }: { key: string; body: Buffer }) => {
        if (key === stateKey) throw new Error('write denied');
        mockObjects.set(key, Buffer.from(body).toString('utf-8'));
        return {};
      },
    );

    await expect(backend.saveState(await backend.loadState())).rejects.toThrow('write denied');
    expect(mockObjects.has(lockKey)).toBe(false);
  });

  it('prepares V3 state in place, preserves native IDs and sibling partitions, and patches ownership', async () => {
    const resource = {
      mode: 'managed',
      region: 'cn-beijing',
      definition: {},
      instances: [{ id: 'original-id', sid: 'original-sid' }],
      lastUpdated: '',
    };
    mockObjects.set(
      stateKey,
      JSON.stringify({
        version: '3.0',
        app: 'example',
        service: 'api',
        provider: 'volcengine',
        stages: { prod: { resources: { handler: resource } } },
      }),
    );

    const backend = open();
    expect((await backend.probeWriteReadiness()).ready).toBe(false);
    await backend.upgradeLegacyState!();

    const state = await backend.loadState();
    expect(state.resources.handler).toEqual(resource);
    expect(persisted().version).toBe('4.0');
    expect([...mockObjects.keys()].some((key) => key.includes('.pre-upgrade-'))).toBe(true);

    const sibling = open(bucketConfig, {
      provider: 'aliyun',
      region: 'cn-hangzhou',
      storage: { provider: 'volcengine', region: 'cn-beijing' },
    });
    await sibling.saveState(await sibling.loadState());
    expect(
      persisted().stages.prod.providers.volcengine.regions['cn-beijing'].resources.handler,
    ).toEqual(resource);
    expect(persisted().stages.prod.providers.aliyun.regions['cn-hangzhou']).toBeDefined();

    await backend.patchPersisted!({ managedBy: 'saas' });
    expect(persisted().stages.prod.providers.volcengine.regions['cn-beijing'].managedBy).toBe(
      'saas',
    );
    expect(
      persisted().stages.prod.providers.aliyun.regions['cn-hangzhou'].managedBy,
    ).toBeUndefined();
  });
});
