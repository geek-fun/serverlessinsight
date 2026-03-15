import { BackendConfig, StateBackendType, BucketStoreBackendConfig } from '../../types';
import { ProviderEnum } from '../providerEnum';
import { StateBackend } from './types';
import { createLocalStateBackend } from './localStateBackend';
import { createOssStateBackend } from './ossStateBackend';
import { createCosStateBackend } from './cosStateBackend';

export * from './types';
export * from './localStateBackend';
export * from './ossStateBackend';
export * from './cosStateBackend';

type BackendContext = {
  provider: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  baseDir?: string;
};

export const createStateBackend = (
  backendConfig: BackendConfig | undefined,
  context: BackendContext,
): StateBackend => {
  if (!backendConfig || backendConfig.type === StateBackendType.LOCAL) {
    return createLocalStateBackend(context.baseDir);
  }

  const bucketConfig = backendConfig as BucketStoreBackendConfig;
  const region = bucketConfig.region ?? context.region;
  const accessKeyId = bucketConfig.accessKeyId ?? context.accessKeyId;
  const accessKeySecret = bucketConfig.accessKeySecret ?? context.accessKeySecret;
  const securityToken = bucketConfig.securityToken ?? context.securityToken;

  if (context.provider === ProviderEnum.TENCENT) {
    return createCosStateBackend({
      bucket: bucketConfig.bucket,
      key: bucketConfig.key,
      region,
      accessKeyId,
      accessKeySecret,
      securityToken,
    });
  }

  return createOssStateBackend({
    bucket: bucketConfig.bucket,
    key: bucketConfig.key,
    region,
    accessKeyId,
    accessKeySecret,
    securityToken,
  });
};
