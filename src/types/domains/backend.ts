export enum StateBackendType {
  LOCAL = 'LOCAL',
  BUCKET_STORE = 'BUCKET_STORE',
}

export type LocalBackendConfig = {
  type: StateBackendType.LOCAL;
};

export type BucketStoreBackendConfig = {
  type: StateBackendType.BUCKET_STORE;
  bucket: string;
  key: string;
};

export type BackendConfig = LocalBackendConfig | BucketStoreBackendConfig;

export type StateManagerConfigRaw = {
  type: string;
  bucket?: string;
  key?: string;
};

export type BackendConfigRaw = {
  state_manager?: StateManagerConfigRaw;
};
