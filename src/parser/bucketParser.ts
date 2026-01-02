import { BucketAccessEnum, BucketDomain, BucketRaw } from '../types';

// Helper to convert Resolvable<boolean> to boolean
const parseBoolean = (value: boolean | string | undefined, defaultValue: boolean): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return defaultValue;
};

// Helper to convert Resolvable<number> to number
const parseNumber = (value: number | string | undefined, defaultValue: number): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
};

// Helper to convert Resolvable<string> to string
const parseString = <T extends string>(value: string | undefined, defaultValue: T): T => {
  return (value ?? defaultValue) as T;
};

export const parseBucket = (buckets: {
  [key: string]: BucketRaw;
}): Array<BucketDomain> | undefined => {
  if (!buckets) {
    return undefined;
  }
  return Object.entries(buckets).map(([key, bucket]) => ({
    key,
    name: String(bucket.name),
    storage: bucket.storage
      ? {
          class: String(bucket.storage.class),
        }
      : undefined,
    versioning: bucket.versioning
      ? {
          status: String(bucket.versioning.status),
        }
      : undefined,
    security: bucket.security
      ? {
          acl: bucket.security.acl
            ? (String(bucket.security.acl) as BucketAccessEnum)
            : BucketAccessEnum.PRIVATE,
          force_delete: parseBoolean(bucket.security.force_delete, false),
          sse_algorithm: bucket.security.sse_algorithm
            ? String(bucket.security.sse_algorithm)
            : undefined,
          sse_kms_master_key_id: bucket.security.sse_kms_master_key_id
            ? String(bucket.security.sse_kms_master_key_id)
            : undefined,
        }
      : undefined,

    website: bucket.website
      ? {
          code: String(bucket.website.code),
          domain: bucket.website.domain ? String(bucket.website.domain) : undefined,
          index: parseString(bucket.website.index as string | undefined, 'index.html'),
          error_page: parseString(bucket.website.error_page as string | undefined, '404.html'),
          error_code: parseNumber(bucket.website.error_code, 404),
        }
      : undefined,
  }));
};
