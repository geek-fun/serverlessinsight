import { mergeManagedIntent } from '../../common/planCompare';
import { buildBucketPolicy, isOwnedBucketPolicy } from '../../common/bucketPolicy';
import { withLifecycleIntent } from '../../common/functionDefinition';
import { createVolcengineClient } from '../../common/volcengineClient';
import type { TosBucketInfo } from '../../common/volcengineClient/types';
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
  TOS_BUCKET_POLICY_INSTANCE_TYPE,
  bucketToTosConfig,
  extractTosBucketDefinition,
  buildTosInstanceFromProvider,
} from './tosTypes';
import { logger } from '../../common/logger';
import { lang } from '../../lang';
import path from 'node:path';
import { OWNERSHIP_TAG_KEY, buildOwnershipTagValue, isOwnedByStack } from '../ownershipTag';
import { isResourceAlreadyExistsError } from '../alreadyExists';

const buildTosBucketPolicyJson = (iam: BucketDomain['iam']): Record<string, unknown> | null =>
  buildBucketPolicy(iam, 'volcengine');

const buildTosPolicyInstance = (context: Context, bucketName: string): ResourceInstance => ({
  sid: buildSid('volcengine', 'tos-policy', context.stage, bucketName),
  type: TOS_BUCKET_POLICY_INSTANCE_TYPE,
  id: bucketName,
});

const applyBucketPolicy = async (
  client: ReturnType<typeof createVolcengineClient>,
  bucket: BucketDomain,
  owned = false,
): Promise<void> => {
  const policy = buildTosBucketPolicyJson(bucket.iam);
  if (!policy) {
    if (owned || bucket.iam?.resource?.statements !== undefined) {
      await deleteBucketPolicy(client, bucket.name);
    }
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

  // Stamp the ownership tag (sent as the x-tos-tagging header on CreateBucket)
  // so a later run can idempotently adopt this bucket, and an unrelated
  // same-named bucket is never adopted.
  config.Tags = [{ Key: OWNERSHIP_TAG_KEY, Value: buildOwnershipTagValue(context, logicalId) }];

  const websiteCodeHash = bucket.website?.code
    ? computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code))
    : undefined;

  const existingResourceState = getResource(state, logicalId);
  const isTainted = existingResourceState?.status === 'tainted';
  const existingBucketOnRetry = isTainted ? await client.tos.getBucket(bucket.name) : null;

  if (existingBucketOnRetry) {
    logger.info(
      lang.__('TAINTED_RECOVERY_SKIP_CREATE', {
        resourceType: 'Bucket',
        resourceName: bucket.name,
      }),
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
    let bucketInfo: TosBucketInfo;
    if (existingBucketOnRetry) {
      bucketInfo = existingBucketOnRetry;
    } else {
      try {
        await client.tos.createBucket(config);
      } catch (error) {
        // TOS CreateBucket may be idempotent for the same account; a collision
        // (BucketAlreadyExists) surfaces only for a bucket owned by another
        // account. Treat it as non-fatal and fall through to the ownership probe
        // below — an untagged pre-existing bucket is refused there.
        if (!isResourceAlreadyExistsError(error, ['BucketAlreadyExists'])) {
          throw error;
        }
        logger.info(
          lang.__('OWNERSHIP_VERIFYING', { resourceType: 'Bucket', resourceName: bucket.name }),
        );
      }

      // CreateBucket succeeding does NOT prove the bucket is ours: a pre-existing
      // bucket is returned idempotently. Only a bucket carrying our ownership tag
      // may be adopted; an untagged one may belong to another project and must
      // fail loudly rather than be silently taken over.
      const probe = await client.tos.getBucket(bucket.name);
      if (!probe) {
        throw new Error(lang.__('REFRESH_STATE_BUCKET', { name: bucket.name }));
      }
      if (!isOwnedByStack(context, logicalId, probe.Tags)) {
        throw new PartialResourceError(
          stateAfterDependents,
          new Error(
            lang.__('RESOURCE_EXISTS_NOT_OWNED_ADOPT', {
              resourceType: 'Bucket',
              resourceName: bucket.name,
              tagKey: OWNERSHIP_TAG_KEY,
            }),
          ),
        );
      }
      bucketInfo = probe;
    }

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
    if (buildTosBucketPolicyJson(bucket.iam)) {
      instances.push(buildTosPolicyInstance(context, bucket.name));
    }

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

  const policyOwned = isOwnedBucketPolicy(
    TOS_BUCKET_POLICY_INSTANCE_TYPE,
    state.resources[logicalId]?.instances,
    state.resources[logicalId]?.definition,
  );
  await applyBucketPolicy(client, bucket, policyOwned);
  if (buildTosBucketPolicyJson(bucket.iam)) {
    instances.push(buildTosPolicyInstance(context, bucket.name));
  }

  const tosDefinition = extractTosBucketDefinition(config, websiteCodeHash);
  const resourceState: ResourceState = {
    mode: 'managed',
    region: context.region,
    definition: withLifecycleIntent(
      mergeManagedIntent(state.resources[logicalId]?.definition ?? {}, tosDefinition),
      tosDefinition,
      ['policy'],
    ),
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
