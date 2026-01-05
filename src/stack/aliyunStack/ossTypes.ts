import { BucketAccessEnum, BucketDomain, ResourceAttributes } from '../../types';
import { BucketACL, CommonBucketConfig } from '../bucketTypes';

export type OssBucketConfig = CommonBucketConfig;

// Map from domain enum to provider ACL type
const aclMap: Record<BucketAccessEnum, BucketACL> = {
  [BucketAccessEnum.PRIVATE]: BucketACL.PRIVATE,
  [BucketAccessEnum.PUBLIC_READ]: BucketACL.PUBLIC_READ,
  [BucketAccessEnum.PUBLIC_READ_WRITE]: BucketACL.PUBLIC_READ_WRITE,
};

export const bucketToOssBucketConfig = (bucket: BucketDomain): OssBucketConfig => {
  const config: OssBucketConfig = {
    bucketName: bucket.name,
  };

  if (bucket.security?.acl) {
    config.acl = aclMap[bucket.security.acl];
  }

  if (bucket.website) {
    config.websiteConfig = {
      indexDocument: bucket.website.index,
    };

    if (bucket.website.error_page) {
      config.websiteConfig.errorDocument = bucket.website.error_page;
    }
  }

  if (bucket.storage?.class) {
    config.storageClass = bucket.storage.class;
  }

  if (bucket.website?.domain) {
    config.domain = bucket.website.domain;
  }

  return config;
};

export const extractOssBucketDefinition = (config: OssBucketConfig): ResourceAttributes => {
  return {
    bucketName: config.bucketName,
    acl: config.acl ?? null,
    websiteConfiguration: config.websiteConfig
      ? {
          indexDocument: config.websiteConfig.indexDocument,
          errorDocument: config.websiteConfig.errorDocument ?? null,
        }
      : {},
    storageClass: config.storageClass ?? null,
    domain: config.domain ?? null,
  };
};
