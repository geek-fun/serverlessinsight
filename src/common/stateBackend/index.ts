import { BackendConfig, StateBackendType, BucketStoreBackendConfig } from '../../types';
import { ProviderEnum } from '../providerEnum';
import { MigrationMarkerAction } from '../migrationMarker';
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
  /**
   * Org slug declared as top-level `org:` in the yaml (D-6). Only consumed by
   * the SaaS backend, which hard-fails when it differs from the API key's org;
   * LOCAL/BUCKET_STORE backends ignore it.
   */
  declaredOrg?: string;
  /** Optional: Console API key (flag > env > credentials file) */
  siApiKey?: string;
  /**
   * Migration ownership marker behavior (decision D-4): mutating commands pass
   * 'refuse', read-only commands 'warn'; defaults to 'off'. Ignored by the
   * SaaS backend (Console states carry no legacy marker).
   */
  migrationMarker?: MigrationMarkerAction;
};

export const createStateBackend = (
  backendConfig: BackendConfig | undefined,
  context: BackendContext,
): StateBackend => {
  // SaaS (default) — requires API key
  if (!backendConfig || backendConfig.type === StateBackendType.SAAS) {
    return createSaasStateBackend(
      {
        app: context.app,
        service: context.service,
        declaredOrg: context.declaredOrg,
      },
      { apiKey: context.siApiKey },
    );
  }

  if (backendConfig.type === StateBackendType.LOCAL) {
    return createLocalStateBackend(
      context.app,
      context.service,
      context.baseDir,
      context.migrationMarker,
    );
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
      markerAction: context.migrationMarker,
    });
  }

  return createOssStateBackend({
    bucket: bucketConfig.bucket,
    key: bucketConfig.key,
    region,
    accessKeyId,
    accessKeySecret,
    securityToken,
    markerAction: context.migrationMarker,
  });
};
