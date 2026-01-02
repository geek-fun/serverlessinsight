import { Resolvable } from './resolvable';

export type BucketRaw = {
  name: Resolvable<string>;
  storage?: {
    class: Resolvable<string>;
  };
  versioning?: {
    status: Resolvable<string>;
  };

  security?: {
    acl?: Resolvable<string>;
    force_delete?: Resolvable<boolean>;
    sse_algorithm?: Resolvable<string>;
    sse_kms_master_key_id?: Resolvable<string>;
  };
  website?: {
    code: Resolvable<string>;
    domain?: Resolvable<string>;
    index?: Resolvable<string>;
    error_page?: Resolvable<string>;
    error_code?: Resolvable<number>;
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
