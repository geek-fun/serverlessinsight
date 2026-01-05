import OSS from 'ali-oss';
import fs from 'node:fs';
import path from 'node:path';

export type OssBucketConfig = {
  bucketName: string;
  acl?: 'private' | 'public-read' | 'public-read-write';
  websiteConfig?: {
    indexDocument: string;
    errorDocument?: string;
  };
  storageClass?: string;
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

        // Get ACL
        let acl: string | undefined;
        try {
          const aclResult = await ossClient.getBucketACL(bucketName);
          acl = aclResult.acl;
        } catch {
          // ACL might not be accessible
        }

        // Get website config
        let websiteConfig: { indexDocument?: string; errorDocument?: string } | undefined;
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

        return {
          name: bucketName,
          location: infoResult.bucket?.Location,
          creationDate: infoResult.bucket?.CreationDate,
          acl,
          websiteConfig,
          storageClass: infoResult.bucket?.StorageClass,
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

    updateBucketAcl: async (
      bucketName: string,
      acl: 'private' | 'public-read' | 'public-read-write',
    ): Promise<void> => {
      useBucket(bucketName);
      await ossClient.putBucketACL(bucketName, acl);
    },

    updateBucketWebsite: async (
      bucketName: string,
      websiteConfig: { indexDocument: string; errorDocument?: string },
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
