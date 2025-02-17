export type BucketRaw = {
  name: string;
  storage?: {
    class: string;
  };
  versioning?: {
    status: string;
  };

  security?: {
    acl?: string;
    force_delete?: boolean;
    sse_algorithm?: string;
    sse_kms_master_key_id?: string;
  };
  website?: {
    code: string;
    domain?: string;
    index?: string;
    error_page?: string;
    error_code?: number;
  };
};

export enum BucketAccessEnum {
  PRIVATE = 'PRIVATE',
  PUBLIC_READ = 'PUBLIC_READ',
  PUBLIC_READ_WRITE = 'PUBLIC_READ_WRITE',
}

export type BucketDomain = {
  key: string;
  name: string;
  storage?: {
    class: string;
  };
  versioning?: {
    status: string;
  };

  security?: {
    acl: BucketAccessEnum;
    force_delete: boolean;
    sse_algorithm?: string;
    sse_kms_master_key_id?: string;
  };
  website?: {
    index: string;
    domain?: string;
    code: string;
    error_page: string;
    error_code: number;
  };
};
