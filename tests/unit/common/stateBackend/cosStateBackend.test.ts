/* eslint-disable @typescript-eslint/no-require-imports */
import { createCosStateBackend } from '../../../../src/common/stateBackend/cosStateBackend';
import type { RemoteBackendConfig } from '../../../../src/common/stateBackend/remoteStateBackend';
import type { StorageAdapter } from '../../../../src/common/stateBackend/types';
import { ConditionalPutUnsupportedError } from '../../../../src/common/stateBackend/types';

const mockCosClient = {
  getObject: jest.fn(),
  putObject: jest.fn(),
  deleteObject: jest.fn(),
};

jest.mock('cos-nodejs-sdk-v5', () => {
  return jest.fn().mockImplementation(() => mockCosClient);
});

jest.mock('../../../../src/common/stateBackend/remoteStateBackend', () => {
  const actualModule = jest.requireActual('../../../../src/common/stateBackend/remoteStateBackend');
  return {
    ...actualModule,
    createRemoteStateBackend: jest.fn().mockImplementation(() => ({ loadState: jest.fn() })),
  };
});

describe('cosStateBackend (scope-bound, issue #280)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const scope = {
    provider: 'tencent',
    app: 'test-app',
    service: 'test-service',
    stage: 'prod',
    region: 'cn-hangzhou',
  };

  const config = {
    scope,
    bucket: 'test-bucket',
    key: 'state.json',
    region: 'ap-chengdu',
    accessKeyId: 'test-id',
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
    createCosStateBackend(config);
    return { adapter: captured.adapter!, remoteConfig: captured.remoteConfig! };
  };

  it('creates the COS client with credentials and timeout', () => {
    const COS = require('cos-nodejs-sdk-v5');
    createCosStateBackend({ ...config, securityToken: 'test-token' });

    expect(COS).toHaveBeenCalledWith(
      expect.objectContaining({
        SecretId: 'test-id',
        SecretKey: 'test-secret',
        SecurityToken: 'test-token',
        Timeout: expect.any(Number),
      }),
    );
  });

  it('wires the remote backend with the derived scoped key and the legacy discovery key', () => {
    const { remoteConfig } = captureWiring();

    expect(remoteConfig.scope).toEqual(scope);
    expect(remoteConfig.scopedKey).toBe(SCOPED_KEY);
    expect(remoteConfig.legacyKey).toBe('state.json');
  });

  it('exposes the bucket-backed lock path for lock metadata', () => {
    const { adapter } = captureWiring();

    expect(adapter.lockPath).toBe('cos://test-bucket/state.json');
  });

  describe('adapter.read', () => {
    it('parses the stored JSON document', async () => {
      const testData = { app: 'test', version: '1.0' };
      mockCosClient.getObject.mockImplementation(
        (_params: unknown, callback: (err: unknown, data: unknown) => void) => {
          callback(null, { Body: Buffer.from(JSON.stringify(testData)) });
        },
      );
      const { adapter } = captureWiring();

      const result = await adapter.read('state.json');

      expect(result).toEqual(testData);
      expect(mockCosClient.getObject).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Region: 'ap-chengdu',
          Key: 'state.json',
        }),
        expect.any(Function),
      );
    });

    it('maps 404 to null (fresh scope)', async () => {
      mockCosClient.getObject.mockImplementation(
        (_params: unknown, callback: (err: unknown, data: unknown) => void) => {
          callback({ statusCode: 404 }, undefined);
        },
      );
      const { adapter } = captureWiring();

      await expect(adapter.read('nonexistent.json')).resolves.toBeNull();
    });

    it('throws STATE_BUCKET_NOT_FOUND for NoSuchBucket', async () => {
      mockCosClient.getObject.mockImplementation(
        (_params: unknown, callback: (err: unknown, data: unknown) => void) => {
          callback({ code: 'NoSuchBucket' }, undefined);
        },
      );
      const { adapter } = captureWiring();

      await expect(adapter.read('state.json')).rejects.toThrow(/does not exist.*NoSuchBucket/s);
    });

    it('throws STATE_BUCKET_ACCESS_DENIED for 403', async () => {
      mockCosClient.getObject.mockImplementation(
        (_params: unknown, callback: (err: unknown, data: unknown) => void) => {
          callback({ statusCode: 403 }, undefined);
        },
      );
      const { adapter } = captureWiring();

      await expect(adapter.read('state.json')).rejects.toThrow(/denied/s);
    });

    it('propagates unrelated errors on read', async () => {
      mockCosClient.getObject.mockImplementation(
        (_params: unknown, callback: (err: unknown, data: unknown) => void) => {
          callback(new Error('Request timeout'), undefined);
        },
      );
      const { adapter } = captureWiring();

      await expect(adapter.read('state.json')).rejects.toThrow('Request timeout');
    });
  });

  describe('adapter.write', () => {
    it('puts the JSON document as the body', async () => {
      mockCosClient.putObject.mockImplementation(
        (_params: unknown, callback: (err: unknown) => void) => {
          callback(null);
        },
      );
      const { adapter } = captureWiring();
      const data = { app: 'test' };

      await adapter.write('state.json', data);

      const callArgs = mockCosClient.putObject.mock.calls[0][0];
      expect(callArgs.Key).toBe('state.json');
      expect(callArgs.Body).toBe(JSON.stringify(data, null, 2));
      expect(callArgs.Headers).toBeUndefined();
    });
  });

  describe('adapter.putIfAbsent', () => {
    it('creates exclusively via If-None-Match and returns true', async () => {
      mockCosClient.putObject.mockImplementation(
        (_params: unknown, callback: (err: unknown) => void) => {
          callback(null);
        },
      );
      const { adapter } = captureWiring();

      await expect(adapter.putIfAbsent!(SCOPED_KEY, { serial: 1 })).resolves.toBe(true);
      expect(mockCosClient.putObject).toHaveBeenCalledWith(
        expect.objectContaining({
          Key: SCOPED_KEY,
          Headers: { 'If-None-Match': '*' },
        }),
        expect.any(Function),
      );
    });

    it.each([
      ['statusCode 412', { statusCode: 412 }],
      ['statusCode 409', { statusCode: 409 }],
      ['code PreconditionFailed', { code: 'PreconditionFailed' }],
      ['code KeyConflict', { code: 'KeyConflict' }],
    ])('returns false when the object already exists (%s)', async (_label, err) => {
      mockCosClient.putObject.mockImplementation(
        (_params: unknown, callback: (err: unknown) => void) => {
          callback(err);
        },
      );
      const { adapter } = captureWiring();

      await expect(adapter.putIfAbsent!(SCOPED_KEY, { serial: 1 })).resolves.toBe(false);
    });

    it.each([
      ['statusCode 400', { statusCode: 400 }],
      ['statusCode 501', { statusCode: 501 }],
    ])(
      'rejects with ConditionalPutUnsupportedError when the condition cannot be evaluated (%s)',
      async (_label, err) => {
        mockCosClient.putObject.mockImplementation(
          (_params: unknown, callback: (err: unknown) => void) => {
            callback(err);
          },
        );
        const { adapter } = captureWiring();

        await expect(adapter.putIfAbsent!(SCOPED_KEY, { serial: 1 })).rejects.toThrow(
          ConditionalPutUnsupportedError,
        );
      },
    );

    it('propagates unrelated putIfAbsent errors', async () => {
      mockCosClient.putObject.mockImplementation(
        (_params: unknown, callback: (err: unknown) => void) => {
          callback(new Error('Internal error'));
        },
      );
      const { adapter } = captureWiring();

      await expect(adapter.putIfAbsent!(SCOPED_KEY, { serial: 1 })).rejects.toThrow(
        'Internal error',
      );
    });
  });

  describe('adapter.delete', () => {
    it('deletes the object', async () => {
      mockCosClient.deleteObject.mockImplementation(
        (_params: unknown, callback: (err: unknown) => void) => {
          callback(null);
        },
      );
      const { adapter } = captureWiring();

      await adapter.delete('state.json');

      const callArgs = mockCosClient.deleteObject.mock.calls[0][0];
      expect(callArgs.Key).toBe('state.json');
    });

    it('ignores 404 errors on delete', async () => {
      mockCosClient.deleteObject.mockImplementation(
        (_params: unknown, callback: (err: unknown) => void) => {
          callback({ statusCode: 404 });
        },
      );
      const { adapter } = captureWiring();

      await expect(adapter.delete('nonexistent.json')).resolves.toBeUndefined();
    });

    it('propagates non-404 errors on delete', async () => {
      mockCosClient.deleteObject.mockImplementation(
        (_params: unknown, callback: (err: unknown) => void) => {
          callback(new Error('Delete Failed'));
        },
      );
      const { adapter } = captureWiring();

      await expect(adapter.delete('state.json')).rejects.toThrow('Delete Failed');
    });
  });
});
