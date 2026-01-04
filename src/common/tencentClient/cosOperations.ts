import COS from 'cos-nodejs-sdk-v5';
import type {
  HeadBucketResult,
  GetBucketAclResult,
  GetBucketCorsResult,
  GetBucketWebsiteResult,
  GetBucketVersioningResult,
  GetBucketTaggingResult,
} from 'cos-nodejs-sdk-v5';
import { CosBucketConfig, CosBucketInfo } from './types';

type CosSdkClient = COS;

export // COS operations
const createCosOperations = (cosClient: CosSdkClient) => ({
  createBucket: async (config: CosBucketConfig): Promise<void> => {
    // Create bucket
    await new Promise<void>((resolve, reject) => {
      cosClient.putBucket(
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
        cosClient.putBucketAcl(
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
        cosClient.putBucketWebsite(
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
  },

  getBucket: async (bucketName: string, region: string): Promise<CosBucketInfo | null> => {
    try {
      // Check if bucket exists
      await new Promise<HeadBucketResult>((resolve, reject) => {
        cosClient.headBucket(
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
        const aclResult = await new Promise<GetBucketAclResult>((resolve, reject) => {
          cosClient.getBucketAcl(
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
                displayName: undefined,
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
        const corsResult = await new Promise<GetBucketCorsResult>((resolve, reject) => {
          cosClient.getBucketCors(
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
        const websiteResult = await new Promise<GetBucketWebsiteResult>((resolve, reject) => {
          cosClient.getBucketWebsite(
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
        const versioningResult = await new Promise<GetBucketVersioningResult>((resolve, reject) => {
          cosClient.getBucketVersioning(
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
        versioningConfig = {
          status: versioningResult.VersioningConfiguration?.Status,
        };
      } catch {
        // Versioning might not be accessible
      }

      // Get tagging configuration
      let taggingConfig: CosBucketInfo['TaggingConfiguration'];
      try {
        const taggingResult = await new Promise<GetBucketTaggingResult>((resolve, reject) => {
          cosClient.getBucketTagging(
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
  },

  updateBucketAcl: async (
    bucketName: string,
    region: string,
    acl: 'private' | 'public-read' | 'public-read-write',
  ): Promise<void> => {
    await new Promise<void>((resolve, reject) => {
      cosClient.putBucketAcl(
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
  },

  updateBucketWebsite: async (
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
    await new Promise<void>((resolve, reject) => {
      cosClient.putBucketWebsite(
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
  },

  deleteBucket: async (bucketName: string, region: string): Promise<void> => {
    await new Promise<void>((resolve, reject) => {
      cosClient.deleteBucket(
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
  },
});
