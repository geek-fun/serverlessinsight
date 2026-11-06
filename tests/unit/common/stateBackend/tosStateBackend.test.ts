/* eslint-disable @typescript-eslint/no-require-imports */
import { createTosStateBackend } from '../../../../src/common/stateBackend/tosStateBackend';
import type { RemoteBackendConfig } from '../../../../src/common/stateBackend/remoteStateBackend';
import type { StorageAdapter } from '../../../../src/common/stateBackend/types';
import {
  TOS_STATE_CONNECT_TIMEOUT_MS,
  TOS_STATE_REQUEST_TIMEOUT_MS,
} from '../../../../src/common/constants';

const mockTosClient = {
  getObjectV2: jest.fn(),
  putObject: jest.fn(),
  deleteObject: jest.fn(),
};

jest.mock('@volcengine/tos-sdk', () => ({
  TosClient: jest.fn().mockImplementation(() => mockTosClient),
  TosServerCode: {
    NoSuchBucket: 'NoSuchBucket',
    NoSuchKey: 'NoSuchKey',
    AccessDenied: 'AccessDenied',
  },
}));

jest.mock('../../../../src/common/stateBackend/remoteStateBackend', () => {
  const actualModule = jest.requireActual('../../../../src/common/stateBackend/remoteStateBackend');
  return {
    ...actualModule,
    createRemoteStateBackend: jest.fn().mockImplementation(() => ({ loadState: jest.fn() })),
  };
});

describe('tosStateBackend (issue #290)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const scope = {
    provider: 'volcengine',
    app: 'example',
    service: 'api',
    stage: 'prod',
    region: 'cn-beijing',
  };

  const config = {
    scope,
    bucket: 'example-state',
    key: 'infra/state.json',
    region: 'cn-beijing',
    accessKeyId: 'tos-key',
    accessKeySecret: 'tos-secret',
  };

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
    createTosStateBackend(config);
    return { adapter: captured.adapter!, remoteConfig: captured.remoteConfig! };
  };

  it('creates the TOS client with the storage region, HTTPS, bounded timeouts and STS token', () => {
    const { TosClient } = require('@volcengine/tos-sdk');
    createTosStateBackend({ ...config, securityToken: 'sts-token' });

    expect(TosClient).toHaveBeenCalledWith(
      expect.objectContaining({
        accessKeyId: 'tos-key',
        accessKeySecret: 'tos-secret',
        stsToken: 'sts-token',
        region: 'cn-beijing',
        endpoint: 'tos-cn-beijing.volces.com',
        secure: true,
        connectionTimeout: TOS_STATE_CONNECT_TIMEOUT_MS,
        requestTimeout: TOS_STATE_REQUEST_TIMEOUT_MS,
      }),
    );
  });

  it('wires the common remote backend with the exact configured key and marker action', () => {
    const { remoteConfig } = captureWiring();

    expect(remoteConfig.scope).toEqual(scope);
    expect(remoteConfig.key).toBe('infra/state.json');
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
    createTosStateBackend({ ...config, markerAction: 'refuse' });

    expect(captured.remoteConfig!.markerAction).toBe('refuse');
  });

  it('exposes a TOS-backed lock path for lock metadata', () => {
    const { adapter } = captureWiring();

    expect(adapter.lockPath).toBe('tos://example-state/infra/state.json');
  });

  describe('adapter.read', () => {
    it('parses the stored JSON document from a buffered object read', async () => {
      const testData = { app: 'example', version: '4.0' };
      mockTosClient.getObjectV2.mockResolvedValue({
        data: { content: Buffer.from(JSON.stringify(testData)) },
      });
      const { adapter } = captureWiring();

      await expect(adapter.read('infra/state.json')).resolves.toEqual(testData);
      expect(mockTosClient.getObjectV2).toHaveBeenCalledWith({
        bucket: 'example-state',
        key: 'infra/state.json',
        dataType: 'buffer',
      });
    });

    it('maps NoSuchKey to null (confirmed object absence)', async () => {
      mockTosClient.getObjectV2.mockRejectedValue({ code: 'NoSuchKey', statusCode: 404 });
      const { adapter } = captureWiring();

      await expect(adapter.read('infra/state.json')).resolves.toBeNull();
    });

    it('keeps an unqualified 404 as an error instead of empty state', async () => {
      const error = { statusCode: 404 };
      mockTosClient.getObjectV2.mockRejectedValue(error);
      const { adapter } = captureWiring();

      await expect(adapter.read('infra/state.json')).rejects.toBe(error);
    });

    it('throws STATE_BUCKET_NOT_FOUND instead of empty state for NoSuchBucket', async () => {
      mockTosClient.getObjectV2.mockRejectedValue({ code: 'NoSuchBucket', statusCode: 404 });
      const { adapter } = captureWiring();

      await expect(adapter.read('infra/state.json')).rejects.toThrow(
        /does not exist.*NoSuchBucket/s,
      );
    });

    it.each([
      ['AccessDenied code', { code: 'AccessDenied' }],
      ['403 status', { statusCode: 403 }],
    ])('throws STATE_BUCKET_ACCESS_DENIED for %s', async (_label, error) => {
      mockTosClient.getObjectV2.mockRejectedValue(error);
      const { adapter } = captureWiring();

      await expect(adapter.read('infra/state.json')).rejects.toThrow(/denied/s);
    });

    it('propagates network failures instead of treating them as absent state', async () => {
      const error = new Error('socket hang up');
      mockTosClient.getObjectV2.mockRejectedValue(error);
      const { adapter } = captureWiring();

      await expect(adapter.read('infra/state.json')).rejects.toBe(error);
    });

    it('propagates invalid JSON as a SyntaxError for backup recovery', async () => {
      mockTosClient.getObjectV2.mockResolvedValue({
        data: { content: Buffer.from('{broken JSON') },
      });
      const { adapter } = captureWiring();

      await expect(adapter.read('infra/state.json')).rejects.toThrow(SyntaxError);
    });
  });

  describe('adapter.write', () => {
    it('uses an ordinary PUT without conditional-write options', async () => {
      mockTosClient.putObject.mockResolvedValue({});
      const { adapter } = captureWiring();
      const data = { app: 'example' };

      await adapter.write('infra/state.json', data);

      const params = mockTosClient.putObject.mock.calls[0][0];
      expect(params.bucket).toBe('example-state');
      expect(params.key).toBe('infra/state.json');
      expect(params.body.toString('utf-8')).toBe(JSON.stringify(data, null, 2));
      expect(params).not.toHaveProperty('forbidOverwrite');
      expect(params).not.toHaveProperty('headers');
      expect(params).not.toHaveProperty('ifMatch');
    });

    it('propagates failed ordinary writes', async () => {
      const error = new Error('write denied');
      mockTosClient.putObject.mockRejectedValueOnce(error);
      const { adapter } = captureWiring();

      await expect(adapter.write('infra/state.json', {})).rejects.toBe(error);
    });
  });

  describe('adapter.delete', () => {
    it('deletes the object', async () => {
      mockTosClient.deleteObject.mockResolvedValue({});
      const { adapter } = captureWiring();

      await adapter.delete('infra/state.json.si-lock');

      expect(mockTosClient.deleteObject).toHaveBeenCalledWith({
        bucket: 'example-state',
        key: 'infra/state.json.si-lock',
      });
    });

    it.each([
      ['NoSuchKey', { code: 'NoSuchKey', statusCode: 404 }],
      ['unqualified 404', { statusCode: 404 }],
    ])('treats %s as idempotent missing-object deletion', async (_label, error) => {
      mockTosClient.deleteObject.mockRejectedValue(error);
      const { adapter } = captureWiring();

      await expect(adapter.delete('infra/state.json.si-lock')).resolves.toBeUndefined();
    });

    it.each([
      ['NoSuchBucket', { code: 'NoSuchBucket', statusCode: 404 }, /does not exist/s],
      ['AccessDenied', { code: 'AccessDenied', statusCode: 403 }, /denied/s],
      ['network failure', new Error('delete failed'), /delete failed/s],
    ])('keeps %s deletion failures visible', async (_label, error, message) => {
      mockTosClient.deleteObject.mockRejectedValue(error);
      const { adapter } = captureWiring();

      await expect(adapter.delete('infra/state.json.si-lock')).rejects.toThrow(message);
    });
  });
});
