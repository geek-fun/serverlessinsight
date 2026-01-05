import { createAliyunClient } from '../../common/aliyunClient';
import { setResource, removeResource } from '../../common';
import { Context, BucketDomain, ResourceState, StateFile } from '../../types';
import { bucketToOssBucketConfig, extractOssBucketDefinition, OssBucketInfo } from './ossTypes';
import path from 'node:path';

const buildOssInstanceFromProvider = (info: OssBucketInfo, arn: string) => {
  return {
    type: 'ALIYUN_OSS_BUCKET',
    arn,
    id: info.name,
    bucketName: info.name,
    location: info.location ?? null,
    creationDate: info.creationDate ?? null,
    acl: info.acl ?? null,
    websiteConfig: info.websiteConfig
      ? {
          indexDocument: info.websiteConfig.indexDocument ?? null,
          errorDocument: info.websiteConfig.errorDocument ?? null,
        }
      : {},
    storageClass: info.storageClass ?? null,
  };
};

export const createBucketResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToOssBucketConfig(bucket);
  const client = createAliyunClient(context);

  await client.oss.createBucket({
    bucketName: config.BucketName,
    acl: config.ACL,
    websiteConfig: config.WebsiteConfiguration
      ? {
          indexDocument: config.WebsiteConfiguration.IndexDocument,
          errorDocument: config.WebsiteConfiguration.ErrorDocument,
        }
      : undefined,
    storageClass: config.StorageClass,
  });

  // Upload static files if code path is specified
  if (bucket.website?.code) {
    const codePath = path.resolve(process.cwd(), bucket.website.code);
    await client.oss.uploadFiles(config.BucketName, codePath);
  }

  // Refresh state from provider to get all attributes
  const bucketInfo = await client.oss.getBucket(config.BucketName);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${config.BucketName}`);
  }

  const definition = extractOssBucketDefinition(config);
  const arn = `arn:acs:oss:${context.region}:${context.accountId}:${config.BucketName}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildOssInstanceFromProvider(bucketInfo as OssBucketInfo, arn)],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `buckets.${bucket.key}`;
  return setResource(state, logicalId, resourceState);
};

export const readBucketResource = async (context: Context, bucketName: string) => {
  const client = createAliyunClient(context);
  return await client.oss.getBucket(bucketName);
};

export const updateBucketResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToOssBucketConfig(bucket);
  const client = createAliyunClient(context);

  // Update ACL if specified
  if (config.ACL) {
    await client.oss.updateBucketAcl(config.BucketName, config.ACL);
  }

  // Update website configuration if specified
  if (config.WebsiteConfiguration) {
    await client.oss.updateBucketWebsite(config.BucketName, {
      indexDocument: config.WebsiteConfiguration.IndexDocument,
      errorDocument: config.WebsiteConfiguration.ErrorDocument,
    });
  }

  // Upload static files if code path is specified
  if (bucket.website?.code) {
    const codePath = path.resolve(process.cwd(), bucket.website.code);
    await client.oss.uploadFiles(config.BucketName, codePath);
  }

  // Refresh state from provider to get all attributes
  const bucketInfo = await client.oss.getBucket(config.BucketName);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${config.BucketName}`);
  }

  const definition = extractOssBucketDefinition(config);
  const arn = `arn:acs:oss:${context.region}:${context.accountId}:${config.BucketName}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildOssInstanceFromProvider(bucketInfo as OssBucketInfo, arn)],
    lastUpdated: new Date().toISOString(),
  };

  const logicalId = `buckets.${bucket.key}`;
  return setResource(state, logicalId, resourceState);
};

export const deleteBucketResource = async (
  context: Context,
  bucketName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createAliyunClient(context);
  await client.oss.deleteBucket(bucketName);
  return removeResource(state, logicalId);
};
