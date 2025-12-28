import { Context } from '../../types';
import { CosBucketConfig, CosBucketInfo } from './cosTypes';
import { createCosClient } from '../../common/scfClient';
import type COS from 'cos-nodejs-sdk-v5';

export const createCosBucket = async (context: Context, config: CosBucketConfig): Promise<void> => {
  const client = createCosClient(context);

  // Create bucket
  await new Promise<void>((resolve, reject) => {
    client.putBucket(
      {
        Bucket: config.Bucket,
        Region: config.Region,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });

  // Set ACL if specified
  if (config.ACL) {
    await new Promise<void>((resolve, reject) => {
      client.putBucketAcl(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          ACL: config.ACL,
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  // Set website configuration if specified
  if (config.WebsiteConfiguration) {
    const websiteConfig = config.WebsiteConfiguration;
    await new Promise<void>((resolve, reject) => {
      client.putBucketWebsite(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          WebsiteConfiguration: websiteConfig,
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }
};

export const getCosBucket = async (
  context: Context,
  bucketName: string,
  region: string,
): Promise<CosBucketInfo | null> => {
  const client = createCosClient(context);

  try {
    // Check if bucket exists
    await new Promise<COS.HeadBucketResult>((resolve, reject) => {
      client.headBucket(
        {
          Bucket: bucketName,
          Region: region,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });

    // Get ACL
    let acl: string | undefined;
    try {
      const aclResult = await new Promise<COS.GetBucketAclResult>((resolve, reject) => {
        client.getBucketAcl(
          {
            Bucket: bucketName,
            Region: region,
          },
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          },
        );
      });
      acl = aclResult.ACL;
    } catch {
      // ACL might not be accessible due to insufficient permissions
      // This is expected behavior for some bucket configurations
      // Continue without ACL information
    }

    // Get website configuration
    let websiteConfig: CosBucketInfo['WebsiteConfiguration'];
    try {
      const websiteResult = await new Promise<COS.GetBucketWebsiteResult>((resolve, reject) => {
        client.getBucketWebsite(
          {
            Bucket: bucketName,
            Region: region,
          },
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          },
        );
      });

      if (
        websiteResult.WebsiteConfiguration?.IndexDocument ||
        websiteResult.WebsiteConfiguration?.ErrorDocument
      ) {
        websiteConfig = {
          IndexDocument: websiteResult.WebsiteConfiguration.IndexDocument,
          ErrorDocument: websiteResult.WebsiteConfiguration.ErrorDocument,
        };
      }
    } catch {
      // Website configuration might not be set (buckets without static website hosting)
      // or user may not have permission to read it
      // This is expected behavior - continue without website configuration
    }

    return {
      Name: bucketName,
      Location: region,
      ACL: acl,
      WebsiteConfiguration: websiteConfig,
    };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      const statusCode = (error as { statusCode: number }).statusCode;
      if (statusCode === 404) {
        return null;
      }
    }
    throw error;
  }
};

export const updateCosBucketAcl = async (
  context: Context,
  bucketName: string,
  region: string,
  acl: 'private' | 'public-read' | 'public-read-write',
): Promise<void> => {
  const client = createCosClient(context);

  await new Promise<void>((resolve, reject) => {
    client.putBucketAcl(
      {
        Bucket: bucketName,
        Region: region,
        ACL: acl,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
};

export const updateCosBucketWebsite = async (
  context: Context,
  bucketName: string,
  region: string,
  websiteConfig: {
    IndexDocument: {
      Suffix: string;
    };
    ErrorDocument?: {
      Key: string;
    };
  },
): Promise<void> => {
  const client = createCosClient(context);

  await new Promise<void>((resolve, reject) => {
    client.putBucketWebsite(
      {
        Bucket: bucketName,
        Region: region,
        WebsiteConfiguration: websiteConfig,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
};

export const deleteCosBucket = async (
  context: Context,
  bucketName: string,
  region: string,
): Promise<void> => {
  const client = createCosClient(context);

  await new Promise<void>((resolve, reject) => {
    client.deleteBucket(
      {
        Bucket: bucketName,
        Region: region,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
};
