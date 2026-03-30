import { Service } from '@volcengine/openapi';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type {
  TosAcl,
  TosBucketConfig,
  TosBucketInfo,
  TosObjectInfo,
  TosWebsiteConfig,
} from './types';
import { logger } from '../logger';
import { lang } from '../../lang';

type TosSdkClient = Service;

const TOS_ACL_VALUES: TosAcl[] = ['private', 'public-read', 'public-read-write'];

const getContentType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mp3': 'audio/mpeg',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
  };
  return contentTypes[ext] || 'application/octet-stream';
};

export const createTosOperations = (client: TosSdkClient | null, _region: string) => {
  return {
    createBucket: async (config: TosBucketConfig): Promise<TosBucketInfo> => {
      if (!client) {
        throw new Error(lang.__('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED'));
      }

      const params: Record<string, unknown> = {
        Bucket: config.bucketName,
      };

      if (config.acl && TOS_ACL_VALUES.includes(config.acl)) {
        params.ACL = config.acl;
      }

      if (config.storageClass) {
        params.StorageClass = config.storageClass;
      }

      await client.fetchOpenAPI({
        Action: 'CreateBucket',
        Version: '2018-08-01',
        method: 'PUT',
        headers: {
          'content-type': 'application/xml',
        },
        query: params,
      });

      logger.info(lang.__('TOS_BUCKET_CREATED', { bucketName: config.bucketName }));

      if (config.websiteConfig) {
        await client.fetchOpenAPI({
          Action: 'PutBucketWebsite',
          Version: '2018-08-01',
          method: 'PUT',
          headers: {
            'content-type': 'application/xml',
          },
          query: {
            Bucket: config.bucketName,
          },
          data: {
            IndexDocument: {
              Suffix: config.websiteConfig.indexDocument,
            },
            ...(config.websiteConfig.errorDocument && {
              ErrorDocument: {
                Key: config.websiteConfig.errorDocument,
              },
            }),
          },
        });
        logger.info(lang.__('TOS_BUCKET_WEBSITE_CONFIGURED', { bucketName: config.bucketName }));
      }

      const bucketInfo = await (async (): Promise<TosBucketInfo> => {
        const response = await client.fetchOpenAPI({
          Action: 'GetBucketInfo',
          Version: '2018-08-01',
          method: 'GET',
          query: {
            Bucket: config.bucketName,
          },
        });

        const result = (response.Result || {}) as Record<string, unknown>;
        const bucketData = (result.BucketInfo || {}) as Record<string, unknown>;

        return {
          name: config.bucketName,
          location: bucketData.Location as string | undefined,
          creationDate: bucketData.CreationDate as string | undefined,
          storageClass: bucketData.StorageClass as TosBucketInfo['storageClass'],
          extranetEndpoint: bucketData.ExtranetEndpoint as string | undefined,
          intranetEndpoint: bucketData.IntranetEndpoint as string | undefined,
          acl: bucketData.ACL as TosAcl | undefined,
        };
      })();

      return bucketInfo;
    },

    getBucket: async (bucketName: string): Promise<TosBucketInfo | null> => {
      if (!client) {
        throw new Error(lang.__('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED'));
      }

      try {
        const response = await client.fetchOpenAPI({
          Action: 'GetBucketInfo',
          Version: '2018-08-01',
          method: 'GET',
          query: {
            Bucket: bucketName,
          },
        });

        const result = (response.Result || {}) as Record<string, unknown>;
        const bucketData = (result.BucketInfo || {}) as Record<string, unknown>;

        let websiteConfig: TosWebsiteConfig | undefined;
        try {
          const websiteResponse = await client.fetchOpenAPI({
            Action: 'GetBucketWebsite',
            Version: '2018-08-01',
            method: 'GET',
            query: {
              Bucket: bucketName,
            },
          });

          const websiteResult = (websiteResponse.Result || {}) as Record<string, unknown>;
          if (websiteResult.IndexDocument) {
            const indexDoc = websiteResult.IndexDocument as Record<string, unknown>;
            websiteConfig = {
              indexDocument: indexDoc.Suffix as string,
            };
            if (websiteResult.ErrorDocument) {
              const errorDoc = websiteResult.ErrorDocument as Record<string, unknown>;
              websiteConfig.errorDocument = errorDoc.Key as string | undefined;
            }
          }
        } catch {
          // Website config may not exist
        }

        return {
          name: bucketName,
          location: bucketData.Location as string | undefined,
          creationDate: bucketData.CreationDate as string | undefined,
          storageClass: bucketData.StorageClass as TosBucketInfo['storageClass'],
          extranetEndpoint: bucketData.ExtranetEndpoint as string | undefined,
          intranetEndpoint: bucketData.IntranetEndpoint as string | undefined,
          acl: bucketData.ACL as TosAcl | undefined,
          websiteConfig,
        };
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'NoSuchBucket' || error.code === 'ResourceNotFound')
        ) {
          return null;
        }
        throw error;
      }
    },

    updateBucketAcl: async (bucketName: string, acl: TosAcl): Promise<void> => {
      if (!client) {
        throw new Error(lang.__('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED'));
      }

      await client.fetchOpenAPI({
        Action: 'PutBucketAcl',
        Version: '2018-08-01',
        method: 'PUT',
        headers: {
          'content-type': 'application/xml',
        },
        query: {
          Bucket: bucketName,
          ACL: acl,
        },
      });

      logger.info(lang.__('TOS_BUCKET_ACL_UPDATED', { bucketName, acl }));
    },

    updateBucketWebsite: async (
      bucketName: string,
      websiteConfig: TosWebsiteConfig,
    ): Promise<void> => {
      if (!client) {
        throw new Error(lang.__('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED'));
      }

      const data: Record<string, unknown> = {
        IndexDocument: {
          Suffix: websiteConfig.indexDocument,
        },
      };

      if (websiteConfig.errorDocument) {
        data.ErrorDocument = {
          Key: websiteConfig.errorDocument,
        };
      }

      await client.fetchOpenAPI({
        Action: 'PutBucketWebsite',
        Version: '2018-08-01',
        method: 'PUT',
        headers: {
          'content-type': 'application/xml',
        },
        query: {
          Bucket: bucketName,
        },
        data,
      });

      logger.info(lang.__('TOS_BUCKET_WEBSITE_UPDATED', { bucketName }));
    },

    deleteBucket: async (bucketName: string): Promise<void> => {
      if (!client) {
        throw new Error(lang.__('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED'));
      }

      try {
        let continuationToken: string | undefined;
        do {
          const listResponse = await client.fetchOpenAPI({
            Action: 'ListObjectsType2',
            Version: '2018-08-01',
            method: 'GET',
            query: {
              Bucket: bucketName,
              'list-type': '2',
              ...(continuationToken && { 'continuation-token': continuationToken }),
            },
          });

          const listResult = (listResponse.Result || {}) as Record<string, unknown>;
          const contents = (listResult.Contents || []) as Array<Record<string, unknown>>;

          if (contents.length > 0) {
            const objects = contents.map((obj) => ({ Key: obj.Key as string }));
            await client.fetchOpenAPI({
              Action: 'DeleteMultipleObjects',
              Version: '2018-08-01',
              method: 'POST',
              headers: {
                'content-type': 'application/xml',
              },
              query: {
                Bucket: bucketName,
              },
              data: {
                Delete: {
                  Object: objects,
                },
              },
            });
          }

          continuationToken = listResult.NextContinuationToken as string | undefined;
        } while (continuationToken);

        await client.fetchOpenAPI({
          Action: 'DeleteBucket',
          Version: '2018-08-01',
          method: 'DELETE',
          query: {
            Bucket: bucketName,
          },
        });

        logger.info(lang.__('TOS_BUCKET_DELETED', { bucketName }));
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error.code === 'NoSuchBucket' || error.code === 'ResourceNotFound')
        ) {
          logger.warn(
            lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Bucket', name: bucketName }),
          );
          return;
        }
        throw error;
      }
    },

    putObject: async (bucket: string, key: string, body: Buffer): Promise<void> => {
      if (!client) {
        throw new Error(lang.__('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED'));
      }

      await client.fetchOpenAPI({
        Action: 'PutObject',
        Version: '2018-08-01',
        method: 'PUT',
        headers: {
          'content-type': getContentType(key),
        },
        query: {
          Bucket: bucket,
          Key: key,
        },
        data: body,
      });
    },

    listObjects: async (bucket: string, prefix?: string): Promise<TosObjectInfo[]> => {
      if (!client) {
        throw new Error(lang.__('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED'));
      }

      const objects: TosObjectInfo[] = [];
      let continuationToken: string | undefined;

      do {
        const response = await client.fetchOpenAPI({
          Action: 'ListObjectsType2',
          Version: '2018-08-01',
          method: 'GET',
          query: {
            Bucket: bucket,
            'list-type': '2',
            ...(prefix && { Prefix: prefix }),
            ...(continuationToken && { 'continuation-token': continuationToken }),
          },
        });

        const result = (response.Result || {}) as Record<string, unknown>;
        const contents = (result.Contents || []) as Array<Record<string, unknown>>;

        for (const obj of contents) {
          objects.push({
            key: obj.Key as string,
            size: obj.Size as number | undefined,
            lastModified: obj.LastModified as string | undefined,
            etag: obj.ETag as string | undefined,
          });
        }

        continuationToken = result.NextContinuationToken as string | undefined;
      } while (continuationToken);

      return objects;
    },

    deleteObjects: async (bucket: string, keys: string[]): Promise<void> => {
      if (!client) {
        throw new Error(lang.__('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED'));
      }

      if (keys.length === 0) return;

      const objects = keys.map((key) => ({ Key: key }));

      await client.fetchOpenAPI({
        Action: 'DeleteMultipleObjects',
        Version: '2018-08-01',
        method: 'POST',
        headers: {
          'content-type': 'application/xml',
        },
        query: {
          Bucket: bucket,
        },
        data: {
          Delete: {
            Object: objects,
          },
        },
      });
    },

    uploadFiles: async (bucketName: string, sourcePath: string): Promise<void> => {
      if (!client) {
        throw new Error(lang.__('VOLCENGINE_TOS_CLIENT_NOT_INITIALIZED'));
      }

      const uploadDirectory = async (dirPath: string, prefix: string = '') => {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dirPath, entry.name);
          const objectKey = prefix ? `${prefix}/${entry.name}` : entry.name;

          if (entry.isDirectory()) {
            await uploadDirectory(fullPath, objectKey);
          } else if (entry.isFile()) {
            const fileContent = fs.readFileSync(fullPath);
            const contentType = getContentType(fullPath);

            await client.fetchOpenAPI({
              Action: 'PutObject',
              Version: '2018-08-01',
              method: 'PUT',
              headers: {
                'content-type': contentType,
              },
              query: {
                Bucket: bucketName,
                Key: objectKey,
              },
              data: fileContent,
            });

            logger.debug(lang.__('TOS_OBJECT_UPLOADED', { bucket: bucketName, key: objectKey }));
          }
        }
      };

      const stats = fs.statSync(sourcePath);
      if (stats.isDirectory()) {
        await uploadDirectory(sourcePath);
      } else {
        const fileName = path.basename(sourcePath);
        const fileContent = fs.readFileSync(sourcePath);
        await client.fetchOpenAPI({
          Action: 'PutObject',
          Version: '2018-08-01',
          method: 'PUT',
          headers: {
            'content-type': getContentType(sourcePath),
          },
          query: {
            Bucket: bucketName,
            Key: fileName,
          },
          data: fileContent,
        });
      }

      logger.info(lang.__('TOS_FILES_UPLOADED', { bucket: bucketName, path: sourcePath }));
    },
  };
};
