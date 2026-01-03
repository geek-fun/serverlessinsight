import { Context } from '../../types';
import { CosBucketConfig, CosBucketInfo } from './cosTypes';
import { createTencentCloudClient } from '../../common/scfClient';
import type COS from 'cos-nodejs-sdk-v5';

export const createCosBucket = async (context: Context, config: CosBucketConfig): Promise<void> => {
  const client = createTencentCloudClient(context);

  // Create bucket
  await new Promise<void>((resolve, reject) => {
    client.cos.putBucket(
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
      client.cos.putBucketAcl(
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
      client.cos.putBucketWebsite(
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
  const client = createTencentCloudClient(context);

  try {
    // Check if bucket exists
    await new Promise<COS.HeadBucketResult>((resolve, reject) => {
      client.cos.headBucket(
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
    let accessControlPolicy: CosBucketInfo['AccessControlPolicy'];
    try {
      const aclResult = await new Promise<COS.GetBucketAclResult>((resolve, reject) => {
        client.cos.getBucketAcl(
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
      accessControlPolicy = {
        owner: aclResult.Owner
          ? {
              id: aclResult.Owner.ID,
              displayName: undefined, // Not available in COS SDK
            }
          : undefined,
        grants: aclResult.Grants?.map((g) => ({
          grantee: g.Grantee
            ? {
                type: 'ID' in g.Grantee ? 'CanonicalUser' : 'Group',
                uri: 'URI' in g.Grantee ? g.Grantee.URI : undefined,
                id: 'ID' in g.Grantee ? g.Grantee.ID : undefined,
                displayName: undefined,
              }
            : undefined,
          permission: g.Permission,
        })),
      };
    } catch {
      // ACL might not be accessible due to insufficient permissions
    }

    // Get CORS configuration
    let corsConfiguration: CosBucketInfo['CorsConfiguration'];
    try {
      const corsResult = await new Promise<COS.GetBucketCorsResult>((resolve, reject) => {
        client.cos.getBucketCors(
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
      // CORSRules is Record<string, any> in the SDK type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      corsConfiguration = corsResult.CORSRules?.map((r: any) => ({
        id: r.ID,
        allowedOrigins: r.AllowedOrigin,
        allowedMethods: r.AllowedMethod,
        allowedHeaders: r.AllowedHeader,
        exposeHeaders: r.ExposeHeader,
        maxAgeSeconds: r.MaxAgeSeconds,
      }));
    } catch {
      // CORS might not be configured
    }

    // Get website configuration
    let websiteConfig: CosBucketInfo['WebsiteConfiguration'];
    try {
      const websiteResult = await new Promise<COS.GetBucketWebsiteResult>((resolve, reject) => {
        client.cos.getBucketWebsite(
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
      // Website configuration might not be set
    }

    // Get versioning configuration
    let versioningConfig: CosBucketInfo['VersioningConfiguration'];
    try {
      const versioningResult = await new Promise<COS.GetBucketVersioningResult>(
        (resolve, reject) => {
          client.cos.getBucketVersioning(
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
        },
      );
      versioningConfig = {
        status: versioningResult.VersioningConfiguration?.Status,
      };
    } catch {
      // Versioning might not be accessible
    }

    // Get tagging configuration
    let taggingConfig: CosBucketInfo['TaggingConfiguration'];
    try {
      const taggingResult = await new Promise<COS.GetBucketTaggingResult>((resolve, reject) => {
        client.cos.getBucketTagging(
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
      taggingConfig = {
        tags: taggingResult.Tags?.map((t) => ({
          key: t.Key,
          value: t.Value,
        })),
      };
    } catch {
      // Tagging might not be configured
    }

    return {
      Name: bucketName,
      Location: region,
      ACL: acl,
      WebsiteConfiguration: websiteConfig,
      AccessControlPolicy: accessControlPolicy,
      CorsConfiguration: corsConfiguration,
      VersioningConfiguration: versioningConfig,
      TaggingConfiguration: taggingConfig,
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
  const client = createTencentCloudClient(context);

  await new Promise<void>((resolve, reject) => {
    client.cos.putBucketAcl(
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
  const client = createTencentCloudClient(context);

  await new Promise<void>((resolve, reject) => {
    client.cos.putBucketWebsite(
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
  const client = createTencentCloudClient(context);

  await new Promise<void>((resolve, reject) => {
    client.cos.deleteBucket(
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
