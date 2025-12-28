import { BucketDomain } from '../../types';
import crypto from 'node:crypto';

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
      ErrorDocument: {
        Key: bucket.website.error_page,
      },
    };
  }

  return config;
};

export const computeBucketConfigHash = (config: CosBucketConfig): string => {
  const hashContent = JSON.stringify({
    Bucket: config.Bucket,
    Region: config.Region,
    ACL: config.ACL,
    WebsiteConfiguration: config.WebsiteConfiguration,
  });
  return crypto.createHash('sha256').update(hashContent).digest('hex').substring(0, 16);
};
