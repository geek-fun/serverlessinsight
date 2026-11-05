import { BackendConfig, StateBackendType, BucketStoreBackendConfig } from '../../types';
import { ProviderEnum } from '../providerEnum';
import { MigrationMarkerAction } from '../migrationMarker';
import { lang } from '../../lang';
import { StateBackend } from './types';
import { createLocalStateBackend } from './localStateBackend';
import { createOssStateBackend } from './ossStateBackend';
import { createCosStateBackend } from './cosStateBackend';
import { createSaasStateBackend } from './saasStateBackend';
import { DeploymentScope, canonicalizeRegion } from '../stateScope';
import { getCredentials } from '../credentials';

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
  stage: string;
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
  mode?: 'mutating' | 'read-only';
  storage?: { provider?: string; region?: string };
};

export const createStateBackend = (
  backendConfig: BackendConfig | undefined,
  context: BackendContext,
): StateBackend => {
  const scope: DeploymentScope = {
    provider: context.provider,
    app: context.app,
    service: context.service,
    stage: context.stage,
    region: context.region,
  };

  // SaaS (default) — requires API key
  if (!backendConfig || backendConfig.type === StateBackendType.SAAS) {
    return createSaasStateBackend(
      {
        scope,
        declaredOrg: context.declaredOrg,
      },
      { apiKey: context.siApiKey, mode: context.mode },
    );
  }

  if (backendConfig.type === StateBackendType.LOCAL) {
    return createLocalStateBackend(scope, {
      baseDir: context.baseDir,
      markerAction: context.migrationMarker,
    });
  }

  const bucketConfig = backendConfig as BucketStoreBackendConfig;

  const storage = resolveStateStorage(bucketConfig, context);

  if (storage.provider === ProviderEnum.TENCENT) {
    return createCosStateBackend({
      scope,
      bucket: bucketConfig.bucket,
      key: bucketConfig.key,
      ...storage,
      markerAction: context.migrationMarker,
    });
  }

  return createOssStateBackend({
    scope,
    bucket: bucketConfig.bucket,
    key: bucketConfig.key,
    ...storage,
    markerAction: context.migrationMarker,
  });
};

export const resolveStateStorage = (
  bucketConfig: BucketStoreBackendConfig,
  context: BackendContext,
): {
  provider: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  securityToken?: string;
} => {
  const provider = bucketConfig.storageProvider ?? context.storage?.provider ?? context.provider;
  const region = canonicalizeRegion(
    bucketConfig.storageRegion ?? context.storage?.region ?? context.region,
  );
  if (provider !== ProviderEnum.ALIYUN && provider !== ProviderEnum.TENCENT) {
    throw new Error(lang.__('STATE_STORAGE_PROVIDER_UNSUPPORTED', { provider }));
  }
  const credentials = getCredentials(provider === context.provider ? context : undefined, provider);
  if (!credentials.accessKeyId || !credentials.accessKeySecret) {
    throw new Error(lang.__('STATE_STORAGE_CREDENTIALS_MISSING', { provider }));
  }
  return {
    provider,
    region,
    accessKeyId: credentials.accessKeyId,
    accessKeySecret: credentials.accessKeySecret,
    ...(credentials.securityToken ? { securityToken: credentials.securityToken } : {}),
  };
};
