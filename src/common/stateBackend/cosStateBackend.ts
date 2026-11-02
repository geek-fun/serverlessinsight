import COS from 'cos-nodejs-sdk-v5';
import { StorageAdapter, ConditionalPutUnsupportedError, StateBackend } from './types';
import { createRemoteStateBackend } from './remoteStateBackend';
import { MigrationMarkerAction } from '../migrationMarker';
import { OSS_STATE_REQUEST_TIMEOUT_MS } from '../constants';
import { lang } from '../../lang';
import type { DeploymentScope } from '../stateScope';
import { buildScopedObjectKey } from '../stateScope';

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

const promisifyPutIfAbsent = (
  cosClient: COS,
  bucket: string,
  region: string,
  key: string,
  body: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    cosClient.putObject(
      {
        Bucket: bucket,
        Region: region,
        Key: key,
        Body: body,
        Headers: { 'x-cos-forbid-overwrite': 'true' },
      },
      (err) => {
        if (err) {
          const code = (err as { code?: string }).code ?? '';
          if (
            err.statusCode === 412 ||
            code === 'PreconditionFailed' ||
            code === 'KeyConflict' ||
            err.statusCode === 409
          ) {
            resolve(false);
            return;
          }

          if (err.statusCode === 400 || err.statusCode === 501) {
            reject(new ConditionalPutUnsupportedError(err));
            return;
          }
          reject(err);
        } else {
          resolve(true);
        }
      },
    );
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
    list: async (prefix: string): Promise<string[]> => {
      const page = async (marker?: string): Promise<string[]> => {
        const result = await new Promise<COS.GetBucketResult>((resolve, reject) => {
          cosClient.getBucket(
            {
              Bucket: config.bucket,
              Region: config.region,
              Prefix: prefix,
              Marker: marker,
              MaxKeys: 1000,
            },
            (error, data) => (error ? reject(error) : resolve(data)),
          );
        });
        const keys = (result.Contents ?? []).map((object) => object.Key);
        if (result.IsTruncated !== 'true') return keys;
        if (!result.NextMarker || result.NextMarker === marker) {
          throw new Error(lang.__('STATE_STORAGE_LIST_INCOMPLETE'));
        }
        return [...keys, ...(await page(result.NextMarker))];
      };
      return page();
    },
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

    /** COS only honors forbid-overwrite on buckets that never enabled versioning. */
    putIfAbsent: async (key: string, data: unknown): Promise<boolean> => {
      const versioning = await new Promise<COS.GetBucketVersioningResult>((resolve, reject) => {
        cosClient.getBucketVersioning(
          { Bucket: config.bucket, Region: config.region },
          (error, data) => {
            if (error) reject(error);
            else resolve(data);
          },
        );
      });
      if (versioning.VersioningConfiguration.Status) {
        throw new ConditionalPutUnsupportedError('bucket versioning disables exclusive creation');
      }
      return promisifyPutIfAbsent(
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
  const scopedKey = buildScopedObjectKey(
    config.key,
    config.scope.app,
    config.scope.service,
    config.scope.stage,
    config.scope.region,
  );
  return createRemoteStateBackend(adapter, {
    scope: config.scope,
    scopedKey,
    legacyKey: config.key,
    markerAction: config.markerAction,
  });
};
