import { Context, BucketDomain, Plan, PlanItem, StateFile } from '../../types';
import { getCosBucket } from './cosProvider';
import { computeBucketConfigHash, bucketToCosBucketConfig } from './cosTypes';
import { getAllResources, getResource } from '../../common/stateManager';

export const generateBucketPlan = async (
  context: Context,
  state: StateFile,
  buckets: Array<BucketDomain> | undefined,
): Promise<Plan> => {
  const items: Array<PlanItem> = [];

  if (!buckets || buckets.length === 0) {
    // Handle deletions for buckets removed from YAML
    const allStates = getAllResources(state);
    for (const [logicalId, resourceState] of Object.entries(allStates)) {
      if (resourceState.type === 'COS_BUCKET') {
        items.push({
          logicalId,
          action: 'delete',
          resourceType: 'COS_BUCKET',
          changes: {
            before: { physicalId: resourceState.physicalId },
          },
        });
      }
    }
    return { items };
  }

  // Track which logical IDs are in the desired state
  const desiredLogicalIds = new Set<string>();

  for (const bucket of buckets) {
    const logicalId = `buckets.${bucket.key}`;
    desiredLogicalIds.add(logicalId);

    const currentState = getResource(state, logicalId);
    const config = bucketToCosBucketConfig(bucket, context.region);
    const desiredConfigHash = computeBucketConfigHash(config);

    if (!currentState) {
      // Resource doesn't exist in state - needs to be created
      items.push({
        logicalId,
        action: 'create',
        resourceType: 'COS_BUCKET',
        changes: {
          after: {
            name: bucket.name,
            acl: bucket.security?.acl,
            website: bucket.website,
          },
        },
      });
    } else {
      // Resource exists - check if it needs updating
      try {
        const remoteBucket = await getCosBucket(context, bucket.name, context.region);

        if (!remoteBucket) {
          // Resource in state but not in cloud - needs recreation
          items.push({
            logicalId,
            action: 'create',
            resourceType: 'COS_BUCKET',
            changes: {
              after: {
                name: bucket.name,
                acl: bucket.security?.acl,
                website: bucket.website,
              },
            },
          });
        } else if (currentState.configHash !== desiredConfigHash) {
          // Configuration has changed
          items.push({
            logicalId,
            action: 'update',
            resourceType: 'COS_BUCKET',
            changes: {
              before: {
                configHash: currentState.configHash,
              },
              after: {
                name: bucket.name,
                acl: bucket.security?.acl,
                website: bucket.website,
                configHash: desiredConfigHash,
              },
            },
          });
        } else {
          // No changes needed
          items.push({
            logicalId,
            action: 'noop',
            resourceType: 'COS_BUCKET',
          });
        }
      } catch {
        // If we can't read the remote resource, plan for recreation
        items.push({
          logicalId,
          action: 'create',
          resourceType: 'COS_BUCKET',
          changes: {
            after: {
              name: bucket.name,
              acl: bucket.security?.acl,
              website: bucket.website,
            },
          },
        });
      }
    }
  }

  // Check for resources in state that are not in desired state (need deletion)
  const allStates = getAllResources(state);
  for (const [logicalId, resourceState] of Object.entries(allStates)) {
    if (resourceState.type === 'COS_BUCKET' && !desiredLogicalIds.has(logicalId)) {
      items.push({
        logicalId,
        action: 'delete',
        resourceType: 'COS_BUCKET',
        changes: {
          before: { physicalId: resourceState.physicalId },
        },
      });
    }
  }

  return { items };
};
