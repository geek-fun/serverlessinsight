import { createAliyunClient } from '../../common/aliyunClient';
import { OssBucketInfo, OssCnameInfo } from '../../common/aliyunClient/ossOperations';
import { setResource, removeResource, buildSid } from '../../common';
import { Context, BucketDomain, ResourceState, StateFile, ResourceInstance } from '../../types';
import { bucketToOssBucketConfig, extractOssBucketDefinition } from './ossTypes';
import { CommonBucketInstance } from '../bucketTypes';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import path from 'node:path';

type OssDnsInstance = ResourceInstance & {
  type: 'ALIYUN_OSS_DNS_CNAME';
  domain: string;
  cname: string;
  dnsRecordId?: string;
};

const buildOssInstanceFromProvider = (info: OssBucketInfo, sid: string): CommonBucketInstance => {
  return {
    type: 'ALIYUN_OSS_BUCKET',
    sid,
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

  // Refresh state from provider to get bucket info
  let bucketInfo = await client.oss.getBucket(config.bucketName);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${config.bucketName}`);
  }

  const definition = extractOssBucketDefinition(config);
  const sid = buildSid('aliyun', 'oss', context.stage, config.bucketName);
  const logicalId = `buckets.${bucket.key}`;

  const instances: Array<ResourceInstance> = [buildOssInstanceFromProvider(bucketInfo, sid)];

  const partialResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances,
    lastUpdated: new Date().toISOString(),
  };

  state = setResource(state, logicalId, partialResourceState);

  let cnameInfo: OssCnameInfo | undefined;
  if (bucket.website?.domain) {
    logger.info(`Binding custom domain ${bucket.website.domain} to bucket ${config.bucketName}`);
    cnameInfo = await client.oss.bindCustomDomain(config.bucketName, bucket.website.domain);

    if (cnameInfo.dnsRecordId) {
      const dnsInstance: OssDnsInstance = {
        sid: buildSid('aliyun', 'alidns', context.stage, cnameInfo.dnsRecordId),
        id: cnameInfo.dnsRecordId,
        type: 'ALIYUN_OSS_DNS_CNAME',
        domain: bucket.website.domain,
        cname: cnameInfo.cname,
        dnsRecordId: cnameInfo.dnsRecordId,
      };
      instances.push(dnsInstance);
    }
  }

  // Upload static files if code path is specified
  if (bucket.website?.code) {
    try {
      const codePath = path.resolve(process.cwd(), bucket.website.code);
      await client.oss.uploadFiles(config.bucketName, codePath);

      // Refresh state after upload to get updated info
      bucketInfo = await client.oss.getBucket(config.bucketName);
      if (bucketInfo) {
        instances[0] = buildOssInstanceFromProvider(bucketInfo, sid);
      }
    } catch (error) {
      logger.error(
        `Failed to upload files to bucket, but bucket was created and saved to state: ${error}`,
      );
      logger.info(lang.__('OSS_BUCKET_TRACKED_CAN_RETRY'));
    }
  }

  const finalResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, finalResourceState);
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

  if (config.acl) {
    await client.oss.updateBucketAcl(config.bucketName, config.acl);
  }

  if (config.websiteConfig) {
    await client.oss.updateBucketWebsite(config.bucketName, config.websiteConfig);
  }

  if (bucket.website?.code) {
    const codePath = path.resolve(process.cwd(), bucket.website.code);
    await client.oss.uploadFiles(config.bucketName, codePath);
  }

  const bucketInfo = await client.oss.getBucket(config.bucketName);
  if (!bucketInfo) {
    throw new Error(`Failed to refresh state for bucket: ${config.bucketName}`);
  }

  const definition = extractOssBucketDefinition(config);
  const sid = buildSid('aliyun', 'oss', context.stage, config.bucketName);
  const logicalId = `buckets.${bucket.key}`;

  const instances: Array<ResourceInstance> = [buildOssInstanceFromProvider(bucketInfo, sid)];

  const existingState = state.resources[logicalId];
  const existingDnsInstance = existingState?.instances?.find(
    (i) => i.type === 'ALIYUN_OSS_DNS_CNAME',
  ) as OssDnsInstance | undefined;

  if (bucket.website?.domain) {
    const domainChanged = existingDnsInstance?.domain !== bucket.website.domain;

    if (domainChanged && existingDnsInstance?.dnsRecordId) {
      await client.oss.unbindCustomDomain(
        existingDnsInstance.domain,
        existingDnsInstance.dnsRecordId,
      );
    }

    logger.info(`Binding custom domain ${bucket.website.domain} to bucket ${config.bucketName}`);
    const cnameInfo = await client.oss.bindCustomDomain(config.bucketName, bucket.website.domain);

    if (cnameInfo.dnsRecordId) {
      const dnsInstance: OssDnsInstance = {
        sid: buildSid('aliyun', 'alidns', context.stage, cnameInfo.dnsRecordId),
        id: cnameInfo.dnsRecordId,
        type: 'ALIYUN_OSS_DNS_CNAME',
        domain: bucket.website.domain,
        cname: cnameInfo.cname,
        dnsRecordId: cnameInfo.dnsRecordId,
      };
      instances.push(dnsInstance);
    }
  } else if (existingDnsInstance?.dnsRecordId) {
    await client.oss.unbindCustomDomain(
      existingDnsInstance.domain,
      existingDnsInstance.dnsRecordId,
    );
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition,
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

export const deleteBucketResource = async (
  context: Context,
  bucketName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createAliyunClient(context);

  const existingState = state.resources[logicalId];
  const dnsInstance = existingState?.instances?.find((i) => i.type === 'ALIYUN_OSS_DNS_CNAME') as
    | OssDnsInstance
    | undefined;

  if (dnsInstance?.dnsRecordId) {
    await client.oss.unbindCustomDomain(dnsInstance.domain, dnsInstance.dnsRecordId);
  }

  try {
    await client.oss.deleteBucket(bucketName);
  } catch (err) {
    const errorCode = (err as { code?: string })?.code;
    if (errorCode === 'NoSuchBucket') {
      logger.warn(`Bucket ${bucketName} not found in provider, skipping deletion`);
    } else {
      throw err;
    }
  }
  return removeResource(state, logicalId);
};
