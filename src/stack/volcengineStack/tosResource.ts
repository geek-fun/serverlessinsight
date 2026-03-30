import { createVolcengineClient } from '../../common/volcengineClient';
import { setResource, removeResource, buildSid, computeDirectoryHash } from '../../common';
import { Context, BucketDomain, ResourceState, StateFile, ResourceInstance } from '../../types';
import {
  bucketToTosConfig,
  extractTosBucketDefinition,
  buildTosInstanceFromProvider,
} from './tosTypes';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import path from 'node:path';

export const createResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToTosConfig(bucket);
  const client = createVolcengineClient(context);

  const bucketInfo = await client.tos.createBucket(config);

  const sid = buildSid('volcengine', 'tos', context.stage, bucket.name);
  const logicalId = `buckets.${bucket.key}`;

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const instances: Array<ResourceInstance> = [buildTosInstanceFromProvider(bucketInfo, sid)];

  if (bucket.website?.code) {
    try {
      const codePath = path.resolve(process.cwd(), bucket.website.code);
      await client.tos.uploadFiles(bucket.name, codePath);

      const refreshedInfo = await client.tos.getBucket(bucket.name);
      if (refreshedInfo) {
        instances[0] = buildTosInstanceFromProvider(refreshedInfo, sid);
      }
    } catch (error) {
      logger.error(
        lang.__('TOS_BUCKET_FILE_UPLOAD_FAILED_STATE_SAVED', {
          error: error instanceof Error ? error.message : String(error),
        }),
      );
      logger.info(lang.__('TOS_BUCKET_TRACKED_CAN_RETRY'));
    }
  }

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: extractTosBucketDefinition(config, websiteCodeHash),
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

export const readResource = async (context: Context, bucketName: string) => {
  const client = createVolcengineClient(context);
  return await client.tos.getBucket(bucketName);
};

export const updateResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToTosConfig(bucket);
  const client = createVolcengineClient(context);

  if (config.acl) {
    await client.tos.updateBucketAcl(bucket.name, config.acl);
  }

  if (config.websiteConfig) {
    await client.tos.updateBucketWebsite(bucket.name, config.websiteConfig);
  }

  if (bucket.website?.code) {
    const codePath = path.resolve(process.cwd(), bucket.website.code);
    await client.tos.uploadFiles(bucket.name, codePath);
  }

  const bucketInfo = await client.tos.getBucket(bucket.name);
  if (!bucketInfo) {
    throw new Error(
      lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Bucket', name: bucket.name }),
    );
  }

  const sid = buildSid('volcengine', 'tos', context.stage, bucket.name);
  const logicalId = `buckets.${bucket.key}`;

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const instances: Array<ResourceInstance> = [buildTosInstanceFromProvider(bucketInfo, sid)];

  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: extractTosBucketDefinition(config, websiteCodeHash),
    instances,
    lastUpdated: new Date().toISOString(),
  };

  return setResource(state, logicalId, resourceState);
};

export const deleteResource = async (
  context: Context,
  bucketName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createVolcengineClient(context);

  try {
    await client.tos.deleteBucket(bucketName);
  } catch (err) {
    const errorCode = (err as { code?: string })?.code;
    if (errorCode === 'NoSuchBucket' || errorCode === 'ResourceNotFound') {
      logger.warn(
        lang.__('RESOURCE_NOT_FOUND_PROVIDER', { resourceType: 'Bucket', name: bucketName }),
      );
    } else {
      throw err;
    }
  }

  return removeResource(state, logicalId);
};
