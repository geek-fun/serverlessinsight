import { BucketDomain, ResourceAttributes } from '../../types';
import type {
  TosAcl,
  TosStorageClass,
  TosWebsiteConfig,
} from '../../common/volcengineClient/types';

export type TosBucketDefinition = {
  bucketName: string;
  acl: TosAcl | null;
  storageClass: TosStorageClass | null;
  websiteConfiguration: TosWebsiteConfig | null;
  websiteCodeHash: string | null;
};

const aclMap: Record<string, TosAcl> = {
  PRIVATE: 'private',
  PUBLIC_READ: 'public-read',
  PUBLIC_READ_WRITE: 'public-read-write',
};

export const bucketToTosConfig = (bucket: BucketDomain) => {
  const config: {
    bucketName: string;
    acl?: TosAcl;
    storageClass?: TosStorageClass;
    websiteConfig?: TosWebsiteConfig;
  } = {
    bucketName: bucket.name,
  };

  if (bucket.security?.acl) {
    config.acl = aclMap[bucket.security.acl];
  }

  if (bucket.storage?.class) {
    config.storageClass = bucket.storage.class as TosStorageClass;
  }

  if (bucket.website) {
    config.websiteConfig = {
      indexDocument: bucket.website.index,
    };

    if (bucket.website.error_page) {
      config.websiteConfig.errorDocument = bucket.website.error_page;
    }
  }

  return config;
};

export const extractTosBucketDefinition = (
  config: ReturnType<typeof bucketToTosConfig>,
  websiteCodeHash?: string | null,
): ResourceAttributes => {
  return {
    bucketName: config.bucketName,
    acl: config.acl ?? null,
    storageClass: config.storageClass ?? null,
    websiteConfiguration: config.websiteConfig
      ? {
          indexDocument: config.websiteConfig.indexDocument,
          errorDocument: config.websiteConfig.errorDocument ?? null,
        }
      : null,
    websiteCodeHash: websiteCodeHash ?? null,
  };
};

export const buildTosInstanceFromProvider = (
  info: {
    name: string;
    location?: string;
    creationDate?: string;
    storageClass?: TosStorageClass;
    extranetEndpoint?: string;
    intranetEndpoint?: string;
    acl?: TosAcl;
    websiteConfig?: TosWebsiteConfig;
  },
  sid: string,
) => {
  return {
    type: 'VOLCENGINE_TOS_BUCKET',
    sid,
    id: info.name,
    bucketName: info.name,
    location: info.location ?? null,
    creationDate: info.creationDate ?? null,
    storageClass: info.storageClass ?? null,
    extranetEndpoint: info.extranetEndpoint ?? null,
    intranetEndpoint: info.intranetEndpoint ?? null,
    acl: info.acl ?? null,
    websiteConfig: info.websiteConfig
      ? {
          indexDocument: info.websiteConfig.indexDocument ?? null,
          errorDocument: info.websiteConfig.errorDocument ?? null,
        }
      : null,
  };
};
