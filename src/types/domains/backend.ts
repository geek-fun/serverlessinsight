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
  region?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
};

export type BackendConfig = LocalBackendConfig | BucketStoreBackendConfig;

export type BackendConfigRaw = {
  type: string;
  bucket?: string;
  key?: string;
  region?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
};
