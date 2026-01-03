import { Context, BucketDomain, Plan, PlanItem, StateFile } from '../../types';
import { getCosBucket } from './cosProvider';
import { bucketToCosBucketConfig, extractCosBucketAttributes } from './cosTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';

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
      if (logicalId.startsWith('buckets.')) {
        items.push({
          logicalId,
          action: 'delete',
          resourceType: 'COS_BUCKET',
          changes: {
            before: { arn: resourceState.arn, ...resourceState.attributes },
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
    const desiredAttributes = extractCosBucketAttributes(config);

    if (!currentState) {
      // Resource doesn't exist in state - needs to be created
      items.push({
        logicalId,
        action: 'create',
        resourceType: 'COS_BUCKET',
        changes: {
          after: desiredAttributes,
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
              before: currentState.attributes,
              after: desiredAttributes,
            },
            drifted: true,
          });
        } else {
          // Compare all attributes for drift detection
          const currentAttributes = currentState.attributes || {};
          const attributesChanged = !attributesEqual(currentAttributes, desiredAttributes);

          if (attributesChanged) {
            // Configuration has changed
            items.push({
              logicalId,
              action: 'update',
              resourceType: 'COS_BUCKET',
              changes: {
                before: currentAttributes,
                after: desiredAttributes,
              },
              drifted: true,
            });
          } else {
            // No changes needed
            items.push({
              logicalId,
              action: 'noop',
              resourceType: 'COS_BUCKET',
            });
          }
        }
      } catch {
        // If we can't read the remote resource, plan for recreation
        items.push({
          logicalId,
          action: 'create',
          resourceType: 'COS_BUCKET',
          changes: {
            before: currentState.attributes,
            after: desiredAttributes,
          },
        });
      }
    }
  }

  // Check for resources in state that are not in desired state (need deletion)
  const allStates = getAllResources(state);
  for (const [logicalId, resourceState] of Object.entries(allStates)) {
    if (logicalId.startsWith('buckets.') && !desiredLogicalIds.has(logicalId)) {
      items.push({
        logicalId,
        action: 'delete',
        resourceType: 'COS_BUCKET',
        changes: {
          before: { arn: resourceState.arn, ...resourceState.attributes },
        },
      });
    }
  }

  return { items };
};
