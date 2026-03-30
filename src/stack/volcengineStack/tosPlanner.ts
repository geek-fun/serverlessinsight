import path from 'node:path';
import { Context, BucketDomain, Plan, PlanItem, StateFile, ResourceAttributes } from '../../types';
import { createVolcengineClient } from '../../common/volcengineClient';
import { bucketToTosConfig, extractTosBucketDefinition } from './tosTypes';
import { getAllResources, getResource } from '../../common/stateManager';
import { attributesEqual, computeDirectoryHash } from '../../common';

const planBucketDeletion = (logicalId: string, definition: ResourceAttributes): PlanItem => ({
  logicalId,
  action: 'delete',
  resourceType: 'VOLCENGINE_TOS_BUCKET',
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
      const config = bucketToTosConfig(bucket);
      const websiteCodeHash = (() => {
        if (!bucket.website?.code) return undefined;
        try {
          return computeDirectoryHash(path.resolve(process.cwd(), bucket.website.code));
        } catch {
          return null;
        }
      })();
      const desiredDefinition = extractTosBucketDefinition(config, websiteCodeHash);

      if (!currentState) {
        return {
          logicalId,
          action: 'create',
          resourceType: 'VOLCENGINE_TOS_BUCKET',
          changes: { after: desiredDefinition },
        };
      }

      try {
        const client = createVolcengineClient(context);
        const remoteBucket = await client.tos.getBucket(bucket.name);

        if (!remoteBucket) {
          return {
            logicalId,
            action: 'create',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
            changes: {
              before: currentState.definition,
              after: desiredDefinition,
            },
            drifted: true,
          };
        }

        const currentDefinition = currentState.definition || {};
        const definitionChanged = !attributesEqual(currentDefinition, desiredDefinition);

        if (definitionChanged) {
          return {
            logicalId,
            action: 'update',
            resourceType: 'VOLCENGINE_TOS_BUCKET',
            changes: { before: currentDefinition, after: desiredDefinition },
            drifted: true,
          };
        }

        return { logicalId, action: 'noop', resourceType: 'VOLCENGINE_TOS_BUCKET' };
      } catch {
        return {
          logicalId,
          action: 'create',
          resourceType: 'VOLCENGINE_TOS_BUCKET',
          changes: {
            before: currentState.definition,
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
