import { Context, BucketDomain, Plan, PlanItem, StateFile, ResourceAttributes } from '../../types';
import { createTencentClient } from '../../common/tencentClient';
import { cachedRefreshRead } from '../../common/refreshCache';
import { PLAN_READ_CONCURRENCY, mapWithConcurrency } from '../../common/concurrency';
import { bucketToCosBucketConfig, extractCosBucketDefinition } from './cosTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';
import { OWNERSHIP_TAG_KEY, isOwnedByStack } from '../ownershipTag';

const planBucketDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'COS_BUCKET',
  changes: { before: definition },
});

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

  const bucketItems = await mapWithConcurrency(
    buckets,
    PLAN_READ_CONCURRENCY,
    async (bucket): Promise<PlanItem> => {
      const logicalId = `buckets.${bucket.key}`;
      const currentState = getResource(state, logicalId);
      const config = bucketToCosBucketConfig(bucket, context.region);
      const desiredDefinition = extractCosBucketDefinition(config);

      if (!currentState || currentState.status === 'tainted') {
        // No usable local state: probe the provider before planning create.
        // If a same-named bucket already exists WITHOUT our ownership tag it
        // may belong to another project — fail fast in the plan instead of
        // letting the executor discover it mid-deploy.
        const client = createTencentClient(context);
        const remoteBucket = await cachedRefreshRead(
          context,
          `cos.getBucket:${context.region}:${bucket.name}`,
          () => client.cos.getBucket(bucket.name, context.region),
        );
        if (remoteBucket && !isOwnedByStack(context, logicalId, remoteBucket.Tags)) {
          throw new Error(
            `Bucket ${bucket.name} already exists in provider but is not owned by this stack (missing ${OWNERSHIP_TAG_KEY} tag). Refusing to create — resolve manually.`,
          );
        }

        return {
          logicalId,
          action: 'create',
          resourceType: 'COS_BUCKET',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const client = createTencentClient(context);
        const remoteBucket = await cachedRefreshRead(
          context,
          `cos.getBucket:${context.region}:${bucket.name}`,
          () => client.cos.getBucket(bucket.name, context.region),
        );

        if (!remoteBucket) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'COS_BUCKET',
            changes: { before: currentState.definition, after: desiredDefinition },
            drifted: true,
          };
        }

        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        if (definitionChanged) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'COS_BUCKET',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'COS_BUCKET' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'COS_BUCKET',
          changes: { before: currentState.definition, after: desiredDefinition },
        };
      }
    },
  );

  const allStates = getAllResources(state);
  const deletionItems = Object.entries(allStates)
    .filter(([logicalId]) => logicalId.startsWith('buckets.') && !desiredLogicalIds.has(logicalId))
    .map(([logicalId, resourceState]) => planBucketDeletion(logicalId, resourceState.definition));

  return { items: [...bucketItems, ...deletionItems] };
};
