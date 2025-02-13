import { BucketDomain, BucketRaw } from '../types';

export const parseBucket = (buckets: {
  [key: string]: BucketRaw;
}): Array<BucketDomain> | undefined => {
  if (!buckets) {
    return undefined;
  }
  return Object.entries(buckets).map(([key, bucket]) => ({
    key,
    name: bucket.name,
    storage: bucket.storage,
    versioning: bucket.versioning,
    security: bucket.security
      ? {
          force_delete: bucket.security.force_delete ?? false,
          sse_algorithm: bucket.security.sse_algorithm,
          sse_kms_master_key_id: bucket.security.sse_kms_master_key_id,
        }
      : undefined,

    website: bucket.website
      ? {
          code: bucket.website.code,
          index: bucket.website.index ?? 'index.html',
          error_page: bucket.website.error_page ?? '404.html',
          error_code: bucket.website.error_code ?? 404,
        }
      : undefined,
  }));
};
