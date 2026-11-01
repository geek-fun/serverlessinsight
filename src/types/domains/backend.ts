export enum StateBackendType {
  LOCAL = 'LOCAL',
  BUCKET_STORE = 'BUCKET_STORE',
  SAAS = 'SAAS',
}

export type LocalBackendConfig = {
  type: StateBackendType.LOCAL;
};

export type BucketStoreBackendConfig = {
  type: StateBackendType.BUCKET_STORE;
  bucket: string;
  key: string;
  /**
   * Static state-storage location (issue #280 §3), decoupled from the workload
   * region/provider: explicit values never change when the workload -r/-v
   * changes. When omitted the backend resolves and pins a location from the
   * workload context at first use.
   */
  storageRegion?: string;
  storageProvider?: string;
};

export type SaasBackendConfig = {
  type: StateBackendType.SAAS;
  consoleUrl?: string;
};

export type BackendConfig = LocalBackendConfig | BucketStoreBackendConfig | SaasBackendConfig;

export type StateManagerConfigRaw = {
  type: string;
  bucket?: string;
  key?: string;
  storageRegion?: string;
  storageProvider?: string;
};

export type BackendConfigRaw = {
  state_manager?: StateManagerConfigRaw;
};
