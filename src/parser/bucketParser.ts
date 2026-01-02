import { BucketAccessEnum, BucketDomain, BucketRaw } from '../types';
import { parseBoolean, parseNumber, parseStringWithDefault } from './parseUtils';

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
          index: parseStringWithDefault(bucket.website.index, 'index.html'),
          error_page: parseStringWithDefault(bucket.website.error_page, '404.html'),
          error_code: parseNumber(bucket.website.error_code, 404),
        }
      : undefined,
  }));
};
