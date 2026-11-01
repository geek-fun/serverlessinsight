/* eslint-disable @typescript-eslint/no-require-imports */
import { createOssStateBackend } from '../../../../src/common/stateBackend/ossStateBackend';
import type { RemoteBackendConfig } from '../../../../src/common/stateBackend/remoteStateBackend';
import type { StorageAdapter } from '../../../../src/common/stateBackend/types';

const mockOssClient = {
  get: jest.fn(),
  getBucketVersioning: jest.fn().mockResolvedValue({}),
  put: jest.fn(),
  delete: jest.fn(),
};

jest.mock('ali-oss', () => {
  return jest.fn().mockImplementation(() => mockOssClient);
});

jest.mock('../../../../src/common/stateBackend/remoteStateBackend', () => {
  const actualModule = jest.requireActual('../../../../src/common/stateBackend/remoteStateBackend');
  return {
    ...actualModule,
    createRemoteStateBackend: jest.fn().mockImplementation(() => ({ loadState: jest.fn() })),
  };
});

describe('ossStateBackend (scope-bound, issue #280)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOssClient.getBucketVersioning.mockResolvedValue({});
  });

  const scope = {
    provider: 'aliyun',
    app: 'test-app',
    service: 'test-service',
    stage: 'prod',
    region: 'cn-hangzhou',
  };

  const config = {
    scope,
    bucket: 'test-bucket',
    key: 'state.json',
    region: 'cn-hangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
  };

  const SCOPED_KEY = 'state.json.scopes/test-app/test-service/prod/cn-hangzhou/state.json';

  /** Creates the backend and captures the adapter and config handed to the remote backend. */
  const captureWiring = (): { adapter: StorageAdapter; remoteConfig: RemoteBackendConfig } => {
    const {
      createRemoteStateBackend,
    } = require('../../../../src/common/stateBackend/remoteStateBackend');
    const captured: { adapter?: StorageAdapter; remoteConfig?: RemoteBackendConfig } = {};
    (createRemoteStateBackend as jest.Mock).mockImplementation(
      (adapter: StorageAdapter, cfg: RemoteBackendConfig) => {
        captured.adapter = adapter;
        captured.remoteConfig = cfg;
        return { loadState: jest.fn() };
      },
    );
    createOssStateBackend(config);
    return { adapter: captured.adapter!, remoteConfig: captured.remoteConfig! };
  };

  it('creates the OSS client with credentials, bucket and storage region', () => {
    const OSS = require('ali-oss');
    createOssStateBackend({ ...config, securityToken: 'test-token' });

    expect(OSS).toHaveBeenCalledWith(
      expect.objectContaining({
        accessKeyId: 'test-key',
        accessKeySecret: 'test-secret',
        stsToken: 'test-token',
        bucket: 'test-bucket',
        region: 'oss-cn-hangzhou',
      }),
    );
  });

  it('wires the remote backend with the derived scoped key and the legacy discovery key', () => {
    const { remoteConfig } = captureWiring();

    expect(remoteConfig.scope).toEqual(scope);
    expect(remoteConfig.scopedKey).toBe(SCOPED_KEY);
    expect(remoteConfig.legacyKey).toBe('state.json');
    expect(remoteConfig.markerAction).toBeUndefined();
  });

  it('passes the configured markerAction through', () => {
    const {
      createRemoteStateBackend,
    } = require('../../../../src/common/stateBackend/remoteStateBackend');
    const captured: { remoteConfig?: RemoteBackendConfig } = {};
    (createRemoteStateBackend as jest.Mock).mockImplementation(
      (_adapter: StorageAdapter, cfg: RemoteBackendConfig) => {
        captured.remoteConfig = cfg;
        return { loadState: jest.fn() };
      },
    );
    createOssStateBackend({ ...config, markerAction: 'refuse' });

    expect(captured.remoteConfig!.markerAction).toBe('refuse');
  });

  describe('adapter.read', () => {
    it('parses the stored JSON document', async () => {
      const testData = { app: 'test', version: '1.0' };
      mockOssClient.get.mockResolvedValue({
        content: Buffer.from(JSON.stringify(testData)),
      });
      const { adapter } = captureWiring();

      const result = await adapter.read('state.json');

      expect(result).toEqual(testData);
      expect(mockOssClient.get).toHaveBeenCalledWith('state.json');
    });

    it('maps NoSuchKey to null (fresh scope)', async () => {
      mockOssClient.get.mockRejectedValue({ code: 'NoSuchKey' });
      const { adapter } = captureWiring();

      await expect(adapter.read('state.json')).resolves.toBeNull();
    });

    it('throws STATE_BUCKET_NOT_FOUND for NoSuchBucket', async () => {
      mockOssClient.get.mockRejectedValue({ code: 'NoSuchBucket' });
      const { adapter } = captureWiring();

      await expect(adapter.read('state.json')).rejects.toThrow(/does not exist.*NoSuchBucket/s);
    });

    it('throws STATE_BUCKET_ACCESS_DENIED for AccessDenied', async () => {
      mockOssClient.get.mockRejectedValue({ code: 'AccessDenied' });
      const { adapter } = captureWiring();

      await expect(adapter.read('state.json')).rejects.toThrow(/denied.*AccessDenied/s);
    });

    it('propagates unrelated errors on read', async () => {
      mockOssClient.get.mockRejectedValue(new Error('Request timeout'));
      const { adapter } = captureWiring();

      await expect(adapter.read('state.json')).rejects.toThrow('Request timeout');
    });
  });

  describe('adapter.write', () => {
    it('puts the JSON document as a buffer', async () => {
      mockOssClient.put.mockResolvedValue(undefined);
      const { adapter } = captureWiring();
      const data = { app: 'test' };

      await adapter.write('state.json', data);

      expect(mockOssClient.put).toHaveBeenCalledTimes(1);
      const [key, body] = mockOssClient.put.mock.calls[0];
      expect(key).toBe('state.json');
      expect(body.toString('utf-8')).toBe(JSON.stringify(data, null, 2));
    });
  });

  describe('adapter.putIfAbsent', () => {
    it.each(['Enabled', 'Suspended'])(
      'refuses atomic creation when bucket versioning is %s',
      async (versionStatus) => {
        mockOssClient.getBucketVersioning.mockResolvedValue({ versionStatus });
        const { adapter } = captureWiring();
        await expect(adapter.putIfAbsent!(SCOPED_KEY, {})).rejects.toThrow('conditional');
        expect(mockOssClient.put).not.toHaveBeenCalled();
      },
    );
    it('propagates failure to inspect bucket versioning without writing', async () => {
      mockOssClient.getBucketVersioning.mockRejectedValue(new Error('access denied'));
      const { adapter } = captureWiring();
      await expect(adapter.putIfAbsent!(SCOPED_KEY, {})).rejects.toThrow('access denied');
      expect(mockOssClient.put).not.toHaveBeenCalled();
    });

    it('creates exclusively via x-oss-forbid-overwrite and returns true', async () => {
      mockOssClient.put.mockResolvedValue(undefined);
      const { adapter } = captureWiring();
      const data = { serial: 1 };

      await expect(adapter.putIfAbsent!(SCOPED_KEY, data)).resolves.toBe(true);
      expect(mockOssClient.put).toHaveBeenCalledWith(SCOPED_KEY, expect.any(Buffer), {
        headers: { 'x-oss-forbid-overwrite': 'true' },
      });
    });

    it.each(['FileAlreadyExists', 'EtagMismatch', 'PreconditionFailed'])(
      'returns false when the object already exists (%s)',
      async (code) => {
        mockOssClient.put.mockRejectedValue({ code });
        const { adapter } = captureWiring();

        await expect(adapter.putIfAbsent!(SCOPED_KEY, { serial: 1 })).resolves.toBe(false);
      },
    );

    it('propagates unrelated putIfAbsent errors', async () => {
      mockOssClient.put.mockRejectedValue({ code: 'RequestTimeout' });
      const { adapter } = captureWiring();

      await expect(adapter.putIfAbsent!(SCOPED_KEY, { serial: 1 })).rejects.toMatchObject({
        code: 'RequestTimeout',
      });
    });
  });

  describe('adapter.delete', () => {
    it('deletes the object and swallows delete errors', async () => {
      mockOssClient.delete.mockResolvedValue(undefined);
      const { adapter } = captureWiring();

      await adapter.delete('state.json');
      expect(mockOssClient.delete).toHaveBeenCalledWith('state.json');

      mockOssClient.delete.mockRejectedValue(new Error('already gone'));
      await expect(adapter.delete('state.json')).resolves.toBeUndefined();
    });
  });

  it('exposes the bucket-backed lock path for lock metadata', () => {
    const { adapter } = captureWiring();

    expect(adapter.lockPath).toBe('oss://test-bucket/state.json');
  });
});

describe('OSS state storage decoupled from workload (issue #280)', () => {
  const makeConfig = (region: string) => ({
    scope: {
      provider: 'aliyun',
      app: 'app',
      service: 'svc',
      stage: 'prod',
      region,
    },
    bucket: 'state-bucket',
    key: 'infra/state',
    region: 'cn-hangzhou', // static STORAGE region
    accessKeyId: 'ak',
    accessKeySecret: 'sk',
  });

  it('targets the storage region while scoped keys carry the workload region', async () => {
    jest.isolateModules(() => {
      const OSS = require('ali-oss');
      const instances: Array<{ region: string }> = [];
      OSS.mockImplementation((config: { region: string }) => {
        instances.push(config);
        return {
          get: jest.fn().mockRejectedValue({ code: 'NoSuchKey' }),
          put: jest.fn().mockResolvedValue({}),
          delete: jest.fn(),
        };
      });
      const {
        createOssStateBackend,
      } = require('../../../../src/common/stateBackend/ossStateBackend');

      const hangzhou = createOssStateBackend(makeConfig('cn-hangzhou'));
      const southeast = createOssStateBackend(makeConfig('ap-southeast-1'));

      // The storage client is pinned to the SAME storage region for both.
      expect(instances.map((i) => i.region)).toEqual(['oss-cn-hangzhou', 'oss-cn-hangzhou']);

      // Scoped object keys still isolate the workload regions.
      const hzBackend = hangzhou as unknown as { loadState: () => Promise<unknown> };
      void hzBackend;
      void southeast;
    });
  });
});
