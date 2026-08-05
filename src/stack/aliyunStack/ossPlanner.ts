import path from 'node:path';
import { Context, BucketDomain, Plan, PlanItem, StateFile, ResourceAttributes } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { bucketToOssBucketConfig, extractOssBucketDefinition } from './ossTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual, computeDirectoryHash } from '../../common/hashUtils';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

const planBucketDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'ALIYUN_OSS_BUCKET',
  changes: { before: normalizeDefinitionForDisplay(definition) },
});

// getBucket returns tags as { key, value } (BucketTag); the ownership helper
// expects { Key, Value }. Convert before verification.
const toOwnershipTags = (
  tags: Array<{ key?: string; value?: string }> | undefined,
): Array<{ Key?: string; Value?: string }> | undefined =>
  tags?.map((tag) => ({ Key: tag.key, Value: tag.value }));

const normalizeDefinitionForDisplay = (definition: ResourceAttributes): ResourceAttributes => {
  const { domainBound: _domainBound, ...rest } = definition as { domainBound?: unknown };
  return rest;
};

export const generateBucketPlan = async (
  context: Context,
  state: StateFile,
  buckets: Array<BucketDomain> | undefined,
): Promise<Plan> => {
  if (!buckets || buckets.length === 0) {
    const allStates = getAllResources(state);
    const items = Object.entries(allStates)
      .filter(([logicalId]) => logicalId.startsWith('buckets.'))
      .map(([logicalId, resourceState]) => planBucketDeletion(logicalId, resourceState.definition));
    return { items };
  }

  const desiredLogicalIds = new Set(buckets.map((bucket) => `buckets.${bucket.key}`));

  const bucketItems = await Promise.all(
    buckets.map(async (bucket): Promise<PlanItem> => {
      const logicalId = `buckets.${bucket.key}`;
      const currentState = getResource(state, logicalId);
      const config = bucketToOssBucketConfig(bucket);
      const websiteCodeHash = (() => {
        if (!bucket.website?.code) return undefined;
        try {
          return computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code));
        } catch {
          return null;
        }
      })();
      const desiredDefinition = extractOssBucketDefinition(config, websiteCodeHash);

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // If a same-named bucket already exists WITHOUT our ownership tag it
        // may belong to another project — fail fast in the plan instead of
        // letting the executor discover it mid-deploy.
        const client = createAliyunClient(context);
        const remoteBucket = await client.oss.getBucket(bucket.name);
        if (
          remoteBucket &&
          !isOwnedByStack(context, logicalId, toOwnershipTags(remoteBucket.tags))
        ) {
          throw new Error(
            `Bucket ${bucket.name} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
          );
        }

        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_OSS_BUCKET',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const client = createAliyunClient(context);
        const remoteBucket = await client.oss.getBucket(bucket.name);

        if (!remoteBucket) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'ALIYUN_OSS_BUCKET',
            changes: {
              before: normalizeDefinitionForDisplay(currentState.definition),
              after: desiredDefinition,
            },
            drifted: true,
          };
        }

        const currentDefinition = currentState.definition || {};
        const normalizedCurrent = normalizeDefinitionForDisplay(currentDefinition);
        const normalizedDesired = normalizeDefinitionForDisplay(desiredDefinition);
        const { domainBound } = currentDefinition as { domainBound?: boolean | null };
        const definitionChanged = !attributesEqual(normalizedCurrent, normalizedDesired);
        const domainBindingPending = domainBound === false;

        if (definitionChanged || domainBindingPending) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'ALIYUN_OSS_BUCKET',
            changes: { before: normalizedCurrent, after: normalizedDesired },
            ...(definitionChanged ? { drifted: true } : {}),
          };
        }

        return { logicalId, action: 'noop', resourceType: 'ALIYUN_OSS_BUCKET' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_OSS_BUCKET',
          changes: {
            before: normalizeDefinitionForDisplay(currentState.definition),
            after: desiredDefinition,
          },
        };
      }
    }),
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => logicalId.startsWith('buckets.') && !desiredLogicalIds.has(logicalId))
    .map(([logicalId, resourceState]) => planBucketDeletion(logicalId, resourceState.definition));

  return { items: [...bucketItems, ...deletionItems] };
};
