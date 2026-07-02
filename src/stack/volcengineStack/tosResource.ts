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

const buildTosBucketPolicyJson = (iam: BucketDomain['iam']): Record<string, unknown> | null => {
  if (!iam?.resource?.statements || iam.resource.statements.length === 0) return null;
  return {
    Statement: iam.resource.statements.map((stmt) => {
      const s: Record<string, unknown> = {
        Effect: stmt.Effect,
        Principal: stmt.Principal,
        Action: stmt.Action,
        Resource: stmt.Resource,
      };
      if (stmt.Condition) {
        s.Condition = stmt.Condition;
      }
      return s;
    }),
  };
};

const applyBucketPolicy = async (
  client: ReturnType<typeof createVolcengineClient>,
  bucket: BucketDomain,
): Promise<void> => {
  if (!bucket.iam) return;
  const policy = buildTosBucketPolicyJson(bucket.iam);
  if (!policy) {
    // iam exists but has no statements — delete any existing policy
    await deleteBucketPolicy(client, bucket.name);
    return;
  }
  logger.info(lang.__('BUCKET_POLICY_APPLYING', { bucketName: bucket.name }));
  await client.tos.putBucketPolicy(bucket.name, policy);
  logger.info(lang.__('BUCKET_POLICY_APPLIED', { bucketName: bucket.name }));
};

const deleteBucketPolicy = async (
  client: ReturnType<typeof createVolcengineClient>,
  bucketName: string,
): Promise<void> => {
  try {
    await client.tos.deleteBucketPolicy(bucketName);
    logger.info(lang.__('BUCKET_POLICY_DELETED', { bucketName }));
  } catch {
    // Best effort cleanup
  }
};

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

  // Apply IAM bucket policy if configured
  await applyBucketPolicy(client, bucket);

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

  // Apply IAM bucket policy if configured (update or remove)
  const existingDef = (state.resources[logicalId]?.definition ?? {}) as Record<string, unknown>;
  const oldPolicyJson = existingDef.policy as string | undefined;
  const newPolicyJson = bucket.iam ? JSON.stringify(bucket.iam) : null;
  if (newPolicyJson !== (oldPolicyJson ?? null)) {
    if (newPolicyJson) {
      await applyBucketPolicy(client, bucket);
    } else {
      await deleteBucketPolicy(client, bucket.name);
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

export const deleteResource = async (
  context: Context,
  bucketName: string,
  logicalId: string,
  state: StateFile,
): Promise<StateFile> => {
  const client = createVolcengineClient(context);

  // Clean up bucket policy before deleting bucket
  await deleteBucketPolicy(client, bucketName);

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
