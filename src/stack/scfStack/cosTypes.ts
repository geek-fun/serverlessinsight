import { BucketDomain, ResourceAttributes } from '../../types';

export type CosBucketConfig = {
  Bucket: string;
  Region: string;
  ACL?: 'private' | 'public-read' | 'public-read-write';
  WebsiteConfiguration?: {
    IndexDocument: {
      Suffix: string;
    };
    ErrorDocument?: {
      Key: string;
    };
  };
};

export type CosGrantee = {
  type?: string;
  uri?: string;
  id?: string;
  displayName?: string;
};

export type CosGrant = {
  grantee?: CosGrantee;
  permission?: string;
};

export type CosOwner = {
  id?: string;
  displayName?: string;
};

export type CosAccessControlPolicy = {
  owner?: CosOwner;
  grants?: CosGrant[];
};

export type CosCorsRule = {
  id?: string;
  allowedOrigins?: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
  exposeHeaders?: string[];
  maxAgeSeconds?: number;
};

export type CosBucketInfo = {
  Name: string;
  Location: string;
  CreationDate?: string;
  ACL?: string;
  WebsiteConfiguration?: {
    IndexDocument?: {
      Suffix: string;
    };
    ErrorDocument?: {
      Key: string;
    };
  };
  AccessControlPolicy?: CosAccessControlPolicy;
  CorsConfiguration?: CosCorsRule[];
  VersioningConfiguration?: {
    status?: string;
  };
  LifecycleConfiguration?: {
    rules?: Array<{
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
    }>;
  };
  LoggingConfiguration?: {
    targetBucket?: string;
    targetPrefix?: string;
  };
  TaggingConfiguration?: {
    tags?: Array<{
      key?: string;
      value?: string;
    }>;
  };
  ReplicationConfiguration?: {
    role?: string;
    rules?: Array<{
      id?: string;
      status?: string;
      prefix?: string;
      destination?: {
        bucket?: string;
        storageClass?: string;
      };
    }>;
  };
};

export const bucketToCosBucketConfig = (bucket: BucketDomain, region: string): CosBucketConfig => {
  const config: CosBucketConfig = {
    Bucket: bucket.name,
    Region: region,
  };

  if (bucket.security?.acl) {
    const aclMap: Record<string, 'private' | 'public-read' | 'public-read-write'> = {
      PRIVATE: 'private',
      PUBLIC_READ: 'public-read',
      PUBLIC_READ_WRITE: 'public-read-write',
    };
    config.ACL = aclMap[bucket.security.acl];
  }

  if (bucket.website) {
    config.WebsiteConfiguration = {
      IndexDocument: {
        Suffix: bucket.website.index,
      },
    };

    // Only add ErrorDocument if error_page is defined
    if (bucket.website.error_page) {
      config.WebsiteConfiguration.ErrorDocument = {
        Key: bucket.website.error_page,
      };
    }
  }

  return config;
};

export const extractCosBucketDefinition = (config: CosBucketConfig): ResourceAttributes => {
  return {
    bucket: config.Bucket,
    region: config.Region,
    acl: config.ACL ?? null,
    websiteConfiguration: config.WebsiteConfiguration
      ? {
          indexDocument: config.WebsiteConfiguration.IndexDocument.Suffix,
          errorDocument: config.WebsiteConfiguration.ErrorDocument?.Key ?? null,
        }
      : {},
  };
};
