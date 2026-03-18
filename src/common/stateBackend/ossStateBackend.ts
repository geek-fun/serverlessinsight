import OSS from 'ali-oss';
import { StateBackend, StorageAdapter } from './types';
import { createRemoteStateBackend } from './remoteStateBackend';
import { OSS_STATE_CONNECT_TIMEOUT_MS, OSS_STATE_REQUEST_TIMEOUT_MS } from '../constants';

type OssBackendConfig = {
  bucket: string;
  key: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
};

const createOssStorageAdapter = (config: OssBackendConfig): StorageAdapter => {
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
        if (err && typeof err === 'object' && 'code' in err) {
          const code = (err as { code: string }).code;
          if (code === 'NoSuchKey' || code === 'NoSuchBucket') {
            return null;
          }
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

    lockPath: `oss://${config.bucket}/${config.key}`,
  };
};

export const createOssStateBackend = (config: OssBackendConfig): StateBackend => {
  const adapter = createOssStorageAdapter(config);
  return createRemoteStateBackend(adapter, { key: config.key });
};
