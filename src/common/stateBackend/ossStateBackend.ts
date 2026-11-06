import OSS from 'ali-oss';
import { StorageAdapter, StateBackend } from './types';
import { createRemoteStateBackend } from './remoteStateBackend';
import { MigrationMarkerAction } from '../migrationMarker';
import { OSS_STATE_CONNECT_TIMEOUT_MS, OSS_STATE_REQUEST_TIMEOUT_MS } from '../constants';
import { lang } from '../../lang';
import type { DeploymentScope } from '../stateScope';

export type OssStorageConfig = {
  bucket: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  lockPath: string;
};

const isObjectAbsent = (err: unknown): boolean => {
  if (err && typeof err === 'object' && 'code' in err) {
    return (err as { code: string }).code === 'NoSuchKey';
  }
  return false;
};

const assertNotFatalAbsence = (err: unknown): void => {
  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code: string }).code;
    if (code === 'NoSuchBucket') {
      throw new Error(lang.__('STATE_BUCKET_NOT_FOUND', { code }));
    }
    if (code === 'AccessDenied') {
      throw new Error(lang.__('STATE_BUCKET_ACCESS_DENIED', { code }));
    }
  }
};

export const createOssStorageAdapter = (config: OssStorageConfig): StorageAdapter => {
  const ossClient = new OSS({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    region: `oss-${config.region}`,
    bucket: config.bucket,
    stsToken: config.securityToken,
    timeout: OSS_STATE_REQUEST_TIMEOUT_MS,
    connectTimeout: OSS_STATE_CONNECT_TIMEOUT_MS,
  } as OSS.Options);

  return {
    read: async <T>(key: string): Promise<T | null> => {
      try {
        const result = await ossClient.get(key);
        const content = result.content.toString('utf-8');
        return JSON.parse(content) as T;
      } catch (err: unknown) {
        assertNotFatalAbsence(err);
        if (isObjectAbsent(err)) {
          return null;
        }
        throw err;
      }
    },

    write: async (key: string, data: unknown): Promise<void> => {
      const content = JSON.stringify(data, null, 2);
      await ossClient.put(key, Buffer.from(content, 'utf-8'));
    },

    delete: async (key: string): Promise<void> => {
      try {
        await ossClient.delete(key);
      } catch {
        // noop
      }
    },

    lockPath: config.lockPath,
  };
};

export const createOssStateBackend = (config: {
  scope: DeploymentScope;
  bucket: string;
  key: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  markerAction?: MigrationMarkerAction;
}): StateBackend => {
  const adapter = createOssStorageAdapter({
    bucket: config.bucket,
    region: config.region,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    securityToken: config.securityToken,
    lockPath: `oss://${config.bucket}/${config.key}`,
  });
  return createRemoteStateBackend(adapter, {
    scope: config.scope,
    key: config.key,
    markerAction: config.markerAction,
  });
};
