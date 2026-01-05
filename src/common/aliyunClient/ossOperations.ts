import OSS from 'ali-oss';
import fs from 'node:fs';
import path from 'node:path';
import {
  BucketACL,
  CommonBucketInfo,
  BucketWebsiteConfig,
  BucketLoggingConfig,
  BucketCorsRule,
  BucketLifecycleRule,
  BucketOwner,
} from '../../stack/bucketTypes';

export type OssBucketConfig = {
  bucketName: string;
  acl?: BucketACL;
  websiteConfig?: BucketWebsiteConfig;
  storageClass?: string;
};

export type OssBucketInfo = CommonBucketInfo;

type OssSdkClient = OSS;

export const createOssOperations = (ossClient: OssSdkClient, region: string) => {
  const useBucket = (bucketName: string) => {
    ossClient.useBucket(bucketName);
  };

  return {
    createBucket: async (config: OssBucketConfig): Promise<OssBucketInfo> => {
      if (config.storageClass) {
        await ossClient.putBucket(config.bucketName, {
          storageClass: config.storageClass as OSS.StorageType,
        } as OSS.PutBucketOptions);
      } else {
        await ossClient.putBucket(config.bucketName);
      }

      // Set ACL if specified
      if (config.acl) {
        useBucket(config.bucketName);
        await ossClient.putBucketACL(config.bucketName, config.acl);
      }

      // Set website configuration if specified
      if (config.websiteConfig) {
        useBucket(config.bucketName);
        await ossClient.putBucketWebsite(config.bucketName, {
          index: config.websiteConfig.indexDocument,
          error: config.websiteConfig.errorDocument,
        });
      }

      return {
        name: config.bucketName,
        location: `oss-${region}`,
        acl: config.acl,
        websiteConfig: config.websiteConfig,
        storageClass: config.storageClass,
      };
    },

    getBucket: async (bucketName: string): Promise<OssBucketInfo | null> => {
      try {
        useBucket(bucketName);

        // Get bucket info
        const infoResult = await ossClient.getBucketInfo(bucketName);
        const bucket = infoResult.bucket;

        // Get ACL
        let acl: string | undefined;
        try {
          const aclResult = await ossClient.getBucketACL(bucketName);
          acl = aclResult.acl;
        } catch {
          // ACL might not be accessible
        }

        // Get website config
        let websiteConfig: BucketWebsiteConfig | undefined;
        try {
          const websiteResult = await ossClient.getBucketWebsite(bucketName);
          if (websiteResult.index) {
            websiteConfig = {
              indexDocument: websiteResult.index,
              errorDocument: websiteResult.error,
            };
          }
        } catch {
          // Website config might not exist
        }

        // Get logging config
        let loggingConfig: BucketLoggingConfig | undefined;
        try {
          const loggingResult = await ossClient.getBucketLogging(bucketName);
          if (loggingResult.enable && loggingResult.prefix) {
            loggingConfig = {
              targetPrefix: loggingResult.prefix,
            };
          }
        } catch {
          // Logging config might not exist
        }

        // Get CORS rules
        let corsRules: BucketCorsRule[] | undefined;
        try {
          const corsResult = await ossClient.getBucketCORS(bucketName);
          if (corsResult.rules && corsResult.rules.length > 0) {
            corsRules = corsResult.rules.map((rule) => ({
              allowedOrigins: Array.isArray(rule.allowedOrigin)
                ? rule.allowedOrigin
                : [rule.allowedOrigin],
              allowedMethods: Array.isArray(rule.allowedMethod)
                ? rule.allowedMethod
                : [rule.allowedMethod],
              allowedHeaders: rule.allowedHeader
                ? Array.isArray(rule.allowedHeader)
                  ? rule.allowedHeader
                  : [rule.allowedHeader]
                : undefined,
              exposeHeaders: rule.exposeHeader
                ? Array.isArray(rule.exposeHeader)
                  ? rule.exposeHeader
                  : [rule.exposeHeader]
                : undefined,
              maxAgeSeconds:
                typeof rule.maxAgeSeconds === 'number' ? rule.maxAgeSeconds : undefined,
            }));
          }
        } catch {
          // CORS config might not exist
        }

        // Get lifecycle rules
        let lifecycleRules: BucketLifecycleRule[] | undefined;
        try {
          const lifecycleResult = await ossClient.getBucketLifecycle(bucketName);
          if (lifecycleResult.rules && lifecycleResult.rules.length > 0) {
            lifecycleRules = lifecycleResult.rules.map((rule) => ({
              id: rule.id,
              status: rule.status,
              prefix: rule.prefix,
              expiration: rule.days
                ? {
                    days: typeof rule.days === 'number' ? rule.days : parseInt(rule.days, 10),
                  }
                : rule.date
                  ? {
                      date: rule.date,
                    }
                  : undefined,
            }));
          }
        } catch {
          // Lifecycle config might not exist
        }

        // Build owner info
        const owner: BucketOwner | undefined = bucket?.Owner
          ? {
              id: bucket.Owner.ID,
              displayName: bucket.Owner.DisplayName,
            }
          : undefined;

        return {
          name: bucketName,
          location: bucket?.Location,
          creationDate: bucket?.CreationDate,
          storageClass: bucket?.StorageClass,
          dataRedundancyType: bucket?.DataRedundancyType as 'LRS' | 'ZRS' | undefined,
          resourceGroupId: bucket?.ResourceGroupId,
          comment: bucket?.Comment,
          owner,
          blockPublicAccess: bucket?.BlockPublicAccess,
          accessMonitorStatus: bucket?.AccessMonitor as 'Enabled' | 'Disabled' | undefined,
          acl,
          websiteConfig,
          loggingConfig,
          corsRules,
          lifecycleRules,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'NoSuchBucket' || error.code === 'AccessDenied')
        ) {
          return null;
        }
        throw error;
      }
    },

    updateBucketAcl: async (bucketName: string, acl: BucketACL): Promise<void> => {
      useBucket(bucketName);
      await ossClient.putBucketACL(bucketName, acl);
    },

    updateBucketWebsite: async (
      bucketName: string,
      websiteConfig: BucketWebsiteConfig,
    ): Promise<void> => {
      useBucket(bucketName);
      await ossClient.putBucketWebsite(bucketName, {
        index: websiteConfig.indexDocument,
        error: websiteConfig.errorDocument,
      });
    },

    deleteBucketWebsite: async (bucketName: string): Promise<void> => {
      useBucket(bucketName);
      await ossClient.deleteBucketWebsite(bucketName);
    },

    deleteBucket: async (bucketName: string): Promise<void> => {
      useBucket(bucketName);

      // List and delete all objects first
      try {
        let marker: string | undefined;
        do {
          const listResult = await ossClient.list(
            {
              'max-keys': 1000,
              marker,
            },
            {},
          );

          if (listResult.objects && listResult.objects.length > 0) {
            const keys = listResult.objects.map((obj) => obj.name);
            await ossClient.deleteMulti(keys, { quiet: true });
          }

          marker = listResult.isTruncated ? listResult.nextMarker : undefined;
        } while (marker);
      } catch {
        // Ignore errors when listing/deleting objects
      }

      await ossClient.deleteBucket(bucketName);
    },

    uploadFiles: async (bucketName: string, sourcePath: string): Promise<void> => {
      useBucket(bucketName);

      const uploadDirectory = async (dirPath: string, prefix: string = '') => {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dirPath, entry.name);
          const ossKey = prefix ? `${prefix}/${entry.name}` : entry.name;

          if (entry.isDirectory()) {
            await uploadDirectory(fullPath, ossKey);
          } else if (entry.isFile()) {
            await ossClient.put(ossKey, fullPath);
          }
        }
      };

      const stats = fs.statSync(sourcePath);
      if (stats.isDirectory()) {
        await uploadDirectory(sourcePath);
      } else {
        const fileName = path.basename(sourcePath);
        await ossClient.put(fileName, sourcePath);
      }
    },
  };
};
