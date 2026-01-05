import { BucketAccessEnum, BucketDomain, ResourceAttributes } from '../../types';

export type OssBucketConfig = {
  BucketName: string;
  ACL?: 'private' | 'public-read' | 'public-read-write';
  WebsiteConfiguration?: {
    IndexDocument: string;
    ErrorDocument?: string;
  };
  StorageClass?: string;
  Domain?: string;
};

export type OssBucketInfo = {
  name: string;
  location?: string;
  creationDate?: string;
  acl?: string;
  websiteConfig?: {
    indexDocument?: string;
    errorDocument?: string;
  };
  storageClass?: string;
};

const aclMap: Record<BucketAccessEnum, 'private' | 'public-read' | 'public-read-write'> = {
  [BucketAccessEnum.PRIVATE]: 'private',
  [BucketAccessEnum.PUBLIC_READ]: 'public-read',
  [BucketAccessEnum.PUBLIC_READ_WRITE]: 'public-read-write',
};

export const bucketToOssBucketConfig = (bucket: BucketDomain): OssBucketConfig => {
  const config: OssBucketConfig = {
    BucketName: bucket.name,
  };

  if (bucket.security?.acl) {
    config.ACL = aclMap[bucket.security.acl];
  }

  if (bucket.website) {
    config.WebsiteConfiguration = {
      IndexDocument: bucket.website.index,
    };

    if (bucket.website.error_page) {
      config.WebsiteConfiguration.ErrorDocument = bucket.website.error_page;
    }
  }

  if (bucket.storage?.class) {
    config.StorageClass = bucket.storage.class;
  }

  if (bucket.website?.domain) {
    config.Domain = bucket.website.domain;
  }

  return config;
};

export const extractOssBucketDefinition = (config: OssBucketConfig): ResourceAttributes => {
  return {
    bucketName: config.BucketName,
    acl: config.ACL ?? null,
    websiteConfiguration: config.WebsiteConfiguration
      ? {
          indexDocument: config.WebsiteConfiguration.IndexDocument,
          errorDocument: config.WebsiteConfiguration.ErrorDocument ?? null,
        }
      : {},
    storageClass: config.StorageClass ?? null,
    domain: config.Domain ?? null,
  };
};
