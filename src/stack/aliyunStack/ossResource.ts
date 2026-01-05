import { createAliyunClient } from '../../common/aliyunClient';
import { OssBucketInfo } from '../../common/aliyunClient/ossOperations';
import { setResource, removeResource } from '../../common';
import { Context, BucketDomain, ResourceState, StateFile } from '../../types';
import { bucketToOssBucketConfig, extractOssBucketDefinition } from './ossTypes';
import { CommonBucketInstance } from '../bucketTypes';
import path from 'node:path';

const buildOssInstanceFromProvider = (info: OssBucketInfo, arn: string): CommonBucketInstance => {
  return {
    type: 'ALIYUN_OSS_BUCKET',
    arn,
    id: info.name,
    bucketName: info.name,
    location: info.location ?? null,
    creationDate: info.creationDate ?? null,
    storageClass: info.storageClass ?? null,
    dataRedundancyType: info.dataRedundancyType ?? null,
    resourceGroupId: info.resourceGroupId ?? null,
    comment: info.comment ?? null,
    owner: info.owner
      ? {
          id: info.owner.id ?? null,
          displayName: info.owner.displayName ?? null,
        }
      : undefined,
    blockPublicAccess: info.blockPublicAccess ?? null,
    accessMonitorStatus: info.accessMonitorStatus ?? null,
    acl: info.acl ?? null,
    websiteConfig: info.websiteConfig
      ? {
          indexDocument: info.websiteConfig.indexDocument ?? null,
          errorDocument: info.websiteConfig.errorDocument ?? null,
        }
      : undefined,
    loggingConfig: info.loggingConfig
      ? {
          targetBucket: info.loggingConfig.targetBucket ?? null,
          targetPrefix: info.loggingConfig.targetPrefix ?? null,
        }
      : undefined,
    corsRules: info.corsRules?.map((rule) => ({
      id: rule.id ?? null,
      allowedOrigins: rule.allowedOrigins ?? [],
      allowedMethods: rule.allowedMethods ?? [],
      allowedHeaders: rule.allowedHeaders ?? [],
      exposeHeaders: rule.exposeHeaders ?? [],
      maxAgeSeconds: rule.maxAgeSeconds ?? null,
    })),
    lifecycleRules: info.lifecycleRules?.map((rule) => ({
      id: rule.id ?? null,
      status: rule.status ?? null,
      prefix: rule.prefix ?? null,
      expiration: rule.expiration
        ? {
            days: rule.expiration.days ?? null,
            date: rule.expiration.date ?? null,
            expiredObjectDeleteMarker: rule.expiration.expiredObjectDeleteMarker ?? null,
          }
        : undefined,
      transition: rule.transition
        ? {
            days: rule.transition.days ?? null,
            date: rule.transition.date ?? null,
            storageClass: rule.transition.storageClass ?? null,
          }
        : undefined,
    })),
    versioningStatus: info.versioningConfig?.status ?? null,
    encryptionConfig: info.encryptionConfig
      ? {
          sseAlgorithm: info.encryptionConfig.sseAlgorithm ?? null,
          kmsMasterKeyId: info.encryptionConfig.kmsMasterKeyId ?? null,
          kmsDataEncryption: info.encryptionConfig.kmsDataEncryption ?? null,
        }
      : undefined,
    transferAccelerationStatus: info.transferAccelerationStatus ?? null,
    replicationRules: info.replicationRules?.map((rule) => ({
      id: rule.id ?? null,
      status: rule.status ?? null,
      prefix: rule.prefix ?? null,
      destination: rule.destination
        ? {
            bucket: rule.destination.bucket ?? null,
            storageClass: rule.destination.storageClass ?? null,
          }
        : undefined,
    })),
    tags: info.tags?.map((tag) => ({
      key: tag.key ?? null,
      value: tag.value ?? null,
    })),
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
    bucketName: config.bucketName,
    acl: config.acl,
    websiteConfig: config.websiteConfig,
    storageClass: config.storageClass,
  });

  // Upload static files if code path is specified
  if (bucket.website?.code) {
    const codePath = path.resolve(process.cwd(), bucket.website.code);
    await client.oss.uploadFiles(config.bucketName, codePath);
  }

  // Refresh state from provider to get all attributes
  const bucketInfo = await client.oss.getBucket(config.bucketName);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${config.bucketName}`);
  }

  const definition = extractOssBucketDefinition(config);
  const arn = `arn:acs:oss:${context.region}:${context.accountId}:${config.bucketName}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildOssInstanceFromProvider(bucketInfo, arn)],
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
  if (config.acl) {
    await client.oss.updateBucketAcl(config.bucketName, config.acl);
  }

  // Update website configuration if specified
  if (config.websiteConfig) {
    await client.oss.updateBucketWebsite(config.bucketName, config.websiteConfig);
  }

  // Upload static files if code path is specified
  if (bucket.website?.code) {
    const codePath = path.resolve(process.cwd(), bucket.website.code);
    await client.oss.uploadFiles(config.bucketName, codePath);
  }

  // Refresh state from provider to get all attributes
  const bucketInfo = await client.oss.getBucket(config.bucketName);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${config.bucketName}`);
  }

  const definition = extractOssBucketDefinition(config);
  const arn = `arn:acs:oss:${context.region}:${context.accountId}:${config.bucketName}`;
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances: [buildOssInstanceFromProvider(bucketInfo, arn)],
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
