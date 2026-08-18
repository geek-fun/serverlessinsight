import { BackendConfig, StateBackendType, BucketStoreBackendConfig } from '../../types';
import { ProviderEnum } from '../providerEnum';
import { StateBackend } from './types';
import { createLocalStateBackend } from './localStateBackend';
import { createOssStateBackend } from './ossStateBackend';
import { createCosStateBackend } from './cosStateBackend';
import { createSaasStateBackend } from './saasStateBackend';

export * from './types';
export * from './localStateBackend';
export * from './ossStateBackend';
export * from './cosStateBackend';
export * from './remoteStateBackend';
export * from './saasStateBackend';
export * from './lockUtils';

export type BackendContext = {
  provider: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
  baseDir?: string;
  app: string;
  service: string;
  /** Optional: Console API key (flag > env > credentials file) */
  siApiKey?: string;
};

export const createStateBackend = (
  backendConfig: BackendConfig | undefined,
  context: BackendContext,
): StateBackend => {
  // SaaS (default) — requires API key
  if (!backendConfig || backendConfig.type === StateBackendType.SAAS) {
    return createSaasStateBackend({
      app: context.app,
      service: context.service,
    });
  }

  if (backendConfig.type === StateBackendType.LOCAL) {
    return createLocalStateBackend(context.app, context.service, context.baseDir);
  }

  const bucketConfig = backendConfig as BucketStoreBackendConfig;
  const region = context.region;
  const accessKeyId = context.accessKeyId;
  const accessKeySecret = context.accessKeySecret;
  const securityToken = context.securityToken;

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
