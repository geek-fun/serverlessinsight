import { Context, BucketDomain, Plan, PlanItem, StateFile, ResourceAttributes } from '../../types';
import { createAliyunClient } from '../../common/aliyunClient';
import { bucketToOssBucketConfig, extractOssBucketDefinition } from './ossTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual } from '../../common/hashUtils';

const planBucketDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'ALIYUN_OSS_BUCKET',
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

  const bucketItems = await Promise.all(
    buckets.map(async (bucket): Promise<PlanItem> => {
      const logicalId = `buckets.${bucket.key}`;
      const currentState = getResource(state, logicalId);
      const config = bucketToOssBucketConfig(bucket);
      const desiredDefinition = extractOssBucketDefinition(config);

      if (!currentState) {
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
            resourceType: 'ALIYUN_OSS_BUCKET',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'ALIYUN_OSS_BUCKET' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'ALIYUN_OSS_BUCKET',
          changes: { before: currentState.definition, after: desiredDefinition },
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
