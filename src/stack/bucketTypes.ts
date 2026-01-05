/**
 * Shared bucket types for OSS and COS providers.
 * Both Aliyun OSS and Tencent COS share similar bucket concepts.
 */

/**
 * Bucket ACL (Access Control List) values.
 * Common across cloud providers.
 */
export enum BucketACL {
  PRIVATE = 'private',
  PUBLIC_READ = 'public-read',
  PUBLIC_READ_WRITE = 'public-read-write',
}

/**
 * Bucket storage class values.
 */
export type BucketStorageClass = 'Standard' | 'IA' | 'Archive' | 'ColdArchive' | string;

/**
 * Data redundancy type for bucket.
 */
export type BucketDataRedundancyType = 'LRS' | 'ZRS';

/**
 * Website configuration for static website hosting.
 */
export type BucketWebsiteConfig = {
  indexDocument: string;
  errorDocument?: string;
};

/**
 * CORS rule configuration.
 */
export type BucketCorsRule = {
  id?: string;
  allowedOrigins?: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
  exposeHeaders?: string[];
  maxAgeSeconds?: number;
};

/**
 * Lifecycle rule configuration.
 */
export type BucketLifecycleRule = {
  id?: string;
  status?: string;
  prefix?: string;
  expiration?: {
    days?: number;
    date?: string;
    expiredObjectDeleteMarker?: boolean;
  };
  transition?: {
    days?: number;
    date?: string;
    storageClass?: string;
  };
};

/**
 * Logging configuration.
 */
export type BucketLoggingConfig = {
  targetBucket?: string;
  targetPrefix?: string;
};

/**
 * Versioning configuration.
 */
export type BucketVersioningConfig = {
  status?: 'Enabled' | 'Suspended';
};

/**
 * Server-side encryption configuration.
 */
export type BucketEncryptionConfig = {
  sseAlgorithm?: 'AES256' | 'KMS';
  kmsMasterKeyId?: string;
  kmsDataEncryption?: 'SM4';
};

/**
 * Bucket owner information.
 */
export type BucketOwner = {
  id?: string;
  displayName?: string;
};

/**
 * Replication rule configuration.
 */
export type BucketReplicationRule = {
  id?: string;
  status?: string;
  prefix?: string;
  destination?: {
    bucket?: string;
    storageClass?: string;
  };
};

/**
 * Tag for bucket.
 */
export type BucketTag = {
  key?: string;
  value?: string;
};

/**
 * Common bucket configuration used for creating/updating buckets.
 */
export type CommonBucketConfig = {
  bucketName: string;
  region?: string;
  acl?: BucketACL;
  storageClass?: BucketStorageClass;
  websiteConfig?: BucketWebsiteConfig;
  domain?: string;
};

/**
 * Common bucket info returned from cloud providers.
 */
export type CommonBucketInfo = {
  name: string;
  location?: string;
  creationDate?: string;
  storageClass?: BucketStorageClass;
  dataRedundancyType?: BucketDataRedundancyType;
  resourceGroupId?: string;
  comment?: string;
  owner?: BucketOwner;
  blockPublicAccess?: boolean;
  accessMonitorStatus?: 'Enabled' | 'Disabled';
  acl?: string;
  websiteConfig?: BucketWebsiteConfig;
  loggingConfig?: BucketLoggingConfig;
  corsRules?: BucketCorsRule[];
  lifecycleRules?: BucketLifecycleRule[];
  versioningConfig?: BucketVersioningConfig;
  encryptionConfig?: BucketEncryptionConfig;
  transferAccelerationStatus?: 'Enabled' | 'Disabled';
  replicationRules?: BucketReplicationRule[];
  tags?: BucketTag[];
};

/**
 * Common bucket instance stored in state.
 */
export type CommonBucketInstance = {
  type: string;
  arn: string;
  id: string;
  bucketName: string;
  location?: string | null;
  creationDate?: string | null;
  storageClass?: string | null;
  dataRedundancyType?: string | null;
  resourceGroupId?: string | null;
  comment?: string | null;
  owner?: {
    id?: string | null;
    displayName?: string | null;
  };
  blockPublicAccess?: boolean | null;
  accessMonitorStatus?: string | null;
  acl?: string | null;
  websiteConfig?: {
    indexDocument?: string | null;
    errorDocument?: string | null;
  };
  loggingConfig?: {
    targetBucket?: string | null;
    targetPrefix?: string | null;
  };
  corsRules?: Array<{
    id?: string | null;
    allowedOrigins?: string[];
    allowedMethods?: string[];
    allowedHeaders?: string[];
    exposeHeaders?: string[];
    maxAgeSeconds?: number | null;
  }>;
  lifecycleRules?: Array<{
    id?: string | null;
    status?: string | null;
    prefix?: string | null;
    expiration?: {
      days?: number | null;
      date?: string | null;
      expiredObjectDeleteMarker?: boolean | null;
    };
    transition?: {
      days?: number | null;
      date?: string | null;
      storageClass?: string | null;
    };
  }>;
  versioningStatus?: string | null;
  encryptionConfig?: {
    sseAlgorithm?: string | null;
    kmsMasterKeyId?: string | null;
    kmsDataEncryption?: string | null;
  };
  transferAccelerationStatus?: string | null;
  replicationRules?: Array<{
    id?: string | null;
    status?: string | null;
    prefix?: string | null;
    destination?: {
      bucket?: string | null;
      storageClass?: string | null;
    };
  }>;
  tags?: Array<{
    key?: string | null;
    value?: string | null;
  }>;
};
