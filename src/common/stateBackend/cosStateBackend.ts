import COS from 'cos-nodejs-sdk-v5';
import { StateBackend, StorageAdapter } from './types';
import { createRemoteStateBackend } from './remoteStateBackend';
import { OSS_STATE_REQUEST_TIMEOUT_MS } from '../constants';

type CosBackendConfig = {
  bucket: string;
  key: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
};

const promisifyGet = (
  cosClient: COS,
  bucket: string,
  region: string,
  key: string,
): Promise<Buffer | null> => {
  return new Promise((resolve, reject) => {
    cosClient.getObject({ Bucket: bucket, Region: region, Key: key }, (err, data) => {
      if (err) {
        if (err.statusCode === 404) {
          resolve(null);
        } else {
          reject(err);
        }
      } else {
        resolve(data.Body as Buffer);
      }
    });
  });
};

const promisifyPut = (
  cosClient: COS,
  bucket: string,
  region: string,
  key: string,
  body: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    cosClient.putObject({ Bucket: bucket, Region: region, Key: key, Body: body }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const promisifyDelete = (
  cosClient: COS,
  bucket: string,
  region: string,
  key: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    cosClient.deleteObject({ Bucket: bucket, Region: region, Key: key }, (err) => {
      if (err && err.statusCode !== 404) reject(err);
      else resolve();
    });
  });
};

const createCosStorageAdapter = (config: CosBackendConfig): StorageAdapter => {
  const cosClient = new COS({
    SecretId: config.accessKeyId,
    SecretKey: config.accessKeySecret,
    SecurityToken: config.securityToken,
    Timeout: OSS_STATE_REQUEST_TIMEOUT_MS,
  });

  return {
    read: async <T>(key: string): Promise<T | null> => {
      const body = await promisifyGet(cosClient, config.bucket, config.region, key);
      if (!body) return null;
      return JSON.parse(body.toString('utf-8')) as T;
    },

    write: async (key: string, data: unknown): Promise<void> => {
      await promisifyPut(
        cosClient,
        config.bucket,
        config.region,
        key,
        JSON.stringify(data, null, 2),
      );
    },

    delete: async (key: string): Promise<void> => {
      await promisifyDelete(cosClient, config.bucket, config.region, key);
    },

    lockPath: `cos://${config.bucket}/${config.key}`,
  };
};

export const createCosStateBackend = (config: CosBackendConfig): StateBackend => {
  const adapter = createCosStorageAdapter(config);
  return createRemoteStateBackend(adapter, { key: config.key });
};
