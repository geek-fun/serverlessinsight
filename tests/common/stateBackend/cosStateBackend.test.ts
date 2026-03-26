/* eslint-disable @typescript-eslint/no-require-imports */
import { createCosStateBackend } from '../../../src/common/stateBackend/cosStateBackend';
import type { StorageAdapter } from '../../../src/common/stateBackend/types';

const mockCosClient = {
  getObject: jest.fn(),
  putObject: jest.fn(),
  deleteObject: jest.fn(),
};

jest.mock('cos-nodejs-sdk-v5', () => {
  return jest.fn().mockImplementation(() => mockCosClient);
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

describe('cosStateBackend', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const config = {
    bucket: 'test-bucket',
    key: 'state.json',
    region: 'ap-chengdu',
    accessKeyId: 'test-id',
    accessKeySecret: 'test-secret',
  };

  it('should create COS state backend', () => {
    const backend = createCosStateBackend(config);
    expect(backend).toBeDefined();
  });

  it('should initialize with credentials', () => {
    const COS = require('cos-nodejs-sdk-v5');
    createCosStateBackend(config);

    expect(COS).toHaveBeenCalledWith(
      expect.objectContaining({
        SecretId: 'test-id',
        SecretKey: 'test-secret',
      }),
    );
  });

  it('should include security token when provided', () => {
    const COS = require('cos-nodejs-sdk-v5');
    const configWithToken = { ...config, securityToken: 'test-token' };
    createCosStateBackend(configWithToken);

    expect(COS).toHaveBeenCalledWith(
      expect.objectContaining({
        SecurityToken: 'test-token',
      }),
    );
  });

  it('should return backend with all required methods', () => {
    const backend = createCosStateBackend(config);
    expect(backend).toHaveProperty('loadState');
    expect(backend).toHaveProperty('saveState');
    expect(backend).toHaveProperty('acquireLock');
    expect(backend).toHaveProperty('releaseLock');
    expect(backend).toHaveProperty('forceUnlock');
    expect(backend).toHaveProperty('readLock');
    expect(backend).toHaveProperty('withLock');
  });

  it('should configure timeout setting', () => {
    const COS = require('cos-nodejs-sdk-v5');
    createCosStateBackend(config);

    expect(COS).toHaveBeenCalledWith(
      expect.objectContaining({
        Timeout: expect.any(Number),
      }),
    );
  });

  it('should read object from COS bucket', async () => {
    const testData = { app: 'test', version: '1.0' };
    mockCosClient.getObject.mockImplementation(
      ({ _Key }: { _Key: string }, callback: (err: unknown, data: unknown) => void) => {
        callback(null, { Body: Buffer.from(JSON.stringify(testData)) });
      },
    );

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createCosStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    const result = await capturedAdapter.read('state.json');
    expect(result).toEqual(testData);
  });

  it('should return null for 404 on read', async () => {
    mockCosClient.getObject.mockImplementation(
      ({ _Key }: { _Key: string }, callback: (err: unknown, data: unknown) => void) => {
        callback({ statusCode: 404 }, undefined);
      },
    );

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createCosStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    const result = await capturedAdapter.read('nonexistent.json');
    expect(result).toBeNull();
  });

  it('should write object to COS bucket', async () => {
    mockCosClient.putObject.mockImplementation(
      ({ _Key, _Body }: { _Key: string; _Body: string }, callback: (err: unknown) => void) => {
        callback(null);
      },
    );

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { saveState: jest.fn() };
    });

    createCosStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    const testData = { app: 'test' };
    await capturedAdapter.write('state.json', testData);

    expect(mockCosClient.putObject).toHaveBeenCalled();
    const callArgs = mockCosClient.putObject.mock.calls[0][0];
    expect(callArgs.Key).toBe('state.json');
    expect(callArgs.Body).toContain('app');
  });

  it('should delete object from COS bucket', async () => {
    mockCosClient.deleteObject.mockImplementation(
      ({ _Key }: { _Key: string }, callback: (err: unknown) => void) => {
        callback(null);
      },
    );

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createCosStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    await capturedAdapter.delete('state.json');

    expect(mockCosClient.deleteObject).toHaveBeenCalled();
    const callArgs = mockCosClient.deleteObject.mock.calls[0][0];
    expect(callArgs.Key).toBe('state.json');
  });

  it('should ignore 404 errors on delete', async () => {
    mockCosClient.deleteObject.mockImplementation(
      ({ _Key }: { _Key: string }, callback: (err: unknown) => void) => {
        callback({ statusCode: 404 });
      },
    );

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createCosStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    await expect(capturedAdapter.delete('nonexistent.json')).resolves.not.toThrow();
  });

  it('should propagate errors on read', async () => {
    const testError = new Error('Access Denied');
    mockCosClient.getObject.mockImplementation(
      ({ _Key }: { _Key: string }, callback: (err: unknown, data: unknown) => void) => {
        callback(testError, undefined);
      },
    );

    const {
      createRemoteStateBackend,
    } = require('../../../src/common/stateBackend/remoteStateBackend');
    const adapterCapture = jest.fn();
    (createRemoteStateBackend as jest.Mock).mockImplementation((adapter: StorageAdapter) => {
      adapterCapture(adapter);
      return { loadState: jest.fn() };
    });

    createCosStateBackend(config);
    const capturedAdapter = adapterCapture.mock.calls[0][0];

    await expect(capturedAdapter.read('state.json')).rejects.toThrow('Access Denied');
  });
});
