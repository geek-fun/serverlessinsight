import COS from 'cos-nodejs-sdk-v5';
import { StorageAdapter, StateBackend } from './types';
import { createRemoteStateBackend } from './remoteStateBackend';
import { MigrationMarkerAction } from '../migrationMarker';
import { OSS_STATE_REQUEST_TIMEOUT_MS } from '../constants';
import { lang } from '../../lang';
import type { DeploymentScope } from '../stateScope';

export type CosStorageConfig = {
  bucket: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  lockPath: string;
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
        try {
          classifyCosReadError(err as { statusCode?: number; code?: string });
        } catch (classified) {
          reject(classified);
          return;
        }
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

const classifyCosReadError = (err: { statusCode?: number; code?: string }): void => {
  if (err.code === 'NoSuchBucket') {
    throw new Error(lang.__('STATE_BUCKET_NOT_FOUND', { code: err.code }));
  }
  if (err.statusCode === 403 || err.code === 'AccessDenied') {
    throw new Error(lang.__('STATE_BUCKET_ACCESS_DENIED', { code: err.code ?? 'AccessDenied' }));
  }
};

export const createCosStorageAdapter = (config: CosStorageConfig): StorageAdapter => {
  const cosClient = new COS({
    SecretId: config.accessKeyId,
    SecretKey: config.accessKeySecret,
    SecurityToken: config.securityToken,
    Timeout: OSS_STATE_REQUEST_TIMEOUT_MS,
  });

  return {
    read: async <T>(key: string): Promise<T | null> => {
      try {
        const body = await promisifyGet(cosClient, config.bucket, config.region, key);
        if (!body) return null;
        return JSON.parse(body.toString('utf-8')) as T;
      } catch (err: unknown) {
        classifyCosReadError(err as { statusCode?: number; code?: string });
        throw err;
      }
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

    lockPath: config.lockPath,
  };
};

export const createCosStateBackend = (config: {
  scope: DeploymentScope;
  bucket: string;
  key: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  markerAction?: MigrationMarkerAction;
}): StateBackend => {
  const adapter = createCosStorageAdapter({
    bucket: config.bucket,
    region: config.region,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    securityToken: config.securityToken,
    lockPath: `cos://${config.bucket}/${config.key}`,
  });
  return createRemoteStateBackend(adapter, {
    scope: config.scope,
    key: config.key,
    markerAction: config.markerAction,
  });
};
