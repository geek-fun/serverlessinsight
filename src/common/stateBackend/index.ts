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
  /**
   * Read-only SaaS resolution (issue #280 §4): 'read-only' backends resolve
   * identity/state without creating deployments or lifecycle records.
   */
  mode?: 'mutating' | 'read-only';
  /**
   * Static state-storage location for BUCKET_STORE backends, decoupled from
   * the workload region/provider (issue #280 §3).
   */
  storage?: { provider?: string; region?: string };
};

/**
 * Bind a state backend ONCE to a resolved deployment scope and a separate
 * storage location (issue #280 §2). Load/save/patch/lock/unlock/events all
 * operate on the bound scope; saves are scope-validated by each backend.
 */
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
  // Static storage location: explicit settings win; when absent, the workload
  // context pins the storage location at backend creation. Explicit settings
  // never change when the workload -r/-v changes.
  const storageRegion = canonicalizeRegion(
    bucketConfig.storageRegion ?? context.storage?.region ?? context.region,
  );
  const storageProvider =
    bucketConfig.storageProvider ?? context.storage?.provider ?? context.provider;
  const credentials = storageCredentials(context, storageProvider);

  if (storageProvider === ProviderEnum.TENCENT) {
    return createCosStateBackend({
      scope,
      bucket: bucketConfig.bucket,
      key: bucketConfig.key,
      region: storageRegion,
      ...credentials,
      markerAction: context.migrationMarker,
    });
  }

  return createOssStateBackend({
    scope,
    bucket: bucketConfig.bucket,
    key: bucketConfig.key,
    region: storageRegion,
    ...credentials,
    markerAction: context.migrationMarker,
  });
};

/**
 * Credential selection for the state-storage client (issue #280 §3): supported
 * runtime credential flows are preserved without adding SaaS account binding;
 * unsupported storage/workload combinations are rejected explicitly instead of
 * silently picking whichever key is present.
 */
const storageCredentials = (
  context: BackendContext,
  storageProvider: string,
): { accessKeyId: string; accessKeySecret: string; securityToken?: string } => {
  if (context.accessKeyId && context.accessKeySecret) {
    return {
      accessKeyId: context.accessKeyId,
      accessKeySecret: context.accessKeySecret,
      ...(context.securityToken ? { securityToken: context.securityToken } : {}),
    };
  }
  // The workload credentials are the only supported storage credentials.
  throw new Error(lang.__('STATE_STORAGE_CREDENTIALS_MISSING', { provider: storageProvider }));
};
