import { createVolcengineClient } from '../../common/volcengineClient';
import {
  setResource,
  removeResource,
  buildSid,
  computeDirectoryHash,
  getResource,
} from '../../common';
import {
  Context,
  BucketDomain,
  ResourceState,
  StateFile,
  ResourceInstance,
  PartialResourceError,
} from '../../types';
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
        Effect: stmt.effect,
        Principal: stmt.principal,
        Action: stmt.action,
        Resource: stmt.resource,
      };
      if (stmt.condition) {
        s.Condition = stmt.condition;
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
  await client.tos.deleteBucketPolicy(bucketName);
  logger.info(lang.__('BUCKET_POLICY_DELETED', { bucketName }));
};

export const createResource = async (
  context: Context,
  bucket: BucketDomain,
  state: StateFile,
): Promise<StateFile> => {
  const config = bucketToTosConfig(bucket);
  const client = createVolcengineClient(context);

  const sid = buildSid('volcengine', 'tos', context.stage, bucket.name);
  const logicalId = `buckets.${bucket.key}`;

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const existingResourceState = getResource(state, logicalId);
  const isTainted = existingResourceState?.status === 'tainted';
  const existingBucketOnRetry = isTainted ? await client.tos.getBucket(bucket.name) : null;

  if (existingBucketOnRetry) {
    logger.info(
      `Bucket ${bucket.name} already exists in provider (tainted recovery), skipping create`,
    );
  }

  const taintedResourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: extractTosBucketDefinition(config, websiteCodeHash),
    instances: existingBucketOnRetry
      ? [buildTosInstanceFromProvider(existingBucketOnRetry, sid)]
      : [
          {
            type: 'VOLCENGINE_TOS_BUCKET',
            sid,
            id: bucket.name,
            bucketName: bucket.name,
            attributes: {},
          },
        ],
    status: 'tainted',
    lastUpdated: new Date().toISOString(),
  };

  const stateAfterDependents = setResource(state, logicalId, taintedResourceState);

  try {
    const bucketInfo = existingBucketOnRetry ?? (await client.tos.createBucket(config));

    const instances: Array<ResourceInstance> = [buildTosInstanceFromProvider(bucketInfo, sid)];

    if (bucket.website?.code) {
      const codePath = path.resolve(process.cwd(), bucket.website.code);
      await client.tos.uploadFiles(bucket.name, codePath);

      const refreshedInfo = await client.tos.getBucket(bucket.name);
      if (refreshedInfo) {
        instances[0] = buildTosInstanceFromProvider(refreshedInfo, sid);
      }
    }

    // Apply IAM bucket policy if configured
    await applyBucketPolicy(client, bucket);

    const resourceState: ResourceState = {
      mode: 'managed',
      region: context.region,
      definition: extractTosBucketDefinition(config, websiteCodeHash),
      instances,
      status: 'ready',
      lastUpdated: new Date().toISOString(),
    };

    return setResource(stateAfterDependents, logicalId, resourceState);
  } catch (error) {
    throw new PartialResourceError(
      stateAfterDependents,
      error instanceof Error ? error : new Error(String(error)),
    );
  }
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
