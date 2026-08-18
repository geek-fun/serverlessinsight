import { BucketDomain, BucketIam, ResourceAttributes } from '../../types';
import type {
  TosAcl,
  TosBucketInfo,
  TosStorageClass,
  TosWebsiteConfig,
} from '../../common/volcengineClient/types';

export type TosBucketDefinition = {
  bucketName: string;
  acl: TosAcl | null;
  storageClass: TosStorageClass | null;
  websiteConfiguration: TosWebsiteConfig | null;
  websiteCodeHash: string | null;
  iam?: BucketIam;
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
    iam?: BucketIam;
    Tags?: Array<{ Key: string; Value: string }>;
  } = {
    bucketName: bucket.name,
  };

  if (bucket.iam) {
    config.iam = bucket.iam;
  }

  if (bucket.security?.acl) {
    config.acl = aclMap[bucket.security.acl];
  }

  if (bucket.storage?.class) {
    config.storageClass = bucket.storage.class as TosStorageClass;
  }

  if (bucket.website) {
    config.websiteConfig = {
      indexDocument: bucket.website.index,
      errorDocument: bucket.website.index,
    };
  }

  return config;
};

const serializeBucketPolicy = (iam?: BucketIam): string | null => {
  if (!iam?.resource?.statements || iam.resource.statements.length === 0) return null;
  return JSON.stringify(iam);
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
    policy: serializeBucketPolicy(config.iam),
  };
};

export const buildTosInstanceFromProvider = (info: TosBucketInfo, sid: string) => {
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
    Tags: info.Tags ?? null,
    owner: info.owner ?? null,
    projectName: info.projectName ?? null,
    bucketType: info.type ?? null,
    azRedundancy: info.azRedundancy ?? null,
    extranetS3Endpoint: info.extranetS3Endpoint ?? null,
    intranetS3Endpoint: info.intranetS3Endpoint ?? null,
    versioning: info.versioning ?? null,
    crossRegionReplication: info.crossRegionReplication ?? null,
    transferAcceleration: info.transferAcceleration ?? null,
    accessMonitor: info.accessMonitor ?? null,
    serverSideEncryptionConfiguration: info.serverSideEncryptionConfiguration ?? null,
  };
};
