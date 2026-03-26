/* eslint-disable @typescript-eslint/no-require-imports */
import { createOssStateBackend } from '../../../src/common/stateBackend/ossStateBackend';
import type { StorageAdapter } from '../../../src/common/stateBackend/types';

const mockOssClient = {
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

jest.mock('ali-oss', () => {
  return jest.fn().mockImplementation(() => mockOssClient);
});

jest.mock('../../../src/common/stateBackend/remoteStateBackend', () => {
  const actualModule = jest.requireActual('../../../src/common/stateBackend/remoteStateBackend');
  return {
    ...actualModule,
    createRemoteStateBackend: jest.fn().mockImplementation((adapter: StorageAdapter) => ({
      adapter,
      loadState: jest.fn(),
      saveState: jest.fn(),
      acquireLock: jest.fn(),
      releaseLock: jest.fn(),
      forceUnlock: jest.fn(),
      readLock: jest.fn(),
      withLock: jest.fn(),
    })),
  };
});

describe('ossStateBackend', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const config = {
    bucket: 'test-bucket',
    key: 'state.json',
    region: 'cn-hangzhou',
    accessKeyId: 'test-key',
    accessKeySecret: 'test-secret',
  };

  it('should create OSS state backend', () => {
    const backend = createOssStateBackend(config);
    expect(backend).toBeDefined();
  });

  it('should initialize with config parameters', () => {
    const OSS = require('ali-oss');
    createOssStateBackend(config);

    expect(OSS).toHaveBeenCalledWith(
      expect.objectContaining({
        accessKeyId: 'test-key',
        accessKeySecret: 'test-secret',
        bucket: 'test-bucket',
      }),
    );
  });

  it('should include security token when provided', () => {
    const OSS = require('ali-oss');
    const configWithToken = { ...config, securityToken: 'test-token' };
    createOssStateBackend(configWithToken);

    expect(OSS).toHaveBeenCalledWith(
      expect.objectContaining({
        stsToken: 'test-token',
      }),
    );
  });

  it('should return backend with all required methods', () => {
    const backend = createOssStateBackend(config);
    expect(backend).toHaveProperty('loadState');
    expect(backend).toHaveProperty('saveState');
    expect(backend).toHaveProperty('acquireLock');
    expect(backend).toHaveProperty('releaseLock');
    expect(backend).toHaveProperty('forceUnlock');
    expect(backend).toHaveProperty('readLock');
    expect(backend).toHaveProperty('withLock');
  });

  it('should set correct region format', () => {
    const OSS = require('ali-oss');
    jest.clearAllMocks();
    createOssStateBackend(config);

    expect(OSS).toHaveBeenCalledWith(
      expect.objectContaining({
        region: 'oss-cn-hangzhou',
      }),
    );
  });

  it('should read object from OSS bucket', async () => {
    const testData = { app: 'test', version: '1.0' };
    mockOssClient.get.mockResolvedValue({
      content: Buffer.from(JSON.stringify(testData)),
    });

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createOssStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    const result = await capturedAdapter.read('state.json');
    expect(result).toEqual(testData);
    expect(mockOssClient.get).toHaveBeenCalledWith('state.json');
  });

  it('should return null for missing objects', async () => {
    mockOssClient.get.mockRejectedValue({ code: 'NoSuchKey' });

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createOssStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    const result = await capturedAdapter.read('nonexistent.json');
    expect(result).toBeNull();
  });

  it('should write object to OSS bucket', async () => {
    mockOssClient.put.mockResolvedValue(undefined);

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { saveState: jest.fn() };
    });

    createOssStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    const testData = { app: 'test' };
    await capturedAdapter.write('state.json', testData);

    expect(mockOssClient.put).toHaveBeenCalledWith('state.json', expect.any(Buffer));
  });

  it('should delete object from OSS bucket', async () => {
    mockOssClient.delete.mockResolvedValue(undefined);

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createOssStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    await capturedAdapter.delete('state.json');

    expect(mockOssClient.delete).toHaveBeenCalledWith('state.json');
  });

  it('should handle NoSuchBucket error gracefully', async () => {
    mockOssClient.get.mockRejectedValue({ code: 'NoSuchBucket' });

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createOssStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    const result = await capturedAdapter.read('state.json');
    expect(result).toBeNull();
  });

  it('should propagate other errors on read', async () => {
    const testError = new Error('Access Denied');
    mockOssClient.get.mockRejectedValue(testError);

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createOssStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    await expect(capturedAdapter.read('state.json')).rejects.toThrow('Access Denied');
  });
});
